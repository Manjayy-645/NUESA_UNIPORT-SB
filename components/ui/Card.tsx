import React from 'react'

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  variant?: 'default' | 'subtle' | 'interactive' | 'bordered' | 'elevated' | 'navy'
  as?: 'div' | 'article' | 'section'
  className?: string
}

export function Card({ 
  children, 
  variant = 'default', 
  as = 'div',
  className = '', 
  ...props 
}: CardProps) {
  const Component = as

  const variantStyles = {
    default: "bg-white border border-slate-200/80 rounded-xl shadow-xs",
    subtle: "bg-slate-50/80 border border-slate-200/60 rounded-xl",
    interactive: "bg-white border border-slate-200/80 rounded-xl shadow-xs transition-all duration-200 hover:border-blue-500/40 hover:shadow-md hover:-translate-y-0.5",
    bordered: "bg-transparent border border-slate-300 rounded-xl",
    elevated: "bg-white border border-slate-100 rounded-2xl shadow-card",
    navy: "bg-[#0A192F] text-white border border-blue-900/30 rounded-xl shadow-md",
  }

  return (
    <Component 
      className={`${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </Component>
  )
}
