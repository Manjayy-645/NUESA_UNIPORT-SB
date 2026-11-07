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
  title: 'Official Dues Receipt | Electrical & Electronics Engineering UniPort',
  description: 'Cryptographically certified departmental dues receipt and financial clearance voucher for Electrical & Electronics Engineering students.',
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
      <div className="max-w-xl mx-auto my-16 p-8 text-center bg-white border border-red-200 rounded-2xl shadow-card">
        <p className="text-red-600 font-extrabold text-lg mb-2">Receipt Not Found</p>
        <p className="text-slate-600 text-sm mb-4">No payment record exists matching this reference.</p>
        <Link href="/portal/dues" className="text-xs text-blue-600 font-bold underline">
          Return to Dues Portal
        </Link>
      </div>
    )
  }
  
  if (payment.student_id !== user.id) {
    return (
      <div className="max-w-xl mx-auto my-16 p-8 text-center bg-white border border-red-200 rounded-2xl shadow-card">
        <p className="text-red-600 font-extrabold text-lg">Unauthorized Access</p>
        <p className="text-slate-600 text-sm mt-2">You do not have permission to view this receipt.</p>
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
        const receiptNumber = `EEE/${year}/${randomSeq}`
        
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
          className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-slate-500 hover:text-blue-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-md p-1 font-bold"
        >
          <ArrowLeft size={14} aria-hidden="true" />
          <span>Back to Dashboard</span>
        </Link>

        <PrintReceiptButton />
      </div>

      {/* Official Voucher Printable Body */}
      <article 
        role="region" 
        aria-label="Official Clearance Receipt"
        className="bg-white p-8 sm:p-12 border border-slate-200 rounded-2xl relative overflow-hidden print:p-0 print:border-none print:shadow-none shadow-card"
      >
        
        {/* Security Watermark Accent in Institutional Deep Navy, Electric Blue & Amber */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#0A192F] via-blue-600 to-amber-500" aria-hidden="true" />
        
        {/* Institutional Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start gap-6 pb-8 border-b border-slate-200">
          <div className="space-y-2">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600 inline-block" />
              <span className="font-mono text-xs uppercase tracking-widest text-blue-600 font-bold">
                Official Departmental Clearance Voucher
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#0A192F] tracking-tight leading-none">
              Electrical &amp; Electronics Engineering
            </h1>
            <p className="font-sans text-xs text-slate-600 max-w-sm leading-relaxed font-medium">
              Faculty of Engineering &bull; University of Port Harcourt<br />
              Choba Park, PMB 5323, Rivers State, Nigeria
            </p>
            {currentPayment.status === 'success' ? (
              <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-800 border border-emerald-300 px-3 py-1 rounded-full font-mono text-xs font-bold uppercase tracking-wider mt-2">
                <CheckCircle2 size={13} className="text-emerald-700" aria-hidden="true" />
                <span>Certified Official Receipt</span>
              </div>
            ) : (
              <div className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-800 border border-amber-300 px-3 py-1 rounded-full font-mono text-xs font-bold uppercase tracking-wider mt-2">
                <AlertTriangle size={13} className="text-amber-700" aria-hidden="true" />
                <span>Pending Clearance Settlement</span>
              </div>
            )}
          </div>

          <div className="text-left sm:text-right font-mono space-y-1 bg-slate-50 p-4 rounded-xl border border-slate-200 w-full sm:w-auto">
            <span className="text-[10px] uppercase text-slate-500 block font-bold">Official Receipt No.</span>
            <span className="font-mono text-lg font-black text-blue-600 block">
              {currentPayment.receipt_number || 'PENDING ASSIGNMENT'}
            </span>
            <span className="text-[10px] uppercase text-slate-500 block pt-1 font-bold">Date Certified</span>
            <span className="text-xs text-[#0A192F] font-bold block">
              {currentPayment.paid_at 
                ? new Date(currentPayment.paid_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
                : 'Processing...'}
            </span>
          </div>
        </div>

        {/* Student Credential Matrix */}
        <div className="py-8 grid grid-cols-1 sm:grid-cols-2 gap-6 border-b border-slate-200">
          <div className="space-y-1">
            <span className="font-mono text-[10px] uppercase tracking-wider text-slate-500 font-bold block">Student Particulars</span>
            <p className="text-base font-extrabold text-[#0A192F]">{student?.full_name}</p>
            <p className="font-mono text-xs text-blue-600 font-bold">{student?.mat_no}</p>
            <p className="font-sans text-xs text-slate-500">{student?.phone || 'Phone not registered'}</p>
          </div>
          <div className="space-y-1">
            <span className="font-mono text-[10px] uppercase tracking-wider text-slate-500 font-bold block">Academic Cadre</span>
            <p className="font-sans text-sm font-bold text-[#0A192F]">Electrical &amp; Electronics Engineering</p>
            <p className="font-mono text-xs text-slate-600 font-medium">{student?.level} Level &bull; Undergraduate</p>
            <p className="font-sans text-xs text-slate-500">Department of Electrical &amp; Electronics Engineering, Choba Campus</p>
          </div>
        </div>

        {/* Financial Schedule Table */}
        <div className="py-8">
          <div className="border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
            <table className="w-full text-left text-xs font-sans">
              <thead className="bg-[#0A192F] text-white font-mono uppercase">
                <tr>
                  <th scope="col" className="px-5 py-3.5 font-bold">Fee Assessment</th>
                  <th scope="col" className="px-5 py-3.5 text-center font-bold">Academic Term</th>
                  <th scope="col" className="px-5 py-3.5 text-right font-bold">Amount Paid</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                <tr>
                  <td className="px-5 py-4">
                    <span className="font-bold text-[#0A192F] block text-sm">Annual Departmental Dues</span>
                    <span className="font-mono text-[11px] text-slate-500">Statutory Departmental Clearance &amp; Lab Development Levy</span>
                  </td>
                  <td className="px-5 py-4 font-mono text-slate-700 text-center font-bold">
                    {currentPayment.session} Session
                  </td>
                  <td className="px-5 py-4 text-right font-mono font-bold text-[#0A192F]">
                    ₦{Number(currentPayment.amount).toLocaleString()}
                  </td>
                </tr>
              </tbody>
              <tfoot className="bg-slate-50 border-t border-slate-200">
                <tr>
                  <th scope="row" colSpan={2} className="px-5 py-4 uppercase font-mono font-black text-[#0A192F] text-right">
                    Total Certified:
                  </th>
                  <td className="px-5 py-4 text-right text-2xl font-black text-blue-600 font-mono">
                    ₦{Number(currentPayment.amount).toLocaleString()}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Verification QR Seal & Audit Trail */}
        <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6">
          <div className="space-y-2 text-left">
            <span className="font-mono text-[10px] uppercase text-slate-500 font-bold block">Payment Audit Trail</span>
            <div className="bg-slate-100 border border-slate-200 p-2.5 rounded-lg font-mono text-[10px] text-slate-700 font-medium max-w-sm break-all">
              {currentPayment.paystack_reference}
            </div>
            <p className="font-sans text-[11px] text-slate-500 max-w-sm pt-1">
              Valid for departmental course registration, HOD clearance sign-off, and laboratory access.
            </p>
          </div>

          {currentPayment.status === 'success' && (
            <div className="flex flex-col items-center text-center self-center sm:self-end">
              <div className="p-2 border border-slate-200 bg-white rounded-xl shadow-xs">
                <QRCodeSVG value={verificationUrl} size={96} fgColor="#0A192F" />
              </div>
              <span className="font-mono text-[10px] uppercase font-bold text-slate-500 tracking-wider mt-1.5">
                Scan to Authenticate
              </span>
            </div>
          )}
        </div>

        {/* Signatures & Seal Block */}
        <div className="pt-10 mt-6 border-t border-dashed border-slate-200 grid grid-cols-2 gap-8 text-center text-xs font-sans text-slate-600">
          <div>
            <div className="border-b border-slate-300 w-36 mx-auto mb-1.5 h-8" />
            <span className="font-mono text-[10px] uppercase tracking-wider block font-bold text-[#0A192F]">Financial Secretary</span>
            <span className="text-[10px] text-slate-500 font-medium">Departmental Student Council</span>
          </div>
          <div>
            <div className="border-b border-slate-300 w-36 mx-auto mb-1.5 h-8" />
            <span className="font-mono text-[10px] uppercase tracking-wider block font-bold text-[#0A192F]">Staff Advisor</span>
            <span className="text-[10px] text-slate-500 font-medium">Department of Electrical &amp; Electronics Engineering</span>
          </div>
        </div>

      </article>

    </div>
  )
}
