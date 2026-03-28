"use client";

import { Table } from "antd";
import { getColumns } from "./columns";
import { Transaction } from "@/app/types/transaction";

interface TransactionTableProps {
  data: Transaction[];
}

export default function TransactionTable({ data }: TransactionTableProps) {
  const columns = getColumns();

  return (
    <Table<Transaction>
      columns={columns}
      dataSource={data}
      rowKey="id"
      pagination={{
        pageSize: 10,
        showSizeChanger: false,
        showTotal: (total, range) =>
          `${range[0]}–${range[1]} of ${total} transactions`,
        className: "!text-sm",
      }}
      scroll={{ x: "max-content" }}
      size="middle"
      rowClassName="hover:bg-slate-50 transition-colors"
      className="!rounded-xl overflow-hidden"
    />
  );
}
