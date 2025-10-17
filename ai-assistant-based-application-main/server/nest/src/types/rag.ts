// RAG service types
export interface ContextRequest {
  query: string;
}

export interface ContextResult {
  text: string;
  score: number;
  metadata: {
    type: string;
    original: any;
  };
}

export interface ContextResponse {
  contexts: ContextResult[];
  success: boolean;
  error?: string;
}
