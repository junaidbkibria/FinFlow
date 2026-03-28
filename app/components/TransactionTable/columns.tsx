import { TableColumnsType } from "antd";
import { STATUS_BADGE } from "./constants";
import { Transaction } from "@/app/types/transaction";

export function getColumns(): TableColumnsType<Transaction> {
  return [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      sorter: (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
      render: (date: string) =>
        new Date(date).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
      width: 120,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      ellipsis: true,
      render: (text: string) => (
        <span className="text-slate-800 font-medium text-sm">{text}</span>
      ),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      width: 130,
      render: (cat: string) => (
        <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
          {cat}
        </span>
      ),
      //   responsive: ["sm"] as ("sm" | "md" | "lg" | "xl" | "xxl")[],
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      sorter: (a, b) => a.amount - b.amount,
      width: 130,
      render: (amount: number, record: Transaction) => {
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "BDT",
          maximumFractionDigits: 0,
        }).format(amount);
        return (
          <span
            className={`font-semibold text-sm tabular-nums ${
              record.type === "income" ? "text-emerald-600" : "text-red-500"
            }`}
          >
            {record.type === "income" ? "+" : "-"}
            {formatted}
          </span>
        );
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 120,
      render: (status: string) => {
        const badge = STATUS_BADGE[status];
        return (
          <span
            className={`text-xs font-medium px-2.5 py-1 rounded-full ${badge?.className}`}
          >
            {badge?.label ?? status}
          </span>
        );
      },
      //   responsive: ["md"] as ("sm" | "md" | "lg" | "xl" | "xxl")[],
    },
  ];
}
