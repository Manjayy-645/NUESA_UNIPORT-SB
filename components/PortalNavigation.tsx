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
    <header role="banner" className="bg-primary text-white border-b border-white/10 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Institutional Monogram & Identity */}
          <div className="flex items-center gap-6">
            <Link href="/portal" className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 rounded-xs p-1">
              <div className="w-8 h-8 bg-white text-blue-900 rounded-xs flex items-center justify-center font-serif font-black text-xs shadow-xs border border-red-600/30">
                SE
              </div>
              <div>
                <span className="font-serif font-bold text-base tracking-tight block text-white group-hover:text-red-400 transition-colors leading-tight">
                  SEEES Portal
                </span>
                <span className="text-[10px] text-white/70 font-mono tracking-wider uppercase block">
                  Elect &amp; Electronic Eng.
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
                    className={`inline-flex items-center gap-2 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 ${
                      isActive
                        ? 'bg-red-600 text-white font-bold'
                        : 'text-white/80 hover:text-white hover:bg-white/10'
                    }`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <Icon size={15} aria-hidden="true" />
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
              className="text-white/70 hover:text-white text-xs font-mono uppercase tracking-wider flex items-center gap-1.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-xs p-1"
            >
              <ArrowLeft size={14} aria-hidden="true" />
              <span>Main Website</span>
            </Link>
            <Button 
              onClick={handleSignOut} 
              variant="secondary" 
              size="sm"
              className="!border-white/20 !text-white hover:!bg-white/10 gap-1.5 text-xs font-mono uppercase tracking-wider"
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
              className="text-white/80 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent p-2 rounded-xs min-h-[44px] min-w-[44px] flex items-center justify-center transition-colors"
              aria-label={isOpen ? "Close portal menu" : "Open portal menu"}
              aria-expanded={isOpen}
            >
              {isOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden bg-primary-light border-t border-white/10 px-4 py-3 space-y-1">
          {navLinks.map((item) => {
            const isActive = pathname === item.href
            const Icon = item.icon
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xs text-xs font-semibold uppercase tracking-wider min-h-[44px] ${
                  isActive
                    ? 'bg-white/15 text-white font-bold'
                    : 'text-white/70 hover:bg-white/5 hover:text-white'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                <Icon size={18} aria-hidden="true" />
                <span>{item.name}</span>
              </Link>
            )
          })}
          <div className="pt-3 border-t border-white/10 space-y-2">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-3 py-2 text-xs font-mono uppercase tracking-wider text-white/70 hover:text-white min-h-[44px]"
            >
              <ArrowLeft size={16} aria-hidden="true" />
              <span>Main Website</span>
            </Link>
            <button
              type="button"
              onClick={() => {
                setIsOpen(false)
                handleSignOut()
              }}
              className="flex w-full items-center gap-3 px-3 py-2 text-xs font-mono uppercase tracking-wider text-red-300 hover:text-red-200 min-h-[44px]"
            >
              <LogOut size={16} aria-hidden="true" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </header>
  )
}
