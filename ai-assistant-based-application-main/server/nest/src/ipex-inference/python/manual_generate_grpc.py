import os
import sys
import subprocess

# Get the directory of this script
script_dir = os.path.dirname(os.path.abspath(__file__))

# Path to the proto file
proto_dir = os.path.join(os.path.dirname(script_dir), 'proto')
proto_file = os.path.join(proto_dir, 'inference.proto')

print(f"Script directory: {script_dir}")
print(f"Proto directory: {proto_dir}")
print(f"Proto file: {proto_file}")
print(f"Python executable: {sys.executable}")

# Check if the proto file exists
if not os.path.exists(proto_file):
    print(f"Error: Proto file not found at {proto_file}")
    sys.exit(1)
else:
    print(f"Proto file exists: {proto_file}")

# Try to import grpc_tools
try:
    import grpc_tools.protoc
    print("Successfully imported grpc_tools.protoc")
except ImportError as e:
    print(f"Error importing grpc_tools.protoc: {e}")
    print("Please install grpc_tools with: pip install grpcio-tools")
    sys.exit(1)

# Generate Python code from proto file
try:
    print(f"Generating Python gRPC code from {proto_file}...")
    
    # Use grpc_tools.protoc directly
    from grpc_tools import protoc
    
    # Arguments for protoc
    protoc_args = [
        'protoc',  # First argument is ignored
        f'--proto_path={proto_dir}',
        f'--python_out={script_dir}',
        f'--grpc_python_out={script_dir}',
        proto_file
    ]
    
    print(f"Running protoc with args: {protoc_args}")
    
    # Run protoc
    result = protoc.main(protoc_args)
    
    if result == 0:
        print("Python gRPC code generated successfully!")
        print(f"Output files: {os.path.join(script_dir, 'inference_pb2.py')} and {os.path.join(script_dir, 'inference_pb2_grpc.py')}")
    else:
        print(f"Error generating Python gRPC code: protoc returned {result}")
        sys.exit(1)
    
except Exception as e:
    print(f"Unexpected error: {e}")
    sys.exit(1)
