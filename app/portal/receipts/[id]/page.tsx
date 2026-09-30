import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { QRCodeSVG } from 'qrcode.react'

export default async function ReceiptPage({ params }: { params: { id: string } }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) redirect('/login')
  
  const { data: payment } = await supabase
    .from('payments')
    .select('*, students(*)')
    .eq('paystack_reference', params.id)
    .single()
    
  if (!payment) {
    return <div className="p-8 text-center text-red-500 font-bold">Receipt not found</div>
  }
  
  if (payment.student_id !== user.id) {
    return <div className="p-8 text-center text-red-500 font-bold">Unauthorized</div>
  }
  
  const student = payment.students
  
  // URL to public verification route
  const verificationUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/verify-receipt/${payment.paystack_reference}`

  return (
    <div className="max-w-3xl mx-auto p-8 mt-8">
      <div className="bg-white p-12 border-2 border-gray-200 rounded-xl shadow-lg relative overflow-hidden">
        
        {/* Receipt Header */}
        <div className="flex justify-between items-start mb-10 border-b-2 border-gray-100 pb-8">
          <div>
            <h1 className="text-3xl font-black text-uniport-navy tracking-tight">NUESA UNIPORT</h1>
            <p className="text-gray-500 font-medium">Faculty of Engineering, University of Port Harcourt</p>
            <div className="mt-4 inline-block bg-[#DCFCE7] text-[#166534] px-3 py-1 rounded-full text-sm font-bold border border-[#166534] border-opacity-20">
              OFFICIAL RECEIPT
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500 uppercase tracking-wide font-semibold">Receipt No.</p>
            <p className="text-xl font-bold text-gray-900">{payment.receipt_number || 'PENDING'}</p>
            <p className="text-sm text-gray-500 mt-2">Date Paid</p>
            <p className="font-medium text-gray-900">
              {payment.paid_at ? new Date(payment.paid_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : 'Processing...'}
            </p>
          </div>
        </div>
        
        {/* Student Details */}
        <div className="grid grid-cols-2 gap-8 mb-10">
          <div>
            <p className="text-sm text-gray-500 uppercase tracking-wide font-semibold mb-1">Received From</p>
            <p className="text-xl font-bold text-gray-900">{student.full_name}</p>
            <p className="text-gray-700">{student.mat_no}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 uppercase tracking-wide font-semibold mb-1">Academic Info</p>
            <p className="text-gray-900 font-medium">{student.department} Engineering</p>
            <p className="text-gray-700">{student.level} Level</p>
          </div>
        </div>
        
        {/* Payment Details Table */}
        <div className="border border-gray-200 rounded-lg overflow-hidden mb-10">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-sm text-gray-500 uppercase tracking-wide font-semibold">Description</th>
                <th className="px-6 py-4 text-sm text-gray-500 uppercase tracking-wide font-semibold">Session</th>
                <th className="px-6 py-4 text-sm text-gray-500 uppercase tracking-wide font-semibold text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 font-medium text-gray-900">Annual Faculty Dues</td>
                <td className="px-6 py-4 text-gray-700">{payment.session}</td>
                <td className="px-6 py-4 text-right font-bold text-gray-900">₦{payment.amount.toLocaleString()}</td>
              </tr>
            </tbody>
            <tfoot className="bg-gray-50">
              <tr>
                <td colSpan={2} className="px-6 py-4 text-right font-bold text-gray-900 uppercase">Total Paid</td>
                <td className="px-6 py-4 text-right font-black text-xl text-uniport-navy">₦{payment.amount.toLocaleString()}</td>
              </tr>
            </tfoot>
          </table>
        </div>
        
        {/* Footer & QR Code */}
        <div className="flex justify-between items-end pt-8 border-t-2 border-gray-100">
          <div>
            <p className="text-sm text-gray-500 mb-1">Transaction Reference:</p>
            <p className="font-mono text-xs text-gray-400 bg-gray-50 p-2 rounded">{payment.paystack_reference}</p>
          </div>
          <div className="text-center">
            <div className="bg-white p-2 border border-gray-200 rounded shadow-sm inline-block mb-2">
              <QRCodeSVG value={verificationUrl} size={100} />
            </div>
            <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Scan to Verify</p>
          </div>
        </div>
        
        {/* Print Button (Client Side) */}
        <div className="absolute top-4 right-4 print:hidden">
          <button 
            className="text-gray-500 hover:text-uniport-navy bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition-colors"
            title="Print Receipt"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
          </button>
        </div>
        
      </div>
    </div>
  )
}
