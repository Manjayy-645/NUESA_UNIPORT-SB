import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(req: Request) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    const { studentId, amount, session, semester } = await req.json()
    
    // Import admin client early since we need it for checks and inserts
    const { createAdminClient } = await import('@/lib/supabase/admin')
    const adminSupabase = createAdminClient()
    
    // Prevent duplicate payments for the same session
    const { data: existingPayment } = await adminSupabase
      .from('payments')
      .select('id, status, paystack_reference')
      .eq('student_id', user.id)
      .eq('session', session)
      .in('status', ['success', 'pending'])
      .maybeSingle()
    
    if (existingPayment?.status === 'success') {
      return NextResponse.json({ error: 'You have already paid dues for this session' }, { status: 400 })
    }
    
    // If there's a pending payment, reuse its reference instead of creating a new one
    if (existingPayment?.status === 'pending') {
      return NextResponse.json({ reference: existingPayment.paystack_reference })
    }
    
    // Generate unique reference
    const reference = `NUESA-${Date.now()}-${Math.floor(Math.random() * 1000000)}`
    
    const { error } = await adminSupabase
      .from('payments')
      .insert({
        student_id: user.id,
        amount,
        session,
        semester,
        status: 'pending',
        paystack_reference: reference
      })
      
    if (error) throw error
    
    return NextResponse.json({ reference })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
