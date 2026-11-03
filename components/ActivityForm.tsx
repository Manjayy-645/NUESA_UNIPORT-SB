'use client'

import { useState } from 'react'
import { createActivity } from '@/app/admin/activities/actions'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Calendar, Plus, Upload, AlertCircle, CheckCircle2 } from 'lucide-react'

export function ActivityForm() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(false)

    const form = e.currentTarget
    const formData = new FormData(form)

    const res = await createActivity(formData)

    if (res?.error) {
      setError(res.error)
      setLoading(false)
      return
    }

    setSuccess(true)
    setLoading(false)
    form.reset()
    setTimeout(() => setSuccess(false), 4000)
  }

  return (
    <Card variant="default" className="p-6 space-y-6">
      <div className="flex items-center gap-2 pb-4 border-b border-primary/10">
        <Plus size={18} className="text-accent" aria-hidden="true" />
        <h2 className="font-serif text-lg font-semibold text-primary">
          Publish New Event or Seminar
        </h2>
      </div>

      {error && (
        <div role="alert" className="p-3 bg-red-50 border border-red-500/25 rounded-2xs text-xs text-red-700 font-sans flex items-center gap-2">
          <AlertCircle size={15} className="shrink-0 text-red-600" aria-hidden="true" />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div role="status" className="p-3 bg-emerald-50 border border-emerald-600/30 rounded-2xs text-xs text-emerald-800 font-sans flex items-center gap-2">
          <CheckCircle2 size={15} className="shrink-0 text-emerald-700" aria-hidden="true" />
          <span>Activity published successfully to the live faculty portal.</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Event / Activity Title"
          name="title"
          id="activity-title"
          placeholder="e.g. 2026 Engineering Week Symposium"
          required
        />

        <div>
          <label htmlFor="activity-desc" className="block text-xs font-semibold uppercase tracking-wider text-primary/80 mb-1.5">
            Full Description
          </label>
          <textarea
            id="activity-desc"
            name="description"
            rows={3}
            placeholder="Detailed itinerary, guest lecturers, venue details, or exhibition guidelines..."
            className="w-full px-3.5 py-2.5 text-xs font-sans border border-primary/20 rounded-xs bg-white text-primary placeholder:text-primary/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent leading-relaxed"
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Event Date"
            name="date"
            type="date"
            id="activity-date"
          />

          <div>
            <label htmlFor="activity-image" className="block text-xs font-semibold uppercase tracking-wider text-primary/80 mb-1.5">
              Event Flyer / Image (Optional)
            </label>
            <input
              type="file"
              id="activity-image"
              name="image"
              accept="image/*"
              className="w-full px-3 py-2 text-xs font-sans border border-primary/20 rounded-xs bg-white text-primary file:mr-3 file:py-1 file:px-2.5 file:rounded-2xs file:border-0 file:text-xs file:font-mono file:bg-primary/5 file:text-primary hover:file:bg-primary/10"
            />
          </div>
        </div>

        <div className="pt-2">
          <Button 
            type="submit" 
            variant="primary" 
            size="md" 
            fullWidth 
            isLoading={loading}
            className="font-sans font-semibold tracking-wide"
          >
            <span>Publish Activity</span>
          </Button>
        </div>
      </form>
    </Card>
  )
}
