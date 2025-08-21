import "server-only";

import { shopifyFetch } from "@/lib/shopify/client";
import {
  createCustomerAddressMutation,
  createCustomerMutation,
  customerAccessTokenCreateMutation,
  forgotPasswordMutation,
  updateCustomerAddressMutation,
} from "@/lib/shopify/mutations/auth";
import { getCustomerQuery } from "@/lib/shopify/queries/auth";
import type {
  ShopifyCreateAccessTokenOperation,
  ShopifyGetCustomerOperation,
  ShoppifyCreateCustomerOperation,
} from "@/types/shopify";
import { print } from "graphql";
import type {
  CreateAccountRequest,
  CustomerAddress,
  SignInAccountRequest,
} from "@/app/actions/auth";
import { reshapeCustomer } from "@/lib/server-utils";
import { TAGS } from "@/constants/shopify";

class AuthService {
  async createAccount(input: CreateAccountRequest) {
    try {
      const response = await shopifyFetch<ShoppifyCreateCustomerOperation>({
        query: print(createCustomerMutation),
        variables: { input },
      });
      const haveErrors = response?.body?.data?.customerCreate.customerUserErrors;
      if (haveErrors?.length) return haveErrors[0].message;
    } catch {
      return "Unable to create account try again";
    }
  }

  async signInAccount(input: SignInAccountRequest) {
    try {
      const response: any = await shopifyFetch<ShopifyCreateAccessTokenOperation>({
        query: print(customerAccessTokenCreateMutation),
        variables: { input },
      });
      const haveErrors = response?.body?.data?.customerAccessTokenCreate.customerUserErrors;
      if (haveErrors?.length) return haveErrors[0].message;
      return response?.body?.data?.customerAccessTokenCreate?.customerAccessToken;
    } catch {
      return "Unable to login your account please try again";
    }
  }

  async getCustomer(token: string) {
    try {
      const response = await shopifyFetch<ShopifyGetCustomerOperation>({
        query: print(getCustomerQuery),
        variables: { token },
        tags: [TAGS.customer],
      });
      return reshapeCustomer(response?.body?.data?.customer);
    } catch (error) {
      console.error("Error while getting customer:", error);
      return null;
    }
  }

  async forgotPassword(email: string) {
    try {
      const response: any = await shopifyFetch<{ variables: { email: string } }>({
        query: print(forgotPasswordMutation),
        variables: { email },
      });
      const haveErrors = response?.body?.data?.customerRecover?.customerUserErrors;
      if (haveErrors?.length) return { success: false, error: haveErrors[0]?.message };
      return { success: true, error: null };
    } catch (error) {
      return { success: false, error: "Something went wrong, please try again!" };
    }
  }

  async createCustomerAddress(customerAccessToken: string, address: Partial<CustomerAddress>) {
    try {
      const response = await shopifyFetch<any>({
        query: print(createCustomerAddressMutation),
        variables: { address, customerAccessToken },
        tags: [TAGS.customer],
      });
      const haveErrors = response?.body?.data?.customerAddress?.customerUserErrors;
      if (haveErrors?.length) return { success: false, error: haveErrors[0]?.message };
    } catch (error) {
      return { success: false, error: "Something went wrong, please try again!" };
    }
  }

  async updateCustomerAddress(
    customerAccessToken: string,
    address: Partial<CustomerAddress>,
    id: string
  ) {
    try {
      const response = await shopifyFetch<any>({
        query: print(updateCustomerAddressMutation),
        variables: { address, customerAccessToken, id },
        tags: [TAGS.customer],
      });
      const haveErrors = response?.body?.data?.customerAddressUpdate?.customerUserErrors;
      if (haveErrors?.length) return { success: false, error: haveErrors[0]?.message };
      return { success: true, error: null };
    } catch (error) {
      return { success: false, error: "Something went wrong, please try again!" };
    }
  }
}

export const authService = new AuthService();
