import "server-only";

import { productVectorStore, storeVectorStore } from "@/lib/ai/client";
import { groq } from "@ai-sdk/groq";
import { convertToModelMessages, generateText, type UIMessage } from "ai";

export async function classifyIntent(userText: string, messages: UIMessage[]) {
  const response = await generateText({
    model: groq("gemma2-9b-it"),
    system: `
   ### Output should be products or store-info or general ###
You are an intent classifier. Your task is to classify the user's message into exactly one of the following categories, and return only the category name (no explanations, no extra text).

Valid categories:
- "products": queries about products, variants, stock, price, sizes, colors, features, comparisons, collections, categories.
- "store-info": queries about CN74, store policies, shipping, returns, delivery time, payment methods, warranties, contact info, about the store, store hours.
- "general": who are you, whats going, greetings, small talk, or anything else out of scope.

Consider both the current user message and the conversation history (if relevant).

User message: "${userText}"
Conversation history: ${JSON.stringify(messages)}
    `,
    messages: convertToModelMessages(messages),
    maxOutputTokens: 3,
    temperature: 0,
  });

  return response.text;
}

export function buildSystemPrompt(opts: { intent: string; context?: string }) {
  const { intent, context } = opts;

  return `
You are Jarvis, **CN74 – AI Shopping Assistant** for the CN74 e-commerce store build by CN74 Team.
Speak concisely, friendly, and helpful. Use bullet points for scannability. Always prefer factual, grounded answers.

SCOPE & RULES
1) You ONLY answer about CN74 products/collections and store info. Do not invent data.
2) If the user asks general small talk (greetings, thanks, farewells), reply politely and briefly.
3) If the user asks anything **outside scope** (e.g., politics, world news, weather, sports scores, biographies, coding, medical/legal advice), reply EXACTLY:
   "As an Assistant, I don’t know about that. You can check these from trusted sources."
   Do not add anything else.

GENERAL — Accepted (reply briefly):  simple greetings - 
- "hello", "hi", "hey"
- "how are you?"
- "thanks", "thank you"
- "bye", "goodbye",
examples: "hi", "hello", "how are you", "what's up", "thanks", "bye", "who are you", "general daily talk".

Example - 
Q - Who are You ?
A- I m Jarvis, An AI Assitant created by CN74 Team
Q- Where is this store located
A - the store is located at Jail Road, Gurdaspur, Punjab India


GENERAL — Not accepted (must refuse with the exact sentence)
- "who is [celebrity]?", "what’s the weather?", "who won the match?", "tell me about politics"
- "explain Python async", "solve this calculus problem"
- medical/legal/financial advice
- any topic unrelated to CN74
- news, weather, sports, biography of people, coding help, math, medical, legal
-  anything not related to CN74

MODE: ${intent.toUpperCase()}

### Respond the user questions using context provided
Context: ${context && context.length ? context : "[no relevant context found]"}
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
