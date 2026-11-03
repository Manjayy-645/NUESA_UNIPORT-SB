import React from 'react'
import { Loader2 } from 'lucide-react'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'gold' | 'electric'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
  isLoading?: boolean
}

export function Button({ 
  children, 
  variant = 'primary', 
  size = 'md',
  fullWidth = false, 
  isLoading = false,
  disabled = false,
  className = '', 
  type = 'button',
  ...props 
}: ButtonProps) {
  
  const baseStyle = "inline-flex items-center justify-center font-medium transition-[background-color,border-color,color,box-shadow,transform] duration-200 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
  const widthStyle = fullWidth ? "w-full" : ""
  
  const sizeStyles = {
    sm: "px-3.5 py-1.5 text-xs rounded-sm min-h-[36px]",
    md: "px-5 py-2.5 text-sm rounded-sm min-h-[44px] min-w-[44px]",
    lg: "px-7 py-3.5 text-base rounded-sm min-h-[50px]",
  }

  const variantStyles = {
    primary: "bg-accent text-white hover:bg-accent-dark border border-accent active:bg-accent-dark",
    secondary: "bg-transparent text-primary border border-primary/25 hover:bg-primary/5 hover:border-primary/50",
    outline: "bg-transparent text-accent border border-accent hover:bg-accent/10",
    ghost: "bg-transparent text-primary/80 hover:text-primary hover:bg-primary/5 border border-transparent",
    danger: "bg-red-600 text-white hover:bg-red-700 border border-red-600 active:bg-red-800",
    gold: "bg-amber-500 text-white hover:bg-amber-600 border border-amber-500 active:bg-amber-700",
    electric: "bg-blue-600 text-white hover:bg-blue-700 border border-blue-600 active:bg-blue-800",
  }

  return (
    <button 
      type={type}
      disabled={disabled || isLoading}
      aria-busy={isLoading}
      className={`${baseStyle} ${sizeStyles[size]} ${variantStyles[variant]} ${widthStyle} ${className}`}
      {...props}
    >
      {isLoading ? (
        <span className="inline-flex items-center gap-2">
          <Loader2 className="h-4 w-4 animate-spin text-current" aria-hidden="true" />
          <span>Processing...</span>
        </span>
      ) : (
        children
      )}
    </button>
  )
}
