import { createAdminClient } from '@/lib/supabase/admin'
import Link from 'next/link'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Users, CreditCard, FileText, Calendar } from 'lucide-react'

export default async function AdminDashboardPage() {
  const supabase = createAdminClient()
  
  // Fetch stats concurrently
  const [
    { count: studentCount },
    { data: successfulPayments },
    { count: documentCount }
  ] = await Promise.all([
    supabase.from('students').select('*', { count: 'exact', head: true }),
    supabase.from('payments').select('amount').eq('status', 'success'),
    supabase.from('documents').select('*', { count: 'exact', head: true }).eq('is_active', true)
  ])
  
  const totalDues = successfulPayments?.reduce((sum, p) => sum + Number(p.amount), 0) || 0

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-serif text-primary font-bold mb-2">Admin Dashboard</h1>
        <p className="text-primary/70">Manage students, payments, and faculty directory.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <Card className="p-6 flex flex-col justify-between hover:bg-background transition-colors">
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-xs font-medium text-primary/60 uppercase tracking-wider font-sans">Registered Students</p>
              <p className="text-4xl font-bold font-serif text-primary mt-2">{studentCount || 0}</p>
            </div>
            <div className="p-2 bg-primary/10 rounded-sm text-primary">
              <Users size={20} />
            </div>
          </div>
          <Link href="/admin/directory" className="text-accent text-sm font-medium hover:underline">
            Manage Directory
          </Link>
        </Card>
        
        <Card className="p-6 flex flex-col justify-between hover:bg-background transition-colors">
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-xs font-medium text-primary/60 uppercase tracking-wider font-sans">Total Dues Collected</p>
              <p className="text-4xl font-bold font-sans text-success mt-2">₦{totalDues.toLocaleString()}</p>
            </div>
            <div className="p-2 bg-success/10 rounded-sm text-success">
              <CreditCard size={20} />
            </div>
          </div>
          <Link href="/admin/payments" className="text-accent text-sm font-medium hover:underline">
            Audit Payments
          </Link>
        </Card>
        
        <Card className="p-6 flex flex-col justify-between hover:bg-background transition-colors">
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-xs font-medium text-primary/60 uppercase tracking-wider font-sans">Active Documents</p>
              <p className="text-4xl font-bold font-serif text-primary mt-2">{documentCount || 0}</p>
            </div>
            <div className="p-2 bg-primary/10 rounded-sm text-primary">
              <FileText size={20} />
            </div>
          </div>
          <Link href="/admin/documents" className="text-accent text-sm font-medium hover:underline">
            Manage Documents
          </Link>
        </Card>
      </div>
      
      <h2 className="text-xl font-serif text-primary font-bold mb-4">Quick Actions</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Link href="/admin/directory">
          <Card className="p-5 text-center hover:bg-background transition-colors h-full flex flex-col items-center justify-center">
            <Users size={24} className="text-primary mb-3" />
            <div className="text-primary font-medium mb-1">Directory</div>
            <p className="text-xs text-primary/60">Update officers</p>
          </Card>
        </Link>
        
        <Link href="/admin/documents">
          <Card className="p-5 text-center hover:bg-background transition-colors h-full flex flex-col items-center justify-center">
            <FileText size={24} className="text-primary mb-3" />
            <div className="text-primary font-medium mb-1">Documents</div>
            <p className="text-xs text-primary/60">Upload calendars</p>
          </Card>
        </Link>
        
        <Link href="/admin/activities">
          <Card className="p-5 text-center hover:bg-background transition-colors h-full flex flex-col items-center justify-center">
            <Calendar size={24} className="text-primary mb-3" />
            <div className="text-primary font-medium mb-1">Activities</div>
            <p className="text-xs text-primary/60">Post events</p>
          </Card>
        </Link>
        
        <Link href="/admin/payments">
          <Card className="p-5 text-center hover:bg-background transition-colors h-full flex flex-col items-center justify-center">
            <CreditCard size={24} className="text-primary mb-3" />
            <div className="text-primary font-medium mb-1">Export CSV</div>
            <p className="text-xs text-primary/60">Download financials</p>
          </Card>
        </Link>
      </div>
    </div>
  )
}
