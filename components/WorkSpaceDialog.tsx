"use client"
import React from 'react'
import { Button } from '@/components/ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { z } from 'zod';
import { Textarea } from "@/components/ui/textarea"
import { useState } from 'react'
import { useRouter } from 'next/navigation';
import Popover from './Popover';
import { Loader2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
// import { useToast } from "@/hooks/use-toast"
import {  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue, 
} from '@/components/ui/select';
import { useQueryClient } from '@tanstack/react-query';
import api from '@/app/api/axiosConfig';

// Define Zod schema
const workspaceSchema = z.object({
  workspaceName: z.string().min(1, "Workspace name is required").refine((val) => !val.includes(' '), "Workspace name cannot contain spaces"),
  description: z.string().min(1, "Description is required"),
  currency: z.string().min(1, "Currency is required"),
});

const currencies = ["AED", "USD", "NGN", "SAR", "QAR"]


const WorkSpaceDialog = () => {
  // connst {setWorkspaces} = useWorkspaceStore();
  const  queryClient  = useQueryClient();
  const router = useRouter();
  // const { toast } = useToast()
//   const { data: session, status } = useSession();

   const [loading, setLoading] = useState(false);
   const [workspaceName, setWorkspaceName] = useState('');
   const [description, setDescription] = useState('');
  //  const [error, setError] = useState('');
  const [errors, setErrors] = useState<{ workspaceName?: string; description?: string, currency?: string }>({});
   const [open, setOpen] = useState(false);
   const [isDialogOpen, setIsDialogOpen] = useState(false);
   const [alertTitle, setAlertTitle] = useState("");
   const [alertMessage, setAlertMessage] = useState("");
   const [workspaceNameValue, setWorkspaceNameValue] = useState('');
   const [workspaceIdValue, setWorkspaceIdValue] = useState('');
   const [userId, setUserId] = useState<string>("")
   const [currency, setCurrency] = useState('');

//    const userId = session?.user.id;


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
   
    const validation = workspaceSchema.safeParse({workspaceName, description, currency});
    if(!validation.success) {
      const errorMessages = validation.error.format();
      setErrors({
        workspaceName: errorMessages.workspaceName?._errors?.[0],
        currency: errorMessages.currency?._errors?.[0],
        description: errorMessages.description?._errors?.[0],
      });
      setLoading(false);
      return;
    }

    try {
      const response = await api.post('/create-workspace', {
        workspaceName,
        description,
        currency,
      });
      queryClient.invalidateQueries({
        queryKey:['workspaces', {type: "done"}]
      })
      
      setLoading(false);
    
      if (response.status === 201) {
        setWorkspaceIdValue(response.data.responseBody.id)
        setWorkspaceNameValue(response.data.responseBody.workspaceName)
        setUserId(response.data.responseBody.createdById)
        setIsDialogOpen(true);
        setAlertTitle("Workspace Created Successfully");
        setAlertMessage("Your workspace has been created successfully.");

        setOpen(false);

      } else {
        setErrors({ workspaceName: "Workspace creation failed" });
      }
    } catch (err) {
      console.log(err)
      setLoading(false);
      setIsDialogOpen(true);  
      setAlertTitle("Error");
      setAlertMessage("Workspace creation failed. Please try again.");
      setOpen(true);
  }
  }

  function handleAlertDialogOk() {
    setIsDialogOpen(false);
    if (alertTitle === "Error") {
      setOpen(true); 
    } else {
      router.push(`/user/${userId}/workspace/${workspaceNameValue}/${workspaceIdValue}/dashboard`)
      setOpen(false); 
    }
    setLoading(false)
  }


    return (
      <div>

<Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className='py-3 w-full inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'>
            new workspace
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new workspace</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your account
            and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
        <div>
        <form onSubmit={handleSubmit} className="space-y-4">
      <div className='mt-1'>
        <Label htmlFor="name">Workspace Name</Label>
        <Input
          id="workspaceName"
          type="text"
          name='workspaceName'
          value={workspaceName}
          onChange={(e) => setWorkspaceName(e.target.value)}
          placeholder="Enter workspace name"
          className="mt-1"
        />
          {errors.workspaceName && <p className="text-red-500 text-sm mt-1">{errors.workspaceName}</p>}
      </div>
      <div className="mt-1">
    <Label htmlFor="currency">Currency</Label>
      <Select value={currency} onValueChange={(value) => setCurrency(value)}>
      <SelectTrigger>
      <SelectValue placeholder="Please select workspace currency" />
      </SelectTrigger>
      <SelectContent>
      <SelectContent>
        {currencies.map((currency) => (
          <SelectItem key={currency} value={currency}>
            {currency}
          </SelectItem>
        ))}
  </SelectContent>
      </SelectContent>
      </Select>
      {errors.currency && <p className="text-red-500 text-sm mt-1">{errors.currency}</p>}
        </div>
      <div className="mt-1">
      <Label htmlFor="description">Description</Label>
      <Textarea value={description} onChange={(e) => setDescription(e.target.value)} className='mt-1' name='description' placeholder="Add a description for your workspace." id="description" />
      {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
    </div>
    {loading ? <Button className="w-full px-6 py-3 text-sm font-medium tracking-wide capitalize transition-colors duration-300 transform rounded-lg focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50 bg-green-500 text-white hover:bg-green-600" disabled>
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      Please wait
    </Button>:   <Button  type="submit" className='h-10 px-4 py-2 w-full inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-green-500 text-white hover:bg-green-600'>
        Create Workspace
        </Button>}
    </form>
        </div>
      </DialogContent>
    </Dialog>

<Popover showCancelButton={false} alertDescription={alertMessage} alertTitle={alertTitle} isDialogOpen={isDialogOpen} setIsDialogOpen={setIsDialogOpen} handleAlertDialogOk={handleAlertDialogOk} />
      </div>

    )
}

export default WorkSpaceDialog