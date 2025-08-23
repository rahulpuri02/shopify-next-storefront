import { type CustomerAddress } from "@/app/actions/customer";
import { TAGS } from "@/constants/shopify";
import { shopifyFetch } from "@/lib/shopify/client";
import {
  createCustomerAddressMutation,
  updateCustomerAddressMutation,
} from "@/lib/shopify/mutations/customer";
import type {
  ShopifyCreateCustomerAddressOperation,
  ShopifyUpdateCustomerAddressOperation,
} from "@/types/shopify";

import { print } from "graphql";

class CustomerService {
  async createCustomerAddress(customerAccessToken: string, address: Partial<CustomerAddress>) {
    try {
      const response = await shopifyFetch<ShopifyCreateCustomerAddressOperation>({
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
      const response = await shopifyFetch<ShopifyUpdateCustomerAddressOperation>({
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

export const customerService = new CustomerService();
