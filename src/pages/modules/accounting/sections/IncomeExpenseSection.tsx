
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TabsContent } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowRight } from "lucide-react";
import { 
  BarChart, 
  ResponsiveContainer, 
  Tooltip, 
  XAxis, 
  YAxis,
  Bar,
  LineChart,
  Line
} from "recharts";
import { formatCurrency, formatDate } from '../utils/formatters';
import { incomeData, expenseData, recentTransactions } from '../data/mockData';

const IncomeExpenseSection: React.FC = () => {
  return (
    <TabsContent value="income-expense" className="space-y-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Income vs Expenses (2025)</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={incomeData.map((item, index) => ({
                  month: item.month,
                  income: item.amount,
                  expenses: expenseData[index].amount
                }))}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="income" name="Income" fill="#3A8DDE" />
                <Bar dataKey="expenses" name="Expenses" fill="#FF6B6B" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <RecentTransactionsCard />
        <ExpenseBreakdownCard />
      </div>
    </TabsContent>
  );
};

const RecentTransactionsCard: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Description</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentTransactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell className="font-medium">{transaction.description}</TableCell>
                <TableCell>{formatDate(transaction.date)}</TableCell>
                <TableCell className={transaction.amount > 0 ? "text-nyc-success" : "text-nyc-danger"}>
                  {formatCurrency(transaction.amount)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="mt-4 flex justify-end">
          <Button variant="outline" size="sm">
            View All Transactions
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const ExpenseBreakdownCard: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Expense Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={[
                { category: "Office", amount: 1200 },
                { category: "Software", amount: 1800 },
                { category: "Marketing", amount: 2500 },
                { category: "Utilities", amount: 800 },
                { category: "Payroll", amount: 5200 },
              ]}
            >
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="amount" stroke="#0F4C81" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default IncomeExpenseSection;
