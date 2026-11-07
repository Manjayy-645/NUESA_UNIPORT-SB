import { createClient } from '@/lib/supabase/server'
import { Calendar as CalendarIcon, Clock, MapPin, Tag } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'

export const metadata = {
  title: 'Activities & Events | Electrical & Electronics Engineering UniPort',
  description: 'Official schedule of engineering symposiums, tech summits, departmental weeks, and workshops at the Department of Electrical & Electronics Engineering, University of Port Harcourt.',
}

export default async function ActivitiesPage() {
  const supabase = await createClient()
  
  const { data: activities } = await supabase
    .from('activities')
    .select('*')
    .order('date', { ascending: false })

  return (
    <div className="bg-slate-50 min-h-screen">
      
      {/* Editorial Page Header */}
      <section className="bg-white py-16 sm:py-20 border-b border-slate-200 circuit-grid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-200 rounded-full text-xs font-bold text-blue-700">
              <CalendarIcon size={14} className="text-blue-600" aria-hidden="true" />
              <span className="font-mono uppercase tracking-wider">
                Campus &amp; Professional Gatherings
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0A192F] tracking-tight">
              Activities &amp; Engineering Events
            </h1>
            <p className="font-sans text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              Stay synchronized with departmental seminars, technical workshops, annual Engineering Week conferences, industrial lectures, and student competitions.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activities?.map((activity) => (
            <Card key={activity.id} variant="interactive" className="overflow-hidden flex flex-col group h-full">
              
              {/* Event Image or Monogram */}
              <div className="h-56 bg-slate-100 relative overflow-hidden border-b border-slate-200">
                {activity.image_url ? (
                  <img 
                    src={activity.image_url} 
                    alt={activity.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#0A192F] to-[#1E3A8A] text-white">
                    <span className="font-black text-4xl tracking-tight text-white/90">EEE</span>
                    <span className="font-mono text-[11px] tracking-widest uppercase mt-1 text-amber-400 font-bold">UniPort</span>
                  </div>
                )}
                
                {activity.date && (
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-xs border border-slate-200 rounded-lg overflow-hidden flex flex-col text-center w-14 shadow-sm">
                    <div className="bg-blue-600 text-white text-[10px] font-mono font-bold uppercase tracking-wider py-0.5">
                      {new Date(activity.date).toLocaleDateString('en-GB', { month: 'short' })}
                    </div>
                    <div className="bg-white text-[#0A192F] font-black text-lg py-1">
                      {new Date(activity.date).getDate()}
                    </div>
                  </div>
                )}
              </div>

              {/* Event Details */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-[#0A192F] mb-2 group-hover:text-blue-600 transition-colors">
                    {activity.title}
                  </h3>
                  
                  {activity.date && (
                    <div className="flex items-center text-xs text-slate-500 mb-4 gap-2 font-mono">
                      <Clock size={14} className="text-blue-600" aria-hidden="true" />
                      <span>{new Date(activity.date).toLocaleDateString('en-GB', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}</span>
                    </div>
                  )}
                  
                  <p className="text-slate-600 text-xs font-sans leading-relaxed mb-6 font-normal">
                    {activity.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-mono text-slate-500">
                  <span className="text-[11px] truncate max-w-[180px]">Dept. of Electrical &amp; Electronics</span>
                  <Badge variant="accent">EEE UniPort</Badge>
                </div>
              </div>

            </Card>
          ))}
        </div>
        
        {(!activities || activities.length === 0) && (
          <div className="text-center py-20 border-2 border-dashed border-slate-200 rounded-2xl bg-white p-8">
            <h3 className="text-lg font-bold text-[#0A192F] mb-1">No activities listed yet</h3>
            <p className="text-slate-500 text-xs font-sans">Check back later for upcoming departmental symposiums, guest lectures, and schedules.</p>
          </div>
        )}

      </div>
    </div>
  )
}
