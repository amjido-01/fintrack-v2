"use client"
import { TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis, ResponsiveContainer } from "recharts"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState, useEffect, useMemo } from "react";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
interface Expense {
  id: string;
  expenseName: string;
  amount: number;
  date: string;
  category: string;
  note: string;
  workspaceId: string;
  isDeleted: boolean
}
interface Income {
  id: string;
  incomeSource: string;
  amount: number;
  date: string;
  category: string;
  description: string;
  workspaceId: string;
  isDeleted: boolean
}

type Timeframe = 'weekly' | 'monthly' | 'yearly';
type ChartDataPoint = {
  name: string;
  expenses: number;
  income: number
}
const chartConfig = {
  expenses: {
    label: "Expenses",
    color: "hsl(var(--chart-4))",
  },
  income: {
    label: "Income",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig

export function Total({expenses, income}: {expenses: Expense[], income: Income[]}) {
  const [timeframe, setTimeframe] = useState<Timeframe>('weekly')

const getEmptyChartData = (timeframe: Timeframe): ChartDataPoint[] => {
  if (timeframe === 'weekly') {
    return ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => ({ name: day, expenses: 0, income: 0 }));
  } else if (timeframe === 'monthly') {
    return ["Week 1", "Week 2", "Week 3", "Week 4"].map((week) => ({ name: week, expenses: 0, income: 0 }));
  } else {
    return ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map((month) => ({ name: month, expenses: 0, income: 0 }));
  }
};

const chartData = useMemo(() => {
  const currentDate = new Date();
  const timeFrameInt = timeframe === "weekly" ? 7 : timeframe === "monthly" ? 28 : 365;
  const pastDate = new Date(currentDate.getTime() - timeFrameInt * 24 * 60 * 60 * 1000);

  let updatedChartData = getEmptyChartData(timeframe);

  const updateData = (dataList: (Expense | Income)[], dataKey: 'expenses' | 'income') => {
    dataList
      .filter((item) => !item.isDeleted && new Date(item.date) >= pastDate)
      .forEach((item) => {
        const date = new Date(item.date);
        if (timeframe === "weekly") {
          updatedChartData[date.getDay()][dataKey] += item.amount;
        } else if (timeframe === "monthly") {
          const weekOfMonth = Math.ceil(date.getDate() / 7) - 1;
          updatedChartData[weekOfMonth][dataKey] += item.amount;
        } else {
          updatedChartData[date.getMonth()][dataKey] += item.amount;
        }
      });
  };

  updateData(expenses, 'expenses');
  updateData(income, 'income');

  return updatedChartData;
}, [expenses, income, timeframe]);




  return (
    <Card className="col-span-4">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <div>
        <CardTitle>Total Expenses and Income Overview</CardTitle>
        <CardDescription>January - December 2024</CardDescription>
      </div>
      <Select value={timeframe} onValueChange={(value: Timeframe) => setTimeframe(value)}>
        <SelectTrigger className="w-[120px]">
          <SelectValue placeholder="Select timeframe" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="weekly">Weekly</SelectItem>
          <SelectItem value="monthly">Monthly</SelectItem>
          <SelectItem value="yearly">Yearly</SelectItem>
        </SelectContent>
      </Select>
    </CardHeader>
    <CardContent>
      <ResponsiveContainer width="100%" height={250}>
        <ChartContainer config={chartConfig}>
          <LineChart data={chartData} margin={{ left: 12, right: 12 }}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="name" tickLine={false} axisLine={false} tickMargin={8} />

            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />

            <Line dataKey="expenses" type="linear" stroke="hsl(var(--chart-4))" strokeWidth={2} dot={false} />

            <Line dataKey="income" type="linear" stroke="hsl(var(--chart-3))" strokeWidth={2} dot={false} />
          </LineChart>
        </ChartContainer>
      </ResponsiveContainer>
    </CardContent>
    <CardFooter className="flex-col items-start gap-2 text-sm">
      <div className="flex gap-2 font-medium leading-none">
        <span>Expenses trending up by 5.2%</span>
        <span>Income trending up by 6.8%</span>
        <TrendingUp className="h-4 w-4" />
      </div>
      <div className="leading-none text-muted-foreground">
        Showing total expenses and income for the last 12 months
      </div>
    </CardFooter>
  </Card>
  )
}


// type Timeframe = 'weekly' | 'monthly' | 'yearly';
