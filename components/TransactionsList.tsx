import React from "react"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  
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



  export function TransactionsList({ income, currency }: { income: Income[], currency: string }) {

    const workspaceCurrency = currency === "USD" ? "$" : currency === "NGN" ? "₦" : currency === "SAR" ? "ر.س" : currency === "QAR" ? "ر.ق" : currency === "AED" ? "د.إ" : "₦";
    const onlyNotDeleted = income?.filter((income) => !income.isDeleted)
    const onlyTenIncome = onlyNotDeleted?.slice(0, 5)
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {onlyTenIncome?.map((income) => (
            <TableRow key={income.id}>
              <TableCell>{new Date(income?.date).toDateString()}</TableCell>
              <TableCell>{income?.description}</TableCell>
              <TableCell>{income?.category}</TableCell>
              <TableCell>{ workspaceCurrency + " " + income?.amount.toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }