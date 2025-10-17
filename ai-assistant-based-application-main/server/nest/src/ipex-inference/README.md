# IPEX Inference Service

This module provides a high-performance inference service using Intel's IPEX (Intel Extension for PyTorch) optimizations for Intel hardware. It uses gRPC for efficient communication between the NestJS backend and the Python inference server.

## Architecture

The implementation consists of:

1. **Python gRPC Server**: A high-performance inference server using IPEX optimizations
2. **NestJS gRPC Client**: A TypeScript client that communicates with the Python server
3. **API Contract**: JSON schema defining the API interface

## Directory Structure

```
ipex-inference/
├── contracts/
│   └── ipex-inference-api.json  # JSON schema contract
├── proto/
│   └── inference.proto          # gRPC protocol definition
├── ipex.module.ts               # NestJS module
├── ipex.service.ts              # NestJS service
├── ipex.controller.ts           # NestJS controller
└── python/
    ├── generate_grpc.py         # Script to generate gRPC code
    ├── inference_server.py      # Python gRPC server
    ├── test_client.py           # Test client
    └── requirements.txt         # Python dependencies
```

## Quick Start

### First-time Setup

Install Python dependencies in a virtual environment:

```bash
# Create and activate a virtual environment
python -m venv venv
venv\Scripts\activate  # Windows
source venv/bin/activate  # Linux/Mac

# Install dependencies
pip install -r requirements.txt

# Generate gRPC code
python generate_grpc.py
```

### Running the Server

To start the inference server:

```bash
# From the python directory
python inference_server.py
```

The server will load the model from `server/models/gemma-2b` and start listening on port 50051.

### Testing the Client

To test the inference server:

```bash
# From the python directory
python test_client.py "What is artificial intelligence?" 50 0.7
```

Arguments:
1. Prompt (string)
2. Max tokens (integer)
3. Temperature (float)

## NestJS Integration

The NestJS module provides a REST API endpoint at `/api/inference` that accepts POST requests with the following JSON body:

```json
{
  "prompt": "What is artificial intelligence?",
  "maxTokens": 50,
  "temperature": 0.7
}
```

## Performance Considerations

This implementation uses several optimizations for high-performance inference:

1. **IPEX Optimizations**: Intel's PyTorch extensions for optimized performance on Intel hardware
2. **gRPC Communication**: Low-latency, high-throughput communication between services
3. **BFloat16 Precision**: Reduced precision for faster computation without significant quality loss
4. **Efficient Memory Management**: Proper device management for Intel XPU

## Why gRPC Instead of Flask

The gRPC approach provides significant performance advantages over Flask:
- Lower latency communication with binary protocol
- Native support for streaming responses
- More efficient serialization/deserialization
- Better support for high-throughput scenarios

Combined with IPEX optimizations, this implementation delivers the performance you need for inference workloads on Intel hardware.
