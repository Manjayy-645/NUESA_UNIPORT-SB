import React from 'react'
import { Loader2 } from 'lucide-react'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'navy' | 'outline' | 'ghost' | 'danger' | 'gold' | 'electric'
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
  
  const baseStyle = "inline-flex items-center justify-center font-bold tracking-wide transition-all duration-200 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 cursor-pointer select-none"
  const widthStyle = fullWidth ? "w-full" : ""
  
  const sizeStyles = {
    sm: "px-3.5 py-1.5 text-xs rounded-md min-h-[36px] gap-1.5",
    md: "px-5 py-2.5 text-sm rounded-lg min-h-[44px] min-w-[44px] gap-2",
    lg: "px-7 py-3.5 text-base rounded-xl min-h-[50px] gap-2.5",
  }

  const variantStyles = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white shadow-sm shadow-blue-600/20 active:bg-blue-800 border border-blue-600/50",
    secondary: "bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 hover:border-slate-400 shadow-xs active:bg-slate-100",
    navy: "bg-[#0A192F] hover:bg-[#132A4F] text-white shadow-sm shadow-slate-900/10 border border-blue-900/30 active:bg-[#060E1E]",
    outline: "bg-transparent text-blue-600 border-2 border-blue-600 hover:bg-blue-50 active:bg-blue-100",
    ghost: "bg-transparent text-slate-700 hover:text-slate-900 hover:bg-slate-100 border border-transparent",
    danger: "bg-red-600 text-white hover:bg-red-700 shadow-sm shadow-red-600/20 active:bg-red-800 border border-red-600",
    gold: "bg-amber-500 text-slate-950 hover:bg-amber-400 shadow-sm shadow-amber-500/20 active:bg-amber-600 border border-amber-500",
    electric: "bg-blue-600 hover:bg-blue-700 text-white shadow-sm shadow-blue-600/20 active:bg-blue-800 border border-blue-600",
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
