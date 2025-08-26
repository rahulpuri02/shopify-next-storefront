"use server";

import { redirect } from "next/navigation";

export async function updateFilters(pathName: string, params: string) {
  redirect(`${pathName}?${params}`);
}
