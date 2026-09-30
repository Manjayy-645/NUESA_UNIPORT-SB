import React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        <label className="block text-sm font-medium text-primary mb-1">
          {label}
        </label>
        <input
          ref={ref}
          className={`block w-full px-3 py-2 text-base min-h-[44px] border rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors ${
            error ? 'border-red-500' : 'border-primary/20'
          } ${className}`}
          {...props}
        />
        {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
      </div>
    )
  }
)
Input.displayName = 'Input'
