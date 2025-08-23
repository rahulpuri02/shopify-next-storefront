import "server-only";

import type { CreateAccountRequest, SignInAccountRequest } from "@/app/actions/auth";
import { TAGS } from "@/constants/shopify";
import { reshapeCustomer } from "@/lib/server-utils";
import { shopifyFetch } from "@/lib/shopify/client";
import {
  createCustomerMutation,
  customerAccessTokenCreateMutation,
  forgotPasswordMutation,
  resetPasswordMutation,
  signOutMutation,
} from "@/lib/shopify/mutations/auth";
import { getCustomerQuery } from "@/lib/shopify/queries/auth";
import type {
  ShopifyCreateAccessTokenOperation,
  ShopifyForgotPasswordOperation,
  ShopifyGetCustomerOperation,
  ShopifyResetPasswordOperation,
  ShopifySignOutOperation,
  ShoppifyCreateCustomerOperation,
} from "@/types/shopify";
import { print } from "graphql";

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
      const response = await shopifyFetch<ShopifyForgotPasswordOperation>({
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

  async resetPassword(id: string, input: { password: string; resetToken: string }) {
    try {
      const response = await shopifyFetch<ShopifyResetPasswordOperation>({
        query: print(resetPasswordMutation),
        variables: { input, id },
      });
      const haveErrors = response.body.data?.customerReset.customerUserErrors;
      if (haveErrors?.length) return { success: false, error: haveErrors[0]?.message };
      return { success: true, error: null };
    } catch (error) {
      return { success: false, error: "Something went wrong, please try again!" };
    }
  }

  async signOut(customerAccessToken: string) {
    try {
      const response = await shopifyFetch<ShopifySignOutOperation>({
        query: print(signOutMutation),
        variables: { customerAccessToken },
      });
      const haveErrors = response?.body?.data?.customerAccessTokenDelete?.userErrors;
      if (haveErrors?.length) return { success: false, error: haveErrors[0]?.message };
      return { success: true, error: null };
    } catch (error) {
      return { success: false, error: "Something went wrong, please try again!" };
    }
  }
}

export const authService = new AuthService();
