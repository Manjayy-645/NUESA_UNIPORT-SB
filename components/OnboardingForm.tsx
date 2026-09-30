'use client'

import { useState } from 'react'

export function OnboardingForm({ completeProfileAction }: { completeProfileAction: (formData: FormData) => Promise<{ error?: string } | void> }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (formData: FormData) => {
    setLoading(true)
    setError(null)
    
    try {
      const result = await completeProfileAction(formData)
      if (result?.error) {
        // Handle Postgres unique constraint errors gracefully
        if (result.error.includes('students_mat_no_key')) {
          setError('This Matriculation Number is already registered.')
        } else if (result.error.includes('students_phone_key')) {
          setError('This Phone Number is already registered.')
        } else {
          setError(result.error)
        }
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form action={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
          <p className="text-sm text-red-700 font-medium">{error}</p>
        </div>
      )}
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
        <input required type="text" name="full_name" className="w-full p-3 border border-gray-300 rounded focus:ring-uniport-blue" placeholder="John Doe" />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Matriculation Number</label>
          <input required type="text" name="mat_no" pattern="U20\d{2}/\d{7}" title="Format: U20XX/XXXXXXX" className="w-full p-3 border border-gray-300 rounded focus:ring-uniport-blue uppercase" placeholder="U2021/1234567" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
          <input required type="tel" name="phone" className="w-full p-3 border border-gray-300 rounded focus:ring-uniport-blue" placeholder="08012345678" />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
          <select required name="department" className="w-full p-3 border border-gray-300 rounded focus:ring-uniport-blue bg-white">
            <option value="">Select Department</option>
            <option value="Chemical">Chemical Engineering</option>
            <option value="Civil">Civil Engineering</option>
            <option value="Electrical">Electrical/Electronic Engineering</option>
            <option value="Mechanical">Mechanical Engineering</option>
            <option value="Petroleum">Petroleum & Gas Engineering</option>
            <option value="Mechatronics">Mechatronics Engineering</option>
            <option value="Computer">Computer Engineering</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Level</label>
          <select required name="level" className="w-full p-3 border border-gray-300 rounded focus:ring-uniport-blue bg-white">
            <option value="">Select Level</option>
            <option value="100">100 Level</option>
            <option value="200">200 Level</option>
            <option value="300">300 Level</option>
            <option value="400">400 Level</option>
            <option value="500">500 Level</option>
          </select>
        </div>
      </div>
      
      <button type="submit" disabled={loading} className="w-full bg-[#0B1B3D] text-white font-bold py-3 px-4 rounded hover:bg-opacity-90 transition-all disabled:opacity-50">
        {loading ? 'Saving Profile...' : 'Complete Profile'}
      </button>
    </form>
  )
}
