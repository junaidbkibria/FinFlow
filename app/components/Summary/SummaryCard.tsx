"use client";

import Image from "next/image";
import { Card } from "antd";
import { cardConfig } from "./config";

interface SummaryCardProps {
  title: string;
  amount: number;
  type: "income" | "expense" | "balance";
}

export default function SummaryCard({ title, amount, type }: SummaryCardProps) {
  const config = cardConfig[type];
  const isNegative = amount < 0;

  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "BDT",
    maximumFractionDigits: 0,
  }).format(Math.abs(amount));

  return (
    <Card
      className={`flex-1 !rounded-2xl !shadow-sm !border ${config.cardBg} ${config.cardBorder}`}
      styles={{ body: { padding: "16px 20px" } }}
      style={{ ["--md-padding" as string]: "24px 28px" }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-col gap-0.5">
          <span
            className={`text-xs sm:text-sm font-medium uppercase tracking-widest ${config.accentText}`}
          >
            {title}
          </span>
          <span
            className={`text-xl sm:text-2xl lg:text-3xl font-bold mt-1 leading-tight ${
              isNegative ? "text-red-500" : "text-gray-900"
            }`}
          >
            {formatted}
          </span>
          <span className="text-xs text-gray-400 mt-0.5">{config.label}</span>
        </div>

        <div
          className={`flex items-center justify-center rounded-xl sm:rounded-2xl shrink-0 w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 ${config.iconBg}`}
        >
          <Image
            src={config.iconUrl}
            alt={title}
            width={28}
            height={28}
            className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7"
          />
        </div>
      </div>
    </Card>
  );
}
