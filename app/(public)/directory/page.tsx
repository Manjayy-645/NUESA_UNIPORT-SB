import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { User, Users, GraduationCap, Award, ChevronRight } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'

export const metadata = {
  title: 'Official Directory | Electrical & Electronics Engineering UniPort',
  description: 'Official directory of Principal Officers, Head of Department, Academic Staff Advisors, and Student Leaders of the Department of Electrical & Electronics Engineering, University of Port Harcourt.',
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
    { id: 'student', label: 'Student Representatives', countDesc: 'Course Reps & Executives' },
  ]

  return (
    <div className="bg-slate-50 min-h-screen">
      
      {/* Editorial Page Header */}
      <section className="bg-white py-16 sm:py-20 border-b border-slate-200 circuit-grid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-200 rounded-full text-xs font-bold text-blue-700">
              <Users size={14} className="text-blue-600" aria-hidden="true" />
              <span className="font-mono uppercase tracking-wider">
                Departmental Governance
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0A192F] tracking-tight">
              Official Leadership Directory
            </h1>
            <p className="font-sans text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              Explore the academic administration, departmental leadership, and student representatives stewarding the Department of Electrical &amp; Electronics Engineering.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Asymmetrical Filter Toolbar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10 pb-6 border-b border-slate-200">
          
          {/* Main Category Tabs */}
          <nav aria-label="Directory Categories" className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide w-full md:w-auto">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id
              return (
                <Link
                  key={tab.id}
                  href={`/directory?tab=${tab.id}&tenure=${tenure}`}
                  className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider rounded-lg border transition-all whitespace-nowrap min-h-[44px] flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 ${
                    isActive
                      ? 'bg-[#0A192F] text-white border-[#0A192F] shadow-xs'
                      : 'bg-white text-slate-700 border-slate-200 hover:text-blue-600 hover:border-blue-300'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {tab.label}
                </Link>
              )
            })}
          </nav>
          
          {/* Tenure Switcher (Current vs Past) */}
          <div className="flex items-center gap-1 bg-white border border-slate-200 p-1 rounded-lg w-full sm:w-auto shadow-2xs">
            <Link 
              href={`/directory?tab=${activeTab}&tenure=current`}
              className={`px-4 py-1.5 text-xs font-mono uppercase tracking-wider font-bold rounded-md flex-1 sm:flex-initial text-center min-h-[36px] flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 ${
                tenure === 'current' 
                  ? 'bg-blue-600 text-white shadow-2xs' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Current Tenure
            </Link>
            <Link 
              href={`/directory?tab=${activeTab}&tenure=past`}
              className={`px-4 py-1.5 text-xs font-mono uppercase tracking-wider font-bold rounded-md flex-1 sm:flex-initial text-center min-h-[36px] flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 ${
                tenure === 'past' 
                  ? 'bg-blue-600 text-white shadow-2xs' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Past Leadership
            </Link>
          </div>

        </div>

        {/* Directory Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {people?.map((person) => (
            <Card key={person.id} variant="interactive" className="overflow-hidden flex flex-col group h-full">
              
              {/* Photo or Monogram Placeholder */}
              <div className="h-60 bg-slate-100 flex items-center justify-center relative border-b border-slate-200 overflow-hidden">
                {person.photo_url ? (
                  <img 
                    src={person.photo_url} 
                    alt={person.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-slate-100 text-slate-400">
                    <User size={48} strokeWidth={1.5} />
                    <span className="font-mono text-[10px] uppercase tracking-widest mt-2 font-bold">UniPort FOE</span>
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
                  <h3 className="text-base font-bold leading-snug mb-1 text-[#0A192F] group-hover:text-blue-600 transition-colors">
                    {person.name}
                  </h3>
                  <p className="font-sans text-xs font-bold text-blue-600 uppercase tracking-wide mb-3">
                    {person.rank_or_position}
                  </p>
                </div>
                
                <div className="pt-3 border-t border-slate-100 mt-auto flex flex-col gap-1.5">
                  {person.department && (
                    <Badge variant="neutral" className="self-start">
                      {person.department} Engineering
                    </Badge>
                  )}
                  {person.sub_association && (
                    <span className="text-slate-400 font-mono text-[10px] uppercase tracking-wider block">
                      {person.sub_association}
                    </span>
                  )}
                </div>
              </div>

            </Card>
          ))}
        </div>
        
        {(!people || people.length === 0) && (
          <div className="text-center py-20 border-2 border-dashed border-slate-200 rounded-2xl bg-white p-8">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mx-auto mb-3 border border-blue-200">
              <Users size={24} />
            </div>
            <h3 className="text-lg font-bold text-[#0A192F] mb-1">No profiles found</h3>
            <p className="font-sans text-xs text-slate-500">There are currently no active directory records listed for this filter.</p>
          </div>
        )}

      </div>
    </div>
  )
}
