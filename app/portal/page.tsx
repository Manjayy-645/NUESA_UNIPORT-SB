import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { 
  FileText, 
  CreditCard, 
  UserCircle, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle,
  Download,
  Calendar,
  ShieldCheck,
  Receipt
} from 'lucide-react'

export const metadata = {
  title: 'Student Dashboard | EEE Department Portal',
  description: 'Manage departmental dues, view certified clearance receipts, and access official academic schedules for Electrical & Electronics Engineering.',
}

export default async function StudentDashboard() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) redirect('/login')

  // 1. Fetch Student Profile
  const { data: student } = await supabase
    .from('students')
    .select('*')
    .eq('id', user.id)
    .single()

  if (!student) redirect('/signup')

  // 2. Fetch Recent Payments
  const { data: payments } = await supabase
    .from('payments')
    .select('*')
    .eq('student_id', user.id)
    .order('created_at', { ascending: false })
    .limit(5)

  // 3. Fetch Latest Active Documents
  const { data: documents } = await supabase
    .from('documents')
    .select('*')
    .eq('is_active', true)
    .order('published_at', { ascending: false })
    .limit(4)

  const duesPaidThisSession = payments?.some(p => p.session === '2025/2026' && p.status === 'success')

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Editorial Dashboard Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-2 mb-1.5 px-3 py-1 bg-blue-50 border border-blue-200 rounded-full text-xs font-bold text-blue-700">
            <span className="w-2 h-2 rounded-full bg-blue-600" aria-hidden="true" />
            <span className="font-mono uppercase tracking-wider">
              Academic Clearance Terminal
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0A192F] tracking-tight">
            Welcome back, {student.full_name.split(' ')[0]}
          </h1>
          <p className="font-sans text-xs sm:text-sm text-slate-500 mt-1 font-medium">
            Department of Electrical &amp; Electronics Engineering &bull; 2025/2026 Academic Session
          </p>
        </div>

        <div className="flex items-center gap-2">
          {duesPaidThisSession ? (
            <Badge variant="success" className="px-3.5 py-1.5 font-mono text-xs font-bold gap-1.5 shadow-2xs">
              <CheckCircle2 size={14} aria-hidden="true" />
              <span>Dues Cleared (2025/2026)</span>
            </Badge>
          ) : (
            <Badge variant="gold" className="px-3.5 py-1.5 font-mono text-xs font-bold gap-1.5 shadow-2xs">
              <AlertCircle size={14} aria-hidden="true" />
              <span>Dues Outstanding</span>
            </Badge>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Student Identity & Clearance Status (Cols 1-4) */}
        <div className="lg:col-span-4 space-y-6">
          
          <Card variant="default" className="p-6 space-y-6 shadow-xs">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-50 border border-blue-200 rounded-xl flex items-center justify-center text-blue-600 shrink-0">
                <UserCircle size={28} aria-hidden="true" />
              </div>
              <div>
                <h2 className="text-base font-bold text-[#0A192F] leading-tight">
                  {student.full_name}
                </h2>
                <span className="font-mono text-xs text-slate-500 block mt-0.5 font-bold">
                  {student.mat_no}
                </span>
                <span className="font-sans text-xs text-blue-600 font-bold block mt-0.5">
                  {student.department} Engineering
                </span>
              </div>
            </div>

            <div className="border-t border-b border-slate-100 py-4 space-y-2.5 text-xs">
              <div className="flex justify-between items-center">
                <span className="font-mono text-slate-500 uppercase font-semibold">Academic Level</span>
                <span className="font-sans font-bold text-[#0A192F]">{student.level} Level</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-mono text-slate-500 uppercase font-semibold">Phone</span>
                <span className="font-mono text-slate-700 font-bold">{student.phone || 'Not Registered'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-mono text-slate-500 uppercase font-semibold">Clearance Status</span>
                {duesPaidThisSession ? (
                  <span className="text-emerald-700 font-bold font-mono">Cleared for Exams</span>
                ) : (
                  <span className="text-amber-700 font-bold font-mono">Pending Dues Payment</span>
                )}
              </div>
            </div>

            <div>
              {duesPaidThisSession ? (
                <Link href="/portal/receipts" className="block w-full">
                  <Button variant="secondary" fullWidth className="gap-2 font-bold">
                    <Receipt size={16} aria-hidden="true" />
                    <span>View Official Receipts</span>
                  </Button>
                </Link>
              ) : (
                <Link href="/portal/dues" className="block w-full">
                  <Button variant="primary" fullWidth className="gap-2 font-bold shadow-sm shadow-blue-600/30">
                    <CreditCard size={16} aria-hidden="true" />
                    <span>Pay Departmental Dues (₦5,000)</span>
                  </Button>
                </Link>
              )}
            </div>
          </Card>

          {/* Alert Notice for Unpaid Dues */}
          {!duesPaidThisSession && (
            <div className="bg-amber-50/80 border border-amber-200 p-5 rounded-xl space-y-2.5 shadow-2xs">
              <div className="flex items-center gap-2 text-amber-950 font-bold text-sm">
                <AlertCircle size={17} className="text-amber-600 shrink-0" aria-hidden="true" />
                <span>Departmental Clearance Requirement</span>
              </div>
              <p className="font-sans text-xs text-amber-900 leading-relaxed font-normal">
                Departmental Dues receipt is required for course form signing, departmental clearance, and entry into electrical &amp; electronics laboratories.
              </p>
              <Link href="/portal/dues" className="inline-block pt-1 text-xs font-mono uppercase font-bold text-blue-700 hover:text-blue-900 hover:underline">
                Complete Payment Now &rarr;
              </Link>
            </div>
          )}

        </div>

        {/* Right Column: Transactions & Circulars (Cols 5-12) */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Recent Payments Section */}
          <section aria-labelledby="recent-payments-heading">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Receipt size={18} className="text-blue-600" aria-hidden="true" />
                <h2 id="recent-payments-heading" className="text-lg font-bold text-[#0A192F]">
                  Payment History &amp; Receipts
                </h2>
              </div>
              <Link href="/portal/receipts" className="text-xs font-mono uppercase tracking-wider text-blue-600 font-bold hover:underline">
                View All Receipts &rarr;
              </Link>
            </div>

            {payments && payments.length > 0 ? (
              <div className="space-y-3">
                {payments.map(payment => (
                  <Card key={payment.id} variant="default" className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 hover:border-slate-300 transition-colors">
                    <div className="flex items-center gap-3.5">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                        payment.status === 'success' 
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}>
                        <CreditCard size={18} aria-hidden="true" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-[#0A192F]">
                            Departmental Dues ({payment.session})
                          </span>
                          <Badge variant={payment.status === 'success' ? 'success' : 'gold'}>
                            {payment.status}
                          </Badge>
                        </div>
                        <span className="font-mono text-[11px] text-slate-500 block mt-0.5">
                          Ref: {payment.paystack_reference} &bull; {payment.paid_at ? new Date(payment.paid_at).toLocaleDateString('en-GB') : 'Pending'}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 self-end sm:self-center">
                      <span className="font-mono text-sm font-bold text-[#0A192F]">
                        ₦{Number(payment.amount).toLocaleString()}
                      </span>
                      {payment.status === 'success' && (
                        <Link href={`/portal/receipts/${payment.paystack_reference}`}>
                          <Button variant="secondary" size="sm" className="text-xs font-mono uppercase font-bold">
                            Receipt
                          </Button>
                        </Link>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center border-2 border-dashed border-slate-200 rounded-xl bg-white">
                <p className="font-sans text-xs text-slate-500 mb-3">No payments recorded in your student profile.</p>
                <Link href="/portal/dues">
                  <Button variant="primary" size="sm" className="font-bold">
                    Pay Departmental Dues
                  </Button>
                </Link>
              </div>
            )}
          </section>

          {/* Certified Documents & Memos */}
          <section aria-labelledby="documents-heading">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <FileText size={18} className="text-blue-600" aria-hidden="true" />
                <h2 id="documents-heading" className="text-lg font-bold text-[#0A192F]">
                  Official Academic Documents
                </h2>
              </div>
              <Link href="/documents" className="text-xs font-mono uppercase tracking-wider text-blue-600 font-bold hover:underline">
                Full Document Hub &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {documents?.map(doc => (
                <Card key={doc.id} variant="default" className="p-5 flex flex-col justify-between group hover:border-blue-300 transition-colors">
                  <div>
                    <div className="flex items-start justify-between mb-3">
                      <Badge variant="neutral" className="capitalize font-bold">
                        {doc.category.replace('_', ' ')}
                      </Badge>
                      <span className="font-mono text-[10px] text-slate-400 font-bold">
                        Rev. {doc.revision_no || 1}
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-[#0A192F] mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {doc.title}
                    </h3>
                  </div>
                  
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-auto">
                    <span className="font-mono text-[10px] text-slate-500 font-medium">
                      {doc.session || '2025/2026'}
                    </span>
                    <a 
                      href={doc.file_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-mono uppercase tracking-wider font-bold text-blue-600 hover:text-blue-800"
                    >
                      <span>Open File</span>
                      <ArrowRight size={12} aria-hidden="true" />
                    </a>
                  </div>
                </Card>
              ))}

              {(!documents || documents.length === 0) && (
                <div className="col-span-full p-8 text-center border-2 border-dashed border-slate-200 rounded-xl bg-white">
                  <p className="font-sans text-xs text-slate-500">No academic documents published recently.</p>
                </div>
              )}
            </div>
          </section>

        </div>

      </div>

    </div>
  )
}
