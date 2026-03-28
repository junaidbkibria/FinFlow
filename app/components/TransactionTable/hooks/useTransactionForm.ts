import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { TransactionFormValues } from "../types";
import { CATEGORIES, STATUSES, TYPES } from "../constants";
import {
  TransactionCategory,
  TransactionStatus,
  TransactionType,
} from "@/app/types/transaction";

const schema = yup.object({
  description: yup
    .string()
    .min(3, "Description must be at least 3 characters")
    .required("Description is required"),
  amount: yup
    .number()
    .typeError("Amount must be a number")
    .positive("Amount must be greater than 0")
    .required("Amount is required"),
  type: yup
    .mixed<TransactionType>()
    .oneOf(TYPES as unknown as TransactionType[])
    .required("Type is required"),
  category: yup
    .mixed<TransactionCategory>()
    .oneOf(CATEGORIES as TransactionCategory[])
    .required("Category is required"),
  date: yup
    .string()
    .required("Date is required")
    .test("not-future", "Future dates are not permitted", (value) => {
      if (!value) return false;
      return new Date(value) <= new Date();
    }),
  status: yup
    .mixed<TransactionStatus>()
    .oneOf(STATUSES as unknown as TransactionStatus[])
    .required("Status is required"),
});

export function useTransactionForm(
  onSuccess: (data: TransactionFormValues) => void
) {
  const form = useForm<TransactionFormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      description: "",
      amount: undefined,
      type: undefined,
      category: undefined,
      date: "",
      status: undefined,
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    onSuccess(data);
    form.reset();
  });

  return { form, onSubmit };
}
