import { groq } from "@ai-sdk/groq";
import { streamText, type UIMessage, convertToModelMessages } from "ai";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    model: groq("gemma2-9b-it"),
    messages: convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
}
