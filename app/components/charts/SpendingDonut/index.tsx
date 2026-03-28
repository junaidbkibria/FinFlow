"use client";

import { useMemo, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { DonutEntry } from "./types";
import { computeDonutData, formatCurrency } from "./utils";
import CenterLabel from "./CenterLabel";
import CustomTooltip from "./CustomTooltip";
import { useTransactionStore } from "@/app/store/TransactionStore";

export default function SpendingDonut() {
  const transactions = useTransactionStore((s) => s.transactions);
  const [activeEntry, setActiveEntry] = useState<DonutEntry | null>(null);

  const { data, total } = useMemo(
    () => computeDonutData(transactions),
    [transactions]
  );

  return (
    <div className="bg-white dark:bg-neutral-950 rounded-2xl border border-slate-200 dark:border-neutral-800 shadow-sm p-5 sm:p-7 my-3">
      {/* Header */}
      <div className="mb-5">
        <h2 className="text-base font-semibold text-slate-800 dark:text-white tracking-tight">
          Spending Breakdown
        </h2>
        <p className="text-xs text-slate-400 dark:text-neutral-500 mt-0.5">
          Expenses by category
        </p>
      </div>

      {/* Donut */}
      <div className="w-full h-56 sm:h-72 lg:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius="55%"
              outerRadius="75%"
              paddingAngle={3}
              dataKey="value"
              strokeWidth={0}
              onMouseEnter={(_, index) => setActiveEntry(data[index])}
              onMouseLeave={() => setActiveEntry(null)}
            >
              {data.map((entry) => (
                <Cell
                  key={entry.name}
                  fill={entry.color}
                  opacity={
                    activeEntry && activeEntry.name !== entry.name ? 0.25 : 1
                  }
                  style={{ cursor: "pointer", transition: "opacity 0.2s" }}
                />
              ))}
              <CenterLabel total={total} active={activeEntry} />
            </Pie>
            <Tooltip content={<CustomTooltip />} isAnimationActive={false} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-3">
        {data.map((entry) => {
          const pct =
            total > 0 ? ((entry.value / total) * 100).toFixed(1) : "0";
          const isDimmed =
            activeEntry !== null && activeEntry.name !== entry.name;

          return (
            <div
              key={entry.name}
              className="flex flex-col gap-1 transition-opacity duration-200"
              style={{ opacity: isDimmed ? 0.3 : 1 }}
              onMouseEnter={() => setActiveEntry(entry)}
              onMouseLeave={() => setActiveEntry(null)}
            >
              <div className="flex items-center justify-between gap-1">
                <div className="flex items-center gap-1.5 min-w-0">
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ background: entry.color }}
                  />
                  <span className="text-xs font-medium text-slate-600 dark:text-neutral-300 truncate">
                    {entry.name}
                  </span>
                </div>
                <span className="text-xs text-slate-400 dark:text-neutral-500 shrink-0">
                  {pct}%
                </span>
              </div>
              <div className="h-1 w-full bg-slate-100 dark:bg-neutral-800 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{ width: `${pct}%`, background: entry.color }}
                />
              </div>
              <span className="text-xs font-semibold text-slate-800 dark:text-white tabular-nums">
                {formatCurrency(entry.value)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
