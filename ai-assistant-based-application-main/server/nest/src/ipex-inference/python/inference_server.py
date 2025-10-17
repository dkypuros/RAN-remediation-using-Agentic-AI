import os
import json
import time
import threading
import grpc
from concurrent import futures
import torch
import intel_extension_for_pytorch as ipex
from transformers import AutoModelForCausalLM, AutoTokenizer
import sys
import traceback

# Import the generated gRPC code
import inference_pb2
import inference_pb2_grpc

# Initialize model and tokenizer
# Use a widely supported model instead of Gemma
MODEL_NAME = "gpt2"  # Using GPT-2 as it's widely supported
DEVICE = "cpu"  # Using CPU instead of XPU for compatibility
BATCH_SIZE = 4

try:
    print(f"Loading tokenizer and model {MODEL_NAME}...")
    tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
    
    # Load model with optimizations
    model = AutoModelForCausalLM.from_pretrained(
        MODEL_NAME,
        torch_dtype=torch.float32  # Using float32 for CPU
    ).to(DEVICE)
    
    # Optimize execution with IPEX if using Intel hardware
    if DEVICE == "xpu":
        model = ipex.optimize(model)
        print("Model optimized with IPEX")
    else:
        print("Using CPU, IPEX optimization skipped")
    
except Exception as e:
    print(f"Error during initialization: {str(e)}")
    print(traceback.format_exc())
    sys.exit(1)

class InferenceServicer(inference_pb2_grpc.InferenceServiceServicer):
    """Provides methods for gRPC inference"""

    def GenerateResponse(self, request, context):
        """Handles inference requests"""
        try:
            start_time = time.time()
            print(f"\nReceived request: {request.prompt[:50]}...")
            
            # Tokenize input
            input_ids = tokenizer.encode(request.prompt, return_tensors="pt").to(DEVICE)
            
            # Set generation parameters
            max_tokens = request.max_tokens if request.max_tokens > 0 else 32
            temperature = request.temperature if request.temperature > 0 else 0.7
            
            # Generate text
            with torch.inference_mode():
                output = model.generate(
                    input_ids,
                    max_new_tokens=max_tokens,
                    temperature=temperature,
                    top_p=0.95,
                    do_sample=True
                )
            
            # Decode output
            generated_text = tokenizer.decode(output[0], skip_special_tokens=True)
            
            # Remove the prompt from the generated text to get only the new content
            if generated_text.startswith(request.prompt):
                generated_text = generated_text[len(request.prompt):].strip()
            
            print(f"Generated response in {time.time() - start_time:.2f}s")
            
            return inference_pb2.InferenceResponse(
                text=generated_text,
                success=True
            )
            
        except Exception as e:
            print(f"Error in GenerateResponse: {str(e)}")
            print(traceback.format_exc())
            return inference_pb2.InferenceResponse(
                success=False,
                error=str(e)
            )

def main():
    try:
        print("Starting inference server...")
        
        # Start gRPC server
        server = grpc.server(
            futures.ThreadPoolExecutor(max_workers=10),
            options=[
                ('grpc.max_send_message_length', 50 * 1024 * 1024),
                ('grpc.max_receive_message_length', 50 * 1024 * 1024),
                ('grpc.keepalive_time_ms', 30000),
                ('grpc.keepalive_timeout_ms', 10000),
            ]
        )
        inference_pb2_grpc.add_InferenceServiceServicer_to_server(
            InferenceServicer(), server
        )

        port = 50051
        server.add_insecure_port(f'[::]:{port}')
        server.start()
        print(f"Server running on port {port}...")

        # Save server status
        status = {
            "status": "loaded",
            "port": port,
            "device_name": DEVICE
        }
        with open("model_status.json", "w") as f:
            json.dump(status, f)
        print("Server status saved to model_status.json")

        server.wait_for_termination()

    except Exception as e:
        print(f"Error in main: {str(e)}")
        print(traceback.format_exc())
        sys.exit(1)

if __name__ == "__main__":
    main()
