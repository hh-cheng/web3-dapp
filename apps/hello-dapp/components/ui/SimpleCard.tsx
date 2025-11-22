'use client'

import ElectricBorder from '@/components/ui/ElectricBorder'

interface SimpleCardProps {
  children?: React.ReactNode
  className?: string
  electric?: boolean
}

export default function SimpleCard({
  children,
  className = '',
  electric = false,
}: SimpleCardProps) {
  const cardContent = (
    <div
      className={`rounded-xl bg-white dark:bg-gray-950 p-6 hover:shadow-md transition-shadow duration-200 ${className}`}
    >
      {children}
    </div>
  )

  if (electric) {
    return (
      <ElectricBorder
        color="#5227FF"
        speed={1.5}
        chaos={1}
        thickness={2}
        className="rounded-xl"
      >
        {cardContent}
      </ElectricBorder>
    )
  }

  return (
    <div
      className={`rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-6 shadow-sm hover:shadow-md transition-shadow duration-200 ${className}`}
    >
      {children}
    </div>
  )
}
