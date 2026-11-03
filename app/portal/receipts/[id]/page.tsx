import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { QRCodeSVG } from 'qrcode.react'
import { ArrowLeft, CheckCircle2, ShieldCheck, AlertTriangle } from 'lucide-react'
import { PrintReceiptButton } from '@/components/PrintReceiptButton'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'

export const metadata = {
  title: 'Official Dues Receipt | SEEES UniPort',
  description: 'Cryptographically certified departmental dues receipt and financial clearance voucher for Electrical & Electronic Engineering students.',
}

export default async function ReceiptPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) redirect('/login')
  
  const { data: payment } = await supabase
    .from('payments')
    .select('*, students(*)')
    .eq('paystack_reference', id)
    .single()
    
  if (!payment) {
    return (
      <div className="max-w-xl mx-auto my-16 p-8 text-center bg-white border border-red-200 rounded-lg shadow-sm">
        <p className="text-red-600 font-bold text-lg mb-2">Receipt Not Found</p>
        <p className="text-blue-900/70 text-sm mb-4">No payment record exists matching this reference.</p>
        <Link href="/portal/dues" className="text-xs text-blue-900 font-semibold underline">
          Return to Dues Portal
        </Link>
      </div>
    )
  }
  
  if (payment.student_id !== user.id) {
    return (
      <div className="max-w-xl mx-auto my-16 p-8 text-center bg-white border border-red-200 rounded-lg shadow-sm">
        <p className="text-red-600 font-bold text-lg">Unauthorized Access</p>
        <p className="text-blue-900/70 text-sm mt-2">You do not have permission to view this receipt.</p>
      </div>
    )
  }
  
  let currentPayment = payment

  // Auto-verify if still pending (handles missing/delayed webhooks)
  if (currentPayment.status === 'pending') {
    try {
      const paystackRes = await fetch(`https://api.paystack.co/transaction/verify/${id}`, {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          'Content-Type': 'application/json'
        },
        cache: 'no-store'
      })
      
      const paystackData = await paystackRes.json()
      
      if (paystackData.status && paystackData.data.status === 'success') {
        const adminSupabase = createAdminClient()
        
        const year = new Date().getFullYear()
        const randomSeq = Math.floor(1000 + Math.random() * 9000)
        const receiptNumber = `SEEES/${year}/${randomSeq}`
        
        const { data: updatedPayment, error } = await adminSupabase
          .from('payments')
          .update({ 
            status: 'success', 
            paid_at: paystackData.data.paidAt || new Date().toISOString(),
            receipt_number: receiptNumber
          })
          .eq('paystack_reference', id)
          .eq('status', 'pending')
          .select('*, students(*)')
          .single()
          
        if (!error && updatedPayment) {
          currentPayment = updatedPayment
        }
      }
    } catch (err) {
      console.error('Error auto-verifying payment:', err)
    }
  }
  
  const student = currentPayment.students
  const verificationUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/verify-receipt/${currentPayment.paystack_reference}`

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Action Navigation Header */}
      <div className="flex items-center justify-between print:hidden">
        <Link 
          href="/portal" 
          className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-blue-900/60 hover:text-red-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 rounded-xs p-1"
        >
          <ArrowLeft size={14} aria-hidden="true" />
          <span>Back to Dashboard</span>
        </Link>

        <PrintReceiptButton />
      </div>

      {/* Official Voucher Printable Body in SEEES Blue/Red Palette */}
      <article 
        role="region" 
        aria-label="Official Clearance Receipt"
        className="bg-white p-8 sm:p-12 border-2 border-blue-900/20 rounded-lg relative overflow-hidden print:p-0 print:border-none print:shadow-none shadow-md"
      >
        
        {/* Security Watermark Accent in SEEES Deep Blue & Red */}
        <div className="absolute top-0 left-0 right-0 h-2.5 bg-gradient-to-r from-blue-900 via-blue-800 to-red-600" aria-hidden="true" />
        
        {/* Institutional Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start gap-6 pb-8 border-b-2 border-blue-900/10">
          <div className="space-y-2">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-600 inline-block" />
              <span className="font-mono text-xs uppercase tracking-widest text-red-600 font-bold">
                Official Departmental Clearance Voucher
              </span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-black text-blue-900 tracking-tight leading-none">
              SEEES UniPort
            </h1>
            <p className="font-sans text-xs text-blue-900/80 max-w-sm leading-relaxed font-medium">
              Society of Electrical and Electronic Engineering Students<br />
              Department of Electrical &amp; Electronic Engineering, University of Port Harcourt
            </p>
            {currentPayment.status === 'success' ? (
              <div className="inline-flex items-center gap-1.5 bg-green-50 text-green-800 border border-green-300 px-3 py-1 rounded-full font-mono text-xs font-bold uppercase tracking-wider mt-2">
                <CheckCircle2 size={13} className="text-green-700" aria-hidden="true" />
                <span>Certified Official Receipt</span>
              </div>
            ) : (
              <div className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-800 border border-amber-300 px-3 py-1 rounded-full font-mono text-xs font-bold uppercase tracking-wider mt-2">
                <AlertTriangle size={13} className="text-amber-700" aria-hidden="true" />
                <span>Pending Clearance Settlement</span>
              </div>
            )}
          </div>

          <div className="text-left sm:text-right font-mono space-y-1 bg-slate-50 p-4 rounded-md border border-blue-900/10 w-full sm:w-auto">
            <span className="text-[10px] uppercase text-blue-900/60 block font-semibold">Official Receipt No.</span>
            <span className="font-mono text-lg font-bold text-red-600 block">
              {currentPayment.receipt_number || 'PENDING ASSIGNMENT'}
            </span>
            <span className="text-[10px] uppercase text-blue-900/60 block pt-1 font-semibold">Date Certified</span>
            <span className="text-xs text-blue-900 font-semibold block">
              {currentPayment.paid_at 
                ? new Date(currentPayment.paid_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
                : 'Processing...'}
            </span>
          </div>
        </div>

        {/* Student Credential Matrix */}
        <div className="py-8 grid grid-cols-1 sm:grid-cols-2 gap-6 border-b border-blue-900/10">
          <div className="space-y-1">
            <span className="font-mono text-[10px] uppercase tracking-wider text-blue-900/60 font-semibold block">Student Particulars</span>
            <p className="font-serif text-lg font-bold text-blue-900">{student?.full_name}</p>
            <p className="font-mono text-xs text-red-600 font-semibold">{student?.mat_no}</p>
            <p className="font-sans text-xs text-blue-900/70">{student?.phone || 'Phone not registered'}</p>
          </div>
          <div className="space-y-1">
            <span className="font-mono text-[10px] uppercase tracking-wider text-blue-900/60 font-semibold block">Academic Cadre</span>
            <p className="font-sans text-sm font-bold text-blue-900">Electrical &amp; Electronic Engineering</p>
            <p className="font-mono text-xs text-blue-900/75">{student?.level} Level &bull; Undergraduate</p>
            <p className="font-sans text-xs text-blue-900/60">Department of Electrical &amp; Electronic Engineering, Choba Campus</p>
          </div>
        </div>

        {/* Financial Schedule Table */}
        <div className="py-8">
          <div className="border border-blue-900/20 rounded-md overflow-hidden">
            <table className="w-full text-left text-xs font-sans">
              <thead className="bg-blue-900 text-white font-mono uppercase">
                <tr>
                  <th scope="col" className="px-5 py-3.5">Fee Assessment</th>
                  <th scope="col" className="px-5 py-3.5 text-center">Academic Term</th>
                  <th scope="col" className="px-5 py-3.5 text-right">Amount Paid</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-blue-900/10 bg-white">
                <tr>
                  <td className="px-5 py-4">
                    <span className="font-bold text-blue-900 block text-sm">Annual SEEES Departmental Dues</span>
                    <span className="font-mono text-[11px] text-blue-900/60">Statutory SEEES Chapter Dues &amp; Lab Levy</span>
                  </td>
                  <td className="px-5 py-4 font-mono text-blue-900/80 text-center">
                    {currentPayment.session} Session
                  </td>
                  <td className="px-5 py-4 text-right font-mono font-bold text-blue-900">
                    ₦{Number(currentPayment.amount).toLocaleString()}
                  </td>
                </tr>
              </tbody>
              <tfoot className="bg-slate-50 border-t-2 border-blue-900/20">
                <tr>
                  <th scope="row" colSpan={2} className="px-5 py-4 uppercase font-mono font-bold text-blue-900 text-right">
                    Total Certified:
                  </th>
                  <td className="px-5 py-4 text-right font-serif text-2xl font-bold text-red-600">
                    ₦{Number(currentPayment.amount).toLocaleString()}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Verification QR Seal & Audit Trail */}
        <div className="pt-6 border-t-2 border-blue-900/10 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6">
          <div className="space-y-2 text-left">
            <span className="font-mono text-[10px] uppercase text-blue-900/60 font-semibold block">Payment Audit Trail</span>
            <div className="bg-slate-100 border border-blue-900/10 p-2.5 rounded-sm font-mono text-[10px] text-blue-900 font-medium max-w-sm break-all">
              {currentPayment.paystack_reference}
            </div>
            <p className="font-sans text-[11px] text-blue-900/65 max-w-sm pt-1">
              Valid for departmental course registration, HOD clearance sign-off, and laboratory access.
            </p>
          </div>

          {currentPayment.status === 'success' && (
            <div className="flex flex-col items-center text-center self-center sm:self-end">
              <div className="p-2 border-2 border-blue-900/20 bg-white rounded-md shadow-xs">
                <QRCodeSVG value={verificationUrl} size={96} fgColor="#1E3A8A" />
              </div>
              <span className="font-mono text-[10px] uppercase font-bold text-blue-900/70 tracking-wider mt-1.5">
                Scan to Authenticate
              </span>
            </div>
          )}
        </div>

        {/* Signatures & Seal Block */}
        <div className="pt-10 mt-6 border-t border-dashed border-blue-900/20 grid grid-cols-2 gap-8 text-center text-xs font-sans text-blue-900/70">
          <div>
            <div className="border-b border-blue-900/30 w-36 mx-auto mb-1 h-8" />
            <span className="font-mono text-[10px] uppercase tracking-wider block font-semibold">Financial Secretary</span>
            <span className="text-[10px] text-blue-900/60">SEEES UniPort Chapter</span>
          </div>
          <div>
            <div className="border-b border-blue-900/30 w-36 mx-auto mb-1 h-8" />
            <span className="font-mono text-[10px] uppercase tracking-wider block font-semibold">Staff Advisor</span>
            <span className="text-[10px] text-blue-900/60">Department of Electrical &amp; Electronic Engineering</span>
          </div>
        </div>

      </article>

    </div>
  )
}
