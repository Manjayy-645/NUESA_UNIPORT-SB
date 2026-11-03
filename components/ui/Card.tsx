import React from 'react'

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  variant?: 'default' | 'subtle' | 'interactive' | 'bordered'
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
    default: "bg-white border border-primary/15 rounded-sm",
    subtle: "bg-primary/[0.02] border border-primary/10 rounded-sm",
    interactive: "bg-white border border-primary/15 rounded-sm transition-[border-color,transform] duration-200 hover:border-accent/50 hover:-translate-y-0.5",
    bordered: "bg-transparent border border-primary/20 rounded-sm",
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
