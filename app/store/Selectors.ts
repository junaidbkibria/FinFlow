import { Transaction } from "../types/transaction";

export const selectIncome = (transactions: Transaction[]) =>
  transactions
    .filter((t) => t.type === "income" && t.status !== "failed")
    .reduce((sum, t) => sum + t.amount, 0);

export const selectExpense = (transactions: Transaction[]) =>
  transactions
    .filter((t) => t.type === "expense" && t.status !== "failed")
    .reduce((sum, t) => sum + t.amount, 0);

export const selectBalance = (transactions: Transaction[]) =>
  selectIncome(transactions) - selectExpense(transactions);
