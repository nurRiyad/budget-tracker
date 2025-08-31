"use client";

import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShoppingCart, Wallet } from "lucide-react";
import {
  Header,
  Overview,
  FixedExpenses,
  VariableExpenses,
  SurpriseExpenses,
  IncomeSources,
  BankAccounts,
} from "@/components/dash";

export default function Dashboard() {
  const { isSignedIn, isLoaded } = useAuth();
  const router = useRouter();

  // State for selected month and year
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  // State for income sources
  const [incomeSources, setIncomeSources] = useState([
    { name: "Salary", amount: 7500, frequency: "Monthly", date: new Date() },
    { name: "Freelancing", amount: 1000, frequency: "Monthly", date: new Date() },
  ]);

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

  // Function to handle adding new income
  const handleAddIncome = (newIncome: { name: string; amount: number; date: Date }) => {
    const incomeWithFrequency = {
      ...newIncome,
      frequency: "One-time" // You could add a frequency selector in the modal if needed
    };
    setIncomeSources(prev => [...prev, incomeWithFrequency]);
  };


  const fixedExpenses = [
    { name: "Rent", budgeted: 2000, dueDate: "2024-12-01", status: "paid" as const },
    { name: "Utilities", budgeted: 300, dueDate: "2024-12-15", status: "paid" as const },
    { name: "Internet", budgeted: 80, dueDate: "2024-12-20", status: "paid" as const },
    {
      name: "Insurance",
      budgeted: 150,
      dueDate: "2024-12-25",
      status: "unpaid" as const,
    },
    { name: "Rent", budgeted: 2000, dueDate: "2024-12-01", status: "paid" as const },
    { name: "Utilities", budgeted: 300, dueDate: "2024-12-15", status: "paid" as const },
    { name: "Internet", budgeted: 80, dueDate: "2024-12-20", status: "paid" as const },
    {
      name: "Insurance",
      budgeted: 150,
      dueDate: "2024-12-25",
      status: "unpaid" as const,
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

  const bankAccounts = [
    { name: "Main Checking", balance: 8500, type: "Checking" },
    { name: "Savings", balance: 4000, type: "Savings" },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <Header
        selectedMonth={selectedMonth}
        selectedYear={selectedYear}
        monthNames={monthNames}
        years={years}
        onMonthChange={handleMonthChange}
        onYearChange={handleYearChange}
        onGenerateNextMonth={() => {
          // Handle generate next month logic
          console.log("Generate next month clicked");
        }}
      />

      {/* Main Overview Cards */}
      <Overview
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
            <FixedExpenses
              expenses={fixedExpenses}
              totalAmount={2342}
              onAddExpense={() => {
                // Handle add fixed expense logic
                console.log("Add fixed expense clicked");
              }}
              onPayExpense={(index) => {
                // Handle pay expense logic
                console.log("Pay expense clicked for index:", index);
              }}
            />

            {/* Variable Expenses */}
            <VariableExpenses
              expenses={variableExpenses}
              totalAmount={2342}
              onAddExpense={() => {
                // Handle add variable expense logic
                console.log("Add variable expense clicked");
              }}
            />

            {/* Surprise Expenses */}
            <SurpriseExpenses
              expenses={surpriseExpenses}
              totalAmount={2342}
              onAddExpense={() => {
                // Handle add surprise expense logic
                console.log("Add surprise expense clicked");
              }}
            />
          </div>
        </TabsContent>

        <TabsContent value="income" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Income Sources */}
            <IncomeSources
              incomeSources={incomeSources}
              onAddIncome={handleAddIncome}
            />

            {/* Bank Accounts */}
            <BankAccounts
              bankAccounts={bankAccounts}
              onAddAccount={(data) => {
                // Handle add account logic with the new data structure
                console.log("Add account clicked with data:", data);
                // Here you would typically add the new account to your state/database
                // For now, we'll just log it
              }}
              onUpdateAccount={(index) => {
                // Handle update account logic
                console.log("Update account clicked for index:", index);
              }}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
