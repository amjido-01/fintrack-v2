"use client"
import { motion } from 'framer-motion'
import Image from 'next/image'
import { BookOpen, ShieldCheck } from 'lucide-react'
import { LineChart, FolderKanban, Repeat2 } from 'lucide-react'

interface ProjectsData {
  id: number;
  name: string;
  description: string;
  icon: React.ReactElement;
}

const iconSize = 18;

const ProjectsData = [
  {
    id: 1,
    name: 'Expense Tracking',
    description: 'Easily add and categorize your expenses.',
    icon: <LineChart color='#22c55e' size={iconSize} className='mb-2' />,
  },
  {
    id: 2,
    name: 'Budget Management',
    description: 'Set and track your budgets with ease.',
    icon: <FolderKanban size={iconSize} color='#22c55e'  className='mb-2'/>,
  },
  {
    id: 3,
    name: 'Reports and Analytics',
    description: 'Gain insights with detailed reports and visual charts.',
    icon: <Repeat2 size={iconSize} color='#22c55e' className='mb-2'/>,
  },
  {
    id: 4,
    name: 'Secure Authentication',
    description: 'Securely log in with OAuth providers like Google.',
    icon: <ShieldCheck size={iconSize} color='#22c55e' className='mb-2'/>,
  },
  {
    id: 5,
    name: 'Reports and Analytics',
    description: 'Gain insights with detailed reports and visual charts.',
    icon: <BookOpen size={iconSize} color='#22c55e' className='mb-2' />,
  },
]

const HoverSpring = () => {
  return (
    <div className='container mt-24'>
      <h2 className='scroll-m-20 text-3xl text-center font-extrabold tracking-tight lg:text-4xl'>Features</h2>
      <div className="container grid w-full grid-cols-2 gap-x-10 md:grid-cols-3">
        {ProjectsData.map((project) => {
          return (
            <motion.div
              whileHover={{
                y: -8,
              }}
              transition={{
                type: 'spring',
                bounce: 0.7,
              }}
              key={project.id}
              className="mt-5 text-left border-2 p-4 rounded-md"
            >
              <div className='flex items-center w-12 h-12 justify-center rounded-full bg-primary/10'> 
                {project.icon}
              </div>
                
                <div className="mb-1 text-sm font-medium text-gray-900 dark:text-gray-100">
                  {project.name}
                </div>
                <div className="max-w-[250px] text-sm font-normal text-gray-500 dark:text-gray-500">
                  {project.description}
                </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

export default HoverSpring