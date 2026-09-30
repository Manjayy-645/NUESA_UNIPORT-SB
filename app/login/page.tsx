'use client'

import { useState, useRef, useEffect } from 'react'
import { loginWithOtp, verifyLoginOtp } from '@/app/auth/actions'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'

export default function LoginPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [cooldown, setCooldown] = useState(0)

  const otpRefs = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (cooldown > 0) {
      timer = setTimeout(() => setCooldown(cooldown - 1), 1000)
    }
    return () => clearTimeout(timer)
  }, [cooldown])

  const handleSendOtp = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.')
      return
    }
    
    setLoading(true)
    setError(null)
    const res = await loginWithOtp(email)
    
    if (res.error) {
      setError(res.error)
      setLoading(false)
      return
    }
    
    setCooldown(30)
    setLoading(false)
    setStep(2)
  }

  const handleVerifyOtp = async () => {
    const code = otp.join('')
    if (code.length !== 6) {
      setError('Please enter a 6-digit code.')
      return
    }
    
    setLoading(true)
    setError(null)
    
    const res = await verifyLoginOtp(email, code)
    
    if (res.error) {
      setError(res.error)
      setLoading(false)
      return
    }
    
    router.push('/portal')
  }

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return
    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)
    if (value && index < 5) otpRefs.current[index + 1]?.focus()
  }
  
  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus()
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link href="/" className="inline-block text-primary/70 hover:text-accent font-medium transition-colors mb-6 text-sm">
          Return to Website
        </Link>
        <div className="w-12 h-12 border border-primary/20 bg-white rounded-sm flex items-center justify-center mb-6">
          <div className="w-10 h-10 bg-primary text-white text-sm flex items-center justify-center font-serif font-bold">
            NP
          </div>
        </div>
        <h2 className="mb-2">Sign in to portal</h2>
        <p className="text-sm text-primary/70 font-sans">
          Faculty of Engineering
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Card className="py-8 px-4 sm:px-10">
          {error && (
            <div className="bg-red-50 border border-red-500/20 p-4 mb-6 rounded-sm">
              <p className="text-sm text-red-700 font-medium">{error}</p>
            </div>
          )}

          {step === 1 ? (
            <form onSubmit={handleSendOtp} className="space-y-6">
              <Input
                label="Email address"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="student@example.com"
                required
              />

              <Button type="submit" variant="primary" fullWidth disabled={loading || !email}>
                {loading ? 'Sending Code...' : 'Send Login Code'}
              </Button>
            </form>
          ) : (
            <div className="space-y-6">
              <div>
                <p className="text-sm text-primary/70">We sent a 6-digit code to</p>
                <p className="font-medium text-primary font-sans">{email}</p>
              </div>

              <div className="flex gap-2">
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    ref={el => { otpRefs.current[i] = el }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={e => handleOtpChange(i, e.target.value)}
                    onKeyDown={e => handleOtpKeyDown(i, e)}
                    className="w-full aspect-square text-center text-xl font-mono border border-primary/20 rounded-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                ))}
              </div>

              <Button onClick={handleVerifyOtp} variant="primary" fullWidth disabled={loading || otp.join('').length !== 6}>
                {loading ? 'Verifying...' : 'Sign In'}
              </Button>

              <div className="flex items-center justify-between text-sm mt-4">
                <button 
                  onClick={() => handleSendOtp()}
                  disabled={cooldown > 0 || loading}
                  className="text-primary hover:text-accent font-medium disabled:text-primary/40"
                >
                  {cooldown > 0 ? `Resend code in ${cooldown}s` : 'Resend Code'}
                </button>
                <button onClick={() => setStep(1)} disabled={loading} className="text-primary/60 hover:text-primary">
                  Change email
                </button>
              </div>
            </div>
          )}

          <div className="mt-8 pt-6 border-t border-primary/10">
            <p className="text-sm text-primary/70">
              Not registered yet? <Link href="/signup" className="font-medium text-primary hover:text-accent">Create an account</Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  )
}
