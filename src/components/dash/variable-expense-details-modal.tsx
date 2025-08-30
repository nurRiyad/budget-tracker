"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Calendar, Tag } from "lucide-react";
import TransactionForm from "./transaction-form";

interface Transaction {
  id: string;
  title: string;
  amount: number;
  date: string;
  description: string;
  category?: string;
}

interface VariableExpenseDetailsModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  expenseName: string;
  budgeted: number;
  spent: number;
  transactions: Transaction[];
  onAddNewTransaction: (expenseName: string) => void;
}

export default function VariableExpenseDetailsModal({
  isOpen,
  onOpenChange,
  expenseName,
  budgeted,
  spent,
  transactions,
  onAddNewTransaction,
}: VariableExpenseDetailsModalProps) {
  const [showForm, setShowForm] = useState(false);

  const handleAddNew = () => {
    setShowForm(true);
  };

  const handleCancelForm = () => {
    setShowForm(false);
  };

  const handleSubmitTransaction = (transactionData: {
    title: string;
    amount: number;
    date: string;
    description: string;
  }) => {
    // Here you would typically call an API to save the transaction
    // For now, we'll just close the form and modal
    console.log("New transaction:", transactionData);
    setShowForm(false);
    onOpenChange(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Tag className="w-5 h-5" />
            {expenseName} - Transaction History
          </DialogTitle>
        </DialogHeader>
        
                <div className="space-y-4">
          {showForm ? (
            <TransactionForm
              expenseName={expenseName}
              onSubmit={handleSubmitTransaction}
              onCancel={handleCancelForm}
            />
          ) : (
            <>
              {/* Summary Section */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-sm text-gray-600">Budget</p>
                    <p className="text-lg font-semibold text-green-600">
                      ৳{budgeted.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Spent</p>
                    <p className="text-lg font-semibold text-blue-600">
                      ৳{spent.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Remaining</p>
                    <p className={`text-lg font-semibold ${
                      budgeted - spent >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      ৳{Math.abs(budgeted - spent).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Transactions List */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">Recent Transactions</h3>
                  <Button 
                    size="sm" 
                    className="flex items-center gap-2"
                    onClick={handleAddNew}
                  >
                    <Plus className="w-4 h-4" />
                    Add New
                  </Button>
                </div>
                
                <div className="max-h-64 overflow-y-auto space-y-2">
                  {transactions.length > 0 ? (
                    transactions.slice(0, 10).map((transaction) => (
                      <div
                        key={transaction.id}
                        className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-gray-500" />
                            <span className="text-sm font-medium">
                              {formatDate(transaction.date)}
                            </span>
                          </div>
                          <div className="mt-1">
                            <p className="text-sm font-medium text-gray-900">
                              {transaction.title}
                            </p>
                            {transaction.description && (
                              <p className="text-sm text-gray-600 truncate">
                                {transaction.description}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 ml-4">
                          {transaction.category && (
                            <Badge variant="outline" className="text-xs">
                              {transaction.category}
                            </Badge>
                          )}
                          <span className="text-sm font-semibold text-red-600">
                            -৳{transaction.amount.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <p>No transactions yet</p>
                      <p className="text-sm">Click "Add New" to add your first transaction</p>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
