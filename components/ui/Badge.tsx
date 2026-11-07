import React from 'react'

export interface BadgeProps {
  children: React.ReactNode
  variant?: 'gold' | 'success' | 'accent' | 'neutral' | 'outline' | 'danger' | 'electric' | 'navy'
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
    sm: "px-2.5 py-0.5 text-[11px] leading-tight rounded-md",
    md: "px-3 py-1 text-xs leading-normal rounded-lg",
  }

  const variantStyles = {
    neutral: "bg-slate-100 text-slate-700 border-slate-200",
    accent: "bg-blue-50 text-blue-700 border-blue-200",
    electric: "bg-blue-50 text-blue-700 border-blue-200",
    gold: "bg-amber-50 text-amber-900 border-amber-300",
    success: "bg-emerald-50 text-emerald-800 border-emerald-300",
    danger: "bg-red-50 text-red-700 border-red-200",
    navy: "bg-[#0A192F] text-blue-100 border-blue-900/50",
    outline: "bg-white text-slate-700 border-slate-300",
  }

  return (
    <span 
      className={`inline-flex items-center gap-1.5 font-bold tracking-tight border transition-colors select-none ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  )
}
