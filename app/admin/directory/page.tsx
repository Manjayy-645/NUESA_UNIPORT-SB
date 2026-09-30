import { createAdminClient } from '@/lib/supabase/admin'
import { DirectoryForm } from '@/components/DirectoryForm'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Users, Edit, Trash2 } from 'lucide-react'

export default async function DirectoryManagerPage() {
  const supabase = createAdminClient()
  
  const { data: people } = await supabase
    .from('people')
    .select('*')
    .order('display_order', { ascending: true })

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-serif text-primary font-bold mb-2">Directory Management</h1>
        <p className="text-primary/70 font-sans">Manage faculty leadership and student executive profiles.</p>
      </div>
      
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-1">
          <Card className="p-6">
            <h2 className="text-lg font-bold mb-4 text-primary">Add Officer</h2>
            <DirectoryForm />
          </Card>
        </div>
        
        <div className="xl:col-span-2">
          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm font-sans">
                <thead className="bg-primary/5 border-b border-primary/10">
                  <tr>
                    <th className="px-6 py-3 font-semibold text-primary/70">Name & Position</th>
                    <th className="px-6 py-3 font-semibold text-primary/70">Hierarchy</th>
                    <th className="px-6 py-3 font-semibold text-primary/70">Status</th>
                    <th className="px-6 py-3 font-semibold text-primary/70 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-primary/5">
                  {people?.map(person => (
                    <tr key={person.id} className="hover:bg-primary/5 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          {person.photo_url ? (
                            <img src={person.photo_url} alt={person.name} className="w-10 h-10 rounded-full object-cover border border-primary/20" />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                              <Users size={16} />
                            </div>
                          )}
                          <div>
                            <p className="font-bold text-primary">{person.name}</p>
                            <p className="text-primary/60 text-xs mt-0.5">{person.rank_or_position}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="bg-primary/5 border border-primary/10 text-primary/70 px-2 py-1 rounded text-xs">
                          {person.hierarchy.replace(/_/g, ' ')}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <Badge variant={person.tenure_status === 'current' ? 'gold' : 'neutral'}>
                          {person.tenure_status}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-3">
                          <button className="text-primary/60 hover:text-accent" title="Edit">
                            <Edit size={16} />
                          </button>
                          <button className="text-primary/60 hover:text-red-500" title="Delete">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {people?.length === 0 && (
                    <tr>
                      <td colSpan={4} className="px-6 py-12 text-center text-primary/50">
                        <Users size={24} className="mx-auto mb-2 opacity-50" />
                        No officers found in directory.
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
