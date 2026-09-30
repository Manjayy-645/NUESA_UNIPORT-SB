'use client'

import { useState, useRef, useEffect } from 'react'
import { sendOtp, verifyOtpAndCreateStudent } from '@/app/auth/actions'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Check } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Badge } from '@/components/ui/Badge'

const DEPARTMENTS = [
  'Chemical', 'Civil', 'Electrical', 'Mechanical', 'Petroleum', 'Mechatronics', 'Computer'
]
const MAT_NO_PATTERN = /^U20\d{2}\/\d{7}$/i
const NIGERIAN_PHONE_PATTERN = /^(0)(7|8|9)(0|1)\d{8}$/

export default function SignupPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  
  const [matNo, setMatNo] = useState('')
  const [matNoConfirm, setMatNoConfirm] = useState('')
  const [fullName, setFullName] = useState('')
  const [department, setDepartment] = useState('')
  const [level, setLevel] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
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

  const matNoMatch = matNo === matNoConfirm && matNo !== ''
  const matNoValid = MAT_NO_PATTERN.test(matNo)
  
  const step1Valid = matNoValid && matNoMatch
  
  const step2Valid = 
    fullName.trim() !== '' &&
    department !== '' &&
    level !== '' &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) &&
    NIGERIAN_PHONE_PATTERN.test(phone)

  const handleNextStep = () => {
    setError(null)
    setStep(step + 1)
  }

  const handleSendOtp = async () => {
    setLoading(true)
    setError(null)
    const res = await sendOtp(email)
    
    if (res.error) {
      setError(res.error)
      setLoading(false)
      return
    }
    
    setCooldown(30)
    setLoading(false)
    setStep(4)
  }

  const handleVerifyOtp = async () => {
    const code = otp.join('')
    if (code.length !== 6) {
      setError('Please enter a 6-digit code.')
      return
    }
    
    setLoading(true)
    setError(null)
    
    const res = await verifyOtpAndCreateStudent(email, code, {
      mat_no: matNo,
      full_name: fullName,
      department,
      level,
      phone
    })
    
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
        <h2 className="mb-6">Student Registration</h2>
        
        <div className="flex items-center gap-2 mb-8">
          {[1, 2, 3, 4].map(s => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-6 h-6 border rounded-sm flex items-center justify-center font-mono text-xs ${
                step === s ? 'bg-primary border-primary text-white' : 
                step > s ? 'bg-success/10 border-success/30 text-success' : 'bg-transparent border-primary/20 text-primary/40'
              }`}>
                {step > s ? <Check size={12} /> : s}
              </div>
              {s < 4 && <div className={`w-8 h-px ${step > s ? 'bg-success/30' : 'bg-primary/20'}`}></div>}
            </div>
          ))}
        </div>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Card className="py-8 px-4 sm:px-10">
          
          {error && (
            <div className="bg-red-50 border border-red-500/20 p-4 mb-6 rounded-sm">
              <p className="text-sm text-red-700 font-medium">{error}</p>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-6">
              <Input
                label="Matriculation Number"
                type="text"
                value={matNo}
                onChange={e => setMatNo(e.target.value.toUpperCase())}
                placeholder="U2021/1234567"
                className="uppercase font-mono"
                error={!matNoValid && matNo.length > 0 ? 'Must match pattern U20XX/XXXXXXX' : undefined}
              />

              <Input
                label="Re-enter matric number to confirm"
                type="text"
                value={matNoConfirm}
                onChange={e => setMatNoConfirm(e.target.value.toUpperCase())}
                onPaste={e => e.preventDefault()}
                placeholder="U2021/1234567"
                className="uppercase font-mono"
                error={matNoConfirm && !matNoMatch ? 'Matric numbers do not match.' : undefined}
              />

              <Button onClick={handleNextStep} variant="primary" fullWidth disabled={!step1Valid}>
                Continue
              </Button>
              <div className="pt-4 border-t border-primary/10 mt-6">
                <Link href="/login" className="text-sm text-primary hover:text-accent font-medium">
                  Already registered? Log in here.
                </Link>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <Input
                label="Full Name"
                type="text"
                value={fullName}
                onChange={e => setFullName(e.target.value)}
              />

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-primary mb-1">Department</label>
                  <select 
                    value={department} 
                    onChange={e => setDepartment(e.target.value)} 
                    className="block w-full px-3 py-2 border border-primary/20 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors"
                  >
                    <option value="">Select...</option>
                    {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-primary mb-1">Level</label>
                  <select 
                    value={level} 
                    onChange={e => setLevel(e.target.value)} 
                    className="block w-full px-3 py-2 border border-primary/20 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors"
                  >
                    <option value="">Select...</option>
                    {['100', '200', '300', '400', '500'].map(l => <option key={l} value={l}>{l}L</option>)}
                  </select>
                </div>
              </div>

              <Input
                label="Email Address (for login)"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />

              <Input
                label="Phone Number"
                type="tel"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="08012345678"
              />

              <div className="flex gap-4 pt-4">
                <Button onClick={() => setStep(1)} variant="secondary" className="flex-1">Back</Button>
                <Button onClick={handleNextStep} variant="primary" className="flex-[2]" disabled={!step2Valid}>
                  Review Details
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div className="bg-yellow-50 border border-gold/40 p-5 rounded-md">
                <p className="text-xs text-yellow-800 font-bold uppercase tracking-wider mb-2">Confirm this is you</p>
                <p className="text-2xl font-serif font-semibold text-primary">{fullName}</p>
                <p className="text-lg font-mono text-primary/80 mt-1">{matNo}</p>
                <div className="mt-4 flex gap-2">
                  <Badge variant="neutral">{department} Eng.</Badge>
                  <Badge variant="neutral">{level}L</Badge>
                </div>
              </div>

              <div className="flex gap-4">
                <Button onClick={() => setStep(2)} variant="secondary" className="flex-1" disabled={loading}>Edit</Button>
                <Button onClick={handleSendOtp} variant="primary" className="flex-[2]" disabled={loading}>
                  {loading ? 'Sending Code...' : 'Confirm & Send OTP'}
                </Button>
              </div>
            </div>
          )}

          {step === 4 && (
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
                {loading ? 'Verifying & Creating Account...' : 'Verify & Complete'}
              </Button>

              <div className="flex items-center justify-between text-sm mt-4">
                <button 
                  onClick={handleSendOtp}
                  disabled={cooldown > 0 || loading}
                  className="text-primary hover:text-accent font-medium disabled:text-primary/40"
                >
                  {cooldown > 0 ? `Resend code in ${cooldown}s` : 'Resend Code'}
                </button>
                <button onClick={() => setStep(3)} disabled={loading} className="text-primary/60 hover:text-primary">
                  Change email
                </button>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}
