import { CustomTooltipProps } from "./types";
import { formatCurrency } from "./utils";
import { INCOME_COLOR, EXPENSE_COLOR } from "./constants";

export default function CustomTooltip({
  active,
  payload,
  label,
}: CustomTooltipProps) {
  if (!active || !payload?.length) return null;

  return (
    <div className="bg-white dark:bg-neutral-900 border border-slate-100 dark:border-neutral-800 rounded-xl px-4 py-3 shadow-lg min-w-[160px]">
      <p className="text-xs font-medium text-slate-400 dark:text-neutral-500 uppercase tracking-wide mb-2">
        {label}
      </p>
      {payload.map((entry) => (
        <div
          key={entry.name}
          className="flex items-center justify-between gap-6"
        >
          <div className="flex items-center gap-1.5">
            <span
              className="w-2 h-2 rounded-full shrink-0"
              style={{
                background:
                  entry.name === "income" ? INCOME_COLOR : EXPENSE_COLOR,
              }}
            />
            <span className="text-xs text-slate-500 dark:text-neutral-400 capitalize">
              {entry.name}
            </span>
          </div>
          <span className="text-xs font-semibold text-slate-800 dark:text-white tabular-nums">
            {formatCurrency(entry.value)}
          </span>
        </div>
      ))}
    </div>
  );
}
