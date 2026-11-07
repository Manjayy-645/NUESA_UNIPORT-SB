'use client'

import React from 'react'
import { Download } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export interface PaymentExportRecord {
  receipt_number?: string | null
  paystack_reference: string
  amount: number | string
  session: string
  status: string
  paid_at?: string | null
  students?: {
    full_name?: string
    mat_no?: string
    department?: string
    level?: string
  } | null
}

export function ExportCSVButton({ data }: { data: PaymentExportRecord[] }) {
  const handleExport = () => {
    if (!data || data.length === 0) return
    
    // Define headers
    const headers = [
      'Receipt No', 
      'Paystack Reference', 
      'Student Name', 
      'Matriculation No', 
      'Department', 
      'Level', 
      'Amount (NGN)', 
      'Session', 
      'Clearance Status', 
      'Paid Timestamp'
    ]
    
    // Map data
    const csvRows = data.map(payment => [
      payment.receipt_number || 'PENDING',
      payment.paystack_reference,
      `"${(payment.students?.full_name || '').replace(/"/g, '""')}"`,
      payment.students?.mat_no || '',
      payment.students?.department || '',
      payment.students?.level || '',
      payment.amount,
      payment.session,
      payment.status,
      payment.paid_at ? new Date(payment.paid_at).toISOString() : 'PENDING'
    ])
    
    // Create CSV string
    const csvContent = [headers.join(','), ...csvRows.map(r => r.join(','))].join('\n')
    
    // Trigger download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', `eee-departmental-dues-audit-${new Date().toISOString().split('T')[0]}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  return (
    <Button 
      onClick={handleExport}
      variant="secondary"
      size="sm"
      disabled={!data || data.length === 0}
      className="gap-1.5 font-mono text-xs uppercase tracking-wider"
      aria-label="Export payment ledger as CSV"
    >
      <Download size={14} aria-hidden="true" />
      <span>Export Financial CSV</span>
    </Button>
  )
}
