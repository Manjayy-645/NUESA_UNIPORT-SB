'use client'

import { useState } from 'react'
import { signUpAndCreateStudent } from '@/app/auth/actions'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Check, ArrowLeft, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Badge } from '@/components/ui/Badge'

const DEPARTMENTS = [
  'Chemical', 
  'Civil', 
  'Electrical', 
  'Mechanical', 
  'Petroleum', 
  'Mechatronics', 
  'Electronics'
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
  const [password, setPassword] = useState('')
  
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const matNoMatch = matNo === matNoConfirm && matNo !== ''
  const matNoValid = MAT_NO_PATTERN.test(matNo)
  const step1Valid = matNoValid && matNoMatch
  
  const step2Valid = 
    fullName.trim() !== '' &&
    department !== '' &&
    level !== '' &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) &&
    NIGERIAN_PHONE_PATTERN.test(phone) &&
    password.length >= 6

  const handleNextStep = () => {
    setError(null)
    setStep(step + 1)
  }

  const handleSignup = async () => {
    setLoading(true)
    setError(null)
    
    const res = await signUpAndCreateStudent(email, password, {
      mat_no: matNo,
      full_name: fullName,
      department,
      level,
      phone,
    })

    if (res.error) {
      setError(res.error)
      setLoading(false)
      return
    }

    router.push('/portal')
  }

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* Return to website */}
      <div className="sm:mx-auto sm:w-full sm:max-w-lg mb-6 text-center">
        <Link 
          href="/" 
          className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-primary/60 hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-xs p-1"
        >
          <ArrowLeft size={14} aria-hidden="true" />
          <span>Return to Homepage</span>
        </Link>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-lg text-center space-y-3">
        <div className="w-10 h-10 bg-white border border-primary/20 rounded-xs flex items-center justify-center font-serif font-bold text-xs text-primary mx-auto shadow-xs">
          FOE
        </div>

        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-primary/60 font-semibold block">
            {step === 1 ? 'Step 1 of 3 &bull; Matriculation Verification' : step === 2 ? 'Step 2 of 3 &bull; Profile Particulars' : 'Step 3 of 3 &bull; Final Confirmation'}
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-primary tracking-tight mt-1">
            {step === 1 ? 'Verify Matriculation' : step === 2 ? 'Student Academic Profile' : 'Review & Initialize Account'}
          </h1>
        </div>
        
        {/* Step Progress Tracker */}
        <nav aria-label="Onboarding Progress" className="py-2">
          <ol className="flex items-center justify-center gap-2">
            {[1, 2, 3].map(s => (
              <li key={s} className="flex items-center gap-2">
                <div 
                  className={`w-7 h-7 border rounded-2xs flex items-center justify-center font-mono text-xs font-semibold transition-colors ${
                    step === s 
                      ? 'bg-primary border-primary text-white' 
                      : step > s 
                        ? 'bg-emerald-50 border-emerald-600/40 text-emerald-800' 
                        : 'bg-white border-primary/20 text-primary/40'
                  }`}
                  aria-current={step === s ? 'step' : undefined}
                >
                  {step > s ? <Check size={13} aria-hidden="true" /> : s}
                </div>
                {s < 3 && (
                  <div className={`w-8 sm:w-12 h-px ${step > s ? 'bg-emerald-600/50' : 'bg-primary/20'}`} aria-hidden="true" />
                )}
              </li>
            ))}
          </ol>
        </nav>
      </div>

      <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-lg">
        <Card variant="default" className="py-8 px-6 sm:px-10 space-y-6">
          
          {error && (
            <div 
              role="alert" 
              className="bg-red-50 border border-red-500/25 p-3.5 rounded-2xs flex items-start gap-2.5 text-xs text-red-700 font-sans leading-relaxed"
            >
              <AlertCircle size={16} className="text-red-600 shrink-0 mt-0.5" aria-hidden="true" />
              <span>{error}</span>
            </div>
          )}

          {/* STEP 1: MATRICULATION VERIFICATION */}
          {step === 1 && (
            <div className="space-y-5">
              <p className="font-sans text-xs text-primary/70 leading-relaxed">
                Enter your authentic University of Port Harcourt matriculation number to bind your clearance identity.
              </p>

              <Input
                label="Matriculation Number"
                type="text"
                id="mat-no"
                value={matNo}
                onChange={e => setMatNo(e.target.value.toUpperCase())}
                placeholder="e.g. U2021/5570012"
                className="uppercase font-mono tracking-wider font-semibold"
                error={!matNoValid && matNo.length > 0 ? 'Format must adhere to U20XX/XXXXXXX' : undefined}
                helperText="Must match standard UniPort engineering format (e.g. U2021/5570012)"
              />

              <Input
                label="Confirm Matriculation Number"
                type="text"
                id="mat-no-confirm"
                value={matNoConfirm}
                onChange={e => setMatNoConfirm(e.target.value.toUpperCase())}
                onPaste={e => e.preventDefault()}
                placeholder="Re-enter to verify"
                className="uppercase font-mono tracking-wider font-semibold"
                error={matNoConfirm && !matNoMatch ? 'Matriculation numbers do not match exactly.' : undefined}
                helperText="Paste disabled to guarantee verification accuracy"
              />

              <div className="pt-2">
                <Button 
                  onClick={handleNextStep} 
                  variant="primary" 
                  fullWidth 
                  size="md"
                  disabled={!step1Valid}
                  className="gap-2 font-sans font-semibold"
                >
                  <span>Verify & Proceed</span>
                  <ArrowRight size={15} aria-hidden="true" />
                </Button>
              </div>

              <div className="pt-4 border-t border-primary/10 text-center">
                <Link href="/login" className="font-mono text-xs uppercase font-bold text-primary/70 hover:text-accent transition-colors">
                  Already registered? Sign In Here &rarr;
                </Link>
              </div>
            </div>
          )}

          {/* STEP 2: PERSONAL & DEPARTMENTAL PROFILE */}
          {step === 2 && (
            <div className="space-y-4">
              <Input
                label="Official Full Name (Surname First)"
                type="text"
                id="full-name"
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                placeholder="e.g. OKONKWO, Emeka David"
                required
              />

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="dept-select" className="block text-xs font-semibold uppercase tracking-wider text-primary/80 mb-1.5">
                    Department
                  </label>
                  <select 
                    id="dept-select"
                    value={department} 
                    onChange={e => setDepartment(e.target.value)} 
                    className="block w-full px-3 py-2.5 text-xs font-sans min-h-[44px] border border-primary/20 rounded-xs bg-white text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                    required
                  >
                    <option value="">Select Department...</option>
                    {DEPARTMENTS.map(d => <option key={d} value={d}>{d} Eng.</option>)}
                  </select>
                </div>

                <div>
                  <label htmlFor="level-select" className="block text-xs font-semibold uppercase tracking-wider text-primary/80 mb-1.5">
                    Level
                  </label>
                  <select 
                    id="level-select"
                    value={level} 
                    onChange={e => setLevel(e.target.value)} 
                    className="block w-full px-3 py-2.5 text-xs font-sans min-h-[44px] border border-primary/20 rounded-xs bg-white text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                    required
                  >
                    <option value="">Select Level...</option>
                    {['100', '200', '300', '400', '500'].map(l => <option key={l} value={l}>{l} Level</option>)}
                  </select>
                </div>
              </div>

              <Input
                label="Email Address"
                type="email"
                id="signup-email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="student@example.com"
                required
              />

              <Input
                label="Active Phone Number (WhatsApp Enabled)"
                type="tel"
                id="signup-phone"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="08012345678"
                error={phone.length > 0 && !NIGERIAN_PHONE_PATTERN.test(phone) ? 'Enter valid Nigerian phone (e.g. 080...)' : undefined}
                required
              />

              <Input
                label="Create Portal Password (Min. 6 Characters)"
                type="password"
                id="signup-password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Min. 6 alphanumeric characters"
                error={password.length > 0 && password.length < 6 ? 'Password must contain at least 6 characters.' : undefined}
                required
              />

              <div className="flex gap-3 pt-3">
                <Button onClick={() => setStep(1)} variant="secondary" size="md" className="flex-1">
                  Back
                </Button>
                <Button onClick={handleNextStep} variant="primary" size="md" className="flex-[2]" disabled={!step2Valid}>
                  Review Particulars
                </Button>
              </div>
            </div>
          )}

          {/* STEP 3: REVIEW & CONFIRM */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="bg-primary/[0.02] border border-primary/15 p-5 rounded-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-primary/10">
                  <span className="font-mono text-xs uppercase tracking-wider text-primary/60 font-semibold">
                    Review Identity Card
                  </span>
                  <Badge variant="gold">Unverified</Badge>
                </div>

                <div className="space-y-1">
                  <span className="font-mono text-[10px] uppercase text-primary/50 block">Student Name</span>
                  <p className="font-serif text-lg font-bold text-primary">{fullName}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs font-sans">
                  <div>
                    <span className="font-mono text-[10px] uppercase text-primary/50 block">Matric No.</span>
                    <span className="font-mono font-bold text-primary">{matNo}</span>
                  </div>
                  <div>
                    <span className="font-mono text-[10px] uppercase text-primary/50 block">Cadre</span>
                    <span className="font-semibold text-primary">{department} Eng. ({level}L)</span>
                  </div>
                  <div>
                    <span className="font-mono text-[10px] uppercase text-primary/50 block">Email Address</span>
                    <span className="text-primary/80 break-all">{email}</span>
                  </div>
                  <div>
                    <span className="font-mono text-[10px] uppercase text-primary/50 block">Phone</span>
                    <span className="font-mono text-primary/80">{phone}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button onClick={() => setStep(2)} variant="secondary" size="md" className="flex-1" disabled={loading}>
                  Edit Details
                </Button>
                <Button onClick={handleSignup} variant="primary" size="md" className="flex-[2]" isLoading={loading} disabled={loading}>
                  Confirm & Create Profile
                </Button>
              </div>
            </div>
          )}

        </Card>
      </div>

    </div>
  )
}
