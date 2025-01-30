"use client"
import React from 'react';
// import { signOut } from 'next-auth/react';
import { LogOut } from 'lucide-react';
// import { useSession } from 'next-auth/react';
import { ChevronDown } from 'lucide-react';
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  import { Button } from './button'
const UserAvatar = () => {
    // const { data: session} = useSession()
  return (
    <DropdownMenu>
  <DropdownMenuTrigger className='flex gap-2 items-center px-3'>
  <Avatar className=''>
    <AvatarImage src="https://github.com/shadcn.png" />
   <AvatarFallback>CN</AvatarFallback>
    </Avatar>
   <div className='flex items-center'>
    {/* <p>{session?.user?.name}</p> */}
    <ChevronDown />
   </div>

  </DropdownMenuTrigger>
  <DropdownMenuContent className='min-w-[18rem] mr-4'>

    <DropdownMenuLabel className="py-4 flex items-center justify-start gap-4">
    <Avatar>
    <AvatarImage src="https://github.com/shadcn.png" />
   <AvatarFallback>CN</AvatarFallback>
    </Avatar> 
        <div>
        {/* {session?.user && (
            <div>
                 <p className="text-white">{session.user.name}</p>
                 <p className="text-white">{session.user.email}</p>
            </div>
        )} */}
        </div>
    </DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>
     {/* <Button size="sm" onClick={() => signOut({callbackUrl: "/"})} className="w-full bg-transparent justify-start hover:bg-transparent text-white tracking-wide capitalize transition-colors duration-300 transform rounded-lg focus:outline-none focus:ring "> 
     <LogOut className="mr-2 h-4 w-4" />
        Sign Out
        </Button> */}
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>

  )
}

export default UserAvatar