"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";

interface FormData {
  title: string;
  amount: string;
  date: string;
  tag: string;
  description: string;
}

interface SurpriseExpense {
  name: string;
  amount: number;
  date: string;
  category: string;
}

interface AddSurpriseExpenseModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (expense: Omit<SurpriseExpense, 'name' | 'category'> & { name: string; category: string }) => void;
}

export default function AddSurpriseExpenseModal({
  isOpen,
  onOpenChange,
  onSubmit,
}: AddSurpriseExpenseModalProps) {
  const form = useForm<FormData>({
    defaultValues: {
      title: "",
      amount: "",
      date: new Date().toISOString().split('T')[0], // Current date as default
      tag: "",
      description: "",
    },
  });

  const handleSubmit = (data: FormData) => {
    // Basic validation
    if (!data.title.trim()) {
      form.setError("title", { message: "Title is required" });
      return;
    }
    
    if (!data.amount.trim() || isNaN(Number(data.amount)) || Number(data.amount) <= 0) {
      form.setError("amount", { message: "Amount must be a positive number" });
      return;
    }

    if (!data.date.trim()) {
      form.setError("date", { message: "Date is required" });
      return;
    }

    const newExpense = {
      name: data.title.trim(),
      amount: Number(data.amount),
      date: data.date,
      category: data.tag.trim() || "Uncategorized",
    };
    
    onSubmit(newExpense);
    form.reset();
    onOpenChange(false);
  };

  const handleClose = () => {
    onOpenChange(false);
    form.reset();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add Surprise Expense</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title *</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter expense title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount *</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="0.00" 
                      step="0.01"
                      min="0"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date *</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="tag"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tag</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Medical, Car, Home" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Optional description of the expense"
                      className="resize-none"
                      rows={3}
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="flex justify-end gap-3 pt-4">
              <Button type="button" variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button type="submit">
                Add Expense
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
