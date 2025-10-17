## Architecture

1. The Next.js frontend application contains components like RealtimeChart, TrafficPatternAnomalies, and 
RealtimePacketLogs
 that visualize data

 2. The data files in /data directory (packet-analysis-logs.ts, realtime-packet-logs.json, traffic-pattern-anomalies.json) are primarily used by the frontend for visualization

 3. The NestJS server provides an API interface at /api/inference that accepts generation requests

4. This server can route these requests either to:

    - The local Python gRPC inference server (which uses GPT-2 locally)

    - Or the external vLLM API (configured via environment variable)


The way this is typically set up is:

1. When a user interacts with the AI assistant in the UI (asking about tickets, etc.)

2. The frontend bundles the request with relevant context from the data files

3. It sends this to the NestJS API server

4. The NestJS server forwards this to either the local Python model or vLLM

5. The response is then returned to the UI






## Stack

1. Embedding Storage: in-memory solution

2. Retrieval Layer:

    - Add code in the NestJS server to query the vector database based on user questions
    - Retrieve the most relevant data when a query comes in

3. Augment the Prompts:

    - Enhance the vLLM API calls by including the retrieved context data in the prompts

4. Use sentence-transformers library in Python for embeddings

5. Add an embeddings endpoint to the existing Python server

6. Modify the NestJS server to call this endpoint before making vLLM requests



