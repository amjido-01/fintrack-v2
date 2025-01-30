import { LogIn, PlusCircle, PieChart, BarChart } from "lucide-react"

const iconSize = 18
export default function Works() {
  const steps = [
    {
      icon: <LogIn size={iconSize} className="text-primary" />,
      title: "Sign Up",
      description: "Sign Up or Log In with Google to get started.",
    },
    {
      icon: <PlusCircle size={iconSize} className="text-primary" />,
      title: "Add Expenses",
      description: "Add your expenses quickly and easily.",
    },
    {
      icon: <PieChart size={iconSize} className="text-primary" />,
      title: "Set Budgets",
      description: "Set your budgets and track your spending.",
    },
    {
      icon: <BarChart size={iconSize} className="text-primary" />,
      title: "Generate Reports",
      description: "Generate detailed reports and gain insights.",
    },
  ]

  return (
    <section className="container py-16">
      <div className="container px-4 mx-auto">
        <h2 className="scroll-m-20 mb-5 text-3xl text-center font-extrabold tracking-tight lg:text-4xl">
          How It Works
        </h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div
              key={index}
              className="p-4 border rounded-md shadow-md transition-all duration-300 hover:shadow-lg"
            >
              <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-primary/10">
                {step.icon}
              </div>
              <h3 className="mb-1 text-sm font-medium text-gray-900 dark:text-gray-100">
                {step.title}
              </h3>
              <p className="text-sm font-normal text-gray-500 dark:text-gray-500">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}