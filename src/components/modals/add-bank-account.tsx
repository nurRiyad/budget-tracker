"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";
import { Label } from "@/components/ui/label";

interface AddBankAccountModalProps {
  onAddAccount: (data: { name: string; balance: number; type: string; description?: string }) => void;
  trigger?: React.ReactNode;
}

export default function AddBankAccountModal({
  onAddAccount,
  trigger,
}: AddBankAccountModalProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    balance: "",
    type: "Savings",
    description: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Bank name is required";
    }
    
    if (!formData.balance.trim()) {
      newErrors.balance = "Balance is required";
    } else if (isNaN(parseFloat(formData.balance)) || parseFloat(formData.balance) < 0) {
      newErrors.balance = "Balance must be a valid positive number";
    }
    
    if (!formData.type.trim()) {
      newErrors.type = "Account type is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onAddAccount({
        name: formData.name.trim(),
        balance: parseFloat(formData.balance),
        type: formData.type.trim(),
        description: formData.description.trim() || undefined,
      });
      
      // Reset form
      setFormData({
        name: "",
        balance: "",
        type: "Savings",
        description: "",
      });
      setErrors({});
      setOpen(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (!newOpen) {
      // Reset form when closing
      setFormData({
        name: "",
        balance: "",
        type: "Savings",
        description: "",
      });
      setErrors({});
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {trigger || (
          <Button size="sm" className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add Account
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Bank Account</DialogTitle>
          <DialogDescription>
            Enter the details for your new bank account. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Bank Name</Label>
            <Input
              id="name"
              placeholder="Enter bank name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className={errors.name ? "border-red-500" : ""}
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="type">Account Type</Label>
            <Input
              id="type"
              placeholder="e.g., Savings, Checking, Credit"
              value={formData.type}
              onChange={(e) => handleInputChange("type", e.target.value)}
              className={errors.type ? "border-red-500" : ""}
            />
            {errors.type && (
              <p className="text-sm text-red-500">{errors.type}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="balance">Initial Balance</Label>
            <Input
              id="balance"
              type="number"
              step="0.01"
              placeholder="0.00"
              value={formData.balance}
              onChange={(e) => handleInputChange("balance", e.target.value)}
              className={errors.balance ? "border-red-500" : ""}
            />
            {errors.balance && (
              <p className="text-sm text-red-500">{errors.balance}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              placeholder="Add any additional notes about this account"
              className="resize-none"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
            />
          </div>
          
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Add Account</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
