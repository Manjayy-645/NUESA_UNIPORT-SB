import { createAdminClient } from '@/lib/supabase/admin'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { GraduationCap, Search, CheckCircle2, AlertCircle, Phone, Mail } from 'lucide-react'

export const metadata = {
  title: 'Student Roster | SEEES Back-Office',
  description: 'Manage registered students, review clearance status, and audit matriculation records.',
}

const DEPARTMENTS = [
  'Chemical', 
  'Civil', 
  'Electrical', 
  'Mechanical', 
  'Petroleum', 
  'Mechatronics', 
  'Electronics'
]

export default async function AdminStudentsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const resolvedSearchParams = await searchParams
  const supabase = createAdminClient()
  
  const deptFilter = (resolvedSearchParams.dept as string) || ''
  const levelFilter = (resolvedSearchParams.level as string) || ''
  const search = (resolvedSearchParams.search as string) || ''
  
  let query = supabase
    .from('students')
    .select('*, payments(id, status, session)')
    .order('created_at', { ascending: false })
    
  if (deptFilter) query = query.eq('department', deptFilter)
  if (levelFilter) query = query.eq('level', levelFilter)
  
  const { data: students } = await query
  
  let filteredStudents = students || []
  if (search) {
    const s = search.toLowerCase()
    filteredStudents = filteredStudents.filter(st => 
      st.full_name.toLowerCase().includes(s) ||
      st.mat_no.toLowerCase().includes(s) ||
      (st.phone && st.phone.toLowerCase().includes(s))
    )
  }

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-8">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-primary/10">
        <div>
          <div className="inline-flex items-center gap-2 mb-1.5">
            <GraduationCap size={16} className="text-accent" aria-hidden="true" />
            <span className="font-mono text-xs uppercase tracking-widest text-primary/60 font-semibold">
              Enrollment & Matriculation Registry
            </span>
          </div>
          <h1 className="font-serif text-3xl font-bold text-primary tracking-tight">
            Registered Engineering Students
          </h1>
          <p className="font-sans text-xs sm:text-sm text-primary/70 mt-1">
            Browse verified matriculation profiles across all seven accredited departments.
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs">
          <Badge variant="neutral">
            {filteredStudents.length} Students Listed
          </Badge>
        </div>
      </div>

      {/* Filter Toolbar */}
      <Card variant="default" className="p-4">
        <form method="GET" action="/admin/students" className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
          <div className="sm:col-span-5 relative">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-primary/40" aria-hidden="true" />
            <input 
              type="text" 
              name="search"
              defaultValue={search}
              placeholder="Search by Mat No, Full Name, or Phone..." 
              className="w-full pl-9 pr-3 py-2 text-xs font-sans border border-primary/20 rounded-xs bg-white text-primary placeholder:text-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent min-h-[40px]"
            />
          </div>

          <div className="sm:col-span-3">
            <select 
              name="dept" 
              defaultValue={deptFilter}
              className="w-full px-3 py-2 text-xs font-sans border border-primary/20 rounded-xs bg-white text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent min-h-[40px]"
            >
              <option value="">All Departments</option>
              {DEPARTMENTS.map(d => (
                <option key={d} value={d}>{d} Engineering</option>
              ))}
            </select>
          </div>

          <div className="sm:col-span-2">
            <select 
              name="level" 
              defaultValue={levelFilter}
              className="w-full px-3 py-2 text-xs font-sans border border-primary/20 rounded-xs bg-white text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent min-h-[40px]"
            >
              <option value="">All Levels</option>
              <option value="100">100 Level</option>
              <option value="200">200 Level</option>
              <option value="300">300 Level</option>
              <option value="400">400 Level</option>
              <option value="500">500 Level</option>
            </select>
          </div>

          <div className="sm:col-span-2 flex gap-2">
            <Button type="submit" variant="primary" size="sm" fullWidth className="font-sans font-semibold">
              Filter
            </Button>
            {(search || deptFilter || levelFilter) && (
              <a href="/admin/students" className="inline-flex">
                <Button variant="ghost" size="sm" className="px-2 text-xs font-mono">
                  Reset
                </Button>
              </a>
            )}
          </div>
        </form>
      </Card>

      {/* Student Roster Table */}
      <Card variant="default" className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans whitespace-nowrap">
            <thead className="bg-primary/5 border-b border-primary/10 font-mono uppercase text-primary/60">
              <tr>
                <th scope="col" className="px-5 py-3.5">Student Name</th>
                <th scope="col" className="px-5 py-3.5">Matriculation No.</th>
                <th scope="col" className="px-5 py-3.5">Department</th>
                <th scope="col" className="px-5 py-3.5">Level</th>
                <th scope="col" className="px-5 py-3.5">Phone</th>
                <th scope="col" className="px-5 py-3.5">2025/2026 Dues Status</th>
                <th scope="col" className="px-5 py-3.5">Registered On</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-primary/10">
              {filteredStudents.map(student => {
                const duesPaid = student.payments?.some(
                  (p: { session: string; status: string }) => p.session === '2025/2026' && p.status === 'success'
                )

                return (
                  <tr key={student.id} className="hover:bg-primary/[0.02] transition-colors">
                    <td className="px-5 py-4">
                      <p className="font-serif font-bold text-sm text-primary">{student.full_name}</p>
                    </td>
                    <td className="px-5 py-4 font-mono font-bold text-primary">
                      {student.mat_no}
                    </td>
                    <td className="px-5 py-4 font-medium text-primary">
                      {student.department} Engineering
                    </td>
                    <td className="px-5 py-4 font-mono">
                      {student.level}L
                    </td>
                    <td className="px-5 py-4 font-mono text-primary/70">
                      {student.phone || '-'}
                    </td>
                    <td className="px-5 py-4">
                      {duesPaid ? (
                        <Badge variant="success" className="gap-1">
                          <CheckCircle2 size={11} aria-hidden="true" />
                          <span>Cleared</span>
                        </Badge>
                      ) : (
                        <Badge variant="gold" className="gap-1">
                          <AlertCircle size={11} aria-hidden="true" />
                          <span>Unpaid</span>
                        </Badge>
                      )}
                    </td>
                    <td className="px-5 py-4 font-mono text-[11px] text-primary/60">
                      {student.created_at ? new Date(student.created_at).toLocaleDateString('en-GB') : '-'}
                    </td>
                  </tr>
                )
              })}

              {filteredStudents.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-5 py-12 text-center text-primary/60 font-sans">
                    No student records match the current filter selection.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

    </div>
  )
}
