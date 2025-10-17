/**
 * API service for communicating with the backend
 */

// Types for API requests and responses
export interface GenerationRequest {
  prompt: string;
  maxTokens: number;
  temperature: number;
}

export interface GenerationResponse {
  text: string;
  usage?: {
    promptTokens: number;
    completionTokens: number;
  };
}

export interface ApiError {
  message: string;
  status?: number;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

/**
 * Context information for context-aware responses
 */
export interface ContextInfo {
  page?: string;
  ticketId?: string;
  ticketTitle?: string;
  ticketStatus?: string;
  ticketPriority?: string;
  metadata?: Record<string, any>;
}

/**
 * Generate text using vLLM with RAG context
 */
export const generateText = async (
  prompt: string,
  context?: ContextInfo
): Promise<GenerationResponse> => {
  try {
    // Call the new vLLM + RAG endpoint
    const response = await fetch(`${API_BASE_URL}/chat-vllm`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: prompt,
        maxTokens: 150,
        temperature: 0.7,
        context,
      }),
    });

    if (!response.ok) {
      throw {
        message: 'Failed to generate response',
        status: response.status,
      };
    }

    const data = await response.json();

    if (!data.success) {
      throw {
        message: data.error || 'Unknown error',
        status: 500,
      };
    }

    return {
      text: data.text,
      usage: data.usage,
    };
  } catch (error) {
    console.error('API error:', error);
    throw error;
  }
};

/**
 * Check if the vLLM + RAG API is available
 * Uses the health check endpoint for quick status
 */
export const checkApiStatus = async (): Promise<boolean> => {
  try {
    // Use the health check endpoint on the vLLM chat route
    const response = await fetch(`${API_BASE_URL}/chat-vllm`, {
      method: 'GET',
      // Longer timeout since health check tests vLLM
      signal: AbortSignal.timeout(10000),
    });

    if (response.ok) {
      const data = await response.json();
      // Check if vLLM is healthy (RAG is optional)
      return data.status === 'ok' &&
             data.services?.vllm === 'healthy';
    }

    return false;
  } catch (error) {
    console.error('API status check failed:', error);
    return false;
  }
};
