import { useMemo, useState } from "react";
import { FilterState, SortField, SortOrder } from "../types";
import { Transaction } from "@/app/types/transaction";

const DEFAULT_FILTERS: FilterState = {
  search: "",
  category: "",
  status: "",
};

export function useTransactionFilters(transactions: Transaction[]) {
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [sortField, setSortField] = useState<SortField>("date");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");

  const filtered = useMemo(() => {
    return transactions
      .filter((t) => {
        const matchesSearch = t.description
          .toLowerCase()
          .includes(filters.search.toLowerCase());
        const matchesCategory = filters.category
          ? t.category === filters.category
          : true;
        const matchesStatus = filters.status
          ? t.status === filters.status
          : true;
        return matchesSearch && matchesCategory && matchesStatus;
      })
      .sort((a, b) => {
        if (sortField === "date") {
          const diff = new Date(a.date).getTime() - new Date(b.date).getTime();
          return sortOrder === "asc" ? diff : -diff;
        }
        const diff = a.amount - b.amount;
        return sortOrder === "asc" ? diff : -diff;
      });
  }, [transactions, filters, sortField, sortOrder]);

  const setSearch = (search: string) =>
    setFilters((prev) => ({ ...prev, search }));

  const setCategory = (category: string) =>
    setFilters((prev) => ({ ...prev, category }));

  const setStatus = (status: string) =>
    setFilters((prev) => ({ ...prev, status }));

  const resetFilters = () => setFilters(DEFAULT_FILTERS);

  return {
    filters,
    filtered,
    sortField,
    sortOrder,
    setSearch,
    setCategory,
    setStatus,
    setSortField,
    setSortOrder,
    resetFilters,
  };
}
