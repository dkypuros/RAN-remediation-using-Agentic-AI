import requests
import json
import sys

def get_available_models():
    """
    Get a list of available models from the VLLM API endpoint.
    """
    base_url = "https://vllm-composer-ai-apps.apps.cluster-dz7dt.dz7dt.sandbox2256.opentlc.com"
    models_url = f"{base_url}/v1/models"
    
    print(f"Checking available models at: {models_url}")
    try:
        response = requests.get(models_url, timeout=30)
        
        if response.status_code == 200:
            print("Successfully retrieved available models!")
            models_data = response.json()
            print(json.dumps(models_data, indent=2))
            
            # Extract model IDs if available
            available_models = []
            if isinstance(models_data, dict) and "data" in models_data:
                available_models = [model.get("id", "") for model in models_data["data"]]
            elif isinstance(models_data, list):
                available_models = [model.get("id", "") for model in models_data]
                
            return available_models
        else:
            print(f"Failed to retrieve models: {response.status_code}")
            print(response.text)
            return []
    except requests.exceptions.RequestException as e:
        print(f"Error connecting to models endpoint: {e}")
        return []

def test_vllm_endpoint(model=None):
    """
    Test if the VLLM API endpoint is working by sending a simple request.
    """
    base_url = "https://vllm-composer-ai-apps.apps.cluster-dz7dt.dz7dt.sandbox2256.opentlc.com"
    completions_url = f"{base_url}/v1/completions"
    
    if not model:
        # Try to get available models first
        available_models = get_available_models()
        if available_models:
            model = available_models[0]  # Use the first available model
            print(f"Using model: {model}")
        else:
            # Fallback to a common model name
            model = "gpt2"  # Common default model
            print(f"No models found, trying with default model: {model}")
    
    # Basic prompt to test the API
    payload = {
        "model": model,
        "prompt": "Hello, how are you?",
        "max_tokens": 50,
        "temperature": 0.7
    }
    
    headers = {
        "Content-Type": "application/json"
    }
    
    print(f"Sending request to: {completions_url}")
    try:
        response = requests.post(completions_url, headers=headers, data=json.dumps(payload), timeout=30)
        
        print(f"Status code: {response.status_code}")
        if response.status_code == 200:
            print("API endpoint is working!")
            print("Response:")
            print(json.dumps(response.json(), indent=2))
            return True
        else:
            print(f"API endpoint returned error: {response.status_code}")
            print("Response:")
            print(response.text)
            return False
    except requests.exceptions.RequestException as e:
        print(f"Error connecting to API endpoint: {e}")
        return False

# Try other API endpoints that might be available
def test_chat_endpoint():
    """
    Test if the VLLM chat API endpoint is working.
    """
    base_url = "https://vllm-composer-ai-apps.apps.cluster-dz7dt.dz7dt.sandbox2256.opentlc.com"
    chat_url = f"{base_url}/v1/chat/completions"
    
    # Get available models
    available_models = get_available_models()
    model = available_models[0] if available_models else "gpt2"
    
    payload = {
        "model": model,
        "messages": [
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": "Hello, how are you?"}
        ],
        "max_tokens": 50
    }
    
    headers = {
        "Content-Type": "application/json"
    }
    
    print(f"\nTesting chat endpoint at: {chat_url}")
    try:
        response = requests.post(chat_url, headers=headers, data=json.dumps(payload), timeout=30)
        
        print(f"Status code: {response.status_code}")
        if response.status_code == 200:
            print("Chat API endpoint is working!")
            print("Response:")
            print(json.dumps(response.json(), indent=2))
            return True
        else:
            print(f"Chat API endpoint returned error: {response.status_code}")
            print("Response:")
            print(response.text)
            return False
    except requests.exceptions.RequestException as e:
        print(f"Error connecting to chat API endpoint: {e}")
        return False

if __name__ == "__main__":
    print("=== Testing VLLM API Endpoints ===")
    completions_success = test_vllm_endpoint()
    
    # If completions endpoint failed, try the chat endpoint
    if not completions_success:
        print("\nCompletions endpoint failed, trying chat endpoint...")
        chat_success = test_chat_endpoint()
        sys.exit(0 if chat_success else 1)
    else:
        sys.exit(0)
