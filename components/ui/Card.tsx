import React from 'react'

export function Card({ children, className = '' }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={`bg-white border border-primary/20 rounded-lg ${className}`}>
      {children}
    </div>
  )
}
