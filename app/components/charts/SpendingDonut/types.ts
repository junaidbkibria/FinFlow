export interface DonutEntry {
  name: string;
  value: number;
  color: string;
}

export interface CustomTooltipProps {
  active?: boolean;
  payload?: { payload: DonutEntry }[];
}

export interface CenterLabelProps {
  viewBox?: { cx: number; cy: number };
  total: number;
  active: DonutEntry | null;
}
