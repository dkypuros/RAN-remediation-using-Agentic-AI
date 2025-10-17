import os
import sys
import json
import numpy as np
from typing import List, Dict, Any, Tuple
from flask import Flask, request, jsonify
from flask_cors import CORS
import traceback

# Import sentence-transformers for embeddings
try:
    from sentence_transformers import SentenceTransformer
except ImportError:
    print("Installing sentence-transformers...")
    import subprocess
    subprocess.check_call([sys.executable, "-m", "pip", "install", "sentence-transformers"])
    from sentence_transformers import SentenceTransformer

# In-memory vector store
class VectorStore:
    def __init__(self):
        self.embeddings = []
        self.texts = []
        self.metadata = []
    
    def add(self, text: str, embedding: List[float], metadata: Dict[str, Any]):
        """Add text and its embedding to the store"""
        self.texts.append(text)
        self.embeddings.append(embedding)
        self.metadata.append(metadata)
        
    def similarity_search(self, query_embedding: List[float], k: int = 4) -> List[Tuple[str, float, Dict]]:
        """Search for similar texts based on the query embedding"""
        if not self.embeddings:
            return []
        
        # Convert list to numpy for efficient computation
        query_embedding_np = np.array(query_embedding)
        embeddings_np = np.array(self.embeddings)
        
        # Compute cosine similarity
        similarities = np.dot(embeddings_np, query_embedding_np) / (
            np.linalg.norm(embeddings_np, axis=1) * np.linalg.norm(query_embedding_np)
        )
        
        # Get top-k indices
        top_k_indices = np.argsort(similarities)[-k:][::-1]
        
        # Return results
        results = [
            (self.texts[i], float(similarities[i]), self.metadata[i])
            for i in top_k_indices
        ]
        
        return results

# Global variables
model = None
vector_store = VectorStore()

def load_data_files():
    """Load and process ticket and knowledge base data"""
    global model, vector_store
    
    try:
        print("Loading sentence transformer model...")
        model = SentenceTransformer('all-MiniLM-L6-v2')
        print("Model loaded successfully")
    except Exception as e:
        print(f"Error loading model: {str(e)}")
        return
    
    data_dir = "/app/data"
    print(f"Looking for data files in: {data_dir}")
    
    # List files in data directory
    try:
        files = os.listdir(data_dir)
        print(f"Files found: {files}")
    except FileNotFoundError:
        print(f"Data directory not found: {data_dir}")
        return
    
    data_files = [
        os.path.join(data_dir, "jira-tickets.json"),
        os.path.join(data_dir, "ticket-knowledge-base.json")
    ]
    
    all_texts = []
    all_metadata = []
    
    for file_path in data_files:
        try:
            print(f"Processing file: {file_path}")
            with open(file_path, 'r') as f:
                data = json.load(f)
                
            if "jira-tickets.json" in file_path:
                # Process JIRA tickets
                tickets = data.get("tickets", [])
                print(f"Processing {len(tickets)} JIRA tickets")
                for ticket in tickets:
                    text = (f"Ticket {ticket.get('ticketId', 'N/A')}: {ticket.get('title', 'N/A')}. "
                           f"Status: {ticket.get('status', 'N/A')}, "
                           f"Priority: {ticket.get('priority', 'N/A')}, "
                           f"Assignee: {ticket.get('assignee', 'Unassigned')}, "
                           f"Reporter: {ticket.get('reporter', 'N/A')}. "
                           f"Description: {ticket.get('description', 'N/A')[:200]}... "
                           f"Labels: {', '.join(ticket.get('labels', []))}. "
                           f"Components: {', '.join(ticket.get('components', []))}.")
                    
                    all_texts.append(text)
                    all_metadata.append({"type": "ticket", "original": ticket})
                    
                    # Also process comments
                    comments = ticket.get('comments', [])
                    for comment in comments:
                        comment_text = (f"Comment on {ticket.get('ticketId', 'N/A')}: {comment.get('body', 'N/A')[:200]}... "
                                      f"Author: {comment.get('author', 'N/A')}")
                        all_texts.append(comment_text)
                        all_metadata.append({"type": "comment", "original": comment, "ticket_key": ticket.get('ticketId')})
            
            elif "ticket-knowledge-base.json" in file_path:
                # Process knowledge articles
                articles = data.get("knowledgeArticles", [])
                print(f"Processing {len(articles)} knowledge articles")
                for article in articles:
                    text = (f"Knowledge Article {article.get('id', 'N/A')}: {article.get('title', 'N/A')}. "
                           f"Category: {article.get('category', 'N/A')}. "
                           f"Content: {article.get('content', 'N/A')[:200]}... "
                           f"Tags: {', '.join(article.get('tags', []))}.")
                    
                    all_texts.append(text)
                    all_metadata.append({"type": "knowledge_article", "original": article})
                
                # Process ticket templates
                templates = data.get("ticketTemplates", [])
                print(f"Processing {len(templates)} ticket templates")
                for template in templates:
                    text = (f"Ticket Template {template.get('templateId', 'N/A')}: {template.get('name', 'N/A')}. "
                           f"Issue Type: {template.get('issueType', 'N/A')}, Priority: {template.get('priority', 'N/A')}. "
                           f"Description: {template.get('fields', {}).get('description', 'N/A')}. "
                           f"Labels: {', '.join(template.get('fields', {}).get('labels', []))}.")
                    
                    all_texts.append(text)
                    all_metadata.append({"type": "ticket_template", "original": template})
                
        except FileNotFoundError:
            print(f"File not found: {file_path}")
        except Exception as e:
            print(f"Error processing file {file_path}: {str(e)}")
            import traceback
            traceback.print_exc()
    
    print(f"Total texts to embed: {len(all_texts)}")
    
    # Generate embeddings for all texts
    if all_texts and model:
        print("Generating embeddings...")
        embeddings = model.encode(all_texts)
        embeddings_list = embeddings.tolist()
        
        # Add to vector store
        for i, (text, embedding, metadata) in enumerate(zip(all_texts, embeddings_list, all_metadata)):
            vector_store.add(text, embedding, metadata)
        
        print(f"Added {len(all_texts)} items to vector store")
    else:
        print("No texts to process or model not loaded")

# Create Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for frontend calls

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({"status": "healthy", "model_loaded": model is not None})

@app.route('/search', methods=['POST'])
def search_context():
    """Search for relevant context given a query"""
    try:
        data = request.get_json()
        if not data or 'query' not in data:
            return jsonify({"error": "Query is required"}), 400
        
        query = data['query']
        print(f"Received search query: {query}")
        
        if not model:
            return jsonify({"error": "Model not loaded"}), 500
        
        # Generate embedding for the query
        query_embedding = model.encode(query).tolist()
        
        # Search for similar contexts
        results = vector_store.similarity_search(query_embedding, k=3)
        
        # Format results
        contexts = []
        for text, score, metadata in results:
            contexts.append({
                "text": text,
                "score": float(score),
                "metadata": metadata
            })
        
        print(f"Found {len(contexts)} relevant contexts")
        return jsonify({
            "success": True,
            "contexts": contexts,
            "query": query
        })
        
    except Exception as e:
        print(f"Error processing search request: {str(e)}")
        traceback.print_exc()
        return jsonify({
            "success": False,
            "error": str(e),
            "contexts": []
        }), 500

if __name__ == '__main__':
    print("Starting RAG HTTP service...")
    
    # Load data on startup
    load_data_files()
    
    # Start Flask server
    print("Starting HTTP server on port 50052...")
    app.run(host='0.0.0.0', port=50052, debug=False)
