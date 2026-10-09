import { createAdminClient } from '@/lib/supabase/admin'

export default async function VerifyReceiptPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  // We use the admin client here because this route is public, but we need to query
  // the payments table which is RLS restricted to the student who owns it.
  // We only expose limited data to verify the receipt is valid.
  const supabase = createAdminClient()
  
  const { data: payment } = await supabase
    .from('payments')
    .select('*, students(full_name, mat_no, department, level)')
    .eq('paystack_reference', id)
    .single()
    
  if (!payment) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="bg-white p-8 rounded-xl shadow-lg border-2 border-red-200 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Invalid Receipt</h1>
          <p className="text-gray-600">This receipt reference could not be found in our system. It may be forged or entered incorrectly.</p>
        </div>
      </div>
    )
  }
  
  if (payment.status !== 'success') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="bg-white p-8 rounded-xl shadow-lg border-2 border-yellow-200 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-yellow-100 text-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment Pending</h1>
          <p className="text-gray-600">This payment has not yet been confirmed by Paystack. Please try again later.</p>
        </div>
      </div>
    )
  }

  const student = payment.students

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg border-2 border-green-200 max-w-md w-full text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-[#166534]"></div>
        
        <div className="w-20 h-20 bg-[#DCFCE7] text-[#166534] rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-[#166534] border-opacity-20">
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
        </div>
        
        <h1 className="text-3xl font-black text-gray-900 mb-2">Verified Valid</h1>
        <p className="text-[#166534] font-bold tracking-wide uppercase text-sm mb-8">Official NUESA Receipt</p>
        
        <div className="bg-gray-50 rounded-lg p-6 text-left border border-gray-100 mb-6">
          <div className="mb-4">
            <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Student</p>
            <p className="font-bold text-gray-900">{student.full_name}</p>
            <p className="text-sm text-gray-600">{student.mat_no} &bull; {student.department}</p>
          </div>
          <div className="mb-4">
            <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Payment</p>
            <p className="font-bold text-gray-900">Faculty Dues ({payment.session})</p>
            <p className="text-sm text-gray-600">Amount: ₦{payment.amount.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Receipt No.</p>
            <p className="font-mono font-bold text-gray-900">{payment.receipt_number}</p>
            <p className="text-xs text-gray-500 mt-1">Paid on: {new Date(payment.paid_at).toLocaleDateString()}</p>
          </div>
        </div>
        
        <p className="text-xs text-gray-400">
          Scanned at: {new Date().toLocaleString()}
        </p>
      </div>
    </div>
  )
}
