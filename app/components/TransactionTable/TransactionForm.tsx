"use client";

import { Controller } from "react-hook-form";
import { Input, Select, DatePicker, Button } from "antd";
import dayjs from "dayjs";
import { useTransactionForm } from "./hooks/useTransactionForm";
import { TransactionFormValues } from "./types";
import { CATEGORIES, STATUSES, TYPES } from "./constants";

interface TransactionFormProps {
  onSubmit: (data: TransactionFormValues) => void;
  onCancel: () => void;
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="text-xs text-red-500 mt-1">{message}</p>;
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <label className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1 block">
      {children}
    </label>
  );
}

export default function TransactionForm({
  onSubmit,
  onCancel,
}: TransactionFormProps) {
  const { form, onSubmit: handleSubmit } = useTransactionForm(onSubmit);
  const {
    control,
    formState: { errors, isSubmitting },
  } = form;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 pt-2">
      {/* Description */}
      <div>
        <Label>Description</Label>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              placeholder="e.g. Grocery Shopping"
              status={errors.description ? "error" : ""}
            />
          )}
        />
        <FieldError message={errors.description?.message} />
      </div>

      {/* Amount */}
      <div>
        <Label>Amount (BDT)</Label>
        <Controller
          name="amount"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              type="number"
              min={1}
              placeholder="e.g. 1500"
              status={errors.amount ? "error" : ""}
              onChange={(e) => field.onChange(parseFloat(e.target.value))}
            />
          )}
        />
        <FieldError message={errors.amount?.message} />
      </div>

      {/* Type & Category — side by side */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label>Type</Label>
          <Controller
            name="type"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                placeholder="Select type"
                status={errors.type ? "error" : ""}
                className="w-full"
                options={TYPES.map((t) => ({
                  label: t.charAt(0).toUpperCase() + t.slice(1),
                  value: t,
                }))}
              />
            )}
          />
          <FieldError message={errors.type?.message} />
        </div>

        <div>
          <Label>Category</Label>
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                placeholder="Select category"
                status={errors.category ? "error" : ""}
                className="w-full"
                options={CATEGORIES.map((c) => ({ label: c, value: c }))}
              />
            )}
          />
          <FieldError message={errors.category?.message} />
        </div>
      </div>

      {/* Date & Status — side by side */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label>Date</Label>
          <Controller
            name="date"
            control={control}
            render={({ field }) => (
              <DatePicker
                className="w-full"
                status={errors.date ? "error" : ""}
                disabledDate={(d) => d.isAfter(dayjs(), "day")}
                onChange={(_, dateStr) =>
                  field.onChange(Array.isArray(dateStr) ? dateStr[0] : dateStr)
                }
              />
            )}
          />
          <FieldError message={errors.date?.message} />
        </div>

        <div>
          <Label>Status</Label>
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                placeholder="Select status"
                status={errors.status ? "error" : ""}
                className="w-full"
                options={STATUSES.map((s) => ({
                  label: s.charAt(0).toUpperCase() + s.slice(1),
                  value: s,
                }))}
              />
            )}
          />
          <FieldError message={errors.status?.message} />
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
        <Button onClick={onCancel}>Cancel</Button>
        <Button
          htmlType="submit"
          type="primary"
          loading={isSubmitting}
          className="!bg-indigo-600 hover:!bg-indigo-500 !border-indigo-600"
        >
          Add Transaction
        </Button>
      </div>
    </form>
  );
}
