# Quick Testing Guide

## Local Development Testing

To run the AI Ticket Assistant application locally for development and testing:

```bash
# Navigate to the project directory
cd ai-assistant-based-application

# Install dependencies
npm install

# Start the development server
npm run dev
```

The application will be available at http://localhost:3000

## OpenShift AI API Testing

To test the vLLM inference API endpoint on OpenShift AI:

```bash
curl -X POST "https://vllm-composer-ai-apps.apps.cluster-sptk8.sptk8.sandbox305.opentlc.com/v1/completions" \
-H "Content-Type: application/json" \
-d '{
  "model": "vllm",
  "prompt": "What is artificial intelligence?",
  "max_tokens": 100,
  "temperature": 0.7,
  "stream": false
}'
```

### Example Response

```json
{
  "id":"cmpl-938b490c-5c8d-4e4f-bba6-17f014170d39",
  "object":"text_completion",
  "created":1745330615,
  "model":"vllm",
  "choices":[
    {
      "index":0,
      "text":"\n\nArtificial Intelligence (AI) is a branch of computer science that aims to create intelligent machines capable of performing tasks that would normally require human intelligence. These tasks include learning, reasoning, problem-solving, perception, and language understanding.\n\nAI systems are designed to mimic human cognitive functions, enabling them to process large amounts of data, recognize patterns, make decisions, and even learn from their experiences, all without explicit programming for every possible scenario.\n\n",
      "logprobs":null,
      "finish_reason":"length",
      "stop_reason":null,
      "prompt_logprobs":null
    }
  ],
  "usage":{
    "prompt_tokens":7,
    "total_tokens":107,
    "completion_tokens":100,
    "prompt_tokens_details":null
  }
}
```

## Connecting the Application to the API

To configure the AI Ticket Assistant to use the vLLM API endpoint:

1. Update the environment variables in your `.env.local` file (for local development) or in the OpenShift deployment configuration:

```
VLLM_API_ENDPOINT=https://vllm-composer-ai-apps.apps.cluster-sptk8.sptk8.sandbox305.opentlc.com/v1/completions
VLLM_API_KEY=your_api_key_if_required
```

2. Restart the application to apply the changes

## React/TypeScript Integration Example

Here's a practical example of how to integrate the vLLM API into a React component using TypeScript:

### API Service (services/ai-service.ts)

```typescript
import { GenerationRequest, GenerationResponse } from '../types/api';

export class AIService {
  private apiEndpoint: string;
  private apiKey: string | null;

  constructor() {
    this.apiEndpoint = process.env.NEXT_PUBLIC_VLLM_API_ENDPOINT || '';
    this.apiKey = process.env.NEXT_PUBLIC_VLLM_API_KEY || null;
  }

  async generateCompletion(request: GenerationRequest): Promise<GenerationResponse> {
    try {
      const response = await fetch(this.apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(this.apiKey && { 'Authorization': `Bearer ${this.apiKey}` })
        },
        body: JSON.stringify({
          model: 'vllm',
          prompt: request.prompt,
          max_tokens: request.maxTokens,
          temperature: request.temperature,
          stream: false
        })
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      
      // Transform the vLLM API response to match our internal GenerationResponse type
      return {
        text: data.choices[0].text,
        usage: {
          promptTokens: data.usage.prompt_tokens,
          completionTokens: data.usage.completion_tokens
        }
      };
    } catch (error) {
      console.error('Error generating AI completion:', error);
      throw error;
    }
  }
}

// Create a singleton instance
export const aiService = new AIService();
```

### React Component Example (components/SimilarTicketFinder.tsx)

```tsx
'use client';

import React, { useState } from 'react';
import { aiService } from '../services/ai-service';
import { GenerationResponse } from '../types/api';

export default function SimilarTicketFinder() {
  const [ticketDescription, setTicketDescription] = useState('');
  const [similarTickets, setSimilarTickets] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const findSimilarTickets = async () => {
    if (!ticketDescription.trim()) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const prompt = `Find similar tickets to the following description:\n\n${ticketDescription}\n\nList the top 3 similar tickets with their ID, title, and resolution steps.`;
      
      const response = await aiService.generateCompletion({
        prompt,
        maxTokens: 500,
        temperature: 0.3 // Lower temperature for more focused results
      });
      
      setSimilarTickets(response.text);
    } catch (err) {
      setError('Failed to find similar tickets. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Find Similar Tickets</h2>
      
      <div className="space-y-2">
        <label htmlFor="ticketDescription" className="block text-sm font-medium">
          Ticket Description
        </label>
        <textarea
          id="ticketDescription"
          className="w-full min-h-[150px] p-2 border rounded-md"
          value={ticketDescription}
          onChange={(e) => setTicketDescription(e.target.value)}
          placeholder="Describe the issue you're experiencing..."
        />
      </div>
      
      <button
        onClick={findSimilarTickets}
        disabled={isLoading || !ticketDescription.trim()}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300"
      >
        {isLoading ? 'Searching...' : 'Find Similar Tickets'}
      </button>
      
      {error && (
        <div className="p-3 bg-red-100 text-red-700 rounded-md">{error}</div>
      )}
      
      {similarTickets && (
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-2">Similar Tickets Found:</h3>
          <div className="p-4 bg-gray-50 rounded-md whitespace-pre-wrap">
            {similarTickets}
          </div>
        </div>
      )}
    </div>
  );
}
```

### Usage in a Page

```tsx
// app/admin/create-ticket/page.tsx
import SimilarTicketFinder from '@/components/SimilarTicketFinder';

export default function CreateTicketPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Create New Ticket</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          {/* Regular ticket creation form would go here */}
          {/* ... */}
        </div>
        
        <div>
          <SimilarTicketFinder />
        </div>
      </div>
    </div>
  );
}
```

This example demonstrates how to:

1. Create a service that handles API communication with the vLLM endpoint
2. Build a React component that uses the service to find similar tickets
3. Handle loading states and errors properly
4. Display the AI-generated results to the user