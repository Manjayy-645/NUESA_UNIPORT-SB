'use client'

import React from 'react'
import { Printer } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export function PrintReceiptButton({ className = '' }: { className?: string }) {
  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print()
    }
  }

  return (
    <Button
      onClick={handlePrint}
      variant="secondary"
      size="sm"
      className={`print:hidden gap-1.5 font-mono text-xs uppercase tracking-wider ${className}`}
      aria-label="Print official receipt voucher"
    >
      <Printer size={15} aria-hidden="true" />
      <span>Print Voucher</span>
    </Button>
  )
}
