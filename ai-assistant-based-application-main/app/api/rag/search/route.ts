// app/api/rag/search/route.ts
import { NextRequest, NextResponse } from 'next/server';
import http from 'http';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { query } = body;

    if (!query) {
      return NextResponse.json(
        { error: 'Query is required' },
        { status: 400 }
      );
    }

    // Call the RAG service using Node's http module to avoid fetch issues
    const ragServiceHost = 'rag-service.ai-assistant.svc.cluster.local';
    const ragServicePort = 50052;
    
    const postData = JSON.stringify({ query });
    
    const options = {
      hostname: ragServiceHost,
      port: ragServicePort,
      path: '/search',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    // Create promise to handle http request
    const ragResponse = await new Promise<any>((resolve, reject) => {
      const req = http.request(options, (res) => {
        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });
        res.on('end', () => {
          try {
            const parsedData = JSON.parse(data);
            resolve({ status: res.statusCode, data: parsedData });
          } catch (error) {
            reject(new Error('Failed to parse RAG service response'));
          }
        });
      });

      req.on('error', (error) => {
        console.error('RAG service connection error:', error);
        reject(error);
      });

      req.setTimeout(30000, () => {
        console.error('RAG service request timeout after 30 seconds');
        req.destroy();
        reject(new Error('RAG service request timeout'));
      });

      console.log(`Connecting to RAG service at ${ragServiceHost}:${ragServicePort}/search`);
      req.write(postData);
      req.end();
    });

    if (ragResponse.status !== 200) {
      console.error(`RAG service error: ${ragResponse.status}`);
      return NextResponse.json(
        { success: false, error: 'RAG service error', contexts: [] },
        { status: 500 }
      );
    }

    // Return the RAG service response
    return NextResponse.json({
      success: true,
      contexts: ragResponse.data.contexts || [],
      query: ragResponse.data.query || query
    });

  } catch (error) {
    console.error('Error calling RAG service:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to connect to RAG service', contexts: [] },
      { status: 500 }
    );
  }
}
