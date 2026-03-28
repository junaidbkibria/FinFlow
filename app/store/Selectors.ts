import { Transaction } from "../types/transaction";

export const selectIncome = (transactions: Transaction[]) =>
  transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

export const selectExpense = (transactions: Transaction[]) =>
  transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

export const selectBalance = (transactions: Transaction[]) =>
  selectIncome(transactions) - selectExpense(transactions);
