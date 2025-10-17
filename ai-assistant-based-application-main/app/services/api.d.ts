/**
 * TypeScript declarations for the API service
 */

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

/**
 * Generate text using the inference API with RAG enhancement
 * @param prompt The user's query or message
 */
export function generateText(prompt: string): Promise<GenerationResponse>;

/**
 * Check if the API is available
 */
export function checkApiStatus(): Promise<boolean>;
