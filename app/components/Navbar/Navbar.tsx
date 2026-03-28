import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 dark:bg-neutral-950/80 backdrop-blur-md border-b border-slate-200 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center shadow-sm group-hover:bg-indigo-500 transition-colors duration-200">
              <span className="text-white text-sm font-bold tracking-tight">
                F
              </span>
            </div>
            <span className="text-xl font-semibold tracking-tight text-slate-900 dark:text-white">
              Fin
              <span className="text-indigo-600 dark:text-indigo-400">Flow</span>
            </span>
          </Link>

          {/* Nav link */}
          <Link
            href="/transactions"
            className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-neutral-300 hover:text-indigo-600 dark:hover:text-indigo-400 border border-slate-200 dark:border-neutral-700 hover:border-indigo-300 dark:hover:border-indigo-600 rounded-lg px-4 py-2 transition-all duration-200 hover:bg-indigo-50 dark:hover:bg-indigo-950"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.8}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 12h16.5m0 0-6.75-6.75M20.25 12l-6.75 6.75"
              />
            </svg>
            Transactions
          </Link>
        </div>
      </div>
    </nav>
  );
}
