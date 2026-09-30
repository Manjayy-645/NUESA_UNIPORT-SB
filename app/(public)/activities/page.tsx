import { createClient } from '@/lib/supabase/server'
import { Calendar as CalendarIcon, ArrowRight } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'

export default async function ActivitiesPage() {
  const supabase = await createClient()
  
  const { data: activities } = await supabase
    .from('activities')
    .select('*')
    .order('date', { ascending: false })

  return (
    <div className="bg-background min-h-screen">
      <div className="bg-white py-16 border-b border-primary/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="mb-4">Activities & Events</h1>
          <p className="text-primary/70 max-w-2xl text-lg font-sans">
            Stay updated with engineering weeks, technical seminars, sports tournaments, and community outreaches.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activities?.map((activity) => (
            <Card key={activity.id} className="overflow-hidden flex flex-col group h-full">
              <div className="h-56 bg-primary/5 relative overflow-hidden border-b border-primary/20">
                {activity.image_url ? (
                  <img src={activity.image_url} alt={activity.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-primary/5 text-primary/20">
                    <span className="font-serif font-bold text-4xl">NUESA</span>
                  </div>
                )}
                {activity.date && (
                  <div className="absolute top-4 left-4 bg-white border border-primary/20 rounded-sm overflow-hidden flex flex-col text-center w-14">
                    <div className="bg-accent text-white text-[10px] font-bold uppercase tracking-wider py-1 border-b border-primary/20">
                      {new Date(activity.date).toLocaleDateString('en-GB', { month: 'short' })}
                    </div>
                    <div className="bg-white text-primary font-bold font-serif text-xl py-1">
                      {new Date(activity.date).getDate()}
                    </div>
                  </div>
                )}
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-serif text-primary mb-3 line-clamp-2">{activity.title}</h3>
                
                {activity.date && (
                  <div className="flex items-center text-sm text-primary/60 mb-4 gap-2 font-mono">
                    <CalendarIcon size={16} className="text-primary/40" />
                    <span>{new Date(activity.date).toLocaleDateString('en-GB', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}</span>
                  </div>
                )}
                
                <p className="text-primary/70 text-sm mb-6 flex-1 line-clamp-4 font-sans">{activity.description}</p>
              </div>
            </Card>
          ))}
        </div>
        
        {(!activities || activities.length === 0) && (
          <Card className="text-center py-20 border-dashed border-primary/20">
            <h3 className="text-lg font-serif text-primary mb-1">No activities listed yet</h3>
            <p className="text-primary/60 text-sm font-sans">Check back later for upcoming faculty events.</p>
          </Card>
        )}
      </div>
    </div>
  )
}
