"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";
import AddSurpriseExpenseModal from "./add-surprise-expense-modal";

interface SurpriseExpense {
  name: string;
  amount: number;
  date: string;
  category: string;
}

interface SurpriseExpensesProps {
  expenses: SurpriseExpense[];
  totalAmount: number;
  onAddExpense: (expense: Omit<SurpriseExpense, 'name' | 'category'> & { name: string; category: string }) => void;
}

export default function SurpriseExpenses({
  expenses,
  totalAmount,
  onAddExpense,
}: SurpriseExpensesProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddExpense = () => {
    setIsModalOpen(true);
  };

  const handleModalSubmit = (expense: Omit<SurpriseExpense, 'name' | 'category'> & { name: string; category: string }) => {
    onAddExpense(expense);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl">Surprise Expenses</CardTitle>
            <div className="flex items-center gap-3">
              <Badge
                variant="outline"
                className="px-3 py-1.5 text-sm font-medium"
              >
                ৳ {totalAmount.toLocaleString()}
              </Badge>
              <Button size="sm" className="flex items-center gap-2" onClick={handleAddExpense}>
                <Plus className="w-4 h-4" />
                Add
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 max-h-[500px] overflow-y-auto">
            {expenses.map((expense, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-3 bg-red-50 rounded-lg"
              >
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">
                    {expense.name}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <span>
                      {new Date(expense.date).toLocaleDateString()}
                    </span>
                    <Badge variant="outline" className="text-xs">
                      {expense.category}
                    </Badge>
                  </div>
                </div>
                <span className="font-bold text-red-600 ml-2">
                  ৳{expense.amount.toLocaleString()}
                </span>
              </div>
            ))}
            {expenses.length === 0 && (
              <div className="text-center text-gray-500 py-8">
                <p className="text-sm">
                  No surprise expenses this month! 🎉
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <AddSurpriseExpenseModal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        onSubmit={handleModalSubmit}
      />
    </>
  );
}
