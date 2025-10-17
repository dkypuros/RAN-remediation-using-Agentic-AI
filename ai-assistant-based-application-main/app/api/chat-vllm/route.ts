import { NextRequest, NextResponse } from 'next/server';

/**
 * API Route: /api/chat-vllm
 * Integrates RAG context retrieval with vLLM inference
 */

interface ChatRequest {
  message: string;
  maxTokens?: number;
  temperature?: number;
  context?: {
    page?: string;
    ticketId?: string;
    ticketTitle?: string;
    ticketStatus?: string;
    ticketPriority?: string;
    metadata?: Record<string, any>;
  };
}

export async function POST(request: NextRequest) {
  try {
    const body: ChatRequest = await request.json();
    const { message, maxTokens = 200, temperature = 0.7, context } = body;

    console.log('[chat-vllm] Received request:', { message, maxTokens, temperature, context });

    if (!message || message.trim().length === 0) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Step 1: Get relevant context from RAG service
    let ragContext = '';
    try {
      const ragResponse = await fetch(`http://rag-service:50052/search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: message, top_k: 3 }),
      });

      if (ragResponse.ok) {
        const ragData = await ragResponse.json();

        if (ragData.success && ragData.contexts && ragData.contexts.length > 0) {
          ragContext = '\n\nRelevant Context:\n';
          ragData.contexts.forEach((ctx: any, index: number) => {
            const metadata = ctx.metadata?.original || {};
            const type = ctx.metadata?.type || 'unknown';

            ragContext += `\n${index + 1}. [${type}] `;

            if (type === 'ticket') {
              ragContext += `Ticket ${metadata.ticketId || 'Unknown'}: ${metadata.title || 'No title'}\n`;
              ragContext += `   Status: ${metadata.status || 'Unknown'}, Priority: ${metadata.priority || 'Unknown'}\n`;
              ragContext += `   Description: ${metadata.description || 'No description'}\n`;
            } else if (type === 'knowledge_article') {
              ragContext += `${metadata.title || 'Knowledge Article'}\n`;
              ragContext += `   ${metadata.content?.substring(0, 200) || 'No content'}...\n`;
            } else if (type === 'ticket_template') {
              ragContext += `Template: ${metadata.name || 'Unknown'}\n`;
              ragContext += `   ${metadata.fields?.description || 'No description'}\n`;
            }
          });
        }
      }
    } catch (ragError) {
      console.error('[chat-vllm] RAG service error:', ragError);
      // Continue without RAG context if it fails
    }

    console.log('[chat-vllm] RAG context length:', ragContext.length, 'chars');

    // Step 2: Build prompt with context
    let pageContext = '';
    if (context) {
      pageContext = '\n\nCurrent Page Context:\n';
      if (context.page) {
        pageContext += `- User is viewing: ${context.page}\n`;
      }
      if (context.ticketId) {
        pageContext += `- Focused ticket: ${context.ticketId}`;
        if (context.ticketTitle) pageContext += ` - ${context.ticketTitle}`;
        pageContext += '\n';
        if (context.ticketStatus) pageContext += `  Status: ${context.ticketStatus}\n`;
        if (context.ticketPriority) pageContext += `  Priority: ${context.ticketPriority}\n`;
      }
      if (context.metadata?.kanbanColumn) {
        pageContext += `- Column: ${context.metadata.kanbanColumn}\n`;
      }
    }

    const systemPrompt = `You are an intelligent AI Ticket Assistant helping users with IT support tickets and technical issues.

Your role is to:
- Answer questions about tickets and technical issues in 2-3 sentences
- Provide helpful recommendations based on similar past tickets
- Suggest best practices for ticket resolution
- Help identify root causes and solutions
${context ? '- Provide context-aware responses based on the current page and ticket being viewed' : ''}

IMPORTANT: Keep responses concise (2-4 sentences). Be helpful and professional. Stop after answering the current question.`;

    const fullPrompt = `${systemPrompt}
${ragContext}${pageContext}

User Question: ${message}

Assistant Response:`;

    // Step 3: Call vLLM for inference
    const vllmUrl = process.env.VLLM_API_URL;
    if (!vllmUrl) {
      throw new Error('VLLM_API_URL environment variable is not set');
    }

    const vllmResponse = await fetch(vllmUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'vllm',
        prompt: fullPrompt,
        max_tokens: maxTokens,
        temperature: temperature,
        stream: false,
        stop: ['User Question:', '\nUser:', 'Assistant Response:'],
      }),
    });

    if (!vllmResponse.ok) {
      const errorText = await vllmResponse.text();
      console.error('vLLM error:', errorText);
      throw new Error(`vLLM API error: ${vllmResponse.status}`);
    }

    const vllmData = await vllmResponse.json();
    const generatedText = vllmData.choices?.[0]?.text || '';

    console.log('[chat-vllm] vLLM response length:', generatedText.length, 'chars');
    console.log('[chat-vllm] First 200 chars:', generatedText.substring(0, 200));

    // Step 4: Return the response
    return NextResponse.json({
      success: true,
      text: generatedText.trim(),
      hasContext: ragContext.length > 0,
      usage: {
        promptTokens: fullPrompt.length,
        completionTokens: generatedText.length,
      }
    });

  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Internal server error'
      },
      { status: 500 }
    );
  }
}

// Health check endpoint
export async function GET() {
  try {
    const vllmUrl = process.env.VLLM_API_URL;

    if (!vllmUrl) {
      return NextResponse.json({
        status: 'error',
        message: 'VLLM_API_URL not configured'
      }, { status: 503 });
    }

    // Simple test query to vLLM
    const testResponse = await fetch(vllmUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'vllm',
        prompt: 'Hi',
        max_tokens: 1,
        temperature: 0,
      }),
      signal: AbortSignal.timeout(3000),
    });

    const vllmHealthy = testResponse.ok;

    // Test RAG service
    let ragHealthy = false;
    try {
      const ragResponse = await fetch('http://rag-service:50052/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: 'test', top_k: 1 }),
        signal: AbortSignal.timeout(3000),
      });
      ragHealthy = ragResponse.ok;
    } catch {
      ragHealthy = false;
    }

    return NextResponse.json({
      status: 'ok',
      services: {
        vllm: vllmHealthy ? 'healthy' : 'unhealthy',
        rag: ragHealthy ? 'healthy' : 'unhealthy',
      },
      vllmUrl: vllmUrl.replace(/\/v1\/completions$/, ''), // Hide full path
    });

  } catch (error) {
    return NextResponse.json({
      status: 'error',
      message: error instanceof Error ? error.message : 'Health check failed'
    }, { status: 503 });
  }
}
