import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(req: Request) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    const { amount, session, semester } = await req.json()
    
    // Generate unique reference
    const reference = `NUESA-${Date.now()}-${Math.floor(Math.random() * 1000000)}`
    
    // Insert pending payment bypassing RLS
    const { createAdminClient } = await import('@/lib/supabase/admin')
    const adminSupabase = createAdminClient()
    
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
