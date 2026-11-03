import React from 'react'

export interface BadgeProps {
  children: React.ReactNode
  variant?: 'gold' | 'success' | 'accent' | 'neutral' | 'outline' | 'danger' | 'electric'
  size?: 'sm' | 'md'
  className?: string
}

export function Badge({ 
  children, 
  variant = 'neutral', 
  size = 'sm',
  className = '' 
}: BadgeProps) {
  const sizeStyles = {
    sm: "px-2 py-0.5 text-[11px] leading-tight",
    md: "px-2.5 py-1 text-xs leading-normal",
  }

  const variantStyles = {
    neutral: "bg-primary/5 text-primary/80 border-primary/15",
    accent: "bg-accent/10 text-accent-dark border-accent/30",
    gold: "bg-amber-50 text-amber-800 border-amber-600/25",
    electric: "bg-blue-50 text-blue-800 border-blue-600/25",
    success: "bg-emerald-50 text-emerald-800 border-emerald-600/30",
    danger: "bg-red-50 text-red-700 border-red-500/25",
    outline: "bg-transparent text-primary/70 border-primary/20",
  }

  return (
    <span 
      className={`inline-flex items-center gap-1 font-mono font-medium tracking-tight rounded-xs border transition-colors ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  )
}
