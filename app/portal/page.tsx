import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { FileText, CreditCard, UserCircle, ChevronRight, CheckCircle2, AlertCircle } from 'lucide-react'

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
    .limit(3)

  // 3. Fetch Latest Active Documents
  const { data: documents } = await supabase
    .from('documents')
    .select('*')
    .eq('is_active', true)
    .order('published_at', { ascending: false })
    .limit(3)

  const duesPaidThisSession = payments?.some(p => p.session === '2025/2026' && p.status === 'success')

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-serif text-primary font-bold mb-2">Welcome back, {student.full_name.split(' ')[0]}!</h1>
        <p className="text-primary/70 font-sans">NUESA Student Portal &bull; {student.session || '2025/2026'} Academic Session</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Profile & Actions */}
        <div className="lg:col-span-1 space-y-6">
          {/* Profile Card */}
          <Card className="p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                <UserCircle size={32} />
              </div>
              <div>
                <h3 className="font-bold text-lg text-primary">{student.full_name}</h3>
                <p className="text-sm font-mono text-primary/70">{student.mat_no}</p>
              </div>
            </div>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between items-center py-2 border-b border-primary/10">
                <span className="text-sm text-primary/60">Department</span>
                <span className="text-sm font-medium text-primary">{student.department} Eng.</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-primary/10">
                <span className="text-sm text-primary/60">Level</span>
                <span className="text-sm font-medium text-primary">{student.level}L</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-sm text-primary/60">Status</span>
                {student.verified ? (
                  <Badge variant="success" className="gap-1"><CheckCircle2 size={12} /> Verified</Badge>
                ) : (
                  <Badge variant="neutral" className="gap-1"><AlertCircle size={12} /> Unverified</Badge>
                )}
              </div>
            </div>

            <div className="pt-2">
              <Link href="/portal/dues">
                <Button variant={duesPaidThisSession ? "secondary" : "primary"} fullWidth>
                  {duesPaidThisSession ? 'View Dues History' : 'Pay Faculty Dues'}
                </Button>
              </Link>
            </div>
          </Card>

          {/* Alert / CTA */}
          {!duesPaidThisSession && (
            <div className="bg-yellow-50 border border-gold/40 p-5 rounded-lg flex gap-4 items-start">
              <AlertCircle size={24} className="text-yellow-800 shrink-0" />
              <div>
                <h4 className="text-sm font-bold text-yellow-800 mb-1">Dues Outstanding</h4>
                <p className="text-xs text-yellow-800/80 mb-3">You have not paid your NUESA dues for the current academic session. Pay now to avoid clearance delays.</p>
                <Link href="/portal/dues" className="text-xs font-bold text-yellow-800 hover:underline">Pay Now</Link>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Transactions & Docs */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Recent Payments */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold font-serif text-primary">Recent Transactions</h2>
              {payments && payments.length > 0 && (
                <Link href="/portal/dues" className="text-sm text-accent hover:underline font-medium">View All</Link>
              )}
            </div>
            
            {payments && payments.length > 0 ? (
              <div className="space-y-3">
                {payments.map(payment => (
                  <Card key={payment.id} className="p-4 flex items-center justify-between hover:bg-primary/5 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        payment.status === 'success' ? 'bg-success/20 text-success' : 
                        payment.status === 'pending' ? 'bg-gold/20 text-yellow-700' : 'bg-red-100 text-red-600'
                      }`}>
                        <CreditCard size={18} />
                      </div>
                      <div>
                        <p className="font-bold text-primary text-sm">Faculty Dues ({payment.session})</p>
                        <p className="text-xs text-primary/60 font-mono mt-0.5">{payment.paystack_reference}</p>
                      </div>
                    </div>
                    <div className="text-right flex flex-col items-end">
                      <span className="font-bold text-primary font-sans">₦{payment.amount.toLocaleString()}</span>
                      {payment.status === 'success' ? (
                        <Link href={`/portal/receipts/${payment.paystack_reference}`} className="text-xs font-bold text-accent hover:underline mt-1">
                          Receipt
                        </Link>
                      ) : (
                        <Badge variant={payment.status === 'pending' ? 'gold' : 'neutral'} className="mt-1 lowercase">
                          {payment.status}
                        </Badge>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="p-8 text-center border-dashed">
                <p className="text-primary/60 text-sm mb-4">You have no payment history yet.</p>
                <Link href="/portal/dues">
                  <Button variant="secondary">Pay Current Dues</Button>
                </Link>
              </Card>
            )}
          </section>

          {/* Official Documents */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold font-serif text-primary">Latest Documents</h2>
              <Link href="/documents" className="text-sm text-accent hover:underline font-medium">Document Hub</Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {documents?.map(doc => (
                <Card key={doc.id} className="p-5 flex flex-col hover:border-accent/40 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div className="p-2 bg-primary/5 rounded border border-primary/10">
                      <FileText size={16} className="text-primary" />
                    </div>
                    <Badge variant="neutral" className="text-[10px]">Rev {doc.revision_no}</Badge>
                  </div>
                  <h3 className="font-bold text-sm text-primary mb-1 line-clamp-2">{doc.title}</h3>
                  <p className="text-xs text-primary/60 mb-4 capitalize">{doc.category.replace('_', ' ')}</p>
                  
                  <a href={doc.file_url} target="_blank" rel="noopener noreferrer" className="mt-auto text-xs font-bold text-accent hover:underline inline-flex items-center gap-1">
                    View Document <ChevronRight size={14} />
                  </a>
                </Card>
              ))}
              
              {(!documents || documents.length === 0) && (
                <div className="col-span-full p-8 text-center border border-dashed border-primary/20 rounded-lg">
                  <p className="text-primary/60 text-sm">No official documents published recently.</p>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
