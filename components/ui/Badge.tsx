import React from 'react'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'gold' | 'success' | 'accent' | 'neutral'
  className?: string
}

export function Badge({ children, variant = 'neutral', className = '' }: BadgeProps) {
  let style = ""
  switch(variant) {
    case 'gold':
      style = "bg-yellow-100 text-yellow-800 border-gold/40"
      break
    case 'success':
      style = "bg-green-100 text-green-800 border-success/40"
      break
    case 'accent':
      style = "bg-orange-100 text-accent-dark border-accent/40"
      break
    case 'neutral':
      style = "bg-gray-100 text-gray-700 border-gray-300"
      break
  }

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${style} ${className}`}>
      {children}
    </span>
  )
}
