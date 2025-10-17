import { Inject, Injectable, OnModuleInit, Logger, BadGatewayException } from '@nestjs/common';
import { Observable, firstValueFrom } from 'rxjs';
import { ContextRequest, ContextResponse } from '../types/rag';

interface RAGServiceClient {
  getContext(data: { query: string }): Observable<{
    contexts: string;
    success: boolean;
    error?: string;
  }>;
}

@Injectable()
export class RagService implements OnModuleInit {
  private ragService: RAGServiceClient;
  private readonly logger = new Logger(RagService.name);

  constructor(@Inject('RAG_PACKAGE') private client: any) {}

  onModuleInit() {
    this.ragService = (this.client as any).getService('RAGService');
  }

  async getContextForQuery(query: string): Promise<ContextResponse> {
    this.logger.debug(`Getting context for query: ${query.substring(0, 50)}...`);
    
    try {
      const result = await firstValueFrom(
        this.ragService.getContext({ query })
      );
      
      if (result.success) {
        return {
          contexts: JSON.parse(result.contexts),
          success: true
        };
      } else {
        this.logger.error(`Error getting context: ${result.error}`);
        return {
          contexts: [],
          success: false,
          error: result.error
        };
      }
    } catch (error) {
      this.logger.error(`Exception getting context: ${error.message}`);
      return {
        contexts: [],
        success: false,
        error: error.message
      };
    }
  }
}
