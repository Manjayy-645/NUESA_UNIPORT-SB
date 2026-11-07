'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X, UserCircle, LayoutDashboard, ArrowRight, Zap } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/Button'

export function PublicNavigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const pathname = usePathname()
  const supabase = createClient()

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setIsLoggedIn(!!session)
    }
    
    checkUser()
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session)
    })
    
    return () => subscription.unsubscribe()
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  // Close menu on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Programmes', href: '/programmes' },
    { name: 'Staff & Faculty', href: '/staff' },
    { name: 'About Department', href: '/about' },
    { name: 'Directory', href: '/directory' },
    { name: 'Activities', href: '/activities' },
    { name: 'Documents Hub', href: '/documents' },
  ]

  return (
    <header role="banner" className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-2xs transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Institutional Crest & Brandmark */}
          <div className="flex items-center gap-3.5">
            <Link 
              href="/" 
              className="flex items-center gap-3.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-lg p-1" 
              aria-label="Department of Electrical & Electronics Engineering, UniPort"
            >
              <div className="flex items-center -space-x-2 shrink-0">
                <Image 
                  src="/uniport-logo.jpg" 
                  alt="University of Port Harcourt Crest" 
                  width={42} 
                  height={42} 
                  className="rounded-full object-cover border-2 border-white shadow-xs relative z-10 bg-white" 
                />
                <Image 
                  src="/eee-logo.svg" 
                  alt="Department Crest" 
                  width={42} 
                  height={42} 
                  className="rounded-full object-contain border-2 border-white shadow-xs relative z-20 bg-[#0A192F]" 
                />
              </div>
              <div className="text-left">
                <span className="font-extrabold text-base sm:text-lg tracking-tight block text-[#0A192F] group-hover:text-blue-600 transition-colors leading-tight">
                  Electrical &amp; Electronics Engineering
                </span>
                <span className="text-[11px] text-slate-500 font-bold tracking-wider uppercase block">
                  Faculty of Engineering &bull; UniPort
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav aria-label="Main Navigation" className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link 
                  key={link.name} 
                  href={link.href}
                  className={`text-xs font-bold uppercase tracking-wider px-3.5 py-2 transition-all relative rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 ${
                    isActive 
                      ? 'text-blue-600 font-extrabold bg-blue-50/80' 
                      : 'text-slate-700 hover:text-blue-700 hover:bg-slate-100/70'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-3.5 right-3.5 h-0.5 bg-blue-600 rounded-full" aria-hidden="true" />
                  )}
                </Link>
              )
            })}
          </nav>

          {/* Action Hub / Portal Trigger */}
          <div className="hidden sm:flex items-center gap-3">
            {isLoggedIn ? (
              <Link href="/portal">
                <Button variant="primary" size="sm" className="gap-2 font-bold tracking-wide">
                  <LayoutDashboard size={15} aria-hidden="true" />
                  <span>Student Portal</span>
                </Button>
              </Link>
            ) : (
              <div className="flex items-center gap-2.5">
                <Link href="/login">
                  <Button variant="secondary" size="sm" className="gap-1.5 font-bold">
                    <UserCircle size={15} aria-hidden="true" />
                    <span>Portal Login</span>
                  </Button>
                </Link>
                <Link href="/portal/dues">
                  <Button variant="primary" size="sm" className="gap-1.5 font-bold">
                    <Zap size={14} className="fill-current" aria-hidden="true" />
                    <span>Pay Dues</span>
                    <ArrowRight size={13} aria-hidden="true" />
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="lg:hidden flex items-center">
            <button 
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-800 hover:text-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 p-2 rounded-lg min-h-[44px] min-w-[44px] flex items-center justify-center transition-colors"
              aria-label={isOpen ? "Close main menu" : "Open main menu"}
              aria-expanded={isOpen}
              aria-controls="mobile-navigation-drawer"
            >
              {isOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Backdrop Overlay */}
      <div 
        className={`fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-40 lg:hidden transition-opacity duration-300 ease-out ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />
      
      {/* Mobile Drawer */}
      <aside 
        id="mobile-navigation-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Site Navigation"
        className={`fixed inset-y-0 right-0 w-full max-w-xs bg-white border-l border-slate-200 z-50 transform transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] lg:hidden flex flex-col justify-between ${
          isOpen ? 'translate-x-0 shadow-2xl' : 'translate-x-full'
        }`}
      >
        <div>
          <div className="p-5 flex items-center justify-between border-b border-slate-100 bg-slate-50/50">
            <div>
              <span className="font-extrabold text-base text-[#0A192F] block">Electrical &amp; Electronics</span>
              <span className="text-[11px] text-slate-500 font-bold uppercase tracking-wider block">UniPort Portal Menu</span>
            </div>
            <button 
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-2 min-h-[44px] min-w-[44px] text-slate-600 hover:text-blue-600 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 flex items-center justify-center transition-colors"
              aria-label="Close navigation menu"
            >
              <X size={22} aria-hidden="true" />
            </button>
          </div>
          
          <nav aria-label="Mobile Navigation Links" className="py-4 px-3 space-y-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center justify-between px-4 py-3 rounded-lg text-sm font-bold tracking-wide min-h-[44px] transition-colors ${
                    isActive 
                      ? 'bg-blue-50 text-blue-700 font-extrabold' 
                      : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <span>{link.name}</span>
                  {isActive && <span className="w-2 h-2 rounded-full bg-blue-600" aria-hidden="true" />}
                </Link>
              )
            })}
          </nav>
        </div>
        
        <div className="p-5 border-t border-slate-200 pb-safe bg-slate-50 space-y-2.5">
          {isLoggedIn ? (
            <Link
              href="/portal"
              onClick={() => setIsOpen(false)}
              className="w-full block"
            >
              <Button variant="primary" fullWidth className="gap-2 font-bold">
                <LayoutDashboard size={17} aria-hidden="true" />
                <span>Student Portal</span>
              </Button>
            </Link>
          ) : (
            <>
              <Link
                href="/login"
                onClick={() => setIsOpen(false)}
                className="w-full block"
              >
                <Button variant="secondary" fullWidth className="gap-2 font-bold">
                  <UserCircle size={17} aria-hidden="true" />
                  <span>Portal Login</span>
                </Button>
              </Link>
              <Link
                href="/portal/dues"
                onClick={() => setIsOpen(false)}
                className="w-full block"
              >
                <Button variant="primary" fullWidth className="gap-2 font-bold">
                  <span>Pay Departmental Dues</span>
                  <ArrowRight size={15} aria-hidden="true" />
                </Button>
              </Link>
            </>
          )}
        </div>
      </aside>
    </header>
  )
}
