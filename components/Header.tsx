"use client"
import React from 'react'
import Link from 'next/link'
import { useState } from 'react'
import { BrainCircuit, Menu, X } from 'lucide-react'
import {ModeToggle} from "@/components/ui/ModeToggle";
import {motion, AnimatePresence} from "framer-motion"

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    return (
        <div className='containr w-full z-20 start-0'>
            <header className="md:w-[90%] flex flex-wrap items-center justify-between mx-auto p-3">
                <Link className="flex items-center justify-center" href="#">
                <svg width="200" height="50" viewBox="0 0 200 50" xmlns="http://www.w3.org/2000/svg">

                <circle cx="25" cy="25" r="10" fill="green" stroke="white" strokeWidth="2"/>
                <text x="21" y="29" font-family="Arial" font-size="12" fill="white" font-weight="bold">$</text>

                <text x="45" y="32" font-family="Arial" font-size="18" fill="white" font-weight="bold">FinTrack</text>
                </svg>

                
                </Link>
                <div className="flex gap-3 items-center md:order-2">
                    <ModeToggle />
                    <button
                        onClick={toggleMenu}
                        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                        aria-controls="navbar-sticky"
                        aria-expanded={isMenuOpen}
                    >
                        <span className="sr-only">Open main menu</span>
                        {isMenuOpen ? (
                            <X className="w-5 h-5" />
                        ) : (
                            <Menu className="w-5 h-5" />
                        )}
                    </button>

                    <div className="hidden md:flex gap-8 md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                        <Link className='text-primary underline-offset-4 hover:underline inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50' href="/auth/login" >Login</Link>
                        <Link href="/auth/register" className='h-10 px-4 py-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-green-500 text-white hover:bg-green-600'>Register</Link>
                    </div>
                </div>
            </header>

            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-0 bg-[#000000] bg-opacity-95 z-40 flex flex-col items-center justify-center"
                    >
                        {/* Close button positioned at top right */}
                        <div className="absolute top-4 right-4">
                            <button
                                onClick={toggleMenu}
                                className="p-2 text-gray-400 hover:text-white focus:outline-none"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Navigation links */}
                        <nav className="flex flex-col items-center gap-6">
                            <Link 
                                onClick={toggleMenu}
                                className='text-sm font-medium text-white hover:text-[#50E3C2] transition-colors'
                                href="/auth/login"
                            >
                                Login
                            </Link>
                            <Link 
                                onClick={toggleMenu}
                                className='text-sm font-medium px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors'
                                href="/auth/register"
                            >
                                Register
                            </Link>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default Header