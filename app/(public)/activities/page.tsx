import { createClient } from '@/lib/supabase/server'
import { Calendar as CalendarIcon, Clock, MapPin, Tag } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'

export const metadata = {
  title: 'Activities & Events | SEEES UniPort',
  description: 'Official schedule of engineering symposiums, tech summits, departmental weeks, and workshops at the Department of Electrical & Electronic Engineering, University of Port Harcourt.',
}

export default async function ActivitiesPage() {
  const supabase = await createClient()
  
  const { data: activities } = await supabase
    .from('activities')
    .select('*')
    .order('date', { ascending: false })

  return (
    <div className="bg-background min-h-screen">
      
      {/* Editorial Page Header */}
      <section className="bg-white py-16 border-b border-primary/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2">
              <CalendarIcon size={16} className="text-accent" aria-hidden="true" />
              <span className="font-mono text-xs uppercase tracking-widest text-primary/60 font-semibold">
                Campus & Professional Gatherings
              </span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-primary tracking-tight">
              Activities & Engineering Events
            </h1>
            <p className="font-sans text-sm sm:text-base text-primary/75 leading-relaxed">
              Stay synchronized with SEEES seminars, technical workshops, annual Engineering Week conferences, and departmental competitions.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activities?.map((activity) => (
            <Card key={activity.id} variant="default" className="overflow-hidden flex flex-col group h-full">
              
              {/* Event Image or Monogram */}
              <div className="h-56 bg-primary/5 relative overflow-hidden border-b border-primary/10">
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
                  <div className="absolute top-4 left-4 bg-white border border-primary/20 rounded-2xs overflow-hidden flex flex-col text-center w-14 shadow-xs">
                    <div className="bg-accent text-white text-[10px] font-mono font-bold uppercase tracking-wider py-0.5 border-b border-primary/15">
                      {new Date(activity.date).toLocaleDateString('en-GB', { month: 'short' })}
                    </div>
                    <div className="bg-white text-primary font-bold font-serif text-lg py-1">
                      {new Date(activity.date).getDate()}
                    </div>
                  </div>
                )}
              </div>

              {/* Event Details */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-serif text-primary font-semibold mb-2 group-hover:text-accent transition-colors">
                    {activity.title}
                  </h3>
                  
                  {activity.date && (
                    <div className="flex items-center text-xs text-primary/60 mb-4 gap-2 font-mono">
                      <Clock size={14} className="text-accent" aria-hidden="true" />
                      <span>{new Date(activity.date).toLocaleDateString('en-GB', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}</span>
                    </div>
                  )}
                  
                  <p className="text-primary/75 text-xs font-sans leading-relaxed mb-6">
                    {activity.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-primary/10 flex items-center justify-between text-xs font-mono text-primary/50">
                  <span>Department of Electrical &amp; Electronic Engineering</span>
                  <Badge variant="outline">SEEES UniPort</Badge>
                </div>
              </div>

            </Card>
          ))}
        </div>
        
        {(!activities || activities.length === 0) && (
          <div className="text-center py-20 border border-dashed border-primary/20 rounded-xs bg-white p-8">
            <h3 className="text-lg font-serif text-primary font-semibold mb-1">No activities listed yet</h3>
            <p className="text-primary/60 text-xs font-sans">Check back later for upcoming SEEES departmental symposiums and schedules.</p>
          </div>
        )}

      </div>
    </div>
  )
}
