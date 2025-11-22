'use client'

interface SimpleCardProps {
  children?: React.ReactNode
  className?: string
}

export default function SimpleCard({
  children,
  className = '',
}: SimpleCardProps) {
  return (
    <div
      className={`rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-6 shadow-sm hover:shadow-md transition-shadow duration-200 ${className}`}
    >
      {children}
    </div>
  )
}
