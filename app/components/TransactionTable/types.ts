import {
  TransactionCategory,
  TransactionStatus,
  TransactionType,
} from "@/app/types/transaction";

export type SortField = "date" | "amount";
export type SortOrder = "asc" | "desc";

export interface FilterState {
  search: string;
  category: string;
  status: string;
}

export interface TransactionFormValues {
  description: string;
  amount: number;
  type: TransactionType;
  category: TransactionCategory;
  date: string;
  status: TransactionStatus;
}
