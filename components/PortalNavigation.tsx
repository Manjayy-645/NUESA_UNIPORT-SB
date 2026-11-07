'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { LayoutDashboard, CreditCard, Receipt, LogOut, Menu, X, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export function PortalNavigation() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()

  const navLinks = [
    { name: 'Dashboard', href: '/portal', icon: LayoutDashboard },
    { name: 'Pay Dues', href: '/portal/dues', icon: CreditCard },
    { name: 'My Receipts', href: '/portal/receipts', icon: Receipt },
  ]

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  return (
    <header role="banner" className="bg-[#0A192F] text-white border-b border-blue-900/40 sticky top-0 z-40 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-18">
          
          {/* Institutional Monogram & Identity */}
          <div className="flex items-center gap-6">
            <Link 
              href="/portal" 
              className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-lg p-1"
            >
              <div className="w-9 h-9 bg-blue-600 text-white rounded-lg flex items-center justify-center font-black text-xs shadow-xs border border-blue-400/30">
                EEE
              </div>
              <div>
                <span className="font-extrabold text-base tracking-tight block text-white group-hover:text-blue-400 transition-colors leading-tight">
                  EEE Department Portal
                </span>
                <span className="text-[11px] text-slate-300 font-bold uppercase tracking-wider block">
                  Electrical &amp; Electronics &bull; UniPort
                </span>
              </div>
            </Link>
            
            {/* Desktop Navigation Links */}
            <nav aria-label="Student Portal" className="hidden md:flex items-center space-x-1 pl-4 border-l border-white/15">
              {navLinks.map((item) => {
                const isActive = pathname === item.href
                const Icon = item.icon
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`inline-flex items-center gap-2 px-3.5 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                      isActive
                        ? 'bg-blue-600 text-white font-extrabold shadow-xs shadow-blue-500/20'
                        : 'text-slate-300 hover:text-white hover:bg-white/10'
                    }`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <Icon size={16} aria-hidden="true" />
                    <span>{item.name}</span>
                  </Link>
                )
              })}
            </nav>
          </div>

          {/* User Sign Out & Main Site Link */}
          <div className="hidden md:flex items-center gap-4">
            <Link 
              href="/" 
              className="text-slate-300 hover:text-white text-xs font-mono uppercase tracking-wider font-bold flex items-center gap-1.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-lg p-1.5 hover:bg-white/5"
            >
              <ArrowLeft size={14} aria-hidden="true" />
              <span>Main Website</span>
            </Link>
            <Button 
              onClick={handleSignOut} 
              variant="secondary" 
              size="sm"
              className="!border-white/20 !text-white !bg-white/5 hover:!bg-white/15 gap-1.5 text-xs font-mono uppercase tracking-wider font-bold"
            >
              <LogOut size={13} aria-hidden="true" />
              <span>Sign Out</span>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-blue-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 p-2 rounded-lg min-h-[44px] min-w-[44px] flex items-center justify-center transition-colors"
              aria-label={isOpen ? "Close portal menu" : "Open portal menu"}
              aria-expanded={isOpen}
            >
              {isOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden border-t border-white/10 bg-[#0A192F] px-4 pt-3 pb-6 space-y-3">
          <nav aria-label="Mobile Student Navigation" className="space-y-1">
            {navLinks.map((item) => {
              const isActive = pathname === item.href
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold tracking-wide transition-colors ${
                    isActive
                      ? 'bg-blue-600 text-white font-extrabold'
                      : 'text-slate-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Icon size={18} aria-hidden="true" />
                  <span>{item.name}</span>
                </Link>
              )
            })}
          </nav>

          <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
            <Link 
              href="/" 
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-300 hover:text-white px-4 py-2 font-bold"
            >
              <ArrowLeft size={14} aria-hidden="true" />
              <span>Return to Main Website</span>
            </Link>
            <Button 
              onClick={handleSignOut} 
              variant="secondary" 
              fullWidth
              className="!border-white/20 !text-white !bg-white/5 hover:!bg-white/15 gap-2 text-xs font-bold"
            >
              <LogOut size={15} aria-hidden="true" />
              <span>Sign Out</span>
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}
