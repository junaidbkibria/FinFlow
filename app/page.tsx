import Navbar from "./components/Navbar/Navbar";
import SummaryCards from "./components/SummaryCards";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-100 dark:bg-neutral-900">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <SummaryCards />
      </div>
    </main>
  );
}
