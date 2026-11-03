import React, { useId } from 'react'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
  helperText?: string
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, id: explicitId, className = '', ...props }, ref) => {
    const generatedId = useId()
    const inputId = explicitId || generatedId
    const errorId = `${inputId}-error`
    const helperId = `${inputId}-helper`

    const describedBy = [
      error ? errorId : null,
      helperText ? helperId : null
    ].filter(Boolean).join(' ') || undefined

    return (
      <div className="w-full text-left">
        <label 
          htmlFor={inputId} 
          className="block text-xs font-semibold uppercase tracking-wider text-primary/80 mb-1.5"
        >
          {label}
        </label>
        <input
          ref={ref}
          id={inputId}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          className={`block w-full px-3.5 py-2.5 text-sm min-h-[44px] bg-white border rounded-sm font-sans text-primary placeholder:text-primary/35 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-1 focus-visible:ring-offset-background ${
            error 
              ? 'border-red-500 focus-visible:ring-red-500' 
              : 'border-primary/20 hover:border-primary/40 focus:border-accent'
          } ${className}`}
          {...props}
        />
        {error && (
          <p id={errorId} className="mt-1.5 text-xs text-red-600 font-sans flex items-center gap-1" role="alert">
            <span aria-hidden="true">&bull;</span> {error}
          </p>
        )}
        {!error && helperText && (
          <p id={helperId} className="mt-1 text-xs text-primary/55 font-sans">
            {helperText}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'
