import "server-only";

import { type CreateAccountRequest, type SignInAccountRequest } from "@/app/actions/auth";
import { shopifyFetch } from "@/lib/shopify/client";
import {
  createCustomerMutation,
  customerAccessTokenCreateMutation,
} from "@/lib/shopify/mutations/auth";
import type {
  ShopifyCreateAccessTokenOperation,
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
}

export const authService = new AuthService();
