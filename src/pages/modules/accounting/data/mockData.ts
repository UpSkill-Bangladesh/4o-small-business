
// Mock data
export const incomeData = [
  { month: "Jan", amount: 12500 },
  { month: "Feb", amount: 14200 },
  { month: "Mar", amount: 16800 },
  { month: "Apr", amount: 15900 },
  { month: "May", amount: 17500 },
];

export const expenseData = [
  { month: "Jan", amount: 8500 },
  { month: "Feb", amount: 9200 },
  { month: "Mar", amount: 10100 },
  { month: "Apr", amount: 9800 },
  { month: "May", amount: 10500 },
];

export const taxDeadlines = [
  {
    id: 1,
    title: "Quarterly Federal Tax Payment",
    deadline: "2025-06-15",
    type: "federal",
    completed: false
  },
  {
    id: 2,
    title: "NYS Sales Tax Filing",
    deadline: "2025-05-20",
    type: "state",
    completed: false
  },
  {
    id: 3,
    title: "NYC Commercial Rent Tax",
    deadline: "2025-06-20",
    type: "city",
    completed: false
  },
  {
    id: 4,
    title: "Quarterly Payroll Tax Return",
    deadline: "2025-07-31",
    type: "federal",
    completed: false
  }
];

export const recentTransactions = [
  {
    id: 1,
    description: "Software Subscription",
    date: "2025-05-13",
    amount: -129.99,
    category: "Software"
  },
  {
    id: 2,
    description: "Client Payment - ABC Corp",
    date: "2025-05-12",
    amount: 1500.00,
    category: "Income"
  },
  {
    id: 3,
    description: "Office Supplies",
    date: "2025-05-10",
    amount: -78.45,
    category: "Office"
  },
  {
    id: 4,
    description: "Client Payment - XYZ Inc",
    date: "2025-05-08",
    amount: 2750.00,
    category: "Income"
  }
];
