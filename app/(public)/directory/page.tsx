import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { User } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'

export default async function DirectoryPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined }
}) {
  const supabase = await createClient()
  
  const activeTab = searchParams.tab || 'faculty'
  const tenure = searchParams.tenure || 'current'
  
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

  return (
    <div className="bg-background min-h-screen">
      {/* Page Header */}
      <div className="bg-white py-16 border-b border-primary/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="mb-4">Official Directory</h1>
          <p className="text-primary/70 max-w-2xl text-lg">
            Browse through the leadership, administrative staff, and student executives of the Faculty of Engineering, University of Port Harcourt.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filters */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10 pb-6 border-b border-primary/10">
          <div className="flex w-full md:w-auto overflow-x-auto snap-x scrollbar-hide gap-2 pb-2 md:pb-0">
            <Link 
              href={`/directory?tab=faculty&tenure=${tenure}`}
              className={`px-4 py-2 text-sm font-medium rounded-md whitespace-nowrap snap-start transition-colors border min-h-[44px] flex items-center justify-center ${activeTab === 'faculty' ? 'bg-primary text-white border-primary' : 'bg-transparent text-primary hover:bg-primary/5 border-primary/20'}`}
            >
              Faculty & Departments
            </Link>
            <Link 
              href={`/directory?tab=university&tenure=${tenure}`}
              className={`px-4 py-2 text-sm font-medium rounded-md whitespace-nowrap snap-start transition-colors border min-h-[44px] flex items-center justify-center ${activeTab === 'university' ? 'bg-primary text-white border-primary' : 'bg-transparent text-primary hover:bg-primary/5 border-primary/20'}`}
            >
              Principal Officers
            </Link>
            <Link 
              href={`/directory?tab=student&tenure=${tenure}`}
              className={`px-4 py-2 text-sm font-medium rounded-md whitespace-nowrap snap-start transition-colors border min-h-[44px] flex items-center justify-center ${activeTab === 'student' ? 'bg-primary text-white border-primary' : 'bg-transparent text-primary hover:bg-primary/5 border-primary/20'}`}
            >
              Student Leaders
            </Link>
          </div>
          
          <div className="flex gap-2 w-full md:w-auto border border-primary/20 p-1 rounded-md">
            <Link 
              href={`/directory?tab=${activeTab}&tenure=current`}
              className={`px-4 py-1.5 text-sm font-medium rounded-sm flex-1 text-center min-h-[44px] flex items-center justify-center transition-colors ${tenure === 'current' ? 'bg-accent text-white' : 'text-primary/70 hover:text-primary'}`}
            >
              Current
            </Link>
            <Link 
              href={`/directory?tab=${activeTab}&tenure=past`}
              className={`px-4 py-1.5 text-sm font-medium rounded-sm flex-1 text-center min-h-[44px] flex items-center justify-center transition-colors ${tenure === 'past' ? 'bg-accent text-white' : 'text-primary/70 hover:text-primary'}`}
            >
              Past
            </Link>
          </div>
        </div>

        {/* Directory Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {people?.map((person) => (
            <Card key={person.id} className="w-full overflow-hidden flex flex-col group">
              <div className="h-56 bg-primary/5 flex items-center justify-center relative border-b border-primary/10">
                {person.photo_url ? (
                  <img src={person.photo_url} alt={person.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-primary/20">
                    <User size={64} strokeWidth={1} />
                  </div>
                )}
                {person.start_year && (
                  <div className="absolute top-3 right-3">
                    <Badge variant="gold" className="font-mono">
                      {person.start_year} - {person.end_year || 'Present'}
                    </Badge>
                  </div>
                )}
              </div>
              <div className="p-5 flex-1 flex flex-col items-start">
                <h3 className="font-serif text-lg leading-tight mb-1 text-primary">{person.name}</h3>
                <p className="text-accent text-sm font-medium mb-3">{person.rank_or_position}</p>
                
                {person.department && (
                  <Badge variant="neutral" className="mt-auto mb-2">
                    {person.department} Eng.
                  </Badge>
                )}
                
                {person.sub_association && (
                  <span className="text-primary/50 text-xs font-medium uppercase tracking-wider">{person.sub_association}</span>
                )}
              </div>
            </Card>
          ))}
        </div>
        
        {(!people || people.length === 0) && (
          <Card className="text-center py-20 border-dashed border-primary/20">
            <div className="w-16 h-16 bg-primary/5 text-primary/40 rounded-full flex items-center justify-center mx-auto mb-4 border border-primary/10">
              <User size={32} />
            </div>
            <h3 className="text-lg font-serif text-primary mb-1">No profiles found</h3>
            <p className="text-primary/60 text-sm font-sans">There are currently no records for this category.</p>
          </Card>
        )}
      </div>
    </div>
  )
}
