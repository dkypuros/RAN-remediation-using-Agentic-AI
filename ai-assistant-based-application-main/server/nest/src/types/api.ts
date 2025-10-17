export interface GenerationRequest {
  prompt: string;
  maxTokens: number;
  temperature: number;
}

export interface GenerationResponse {
  text: string;
  usage: {
    promptTokens: number;
    completionTokens: number;
  };
}
