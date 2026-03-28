"use client";

import { Modal, Button } from "antd";

interface SuccessModalProps {
  open: boolean;
  onClose: () => void;
}

export default function SuccessModal({ open, onClose }: SuccessModalProps) {
  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      centered
      width={360}
      closable={false}
    >
      <div className="flex flex-col items-center text-center gap-4 py-6 px-2">
        {/* Success icon */}
        <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 h-8 text-emerald-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12.75l6 6 9-13.5"
            />
          </svg>
        </div>

        {/* Text */}
        <div className="flex flex-col gap-1">
          <h3 className="text-base font-semibold text-slate-800">
            Transaction Successful
          </h3>
          <p className="text-sm text-slate-400">
            Transaction has been successfully added.
          </p>
        </div>

        {/* OK button */}
        <Button
          type="primary"
          onClick={onClose}
          className="!bg-emerald-500 hover:!bg-emerald-400 !border-emerald-500 w-full mt-1"
        >
          OK
        </Button>
      </div>
    </Modal>
  );
}
