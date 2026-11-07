'use client'

import { useState } from 'react'
import { loginWithPassword } from '@/app/auth/actions'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
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
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden circuit-grid">
      
      {/* Subtle Ambient Radial Glow */}
      <div 
        aria-hidden="true" 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl pointer-events-none" 
      />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 space-y-4 text-center">
        <div className="inline-block">
          <Link 
            href="/" 
            className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-slate-500 hover:text-blue-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-md p-1 font-bold"
          >
            <ArrowLeft size={14} aria-hidden="true" />
            <span>Return to Public Portal</span>
          </Link>
        </div>

        <div className="flex justify-center">
          <div className="w-14 h-14 bg-[#0A192F] text-amber-400 rounded-2xl flex items-center justify-center font-black text-base shadow-card border border-blue-900/40">
            EEE
          </div>
        </div>

        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0A192F] tracking-tight">
            Student Portal Sign In
          </h1>
          <p className="font-sans text-xs sm:text-sm text-slate-500 mt-1 font-medium">
            Department of Electrical &amp; Electronics Engineering &bull; UniPort
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <Card variant="elevated" className="py-8 px-6 sm:px-10 space-y-6">
          
          {error && (
            <div 
              role="alert" 
              className="bg-red-50 border border-red-200 p-3.5 rounded-xl flex items-start gap-2.5 text-xs text-red-700 font-sans leading-relaxed font-bold"
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
                className="gap-2 font-bold tracking-wide shadow-sm shadow-blue-600/30"
              >
                <span>Authenticate &amp; Enter</span>
                <ArrowRight size={15} aria-hidden="true" />
              </Button>
            </div>
          </form>

          <div className="pt-6 border-t border-slate-100 text-center space-y-2">
            <p className="text-xs font-sans text-slate-500">
              New undergraduate or direct entry student?
            </p>
            <Link 
              href="/signup" 
              className="inline-flex items-center gap-1 font-mono text-xs uppercase font-bold text-blue-600 hover:text-blue-800 transition-colors"
            >
              <span>Create Your Student Account &rarr;</span>
            </Link>
          </div>
        </Card>
      </div>

    </div>
  )
}
