"use client"
import React, { useEffect } from 'react'
import { MainNav } from '@/components/main-nav'
import UserAvatar from '@/components/ui/UserAvatar'
import api from '@/app/api/axiosConfig'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import MiniFooter from '@/components/MiniFooter'
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Loader2 } from 'lucide-react';
import {motion} from "framer-motion"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useParams } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import DeleteWorkspace from '@/components/DeleteWorkspace'
import { useAuthStore } from '@/store/use-auth'
import { Workspace } from '@/types/types'
import NavDrawer from '@/components/NavDrawer'
import WorkspaceSwitcher from '@/components/workspace-switcher'
import { ModeToggle } from '@/components/ui/ModeToggle'

const currencies = ["AED", "USD", "NGN", "SAR", "QAR"]


const Page = () => {
  const {user} = useAuthStore()
  const { workspaceId }  = useParams()
  const { toast } = useToast()
  const queryClient = useQueryClient()
  const [currency, setCurrency] = useState("")
  const [workspaceName, setWorkspaceName] = useState("")
  const [isSaving, setIsSaving] = useState(false)
  


  const getWorkspaces = async () => {
    const res = await api.get(`/workspace`);
    return res.data?.responseBody?.hasWorkSpace;
  }

  const {data: workspaces, isLoading, error, refetch} = useQuery({queryKey: ['workspaces', {type: "done"}], queryFn: getWorkspaces});

  
  const userWorkspace = workspaces?.filter((workspace: Workspace) => !workspace.isDeleted || []);
  
  console.log(userWorkspace)

  const getWorkspace = async (): Promise<Workspace> => {
    const res = await api.get(`/get-workspace/${workspaceId}`)
    return res.data.responseBody;
  }

  const { data: currentWorkSpace, isLoading: currentLoading, error: currentError, refetch: refetchCurrentWorkspace } = useQuery<Workspace, Error>({
    queryKey: ['workspace', workspaceId],
    queryFn: getWorkspace,
  })


  useEffect(() => {
    if (currentWorkSpace) {
      console.log("hello from testing...")
      setWorkspaceName(currentWorkSpace.workspaceName)
      setCurrency(currentWorkSpace.currency)
    }
  }, [currentWorkSpace])

  const updateWorkspace = async (data: Partial<Workspace>): Promise<Workspace> => {
    const res = await api.put(`/workspaces/${workspaceId}`, data)
    console.log(res.data, " from update")
    return res.data
  }

  const mutation = useMutation({
    mutationFn: updateWorkspace,
    onSuccess: () => {
      refetchCurrentWorkspace()
      queryClient.invalidateQueries({ queryKey: ['workspace', workspaceId] })
      toast({
        title: "Settings updated",
        description: "Your workspace settings have been updated successfully.",
      })
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: `An error occurred while updating your settings: ${error.message}`,
        variant: "destructive",
      })
    },
  })

  const handleSave = () => {
    setIsSaving(true)
    mutation.mutate({ workspaceName, currency }, {
      onSettled: () => setIsSaving(false)
    })
  }

  if (currentLoading) return <div className="flex items-center justify-center text-white bg-[#000000] h-screen w-full">
  <div className="flex items-center gap-2">
  <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
      />
      <div>Loading..</div>
  </div>
  </div>
  if (currentError) return <div>An error occurred: {currentError.message}</div>

  return (

    <div className='containr mx-auto px4'>

<div className="border-b">
            <div className="flex justify-between h-16 items-center px-4 ">

             <div className='flex items-center space-x-4'>
             <div className='md:hidden'>
             <NavDrawer userId={user?.id as string} workspaceId={workspaceId as string} workspaceName={currentWorkSpace?.workspaceName as string}/>
             </div>
             <WorkspaceSwitcher workspaces={workspaces?.filter((workspace: Workspace) => !workspace.isDeleted) || []}  />
             </div>

              <div className='flex flex-row-reverse gap-8'>
              <div className='flex items-center gap-4'>
                <div><ModeToggle /></div>
                <UserAvatar user={user} />
              </div>
              <div className='hidden md:flex'>
             <MainNav userId={user?.id as string} workspaceId={workspaceId as string} workspaceName={currentWorkSpace?.workspaceName as string} />
              <div className="ml-auto flex items-center space-x-4">
                {/* {hasIncome && <Search />} */}
              </div>
             </div>

              </div>
              
            </div>
          </div>

      <h1 className="text-3xl text-center font-bold mt-4 mb-8">Workspace Settings</h1>
      <div className='flx justify-center'>
        <div className='md:w-[70%] mx-auto'>
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Manage your workspace name and currency</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="workspace-name">Workspace Name</Label>
                <Input
                  id="workspace-name"
                  value={workspaceName}
                  onChange={(e) => setWorkspaceName(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="currency">Currency</Label>
                <Select value={currency} onValueChange={(value) => setCurrency(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Change workspace currency" />
                  </SelectTrigger>
                  <SelectContent>
                    {currencies.map((curr) => (
                      <SelectItem key={curr} value={curr}>
                        {curr}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="mt-6">
                <Button className='text-white' onClick={handleSave} disabled={isSaving}>
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className='flex justify-center mt-10'>
          <DeleteWorkspace userWorkspace={userWorkspace} workspaceId={workspaceId as string} />
        </div>

        <MiniFooter />
    </div>
  )
}

export default Page