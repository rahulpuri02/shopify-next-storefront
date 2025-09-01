import { buildSystemPrompt, classifyIntent, extractLastUserText } from "@/lib/ai/utils";
import { aiService } from "@/services/ai.service";
import { groq } from "@ai-sdk/groq";
import { convertToModelMessages, streamText, type UIMessage } from "ai";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();
  const userText = extractLastUserText(messages);

  // Intent classification
  const intent = await classifyIntent(userText, messages);

  if (intent.includes("general")) {
    const result = streamText({
      model: groq("gemma2-9b-it"),
      system: buildSystemPrompt({ intent: "general" }),
      messages: convertToModelMessages(messages),
      temperature: 0,
    });

    return result.toUIMessageStreamResponse();
  }

  const isStoreInfo = intent.includes("store-info");
  const context = await aiService.retrieveContext(
    isStoreInfo ? "store-info" : "products-and-collections",
    userText
  );

  const system = buildSystemPrompt({ intent, context });

  const result = streamText({
    model: groq("gemma2-9b-it"),
    system,
    messages: convertToModelMessages(messages),
    temperature: 0,
  });

  return result.toUIMessageStreamResponse();
}
