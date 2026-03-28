"use client";

import { useMemo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { computeTrendData, formatCurrency } from "./utils";
import {
  INCOME_COLOR,
  EXPENSE_COLOR,
  INCOME_FILL,
  EXPENSE_FILL,
} from "./constants";
import CustomTooltip from "./CustomTooltip";
import { useTransactionStore } from "@/app/store/TransactionStore";

export default function SpendingTrend() {
  const transactions = useTransactionStore((s) => s.transactions);
  const data = useMemo(() => computeTrendData(transactions), [transactions]);

  const maxVal = Math.max(...data.flatMap((d) => [d.income, d.expense]));

  return (
    <div className="bg-white dark:bg-neutral-950 rounded-2xl border border-slate-200 dark:border-neutral-800 shadow-sm p-5 sm:p-7">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-base font-semibold text-slate-800 dark:text-white tracking-tight">
            Monthly Spending Trends
          </h2>
          <p className="text-xs text-slate-400 dark:text-neutral-500 mt-0.5">
            Income vs expenses over the last 6 months
          </p>
        </div>

        {/* Legend pills */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="flex items-center gap-1.5">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ background: INCOME_COLOR }}
            />
            <span className="text-xs text-slate-500 dark:text-neutral-400 font-medium">
              Income
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ background: EXPENSE_COLOR }}
            />
            <span className="text-xs text-slate-500 dark:text-neutral-400 font-medium">
              Expense
            </span>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="w-full h-56 sm:h-72 lg:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 4, right: 4, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={INCOME_COLOR} stopOpacity={0.18} />
                <stop offset="100%" stopColor={INCOME_COLOR} stopOpacity={0} />
              </linearGradient>
              <linearGradient id="expenseGrad" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor={EXPENSE_COLOR}
                  stopOpacity={0.18}
                />
                <stop offset="100%" stopColor={EXPENSE_COLOR} stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#e2e8f0"
              vertical={false}
            />

            <XAxis
              dataKey="month"
              tick={{ fontSize: 12, fill: "#94a3b8", fontWeight: 500 }}
              axisLine={false}
              tickLine={false}
              dy={8}
            />

            <YAxis
              tick={{ fontSize: 11, fill: "#94a3b8" }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) =>
                v >= 1000 ? `${(v / 1000).toFixed(0)}k` : `${v}`
              }
              width={40}
              domain={[0, Math.ceil(maxVal * 1.15)]}
            />

            <Tooltip
              content={<CustomTooltip />}
              isAnimationActive={false}
              cursor={{
                stroke: "#e2e8f0",
                strokeWidth: 1,
                strokeDasharray: "4 4",
              }}
            />

            <Area
              type="monotone"
              dataKey="income"
              stroke={INCOME_COLOR}
              strokeWidth={2}
              fill="url(#incomeGrad)"
              dot={{ r: 3, fill: INCOME_COLOR, strokeWidth: 0 }}
              activeDot={{ r: 5, fill: INCOME_COLOR, strokeWidth: 0 }}
            />

            <Area
              type="monotone"
              dataKey="expense"
              stroke={EXPENSE_COLOR}
              strokeWidth={2}
              fill="url(#expenseGrad)"
              dot={{ r: 3, fill: EXPENSE_COLOR, strokeWidth: 0 }}
              activeDot={{ r: 5, fill: EXPENSE_COLOR, strokeWidth: 0 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Summary row */}
      <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-100 dark:border-neutral-800">
        {[
          {
            label: "Avg Income",
            value: data.reduce((s, d) => s + d.income, 0) / data.length,
            color: INCOME_COLOR,
          },
          {
            label: "Avg Expense",
            value: data.reduce((s, d) => s + d.expense, 0) / data.length,
            color: EXPENSE_COLOR,
          },
          {
            label: "Best Month",
            value: Math.max(...data.map((d) => d.income - d.expense)),
            color: "#3b82f6",
            prefix: "Net ",
          },
        ].map((stat) => (
          <div key={stat.label} className="flex flex-col gap-0.5">
            <span className="text-xs text-slate-400 dark:text-neutral-500">
              {stat.label}
            </span>
            <span
              className="text-sm font-semibold tabular-nums"
              style={{ color: stat.color }}
            >
              {stat.prefix ?? ""}
              {formatCurrency(stat.value)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
