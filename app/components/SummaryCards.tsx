"use client";

import { selectBalance, selectExpense, selectIncome } from "../store/Selectors";
import { useTransactionStore } from "../store/TransactionStore";
import SummaryCard from "./Summary/SummaryCard";

export default function SummaryCards() {
  const transactions = useTransactionStore((s) => s.transactions);

  const income = selectIncome(transactions);
  const expense = selectExpense(transactions);
  const balance = selectBalance(transactions);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
      <SummaryCard title="Income" amount={income} type="income" />
      <SummaryCard title="Expenses" amount={expense} type="expense" />
      <SummaryCard title="Balance" amount={balance} type="balance" />
    </div>
  );
}
