import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { CheckoutButton } from '@/components/CheckoutButton'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { CheckCircle2, ShieldCheck, ArrowLeft, Receipt, Lock } from 'lucide-react'

export const metadata = {
  title: 'Pay Departmental Dues | Electrical & Electronics Engineering UniPort',
  description: 'Official checkout and payment gateway for Departmental Dues, Department of Electrical & Electronics Engineering, University of Port Harcourt.',
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
          className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-slate-500 hover:text-blue-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-md p-1 font-bold"
        >
          <ArrowLeft size={14} aria-hidden="true" />
          <span>Back to Dashboard</span>
        </Link>
      </div>

      <div className="pb-4 border-b border-slate-200">
        <span className="font-mono text-xs uppercase tracking-widest text-blue-600 font-bold block mb-1">
          Fee Assessment &amp; Clearance
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0A192F] tracking-tight">
          Departmental Dues Checkout
        </h1>
        <p className="font-sans text-xs sm:text-sm text-slate-500 mt-1">
          Official statutory dues terminal for the Department of Electrical &amp; Electronics Engineering.
        </p>
      </div>

      <Card variant="default" className="p-6 sm:p-8 space-y-8 shadow-card">
        
        {/* Student Credential Ledger */}
        <div>
          <h2 className="text-base font-bold text-[#0A192F] mb-3">
            Billed Student Particulars
          </h2>
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-wider text-slate-500 font-semibold">Full Student Name</dt>
                <dd className="font-bold text-sm text-[#0A192F] mt-0.5">{student.full_name}</dd>
              </div>
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-wider text-slate-500 font-semibold">Matriculation Number</dt>
                <dd className="font-mono font-bold text-sm text-blue-600 mt-0.5">{student.mat_no}</dd>
              </div>
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-wider text-slate-500 font-semibold">Department &amp; Level</dt>
                <dd className="font-bold text-[#0A192F] mt-0.5">{student.department} Engineering &bull; {student.level}L</dd>
              </div>
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-wider text-slate-500 font-semibold">Academic Session / Semester</dt>
                <dd className="font-bold text-[#0A192F] mt-0.5">{ACTIVE_SESSION} &bull; {SEMESTER} Semester</dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Invoice Itemization */}
        <div>
          <h2 className="text-base font-bold text-[#0A192F] mb-3">
            Assessment Breakdown
          </h2>
          <div className="border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
            <table className="w-full text-left text-xs font-sans">
              <thead className="bg-[#0A192F] text-white font-mono uppercase">
                <tr>
                  <th scope="col" className="px-4 py-3 font-bold">Description</th>
                  <th scope="col" className="px-4 py-3 font-bold">Term</th>
                  <th scope="col" className="px-4 py-3 text-right font-bold">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                <tr>
                  <td className="px-4 py-3.5 font-bold text-[#0A192F]">
                    Annual Departmental Dues &amp; Laboratory Development Levy
                  </td>
                  <td className="px-4 py-3.5 text-slate-600 font-medium">{ACTIVE_SESSION}</td>
                  <td className="px-4 py-3.5 text-right font-mono font-bold text-[#0A192F]">₦5,000.00</td>
                </tr>
              </tbody>
              <tfoot className="bg-slate-50 border-t border-slate-200">
                <tr>
                  <th scope="row" colSpan={2} className="px-4 py-3.5 font-extrabold uppercase font-mono text-[#0A192F]">Total Payable:</th>
                  <td className="px-4 py-3.5 text-right text-xl sm:text-2xl font-black text-blue-600">₦5,000.00</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Payment Action or Confirmation Stamp */}
        {existingPayment ? (
          <div className="bg-emerald-50 border border-emerald-300 p-6 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <CheckCircle2 size={24} className="text-emerald-700 shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <h3 className="text-base font-bold text-emerald-900">Payment Already Confirmed</h3>
                <p className="font-sans text-xs text-emerald-800 mt-0.5">
                  Your dues for {ACTIVE_SESSION} have been cleared. Receipt reference: <code className="font-mono font-bold">{existingPayment.paystack_reference}</code>.
                </p>
              </div>
            </div>
            <Link href={`/portal/receipts/${existingPayment.paystack_reference}`}>
              <Button variant="secondary" size="sm" className="!border-emerald-400 !text-emerald-800 hover:!bg-emerald-100 gap-1.5 shrink-0 font-bold">
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
            <div className="flex items-center justify-center gap-2 text-xs font-mono text-slate-500 font-medium">
              <Lock size={13} className="text-slate-400" aria-hidden="true" />
              <span>256-bit TLS Encrypted Transaction &bull; Paystack Certified PCI-DSS</span>
            </div>
          </div>
        )}

      </Card>

    </div>
  )
}
