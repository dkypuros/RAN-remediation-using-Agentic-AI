// api/chat.ts
import { getSimilarTickets } from '@/app/lib/tickets';
import { openai } from '@/app/lib/openai';
import OpenAI from 'openai';

type ChatCompletionMessageParam = OpenAI.ChatCompletionMessageParam;

export async function answer(user: string, useStreaming = false) {
  const messages: ChatCompletionMessageParam[] = [
    {
      role: 'system',
      content: `
You are an AI Ticket Assistant. You help users find similar tickets, suggest resolutions, 
and answer questions about ticket management. Always cite the ticket IDs and fields you rely on. 
Reply in concise Markdown format.`
    },
    { role: 'user', content: user }
  ];

  try {
    // Use RAG service to get relevant ticket context
    const tickets = await getSimilarTickets(user);
    messages.push({
      role: 'system',
      content: `Here are relevant tickets and knowledge base articles:

${tickets}`
    });
  } catch (error) {
    console.error('Error retrieving tickets:', error);
    // Let the model handle the error gracefully
    messages.push({
      role: 'system',
      content: 'Unable to retrieve similar tickets at this time. Please provide general assistance based on common ticket management practices.'
    });
  }

  if (useStreaming) {
    // Return a streaming response for better UX
    return openai.chat.completions.create({
      model: 'gpt-4o-mini',
      temperature: 0.3,
      messages,
      stream: true
    });
  } else {
    // Return a complete response
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      temperature: 0.3,
      messages
    });

    return completion.choices[0].message.content;
  }
}
