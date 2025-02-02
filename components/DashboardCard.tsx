import React from 'react'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";

  interface DashboardCardProps {
    cardTitle: string;
    cardContent: number | string;
    cardIcon: React.ReactElement | string;
    // stat: number
    // currency: string
  }
export const DashboardCard: React.FC<DashboardCardProps> = ({cardTitle, 
  // currency, 
  cardContent, cardIcon}) => {
  // if (typeof cardContent === 'number') {
  //   let res = cardContent.Intl.NumberFormat({
  //     style: 'currency',
  //     currency: currency
  //   })
  // }
  return (
    <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">
       {cardTitle}
      </CardTitle>
      <span className='text-gray-400'>{cardIcon}</span>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{cardContent}</div>
      {/* <p className="text-xs text-muted-foreground">
        +{stat}% from last month
      </p> */}
    </CardContent>
  </Card>
  )
}
