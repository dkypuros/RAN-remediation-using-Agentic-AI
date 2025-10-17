import os
import sys
import subprocess

def main():
    # Get the directory of this script
    script_dir = os.path.dirname(os.path.abspath(__file__))
    
    # Path to the proto file
    proto_file = os.path.join(os.path.dirname(script_dir), 'proto', 'inference.proto')
    
    # Check if the proto file exists
    if not os.path.exists(proto_file):
        print(f"Error: Proto file not found at {proto_file}")
        sys.exit(1)
    
    # Generate Python code from proto file
    try:
        print(f"Generating Python gRPC code from {proto_file}...")
        
        # Use the current Python interpreter (which should be the venv one)
        python_executable = sys.executable
        
        # Command to generate Python code
        cmd = [
            python_executable, "-m", "grpc_tools.protoc",
            f"--proto_path={os.path.dirname(proto_file)}",
            f"--python_out={script_dir}",
            f"--grpc_python_out={script_dir}",
            proto_file
        ]
        
        print(f"Using Python interpreter: {python_executable}")
        print(f"Running command: {' '.join(cmd)}")
        
        # Run the command
        result = subprocess.run(cmd, check=True, capture_output=True, text=True)
        
        print("Python gRPC code generated successfully!")
        print(f"Output files: {os.path.join(script_dir, 'inference_pb2.py')} and {os.path.join(script_dir, 'inference_pb2_grpc.py')}")
        
    except subprocess.CalledProcessError as e:
        print(f"Error generating Python gRPC code: {e}")
        print(f"Command output: {e.stdout}")
        print(f"Command error: {e.stderr}")
        sys.exit(1)
    except Exception as e:
        print(f"Unexpected error: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()
