"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Check } from "lucide-react";
import AddFixedExpenseModal from "@/components/modals/add-fixed-expense";

interface FixedExpense {
  name: string;
  budgeted: number;
  dueDate: string;
  status: "paid" | "unpaid";
}

interface FixedExpensesProps {
  expenses: FixedExpense[];
  totalAmount: number;
  onAddExpense: () => void;
  onPayExpense: (index: number) => void;
}

export default function FixedExpenses({
  expenses,
  totalAmount,
  onAddExpense,
  onPayExpense,
}: FixedExpensesProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddExpense = () => {
    setIsModalOpen(true);
  };

  const handleModalSubmit = (expense: Omit<FixedExpense, 'status'>) => {
    // Add the new expense with 'unpaid' status
    const newExpense: FixedExpense = {
      ...expense,
      status: 'unpaid'
    };
    console.log({ newExpense })
    onAddExpense();
    // You might want to pass the newExpense to a parent component handler
    // For now, we'll just close the modal and call the existing onAddExpense
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl">Fixed Expenses</CardTitle>
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
              className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
            >
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">
                  {expense.name}
                </p>
                <p className="text-xs text-gray-600">
                  Due: {new Date(expense.dueDate).toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center gap-2 ml-2">
                <span className="text-sm font-medium">
                  ৳{expense.budgeted.toLocaleString()}
                </span>
                {expense.status === "paid" ? (
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                ) : (
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-xs px-2 py-1"
                    onClick={() => onPayExpense(index)}
                  >
                    Pay
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      
      <AddFixedExpenseModal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        onSubmit={handleModalSubmit}
      />
    </Card>
  );
}
