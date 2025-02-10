"use client"
import React, { useEffect } from 'react'
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { TransactionsList } from '@/components/TransactionsList';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Bar, BarChart, ResponsiveContainer } from "recharts"
import {motion} from "framer-motion"
import MiniFooter from '@/components/MiniFooter';
import { Loader2, Menu, Plus, Minus } from 'lucide-react';
import ExpensesDialog from '@/components/ExpensesDialog';
import { Total } from '@/components/Total';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { DashboardCard } from '@/components/DashboardCard';
import {ExpensesByCategory} from '@/components/ExpensesByCategory';
import { useState } from 'react';
import { CalendarDateRangePicker } from "@/components/date-range-picker"
import { MainNav } from "@/components/main-nav"
import { RecentExpenses } from "@/components/RecentExpenses"
import UserAvatar from '@/components/ui/UserAvatar';
// import { Search } from "@/components/search"
import {ModeToggle} from "@/components/ui/ModeToggle";
import WorkspaceSwitcher from "@/components/workspace-switcher"
import IncomeDialog from '@/components/IncomeDialog';
import {BadgeDollarSign, Banknote } from "lucide-react"
import { ArrowUpRight } from 'lucide-react';
import NavDrawer from '@/components/NavDrawer';
// import { Skeleton } from '@/components/ui/skeleton';
import api from '@/app/api/axiosConfig';
import withAuth from '@/components/withAuth';
import { useAuthStore } from '@/store/use-auth';
import { Expense } from '@/types/types';
import { Income } from '@/types/types';
import { Workspace } from '@/types/types';



const Page = () => {
    // const [workspaceExpense, setWorkspaceExpense] = useState([]);
    const [totalExpenses, setTotalExpenses] = useState(0);
    const [totalIncome, setTotalIncome] = useState(0);
    const [balance, setBalance] = useState<string | number>(0);
    const [averageDailyExpense, setAverageDailyExpense] = useState(0);
    const [topCategory, setTopCategory] = useState("");
    const [topIncome, setTopIncome] = useState("");
    const [goal, setGoal] = React.useState(350)

    // const [averageMonthlyIncome, setAverageMonthlyIncome] = useState(0)
    // const [averageMonthlyExpense, setAverageMonthlyExpense] = useState()

    const {workspaceId, userId}  = useParams()
    const {user} = useAuthStore()
    
    const getWorkspaces = async () => {
      const res = await api.get(`/workspace`);
      return res.data?.responseBody?.hasWorkSpace;
    }


    const getWorkspace = async () => {
      const res = await api.get(`/get-workspace/${workspaceId}`);
      return res.data.responseBody;
    }
  
    const {data: workspaces, isLoading: workspacesLoading, error} = useQuery({queryKey: ['workspaces', workspaceId, {type: "done"}],queryFn: getWorkspaces});



    const {data: currentWorkSpace, isLoading:currentLoading, error:currentError, refetch:refetchCurrentWorkspace

    } = useQuery(
      {queryKey: ['workspace', workspaceId, {type: "done"}], queryFn: getWorkspace});


      // check if the currentworkspace has income deposits
      const hasIncome = currentWorkSpace?.income?.length > 0;
      const workspaceCurrency = currentWorkSpace?.currency === "USD" ? "$" : currentWorkSpace?.currency === "NGN" ? "₦" : currentWorkSpace?.currency === "SAR" ? "ر.س" : currentWorkSpace?.currency === "QAR" ? "ر.ق" : currentWorkSpace?.currency === "AED" ? "د.إ" : "₦";

      // function to calculate the top category from expenses
      const trackTopCategory = (expenses: Expense[]) => {
        // Group expenses by category and sum up the amounts

        const categoryTotals = expenses?.filter((expense) => !expense.isDeleted).reduce((acc: Record<string, number>, expense: Expense) => {
          const { category, amount } = expense;

          if (!acc[category]) {
            acc[category] = 0;
          }

          acc[category] += amount;
          return acc;
        }, {});


         // Find the category with the highest total expense
         const topCategory = Object.keys(categoryTotals).reduce((top, current) => {
          // Compare totals and return the category with the higher total
          return categoryTotals[current] > categoryTotals[top] ? current : top;
        }, Object.keys(categoryTotals)[0]);
        setTopCategory(topCategory);
      }


      //  function to get the highest income source
      const trackTopIncomeSource = (income: Income[]) => {
        // Group expenses by category and sum up the amounts
        const incomeTotals = income?.filter((income) => !income.isDeleted).reduce((acc: Record<string, number>, income: Income) => {
          const { incomeSource, amount } = income;

          if (!acc[incomeSource]) {
            acc[incomeSource] = 0;
          }

          acc[incomeSource] += amount;
          return acc;
        }, {});


         // Find the category with the highest total expense
         const topIncome = Object.keys(incomeTotals).reduce((top, current) => {
          // Compare totals and return the category with the higher total
          return incomeTotals[current] > incomeTotals[top] ? current : top;
        }, Object.keys(incomeTotals)[0]);
        setTopIncome(topIncome);
      }


      useEffect(() => {
        if (currentWorkSpace?.income && currentWorkSpace?.expenses) {
          // subtract the total expenses from the total income
          
          // total expenses
          const total = currentWorkSpace?.expenses?.filter((item: Expense) => !item.isDeleted)?.reduce((acc: number, expense: Expense) => acc + expense.amount, 0) || 0;
          setTotalExpenses(total.toFixed(2));

          // total income
          const totalIncome = currentWorkSpace?.income.filter((item: Income) => !item.isDeleted).reduce((acc: number, income: Income) => acc + income.amount, 0);
          setTotalIncome(totalIncome.toFixed(2));

          // remaining income
          const balance = (totalIncome - total).toFixed(2);
          setBalance(balance);

          
          const averageDailyExpense = currentWorkSpace?.expenses.filter((item: Expense) => !item.isDeleted).reduce((acc: number, expense: Expense) => acc + expense.amount, 0) / currentWorkSpace?.expenses.length;
          const rounded = Math.round(averageDailyExpense * 100) / 100;
          setAverageDailyExpense(rounded);

          // get the monthly average
          // const averageMonthlyExpense = currentWorkSpace?.expenses.filter((item: any) => !item.isDeleted).reduce((acc: number, expense: Expense) => acc + expense.amount, 0) / 30;
          // setAverageMonthlyExpense(averageMonthlyExpense);
          
          // Call the function to calculate the top category
          trackTopCategory(currentWorkSpace.expenses);

          // Call the function to calculate the top income source
          trackTopIncomeSource(currentWorkSpace.income);
        }
      }, [currentWorkSpace])

      // get the total number of expenses 09022548838
      const expenseLenght = currentWorkSpace?.expenses.filter((item: Expense) => !item.isDeleted).length;

    
    if (currentLoading || workspacesLoading) return  <div className="flex items-center justify-center text-white bg-[#000000] h-screen w-full">
    <div className="flex items-center gap-2">
    <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
        />
        <div>Loading..</div>
    </div>
    </div>
    if (error || currentError) return <div className="flex justify-center items-center h-screen">
    <div className="flex flex-col items-center">
      <p>{error?.message}</p>
    </div>
</div>;
    if (!userId) return <div className="flex justify-center items-center h-screen">
    <div className="flex flex-col items-center">
      <p>No Active Session</p>
    </div>
</div>;
    

  const TopCategorySvg = (<svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    className="h-4 w-4 text-muted-foreground"
  >
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>)



function PlaceholderChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <div className="h-4 w-[150px] bg-card rounded"></div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px] w-full bg-[#1f1f1f] rounded"></div>
      </CardContent>
    </Card>
  )
}

function PlaceholderDashboardCard() {
  return (
    <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">
      <div className="h-1 w-[150px] bg-card rounded"></div>
      </CardTitle>
    </CardHeader>
    <CardContent>
    <div className="h-[150px] w-full bg-[#1f1f1f] rounded"></div>
    </CardContent>
  </Card>
  )

}
    return (
      <>
       
        <div className="flex-col md:flex">

          <div className="border-b">
            <div className="flex justify-between h-16 items-center px-4 ">

             <div className='flex items-center space-x-4'>
             <div className='md:hidden'>
             <NavDrawer userId={userId as string} workspaceId={workspaceId as string} workspaceName={currentWorkSpace?.workspaceName}/>
             </div>
             <WorkspaceSwitcher workspaces={workspaces?.filter((workspace: Workspace) => !workspace.isDeleted) || []}  />
             </div>

              <div className='flex flex-row-reverse gap-8'>
              <div className='flex items-center gap-4'>
                <div><ModeToggle /></div>
                <UserAvatar user={user} />
              </div>
              <div className='hidden md:flex'>
             <MainNav userId={userId as string} workspaceId={workspaceId as string} workspaceName={currentWorkSpace?.workspaceName} />
              <div className="ml-auto flex items-center space-x-4">
                {/* {hasIncome && <Search />} */}
              </div>
             </div>

              </div>
              
            </div>
          </div>


          <div className="flex-1 space-y-4 p-8 pt-6 ">

          <div className="flex flex-col justify-start md:flex-row md:items-center md:justify-between space-y-2">

          <div className='flex flex-col gap-3 md:flex-row md:items-center space-x-2 mb-2 md:mb-0'>
  <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>

  {/* Add Income Button First */}
  <div className='flex items-center gap-3'>
    <IncomeDialog userId={userId as string} workspaceId={workspaceId as string} />
  </div>

  {/* Then Check for Income and Show Message or Expenses Dialog */}
  <div className='flex'>
    {hasIncome ? (
      <div className='w-full'>
        <ExpensesDialog userId={userId as string} workspaceId={workspaceId as string} />
      </div>
    ) : (
      <div>
        <p className='text-xs text-muted-foreground'>Please Add Income To Get Started!</p>
      </div>
    )}
  </div>
</div>


<div className="flex items-center space-x-2 mt-2 md:mt-2">
  {hasIncome && <CalendarDateRangePicker />}
</div>
</div>
            
            {hasIncome ? 
            <div className=''>
            <Tabs defaultValue="overview" className="space-y-4">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <DashboardCard 
                  // currency={currentWorkSpace?.currency}
                   cardTitle="Total Income" cardContent={totalIncome} cardIcon={workspaceCurrency} />
                  <DashboardCard cardTitle="Total Expenses" cardContent={totalExpenses} cardIcon={workspaceCurrency} />

                  <DashboardCard cardTitle='Top Income Source' cardContent={topIncome} cardIcon={<Banknote />} />

                  <DashboardCard cardTitle='Top Expense Category' cardContent={topCategory} cardIcon={TopCategorySvg} />
                  
                  <DashboardCard cardTitle='Remaining Balance' cardContent={balance} cardIcon={workspaceCurrency} />

                  {currentWorkSpace?.expenses?.length > 0 ? <DashboardCard cardTitle='Average Daily Expenses' cardContent={averageDailyExpense} cardIcon={<BadgeDollarSign />} /> : 
                    <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">
      No Expenses Yet
      </CardTitle>
      <span className='text-gray-400'><BadgeDollarSign /></span>
    </CardHeader>
    <CardContent>
      <p className="text-xs text-muted-foreground">
        Add your first expense to get started.
        </p>
    </CardContent>
                    </Card>
                    }

                  {/* {currentWorkSpace?.income.length > 0 && <DashboardCard cardTitle='Average Daily Income' cardContent={averageDailyIncome} cardIcon={<BadgeDollarSign />} />} */}
                </div>
                <div>
                    <Total income={currentWorkSpace?.income} expenses={currentWorkSpace?.expenses} />
                  </div>
                <div className="flex flex-col md:flex-row gap-4">

                <ExpensesByCategory expenses={currentWorkSpace?.expenses}/>
                  <Card className="w-full md:w-1/2">
                    <CardHeader>
                      <CardTitle className='flex justify-between items-center'>Recent Expenses
                        {currentWorkSpace?.expenses?.filter((expense: Expense) => expense.isDeleted === false).length > 0 && <Link href={`/expenses/${workspaceId}`}><ArrowUpRight /></Link>}
                      </CardTitle>
                      <CardDescription>
                        You have {expenseLenght} expenses so far.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <RecentExpenses expenses={currentWorkSpace?.expenses} />
                    </CardContent>
                  </Card>
                </div>
                <div>
                <div>
                  <Card className="col-span-4">
                  <CardHeader>
                    <CardTitle className='flex justify-between items-center'>Transaction History
                    {currentWorkSpace?.income?.length > 0 && <Link href={`/transactions/${workspaceId}`}><ArrowUpRight /></Link>}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <TransactionsList currency={currentWorkSpace?.currency} income={currentWorkSpace?.income} />
                  </CardContent>
                  </Card>
                    </div>
                </div>
              </TabsContent>
            </Tabs>
            </div> : 
            <div className=''>
              <div className="grid gap-4 mb-10 md:grid-cols-2 lg:grid-cols-4">
                <PlaceholderDashboardCard />
                <PlaceholderDashboardCard />
                <PlaceholderDashboardCard />
                <PlaceholderDashboardCard />
              </div>
              <PlaceholderChart />
              <div className='md:flex justify-center gap-2 mt-10'>
                <div className='md:w-1/2'>
                <PlaceholderChart />
                </div>
                <div className='md:w-1/2 mt-10 md:mt-0'>
                <PlaceholderChart />
                </div>
              </div>
            </div>
            }
          </div>


        </div>
        <MiniFooter />
      </>
  )
}

export default withAuth(Page)