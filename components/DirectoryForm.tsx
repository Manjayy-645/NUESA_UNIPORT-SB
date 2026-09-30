'use client'

import { useState } from 'react'
import { uploadPhotoAndSavePerson } from '@/app/admin/directory/actions'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

export function DirectoryForm() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (formData: FormData) => {
    setLoading(true)
    setError(null)
    
    try {
      const res = await uploadPhotoAndSavePerson(formData)
      if (res?.error) {
        setError(res.error)
      } else {
        const form = document.getElementById('directory-form') as HTMLFormElement
        if (form) form.reset()
      }
    } catch (err) {
      setError('An unexpected error occurred.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form id="directory-form" action={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-50 text-red-700 p-3 rounded-md text-sm border border-red-200">
          {error}
        </div>
      )}
      
      <Input label="Full Name" name="name" required placeholder="e.g. Engr. Dr. John Doe" />
      
      <div>
        <label className="block text-sm font-medium text-primary mb-1">Hierarchy Level</label>
        <select required name="hierarchy" className="w-full p-2 border border-primary/20 rounded-md text-sm bg-white focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary">
          <option value="faculty_dean">Faculty Dean</option>
          <option value="department_hod">Department HOD</option>
          <option value="university_principal_officer">Principal Officer</option>
          <option value="staff_advisor_faculty">Faculty Staff Advisor</option>
          <option value="staff_advisor_dept">Department Staff Advisor</option>
          <option value="lecturer">Lecturer</option>
          <option value="student_leader_faculty">Student Leader (Faculty)</option>
          <option value="student_leader_dept">Student Leader (Department)</option>
        </select>
      </div>
      
      <Input label="Position / Title" name="rank_or_position" required placeholder="e.g. Dean of Engineering" />
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-primary mb-1">Tenure</label>
          <select required name="tenure_status" className="w-full p-2 border border-primary/20 rounded-md text-sm bg-white focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary">
            <option value="current">Current</option>
            <option value="past">Past</option>
          </select>
        </div>
        <Input label="Display Order" name="display_order" type="number" defaultValue="0" />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-primary mb-1">Photo Upload (Optional)</label>
        <input type="file" name="file" accept="image/*" className="w-full p-2 border border-primary/20 rounded-md text-sm bg-background" />
      </div>
      
      <Button type="submit" variant="primary" fullWidth disabled={loading}>
        {loading ? 'Saving...' : 'Save Officer'}
      </Button>
    </form>
  )
}
