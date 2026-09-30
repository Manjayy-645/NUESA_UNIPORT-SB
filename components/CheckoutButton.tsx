'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'

export function CheckoutButton({ studentId, email, amount, session, semester }: { studentId: string, email: string, amount: number, session: string, semester: string }) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handlePayment = async () => {
    setLoading(true)
    
    // 1. Call server action / API to initialize pending payment
    const res = await fetch('/api/paystack/initialize', {
      method: 'POST',
      body: JSON.stringify({ studentId, amount, session, semester })
    })
    
    const { reference } = await res.json()
    
    // 2. Load Paystack script dynamically
    const PaystackPop = (await import('@paystack/inline-js')).default
    
    const popup = new PaystackPop()
    
    popup.newTransaction({
      key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!,
      email: email,
      amount: amount * 100, // Kobo
      reference: reference,
      onSuccess: (transaction: any) => {
        // Webhook handles the actual DB update, we just redirect
        router.push(`/portal/receipts/${transaction.reference}`)
      },
      onCancel: () => {
        setLoading(false)
      }
    })
  }

  return (
    <Button 
      onClick={handlePayment} 
      disabled={loading}
      variant="primary"
    >
      {loading ? 'Initializing...' : `Pay ₦${amount}`}
    </Button>
  )
}
