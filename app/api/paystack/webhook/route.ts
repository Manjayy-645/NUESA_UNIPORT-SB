import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import crypto from 'crypto'
import { paystackConfig } from '@/lib/paystack'

export async function POST(req: Request) {
  try {
    const text = await req.text()
    
    // Verify paystack signature
    const signature = req.headers.get('x-paystack-signature')
    const hash = crypto
      .createHmac('sha512', paystackConfig.secretKey)
      .update(text)
      .digest('hex')

    if (!signature || !crypto.timingSafeEqual(Buffer.from(hash), Buffer.from(signature))) {
      return NextResponse.json({ message: 'Invalid signature' }, { status: 400 })
    }

    const event = JSON.parse(text)
    
    if (event.event === 'charge.success') {
      const { reference, metadata } = event.data
      
      const supabase = createAdminClient()
      
      // Generate sequential receipt number (e.g. NUESA/2026/XXXX)
      const year = new Date().getFullYear()
      // Note: In production you might want a more robust atomic counter for receipt numbers.
      // This is a simple random 4-digit fallback for demonstration if no sequence exists.
      const randomSeq = Math.floor(1000 + Math.random() * 9000)
      const receiptNumber = `NUESA/${year}/${randomSeq}`

      // Update payment status using service role
      const { error } = await supabase
        .from('payments')
        .update({ 
          status: 'success', 
          paid_at: new Date().toISOString(),
          receipt_number: receiptNumber
        })
        .eq('paystack_reference', reference)
        .eq('status', 'pending')

      if (error) throw error
    }

    return NextResponse.json({ status: 'success' })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json({ message: 'Server error' }, { status: 500 })
  }
}
