import React from 'react'
import Image from 'next/image'

type TestimonyProps = {
    img: string;
    name: string;
    role: string;
    testimony: string;
}
const Testimony: React.FC<TestimonyProps> = ({img, name, role, testimony}) => {
  return (
    <div>
        <div className="shrink-0 px-2 w-[500px] grid grid-cols-[7rem,_1fr] rounded-lg overflow-hidden relative ">
                <Image className='w-full h-44 object-cover' src={img} width={500} height={500} alt="testimonial" />
                <div className="bgslate-900 border rounded-md text-gray-900 dark:text-gray-100 p-4">
                    <span className="block font-semibold text-lg mb-1">{name}</span>
                    <span className="block mb-3 text-sm font-medium">{role}</span>
                    <span className="block text-sm text-gray-500 dark:text-gray-500">{testimony}</span>
                </div>
                <span className="text-7xl absolute top-2 right-2 text-primary">&quot;</span>
            </div>
    </div>
  )
}

export default Testimony