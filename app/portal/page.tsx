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
  title: 'Student Dashboard | SEEES Portal',
  description: 'Manage departmental dues, view certified clearance receipts, and access official academic schedules.',
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
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-primary/10">
        <div>
          <div className="inline-flex items-center gap-2 mb-1.5">
            <span className="w-2 h-2 rounded-2xs bg-accent inline-block" aria-hidden="true" />
            <span className="font-mono text-xs uppercase tracking-widest text-primary/60 font-semibold">
              Academic Clearance Terminal
            </span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-primary tracking-tight">
            Welcome back, {student.full_name.split(' ')[0]}
          </h1>
          <p className="font-sans text-xs sm:text-sm text-primary/70 mt-1">
            Department of Electrical &amp; Electronic Engineering &bull; 2025/2026 Academic Session
          </p>
        </div>

        <div className="flex items-center gap-2">
          {duesPaidThisSession ? (
            <Badge variant="success" className="px-3 py-1 font-mono text-xs font-bold gap-1.5">
              <CheckCircle2 size={13} aria-hidden="true" />
              <span>Dues Cleared (2025/2026)</span>
            </Badge>
          ) : (
            <Badge variant="gold" className="px-3 py-1 font-mono text-xs font-bold gap-1.5">
              <AlertCircle size={13} aria-hidden="true" />
              <span>Dues Outstanding</span>
            </Badge>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Student Identity & Clearance Status (Cols 1-4) */}
        <div className="lg:col-span-4 space-y-6">
          
          <Card variant="default" className="p-6 space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary/5 border border-primary/15 rounded-xs flex items-center justify-center text-primary shrink-0">
                <UserCircle size={28} aria-hidden="true" />
              </div>
              <div>
                <h2 className="font-serif text-base font-semibold text-primary leading-tight">
                  {student.full_name}
                </h2>
                <span className="font-mono text-xs text-primary/60 block mt-0.5">
                  {student.mat_no}
                </span>
                <span className="font-sans text-xs text-accent font-semibold block mt-0.5">
                  {student.department} Engineering
                </span>
              </div>
            </div>

            <div className="border-t border-b border-primary/10 py-4 space-y-2.5 text-xs">
              <div className="flex justify-between items-center">
                <span className="font-mono text-primary/50 uppercase">Academic Level</span>
                <span className="font-sans font-bold text-primary">{student.level} Level</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-mono text-primary/50 uppercase">Phone</span>
                <span className="font-mono text-primary/80">{student.phone || 'Not Registered'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-mono text-primary/50 uppercase">Clearance Status</span>
                {duesPaidThisSession ? (
                  <span className="text-emerald-700 font-semibold font-mono">Cleared for Exams</span>
                ) : (
                  <span className="text-amber-800 font-semibold font-mono">Pending Dues Payment</span>
                )}
              </div>
            </div>

            <div>
              {duesPaidThisSession ? (
                <Link href="/portal/receipts" className="block w-full">
                  <Button variant="secondary" fullWidth className="gap-2">
                    <Receipt size={16} aria-hidden="true" />
                    <span>View Official Receipts</span>
                  </Button>
                </Link>
              ) : (
                <Link href="/portal/dues" className="block w-full">
                  <Button variant="primary" fullWidth className="gap-2 bg-red-600 hover:bg-red-700 text-white font-bold">
                    <CreditCard size={16} aria-hidden="true" />
                    <span>Pay SEEES Dues (₦5,000)</span>
                  </Button>
                </Link>
              )}
            </div>
          </Card>

          {/* Alert Notice for Unpaid Dues */}
          {!duesPaidThisSession && (
            <div className="bg-amber-50 border border-amber-600/30 p-5 rounded-xs space-y-2">
              <div className="flex items-center gap-2 text-amber-900 font-serif font-semibold text-sm">
                <AlertCircle size={16} className="text-amber-700" aria-hidden="true" />
                <span>Departmental Clearance Requirement</span>
              </div>
              <p className="font-sans text-xs text-amber-900/80 leading-relaxed">
                SEEES Departmental Dues receipt is required for course form signing, departmental clearance, and entry into electrical laboratories.
              </p>
              <Link href="/portal/dues" className="inline-block pt-1 text-xs font-mono uppercase font-bold text-red-700 hover:underline">
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
                <Receipt size={18} className="text-accent" aria-hidden="true" />
                <h2 id="recent-payments-heading" className="font-serif text-lg font-semibold text-primary">
                  Payment History & Receipts
                </h2>
              </div>
              <Link href="/portal/receipts" className="text-xs font-mono uppercase tracking-wider text-accent font-semibold hover:underline">
                View All Receipts &rarr;
              </Link>
            </div>

            {payments && payments.length > 0 ? (
              <div className="space-y-3">
                {payments.map(payment => (
                  <Card key={payment.id} variant="default" className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 hover:border-primary/30 transition-colors">
                    <div className="flex items-center gap-3.5">
                      <div className={`w-9 h-9 rounded-2xs flex items-center justify-center shrink-0 ${
                        payment.status === 'success' 
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-600/25' 
                          : 'bg-amber-50 text-amber-700 border border-amber-600/25'
                      }`}>
                        <CreditCard size={16} aria-hidden="true" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-serif text-sm font-semibold text-primary">
                            SEEES Departmental Dues ({payment.session})
                          </span>
                          <Badge variant={payment.status === 'success' ? 'success' : 'gold'}>
                            {payment.status}
                          </Badge>
                        </div>
                        <span className="font-mono text-[11px] text-primary/50 block mt-0.5">
                          Ref: {payment.paystack_reference} &bull; {payment.paid_at ? new Date(payment.paid_at).toLocaleDateString('en-GB') : 'Pending'}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 self-end sm:self-center">
                      <span className="font-mono text-sm font-bold text-primary">
                        ₦{Number(payment.amount).toLocaleString()}
                      </span>
                      {payment.status === 'success' && (
                        <Link href={`/portal/receipts/${payment.paystack_reference}`}>
                          <Button variant="secondary" size="sm" className="text-xs font-mono uppercase">
                            Receipt
                          </Button>
                        </Link>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center border border-dashed border-primary/20 rounded-xs bg-white">
                <p className="font-sans text-xs text-primary/60 mb-3">No payments recorded in your student profile.</p>
                <Link href="/portal/dues">
                  <Button variant="primary" size="sm" className="bg-red-600 hover:bg-red-700 text-white font-bold">
                    Pay SEEES Departmental Dues
                  </Button>
                </Link>
              </div>
            )}
          </section>

          {/* Certified Documents & Memos */}
          <section aria-labelledby="documents-heading">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <FileText size={18} className="text-accent" aria-hidden="true" />
                <h2 id="documents-heading" className="font-serif text-lg font-semibold text-primary">
                  Official Academic Documents
                </h2>
              </div>
              <Link href="/documents" className="text-xs font-mono uppercase tracking-wider text-accent font-semibold hover:underline">
                Full Document Hub &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {documents?.map(doc => (
                <Card key={doc.id} variant="default" className="p-5 flex flex-col justify-between group hover:border-accent/40 transition-colors">
                  <div>
                    <div className="flex items-start justify-between mb-3">
                      <Badge variant="neutral" className="capitalize">
                        {doc.category.replace('_', ' ')}
                      </Badge>
                      <span className="font-mono text-[10px] text-primary/50">
                        Rev. {doc.revision_no || 1}
                      </span>
                    </div>
                    <h3 className="font-serif text-sm font-semibold text-primary mb-2 line-clamp-2 group-hover:text-accent transition-colors">
                      {doc.title}
                    </h3>
                  </div>
                  
                  <div className="pt-4 border-t border-primary/10 flex items-center justify-between mt-auto">
                    <span className="font-mono text-[10px] text-primary/50">
                      {doc.session || '2025/2026'}
                    </span>
                    <a 
                      href={doc.file_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-mono uppercase tracking-wider font-semibold text-accent hover:underline"
                    >
                      <span>Open File</span>
                      <ArrowRight size={12} aria-hidden="true" />
                    </a>
                  </div>
                </Card>
              ))}

              {(!documents || documents.length === 0) && (
                <div className="col-span-full p-8 text-center border border-dashed border-primary/20 rounded-xs bg-white">
                  <p className="font-sans text-xs text-primary/60">No academic documents published recently.</p>
                </div>
              )}
            </div>
          </section>

        </div>

      </div>

    </div>
  )
}
