'use client'

import { useState } from 'react'
import { loginWithPassword } from '@/app/auth/actions'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Lock, Mail, AlertCircle, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Badge } from '@/components/ui/Badge'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please provide a valid university email address.')
      return
    }
    if (!password) {
      setError('Please provide your account password.')
      return
    }
    
    setLoading(true)
    setError(null)
    
    const res = await loginWithPassword(email, password)
    
    if (res.error) {
      setError(res.error)
      setLoading(false)
      return
    }
    
    router.push('/portal')
  }

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* Subtle Engineering Grid Motif */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="login-grid" width="32" height="32" patternUnits="userSpaceOnUse">
              <path d="M 32 0 L 0 0 0 32" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-primary" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#login-grid)" />
        </svg>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 space-y-4 text-center">
        <div className="inline-block">
          <Link 
            href="/" 
            className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-primary/60 hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-xs p-1"
          >
            <ArrowLeft size={14} aria-hidden="true" />
            <span>Return to Public Portal</span>
          </Link>
        </div>

        <div className="w-12 h-12 bg-white border border-blue-900/20 rounded-xs flex items-center justify-center font-serif font-black text-sm text-blue-900 mx-auto shadow-xs border-t-2 border-t-red-600">
          SE
        </div>

        <div>
          <h1 className="font-serif text-3xl font-bold text-blue-900 tracking-tight">
            SEEES Portal Sign In
          </h1>
          <p className="font-sans text-xs sm:text-sm text-blue-900/70 mt-1">
            Department of Electrical &amp; Electronic Engineering &bull; University of Port Harcourt
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
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

          <form onSubmit={handleLogin} className="space-y-5" noValidate>
            <Input
              label="Student Email Address"
              type="email"
              id="student-email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="e.g. yourname@uniport.edu.ng"
              autoComplete="email"
              required
            />

            <Input
              label="Portal Password"
              type="password"
              id="student-password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••••••"
              autoComplete="current-password"
              required
            />

            <div className="pt-2">
              <Button 
                type="submit" 
                variant="primary" 
                fullWidth 
                size="md"
                isLoading={loading}
                disabled={loading || !email || !password}
                className="gap-2 font-sans font-semibold tracking-wide"
              >
                <span>Authenticate & Enter</span>
                <ArrowRight size={15} aria-hidden="true" />
              </Button>
            </div>
          </form>

          <div className="pt-6 border-t border-primary/10 text-center space-y-2">
            <p className="text-xs font-sans text-primary/70">
              New undergraduate or direct entry student?
            </p>
            <Link 
              href="/signup" 
              className="inline-flex items-center gap-1 font-mono text-xs uppercase font-bold text-accent hover:text-accent-dark transition-colors"
            >
              <span>Create Your Student Account &rarr;</span>
            </Link>
          </div>
        </Card>
      </div>

    </div>
  )
}
