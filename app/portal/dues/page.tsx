import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { CheckoutButton } from '@/components/CheckoutButton'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { CheckCircle2, ShieldCheck, ArrowLeft, Receipt, Lock } from 'lucide-react'

export const metadata = {
  title: 'Pay SEEES Departmental Dues | SEEES UniPort Portal',
  description: 'Official checkout and payment gateway for SEEES Departmental dues, Department of Electrical & Electronic Engineering.',
}

export default async function DuesPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) redirect('/login')
  
  const { data: student } = await supabase
    .from('students')
    .select('*')
    .eq('id', user.id)
    .single()
    
  if (!student) redirect('/signup')
  
  const ACTIVE_SESSION = '2025/2026'
  const SEMESTER = 'First'
  const DUES_AMOUNT = 5000 // 5000 Naira
  
  // Check if already paid
  const { data: existingPayment } = await supabase
    .from('payments')
    .select('*')
    .eq('student_id', user.id)
    .eq('session', ACTIVE_SESSION)
    .eq('status', 'success')
    .maybeSingle()
    
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
      
      {/* Return to Dashboard */}
      <div>
        <Link 
          href="/portal" 
          className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-primary/60 hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-xs p-1"
        >
          <ArrowLeft size={14} aria-hidden="true" />
          <span>Back to Dashboard</span>
        </Link>
      </div>

      <div className="pb-4 border-b border-primary/10">
        <span className="font-mono text-xs uppercase tracking-widest text-primary/60 font-semibold block mb-1">
          Fee Assessment & Clearance
        </span>
        <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-primary tracking-tight">
          SEEES Departmental Dues Checkout
        </h1>
        <p className="font-sans text-xs sm:text-sm text-primary/70 mt-1">
          Authorized dues payment terminal for the Society of Electrical and Electronic Engineering Students (SEEES).
        </p>
      </div>

      <Card variant="default" className="p-6 sm:p-8 space-y-8">
        
        {/* Student Credential Ledger */}
        <div>
          <h2 className="font-serif text-base font-semibold text-primary mb-3">
            Billed Student Particulars
          </h2>
          <div className="bg-primary/[0.02] border border-primary/15 rounded-xs p-5">
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-wider text-primary/50">Full Student Name</dt>
                <dd className="font-bold text-sm text-primary mt-0.5">{student.full_name}</dd>
              </div>
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-wider text-primary/50">Matriculation Number</dt>
                <dd className="font-mono font-bold text-sm text-primary mt-0.5">{student.mat_no}</dd>
              </div>
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-wider text-primary/50">Department & Level</dt>
                <dd className="font-medium text-primary mt-0.5">{student.department} Engineering &bull; {student.level}L</dd>
              </div>
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-wider text-primary/50">Academic Session / Semester</dt>
                <dd className="font-medium text-primary mt-0.5">{ACTIVE_SESSION} &bull; {SEMESTER} Semester</dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Invoice Itemization */}
        <div>
          <h2 className="font-serif text-base font-semibold text-primary mb-3">
            Assessment Breakdown
          </h2>
          <div className="border border-primary/15 rounded-xs overflow-hidden">
            <table className="w-full text-left text-xs font-sans">
              <thead className="bg-primary/5 border-b border-primary/10 font-mono uppercase text-primary/60">
                <tr>
                  <th scope="col" className="px-4 py-3">Description</th>
                  <th scope="col" className="px-4 py-3">Term</th>
                  <th scope="col" className="px-4 py-3 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-primary/10">
                <tr>
                  <td className="px-4 py-3.5 font-medium text-primary">
                    Annual SEEES Departmental Dues &amp; Laboratory Development Levy
                  </td>
                  <td className="px-4 py-3.5 text-primary/70">{ACTIVE_SESSION}</td>
                  <td className="px-4 py-3.5 text-right font-mono font-bold text-primary">₦5,000.00</td>
                </tr>
              </tbody>
              <tfoot className="bg-primary/[0.03] border-t border-primary/15">
                <tr>
                  <th scope="row" colSpan={2} className="px-4 py-3.5 font-bold uppercase font-mono text-primary">Total Payable:</th>
                  <td className="px-4 py-3.5 text-right font-serif text-xl sm:text-2xl font-bold text-primary">₦5,000.00</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Payment Action or Confirmation Stamp */}
        {existingPayment ? (
          <div className="bg-emerald-50 border border-emerald-600/30 p-6 rounded-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <CheckCircle2 size={24} className="text-emerald-700 shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <h3 className="font-serif text-base font-bold text-emerald-900">Payment Already Confirmed</h3>
                <p className="font-sans text-xs text-emerald-800/80 mt-0.5">
                  Your dues for {ACTIVE_SESSION} have been cleared. Receipt reference: <code className="font-mono font-bold">{existingPayment.paystack_reference}</code>.
                </p>
              </div>
            </div>
            <Link href={`/portal/receipts/${existingPayment.paystack_reference}`}>
              <Button variant="secondary" size="sm" className="!border-emerald-600/40 !text-emerald-800 hover:!bg-emerald-100 gap-1.5 shrink-0">
                <Receipt size={14} aria-hidden="true" />
                <span>View Receipt</span>
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4 pt-2">
            <div className="flex flex-col items-center">
              <CheckoutButton 
                studentId={user.id} 
                email={user.email || ''} 
                amount={DUES_AMOUNT}
                session={ACTIVE_SESSION}
                semester={SEMESTER}
              />
            </div>
            <div className="flex items-center justify-center gap-2 text-xs font-mono text-primary/50">
              <Lock size={12} aria-hidden="true" />
              <span>256-bit TLS Encrypted Transaction &bull; Paystack Certified PCI-DSS</span>
            </div>
          </div>
        )}

      </Card>

    </div>
  )
}
