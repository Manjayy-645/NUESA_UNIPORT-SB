import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { FileText, Download, Calendar, ExternalLink } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'

export default async function DocumentsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined }
}) {
  const supabase = await createClient()
  const activeCategory = searchParams.category || 'all'
  
  let query = supabase
    .from('documents')
    .select('*')
    .eq('is_active', true)
    .order('published_at', { ascending: false })
    
  if (activeCategory !== 'all') {
    query = query.eq('category', activeCategory)
  }
  
  const { data: documents } = await query

  const getCategoryLabel = (cat: string) => {
    switch(cat) {
      case 'academic_calendar': return 'Academic Calendar'
      case 'lecture_timetable': return 'Lecture Timetable'
      case 'exams_timetable': return 'Exams Timetable'
      case 'memo': return 'Official Memo'
      default: return cat
    }
  }

  const getCategoryIcon = (cat: string) => {
    switch(cat) {
      case 'academic_calendar': return <Calendar size={20} className="text-primary" />
      case 'lecture_timetable': return <Calendar size={20} className="text-primary" />
      case 'exams_timetable': return <Calendar size={20} className="text-primary" />
      case 'memo': return <FileText size={20} className="text-primary" />
      default: return <FileText size={20} />
    }
  }

  return (
    <div className="bg-background min-h-screen">
      <div className="bg-white py-16 border-b border-primary/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="mb-4">Documents Hub</h1>
          <p className="text-primary/70 max-w-2xl text-lg font-sans">
            Access official academic calendars, lecture and exam timetables, and faculty memos.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-10 border-b border-primary/10 snap-x scrollbar-hide">
          <Link 
            href="/documents"
            className={`px-4 py-2 text-sm font-medium rounded-md whitespace-nowrap snap-start transition-colors border min-h-[44px] flex items-center justify-center ${activeCategory === 'all' ? 'bg-primary text-white border-primary' : 'bg-transparent text-primary hover:bg-primary/5 border-primary/20'}`}
          >
            All Documents
          </Link>
          <Link 
            href="/documents?category=academic_calendar"
            className={`px-4 py-2 text-sm font-medium rounded-md whitespace-nowrap snap-start transition-colors border min-h-[44px] flex items-center justify-center ${activeCategory === 'academic_calendar' ? 'bg-primary text-white border-primary' : 'bg-transparent text-primary hover:bg-primary/5 border-primary/20'}`}
          >
            Academic Calendars
          </Link>
          <Link 
            href="/documents?category=lecture_timetable"
            className={`px-4 py-2 text-sm font-medium rounded-md whitespace-nowrap snap-start transition-colors border min-h-[44px] flex items-center justify-center ${activeCategory === 'lecture_timetable' ? 'bg-primary text-white border-primary' : 'bg-transparent text-primary hover:bg-primary/5 border-primary/20'}`}
          >
            Lecture Timetables
          </Link>
          <Link 
            href="/documents?category=exams_timetable"
            className={`px-4 py-2 text-sm font-medium rounded-md whitespace-nowrap snap-start transition-colors border min-h-[44px] flex items-center justify-center ${activeCategory === 'exams_timetable' ? 'bg-primary text-white border-primary' : 'bg-transparent text-primary hover:bg-primary/5 border-primary/20'}`}
          >
            Exams Timetables
          </Link>
          <Link 
            href="/documents?category=memo"
            className={`px-4 py-2 text-sm font-medium rounded-md whitespace-nowrap snap-start transition-colors border min-h-[44px] flex items-center justify-center ${activeCategory === 'memo' ? 'bg-primary text-white border-primary' : 'bg-transparent text-primary hover:bg-primary/5 border-primary/20'}`}
          >
            Official Memos
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {documents?.map((doc) => (
            <Card key={doc.id} className="p-6 flex flex-col group hover:border-accent/40 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-primary/5 rounded-md border border-primary/10 group-hover:bg-accent/10 group-hover:border-accent/20 transition-colors">
                  {getCategoryIcon(doc.category)}
                </div>
                <div className="text-right">
                  <Badge variant="neutral" className="font-mono text-[10px]">
                    Rev {doc.revision_no}
                  </Badge>
                </div>
              </div>
              
              <h3 className="font-bold text-primary font-serif text-lg mb-2 line-clamp-2">{doc.title}</h3>
              
              <div className="flex items-center text-xs text-primary/60 mb-6 gap-3 font-sans">
                <span className="font-medium bg-primary/5 border border-primary/10 px-2 py-1 rounded-sm text-primary">{getCategoryLabel(doc.category)}</span>
                {doc.session && <span>Session: {doc.session}</span>}
                {doc.version_label && <span>&bull; {doc.version_label}</span>}
              </div>
              
              <div className="mt-auto pt-4 border-t border-primary/10 flex gap-3">
                <a 
                  href={doc.file_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-[3]"
                >
                  <Button variant="primary" fullWidth className="gap-2">
                    <ExternalLink size={16} /> Open
                  </Button>
                </a>
                <a 
                  href={doc.file_url} 
                  download
                  className="flex-[1]"
                  title="Download PDF"
                >
                  <Button variant="secondary" fullWidth>
                    <Download size={16} />
                  </Button>
                </a>
              </div>
            </Card>
          ))}
        </div>
        
        {(!documents || documents.length === 0) && (
          <Card className="text-center py-20 border-dashed border-primary/20">
            <div className="w-16 h-16 bg-primary/5 text-primary/40 rounded-full flex items-center justify-center mx-auto mb-4 border border-primary/10">
              <FileText size={32} />
            </div>
            <h3 className="text-lg font-serif text-primary mb-1">No documents found</h3>
            <p className="text-primary/60 text-sm font-sans">No files have been published in this category yet.</p>
          </Card>
        )}
      </div>
    </div>
  )
}
