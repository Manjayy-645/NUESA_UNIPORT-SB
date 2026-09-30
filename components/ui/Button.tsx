import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger'
  fullWidth?: boolean
}

export function Button({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  className = '', 
  ...props 
}: ButtonProps) {
  
  const baseStyle = "inline-flex items-center justify-center font-medium rounded-md transition-colors disabled:opacity-50 px-5 py-2 min-h-[44px] min-w-[44px]"
  const widthStyle = fullWidth ? "w-full" : ""
  
  let variantStyle = ""
  if (variant === 'primary') {
    variantStyle = "bg-accent text-white hover:bg-accent-dark border border-transparent"
  } else if (variant === 'secondary') {
    variantStyle = "bg-transparent text-primary border border-primary/40 hover:bg-primary/5"
  } else if (variant === 'danger') {
    variantStyle = "bg-transparent text-red-600 border border-red-600/40 hover:bg-red-50"
  }

  return (
    <button 
      className={`${baseStyle} ${widthStyle} ${variantStyle} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
