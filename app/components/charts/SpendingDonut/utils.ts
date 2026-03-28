import { DonutEntry } from "./types";
import { CATEGORY_COLORS } from "./constants";
import { Transaction, TransactionCategory } from "@/app/types/transaction";

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "BDT",
    maximumFractionDigits: 0,
  }).format(value);
}

export function computeDonutData(transactions: Transaction[]): {
  data: DonutEntry[];
  total: number;
} {
  const totals: Partial<Record<TransactionCategory, number>> = {};

  transactions
    .filter((t) => t.type === "expense")
    .forEach((t) => {
      totals[t.category] = (totals[t.category] ?? 0) + t.amount;
    });

  const data: DonutEntry[] = Object.entries(totals)
    .filter(([cat]) => cat !== "Income")
    .map(([cat, value]) => ({
      name: cat,
      value: value as number,
      color: CATEGORY_COLORS[cat] ?? "#94a3b8",
    }))
    .sort((a, b) => b.value - a.value);

  const total = data.reduce((sum, d) => sum + d.value, 0);

  return { data, total };
}
