'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X, UserCircle, LayoutDashboard, ArrowRight } from 'lucide-react'
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
    { name: 'Staff & Qualifications', href: '/staff' },
    { name: 'About', href: '/about' },
    { name: 'Directory', href: '/directory' },
    { name: 'Activities', href: '/activities' },
    { name: 'Documents Hub', href: '/documents' },
  ]

  return (
    <header role="banner" className="sticky top-0 z-50 bg-white/95 backdrop-blur-md text-primary border-b border-primary/10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-18">
          
          {/* Institutional Crest & Brandmark */}
          <div className="flex items-center gap-3.5">
            <Link href="/" className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-xs p-1" aria-label="SEEES UniPort Home">
              <div className="flex items-center -space-x-1.5 overflow-hidden">
                <Image 
                  src="/uniport-logo.jpg" 
                  alt="University of Port Harcourt Crest" 
                  width={36} 
                  height={36} 
                  className="rounded-full object-cover border border-primary/15 relative z-10 bg-white" 
                />
                <Image 
                  src="/seees-logo.svg" 
                  alt="SEEES Logo" 
                  width={36} 
                  height={36} 
                  className="rounded-full object-contain border border-primary/15 relative z-20 bg-primary" 
                />
              </div>
              <div className="text-left">
                <span className="font-serif font-bold text-lg tracking-tight block text-primary group-hover:text-accent transition-colors leading-tight">
                  SEEES UniPort
                </span>
                <span className="text-[10px] text-primary/60 font-semibold tracking-wider uppercase block font-sans">
                  Department of Electrical &amp; Electronic Engineering
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
                  className={`text-xs font-semibold uppercase tracking-wider px-3.5 py-2 transition-colors relative rounded-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                    isActive 
                      ? 'text-accent font-bold' 
                      : 'text-primary/75 hover:text-primary hover:bg-primary/5'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-3.5 right-3.5 h-0.5 bg-accent" aria-hidden="true" />
                  )}
                </Link>
              )
            })}
          </nav>

          {/* Action Hub / Portal Trigger */}
          <div className="hidden sm:flex items-center gap-3">
            {isLoggedIn ? (
              <Link href="/portal">
                <Button variant="primary" size="sm" className="gap-2 font-sans font-semibold tracking-wide">
                  <LayoutDashboard size={15} aria-hidden="true" />
                  <span>Student Portal</span>
                </Button>
              </Link>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/login">
                  <Button variant="secondary" size="sm" className="gap-1.5 font-sans font-semibold">
                    <UserCircle size={15} aria-hidden="true" />
                    <span>Sign In</span>
                  </Button>
                </Link>
                <Link href="/portal/dues">
                  <Button variant="primary" size="sm" className="gap-1.5 font-sans font-semibold">
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
              className="text-primary hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent p-2 rounded-sm min-h-[44px] min-w-[44px] flex items-center justify-center transition-colors"
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
        className={`fixed inset-0 bg-primary/40 backdrop-blur-xs z-40 lg:hidden transition-opacity duration-300 ease-out ${
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
        className={`fixed inset-y-0 right-0 w-full max-w-xs bg-white border-l border-primary/10 z-50 transform transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] lg:hidden flex flex-col justify-between ${
          isOpen ? 'translate-x-0 shadow-2xl' : 'translate-x-full'
        }`}
      >
        <div>
          <div className="p-5 flex items-center justify-between border-b border-primary/10">
            <div>
              <span className="font-serif font-bold text-base text-primary block">SEEES UniPort</span>
              <span className="text-[10px] text-primary/60 uppercase tracking-wider block font-sans">Navigation Menu</span>
            </div>
            <button 
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-2 min-h-[44px] min-w-[44px] text-primary/70 hover:text-accent rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent flex items-center justify-center transition-colors"
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
                  className={`flex items-center justify-between px-4 py-3 rounded-sm text-sm font-semibold tracking-wide min-h-[44px] transition-colors ${
                    isActive 
                      ? 'bg-accent/10 text-accent-dark font-bold' 
                      : 'text-primary/80 hover:bg-primary/5 hover:text-primary'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <span>{link.name}</span>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-accent" aria-hidden="true" />}
                </Link>
              )
            })}
          </nav>
        </div>
        
        <div className="p-5 border-t border-primary/10 pb-safe bg-primary/[0.02] space-y-2.5">
          {isLoggedIn ? (
            <Link
              href="/portal"
              onClick={() => setIsOpen(false)}
              className="w-full block"
            >
              <Button variant="primary" fullWidth className="gap-2">
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
                <Button variant="secondary" fullWidth className="gap-2">
                  <UserCircle size={17} aria-hidden="true" />
                  <span>Portal Login</span>
                </Button>
              </Link>
              <Link
                href="/portal/dues"
                onClick={() => setIsOpen(false)}
                className="w-full block"
              >
                <Button variant="primary" fullWidth className="gap-2">
                  <span>Pay SEEES Dues</span>
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
