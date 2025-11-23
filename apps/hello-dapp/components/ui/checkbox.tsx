'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

interface CheckboxProps extends React.ComponentProps<'input'> {
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
}

function Checkbox({
  className,
  checked,
  onCheckedChange,
  ...props
}: CheckboxProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onCheckedChange?.(e.target.checked)
  }

  return (
    <input
      type="checkbox"
      data-slot="checkbox"
      checked={checked}
      onChange={handleChange}
      className={cn(
        'h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500 focus:ring-2 transition-colors',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        className,
      )}
      {...props}
    />
  )
}

export { Checkbox }
