import { createAdminClient } from '@/lib/supabase/admin'
import { ExportCSVButton } from '@/components/ExportCSVButton'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { CreditCard, Search, Filter, ArrowUpDown } from 'lucide-react'

export const metadata = {
  title: 'Payment Audits | SEEES Back-Office',
  description: 'Audit SEEES departmental dues payments, reconcile transaction receipts, and export CSV financial ledgers.',
}

export default async function AdminPaymentsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const resolvedSearchParams = await searchParams
  const supabase = createAdminClient()
  
  const sessionFilter = (resolvedSearchParams.session as string) || ''
  const statusFilter = (resolvedSearchParams.status as string) || ''
  const search = (resolvedSearchParams.search as string) || ''
  
  let query = supabase
    .from('payments')
    .select('*, students(full_name, mat_no, department, level)')
    .order('created_at', { ascending: false })
    
  if (sessionFilter) query = query.eq('session', sessionFilter)
  if (statusFilter) query = query.eq('status', statusFilter)
  
  const { data: payments } = await query
  
  let filteredPayments = payments || []
  if (search) {
    const s = search.toLowerCase()
    filteredPayments = filteredPayments.filter(p => 
      p.paystack_reference.toLowerCase().includes(s) ||
      (p.receipt_number && p.receipt_number.toLowerCase().includes(s)) ||
      (p.students?.full_name && p.students.full_name.toLowerCase().includes(s)) ||
      (p.students?.mat_no && p.students.mat_no.toLowerCase().includes(s))
    )
  }

  const totalSum = filteredPayments
    .filter(p => p.status === 'success')
    .reduce((sum, p) => sum + Number(p.amount), 0)

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-8">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-primary/10">
        <div>
          <div className="inline-flex items-center gap-2 mb-1.5">
            <CreditCard size={16} className="text-accent" aria-hidden="true" />
            <span className="font-mono text-xs uppercase tracking-widest text-primary/60 font-semibold">
              Treasury & Audit Operations
            </span>
          </div>
          <h1 className="font-serif text-3xl font-bold text-primary tracking-tight">
            SEEES Departmental Dues Audit
          </h1>
          <p className="font-sans text-xs sm:text-sm text-primary/70 mt-1">
            Reconcile Paystack collections, verify bank settlements, and export accounting ledgers.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <ExportCSVButton data={filteredPayments} />
        </div>
      </div>

      {/* Summary KPI Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card variant="subtle" className="p-4">
          <span className="font-mono text-[10px] uppercase tracking-wider text-primary/50 block">Filtered Volume</span>
          <span className="font-serif text-2xl font-bold text-primary mt-1 block">
            {filteredPayments.length} Transactions
          </span>
        </Card>
        <Card variant="subtle" className="p-4">
          <span className="font-mono text-[10px] uppercase tracking-wider text-emerald-800 block">Total Cleared In View</span>
          <span className="font-mono text-2xl font-bold text-emerald-800 mt-1 block">
            ₦{totalSum.toLocaleString()}
          </span>
        </Card>
        <Card variant="subtle" className="p-4">
          <span className="font-mono text-[10px] uppercase tracking-wider text-primary/50 block">Active Academic Term</span>
          <span className="font-sans text-sm font-bold text-primary mt-1 block">
            2025/2026 First Semester
          </span>
        </Card>
      </div>

      {/* Filter Toolbar (GET Form) */}
      <Card variant="default" className="p-4">
        <form method="GET" action="/admin/payments" className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
          <div className="sm:col-span-5 relative">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-primary/40" aria-hidden="true" />
            <input 
              type="text" 
              name="search"
              defaultValue={search}
              placeholder="Search by Mat No, Name, or Reference..." 
              className="w-full pl-9 pr-3 py-2 text-xs font-sans border border-primary/20 rounded-xs bg-white text-primary placeholder:text-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent min-h-[40px]"
            />
          </div>

          <div className="sm:col-span-3">
            <select 
              name="session" 
              defaultValue={sessionFilter}
              className="w-full px-3 py-2 text-xs font-sans border border-primary/20 rounded-xs bg-white text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent min-h-[40px]"
            >
              <option value="">All Sessions</option>
              <option value="2025/2026">2025/2026</option>
              <option value="2024/2025">2024/2025</option>
            </select>
          </div>

          <div className="sm:col-span-2">
            <select 
              name="status" 
              defaultValue={statusFilter}
              className="w-full px-3 py-2 text-xs font-sans border border-primary/20 rounded-xs bg-white text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent min-h-[40px]"
            >
              <option value="">All Statuses</option>
              <option value="success">Success</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
            </select>
          </div>

          <div className="sm:col-span-2 flex gap-2">
            <Button type="submit" variant="primary" size="sm" fullWidth className="font-sans font-semibold">
              Filter
            </Button>
            {(search || sessionFilter || statusFilter) && (
              <a href="/admin/payments" className="inline-flex">
                <Button variant="ghost" size="sm" className="px-2 text-xs font-mono">
                  Reset
                </Button>
              </a>
            )}
          </div>
        </form>
      </Card>

      {/* Financial Audit Table */}
      <Card variant="default" className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans whitespace-nowrap">
            <thead className="bg-primary/5 border-b border-primary/10 font-mono uppercase text-primary/60">
              <tr>
                <th scope="col" className="px-5 py-3.5">Student Particulars</th>
                <th scope="col" className="px-5 py-3.5">Reference / Receipt No.</th>
                <th scope="col" className="px-5 py-3.5">Session</th>
                <th scope="col" className="px-5 py-3.5 text-right">Amount</th>
                <th scope="col" className="px-5 py-3.5">Status</th>
                <th scope="col" className="px-5 py-3.5">Date Processed</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-primary/10">
              {filteredPayments.map(payment => (
                <tr key={payment.id} className="hover:bg-primary/[0.02] transition-colors">
                  <td className="px-5 py-4">
                    <p className="font-serif font-bold text-sm text-primary">{payment.students?.full_name}</p>
                    <p className="font-mono text-[11px] text-primary/60 mt-0.5">
                      {payment.students?.mat_no} &bull; {payment.students?.department} ({payment.students?.level}L)
                    </p>
                  </td>
                  <td className="px-5 py-4">
                    <p className="font-mono text-xs font-bold text-primary">{payment.receipt_number || 'PENDING'}</p>
                    <p className="font-mono text-[10px] text-primary/50 mt-0.5">{payment.paystack_reference}</p>
                  </td>
                  <td className="px-5 py-4 font-mono font-medium text-primary">
                    {payment.session}
                  </td>
                  <td className="px-5 py-4 text-right font-mono font-bold text-primary">
                    ₦{Number(payment.amount).toLocaleString()}
                  </td>
                  <td className="px-5 py-4">
                    <Badge variant={payment.status === 'success' ? 'success' : payment.status === 'pending' ? 'gold' : 'danger'}>
                      {payment.status}
                    </Badge>
                  </td>
                  <td className="px-5 py-4 font-mono text-[11px] text-primary/70">
                    {payment.paid_at ? new Date(payment.paid_at).toLocaleString('en-GB') : 'Pending Gateway'}
                  </td>
                </tr>
              ))}

              {filteredPayments.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-5 py-12 text-center text-primary/60 font-sans">
                    No payment records match the current filter selection.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

    </div>
  )
}
