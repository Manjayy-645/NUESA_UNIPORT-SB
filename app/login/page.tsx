'use client'

import { useState } from 'react'
import { loginWithPassword } from '@/app/auth/actions'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.')
      return
    }
    if (!password) {
      setError('Please enter your password.')
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

          <form onSubmit={handleLogin} className="space-y-6">
            <Input
              label="Email address"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="student@example.com"
              required
            />

            <Input
              label="Password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Your password"
              required
            />

            <Button type="submit" variant="primary" fullWidth disabled={loading || !email || !password}>
              {loading ? 'Signing In...' : 'Sign In'}
            </Button>
          </form>

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
