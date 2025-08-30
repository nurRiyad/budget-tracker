"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Calendar, Plus, ChevronDown } from "lucide-react";

interface HeaderProps {
  selectedMonth: number;
  selectedYear: number;
  monthNames: string[];
  years: number[];
  onMonthChange: (month: number) => void;
  onYearChange: (year: number) => void;
  onGenerateNextMonth: () => void;
}

export default function Header({
  selectedMonth,
  selectedYear,
  monthNames,
  years,
  onMonthChange,
  onYearChange,
  onGenerateNextMonth,
}: HeaderProps) {
  const selectedDateDisplay = `${monthNames[selectedMonth]} ${selectedYear}`;

  return (
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
                    onClick={() => onMonthChange(index)}
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
                      onClick={() => onYearChange(year)}
                    >
                      {year}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button size="sm" className="flex items-center gap-2" onClick={onGenerateNextMonth}>
          <Plus className="h-4 w-4" />
          Generate Next Month
        </Button>
      </div>
    </div>
  );
}
