'use client'

import { useState } from 'react'
import { uploadDocumentAndSave } from '@/app/admin/documents/actions'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

export function DocumentForm() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (formData: FormData) => {
    setLoading(true)
    setError(null)
    
    try {
      const res = await uploadDocumentAndSave(formData)
      if (res?.error) {
        setError(res.error)
      } else {
        // Reset form or show success. We could reload or just rely on server action revalidatePath.
        const form = document.getElementById('document-form') as HTMLFormElement
        if (form) form.reset()
      }
    } catch (err) {
      setError('An unexpected error occurred during upload.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form id="document-form" action={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-50 text-red-700 p-3 rounded-md text-sm border border-red-200">
          {error}
        </div>
      )}
      
      <Input label="Title" name="title" required placeholder="e.g. 2025/2026 Academic Calendar" />
      
      <div>
        <label className="block text-sm font-medium text-primary mb-1">Category</label>
        <select required name="category" className="w-full p-2 border border-primary/20 rounded-md text-sm bg-white focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary">
          <option value="academic_calendar">Academic Calendar</option>
          <option value="lecture_timetable">Lecture Timetable</option>
          <option value="exams_timetable">Exams Timetable</option>
          <option value="memo">Memo</option>
        </select>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <Input label="Session" name="session" required placeholder="2025/2026" />
        <Input label="Revision No." name="revision_no" type="number" defaultValue="1" />
      </div>
      
      <Input label="Version Label" name="version_label" placeholder="e.g. Final Draft" />
      
      <div>
        <label className="block text-sm font-medium text-primary mb-1">PDF Upload</label>
        <input required type="file" name="file" accept="application/pdf" className="w-full p-2 border border-primary/20 rounded-md text-sm bg-background" />
      </div>
      
      <Button type="submit" variant="primary" fullWidth disabled={loading}>
        {loading ? 'Uploading & Publishing...' : 'Publish Document'}
      </Button>
    </form>
  )
}
