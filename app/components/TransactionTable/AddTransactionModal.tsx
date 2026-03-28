"use client";

import { Modal } from "antd";
import TransactionForm from "./TransactionForm";
import { TransactionFormValues } from "./types";

interface AddTransactionModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: TransactionFormValues) => void;
}

export default function AddTransactionModal({
  open,
  onClose,
  onSubmit,
}: AddTransactionModalProps) {
  return (
    <Modal
      open={open}
      onCancel={onClose}
      title={
        <div className="flex flex-col gap-0.5 pb-1">
          <span className="text-base font-semibold text-slate-800">
            Add Transaction
          </span>
          <span className="text-xs font-normal text-slate-400">
            Fill in the details below to record a new transaction.
          </span>
        </div>
      }
      footer={null}
      destroyOnHidden
      width={520}
    >
      <TransactionForm onSubmit={onSubmit} onCancel={onClose} />
    </Modal>
  );
}
