"use client"
import React from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
const Hero = () => {
    return (
        <section className="mt-20">
    <div className="lg:flex">
        <div className="flex items-center justify-center w-full px-6 py-8 lg:h-[32rem] lg:w-1/2">
            <div className="max-w-xl">
                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Take Control of Your <span className="text-green-500 ">Finances</span></h1>

                <p className="mt-4 text-sm text-gray-500 lg:text-base">Easily manage expenses, stay on budget, and achieve your financial goals with our user-friendly app.</p>

                <div className="flex gap-5 flex-col mt-6 space-y-3 lg:space-y-0 lg:flex-row">
                   <Link href="/auth/signup" className="bg-gray-900 border-2 border-green-500 text-white hover:bg-gray-700  h-10 px-4 py-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">Get Started</Link>
                    <Button className="bg-green-500 text-white hover:bg-green-700">Learn More</Button>
                </div>
            </div>
        </div>

        <div className="w-full lg:w-1/2 h-auto">
            <Image src="/finance.png" alt="Finance"   width={0} height={0} sizes="100vw" style={{ width: '100%', height: '100%', objectFit: "cover" }} priority={true}/>    
        </div>
    </div>
</section>
    )
}

export default Hero;