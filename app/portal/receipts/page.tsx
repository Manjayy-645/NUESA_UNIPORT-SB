import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Receipt, ExternalLink, ArrowLeft, CheckCircle2 } from 'lucide-react'

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
          <Link href="/portal" className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-900/70 hover:text-red-600 transition-colors mb-2">
            <ArrowLeft size={14} /> Back to Dashboard
          </Link>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-blue-900">Official SEEES Receipts</h1>
          <p className="text-blue-900/70 text-sm mt-0.5">Department of Electrical &amp; Electronic Engineering &bull; Payment Records</p>
        </div>
      </div>

      <div className="space-y-4">
        {payments && payments.length > 0 ? (
          payments.map(payment => (
            <Card key={payment.id} className="p-6 bg-white border border-blue-900/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-blue-900/30 transition-all shadow-xs">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-blue-900 text-white flex items-center justify-center shrink-0 border border-red-600/30">
                  <Receipt size={22} />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-serif font-bold text-base text-blue-900">
                      SEEES Departmental Dues ({payment.session})
                    </h3>
                    <Badge variant={payment.status === 'success' ? 'success' : 'neutral'}>
                      {payment.status}
                    </Badge>
                  </div>
                  <p className="text-xs font-mono text-blue-900/60">
                    Receipt No: <span className="font-bold text-blue-900">{payment.receipt_number || 'N/A'}</span> &bull; Ref: {payment.paystack_reference}
                  </p>
                  <p className="text-xs text-blue-900/50 mt-0.5">
                    Paid Date: {payment.paid_at ? new Date(payment.paid_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : 'Pending Confirmation'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 self-end sm:self-center">
                <span className="text-xl font-bold font-sans text-blue-900">
                  ₦{Number(payment.amount).toLocaleString()}
                </span>
                {payment.status === 'success' && (
                  <Link href={`/portal/receipts/${payment.paystack_reference}`}>
                    <Button variant="primary" className="bg-blue-900 hover:bg-blue-950 text-white text-xs font-bold gap-1.5 border border-red-600/20">
                      <span>View Receipt</span>
                      <ExternalLink size={14} />
                    </Button>
                  </Link>
                )}
              </div>
            </Card>
          ))
        ) : (
          <Card className="p-12 text-center border-dashed border-blue-900/20 bg-white">
            <Receipt size={40} className="mx-auto text-blue-900/30 mb-3" />
            <h3 className="font-serif font-bold text-blue-900 text-lg mb-1">No Receipts Found</h3>
            <p className="text-blue-900/60 text-sm mb-6 max-w-md mx-auto">
              You haven't made any departmental dues payments yet. Settle your annual SEEES dues to generate your verified official receipt.
            </p>
            <Link href="/portal/dues">
              <Button variant="primary" className="bg-red-600 hover:bg-red-700 text-white font-bold">
                Pay SEEES Departmental Dues
              </Button>
            </Link>
          </Card>
        )}
      </div>
    </div>
  )
}
