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
  CheckCircle2 
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
      
      {/* Editorial Asymmetric Hero Section */}
      <section 
        aria-label="Institutional Welcome"
        className="relative bg-background border-b border-primary/15 overflow-hidden py-16 sm:py-24 lg:py-28"
      >
        {/* Subtle Engineering Grid Vector */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-25">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="blueprint-grid" width="48" height="48" patternUnits="userSpaceOnUse">
                <path 
                  d="M 48 0 L 0 0 0 48" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="0.5" 
                  className="animate-draw-grid text-primary" 
                  strokeDasharray="96" 
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#blueprint-grid)" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-end">
            
            {/* Primary Typographic Column (Cols 1-8) */}
            <div className="lg:col-span-8 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-primary/20 rounded-xs">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" aria-hidden="true" />
                <span className="font-mono text-xs uppercase tracking-widest font-semibold text-primary/80">
                  Official Chapter Portal &bull; UniPort
                </span>
              </div>

              <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-semibold text-primary leading-[1.05] tracking-tight">
                Department of Electrical &amp; Electronic Engineering
                <span className="block text-accent font-normal italic mt-1 sm:mt-2">
                  University of Port Harcourt
                </span>
              </h1>

              <p className="font-sans text-base sm:text-lg lg:text-xl text-primary/75 max-w-2xl leading-relaxed">
                Welcome to the digital portal for the Society of Electrical and Electronic Engineering Students (SEEES), UniPort Chapter. Powering innovation, academic rigor, and engineering the electrified future.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                <Link href="/portal/dues">
                  <Button variant="primary" size="lg" className="w-full sm:w-auto gap-2">
                    <span>Pay SEEES Departmental Dues</span>
                    <ArrowRight size={18} aria-hidden="true" />
                  </Button>
                </Link>
                <Link href="/programmes">
                  <Button variant="secondary" size="lg" className="w-full sm:w-auto gap-2">
                    <Calendar size={18} aria-hidden="true" />
                    <span>Programmes Offered</span>
                  </Button>
                </Link>
                <Link href="/staff" className="inline-flex items-center justify-center text-xs font-semibold uppercase tracking-wider text-primary/70 hover:text-accent p-2 transition-colors">
                  <span>Staff &amp; Qualifications &rarr;</span>
                </Link>
              </div>
            </div>

            {/* Asymmetrical Statistical Matrix (Cols 9-12) */}
            <div className="lg:col-span-4 space-y-4">
              <div className="bg-white border border-primary/15 p-6 rounded-sm space-y-5">
                <div className="border-b border-primary/10 pb-4">
                  <span className="font-mono text-[11px] uppercase tracking-widest text-primary/50 block">
                    Institutional Scope
                  </span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="font-serif text-3xl font-bold text-primary">7</span>
                    <span className="text-xs font-medium text-primary/70">Accredited Engineering Disciplines</span>
                  </div>
                </div>

                <div className="border-b border-primary/10 pb-4">
                  <span className="font-mono text-[11px] uppercase tracking-widest text-primary/50 block">
                    Undergraduate Community
                  </span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="font-serif text-3xl font-bold text-accent">4,500+</span>
                    <span className="text-xs font-medium text-primary/70">Registered Future Engineers</span>
                  </div>
                </div>

                <div>
                  <span className="font-mono text-[11px] uppercase tracking-widest text-primary/50 block">
                    Current Session Status
                  </span>
                  <div className="flex items-center gap-2 mt-1.5">
                    <CheckCircle2 size={16} className="text-emerald-600" aria-hidden="true" />
                    <span className="font-sans text-xs font-semibold text-primary">2025/2026 First Semester Active</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* High-Priority Official Announcement Strip */}
      <section 
        aria-label="Official Faculty Notice"
        className="bg-primary text-white py-3.5 border-b border-accent/40"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <span className="p-1.5 bg-accent text-white rounded-2xs inline-flex shrink-0" aria-hidden="true">
              <Megaphone size={14} />
            </span>
            <p className="font-sans font-medium text-white/90">
              <strong className="font-mono uppercase text-accent mr-1 tracking-wider">Notice:</strong>
              2025/2026 Academic Session course registration and departmental dues clearance is now mandatory.
            </p>
          </div>
          <Link 
            href="/documents" 
            className="font-mono text-accent hover:text-white underline uppercase tracking-wider text-[11px] font-semibold whitespace-nowrap self-end sm:self-center transition-colors"
          >
            Access Schedule &rarr;
          </Link>
        </div>
      </section>

      {/* Core Engineering Pillars & Quick Access Grid */}
      <section 
        aria-label="Engineering Capabilities & Resources" 
        className="py-16 sm:py-20 bg-white border-b border-primary/15"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column: Institutional Narrative */}
            <div className="lg:col-span-5 space-y-5">
              <div className="inline-flex items-center gap-2">
                <Compass size={16} className="text-accent" aria-hidden="true" />
                <span className="font-mono text-xs uppercase tracking-widest text-primary/60 font-semibold">
                  Guiding Principles
                </span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl text-primary font-semibold tracking-tight">
                Engineering Integrity, Technical Ingenuity.
              </h2>
              <p className="font-sans text-sm sm:text-base text-primary/75 leading-relaxed">
                Founded on the Choba campus of the University of Port Harcourt, the Department of Electrical &amp; Electronic Engineering delivers world-class technical pedagogy. SEEES provides the infrastructural bridge between departmental governance, professional councils (COREN, IEEE, NSE), and the student body.
              </p>
              <div className="pt-2">
                <Link href="/about" className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-accent hover:text-accent-dark transition-colors">
                  <span>Explore Department Heritage &amp; SEEES Charter</span>
                  <ArrowRight size={14} aria-hidden="true" />
                </Link>
              </div>
            </div>

            {/* Right Column: Workstation Card Triad */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              <Link href="/directory" className="group">
                <Card variant="interactive" className="p-6 h-full flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="w-10 h-10 border border-primary/20 bg-primary/5 rounded-xs flex items-center justify-center text-primary group-hover:bg-accent group-hover:text-white group-hover:border-accent transition-colors">
                      <GraduationCap size={20} aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="font-serif text-lg font-semibold text-primary mb-1">
                        Executive & Academic Directory
                      </h3>
                      <p className="font-sans text-xs text-primary/65 leading-relaxed">
                        Access contact profiles for the Dean, Heads of Departments, Staff Advisors, and student executives.
                      </p>
                    </div>
                  </div>
                  <span className="pt-4 text-xs font-mono uppercase tracking-wider text-accent font-semibold flex items-center gap-1">
                    Open Directory &rarr;
                  </span>
                </Card>
              </Link>

              <Link href="/documents" className="group">
                <Card variant="interactive" className="p-6 h-full flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="w-10 h-10 border border-primary/20 bg-primary/5 rounded-xs flex items-center justify-center text-primary group-hover:bg-accent group-hover:text-white group-hover:border-accent transition-colors">
                      <FileText size={20} aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="font-serif text-lg font-semibold text-primary mb-1">
                        Official Document Hub
                      </h3>
                      <p className="font-sans text-xs text-primary/65 leading-relaxed">
                        Direct downloads of certified lecture schedules, examination timetables, and administrative memos.
                      </p>
                    </div>
                  </div>
                  <span className="pt-4 text-xs font-mono uppercase tracking-wider text-accent font-semibold flex items-center gap-1">
                    View Repository &rarr;
                  </span>
                </Card>
              </Link>

              <Link href="/portal/dues" className="group sm:col-span-2">
                <Card variant="interactive" className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-primary/[0.02]">
                  <div className="flex items-start sm:items-center gap-4">
                    <div className="w-10 h-10 border border-accent/40 bg-accent/10 rounded-xs flex items-center justify-center text-accent-dark shrink-0">
                      <ShieldCheck size={20} aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="font-serif text-lg font-semibold text-primary">
                        Instant Dues Clearance & Verification
                      </h3>
                      <p className="font-sans text-xs text-primary/65">
                        Pay your SEEES departmental dues digitally via Paystack and receive a verifiable digital receipt immediately.
                      </p>
                    </div>
                  </div>
                  <Button variant="primary" size="sm" className="shrink-0 gap-1.5 self-end sm:self-center font-sans font-semibold">
                    <span>Pay ₦5,000</span>
                    <ArrowRight size={14} aria-hidden="true" />
                  </Button>
                </Card>
              </Link>

            </div>

          </div>

        </div>
      </section>

      {/* Latest Faculty Activities & Academic Gatherings */}
      <section 
        aria-label="Faculty Activities and Updates" 
        className="py-16 sm:py-20 bg-background"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-10 pb-4 border-b border-primary/10">
            <div>
              <div className="inline-flex items-center gap-2 mb-2">
                <Cpu size={16} className="text-accent" aria-hidden="true" />
                <span className="font-mono text-xs uppercase tracking-widest text-primary/60 font-semibold">
                  Field & Campus Life
                </span>
              </div>
              <h2 className="font-serif text-3xl font-semibold text-primary tracking-tight">
                Latest Activities & Engineering Seminars
              </h2>
            </div>
            <Link href="/activities" className="inline-flex items-center gap-1 text-xs font-mono uppercase tracking-wider font-semibold text-accent hover:text-accent-dark transition-colors">
              <span>View All Events</span>
              <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {latestActivities?.map((activity) => (
              <Card key={activity.id} variant="default" className="overflow-hidden flex flex-col group h-full">
                <div className="h-48 bg-primary/5 relative overflow-hidden border-b border-primary/10">
                  {activity.image_url ? (
                    <img 
                      src={activity.image_url} 
                      alt={activity.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-primary/[0.03] text-primary/20">
                      <span className="font-serif font-bold text-4xl">SEEES</span>
                      <span className="font-mono text-[10px] tracking-widest uppercase mt-1">UniPort</span>
                    </div>
                  )}
                  {activity.date && (
                    <div className="absolute top-3 right-3 bg-white border border-primary/20 text-primary font-mono text-[11px] px-2.5 py-1 rounded-2xs font-semibold">
                      {new Date(activity.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </div>
                  )}
                </div>
                
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-lg font-semibold text-primary mb-2 line-clamp-2">
                      {activity.title}
                    </h3>
                    <p className="font-sans text-xs text-primary/70 line-clamp-3 leading-relaxed mb-6">
                      {activity.description}
                    </p>
                  </div>
                  <Link 
                    href="/activities"
                    className="inline-flex items-center gap-1 text-xs font-mono uppercase tracking-wider font-semibold text-accent hover:text-accent-dark transition-colors"
                  >
                    <span>Read Details</span>
                    <ArrowRight size={12} aria-hidden="true" />
                  </Link>
                </div>
              </Card>
            ))}

            {(!latestActivities || latestActivities.length === 0) && (
              <div className="col-span-3 text-center py-16 border border-dashed border-primary/20 rounded-sm bg-white p-8">
                <p className="font-serif text-lg text-primary font-semibold mb-1">No activities recorded yet</p>
                <p className="font-sans text-xs text-primary/60">Check back shortly for official SEEES departmental symposiums and events.</p>
              </div>
            )}
          </div>

        </div>
      </section>

    </div>
  )
}
