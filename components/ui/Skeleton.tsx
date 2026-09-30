import React from 'react'

export function Skeleton({ className = '' }: { className?: string }) {
  return (
    <div className={`animate-pulse bg-primary/10 rounded-md ${className}`} />
  )
}
