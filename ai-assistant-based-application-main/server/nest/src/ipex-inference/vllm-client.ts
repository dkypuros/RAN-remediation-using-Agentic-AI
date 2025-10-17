export interface VllmCompletionOpts {
  model?: string;
  maxTokens: number;
  temperature: number;
  prompt: string;
}

export async function callVllm({
  prompt,
  maxTokens,
  temperature,
  model = 'vllm',          // Updated to use available model
}: VllmCompletionOpts): Promise<string> {
  const baseUrl = process.env.VLLM_API_URL;
  if (!baseUrl) {
    throw new Error('VLLM_API_URL not set');
  }

  // Use Node.js native https module with SSL validation disabled
  return new Promise((resolve, reject) => {
    const https = require('https');
    const url = new URL(baseUrl);
    
    const postData = JSON.stringify({
      model,
      prompt,
      max_tokens: maxTokens,
      temperature,
      stream: false,
    });
    
    const options = {
      hostname: url.hostname,
      port: url.port || 443,
      path: url.pathname + url.search,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      },
      rejectUnauthorized: false // Equivalent to curl -k
    };
    
    const req = https.request(options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        if (res.statusCode !== 200) {
          reject(new Error(`vLLM server returned ${res.statusCode}`));
          return;
        }
        
        try {
          const parsedData = JSON.parse(data);
          resolve(parsedData.choices?.[0]?.text ?? '');
        } catch (error) {
          reject(new Error(`Failed to parse response: ${error.message}`));
        }
      });
    });
    
    req.on('error', (error) => {
      reject(new Error(`Request failed: ${error.message}`));
    });
    
    req.write(postData);
    req.end();
  });
}
