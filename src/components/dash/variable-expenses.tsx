"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Plus } from "lucide-react";

interface VariableExpense {
  name: string;
  budgeted: number;
  spent: number;
  transactions: number;
  remaining: number;
}

interface VariableExpensesProps {
  expenses: VariableExpense[];
  totalAmount: number;
  onAddExpense: () => void;
}

export default function VariableExpenses({
  expenses,
  totalAmount,
  onAddExpense,
}: VariableExpensesProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl">Variable Expenses</CardTitle>
          <div className="flex items-center gap-3">
            <Badge
              variant="outline"
              className="px-3 py-1.5 text-sm font-medium"
            >
              ₹ {totalAmount.toLocaleString()}
            </Badge>
            <Button size="sm" className="flex items-center gap-2" onClick={onAddExpense}>
              <Plus className="w-4 h-4" />
              Add
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {expenses.map((expense, index) => (
            <div key={index} className="p-3 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-sm">
                  {expense.name}
                </span>
                <div className="text-right">
                  <div className="text-xs text-gray-600">
                    ₹{expense.spent.toLocaleString()}/₹
                    {expense.budgeted.toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-500">
                    {expense.transactions} transactions
                  </div>
                </div>
              </div>
              <Progress
                value={Math.min(
                  (expense.spent / expense.budgeted) * 100,
                  100
                )}
                className="h-2 mb-2"
              />
              <div className="flex justify-between text-xs">
                <span
                  className={
                    expense.remaining >= 0
                      ? "text-green-600"
                      : "text-red-600"
                  }
                >
                  {expense.remaining >= 0 ? "Left" : "Over"}: ₹
                  {Math.abs(expense.remaining).toLocaleString()}
                </span>
                <span className="text-gray-500">
                  {Math.round((expense.spent / expense.budgeted) * 100)}
                  %
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
