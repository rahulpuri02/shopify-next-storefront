import "server-only";

import { INTENT_CLASSIFIER_SYSTEM_PROMPT, PERSONA_SYSTEM_PROMPT } from "@/constants/prompts";
import { productVectorStore, storeVectorStore } from "@/lib/ai/client";
import { google } from "@ai-sdk/google";
import { convertToModelMessages, generateText, type UIMessage } from "ai";

export async function classifyIntent(userText: string, messages: UIMessage[]) {
  const response = await generateText({
    model: google("gemma-3-12b-it"),
    system: `${INTENT_CLASSIFIER_SYSTEM_PROMPT}
Consider both the current user message and the conversation history (if relevant).
User message: "${userText}"
    `,
    messages: convertToModelMessages(messages),
    maxOutputTokens: 5,
    temperature: 0,
  });

  return response.text;
}
export function buildSystemPrompt(opts: { intent: string; context?: string }) {
  const { intent, context } = opts;

  return `${PERSONA_SYSTEM_PROMPT}
CONTEXT PROCESSING:
Current mode: ${intent.toUpperCase()}
Available context: ${context && context.length ? context : "[No relevant product/store context available]"}

Remember: Only use the provided context to answer questions. Never invent or assume information about CN74 products or services that isn't explicitly provided.
`.trim();
}

export function extractLastUserText(messages: UIMessage[]) {
  for (let i = messages.length - 1; i >= 0; i--) {
    if (messages[i].role === "user")
      return messages[i].parts.map((p) => (p.type === "text" ? p.text : "")).join("");
  }
  return "";
}

export async function retrieveContext(
  intent: "products-and-collections" | "store-info",
  query: string
) {
  const vs = intent === "store-info" ? storeVectorStore : productVectorStore;
  const similarResultCount = intent === "store-info" ? 5 : 8;
  const docs = await vs.similaritySearch(query, similarResultCount);
  if (!docs?.length) return "";
  return docs
    .map((d, i) => {
      return `#${i + 1}\n${d.pageContent}\nSOURCE: ${JSON.stringify(d.metadata, null, 2)}`;
    })
    .join("\n\n---\n\n");
}
