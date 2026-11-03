import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { User, Users, GraduationCap, Award, ChevronRight } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'

export const metadata = {
  title: 'Official Directory | SEEES UniPort',
  description: 'Official directory of Principal Officers, Heads of Department, and Student Leaders of the Department of Electrical & Electronic Engineering, University of Port Harcourt.',
}

export default async function DirectoryPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>
}) {
  const resolvedSearchParams = await searchParams
  const supabase = await createClient()
  
  const activeTab = resolvedSearchParams.tab || 'faculty'
  const tenure = resolvedSearchParams.tenure || 'current'
  
  let hierarchyFilter: string[] = []
  
  if (activeTab === 'university') {
    hierarchyFilter = ['university_principal_officer', 'dean_student_affairs']
  } else if (activeTab === 'faculty') {
    hierarchyFilter = ['faculty_dean', 'department_hod', 'staff_advisor_faculty', 'staff_advisor_dept', 'lecturer']
  } else if (activeTab === 'student') {
    hierarchyFilter = ['student_leader_nans', 'student_leader_faculty', 'student_leader_dept']
  }

  const { data: people } = await supabase
    .from('people')
    .select('*')
    .in('hierarchy', hierarchyFilter)
    .eq('tenure_status', tenure)
    .order('display_order', { ascending: true })

  const tabs = [
    { id: 'faculty', label: 'Department & Faculty', countDesc: 'HOD & Academic Staff' },
    { id: 'university', label: 'Principal Officers', countDesc: 'University Leadership' },
    { id: 'student', label: 'Student Leaders', countDesc: 'SEEES Executives' },
  ]

  return (
    <div className="bg-background min-h-screen">
      
      {/* Editorial Page Header */}
      <section className="bg-white py-16 border-b border-primary/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2">
              <Users size={16} className="text-accent" aria-hidden="true" />
              <span className="font-mono text-xs uppercase tracking-widest text-primary/60 font-semibold">
                Departmental Governance
              </span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-primary tracking-tight">
              Official Leadership Directory
            </h1>
            <p className="font-sans text-sm sm:text-base text-primary/75 leading-relaxed">
              Explore the academic administration, departmental leadership, and student executive councils stewarding the Department of Electrical &amp; Electronic Engineering.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Asymmetrical Filter Toolbar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10 pb-6 border-b border-primary/10">
          
          {/* Main Category Tabs */}
          <nav aria-label="Directory Categories" className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide w-full md:w-auto">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id
              return (
                <Link
                  key={tab.id}
                  href={`/directory?tab=${tab.id}&tenure=${tenure}`}
                  className={`px-4 py-2.5 text-xs font-semibold uppercase tracking-wider rounded-xs border transition-colors whitespace-nowrap min-h-[44px] flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                    isActive
                      ? 'bg-primary text-white border-primary'
                      : 'bg-white text-primary/75 border-primary/20 hover:text-primary hover:border-primary/40'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {tab.label}
                </Link>
              )
            })}
          </nav>
          
          {/* Tenure Switcher (Current vs Past) */}
          <div className="flex items-center gap-1 bg-white border border-primary/20 p-1 rounded-xs w-full sm:w-auto">
            <Link 
              href={`/directory?tab=${activeTab}&tenure=current`}
              className={`px-4 py-1.5 text-xs font-mono uppercase tracking-wider font-semibold rounded-2xs flex-1 sm:flex-initial text-center min-h-[36px] flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                tenure === 'current' 
                  ? 'bg-accent text-white' 
                  : 'text-primary/70 hover:text-primary'
              }`}
            >
              Current Tenure
            </Link>
            <Link 
              href={`/directory?tab=${activeTab}&tenure=past`}
              className={`px-4 py-1.5 text-xs font-mono uppercase tracking-wider font-semibold rounded-2xs flex-1 sm:flex-initial text-center min-h-[36px] flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                tenure === 'past' 
                  ? 'bg-accent text-white' 
                  : 'text-primary/70 hover:text-primary'
              }`}
            >
              Past Leadership
            </Link>
          </div>

        </div>

        {/* Directory Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {people?.map((person) => (
            <Card key={person.id} variant="default" className="overflow-hidden flex flex-col group h-full">
              
              {/* Photo or Monogram Placeholder */}
              <div className="h-60 bg-primary/5 flex items-center justify-center relative border-b border-primary/10 overflow-hidden">
                {person.photo_url ? (
                  <img 
                    src={person.photo_url} 
                    alt={person.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-primary/[0.03] text-primary/25">
                    <User size={48} strokeWidth={1.5} />
                    <span className="font-mono text-[10px] uppercase tracking-widest mt-2">UniPort FOE</span>
                  </div>
                )}
                {person.start_year && (
                  <div className="absolute top-3 right-3">
                    <Badge variant="gold">
                      {person.start_year} &ndash; {person.end_year || 'Present'}
                    </Badge>
                  </div>
                )}
              </div>

              {/* Profile Details */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-base font-semibold leading-snug mb-1 text-primary group-hover:text-accent transition-colors">
                    {person.name}
                  </h3>
                  <p className="font-sans text-xs font-semibold text-accent uppercase tracking-wide mb-3">
                    {person.rank_or_position}
                  </p>
                </div>
                
                <div className="pt-3 border-t border-primary/10 mt-auto flex flex-col gap-1.5">
                  {person.department && (
                    <Badge variant="neutral" className="self-start">
                      {person.department} Engineering
                    </Badge>
                  )}
                  {person.sub_association && (
                    <span className="text-primary/50 font-mono text-[10px] uppercase tracking-wider block">
                      {person.sub_association}
                    </span>
                  )}
                </div>
              </div>

            </Card>
          ))}
        </div>
        
        {(!people || people.length === 0) && (
          <div className="text-center py-20 border border-dashed border-primary/20 rounded-xs bg-white p-8">
            <div className="w-12 h-12 bg-primary/5 text-primary/40 rounded-xs flex items-center justify-center mx-auto mb-3 border border-primary/10">
              <Users size={24} />
            </div>
            <h3 className="font-serif text-lg font-semibold text-primary mb-1">No profiles found</h3>
            <p className="font-sans text-xs text-primary/60">There are currently no active directory records listed for this filter.</p>
          </div>
        )}

      </div>
    </div>
  )
}
