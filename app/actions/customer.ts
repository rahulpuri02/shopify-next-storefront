"use server";

import { TAGS } from "@/constants/shopify";
import { getZodFirstErrorMessage } from "@/lib/server-utils";
import { customerService } from "@/services/customer.service";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { z } from "zod";

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
  const customerAddress = Object.fromEntries(formData.entries());
  try {
    const parsedCustomerAddress = customerAddressSchema.safeParse(customerAddress);

    if (!parsedCustomerAddress.success) {
      const firstErrorMessage = getZodFirstErrorMessage(parsedCustomerAddress);
      return { success: false, error: firstErrorMessage };
    }

    const token = (await cookies())?.get("token")?.value;
    if (!token)
      return { success: false, error: "Something went wrong, please refresh the page again" };

    const response = await customerService.createCustomerAddress(token, parsedCustomerAddress.data);
    if (response.success) {
      revalidateTag(TAGS.customer);
    }
    return { success: true, error: null, data: customerAddress };
  } catch (error) {
    console.error("Error while getting customer", error);
    return {
      success: false,
      error: "Something went wrong, please refresh the page",
    };
  }
}

export async function updateCustomerAddress(_: unknown, formData: FormData) {
  const customerAddress = Object.fromEntries(formData.entries());
  try {
    const parsedCustomerAddress = customerAddressSchema.safeParse(customerAddress);

    if (!parsedCustomerAddress.success) {
      const firstErrorMessage = getZodFirstErrorMessage(parsedCustomerAddress);
      return { success: false, error: firstErrorMessage };
    }

    const token = (await cookies())?.get("token")?.value;
    if (!token)
      return {
        success: false,
        error: "Something went wrong, please refresh the page again",
      };

    const response = await customerService.updateCustomerAddress(
      token,
      parsedCustomerAddress.data,
      customerAddress.id as string
    );
    if (response.success) {
      revalidateTag(TAGS.customer);
    }
    return response;
  } catch (error) {
    console.error("Error while getting customer", error);
    return {
      success: false,
      error: "Something went wrong, please refresh the page",
    };
  }
}

export type CustomerAddress = z.infer<typeof customerAddressSchema> & { id: string };
