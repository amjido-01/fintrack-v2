import React from 'react'
import { Button } from './ui/button'
const CTA = () => {
  return (
        <section className="mt-40">
    <div className="container px-4 py-16 mx-auto lg:flex lg:items-center justify-center gap-24">
       <div>
       <h2 className="text-2xl font-semibold tracking-tight xl:text-3xl">
        Get monthly <span className='text-green-500'>money</span> tips and
        </h2>
        <h2 className="text-2xl font-semibold tracking-tight xl:text-3xl ">stay on top of your finance</h2>
       </div>
        <div className="mt-8 lg:mt-0">
            <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:-mx-2">
                <input id="email" type="text" className="px-4 py-2 text-gray-700 bg-white border border-gray-200 rounded-lg sm:mx-2 focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Email Address" />

                <Button className=' bg-green-500 text-white hover:bg-green-600'>Get Started</Button>
            </div>

            <p className="mt-3 text-sm text-gray-500">Attention! Offer expires in 30 days. Make sure not to miss this opportunity</p>
        </div>
    </div>
</section>
  )
}

export default CTA