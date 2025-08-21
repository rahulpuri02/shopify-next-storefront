"use server";

import { TAGS } from "@/constants/shopify";
import { getZodFirstErrorMessage } from "@/lib/server-utils";
import { authService } from "@/services/auth.service";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

const createAccountSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string().email({ message: "Enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

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
      redirect("/my-account/overview");
    }
  } catch {
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

const customerAddressSchema = z.object({
  address1: z.string().optional(),
  address2: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  phone: z.string().optional(),
  zip: z.string().optional(),
});

export async function createCustomerAddress(_: unknown, formData: FormData) {
  try {
    const customerAddress = Object.fromEntries(formData.entries());
    const parsedCustomerAddress = customerAddressSchema.safeParse(customerAddress);

    if (!parsedCustomerAddress.success) {
      const firstErrorMessage = getZodFirstErrorMessage(parsedCustomerAddress);
      return { success: false, error: firstErrorMessage };
    }

    const token = (await cookies())?.get("token")?.value;
    if (!token)
      return { success: false, error: "Something went wrong, please refresh the page again" };

    await authService.createCustomerAddress(token, parsedCustomerAddress.data);
    revalidateTag(TAGS.customer);
    return { success: false, error: null };
  } catch (error) {
    console.error("Error while getting customer", error);
    return { success: false, error: "Something went wrong, please refresh the page" };
  }
}

export async function updateCustomerAddress(_: unknown, formData: FormData) {
  try {
    const customerAddress = Object.fromEntries(formData.entries());
    const parsedCustomerAddress = customerAddressSchema.safeParse(customerAddress);

    if (!parsedCustomerAddress.success) {
      const firstErrorMessage = getZodFirstErrorMessage(parsedCustomerAddress);
      return { success: false, error: firstErrorMessage };
    }

    const token = (await cookies())?.get("token")?.value;
    if (!token)
      return { success: false, error: "Something went wrong, please refresh the page again" };

    await authService.updateCustomerAddress(
      token,
      parsedCustomerAddress.data,
      customerAddress.id as string
    );
    revalidateTag(TAGS.customer);
    return { success: true, error: null };
  } catch (error) {
    console.error("Error while getting customer", error);
    return { success: false, error: "Something went wrong, please refresh the page" };
  }
}

export type SignInAccountRequest = z.infer<typeof signInAccountSchema>;
export type CreateAccountRequest = z.infer<typeof createAccountSchema>;
export type CustomerAddress = z.infer<typeof customerAddressSchema> & { id: string };
