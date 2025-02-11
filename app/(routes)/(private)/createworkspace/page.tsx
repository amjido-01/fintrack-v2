"use client"
import React from 'react'
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from "@/components/ui/button"
import { Textarea } from '@/components/ui/textarea';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import api from '@/app/api/axiosConfig';
import Popover from '@/components/Popover';
// import { useQuery } from '@tanstack/react-query';
import {  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue, } from "@/components/ui/select"
import {z} from "zod"


// zod validation
const workspaceSchema = z.object({
  workspaceName: z.string().min(1, "Workspace name is required").refine((val) => !val.includes(' '), "Workspace name cannot contain spaces"),
  description: z.string().min(1, "Description is required"),
  currency: z.string().min(1, "Currency is required"),
});

const currencies = ["AED", "USD", "NGN", "SAR", "QAR"]
const Page = () => {
    const router = useRouter();
    const queryClient = useQueryClient();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [alertTitle, setAlertTitle] = useState('')
    const [alertMessage, setAlertMessage] = useState('')
    const [workspaceIdValue, setWorkspaceIdValue] = useState('')

    // const { data: session, status } = useSession();

    // const getCurrencies = async () => {
    //   const response = await axios.get("https://openexchangerates.org/api/currencies.json");
    //   return response.data;
    // }


    // const {data, isLoading, error}= useQuery({ queryKey: ['currencies'], queryFn: getCurrencies })

   const [loading, setLoading] = useState(false);
   const [workspaceName, setWorkspaceName] = useState('');
   const [description, setDescription] = useState('');
   const [userId, setUserId] = useState("")
   const [currency, setCurrency] = useState("")
   const [workspaceNameValue, setWorkspaceNameValue] = useState('');
   const [errors, setErrors] = useState<{ workspaceName?: string; description?: string, currency?: string }>({});
  //const [open, setOpen] = useState(false);

//    const userId = session?.user.id;
    
      const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setErrors({});

        const validation = workspaceSchema.safeParse({workspaceName, description, currency});
        if(!validation.success) {
          const errorMessages = validation.error.format();
          setErrors({
            workspaceName: errorMessages.workspaceName?._errors[0],
            currency: errorMessages.currency?._errors[0],
            description: errorMessages.description?._errors[0],
          });
          setLoading(false);
          return;
        }


        try {
          const response = await api.post('/workspaces', {
            workspaceName,
            currency,
            description
          });
          
          setLoading(false);
          
          // Check if the request was successful
          if (response.status === 201) {
            const workspaceId = response?.data?.responseBody.id
            const workspaceNameValue = response.data.responseBody.workspaceName;
            const userIdValue = response.data.responseBody.createdById
            setWorkspaceIdValue(workspaceId);
            setWorkspaceNameValue(workspaceNameValue)
            setUserId(userIdValue)
            setAlertTitle('Workspace Created Successfully');
            setAlertMessage('Your workspace has been created successfully.');
            setWorkspaceName('');
            setDescription(''); 
            setCurrency("")
            setLoading(false);
            setIsDialogOpen(true);
            queryClient.invalidateQueries({
              queryKey:['workspaces', workspaceId, {type: "done"}]
            })
          } else {
            setErrors(response.data.error || 'Workspace creation failed');
          }
        } catch (err) {
          setLoading(false);
          if (axios.isAxiosError(err) && err.response) {
            setErrors(err.response.data.error || 'Workspace creation failed');
            setAlertTitle("Error");
            setAlertMessage(err.response.data.error || "Workspace creation failed");
            setIsDialogOpen(true);
            setLoading(false);
          } else {
          setAlertTitle("Error");
          setAlertMessage("Workspace creation failed");
          setIsDialogOpen(true);
          setLoading(false);
          }

        }
      }

      const handleAlertDialogOk = () => {
        setIsDialogOpen(false);
        setLoading(false);
        if (alertTitle === 'Workspace Created Successfully') {
          router.push(`/user/${userId}/workspace/${workspaceNameValue}/${workspaceIdValue}/dashboard`)
        }
      }
    
    return (
        <div className='flex flex-col items-center justify-center min-h-screen py-2 sm:px-6 lg:px-8'>
          <div className="w-full max-w-sm mx-auto overflow-hidden rounded-lg shadow-md border-2">
    <div className="px-6 py-4">

        <h3 className="mt-3 text-xl font-medium text-center">Create a Workspace</h3>

        <form onSubmit={handleSubmit}>
        <div className='mt-4'>
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
        
        <div className="mt-4">
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
    {/* {data && Object.entries(data).map(([code]) => (
    <SelectItem key={code} value={code}>
      {code}
    </SelectItem>
    ))} */}
  </SelectContent>
      </SelectContent>
      </Select>
      {errors.currency && <p className="text-red-500 text-sm mt-1">{errors.currency}</p>}
        </div>

        <div className="mt-4">
        <Label htmlFor="description">Description</Label>
        <Textarea value={description} onChange={(e) => setDescription(e.target.value)} className='mt-1' name='description'  placeholder="Add a description for your workspace." id="description" rows={3}/>
        {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
      </div>

      <div className='mt-4'>
        {loading ? <Button className="w-full px-6 py-3 text-sm font-medium tracking-wide capitalize transition-colors duration-300 transform rounded-lg focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50 bg-green-500 text-white hover:bg-green-600" disabled>
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      Please wait
    </Button>:   <Button  type="submit" className='h-10 px-4 py-2 w-full inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-green-500 text-white hover:bg-green-600'>
        Create Workspace
        </Button>}
      </div>

        </form>
        <Popover showCancelButton={false} alertDescription={alertMessage} alertTitle={alertTitle} isDialogOpen={isDialogOpen} setIsDialogOpen={setIsDialogOpen} handleAlertDialogOk={handleAlertDialogOk} />
    </div>
</div>
        </div>
       
    )
}

export default Page