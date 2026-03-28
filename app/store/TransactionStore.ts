import { create } from "zustand";
import { Transaction } from "../types/transaction";
import { data } from "../data/data";

const STORAGE_KEY = "transactions";

interface TransactionStore {
  transactions: Transaction[];
  addTransaction: (transaction: Transaction) => void;
  removeTransaction: (id: string) => void;
  updateTransaction: (id: string, updated: Partial<Transaction>) => void;
}

function loadFromStorage(): Transaction[] {
  if (typeof window === "undefined") return [];

  const stored = localStorage.getItem(STORAGE_KEY);

  if (stored) {
    return JSON.parse(stored) as Transaction[];
  }

  // First time: seed from data.ts and persist
  const seed = data.transactions as Transaction[];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(seed));
  return seed;
}

function saveToStorage(transactions: Transaction[]): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
  }
}

export const useTransactionStore = create<TransactionStore>((set) => ({
  transactions: loadFromStorage(),

  addTransaction: (transaction) =>
    set((state) => {
      const updated = [...state.transactions, transaction];
      saveToStorage(updated);
      return { transactions: updated };
    }),

  removeTransaction: (id) =>
    set((state) => {
      const updated = state.transactions.filter((t) => t.id !== id);
      saveToStorage(updated);
      return { transactions: updated };
    }),

  updateTransaction: (id, updatedFields) =>
    set((state) => {
      const updated = state.transactions.map((t) =>
        t.id === id ? { ...t, ...updatedFields } : t
      );
      saveToStorage(updated);
      return { transactions: updated };
    }),
}));
