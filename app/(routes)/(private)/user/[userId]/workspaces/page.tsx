"use client";
import React from 'react';
import { MainNav } from '@/components/main-nav';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation";
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu
  , DropdownMenuItem
  , DropdownMenuSeparator
  , DropdownMenuCheckboxItem
  , DropdownMenuRadioGroup
  , DropdownMenuContent,
  DropdownMenuLabel
  , DropdownMenuTrigger
 } from '@/components/ui/dropdown-menu';
 import { useAuthStore } from '@/store/use-auth';
import MiniFooter from '@/components/MiniFooter';
import UserAvatar from '@/components/ui/UserAvatar';
import Link from 'next/link';
import { motion } from "framer-motion"
import { useToast } from "@/hooks/use-toast"
import { Workspace } from '@/types/types';
import { Plus, Briefcase, Ellipsis } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import NavDrawer from '@/components/NavDrawer';
import { ModeToggle } from '@/components/ui/ModeToggle';
const Page = () => {
    const router = useRouter()
    const { toast } = useToast()
    const {user} = useAuthStore()
    const {userId} = useParams()
    
      const handleCreateNewWorkspace = () => {
        router.push('/createworkspace');
      }

      const filteredWorkspaces: Workspace[] = user?.workspaces?.filter(
        (workspace) => !workspace.isDeleted
      ) || [];      
      console.log(filteredWorkspaces, "list")
    
  return (
    <div className="containe mx-auto px-4">

<div className="border-b">
            <div className="flex justify-between h-16 items-center px-4 ">

             <div className='flex items-center space-x-4'>
             <div className='md:hidden'>
             {/* <NavDrawer userId={userId as string} workspaceId={workspaceId as string} workspaceName={currentWorkSpace?.workspaceName}/> */}
             </div>
             {/* <WorkspaceSwitcher workspaces={workspaces?.filter((workspace: Workspace) => !workspace.isDeleted) || []}  /> */}
             </div>

              <div className='flex flex-row-reverse gap-8'>
              <div className='flex items-center gap-4'>
                <div><ModeToggle /></div>
                <UserAvatar user={user} />
              </div>
              <div className='hidden md:flex'>
             {/* <MainNav userId={userId as string} workspaceId={workspaceId as string} workspaceName={currentWorkSpace?.workspaceName} /> */}
              <div className="ml-auto flex items-center space-x-4">
                {/* {hasIncome && <Search />} */}
              </div>
             </div>

              </div>
              
            </div>
          </div>

    <h1 className="text-3xl font-bold my-8">Select a Workspace</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredWorkspaces.map((workspace) => (
        <motion.div key={workspace.id}>
        <Link href={`/user/${workspace.createdById}/workspace/${workspace.workspaceName}/${workspace.id}/dashboard`}>
          <Card className="cursor-pointer hover:shadow-lg transition-shadow duration-300" 
          >
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <div className='flex items-center gap-2 text-xl'> 
                <Briefcase className="h-5 w-5 text-primary" />
                {workspace.workspaceName}
                </div>

                
                <DropdownMenu>
               <DropdownMenuTrigger asChild>
                <Ellipsis className='h-5 w-5' />
                </DropdownMenuTrigger>
                <DropdownMenuContent className=" w-24">
                  <DropdownMenuLabel>Appearance</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Link href={`/setting/${workspace.id}`}>
                      Setting
                      </Link>
                    </DropdownMenuItem>
                </DropdownMenuContent>
                </DropdownMenu>

              </CardTitle>
              <CardDescription>Created on {new Date(workspace.createdAt).toLocaleDateString()}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Click to enter this workspace</p>
            </CardContent>
          </Card>
          </Link>
        </motion.div>
      ))}
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Card className="cursor-pointer hover:shadow-lg transition-shadow duration-300 border-dashed" 
        onClick={handleCreateNewWorkspace}
        >
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <Plus className="h-5 w-5" />
              Create New Workspace
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Start a new project or team</p>
          </CardContent>
        </Card>
      </motion.div>
    </div>

    <MiniFooter />
  </div>
  )
}

export default Page