"use client"
import React from 'react';
import { Button } from './button';
import { ChevronDown, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  import { useAuthStore } from '@/store/use-auth';

  interface User {
    id: string;
    email: string;
    username: string;
    name: string      
    // profileImage?: string;
  }
  
  interface UserAvatarProps {
    user?: User | null; // `user` is optional to handle cases where it's undefined/null
  }
  


  const UserAvatar: React.FC<UserAvatarProps> = ({ user }) => {
    const {logout} = useAuthStore()
    const router = useRouter();

    const handleLogout = async () => {
      await logout()
      router.push('/auth/login')
    }
  return (
    <DropdownMenu>
  <DropdownMenuTrigger className='flex gap-2 items-center px-3'>
  <Avatar className=''>
    <AvatarImage src="https://github.com/shadcn.png" />
   <AvatarFallback>CN</AvatarFallback>
    </Avatar>
   <div className='flex items-center'>
    <p>{user && user.name}</p>
    <ChevronDown />
   </div>

  </DropdownMenuTrigger>
  <DropdownMenuContent className='min-w-[18rem] mr-4'>

    <DropdownMenuLabel className="py-4 flex items-center justify-start gap-4">
    <Avatar>
    <AvatarImage src="https://github.com/shadcn.png" />
   <AvatarFallback>CN</AvatarFallback>
    </Avatar> 
    <div className=''>
            {user && (
              <>
                <p className="text-white">{user.username}</p>
                <p className="text-white">{user.email}</p>
              </>
            )}
          </div>
    </DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>
     <Button onClick={handleLogout} size="sm"  className="w-full bg-transparent justify-start hover:bg-transparent text-white tracking-wide capitalize transition-colors duration-300 transform rounded-lg focus:outline-none focus:ring "> 
     <LogOut className="mr-2 h-4 w-4" />
        Sign Out
        </Button>
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>

  )
}

export default UserAvatar