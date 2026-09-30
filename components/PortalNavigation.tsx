'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
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
  ]

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  return (
    <div className="bg-primary text-white border-b border-primary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center gap-3">
              <div className="w-8 h-8 bg-white rounded-sm flex items-center justify-center font-serif font-bold text-primary text-sm">
                NP
              </div>
              <span className="font-bold text-lg hidden sm:block">Student Portal</span>
            </div>
            
            <div className="hidden sm:-my-px sm:ml-8 sm:flex sm:space-x-8">
              {navLinks.map((item) => {
                const isActive = pathname === item.href
                const Icon = item.icon
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`inline-flex items-center gap-2 px-1 pt-1 border-b-2 text-sm font-medium transition-colors ${
                      isActive
                        ? 'border-accent text-white'
                        : 'border-transparent text-white/70 hover:text-white hover:border-white/30'
                    }`}
                  >
                    <Icon size={18} />
                    {item.name}
                  </Link>
                )
              })}
            </div>
          </div>

          <div className="hidden sm:flex sm:items-center sm:gap-4">
            <Link href="/" className="text-white/70 hover:text-white text-sm font-medium flex items-center gap-1 transition-colors">
              <ArrowLeft size={16} /> Main Site
            </Link>
            <Button onClick={handleSignOut} variant="secondary" className="!border-white/20 !text-white hover:!bg-white/10 !px-3 !py-1.5 !text-sm">
              <LogOut size={16} className="mr-2" /> Sign Out
            </Button>
          </div>

          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white/70 hover:text-white hover:bg-primary-light focus:outline-none focus:ring-2 focus:ring-inset focus:ring-accent"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="sm:hidden bg-primary border-t border-primary/20">
          <div className="pt-2 pb-3 space-y-1">
            {navLinks.map((item) => {
              const isActive = pathname === item.href
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 pl-3 pr-4 py-3 border-l-4 text-base font-medium ${
                    isActive
                      ? 'bg-primary/50 border-accent text-white'
                      : 'border-transparent text-white/70 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <Icon size={20} />
                  {item.name}
                </Link>
              )
            })}
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 pl-3 pr-4 py-3 border-l-4 border-transparent text-base font-medium text-white/70 hover:bg-white/5 hover:text-white"
            >
              <ArrowLeft size={20} />
              Main Site
            </Link>
            <button
              onClick={() => {
                setIsOpen(false)
                handleSignOut()
              }}
              className="flex w-full items-center gap-3 pl-3 pr-4 py-3 border-l-4 border-transparent text-base font-medium text-red-400 hover:bg-white/5 hover:text-red-300"
            >
              <LogOut size={20} />
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
