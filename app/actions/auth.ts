"use server";

import { getZodFirstErrorMessage } from "@/lib/server-utils";
import { authService } from "@/services/auth.service";
import { cookies } from "next/headers";
import { z } from "zod";

const createAccountSchema = z.object({
  firstName: z.string().trim().min(1, { message: "First name is required" }),
  lastName: z.string().trim().min(1, { message: "Last name is required" }),
  email: z.string().email({ message: "Enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

export type CreateAccountRequest = z.infer<typeof createAccountSchema>;

export async function createAccount(_: unknown, formData: FormData) {
  const user = Object.fromEntries(formData.entries());
  const parsedAccount = createAccountSchema.safeParse(user);

  if (!parsedAccount.success) {
    const firstErrorMessage = getZodFirstErrorMessage(parsedAccount);
    return firstErrorMessage;
  }
  try {
    const error = await authService.createAccount(parsedAccount.data);
    if (error) return error;
  } catch {
    return "Unable to create your account please try again";
  }
}

const signInAccountSchema = z.object({
  email: z.string().email({ message: "Enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

export type SignInAccountRequest = z.infer<typeof signInAccountSchema>;

export async function signInAccount(_: unknown, formData: FormData) {
  const user = Object.fromEntries(formData.entries());
  const parsedAccount = signInAccountSchema.safeParse(user);

  if (!parsedAccount.success) {
    const firstErrorMessage = getZodFirstErrorMessage(parsedAccount);
    return firstErrorMessage;
  }

  try {
    const response = await authService.signInAccount(parsedAccount.data);
    if (typeof response === "string") return response;

    const token = response?.accessToken;
    const tokenExpiry = response?.tokenExpiry;

    if (token) {
      (await cookies()).set("token", token, {
        expires: tokenExpiry,
        httpOnly: true,
        secure: true,
        sameSite: "lax",
      });
    }
  } catch {
    return "Unable to login your account please try again";
  }
}
