import { createAdminClient } from '@/lib/supabase/admin'
import { ActivityForm } from '@/components/ActivityForm'
import { DeleteActivityButton } from '@/components/DeleteActivityButton'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Calendar, Image as ImageIcon } from 'lucide-react'

export const metadata = {
  title: 'Manage Activities | SEEES Back-Office',
  description: 'Publish and manage departmental events, seminars, and technical workshops.',
}

export default async function AdminActivitiesPage() {
  const supabase = createAdminClient()
  
  const { data: activities } = await supabase
    .from('activities')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-8">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-primary/10">
        <div>
          <div className="inline-flex items-center gap-2 mb-1.5">
            <Calendar size={16} className="text-accent" aria-hidden="true" />
            <span className="font-mono text-xs uppercase tracking-widest text-primary/60 font-semibold">
              Public Relations & Event Dispatch
            </span>
          </div>
          <h1 className="font-serif text-3xl font-bold text-primary tracking-tight">
            Faculty Events & Seminars
          </h1>
          <p className="font-sans text-xs sm:text-sm text-primary/70 mt-1">
            Dispatch announcements for Engineering Week, guest lectures, design challenges, and student gatherings.
          </p>
        </div>

        <Badge variant="neutral" className="font-mono text-xs">
          {activities?.length || 0} Total Events
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Event Creator (Cols 1-5) */}
        <div className="lg:col-span-5">
          <ActivityForm />
        </div>

        {/* Right Column: Existing Activities List (Cols 6-12) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-primary/10">
            <h2 className="font-serif text-base font-semibold text-primary">
              Published Events Feed
            </h2>
            <span className="font-mono text-xs text-primary/50">Live on Public Site</span>
          </div>

          <div className="space-y-3">
            {activities?.map((activity) => (
              <Card key={activity.id} variant="default" className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-primary/30 transition-colors">
                <div className="flex items-start gap-3.5">
                  <div className="w-14 h-14 bg-primary/5 border border-primary/15 rounded-2xs overflow-hidden shrink-0 flex items-center justify-center">
                    {activity.image_url ? (
                      <img src={activity.image_url} alt={activity.title} className="w-full h-full object-cover" />
                    ) : (
                      <ImageIcon size={20} className="text-primary/30" aria-hidden="true" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-serif text-base font-semibold text-primary leading-tight">
                      {activity.title}
                    </h3>
                    <p className="font-sans text-xs text-primary/70 line-clamp-2 mt-1 leading-relaxed">
                      {activity.description}
                    </p>
                    <div className="flex items-center gap-3 mt-2 text-[11px] font-mono text-primary/50">
                      {activity.date && (
                        <span>Date: {new Date(activity.date).toLocaleDateString('en-GB')}</span>
                      )}
                      <span>Posted: {new Date(activity.created_at).toLocaleDateString('en-GB')}</span>
                    </div>
                  </div>
                </div>

                <div className="shrink-0 self-end sm:self-center">
                  <DeleteActivityButton id={activity.id} title={activity.title} />
                </div>
              </Card>
            ))}

            {(!activities || activities.length === 0) && (
              <div className="p-12 text-center border border-dashed border-primary/20 rounded-xs bg-white">
                <p className="font-sans text-xs text-primary/60">No faculty activities have been posted yet. Use the form to publish your first event.</p>
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  )
}
