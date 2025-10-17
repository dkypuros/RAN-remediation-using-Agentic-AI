import os
import grpc_tools
import grpc_tools.protoc as protoc

def generate_grpc_code():
    """Generate gRPC code from proto file"""
    proto_file = "rag.proto"
    current_dir = os.path.dirname(os.path.abspath(__file__))
    
    # Define output paths
    proto_include = os.path.join(grpc_tools.__path__[0], '_proto')
    
    # Generate Python code
    protoc.main([
        "grpc_tools.protoc",
        f"-I{current_dir}",
        f"-I{proto_include}",
        f"--python_out={current_dir}",
        f"--grpc_python_out={current_dir}",
        proto_file
    ])
    
    print(f"Generated gRPC code from {proto_file}")

if __name__ == "__main__":
    generate_grpc_code()
