import { createAdminClient } from '@/lib/supabase/admin'
import { ShieldCheck, AlertTriangle, XCircle, CheckCircle2, Building, Calendar, Hash } from 'lucide-react'
import Link from 'next/link'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'

export const metadata = {
  title: 'Receipt Verification | Electrical & Electronics Engineering UniPort',
  description: 'Cryptographic public validation record for Departmental Dues payment receipts, Department of Electrical & Electronics Engineering, University of Port Harcourt.',
}

export default async function VerifyReceiptPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = createAdminClient()
  
  const { data: payment } = await supabase
    .from('payments')
    .select('*, students(full_name, mat_no, department, level)')
    .eq('paystack_reference', id)
    .single()
    
  if (!payment) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-slate-50 px-4 py-16">
        <div className="bg-white p-8 sm:p-10 rounded-2xl border border-red-200 shadow-card max-w-md w-full text-center space-y-5">
          <div className="w-14 h-14 bg-red-50 text-red-600 rounded-xl border border-red-200 flex items-center justify-center mx-auto shadow-2xs">
            <XCircle size={30} aria-hidden="true" />
          </div>
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-red-600 font-bold block mb-1">
              Registry Lookup Failed
            </span>
            <h1 className="text-2xl font-extrabold text-[#0A192F]">Unrecognized Transaction</h1>
            <p className="font-sans text-xs text-slate-600 mt-2 leading-relaxed">
              The reference code <code className="font-mono text-red-700 bg-red-50 px-1.5 py-0.5 rounded-md font-bold">{id}</code> could not be matched with any authentic departmental clearance record.
            </p>
          </div>
          <div className="pt-2">
            <Link href="/">
              <Button variant="secondary" size="sm" fullWidth className="font-bold">Return to Home</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }
  
  if (payment.status !== 'success') {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-slate-50 px-4 py-16">
        <div className="bg-white p-8 sm:p-10 rounded-2xl border border-amber-200 shadow-card max-w-md w-full text-center space-y-5">
          <div className="w-14 h-14 bg-amber-50 text-amber-700 rounded-xl border border-amber-200 flex items-center justify-center mx-auto shadow-2xs">
            <AlertTriangle size={30} aria-hidden="true" />
          </div>
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-amber-700 font-bold block mb-1">
              Awaiting Gateway Settlement
            </span>
            <h1 className="text-2xl font-extrabold text-[#0A192F]">Payment Pending</h1>
            <p className="font-sans text-xs text-slate-600 mt-2 leading-relaxed">
              This transaction is currently awaiting confirmation from Paystack. If funds were debited, this receipt will activate automatically upon gateway reconciliation.
            </p>
          </div>
          <div className="pt-2">
            <Link href="/portal">
              <Button variant="secondary" size="sm" fullWidth className="font-bold">Check Student Portal</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const student = payment.students

  return (
    <div className="min-h-[85vh] flex items-center justify-center bg-slate-50 px-4 py-16">
      <article 
        role="region" 
        aria-label="Official Verification Certificate"
        className="bg-white p-8 sm:p-12 rounded-2xl border border-slate-200/90 shadow-card max-w-lg w-full relative overflow-hidden"
      >
        {/* Institutional Verification Header Accent */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-emerald-600 via-blue-600 to-emerald-600" aria-hidden="true" />
        
        {/* Verification Emblem */}
        <div className="text-center pb-6 border-b border-slate-200 space-y-3">
          <div className="w-16 h-16 bg-emerald-50 text-emerald-700 rounded-2xl border border-emerald-300 flex items-center justify-center mx-auto shadow-xs">
            <ShieldCheck size={36} aria-hidden="true" />
          </div>
          <div>
            <Badge variant="success" className="font-mono text-xs uppercase tracking-wider mb-2 font-bold">
              Valid Institutional Record
            </Badge>
            <h1 className="text-2xl font-extrabold text-[#0A192F] tracking-tight">
              Departmental Dues Verified
            </h1>
            <p className="font-sans text-xs text-slate-500 mt-1">
              Department of Electrical &amp; Electronics Engineering &bull; UniPort Registry
            </p>
          </div>
        </div>
        
        {/* Structured Metadata Ledger */}
        <div className="py-6 space-y-4">
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-left">
            
            <div className="border border-slate-200 p-3 rounded-lg bg-slate-50">
              <dt className="font-mono text-[10px] uppercase tracking-wider text-slate-500 font-bold">Student Name</dt>
              <dd className="font-sans text-sm font-bold text-[#0A192F] mt-0.5">{student.full_name}</dd>
            </div>

            <div className="border border-slate-200 p-3 rounded-lg bg-slate-50">
              <dt className="font-mono text-[10px] uppercase tracking-wider text-slate-500 font-bold">Matriculation No.</dt>
              <dd className="font-mono text-sm font-bold text-[#0A192F] mt-0.5">{student.mat_no}</dd>
            </div>

            <div className="border border-slate-200 p-3 rounded-lg bg-slate-50">
              <dt className="font-mono text-[10px] uppercase tracking-wider text-slate-500 font-bold">Department &amp; Level</dt>
              <dd className="font-sans text-xs font-bold text-[#0A192F] mt-0.5">{student.department} Eng. ({student.level}L)</dd>
            </div>

            <div className="border border-slate-200 p-3 rounded-lg bg-slate-50">
              <dt className="font-mono text-[10px] uppercase tracking-wider text-slate-500 font-bold">Academic Session</dt>
              <dd className="font-sans text-xs font-bold text-[#0A192F] mt-0.5">{payment.session} Session</dd>
            </div>

            <div className="border border-slate-200 p-3 rounded-lg bg-slate-50">
              <dt className="font-mono text-[10px] uppercase tracking-wider text-slate-500 font-bold">Receipt Number</dt>
              <dd className="font-mono text-xs font-bold text-blue-600 mt-0.5">{payment.receipt_number}</dd>
            </div>

            <div className="border border-slate-200 p-3 rounded-lg bg-slate-50">
              <dt className="font-mono text-[10px] uppercase tracking-wider text-slate-500 font-bold">Amount Confirmed</dt>
              <dd className="font-sans text-xs font-bold text-emerald-700 mt-0.5">₦{Number(payment.amount).toLocaleString()}</dd>
            </div>

          </dl>

          <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200 text-xs font-mono text-slate-600 flex items-center justify-between">
            <span className="font-bold">Date Certified:</span>
            <span className="font-bold text-[#0A192F]">
              {payment.paid_at ? new Date(payment.paid_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Verified'}
            </span>
          </div>
        </div>

        {/* Security Colophon */}
        <div className="pt-4 border-t border-slate-200 text-center space-y-2">
          <p className="font-mono text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
            Transaction Ref: {payment.paystack_reference}
          </p>
          <p className="font-sans text-xs text-slate-500">
            This digital certificate confirms full dues clearance for course registration and laboratory access.
          </p>
        </div>

      </article>
    </div>
  )
}
