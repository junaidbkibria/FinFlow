"use client";

import { useState } from "react";
import { useTransactionFilters } from "./hooks/useTransactionFilters";
import TransactionTable from "./TransactionTable";
import AddTransactionModal from "./AddTransactionModal";
import SuccessModal from "./SuccessModal";
import { TransactionFormValues } from "./types";
import { useTransactionStore } from "@/app/store/TransactionStore";
import { Transaction } from "@/app/types/transaction";
import TableFilters from "./TableFilter";

export default function TransactionList() {
  const { transactions, addTransaction } = useTransactionStore();
  const [modalOpen, setModalOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);

  const { filters, filtered, setSearch, setCategory, setStatus, resetFilters } =
    useTransactionFilters(transactions);

  const handleAdd = (data: TransactionFormValues) => {
    const newTransaction: Transaction = {
      id: `txn_${Date.now()}`,
      ...data,
      amount: Number(data.amount),
    };
    addTransaction(newTransaction);
    setModalOpen(false);
    setSuccessOpen(true);
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Header */}
      <div>
        <h1 className="text-xl font-semibold text-slate-800 dark:text-white tracking-tight">
          Transactions
        </h1>
        <p className="text-sm text-slate-400 dark:text-neutral-500 mt-0.5">
          {filtered.length} transaction{filtered.length !== 1 ? "s" : ""} found
        </p>
      </div>

      {/* Card */}
      <div className="bg-white dark:bg-neutral-950 rounded-2xl border border-slate-200 dark:border-neutral-800 shadow-sm p-5 sm:p-6 flex flex-col gap-5">
        <TableFilters
          filters={filters}
          onSearch={setSearch}
          onCategory={setCategory}
          onStatus={setStatus}
          onReset={resetFilters}
          onAdd={() => setModalOpen(true)}
        />
        <TransactionTable data={filtered} />
      </div>

      <AddTransactionModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleAdd}
      />

      <SuccessModal open={successOpen} onClose={() => setSuccessOpen(false)} />
    </div>
  );
}
