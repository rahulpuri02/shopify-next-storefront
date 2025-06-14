import { FILTER_OPERATIONS } from "@/constants/shared";

export type FilterOperation = (typeof FILTER_OPERATIONS)[keyof typeof FILTER_OPERATIONS];

export type Menu = {
  title: string;
  path: string;
  items?: Menu[];
};
