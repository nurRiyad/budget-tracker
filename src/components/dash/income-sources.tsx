"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import AddIncomeModal from "@/components/modals/add-income";

interface IncomeSource {
  name: string;
  amount: number;
  frequency: string;
  date: Date;
}

interface IncomeSourcesProps {
  incomeSources: IncomeSource[];
  onAddIncome: (income: { name: string; amount: number; date: Date }) => void;
}

export default function IncomeSources({
  incomeSources,
  onAddIncome,
}: IncomeSourcesProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl">Income Sources</CardTitle>
          <AddIncomeModal onAddIncome={onAddIncome} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {incomeSources.map((income, index) => (
            <div key={index} className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{income.name}</p>
                <p className="text-sm text-gray-600">{income.frequency}</p>
                <p className="text-xs text-gray-500">
                  {income.date.toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center gap-3 ml-2">
                <span className="font-bold text-green-600">৳{income.amount.toLocaleString()}</span>
                <Badge 
                  variant="outline" 
                  className="bg-green-100 text-green-700"
                >
                  Active
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
