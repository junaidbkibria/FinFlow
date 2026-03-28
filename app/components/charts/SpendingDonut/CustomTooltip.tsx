import { CustomTooltipProps } from "./types";
import { formatCurrency } from "./utils";

export default function CustomTooltip({ active, payload }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;
  const { name, value, color } = payload[0].payload;

  return (
    <div className="bg-white dark:bg-neutral-900 border border-slate-100 dark:border-neutral-800 rounded-xl px-4 py-3 shadow-lg">
      <div className="flex items-center gap-2 mb-1">
        <span
          className="w-2.5 h-2.5 rounded-full shrink-0"
          style={{ background: color }}
        />
        <span className="text-sm font-medium text-slate-700 dark:text-neutral-200">
          {name}
        </span>
      </div>
      <p className="text-base font-bold text-slate-900 dark:text-white">
        {formatCurrency(value)}
      </p>
    </div>
  );
}
