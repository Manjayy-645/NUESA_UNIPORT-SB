import { PublicNavigation } from '@/components/PublicNavigation'
import Link from 'next/link'
import { Mail, MapPin, ArrowUpRight, GraduationCap } from 'lucide-react'

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col bg-white text-blue-900 selection:bg-red-600/20">
      {/* Skip to Main Content Link for WCAG Keyboard Navigation */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 px-4 py-2 bg-red-600 text-white font-medium text-sm rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-900"
      >
        Skip to main content
      </a>

      <PublicNavigation />
      
      <main id="main-content" tabIndex={-1} className="flex-grow focus:outline-none">
        {children}
      </main>

      {/* Institutional Editorial Footer */}
      <footer role="contentinfo" className="bg-blue-900 text-white border-t-4 border-red-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-white/10">
            
            {/* SEEES Identity & Charter */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-red-600 rounded-2xs inline-block" aria-hidden="true" />
                <span className="font-mono text-xs uppercase tracking-widest text-red-400 font-semibold">
                  Departmental Chapter
                </span>
              </div>
              <h2 className="font-serif text-2xl lg:text-3xl font-bold text-white tracking-tight leading-tight">
                Society of Electrical and Electronic Engineering Students
              </h2>
              <p className="text-white/70 text-sm font-sans max-w-md leading-relaxed">
                University of Port Harcourt Chapter. Fostering rigorous academic culture, technical innovation, professional development, and student leadership across all accredited Electrical &amp; Electronic Engineering options.
              </p>
              <address className="not-italic text-xs text-white/60 flex items-start gap-2 pt-2">
                <MapPin size={16} className="text-red-500 shrink-0 mt-0.5" aria-hidden="true" />
                <span>Department of Electrical &amp; Electronic Engineering, Choba Park, University of Port Harcourt, PMB 5323, Rivers State, Nigeria.</span>
              </address>
            </div>

            {/* Academic Specializations */}
            <div className="lg:col-span-3 space-y-3">
              <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-white/90 pb-1 border-b border-white/10 inline-block">
                Academic Options (B.Eng)
              </h3>
              <ul className="space-y-1.5 text-xs text-white/70 font-sans">
                <li><Link href="/programmes" className="hover:text-red-400 transition-colors">Power Systems &amp; High Voltage</Link></li>
                <li><Link href="/programmes" className="hover:text-red-400 transition-colors">Telecommunications &amp; RF Engineering</Link></li>
                <li><Link href="/programmes" className="hover:text-red-400 transition-colors">Electronics &amp; Embedded Systems</Link></li>
                <li><Link href="/programmes" className="hover:text-red-400 transition-colors">Control Systems &amp; Industrial Automation</Link></li>
                <li><Link href="/programmes" className="hover:text-red-400 transition-colors">Computer Engineering &amp; Robotics</Link></li>
              </ul>
            </div>

            {/* Quick Access */}
            <div className="lg:col-span-2 space-y-3">
              <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-white/90 pb-1 border-b border-white/10 inline-block">
                Academic Links
              </h3>
              <ul className="space-y-2 text-xs text-white/75 font-sans">
                <li>
                  <Link href="/programmes" className="hover:text-red-400 transition-colors">
                    B.Eng Programmes
                  </Link>
                </li>
                <li>
                  <Link href="/staff" className="hover:text-red-400 transition-colors">
                    Staff &amp; Qualifications
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-red-400 transition-colors">
                    About SEEES
                  </Link>
                </li>
                <li>
                  <Link href="/directory" className="hover:text-red-400 transition-colors">
                    Official Directory
                  </Link>
                </li>
                <li>
                  <Link href="/documents" className="hover:text-red-400 transition-colors">
                    Timetables &amp; Calendars
                  </Link>
                </li>
                <li>
                  <Link href="/portal/dues" className="hover:text-red-400 transition-colors inline-flex items-center gap-1 font-semibold text-red-400">
                    Pay Departmental Dues <ArrowUpRight size={12} aria-hidden="true" />
                  </Link>
                </li>
              </ul>
            </div>

            {/* Institutional Verification & Contact */}
            <div className="lg:col-span-2 space-y-3">
              <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-white/90 pb-1 border-b border-white/10 inline-block">
                Verification &amp; Contact
              </h3>
              <div className="space-y-2.5 text-xs font-sans text-white/70">
                <p>Verify official SEEES dues payment receipts via the digital QR-code scanner or receipt validator.</p>
                <div className="flex items-center gap-2 pt-1 text-white/80">
                  <Mail size={14} className="text-red-500" aria-hidden="true" />
                  <a href="mailto:contact@seeesuniport.edu.ng" className="hover:text-red-400 underline transition-colors">
                    contact@seeesuniport.edu.ng
                  </a>
                </div>
                <div className="pt-2">
                  <Link 
                    href="/login" 
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/90 hover:text-white bg-white/10 hover:bg-white/15 px-3 py-2 rounded-xs border border-white/15 transition-colors"
                  >
                    <GraduationCap size={14} aria-hidden="true" />
                    <span>Portal Authentication</span>
                  </Link>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Colophon */}
          <div className="pt-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs font-mono text-white/50">
            <p>
              &copy; {new Date().getFullYear()} SEEES UniPort Chapter. All rights reserved.
            </p>
            <p className="tracking-wide">
              Motto: <span className="text-white/80 font-serif italic">"Wiring the Future through Innovation &amp; Excellence"</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
