## Live Link 

# https://finflow-junaid.vercel.app/

## Project Setup

# 1. Clone the repository
git clone https://github.com/your-username/finflow.git
cd finflow

# 2. Install dependencies
npm install

# 3. Run the development server
npm run dev

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Folder Structure

src/
├── app/
│   ├── page.tsx                        # Home page — summary cards + charts
│   ├── layout.tsx                      # Root layout with AntD ConfigProvider
│   └── transactions/
│       └── page.tsx                    # Transactions route (/transactions)
│
├── components/
│   ├── Navbar.tsx                      # Sticky navbar with route-aware link
│   ├── SummaryCard.tsx                 # Reusable card (income / expense / balance)
│   ├── SummaryCards.tsx                # Computes totals, renders 3 SummaryCards
│   │
│   ├── SpendingDonut/                  # Donut chart — spending by category
│   │   ├── index.tsx
│   │   ├── types.ts
│   │   ├── constants.ts
│   │   ├── utils.ts
│   │   ├── CenterLabel.tsx
│   │   └── CustomTooltip.tsx
│   │
│   ├── SpendingTrend/                  # Area chart — monthly income vs expense
│   │   ├── index.tsx
│   │   ├── types.ts
│   │   ├── constants.ts
│   │   ├── utils.ts
│   │   └── CustomTooltip.tsx
│   │
│   └── TransactionTable/              # Full transaction list page component
│       ├── index.tsx                  # Composes everything, owns modal state
│       ├── TransactionTable.tsx       # Ant Design Table with pagination
│       ├── TableFilters.tsx           # Search, category, status filters
│       ├── TransactionForm.tsx        # React Hook Form + Yup form
│       ├── AddTransactionModal.tsx    # Modal wrapper for the form
│       ├── SuccessModal.tsx           # Post-submission success feedback
│       ├── columns.tsx                # Ant Table column definitions
│       ├── types.ts
│       ├── constants.ts
│       └── hooks/
│           ├── useTransactionFilters.ts   # Filter, search, sort logic
│           └── useTransactionForm.ts      # Schema definition + form setup
│
├── data/
│   └── data.ts                        # 80 seed transactions (initial data)
│
├── store/
│   ├── transactionStore.ts            # Zustand store with localStorage sync
│   └── selectors.ts                   # Pure functions — income, expense, balance
│
└── types/
    └── transaction.ts                 # Core TypeScript interfaces and union types

## State Management — Zustand

Zustand was chosen over alternatives like Redux Toolkit or React Context for the following reasons:

Minimal boilerplate — a single create() call defines the store, actions, and initial state together with no reducers, action creators, or providers required.

No Provider wrapping — unlike Context, Zustand stores are module-level singletons. Any component can subscribe to the store without being wrapped in a provider tree, which keeps layout.tsx clean.

Selective subscriptions — components subscribe to only the slice they need (useTransactionStore((s) => s.transactions)), so unrelated state changes don't trigger unnecessary re-renders.

localStorage sync is trivial — the store reads from localStorage on initialization and writes back on every mutation with plain JS, no middleware needed.

Derived state stays out of the store — values like total income, expense, and balance are computed via selector functions in selectors.ts rather than stored. This keeps the store as a single source of truth and eliminates the risk of stale derived values.


## Trade-offs & Shortcuts

No backend or database — all data is persisted in localStorage. This is intentional for a client-only demo but means data is device-specific and lost if the browser storage is cleared.

No authentication — there is no user login or session management. In a production app, data would be scoped per user on a server.

Seed data is static — the 80 transactions in data.ts are hardcoded. A real app would fetch initial data from an API.

No edit or delete on transactions — the store supports updateTransaction and removeTransaction but no UI was built for them within the time available. Only adding is exposed.

Charts use mock month ranges — computeTrendData() builds the last 6 months dynamically from today's date, so the chart always shows the current window. If the seed data falls outside this window it won't appear on the chart — additional seed data was added manually for recent months to compensate.

No dark mode for AntD — Tailwind dark mode classes are applied throughout but Ant Design's own dark theme token (theme: { algorithm: theme.darkAlgorithm }) was not wired up, so AntD components like the Table, Modal, and Select don't respond to dark mode.

No toast notifications — a success modal was used instead of a toast/snackbar system, which is slightly heavier for a transient confirmation message.


## What I Would Improve Given More Time

Edit & delete transactions — add inline row actions to the table (edit opens the same form pre-filled, delete triggers a confirmation modal) using the existing updateTransaction and removeTransaction store actions.

Full dark mode — wire up Ant Design's ConfigProvider with theme.darkAlgorithm toggled by a theme switch in the navbar, synced to localStorage.

Backend + database — replace localStorage with a proper API (e.g. Next.js API routes + PostgreSQL via Prisma) so data persists across devices and sessions.

Authentication — add user accounts with NextAuth.js so each user sees only their own transactions.

Data export — allow users to export their transaction history as a CSV or PDF for personal record keeping.

More chart types — a bar chart comparing category spending month-over-month, and a net worth trend line over time.

Budget limits — let users set a monthly spending cap per category and visually flag when they're approaching or exceeding it.

Recurring transactions — support marking a transaction as recurring (weekly, monthly) so it auto-generates entries without manual input each time.

Unit & integration tests — add Jest tests for selectors and utility functions, and React Testing Library tests for the form validation and filter logic.

Performance — for very large transaction lists, virtualize the table rows with react-window and memoize column definitions to avoid re-computation on every render.



