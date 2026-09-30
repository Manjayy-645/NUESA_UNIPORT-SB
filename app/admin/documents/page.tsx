import { createAdminClient } from '@/lib/supabase/admin'
import { DocumentForm } from '@/components/DocumentForm'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { FileText, Eye, Archive } from 'lucide-react'

export default async function DocumentPublisherPage() {
  const supabase = createAdminClient()
  
  const { data: documents } = await supabase
    .from('documents')
    .select('*')
    .order('published_at', { ascending: false })

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-serif text-primary font-bold mb-2">Document Publisher</h1>
        <p className="text-primary/70 font-sans">Upload and manage official faculty documents.</p>
      </div>
      
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-1">
          <Card className="p-6">
            <h2 className="text-lg font-bold mb-4 text-primary">Publish Document</h2>
            <DocumentForm />
          </Card>
        </div>
        
        <div className="xl:col-span-2">
          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm font-sans">
                <thead className="bg-primary/5 border-b border-primary/10">
                  <tr>
                    <th className="px-6 py-3 font-semibold text-primary/70">Document</th>
                    <th className="px-6 py-3 font-semibold text-primary/70">Category & Session</th>
                    <th className="px-6 py-3 font-semibold text-primary/70">Status</th>
                    <th className="px-6 py-3 font-semibold text-primary/70 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-primary/5">
                  {documents?.map(doc => (
                    <tr key={doc.id} className="hover:bg-primary/5 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-primary/10 text-primary rounded-sm shrink-0">
                            <FileText size={16} />
                          </div>
                          <div>
                            <p className="font-bold text-primary">{doc.title}</p>
                            <p className="text-primary/60 text-xs mt-0.5 font-mono">Rev {doc.revision_no} {doc.version_label && `• ${doc.version_label}`}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-medium text-primary capitalize">{doc.category.replace('_', ' ')}</p>
                        <p className="text-primary/60 text-xs mt-0.5">{doc.session}</p>
                      </td>
                      <td className="px-6 py-4">
                        <Badge variant={doc.is_active ? 'success' : 'neutral'}>
                          {doc.is_active ? 'Active' : 'Archived'}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-3">
                          <a href={doc.file_url} target="_blank" rel="noreferrer" className="text-primary/60 hover:text-accent" title="View PDF">
                            <Eye size={18} />
                          </a>
                          <button className="text-primary/60 hover:text-red-500" title="Archive">
                            <Archive size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {documents?.length === 0 && (
                    <tr>
                      <td colSpan={4} className="px-6 py-12 text-center text-primary/50">
                        <FileText size={24} className="mx-auto mb-2 opacity-50" />
                        No documents published yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
