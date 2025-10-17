/**
 * API service for communicating with the backend
 */

// Types for API requests and responses
export interface GenerationRequest {
  prompt: string;
  maxTokens: number;
  temperature: number;
}

export interface GenerationResponse {
  text: string;
  usage?: {
    promptTokens: number;
    completionTokens: number;
  };
}

export interface ApiError {
  message: string;
  status?: number;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

/**
 * Generate text using the RAG service directly
 */
export const generateText = async (prompt: string): Promise<GenerationResponse> => {
  try {
    // Call the RAG service directly to get relevant context
    const ragResponse = await fetch(`${API_BASE_URL}/rag/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: prompt }),
    });

    if (!ragResponse.ok) {
      throw {
        message: 'Failed to get RAG context',
        status: ragResponse.status,
      };
    }

    const ragData = await ragResponse.json();
    
    let responseText = '';
    if (ragData.success && ragData.contexts && ragData.contexts.length > 0) {
      responseText = `# 🎯 Found ${ragData.contexts.length} Relevant Results\n\n`;
      
      ragData.contexts.forEach((context: any, index: number) => {
        const score = (context.score * 100).toFixed(1);
        const metadata = context.metadata?.original;
        const type = context.metadata?.type;
        
        // Add result header with relevance score
        responseText += `## ${index + 1}. `;
        
        if (type === 'ticket') {
          responseText += `🎫 **${metadata?.ticketId || 'Unknown'}**: ${metadata?.title || 'No Title'}\n`;
          responseText += `📊 **Relevance**: ${score}% | `;
          responseText += `📈 **Status**: ${metadata?.status || 'Unknown'} | `;
          responseText += `⚡ **Priority**: ${metadata?.priority || 'Unknown'}\n`;
          responseText += `👤 **Assignee**: ${metadata?.assignee || 'Unassigned'}\n\n`;
          
          if (metadata?.description) {
            responseText += `**Description**: ${metadata.description.substring(0, 200)}${metadata.description.length > 200 ? '...' : ''}\n\n`;
          }
          
          if (metadata?.labels && metadata.labels.length > 0) {
            responseText += `🏷️ **Labels**: ${metadata.labels.join(', ')}\n`;
          }
          
          if (metadata?.components && metadata.components.length > 0) {
            responseText += `🔧 **Components**: ${metadata.components.join(', ')}\n`;
          }
          
        } else if (type === 'knowledge_article') {
          responseText += `📚 **${metadata?.title || 'Knowledge Article'}\n`;
          responseText += `📊 **Relevance**: ${score}% | `;
          responseText += `📂 **Category**: ${metadata?.category || 'General'}\n`;
          responseText += `✍️ **Author**: ${metadata?.author || 'Unknown'}\n\n`;
          
          if (metadata?.content) {
            responseText += `**Content**: ${metadata.content.substring(0, 300)}${metadata.content.length > 300 ? '...' : ''}\n\n`;
          }
          
          if (metadata?.tags && metadata.tags.length > 0) {
            responseText += `🏷️ **Tags**: ${metadata.tags.join(', ')}\n`;
          }
          
        } else if (type === 'comment') {
          responseText += `💬 **Comment on ${context.metadata?.ticket_key || 'Unknown Ticket'}\n`;
          responseText += `📊 **Relevance**: ${score}%\n`;
          responseText += `👤 **Author**: ${metadata?.author || 'Unknown'}\n\n`;
          responseText += `**Comment**: ${metadata?.body || context.text}\n`;
          
        } else if (type === 'ticket_template') {
          responseText += `📋 **${metadata?.name || 'Template'}\n`;
          responseText += `📊 **Relevance**: ${score}% | `;
          responseText += `📝 **Type**: ${metadata?.issueType || 'Unknown'} | `;
          responseText += `⚡ **Priority**: ${metadata?.priority || 'Medium'}\n\n`;
          
          if (metadata?.fields?.description) {
            responseText += `**Template**: ${metadata.fields.description.substring(0, 200)}${metadata.fields.description.length > 200 ? '...' : ''}\n`;
          }
        }
        
        responseText += `\n---\n\n`;
      });
      
      // Add helpful footer
      responseText += `💡 **Need more details?** Click on any ticket ID to view the full details, or ask me specific questions about these results!\n\n`;
      responseText += `🔍 **Search Tips**: Try queries like "mobile notifications", "database performance", "security issues", or "API problems" for more targeted results.`;
      
    } else {
      responseText = `# 🔍 No Results Found\n\n`;
      responseText += `I couldn't find any tickets or knowledge articles matching your query. Here are some suggestions:\n\n`;
      responseText += `• Try broader search terms\n`;
      responseText += `• Check for typos in your query\n`;
      responseText += `• Try related keywords or synonyms\n`;
      responseText += `• Browse common topics: "API issues", "database problems", "mobile app", "security"\n\n`;
      responseText += `💬 Feel free to ask me general questions about ticket management processes!`;
    }

    return {
      text: responseText,
      usage: {
        promptTokens: prompt.length,
        completionTokens: responseText.length,
      }
    };
  } catch (error) {
    console.error('API error:', error);
    throw error;
  }
};

/**
 * Check if the API is available
 * Uses a test query to the RAG search endpoint to check availability
 */
export const checkApiStatus = async (): Promise<boolean> => {
  try {
    // Test the RAG search endpoint with a simple query
    const response = await fetch(`${API_BASE_URL}/rag/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: 'test' }),
      // Set a short timeout to avoid long waits
      signal: AbortSignal.timeout(5000),
    });
    
    return response.ok;
  } catch (error) {
    console.error('API status check failed:', error);
    return false;
  }
};
