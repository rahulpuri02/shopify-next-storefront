"use server";

import { aiService } from "@/services/ai.service";

export async function syncAllData() {
  try {
    await aiService.syncAllData();
    return { success: true };
  } catch (error) {
    console.error("Error syncing data:", error);
    return { success: false, error: (error as Error).message };
  }
}
