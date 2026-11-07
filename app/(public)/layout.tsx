import { PublicNavigation } from '@/components/PublicNavigation'
import Link from 'next/link'
import { Mail, MapPin, ArrowUpRight, GraduationCap, ShieldCheck } from 'lucide-react'

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-blue-600/20 selection:text-blue-900">
      {/* Skip to Main Content Link for WCAG Keyboard Navigation */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 px-4 py-2 bg-blue-600 text-white font-bold text-sm rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-900 shadow-md"
      >
        Skip to main content
      </a>

      <PublicNavigation />
      
      <main id="main-content" tabIndex={-1} className="flex-grow focus:outline-none">
        {children}
      </main>

      {/* Institutional Editorial Footer */}
      <footer role="contentinfo" className="bg-[#0A192F] text-white relative">
        {/* Harmonious Engineering Accent Strip */}
        <div className="h-1 bg-gradient-to-r from-blue-600 via-amber-400 to-blue-600" aria-hidden="true" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-white/10">
            
            {/* Department Identity & Charter */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-amber-400 rounded-full inline-block" aria-hidden="true" />
                <span className="font-mono text-xs uppercase tracking-widest text-amber-400 font-bold">
                  Faculty of Engineering &bull; UniPort
                </span>
              </div>
              <h2 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight leading-tight">
                Department of Electrical &amp; Electronics Engineering
              </h2>
              <p className="text-slate-300 text-sm font-sans max-w-md leading-relaxed">
                University of Port Harcourt. Accredited by COREN &amp; NUC. Committed to academic excellence, state-of-the-art laboratory research, sustainable energy breakthroughs, and training world-class engineers.
              </p>
              <address className="not-italic text-xs text-slate-400 flex items-start gap-2 pt-2">
                <MapPin size={16} className="text-amber-400 shrink-0 mt-0.5" aria-hidden="true" />
                <span>Department of Electrical &amp; Electronics Engineering, Faculty of Engineering Complex, Choba Park, University of Port Harcourt, PMB 5323, Rivers State, Nigeria.</span>
              </address>
            </div>

            {/* Academic Specializations */}
            <div className="lg:col-span-3 space-y-3">
              <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-amber-400 pb-1 border-b border-white/10 inline-block">
                Academic Disciplines (B.Eng)
              </h3>
              <ul className="space-y-2 text-xs text-slate-300 font-sans font-medium">
                <li><Link href="/programmes" className="hover:text-amber-300 transition-colors">Power Systems &amp; High Voltage</Link></li>
                <li><Link href="/programmes" className="hover:text-amber-300 transition-colors">Telecommunications &amp; RF Engineering</Link></li>
                <li><Link href="/programmes" className="hover:text-amber-300 transition-colors">Electronics &amp; Embedded Systems</Link></li>
                <li><Link href="/programmes" className="hover:text-amber-300 transition-colors">Control Systems &amp; Industrial Automation</Link></li>
                <li><Link href="/programmes" className="hover:text-amber-300 transition-colors">Computer Engineering &amp; Robotics</Link></li>
              </ul>
            </div>

            {/* Quick Access */}
            <div className="lg:col-span-2 space-y-3">
              <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-amber-400 pb-1 border-b border-white/10 inline-block">
                Department Links
              </h3>
              <ul className="space-y-2 text-xs text-slate-300 font-sans font-medium">
                <li>
                  <Link href="/programmes" className="hover:text-amber-300 transition-colors">
                    B.Eng Programmes
                  </Link>
                </li>
                <li>
                  <Link href="/staff" className="hover:text-amber-300 transition-colors">
                    Staff &amp; Faculty
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-amber-300 transition-colors">
                    About Department
                  </Link>
                </li>
                <li>
                  <Link href="/directory" className="hover:text-amber-300 transition-colors">
                    Official Directory
                  </Link>
                </li>
                <li>
                  <Link href="/documents" className="hover:text-amber-300 transition-colors">
                    Timetables &amp; Calendars
                  </Link>
                </li>
                <li>
                  <Link href="/portal/dues" className="hover:text-amber-300 transition-colors inline-flex items-center gap-1 font-bold text-amber-400">
                    Pay Departmental Dues <ArrowUpRight size={12} aria-hidden="true" />
                  </Link>
                </li>
              </ul>
            </div>

            {/* Institutional Verification & Contact */}
            <div className="lg:col-span-2 space-y-3">
              <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-amber-400 pb-1 border-b border-white/10 inline-block">
                Verification &amp; Inquiries
              </h3>
              <div className="space-y-2.5 text-xs font-sans text-slate-300">
                <p>Validate official departmental clearance receipts via the digital cryptographic validator.</p>
                <div className="flex items-center gap-2 pt-1 text-slate-200">
                  <Mail size={14} className="text-amber-400" aria-hidden="true" />
                  <a href="mailto:eee.dept@uniport.edu.ng" className="hover:text-amber-300 underline transition-colors">
                    eee.dept@uniport.edu.ng
                  </a>
                </div>
                <div className="pt-2">
                  <Link 
                    href="/login" 
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 px-3.5 py-2 rounded-lg border border-blue-500/40 shadow-xs transition-colors"
                  >
                    <GraduationCap size={15} aria-hidden="true" />
                    <span>Student Portal Login</span>
                  </Link>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Colophon */}
          <div className="pt-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs font-mono text-slate-400">
            <p>
              &copy; {new Date().getFullYear()} Department of Electrical &amp; Electronics Engineering, UniPort. All rights reserved.
            </p>
            <p className="tracking-wide">
              Motto: <span className="text-amber-300 font-sans italic font-bold">"Powering Innovation, Engineering the Future"</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
