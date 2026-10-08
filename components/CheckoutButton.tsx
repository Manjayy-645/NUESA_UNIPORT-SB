'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'

export function CheckoutButton({ studentId, email, amount, session, semester }: { studentId: string, email: string, amount: number, session: string, semester: string }) {
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const router = useRouter()

  const handlePayment = async () => {
    try {
      setLoading(true)
      setErrorMsg(null)
      
      // 1. Call server action / API to initialize pending payment
      const res = await fetch('/api/paystack/initialize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentId, amount, session, semester })
      })
      
      const data = await res.json().catch(() => ({}))
      
      if (!res.ok) {
        throw new Error(data.error || 'Failed to initialize payment')
      }
      
      if (!data.reference) {
        throw new Error('No reference returned from server')
      }
      
      const { reference } = data
      
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
        },
        onError: (err: any) => {
          setLoading(false)
          console.error("Paystack error:", err);
          setErrorMsg(typeof err === 'string' ? err : err?.message || 'Payment provider error')
        }
      })
    } catch (err: any) {
      console.error('Payment initialization error:', err)
      setErrorMsg(err.message || 'An unexpected error occurred')
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center">
      <Button 
        onClick={handlePayment} 
        disabled={loading}
        variant="primary"
      >
        {loading ? 'Initializing...' : `Pay ₦${amount}`}
      </Button>
      {errorMsg && <p className="text-destructive text-sm mt-2">{errorMsg}</p>}
    </div>
  )
}
