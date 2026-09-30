import { createAdminClient } from '@/lib/supabase/admin'
import { ExportCSVButton } from '@/components/ExportCSVButton'

export default async function AdminPaymentsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const supabase = createAdminClient()
  
  // Basic filtering from URL search params (placeholder for actual interactive filters)
  const sessionFilter = searchParams.session as string
  const statusFilter = searchParams.status as string
  const search = searchParams.search as string
  
  let query = supabase
    .from('payments')
    .select('*, students(full_name, mat_no, department, level)')
    .order('created_at', { ascending: false })
    
  if (sessionFilter) query = query.eq('session', sessionFilter)
  if (statusFilter) query = query.eq('status', statusFilter)
  
  const { data: payments } = await query
  
  // In a real application, text search would require a specialized Postgres function 
  // or a more complex query utilizing `or` syntax. Here we'll do a simple client-side filter
  // on the fetched data if `search` is provided.
  let filteredPayments = payments || []
  if (search) {
    const s = search.toLowerCase()
    filteredPayments = filteredPayments.filter(p => 
      p.paystack_reference.toLowerCase().includes(s) ||
      (p.receipt_number && p.receipt_number.toLowerCase().includes(s)) ||
      (p.students?.full_name && p.students.full_name.toLowerCase().includes(s)) ||
      (p.students?.mat_no && p.students.mat_no.toLowerCase().includes(s))
    )
  }

  return (
    <div className="p-8 max-w-7xl mx-auto mt-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-uniport-navy">Payment Audit</h1>
        <ExportCSVButton data={filteredPayments} />
      </div>
      
      {/* Search & Filter Bar (Styling Placeholder - logic driven by URL params in real app) */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6 flex gap-4">
        <input type="text" placeholder="Search by Mat No, Name, or Ref..." className="flex-1 border p-2 rounded" />
        <select className="border p-2 rounded bg-white">
          <option value="">All Sessions</option>
          <option value="2025/2026">2025/2026</option>
          <option value="2024/2025">2024/2025</option>
        </select>
        <select className="border p-2 rounded bg-white">
          <option value="">All Statuses</option>
          <option value="success">Success</option>
          <option value="pending">Pending</option>
          <option value="failed">Failed</option>
        </select>
        <button className="bg-gray-100 px-4 py-2 rounded font-medium">Filter</button>
      </div>
      
      <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 font-semibold text-gray-600">Student</th>
                <th className="px-6 py-4 font-semibold text-gray-600">Reference / Receipt</th>
                <th className="px-6 py-4 font-semibold text-gray-600">Session</th>
                <th className="px-6 py-4 font-semibold text-gray-600 text-right">Amount</th>
                <th className="px-6 py-4 font-semibold text-gray-600">Status</th>
                <th className="px-6 py-4 font-semibold text-gray-600">Date Paid</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredPayments.map(payment => (
                <tr key={payment.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <p className="font-medium text-gray-900">{payment.students?.full_name}</p>
                    <p className="text-gray-500 text-xs">{payment.students?.mat_no} &bull; {payment.students?.department}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-mono text-xs text-gray-500">{payment.paystack_reference}</p>
                    <p className="font-mono font-medium">{payment.receipt_number || '-'}</p>
                  </td>
                  <td className="px-6 py-4 text-gray-700">{payment.session}</td>
                  <td className="px-6 py-4 text-right font-medium">₦{payment.amount.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      payment.status === 'success' ? 'bg-[#DCFCE7] text-[#166534]' : 
                      payment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-red-100 text-red-800'
                    }`}>
                      {payment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500 text-xs">
                    {payment.paid_at ? new Date(payment.paid_at).toLocaleString() : '-'}
                  </td>
                </tr>
              ))}
              {filteredPayments.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">No payments found matching the criteria.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
