import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { CheckoutButton } from '@/components/CheckoutButton'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { CheckCircle2, AlertCircle } from 'lucide-react'

export default async function DuesPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) redirect('/login')
  
  const { data: student } = await supabase
    .from('students')
    .select('*')
    .eq('id', user.id)
    .single()
    
  if (!student) redirect('/signup') // Updated redirect since onboarding is removed
  
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
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-serif text-primary font-bold mb-2">Faculty Dues Checkout</h1>
        <p className="text-primary/70 font-sans">Pay your NUESA dues securely via Paystack.</p>
      </div>
      
      <Card className="p-6 sm:p-8">
        <h2 className="text-xl font-semibold mb-6 text-primary">Payment Details</h2>
        
        <div className="bg-primary/5 rounded-md p-5 border border-primary/10 mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 text-sm">
            <div className="flex flex-col border-b sm:border-b-0 border-primary/10 pb-2 sm:pb-0">
              <span className="text-primary/60 mb-1">Student Name</span>
              <span className="font-bold text-primary text-base">{student.full_name}</span>
            </div>
            <div className="flex flex-col border-b sm:border-b-0 border-primary/10 pb-2 sm:pb-0">
              <span className="text-primary/60 mb-1">Matriculation No.</span>
              <span className="font-bold font-mono text-primary text-base">{student.mat_no}</span>
            </div>
            <div className="flex flex-col border-b sm:border-b-0 border-primary/10 pb-2 sm:pb-0">
              <span className="text-primary/60 mb-1">Department & Level</span>
              <span className="font-bold text-primary text-base">{student.department} Eng. &bull; {student.level}L</span>
            </div>
            <div className="flex flex-col pb-2 sm:pb-0">
              <span className="text-primary/60 mb-1">Academic Session</span>
              <span className="font-bold text-primary text-base">{ACTIVE_SESSION}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-primary/10 pt-6 mb-8">
          <span className="text-lg text-primary font-medium">Total Amount Due:</span>
          <span className="text-3xl font-bold text-primary font-sans">₦{DUES_AMOUNT.toLocaleString()}</span>
        </div>
        
        {existingPayment ? (
          <div className="bg-success/10 border border-success/20 p-5 rounded-md flex gap-4 items-start">
            <CheckCircle2 size={24} className="text-success shrink-0" />
            <div className="flex-1">
              <h4 className="text-sm font-bold text-success mb-1">Payment Confirmed</h4>
              <p className="text-sm text-success/80 mb-4">You have already paid your dues for the {ACTIVE_SESSION} session.</p>
              <Link href={`/portal/receipts/${existingPayment.paystack_reference}`}>
                <Button variant="secondary" className="!border-success/40 !text-success hover:!bg-success/5">
                  View Official Receipt
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <CheckoutButton 
              studentId={user.id} 
              email={user.email || ''} 
              amount={DUES_AMOUNT}
              session={ACTIVE_SESSION}
              semester={SEMESTER}
            />
            <p className="text-xs text-primary/50 mt-4 text-center">Secure payment processing powered by Paystack.</p>
          </div>
        )}
      </Card>
    </div>
  )
}
