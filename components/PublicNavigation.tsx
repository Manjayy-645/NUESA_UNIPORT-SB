'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, UserCircle, LayoutDashboard } from 'lucide-react'
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

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Directory', href: '/directory' },
    { name: 'Activities', href: '/activities' },
    { name: 'Documents Hub', href: '/documents' },
  ]

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md text-primary border-b border-primary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center min-h-[64px] py-2">
          {/* Logo / Brand */}
          <div className="flex-shrink-0 flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center p-1">
              <div className="w-full h-full rounded-full border border-primary/20 bg-primary text-white text-xs flex items-center justify-center font-serif font-bold">NP</div>
            </div>
            <div>
              <Link href="/" className="font-bold text-xl tracking-tight block font-serif">NUESA UniPort</Link>
              <span className="text-[10px] text-primary/70 font-medium tracking-wider uppercase">Faculty of Engineering</span>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-accent p-2 ${pathname === link.href ? 'text-accent' : 'text-primary/80'}`}
              >
                {link.name}
              </Link>
            ))}
            
            {isLoggedIn ? (
              <Link href="/portal">
                <Button variant="primary" className="gap-2">
                  <LayoutDashboard size={18} />
                  Dashboard
                </Button>
              </Link>
            ) : (
              <Link href="/login">
                <Button variant="primary" className="gap-2">
                  <UserCircle size={18} />
                  Portal Login
                </Button>
              </Link>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsOpen(true)}
              className="text-primary hover:text-accent focus:outline-none p-2 min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Open menu"
            >
              <Menu size={28} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer (Slide from Right) */}
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-primary/20 backdrop-blur-sm z-40 transition-opacity duration-300 md:hidden ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />
      
      {/* Drawer */}
      <div className={`fixed inset-y-0 right-0 w-[80%] max-w-sm bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out md:hidden flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-4 flex items-center justify-between border-b border-primary/10">
          <span className="font-serif font-bold text-lg text-primary">Menu</span>
          <button 
            onClick={() => setIsOpen(false)}
            className="p-2 min-h-[44px] min-w-[44px] text-primary/70 hover:text-accent flex items-center justify-center"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto py-4 px-4 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`block px-4 py-4 rounded-md text-base font-medium min-h-[44px] ${pathname === link.href ? 'bg-primary/5 text-accent' : 'text-primary/80 hover:bg-primary/5'}`}
            >
              {link.name}
            </Link>
          ))}
        </div>
        
        <div className="p-4 border-t border-primary/10 pb-safe">
          {isLoggedIn ? (
            <Link
              href="/portal"
              onClick={() => setIsOpen(false)}
              className="block w-full"
            >
              <Button variant="primary" fullWidth className="gap-2 min-h-[52px] text-base">
                <LayoutDashboard size={20} />
                Dashboard
              </Button>
            </Link>
          ) : (
            <Link
              href="/login"
              onClick={() => setIsOpen(false)}
              className="block w-full"
            >
              <Button variant="primary" fullWidth className="gap-2 min-h-[52px] text-base">
                <UserCircle size={20} />
                Portal Login
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}
