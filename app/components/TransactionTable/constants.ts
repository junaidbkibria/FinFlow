export const CATEGORIES = [
  "Food",
  "Transport",
  "Utilities",
  "Entertainment",
  "Health",
  "Shopping",
  "Income",
  "Other",
];

export const STATUSES = ["completed", "pending", "failed"] as const;

export const TYPES = ["income", "expense"] as const;

export const CATEGORY_OPTIONS = [
  { label: "All Categories", value: "" },
  ...CATEGORIES.map((c) => ({ label: c, value: c })),
];

export const STATUS_OPTIONS = [
  { label: "All Statuses", value: "" },
  { label: "Completed", value: "completed" },
  { label: "Pending", value: "pending" },
  { label: "Failed", value: "failed" },
];

export const STATUS_BADGE: Record<
  string,
  { label: string; className: string }
> = {
  completed: {
    label: "Completed",
    className: "bg-emerald-50 text-emerald-700 border border-emerald-200",
  },
  pending: {
    label: "Pending",
    className: "bg-amber-50 text-amber-700 border border-amber-200",
  },
  failed: {
    label: "Failed",
    className: "bg-red-50 text-red-600 border border-red-200",
  },
};
