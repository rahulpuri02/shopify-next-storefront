"use server";

import { getZodFirstErrorMessage } from "@/lib/server-utils";
import { authService } from "@/services/auth.service";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

const createAccountSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string().email({ message: "Enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  acceptsMarketing: z.preprocess((val) => val === "on", z.boolean().default(false)),
});

export async function createAccount(_: unknown, formData: FormData) {
  const user = Object.fromEntries(formData.entries());
  const parsedAccount = createAccountSchema.safeParse(user);

  if (!parsedAccount.success) {
    const firstErrorMessage = getZodFirstErrorMessage(parsedAccount);
    return { success: false, error: firstErrorMessage };
  }
  try {
    const error = await authService.createAccount(parsedAccount.data);
    if (error) return { error, success: false };
    return { success: true, error: null };
  } catch (error) {
    console.error("Error while creating an account:", error);
    return { error, success: false };
  }
}

const signInAccountSchema = z.object({
  email: z.string().email({ message: "Enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

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
      redirect("/account/overview");
    }
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    return "Unable to login your account please try again";
  }
}

export async function getCustomer() {
  try {
    const token = (await cookies())?.get("token")?.value;
    if (!token) return null;
    return await authService.getCustomer(token);
  } catch (error) {
    console.error("Error while getting customer", error);
    return null;
  }
}

export async function forgotPassword(_: unknown, formData: FormData) {
  const email = formData.get("forgetPasswordEmail");
  const parsedEmail = z.string().safeParse(email);
  if (parsedEmail.error) {
    return { success: false, error: "please provide a valid email address" };
  }
  return await authService.forgotPassword(parsedEmail.data);
}

export async function resetPassword(_: unknown, formData: FormData) {
  const password = formData.get("newPassword");
  const repeatPassword = formData.get("repeatPassword");
  const resetToken = formData.get("token") as string;
  const customerId = formData.get("customerId") as string;
  const parsedPassword = z
    .string()
    .min(6, { message: "Password must be at least 6 characters" })
    .safeParse(password);
  if (parsedPassword.error) {
    return { success: false, error: getZodFirstErrorMessage(parsedPassword) };
  }
  if (password !== repeatPassword)
    return { success: false, error: "Both passwords not match with each other" };

  try {
    const response = await authService.resetPassword(customerId, {
      password: parsedPassword.data,
      resetToken,
    });
    if (response.success) redirect("/account/overview");
    return response;
  } catch (error) {
    console.error("Error while reset password", error);
    return { success: false, error: "Something went wrong, please refresh the page" };
  }
}

export async function signOut() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token)
      return { success: false, error: "Something went wrong, please refresh the page again" };
    const response = await authService.signOut(token);
    if (response.success) {
      cookieStore.delete("token");
      redirect("/");
    }
    return response;
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    console.error("Error while signing out the account;", error);
    return { success: false, error: "Something went wrong, please refresh the page" };
  }
}

export type SignInAccountRequest = z.infer<typeof signInAccountSchema>;
export type CreateAccountRequest = z.infer<typeof createAccountSchema>;
