import "server-only";

import { vectorStore } from "@/lib/ai/client";

class ChatService {
  async similaritySearch(question: string) {
    const chunks = await vectorStore.similaritySearch(question, 3);
    const context = chunks.map((chunk) => chunk.pageContent).join("/n/n");
    return context;
  }
}

export const chatService = new ChatService();
