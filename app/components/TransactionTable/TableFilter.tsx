"use client";

import { Input, Select, Button } from "antd";
import { FilterState } from "./types";
import { CATEGORY_OPTIONS, STATUS_OPTIONS } from "./constants";

interface TableFiltersProps {
  filters: FilterState;
  onSearch: (val: string) => void;
  onCategory: (val: string) => void;
  onStatus: (val: string) => void;
  onReset: () => void;
  onAdd: () => void;
}

export default function TableFilters({
  filters,
  onSearch,
  onCategory,
  onStatus,
  onReset,
  onAdd,
}: TableFiltersProps) {
  const hasActiveFilters = filters.search || filters.category || filters.status;

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:flex-wrap">
      {/* Search */}
      <Input.Search
        placeholder="Search description..."
        value={filters.search}
        onChange={(e) => onSearch(e.target.value)}
        allowClear
        className="w-full sm:w-56"
      />

      {/* Category filter */}
      <Select
        value={filters.category || ""}
        onChange={onCategory}
        options={CATEGORY_OPTIONS}
        className="w-full sm:w-44"
      />

      {/* Status filter */}
      <Select
        value={filters.status || ""}
        onChange={onStatus}
        options={STATUS_OPTIONS}
        className="w-full sm:w-40"
      />

      {/* Reset */}
      {hasActiveFilters && (
        <Button onClick={onReset} size="middle">
          Reset
        </Button>
      )}

      {/* Spacer */}
      <div className="flex-1" />

      {/* Add Transaction */}
      <Button
        type="primary"
        onClick={onAdd}
        className="!bg-indigo-600 hover:!bg-indigo-500 !border-indigo-600 w-full sm:w-auto"
      >
        + Add Transaction
      </Button>
    </div>
  );
}
