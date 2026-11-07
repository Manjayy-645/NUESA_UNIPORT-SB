import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Receipt, ExternalLink, ArrowLeft, CheckCircle2 } from 'lucide-react'

export const metadata = {
  title: 'Official Departmental Receipts | Electrical & Electronics Engineering UniPort',
  description: 'Certified payment history and departmental clearance receipts for Electrical & Electronics Engineering students.',
}

export default async function PortalReceiptsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: payments } = await supabase
    .from('payments')
    .select('*, students(*)')
    .eq('student_id', user.id)
    .order('created_at', { ascending: false })

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 font-sans">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <Link href="/portal" className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-blue-600 transition-colors mb-2">
            <ArrowLeft size={14} /> Back to Dashboard
          </Link>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0A192F] tracking-tight">Official Departmental Receipts</h1>
          <p className="text-slate-500 text-sm mt-0.5 font-medium">Department of Electrical &amp; Electronics Engineering &bull; Payment Records</p>
        </div>
      </div>

      <div className="space-y-4">
        {payments && payments.length > 0 ? (
          payments.map(payment => (
            <Card key={payment.id} className="p-6 bg-white border border-slate-200/90 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-blue-300 transition-all shadow-xs">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-200">
                  <Receipt size={22} />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-base text-[#0A192F]">
                      Departmental Dues ({payment.session})
                    </h3>
                    <Badge variant={payment.status === 'success' ? 'success' : 'neutral'}>
                      {payment.status}
                    </Badge>
                  </div>
                  <p className="text-xs font-mono text-slate-500">
                    Receipt No: <span className="font-bold text-blue-600">{payment.receipt_number || 'N/A'}</span> &bull; Ref: {payment.paystack_reference}
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Paid Date: {payment.paid_at ? new Date(payment.paid_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : 'Pending Confirmation'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 self-end sm:self-center">
                <span className="text-xl font-black font-mono text-[#0A192F]">
                  ₦{Number(payment.amount).toLocaleString()}
                </span>
                {payment.status === 'success' && (
                  <Link href={`/portal/receipts/${payment.paystack_reference}`}>
                    <Button variant="primary" className="text-xs font-bold gap-1.5 shadow-2xs">
                      <span>View Receipt</span>
                      <ExternalLink size={14} />
                    </Button>
                  </Link>
                )}
              </div>
            </Card>
          ))
        ) : (
          <Card className="p-12 text-center border-2 border-dashed border-slate-200 rounded-2xl bg-white shadow-xs">
            <div className="w-14 h-14 bg-slate-100 text-slate-400 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <Receipt size={28} />
            </div>
            <h3 className="font-bold text-[#0A192F] text-lg mb-1">No Receipts Found</h3>
            <p className="text-slate-500 text-sm mb-6 max-w-md mx-auto">
              You haven&apos;t made any departmental dues payments yet. Settle your annual dues to generate your verified official receipt.
            </p>
            <Link href="/portal/dues">
              <Button variant="primary" className="font-bold">
                Pay Departmental Dues
              </Button>
            </Link>
          </Card>
        )}
      </div>
    </div>
  )
}
