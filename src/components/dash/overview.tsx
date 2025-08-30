"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  DollarSign, 
  TrendingDown, 
  TrendingUp, 
  Building2
} from "lucide-react"

interface OverviewProps {
  selectedYear: number;
  monthName: string;
}

export default function Overview({ selectedYear, monthName }: OverviewProps) {

    // Mock data - this would normally come from an API based on selectedYear
    const totalIncome = 8500
    const totalExpenses = 6200
    const netBalance = totalIncome - totalExpenses
    const bankBalance = 12500


  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Total Income</CardTitle>
        <DollarSign className="h-4 w-4 text-green-600" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-green-600">${totalIncome.toLocaleString()}</div>
        <p className="text-xs text-muted-foreground">{monthName} {selectedYear}</p>
      </CardContent>
    </Card>

    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
        <TrendingDown className="h-4 w-4 text-red-600" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-red-600">${totalExpenses.toLocaleString()}</div>
        <p className="text-xs text-muted-foreground">{monthName} {selectedYear}</p>
      </CardContent>
    </Card>

    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Net Balance</CardTitle>
        <TrendingUp className="h-4 w-4 text-blue-600" />
      </CardHeader>
      <CardContent>
        <div className={`text-2xl font-bold ${netBalance >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
          ${netBalance.toLocaleString()}
        </div>
        <p className="text-xs text-muted-foreground">Income - Expenses</p>
      </CardContent>
    </Card>

    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Bank Balance</CardTitle>
        <Building2 className="h-4 w-4 text-purple-600" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-purple-600">${bankBalance.toLocaleString()}</div>
        <p className="text-xs text-muted-foreground">Manual entry</p>
      </CardContent>
    </Card>
  </div>
  )
}