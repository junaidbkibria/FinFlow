import { Transaction } from "@/app/types/transaction";
import { MonthlyDataPoint } from "./types";

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "BDT",
    maximumFractionDigits: 0,
  }).format(value);
}

export function getLast6Months(): {
  key: string;
  month: string;
  fullMonth: string;
}[] {
  const months = [];
  const now = new Date();

  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    months.push({
      key: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`,
      month: d.toLocaleString("default", { month: "short" }),
      fullMonth: d.toLocaleString("default", {
        month: "long",
        year: "numeric",
      }),
    });
  }

  return months;
}

export function computeTrendData(
  transactions: Transaction[]
): MonthlyDataPoint[] {
  const months = getLast6Months();

  return months.map(({ key, month, fullMonth }) => {
    const inMonth = transactions.filter((t) => t.date.startsWith(key));

    const income = inMonth
      .filter((t) => t.type === "income")
      .reduce((s, t) => s + t.amount, 0);

    const expense = inMonth
      .filter((t) => t.type === "expense")
      .reduce((s, t) => s + t.amount, 0);

    return { month, fullMonth, income, expense };
  });
}
