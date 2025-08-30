"use client"

import { useAuth } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { 
  DollarSign, 
  TrendingDown, 
  TrendingUp, 
  Building2, 
  Calendar,
  Plus,
  CheckCircle2,
  Circle
} from "lucide-react"

interface OverviewProps {
  selectedMonth: number;
  selectedYear: number;
  monthName: string;
}

export default function Overview({ selectedMonth, selectedYear, monthName }: OverviewProps) {

    // Mock data - this would normally come from an API based on selectedMonth and selectedYear
    const totalIncome = 8500
    const totalExpenses = 6200
    const netBalance = totalIncome - totalExpenses
    const bankBalance = 12500
  
    const fixedExpenses = [
      { name: "Rent", budget: 2000, spent: 2000, paid: true },
      { name: "Utilities", budget: 300, spent: 280, paid: true },
      { name: "Internet", budget: 80, spent: 80, paid: true },
      { name: "Insurance", budget: 150, spent: 150, paid: true },
    ]
  
    const variableExpenses = [
      { name: "Food", budget: 1000, spent: 750, category: "Groceries & Dining" },
      { name: "Transportation", budget: 400, spent: 320, category: "Gas & Public Transit" },
      { name: "Entertainment", budget: 300, spent: 180, category: "Movies & Activities" },
      { name: "Shopping", budget: 500, spent: 420, category: "Clothing & Personal" },
      { name: "Healthcare", budget: 200, spent: 150, category: "Medical & Pharmacy" },
    ]
  
    const incomeSources = [
      { name: "Salary", amount: 7500, frequency: "Monthly" },
      { name: "Freelancing", amount: 1000, frequency: "Monthly" },
    ]
  
    const bankAccounts = [
      { name: "Main Checking", balance: 8500, type: "Checking" },
      { name: "Savings", balance: 4000, type: "Savings" },
    ]


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