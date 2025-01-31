"use client"
import React from 'react';
import Link from "next/link";
// import { useSession } from "next-auth/react";
import {ModeToggle} from "@/components/ui/ModeToggle";
import { usePathname } from 'next/navigation';
import UserAvatar from './ui/UserAvatar';
import { Loader2 } from "lucide-react"

// const NavLinks = [
// 	{ id: 1, name: 'Dashboard', path: '/dashboard' },
// 	{ id: 2, name: 'Workspaces', path: '/workspaces' },
// ];

const NavBar = () => {
//   const { data: session, status } = useSession();
//   const loading = status === "loading";
  const pathname = usePathname();
  const isActive = (path: string) => path === pathname;
  return (
    <nav className="container w-full z-20 start-0">
  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">

  <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
      {/* <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" /> */}
      <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">FinTrack</span>
  </Link>
    
    <div className="flex gap-8 md:order-2 space-x-3 md:space-x-0">
    <div><ModeToggle /></div>

    {/* {loading? (<div className="flex items-center space-x-3">
      <div className="flex gap-2 items-center">
        <Loader2 className="h-5 w-5 animate-spin" />
        <p>Loading...</p>
      </div> 
            </div>): session?.user ? (<UserAvatar />) : ( */}

                <div className="flex gap-8 md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
    <Link className='text-primary underline-offset-4 hover:underline inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50' href="/auth/login" >Login</Link>
    <Link href="/auth/register" className='h-10 px-4 py-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-green-500 text-white hover:bg-green-600'>Register</Link>
    </div>
    </div>

  </div>
</nav>
  )
}

export default NavBar