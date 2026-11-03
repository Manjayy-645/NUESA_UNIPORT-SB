import { createAdminClient } from '@/lib/supabase/admin'
import { ShieldCheck, AlertTriangle, XCircle, CheckCircle2, Building, Calendar, Hash } from 'lucide-react'
import Link from 'next/link'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'

export const metadata = {
  title: 'Receipt Verification | SEEES UniPort Official Registry',
  description: 'Cryptographic public validation record for SEEES Departmental Dues payment receipts, Department of Electrical & Electronic Engineering, UniPort.',
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
      <div className="min-h-[80vh] flex items-center justify-center bg-background px-4 py-16">
        <div className="bg-white p-8 sm:p-10 rounded-xs border border-red-300 max-w-md w-full text-center space-y-5">
          <div className="w-12 h-12 bg-red-50 text-red-600 rounded-2xs border border-red-200 flex items-center justify-center mx-auto">
            <XCircle size={26} aria-hidden="true" />
          </div>
          <div>
            <span className="font-mono text-[10px] uppercase tracking-widest text-red-600 font-bold block mb-1">
              Registry Lookup Failed
            </span>
            <h1 className="font-serif text-2xl font-bold text-primary">Unrecognized Transaction</h1>
            <p className="font-sans text-xs text-primary/70 mt-2 leading-relaxed">
              The reference code <code className="font-mono text-red-700 bg-red-50 px-1 py-0.5 rounded-2xs">{id}</code> could not be matched with any authentic SEEES clearance record.
            </p>
          </div>
          <div className="pt-2">
            <Link href="/">
              <Button variant="secondary" size="sm" fullWidth>Return to Home</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }
  
  if (payment.status !== 'success') {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-background px-4 py-16">
        <div className="bg-white p-8 sm:p-10 rounded-xs border border-amber-300 max-w-md w-full text-center space-y-5">
          <div className="w-12 h-12 bg-amber-50 text-amber-700 rounded-2xs border border-amber-200 flex items-center justify-center mx-auto">
            <AlertTriangle size={26} aria-hidden="true" />
          </div>
          <div>
            <span className="font-mono text-[10px] uppercase tracking-widest text-amber-700 font-bold block mb-1">
              Awaiting Gateway Settlement
            </span>
            <h1 className="font-serif text-2xl font-bold text-primary">Payment Pending</h1>
            <p className="font-sans text-xs text-primary/70 mt-2 leading-relaxed">
              This transaction is currently awaiting confirmation from Paystack. If funds were debited, this receipt will activate automatically upon gateway reconciliation.
            </p>
          </div>
          <div className="pt-2">
            <Link href="/portal">
              <Button variant="secondary" size="sm" fullWidth>Check Student Portal</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const student = payment.students

  return (
    <div className="min-h-[85vh] flex items-center justify-center bg-background px-4 py-16">
      <article 
        role="region" 
        aria-label="Official Verification Certificate"
        className="bg-white p-8 sm:p-12 rounded-xs border border-primary/20 max-w-lg w-full relative overflow-hidden"
      >
        {/* Institutional Verification Header Accent */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-emerald-700" aria-hidden="true" />
        
        {/* Verification Emblem */}
        <div className="text-center pb-6 border-b border-primary/10 space-y-3">
          <div className="w-14 h-14 bg-emerald-50 text-emerald-700 rounded-xs border border-emerald-600/30 flex items-center justify-center mx-auto shadow-xs">
            <ShieldCheck size={32} aria-hidden="true" />
          </div>
          <div>
            <Badge variant="success" className="font-mono text-xs uppercase tracking-wider mb-2">
              Valid Institutional Record
            </Badge>
            <h1 className="font-serif text-2xl font-bold text-primary tracking-tight">
              SEEES Departmental Dues Verified
            </h1>
            <p className="font-sans text-xs text-primary/60 mt-1">
              Official Registry of the Department of Electrical &amp; Electronic Engineering, UniPort
            </p>
          </div>
        </div>
        
        {/* Structured Metadata Ledger */}
        <div className="py-6 space-y-4">
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
            
            <div className="border border-primary/10 p-3 rounded-2xs bg-primary/[0.02]">
              <dt className="font-mono text-[10px] uppercase tracking-wider text-primary/50">Student Name</dt>
              <dd className="font-sans text-sm font-bold text-primary mt-0.5">{student.full_name}</dd>
            </div>

            <div className="border border-primary/10 p-3 rounded-2xs bg-primary/[0.02]">
              <dt className="font-mono text-[10px] uppercase tracking-wider text-primary/50">Matriculation No.</dt>
              <dd className="font-mono text-sm font-bold text-primary mt-0.5">{student.mat_no}</dd>
            </div>

            <div className="border border-primary/10 p-3 rounded-2xs bg-primary/[0.02]">
              <dt className="font-mono text-[10px] uppercase tracking-wider text-primary/50">Department & Level</dt>
              <dd className="font-sans text-xs font-semibold text-primary mt-0.5">{student.department} Eng. ({student.level}L)</dd>
            </div>

            <div className="border border-primary/10 p-3 rounded-2xs bg-primary/[0.02]">
              <dt className="font-mono text-[10px] uppercase tracking-wider text-primary/50">Academic Session</dt>
              <dd className="font-sans text-xs font-semibold text-primary mt-0.5">{payment.session} Session</dd>
            </div>

            <div className="border border-primary/10 p-3 rounded-2xs bg-primary/[0.02]">
              <dt className="font-mono text-[10px] uppercase tracking-wider text-primary/50">Receipt Number</dt>
              <dd className="font-mono text-xs font-bold text-accent mt-0.5">{payment.receipt_number}</dd>
            </div>

            <div className="border border-primary/10 p-3 rounded-2xs bg-primary/[0.02]">
              <dt className="font-mono text-[10px] uppercase tracking-wider text-primary/50">Amount Confirmed</dt>
              <dd className="font-sans text-xs font-bold text-emerald-800 mt-0.5">₦{Number(payment.amount).toLocaleString()}</dd>
            </div>

          </dl>

          <div className="bg-primary/5 p-3 rounded-2xs border border-primary/10 text-xs font-mono text-primary/70 flex items-center justify-between">
            <span>Date Certified:</span>
            <span className="font-semibold text-primary">
              {payment.paid_at ? new Date(payment.paid_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Verified'}
            </span>
          </div>
        </div>

        {/* Security Colophon */}
        <div className="pt-4 border-t border-primary/10 text-center space-y-2">
          <p className="font-mono text-[10px] text-primary/45 uppercase tracking-wider">
            Transaction Ref: {payment.paystack_reference}
          </p>
          <p className="font-sans text-[11px] text-primary/55">
            This digital certificate confirms full dues clearance for the specified academic session.
          </p>
        </div>

      </article>
    </div>
  )
}
