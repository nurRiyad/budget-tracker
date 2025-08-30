"use client";

import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Overview from "@/components/dash/overview";
import {
  DollarSign,
  TrendingDown,
  TrendingUp,
  Building2,
  Calendar,
  Plus,
  CheckCircle2,
  Circle,
  Check,
  ShoppingCart,
  Wallet,
  ChevronDown,
} from "lucide-react";

export default function Dashboard() {
  const { isSignedIn, isLoaded } = useAuth();
  const router = useRouter();

  // State for selected month and year
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/");
    }
  }, [isLoaded, isSignedIn, router]);

  if (!isLoaded) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
      </div>
    );
  }

  if (!isSignedIn) {
    return null; // Will redirect
  }

  // Month names for display
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Generate years (current year - 2 to current year + 2)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear - 2 + i);

  // Format selected date for display
  const selectedDateDisplay = `${monthNames[selectedMonth]} ${selectedYear}`;

  // Function to handle month/year changes
  const handleMonthChange = (month: number) => {
    setSelectedMonth(month);
    // Here you would typically fetch data for the new month
    // fetchDataForMonth(month, selectedYear);
    // This would update the Overview component data and all expense/income data
  };

  const handleYearChange = (year: number) => {
    setSelectedYear(year);
    // Here you would typically fetch data for the new year
    // fetchDataForMonth(selectedMonth, year);
    // This would update the Overview component data and all expense/income data
  };

  // Mock data - this would normally come from an API based on selectedMonth and selectedYear
  const totalIncome = 8500;
  const totalExpenses = 6200;
  const netBalance = totalIncome - totalExpenses;
  const bankBalance = 12500;

  const fixedExpenses = [
    { name: "Rent", budgeted: 2000, dueDate: "2024-12-01", status: "paid" },
    { name: "Utilities", budgeted: 300, dueDate: "2024-12-15", status: "paid" },
    { name: "Internet", budgeted: 80, dueDate: "2024-12-20", status: "paid" },
    {
      name: "Insurance",
      budgeted: 150,
      dueDate: "2024-12-25",
      status: "unpaid",
    },
  ];

  const variableExpenses = [
    {
      name: "Food",
      budgeted: 1000,
      spent: 750,
      transactions: 12,
      remaining: 250,
    },
    {
      name: "Transportation",
      budgeted: 400,
      spent: 320,
      transactions: 8,
      remaining: 80,
    },
    {
      name: "Entertainment",
      budgeted: 300,
      spent: 180,
      transactions: 5,
      remaining: 120,
    },
    {
      name: "Shopping",
      budgeted: 500,
      spent: 420,
      transactions: 6,
      remaining: 80,
    },
    {
      name: "Healthcare",
      budgeted: 200,
      spent: 150,
      transactions: 3,
      remaining: 50,
    },
  ];

  const surpriseExpenses = [
    {
      name: "Car Repair",
      amount: 450,
      date: "2024-12-10",
      category: "Transportation",
    },
    {
      name: "Medical Emergency",
      amount: 200,
      date: "2024-12-18",
      category: "Healthcare",
    },
  ];

  const incomeSources = [
    { name: "Salary", amount: 7500, frequency: "Monthly" },
    { name: "Freelancing", amount: 1000, frequency: "Monthly" },
  ];

  const bankAccounts = [
    { name: "Main Checking", balance: 8500, type: "Checking" },
    { name: "Savings", balance: 4000, type: "Savings" },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Budget planning and tracking</p>
        </div>
        <div className="flex items-center gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="sm" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {selectedDateDisplay}
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <div className="p-2">
                <div className="grid grid-cols-3 gap-1 mb-3">
                  {monthNames.map((month, index) => (
                    <Button
                      key={month}
                      variant={selectedMonth === index ? "default" : "ghost"}
                      size="sm"
                      className="text-xs h-8"
                      onClick={() => handleMonthChange(index)}
                    >
                      {month.slice(0, 3)}
                    </Button>
                  ))}
                </div>
                <div className="border-t pt-2">
                  <div className="text-xs font-medium text-muted-foreground mb-2 px-2">
                    Year
                  </div>
                  <div className="grid grid-cols-3 gap-1">
                    {years.map((year) => (
                      <Button
                        key={year}
                        variant={selectedYear === year ? "default" : "ghost"}
                        size="sm"
                        className="text-xs h-8"
                        onClick={() => handleYearChange(year)}
                      >
                        {year}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button size="sm" className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Generate Next Month
          </Button>
        </div>
      </div>

      {/* Main Overview Cards */}
      <Overview
        selectedMonth={selectedMonth}
        selectedYear={selectedYear}
        monthName={monthNames[selectedMonth]}
      />

      {/* Tabs Section */}
      <Tabs defaultValue="expenses" className="w-full">
        
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="expenses" className="flex items-center gap-2">
            <ShoppingCart className="w-4 h-4" />
            Expenses
          </TabsTrigger>
          <TabsTrigger value="income" className="flex items-center gap-2">
            <Wallet className="w-4 h-4" />
            Income & Assets
          </TabsTrigger>
        </TabsList>

        <TabsContent value="expenses" className="space-y-6">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Fixed Expenses */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-xl">Fixed Expenses</CardTitle>
                  <div className="flex items-center gap-3">
                    <Badge
                      variant="outline"
                      className="px-3 py-1.5 text-sm font-medium"
                    >
                      ₹ 2342
                    </Badge>
                    <Button size="sm" className="flex items-center gap-2">
                      <Plus className="w-4 h-4" />
                      Add
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {fixedExpenses.map((expense, index) => (
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
                          ₹{expense.budgeted.toLocaleString()}
                        </span>
                        {expense.status === "paid" ? (
                          <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                        ) : (
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-xs px-2 py-1"
                          >
                            Pay
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Variable Expenses */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-xl">Variable Expenses</CardTitle>
                  <div className="flex items-center gap-3">
                    <Badge
                      variant="outline"
                      className="px-3 py-1.5 text-sm font-medium"
                    >
                      ₹ 2342
                    </Badge>
                    <Button size="sm" className="flex items-center gap-2">
                      <Plus className="w-4 h-4" />
                      Add
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {variableExpenses.map((expense, index) => (
                    <div key={index} className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-sm">
                          {expense.name}
                        </span>
                        <div className="text-right">
                          <div className="text-xs text-gray-600">
                            ₹{expense.spent.toLocaleString()}/₹
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
                          {expense.remaining >= 0 ? "Left" : "Over"}: ₹
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
            </Card>

            {/* Surprise Expenses */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-xl">Surprise Expenses</CardTitle>
                  <div className="flex items-center gap-3">
                    <Badge
                      variant="outline"
                      className="px-3 py-1.5 text-sm font-medium"
                    >
                      ₹ 2342
                    </Badge>
                    <Button size="sm" className="flex items-center gap-2">
                      <Plus className="w-4 h-4" />
                      Add
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {surpriseExpenses.map((expense, index) => (
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
                        ₹{expense.amount.toLocaleString()}
                      </span>
                    </div>
                  ))}
                  {surpriseExpenses.length === 0 && (
                    <div className="text-center text-gray-500 py-8">
                      <p className="text-sm">
                        No surprise expenses this month! 🎉
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="income" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Income Sources */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-xl">Income Sources</CardTitle>
                  <Button size="sm" className="flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    Add Income
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {incomeSources.map((income, index) => (
                    <div key={index} className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{income.name}</p>
                        <p className="text-sm text-gray-600">{income.frequency}</p>
                      </div>
                      <div className="flex items-center gap-3 ml-2">
                        <span className="font-bold text-green-600">${income.amount.toLocaleString()}</span>
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

            {/* Bank Accounts */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-xl">Bank Accounts</CardTitle>
                  <Button size="sm" className="flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    Add Account
                  </Button>
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
                      </div>
                      <div className="flex items-center gap-2 ml-2">
                        <span className="font-bold text-blue-600">${account.balance.toLocaleString()}</span>
                        <Button size="sm" variant="outline" className="text-xs px-2 py-1">
                          Update
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
