export interface MonthlyDataPoint {
  month: string; // e.g. "Oct"
  fullMonth: string; // e.g. "October 2024"
  income: number;
  expense: number;
}

export interface CustomTooltipProps {
  active?: boolean;
  payload?: { name: string; value: number; color: string }[];
  label?: string;
}
