"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import AddBankAccountModal from "@/components/modals/add-bank-account";

interface BankAccount {
  name: string;
  balance: number;
  type: string;
  description?: string;
}

interface BankAccountsProps {
  bankAccounts: BankAccount[];
  onAddAccount: (data: { name: string; balance: number; type: string; description?: string }) => void;
  onUpdateAccount: (index: number) => void;
}

export default function BankAccounts({
  bankAccounts,
  onAddAccount,
  onUpdateAccount,
}: BankAccountsProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl">Bank Accounts</CardTitle>
          <AddBankAccountModal onAddAccount={onAddAccount} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {bankAccounts.map((account, index) => (
            <div key={index} className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-medium truncate">{account.name}</p>
                  <Badge variant="outline" className="text-xs">
                    {account.type}
                  </Badge>
                </div>
                <p className="text-xs text-gray-600">Account Type: {account.type}</p>
                {account.description && (
                  <p className="text-xs text-gray-500 mt-1">{account.description}</p>
                )}
              </div>
              <div className="flex items-center gap-2 ml-2">
                <span className="font-bold text-blue-600">৳{account.balance.toLocaleString()}</span>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="text-xs px-2 py-1"
                  onClick={() => onUpdateAccount(index)}
                >
                  Update
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
