import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { FileText, Download, Calendar, ExternalLink, Filter, Clock } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'

export const metadata = {
  title: 'Documents Hub | Electrical & Electronics Engineering UniPort',
  description: 'Official repository of academic calendars, lecture schedules, examination timetables, and departmental administrative memos at the Department of Electrical & Electronics Engineering, UniPort.',
}

export default async function DocumentsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>
}) {
  const resolvedSearchParams = await searchParams
  const supabase = await createClient()
  const activeCategory = resolvedSearchParams.category || 'all'
  
  let query = supabase
    .from('documents')
    .select('*')
    .eq('is_active', true)
    .order('published_at', { ascending: false })
    
  if (activeCategory !== 'all') {
    query = query.eq('category', activeCategory)
  }
  
  const { data: documents } = await query

  const categories = [
    { id: 'all', label: 'All Documents' },
    { id: 'academic_calendar', label: 'Academic Calendars' },
    { id: 'lecture_timetable', label: 'Lecture Timetables' },
    { id: 'exams_timetable', label: 'Exams Timetables' },
    { id: 'memo', label: 'Official Memos' },
  ]

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
      case 'academic_calendar': return <Calendar size={18} className="text-blue-600" />
      case 'lecture_timetable': return <Clock size={18} className="text-blue-600" />
      case 'exams_timetable': return <Calendar size={18} className="text-blue-600" />
      case 'memo': return <FileText size={18} className="text-blue-600" />
      default: return <FileText size={18} />
    }
  }

  return (
    <div className="bg-slate-50 min-h-screen">
      
      {/* Editorial Page Header */}
      <section className="bg-white py-16 sm:py-20 border-b border-slate-200 circuit-grid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-200 rounded-full text-xs font-bold text-blue-700">
              <FileText size={14} className="text-blue-600" aria-hidden="true" />
              <span className="font-mono uppercase tracking-wider">
                Official Archives &amp; Circulars
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0A192F] tracking-tight">
              Academic Documents Hub
            </h1>
            <p className="font-sans text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              Certified academic calendars, lecture and exam schedules, circulars, and departmental memos published by the HOD’s Office and Departmental Academic Board.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Category Filters Toolbar */}
        <nav aria-label="Document Categories" className="flex gap-2 overflow-x-auto pb-4 mb-10 border-b border-slate-200 scrollbar-hide">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id
            const href = cat.id === 'all' ? '/documents' : `/documents?category=${cat.id}`
            return (
              <Link 
                key={cat.id}
                href={href}
                className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider rounded-lg whitespace-nowrap transition-all border min-h-[44px] flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 ${
                  isActive 
                    ? 'bg-[#0A192F] text-white border-[#0A192F] shadow-xs' 
                    : 'bg-white text-slate-700 border-slate-200 hover:text-blue-600 hover:border-blue-300'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                {cat.label}
              </Link>
            )
          })}
        </nav>

        {/* Document Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {documents?.map((doc) => (
            <Card key={doc.id} variant="interactive" className="p-6 flex flex-col justify-between group">
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div className="p-2.5 bg-blue-50 rounded-xl border border-blue-200 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    {getCategoryIcon(doc.category)}
                  </div>
                  <Badge variant="neutral" className="font-mono text-[10px] font-bold">
                    Rev. {doc.revision_no || 1}
                  </Badge>
                </div>
                
                <h3 className="text-base font-bold text-[#0A192F] mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {doc.title}
                </h3>
                
                <div className="flex flex-wrap items-center text-xs text-slate-500 mb-6 gap-2 font-mono">
                  <span className="font-bold text-[#0A192F] bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-md">
                    {getCategoryLabel(doc.category)}
                  </span>
                  {doc.session && <span>Session: {doc.session}</span>}
                  {doc.version_label && <span>&bull; {doc.version_label}</span>}
                </div>
              </div>
              
              <div className="pt-4 border-t border-slate-100 flex items-center gap-2">
                <a 
                  href={doc.file_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-1"
                >
                  <Button variant="primary" size="sm" fullWidth className="gap-1.5 font-bold">
                    <ExternalLink size={14} aria-hidden="true" />
                    <span>View Document</span>
                  </Button>
                </a>
                <a 
                  href={doc.file_url} 
                  download
                  title="Download Document"
                  className="shrink-0"
                >
                  <Button variant="secondary" size="sm" className="px-3 font-bold">
                    <Download size={14} aria-hidden="true" />
                  </Button>
                </a>
              </div>
            </Card>
          ))}
        </div>
        
        {(!documents || documents.length === 0) && (
          <div className="text-center py-20 border-2 border-dashed border-slate-200 rounded-2xl bg-white p-8">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mx-auto mb-3 border border-blue-200">
              <FileText size={24} />
            </div>
            <h3 className="text-lg font-bold text-[#0A192F] mb-1">No documents available</h3>
            <p className="font-sans text-xs text-slate-500">No official files have been uploaded in this category for the active session.</p>
          </div>
        )}

      </div>
    </div>
  )
}
