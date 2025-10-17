import os
import json
import time
import grpc
import sys

# Import the generated gRPC code
import inference_pb2
import inference_pb2_grpc

def check_server_status():
    """Check if the model server is running and get connection info"""
    try:
        if not os.path.exists("model_status.json"):
            return False, "Status file not found. Please start the server first.", None
        
        with open("model_status.json", "r") as f:
            status = json.load(f)
            
        if status.get("status") != "loaded":
            return False, "Server status is not 'loaded'", None
            
        port = status.get("port")
        if not port:
            return False, "Server port not found in status file", None
            
        return True, status.get("device_name", "unknown device"), port
    except Exception as e:
        return False, f"Error reading status file: {str(e)}", None

def main():
    # Check server status or use default port
    try:
        is_running, status_msg, port = check_server_status()
        if is_running:
            print(f"Server is running on: {status_msg}")
        else:
            print(f"Warning: {status_msg}")
            print("Using default port 50051")
            port = 50051
    except Exception as e:
        print(f"Warning: Could not check server status: {str(e)}")
        print("Using default port 50051")
        port = 50051

    # Create gRPC channel using localhost
    channel = grpc.insecure_channel(f'localhost:{port}')
    stub = inference_pb2_grpc.InferenceServiceStub(channel)

    def generate_response(model, prompt, max_tokens=32, temperature=0.7):
        """Generate response for given prompt"""
        try:
            start_time = time.time()
            print(f"Sending request at {time.strftime('%H:%M:%S')}...")
            
            # Create request
            request = inference_pb2.InferenceRequest(
                model=model,
                prompt=prompt,
                max_tokens=max_tokens,
                temperature=temperature
            )
            
            # Send request to server
            response = stub.GenerateResponse(request)
            
            elapsed = time.time() - start_time
            print(f"Received response in {elapsed:.2f}s")
            
            if response.success:
                return response.text
            else:
                return f"Error: {response.error}"
        
        except Exception as e:
            return f"Error during inference: {str(e)}"

    # Test inference
    model = "gemma-2b-it"  # Default model
    prompt = "What is AI?"
    max_tokens = 32
    temperature = 0.7
    
    # Allow command line arguments
    if len(sys.argv) > 1:
        prompt = sys.argv[1]
    if len(sys.argv) > 2:
        max_tokens = int(sys.argv[2])
    if len(sys.argv) > 3:
        temperature = float(sys.argv[3])
    
    print("\n-------------------- Output --------------------")
    print(f"Model: {model}")
    print(f"Prompt: {prompt}")
    print(f"Max tokens: {max_tokens}")
    print(f"Temperature: {temperature}")
    print(f"\nResponse: {generate_response(model, prompt, max_tokens, temperature)}")
    print("----------------------------------------------")

if __name__ == "__main__":
    try:
        main()
    except Exception as e:
        print(f"Error: {str(e)}")
