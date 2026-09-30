'use client'

export function ExportCSVButton({ data }: { data: any[] }) {
  const handleExport = () => {
    if (data.length === 0) return
    
    // Define headers
    const headers = ['Receipt No', 'Reference', 'Student Name', 'Mat No', 'Department', 'Level', 'Amount', 'Session', 'Status', 'Date']
    
    // Map data
    const csvRows = data.map(payment => [
      payment.receipt_number || 'N/A',
      payment.paystack_reference,
      `"${payment.students?.full_name || ''}"`,
      payment.students?.mat_no || '',
      payment.students?.department || '',
      payment.students?.level || '',
      payment.amount,
      payment.session,
      payment.status,
      payment.paid_at ? new Date(payment.paid_at).toISOString() : 'N/A'
    ])
    
    // Create CSV string
    const csvContent = [headers.join(','), ...csvRows.map(r => r.join(','))].join('\n')
    
    // Trigger download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', `nuesa-payments-${new Date().toISOString().split('T')[0]}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <button 
      onClick={handleExport}
      className="bg-uniport-navy text-white px-4 py-2 rounded font-medium hover:bg-opacity-90 text-sm"
    >
      Export to CSV
    </button>
  )
}
