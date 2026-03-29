import Navbar from "../components/Navbar/Navbar";
import TransactionList from "../components/TransactionTable";

export default function TransactionsPage() {
  return (
    <main className="min-h-screen bg-slate-100 dark:bg-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <TransactionList />
      </div>
    </main>
  );
}
