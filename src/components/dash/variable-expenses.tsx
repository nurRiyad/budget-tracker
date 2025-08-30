"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Plus } from "lucide-react";
import AddVariableExpenseModal from "./add-variable-expense-modal";
import VariableExpenseDetailsModal from "./variable-expense-details-modal";

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<VariableExpense | null>(null);

  const handleAddExpense = () => {
    setIsModalOpen(true);
  };

  const handleExpenseClick = (expense: VariableExpense) => {
    setSelectedExpense(expense);
    setIsDetailsModalOpen(true);
  };

  const handleModalSubmit = (expense: { name: string; budgeted: number; spent: number }) => {
    // Add the new expense with initial values
    const newExpense: VariableExpense = {
      ...expense,
      transactions: 1, // Start with 1 transaction
      remaining: expense.budgeted - expense.spent
    };
    onAddExpense();
    // You might want to pass the newExpense to a parent component handler
    // For now, we'll just close the modal and call the existing onAddExpense
  };

  const handleAddNewTransaction = (expenseName: string) => {
    // This will be handled by the parent component
    // For now, we'll just close the details modal
    setIsDetailsModalOpen(false);
  };

  const apiData = [
    // Mock data for now - in a real app, this would come from props or API
    {
      id: '1',
      amount: 150,
      date: new Date().toISOString(),
      description: 'Lunch at restaurant',
      category: 'Food'
    },
    {
      id: '2',
      amount: 80,
      date: new Date(Date.now() - 86400000).toISOString(),
      description: 'Coffee and snacks',
      category: 'Food'
    },
    {
      id: '3',
      amount: 200,
      date: new Date(Date.now() - 172800000).toISOString(),
      description: 'Dinner with friends',
      category: 'Food'
    }
  ]

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
        <div className="space-y-4 max-h-[500px] overflow-y-auto">
          {expenses.map((expense, index) => (
            <div 
              key={index} 
              className="p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
              onClick={() => handleExpenseClick(expense)}
            >
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-sm">
                  {expense.name}
                </span>
                <div className="text-right">
                  <div className="text-xs text-gray-600">
                    ৳{expense.spent.toLocaleString()}/৳
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
                  {expense.remaining >= 0 ? "Left" : "Over"}: ৳
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
      
      <AddVariableExpenseModal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        onSubmit={handleModalSubmit}
      />
      
      {selectedExpense && (
        <VariableExpenseDetailsModal
          isOpen={isDetailsModalOpen}
          onOpenChange={setIsDetailsModalOpen}
          expenseName={selectedExpense.name}
          budgeted={selectedExpense.budgeted}
          spent={selectedExpense.spent}
          transactions={apiData}
          onAddNewTransaction={handleAddNewTransaction}
        />
      )}
    </Card>
  );
}
