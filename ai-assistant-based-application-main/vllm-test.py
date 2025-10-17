import requests
import json

# vLLM API endpoint
VLLM_API_URL = "https://vllm-composer-ai-apps.apps.cluster-sptk8.sptk8.sandbox305.opentlc.com/v1/completions"

def test_vllm_api():
    # Request payload following OpenAI API format
    payload = {
        "model": "ibm/granite-3-2-8b-instruct",
        "prompt": "What is artificial intelligence?",
        "max_tokens": 100,
        "temperature": 0.7,
        "stream": False
    }

    try:
        # Make POST request to vLLM API
        print("Making request with payload:", json.dumps(payload, indent=2))
        response = requests.post(VLLM_API_URL, json=payload)
        print(f"Response status code: {response.status_code}")
        
        response.raise_for_status()
        
        # Parse and print response
        result = response.json()
        print("\nAPI Response:")
        print(json.dumps(result, indent=2))
        
        # Extract generated text
        if "choices" in result and len(result["choices"]) > 0:
            generated_text = result["choices"][0].get("text", "")
            print("\nGenerated Text:")
            print(generated_text)
        
    except requests.exceptions.RequestException as e:
        print(f"Error making API request: {e}")
        if hasattr(e, 'response') and hasattr(e.response, 'text'):
            print("Response text:", e.response.text)
    except json.JSONDecodeError as e:
        print(f"Error parsing JSON response: {e}")

if __name__ == "__main__":
    test_vllm_api()