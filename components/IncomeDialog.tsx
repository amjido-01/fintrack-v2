import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  import {  Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue, } from './ui/select';
    import Popover from './Popover';
  import { Loader2 } from "lucide-react";
  import {PlusCircle} from "lucide-react"
import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import axios from 'axios';
import {  useQueryClient } from '@tanstack/react-query'


interface Expense {
  userId: string;
  workspaceId: string | string[];
  // onIncomeAdded: () => void;
}

const categories = ["Salary", "Business", "Freelance", "Investment", "Gift", "Other"
]
const IncomeDialog: React.FC<Expense> = ({userId, workspaceId, 
  //onIncomeAdded
}) => {
    const [open, setOpen] = useState(false)
    const [incomeSource, setIncomeSource] = useState('')
    const [amount, setAmount] = useState<number>()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [date, setDate] = useState('')
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState(categories[0])
    const [customCategory, setCustomCategory] = useState<string>("")
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [alertTitle, setAlertTitle] = useState('')
    const [alertMessage, setAlertMessage] = useState('')

    const queryClient = useQueryClient();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLoading(true)
      setError('')

      const incomeCategory = category === "Other" ? customCategory: category
      
      if (!incomeSource || !date || !amount || !category || !description) {
        setError('All fields are required');
        setLoading(false)
        return;
      }

      try {
        const response = await axios.post("/api/incomes", {
          incomeSource,
          date,
          description,
          category,
          customCategory: category === "Other" ? customCategory: null,
          amount,
          workspaceId,
          userId
        })
        if (response.data && !response.data.error) {
          setAlertTitle('Income Added Successfully');
          setAlertMessage('Your new income has been added successfully.');
          setIsDialogOpen(true)
          setIncomeSource('');
          setDate('');
          setAmount(0);
          setCategory(categories[0]);
          setCustomCategory("")
          setDescription('');
          queryClient.invalidateQueries({
            queryKey:['workspace', workspaceId, {type: "done"}]
          })
          setOpen(true);
        } else {
         setAlertTitle('Error');
         setAlertMessage('Failed to create expense.');
         setIsDialogOpen(true)
        }
      } catch (error) {
        setAlertTitle('Error');
        setAlertMessage('An error occurred while submitting the form');
        setIsDialogOpen(true);
      } finally {
        setLoading(false);
      }

    }

    function handleAlertDialogOk() {
      setIsDialogOpen(false);
      if (alertTitle === "Error") {
        setOpen(true); 
      } else {
        setOpen(false); 
      }
      setError('')
      setLoading(false)
    }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
    <DialogTrigger className='py-2 px-4 w-full inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-green-500 text-white hover:bg-green-600'>
              <PlusCircle className="mr-2 h-4 w-4" />
               New Income
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Add New Income</DialogTitle>
      </DialogHeader>
      <div>
      <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div style={{ color: 'red' }}>{error}</div>}
    <div>
      <Label htmlFor="name">Income Source</Label>
      <Input
        id="incomeSource"
        type="text"
        name='incomeSource'
        value={incomeSource}
        onChange={(e) => setIncomeSource(e.target.value)}
        placeholder="e.g., Salary, Freelance, Gift"
        className="mt-1"
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
    <div className="mt-1">
      <Label htmlFor="amount">Amount</Label>
      <Input
        id="amount"
        type="number"
        name='amount'
        value={amount}
        onChange={(e) =>  setAmount(Number(e.target.value))}
        placeholder="Enter amount"
        className="mt-1"
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
    <div className="mt-1">
    <Label htmlFor="category">Category</Label>
      <Select value={category} onValueChange={(value) => setCategory(value)}>
      <SelectTrigger>
      <SelectValue placeholder="Select a category" />
      </SelectTrigger>
      <SelectContent>
        {categories.map((cat) => (
          <SelectItem key={cat} value={cat}>
            {cat}
          </SelectItem>
        ))}
      </SelectContent>
      </Select>
    </div>

    {category === "Other" && <div className="mt-1">
          <Label htmlFor="customCategory">Custom Category</Label>
          <Input
            id="customCategory"
            type="text"
            name='customCategory'
            value={customCategory}
            onChange={(e) => setCustomCategory(e.target.value)}
            placeholder="Enter custom category"
            className="mt-1"
          />
        </div>} 

    <div className="mt-1">
      {/* date picker */}
      <label htmlFor="date">Date</label>
      <input type="date" id="date" name="date" value={date} onChange={(e) => setDate(e.target.value)} />
    </div>

    <div className="mt-1">
    <Label htmlFor="description">Description </Label>
    <Textarea value={description} onChange={(e) => setDescription(e.target.value)} className='mt-1' name='description' required placeholder="Optional additional notes." id="note" />
  </div>
    <div className="mt-6">
      {loading? <Button className="w-full px-6 py-3 text-sm font-medium tracking-wide capitalize transition-colors duration-300 transform rounded-lg focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50 bg-green-500 text-white hover:bg-green-600" disabled>
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      Please wait
    </Button> : <Button type="submit" className="w-full px-6 py-3 text-sm font-medium tracking-wide capitalize transition-colors duration-300 transform rounded-lg focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50 bg-green-500 text-white hover:bg-green-600"> Add Income </Button>}

    </div>
  </form>
      <Popover showCancelButton={false} alertDescription={alertMessage} alertTitle={alertTitle} isDialogOpen={isDialogOpen} setIsDialogOpen={setIsDialogOpen} handleAlertDialogOk={handleAlertDialogOk} />
      </div>
    </DialogContent>
  </Dialog>
  )
}

export default IncomeDialog