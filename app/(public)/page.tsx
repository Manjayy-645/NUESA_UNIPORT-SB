import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { 
  FileText, 
  Calendar, 
  GraduationCap, 
  Megaphone, 
  ArrowRight, 
  ShieldCheck, 
  Compass, 
  Cpu, 
  CheckCircle2,
  Zap,
  BookOpen,
  Award
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'

export default async function HomePage() {
  const supabase = await createClient()
  
  const { data: latestActivities } = await supabase
    .from('activities')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(3)

  return (
    <div className="space-y-0">
      
      {/* Editorial Tech Hero Section */}
      <section 
        aria-label="Institutional Welcome"
        className="relative bg-white border-b border-slate-200/80 overflow-hidden py-16 sm:py-24 lg:py-28 circuit-grid"
      >
        {/* Subtle Ambient Radial Glow */}
        <div 
          aria-hidden="true" 
          className="absolute -top-32 -left-32 w-96 h-96 bg-blue-100/60 rounded-full blur-3xl pointer-events-none" 
        />
        <div 
          aria-hidden="true" 
          className="absolute top-1/2 -right-32 w-96 h-96 bg-amber-100/40 rounded-full blur-3xl pointer-events-none" 
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Primary Typographic Column (Cols 1-8) */}
            <div className="lg:col-span-8 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-blue-50/90 border border-blue-200/90 rounded-full shadow-2xs">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse" aria-hidden="true" />
                <span className="font-mono text-xs uppercase tracking-wider font-bold text-blue-900">
                  Official Departmental Portal &bull; UniPort
                </span>
              </div>

              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold sm:font-black text-[#0A192F] leading-[1.08] tracking-tight">
                Department of Electrical &amp; Electronics Engineering
                <span className="block text-blue-600 font-bold mt-2 text-2xl sm:text-4xl lg:text-5xl">
                  University of Port Harcourt
                </span>
              </h1>

              <p className="font-sans text-base sm:text-lg lg:text-xl text-slate-600 max-w-2xl leading-relaxed font-normal">
                Welcome to the digital gateway for the Department of Electrical &amp; Electronics Engineering. Pioneering technical pedagogy, world-class laboratory research, and engineering the electrified future.
              </p>

              <div className="pt-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                <Link href="/portal/dues">
                  <Button variant="primary" size="lg" className="w-full sm:w-auto gap-2.5 shadow-sm shadow-blue-600/30">
                    <Zap size={18} className="fill-current" aria-hidden="true" />
                    <span>Pay Departmental Dues</span>
                    <ArrowRight size={18} aria-hidden="true" />
                  </Button>
                </Link>
                <Link href="/programmes">
                  <Button variant="secondary" size="lg" className="w-full sm:w-auto gap-2">
                    <BookOpen size={18} aria-hidden="true" />
                    <span>Programmes Offered</span>
                  </Button>
                </Link>
                <Link 
                  href="/staff" 
                  className="inline-flex items-center justify-center text-xs font-bold uppercase tracking-wider text-slate-700 hover:text-blue-600 p-2 transition-colors gap-1.5"
                >
                  <span>Staff &amp; Faculty &rarr;</span>
                </Link>
              </div>
            </div>

            {/* Statistical Matrix (Cols 9-12) */}
            <div className="lg:col-span-4 space-y-4">
              <div className="bg-white/90 backdrop-blur-sm border border-slate-200/90 p-6 sm:p-7 rounded-2xl shadow-card space-y-5">
                <div className="border-b border-slate-100 pb-4">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-slate-500 font-bold block">
                    Institutional Scope
                  </span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="font-black text-4xl text-[#0A192F]">7</span>
                    <span className="text-xs font-bold text-slate-600">Accredited Engineering Disciplines</span>
                  </div>
                </div>

                <div className="border-b border-slate-100 pb-4">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-slate-500 font-bold block">
                    Student Community
                  </span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="font-black text-4xl text-blue-600">4,500+</span>
                    <span className="text-xs font-bold text-slate-600">Undergraduate &amp; Postgraduates</span>
                  </div>
                </div>

                <div>
                  <span className="font-mono text-[11px] uppercase tracking-wider text-slate-500 font-bold block">
                    Current Session Status
                  </span>
                  <div className="flex items-center gap-2 mt-2">
                    <CheckCircle2 size={18} className="text-emerald-600 shrink-0" aria-hidden="true" />
                    <span className="font-sans text-xs font-bold text-slate-900">2025/2026 First Semester Active</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* High-Priority Official Announcement Strip */}
      <section 
        aria-label="Official Department Notice"
        className="bg-[#0A192F] text-white py-4 border-b border-blue-900/50 shadow-xs"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <span className="p-1.5 bg-amber-500 text-slate-950 rounded-md inline-flex shrink-0 font-bold" aria-hidden="true">
              <Megaphone size={15} />
            </span>
            <p className="font-sans font-medium text-slate-200">
              <strong className="font-mono uppercase text-amber-400 mr-1.5 tracking-wider font-bold">Important Notice:</strong>
              2025/2026 Academic Session course registration and departmental dues clearance is now mandatory for all levels.
            </p>
          </div>
          <Link 
            href="/documents" 
            className="font-mono text-amber-400 hover:text-white underline uppercase tracking-wider text-[11px] font-bold whitespace-nowrap self-end sm:self-center transition-colors"
          >
            Access Academic Timetable &rarr;
          </Link>
        </div>
      </section>

      {/* Core Engineering Pillars & Quick Access Grid */}
      <section 
        aria-label="Department Resources & Quick Access" 
        className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200/80"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column: Institutional Narrative */}
            <div className="lg:col-span-5 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-slate-200 rounded-full text-xs font-bold text-blue-700 shadow-2xs">
                <Compass size={15} className="text-blue-600" aria-hidden="true" />
                <span className="font-mono uppercase tracking-wider">
                  Guiding Principles &amp; Mission
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl text-[#0A192F] font-extrabold tracking-tight">
                Engineering Rigor, Technical Ingenuity.
              </h2>
              <p className="font-sans text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                Founded on the Choba campus of the University of Port Harcourt, the Department of Electrical &amp; Electronics Engineering delivers accredited, world-class technical education. We prepare engineers for international industry standards in compliance with COREN, IEEE, and the Nigerian Society of Engineers (NSE).
              </p>
              <div className="pt-2">
                <Link 
                  href="/about" 
                  className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-600 hover:text-blue-800 transition-colors"
                >
                  <span>Explore Department Heritage &amp; Accreditation</span>
                  <ArrowRight size={15} aria-hidden="true" />
                </Link>
              </div>
            </div>

            {/* Right Column: Workstation Card Triad */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              <Link href="/directory" className="group">
                <Card variant="interactive" className="p-6 h-full flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="w-11 h-11 border border-blue-200 bg-blue-50/80 rounded-xl flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-colors shadow-2xs">
                      <GraduationCap size={22} aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-[#0A192F] mb-1 group-hover:text-blue-600 transition-colors">
                        Executive &amp; Academic Directory
                      </h3>
                      <p className="font-sans text-xs text-slate-500 leading-relaxed font-normal">
                        Access contact profiles for the Dean, Head of Department (HOD), Academic Advisors, and Course Representatives.
                      </p>
                    </div>
                  </div>
                  <span className="pt-4 text-xs font-mono uppercase tracking-wider text-blue-600 font-bold flex items-center gap-1">
                    Open Directory &rarr;
                  </span>
                </Card>
              </Link>

              <Link href="/documents" className="group">
                <Card variant="interactive" className="p-6 h-full flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="w-11 h-11 border border-blue-200 bg-blue-50/80 rounded-xl flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-colors shadow-2xs">
                      <FileText size={22} aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-[#0A192F] mb-1 group-hover:text-blue-600 transition-colors">
                        Official Document Hub
                      </h3>
                      <p className="font-sans text-xs text-slate-500 leading-relaxed font-normal">
                        Certified lecture timetables, examination schedules, laboratory guidelines, and departmental memos.
                      </p>
                    </div>
                  </div>
                  <span className="pt-4 text-xs font-mono uppercase tracking-wider text-blue-600 font-bold flex items-center gap-1">
                    View Repository &rarr;
                  </span>
                </Card>
              </Link>

              <Link href="/portal/dues" className="group sm:col-span-2">
                <Card variant="interactive" className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-gradient-to-r from-blue-50/60 via-white to-amber-50/40 border-blue-200/80">
                  <div className="flex items-start sm:items-center gap-4">
                    <div className="w-12 h-12 border border-blue-300 bg-blue-600 rounded-xl flex items-center justify-center text-white shrink-0 shadow-sm shadow-blue-500/20">
                      <ShieldCheck size={24} aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-[#0A192F]">
                        Instant Departmental Dues Clearance &amp; Verification
                      </h3>
                      <p className="font-sans text-xs text-slate-600 font-normal">
                        Pay your departmental dues digitally via Paystack and receive a verifiable digital clearance receipt immediately.
                      </p>
                    </div>
                  </div>
                  <Button variant="primary" size="sm" className="shrink-0 gap-1.5 self-end sm:self-center font-bold">
                    <span>Pay ₦5,000</span>
                    <ArrowRight size={14} aria-hidden="true" />
                  </Button>
                </Card>
              </Link>

            </div>

          </div>

        </div>
      </section>

      {/* Latest Departmental Activities & Engineering Seminars */}
      <section 
        aria-label="Department Activities and Updates" 
        className="py-16 sm:py-20 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-10 pb-4 border-b border-slate-200">
            <div>
              <div className="inline-flex items-center gap-2 mb-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold">
                <Cpu size={15} className="text-blue-600" aria-hidden="true" />
                <span className="font-mono uppercase tracking-wider">
                  Campus &amp; Technical Events
                </span>
              </div>
              <h2 className="text-3xl font-extrabold text-[#0A192F] tracking-tight">
                Latest Activities &amp; Engineering Seminars
              </h2>
            </div>
            <Link 
              href="/activities" 
              className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider font-bold text-blue-600 hover:text-blue-800 transition-colors"
            >
              <span>View All Events</span>
              <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {latestActivities?.map((activity) => (
              <Card key={activity.id} variant="interactive" className="overflow-hidden flex flex-col group h-full">
                <div className="h-48 bg-slate-100 relative overflow-hidden border-b border-slate-200">
                  {activity.image_url ? (
                    <img 
                      src={activity.image_url} 
                      alt={activity.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#0A192F] to-[#1E3A8A] text-white">
                      <span className="font-black text-3xl tracking-tight text-white/90">EEE</span>
                      <span className="font-mono text-[11px] tracking-widest uppercase mt-1 text-amber-400 font-bold">UniPort</span>
                    </div>
                  )}
                  {activity.date && (
                    <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-xs border border-slate-200 text-[#0A192F] font-mono text-[11px] px-2.5 py-1 rounded-md font-bold shadow-2xs">
                      {new Date(activity.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </div>
                  )}
                </div>
                
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-[#0A192F] mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {activity.title}
                    </h3>
                    <p className="font-sans text-xs text-slate-600 line-clamp-3 leading-relaxed mb-6 font-normal">
                      {activity.description}
                    </p>
                  </div>
                  <Link 
                    href="/activities"
                    className="inline-flex items-center gap-1 text-xs font-mono uppercase tracking-wider font-bold text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <span>Read Details</span>
                    <ArrowRight size={12} aria-hidden="true" />
                  </Link>
                </div>
              </Card>
            ))}

            {(!latestActivities || latestActivities.length === 0) && (
              <div className="col-span-3 text-center py-16 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50 p-8">
                <p className="text-lg text-[#0A192F] font-bold mb-1">No activities recorded yet</p>
                <p className="font-sans text-xs text-slate-500">Check back shortly for official departmental symposiums, guest lectures, and events.</p>
              </div>
            )}
          </div>

        </div>
      </section>

    </div>
  )
}
