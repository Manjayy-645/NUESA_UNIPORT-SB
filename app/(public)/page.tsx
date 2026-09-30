import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { FileText, Calendar, GraduationCap, Megaphone } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'

export default async function HomePage() {
  const supabase = await createClient()
  
  const { data: latestActivities } = await supabase
    .from('activities')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(3)

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-background text-primary relative overflow-hidden border-b border-primary/20 py-24 lg:py-32">
        {/* Animated Blueprint Grid SVG */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="blueprint-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" 
                      className="animate-draw-grid" strokeDasharray="100" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#blueprint-grid)" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-start text-left">
          <div className="inline-block border border-primary/20 bg-white text-primary px-3 py-1 rounded-sm text-xs font-bold tracking-wide mb-8 uppercase">
            Official Website
          </div>
          <h1 className="mb-6 max-w-4xl">
            Faculty of Engineering<br/>
            <span className="text-accent">University of Port Harcourt</span>
          </h1>
          <p className="text-lg md:text-xl text-primary/80 mb-10 max-w-2xl">
            Welcome to the digital hub for the Nigerian Universities Engineering Students Association (NUESA), UniPort Chapter. Empowering students, fostering innovation, and engineering the future.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link href="/portal/dues" className="w-full sm:w-auto">
              <Button variant="primary" fullWidth>
                Pay Faculty Dues
              </Button>
            </Link>
            <Link href="/documents" className="w-full sm:w-auto">
              <Button variant="secondary" fullWidth>
                Download Timetables
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Announcements Banner */}
      <section className="bg-accent text-white py-4 border-b border-primary/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-4">
          <span className="bg-white/20 p-2 rounded-sm hidden sm:block"><Megaphone size={18} /></span>
          <div className="flex-1">
            <p className="font-sans font-medium text-sm md:text-base">
              <strong className="uppercase mr-2 tracking-wider">Notice:</strong> 2025/2026 First Semester Course Registration is now open. Ensure your dues are paid to complete clearance.
            </p>
          </div>
          <Link href="/documents" className="text-white underline text-sm font-bold whitespace-nowrap">View Calendar</Link>
        </div>
      </section>

      {/* Quick Access & Overview */}
      <section className="py-16 bg-white border-b border-primary/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            <div className="lg:col-span-7">
              <h2 className="mb-6">Welcome to NUESA UniPort</h2>
              <div className="space-y-4 text-primary/80">
                <p>
                  The Faculty of Engineering at the University of Port Harcourt stands as a beacon of academic excellence and technological innovation in Nigeria. 
                </p>
                <p>
                  Through NUESA, we coordinate student activities, bridge the gap between students and the faculty administration, and organize developmental programs that prepare our students for global engineering challenges. Explore our directory, stay updated with activities, and easily manage your academic dues through our secure portal.
                </p>
              </div>
              <Link href="/about" className="inline-block mt-8 font-medium text-accent hover:underline">Read our History & Constitution</Link>
            </div>

            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link href="/directory">
                <Card className="p-6 hover:bg-background transition-colors h-full">
                  <div className="w-10 h-10 border border-primary/20 rounded-sm flex items-center justify-center mb-4 text-primary">
                    <GraduationCap size={20} />
                  </div>
                  <h3 className="text-lg mb-1">Staff Directory</h3>
                  <p className="text-sm text-primary/60 font-sans">View Deans, HODs & Staff</p>
                </Card>
              </Link>
              
              <Link href="/documents">
                <Card className="p-6 hover:bg-background transition-colors h-full">
                  <div className="w-10 h-10 border border-primary/20 rounded-sm flex items-center justify-center mb-4 text-primary">
                    <FileText size={20} />
                  </div>
                  <h3 className="text-lg mb-1">Official Memos</h3>
                  <p className="text-sm text-primary/60 font-sans">Read latest faculty memos</p>
                </Card>
              </Link>
              
              <Link href="/documents" className="sm:col-span-2">
                <Card className="p-6 hover:bg-background transition-colors">
                  <div className="w-10 h-10 border border-primary/20 rounded-sm flex items-center justify-center mb-4 text-primary">
                    <Calendar size={20} />
                  </div>
                  <h3 className="text-lg mb-1">Timetables & Calendars</h3>
                  <p className="text-sm text-primary/60 font-sans">Download current session schedules</p>
                </Card>
              </Link>
            </div>
            
          </div>
        </div>
      </section>

      {/* Latest Activities */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="mb-2">Latest Activities</h2>
              <p className="text-primary/70">Events, seminars, and updates from the faculty.</p>
            </div>
            <Link href="/activities" className="hidden sm:inline-block font-medium text-accent hover:underline">View All</Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {latestActivities?.map((activity) => (
              <Card key={activity.id} className="overflow-hidden flex flex-col group">
                <div className="h-48 bg-primary/5 relative overflow-hidden border-b border-primary/20">
                  {activity.image_url ? (
                    <img src={activity.image_url} alt={activity.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-primary/20">
                      <span className="font-serif font-bold text-3xl">NUESA</span>
                    </div>
                  )}
                  {activity.date && (
                    <div className="absolute top-4 right-4 bg-white border border-primary/20 text-primary font-mono text-xs px-2 py-1 rounded-sm">
                      {new Date(activity.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </div>
                  )}
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl mb-3 line-clamp-2">{activity.title}</h3>
                  <p className="text-sm text-primary/70 line-clamp-3 mb-6 flex-1 font-sans">{activity.description}</p>
                  <span className="text-accent text-sm font-medium tracking-wide uppercase">Read Details</span>
                </div>
              </Card>
            ))}
            
            {(!latestActivities || latestActivities.length === 0) && (
              <div className="col-span-3 text-center py-12 text-primary/50 border border-primary/20 rounded-lg">
                No recent activities posted.
              </div>
            )}
          </div>
          <div className="mt-8 sm:hidden">
            <Link href="/activities">
              <Button variant="secondary" fullWidth>View All Activities</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
