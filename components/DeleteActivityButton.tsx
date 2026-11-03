'use client'

import { useState } from 'react'
import { deleteActivity } from '@/app/admin/activities/actions'
import { Trash2, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export function DeleteActivityButton({ id, title }: { id: string; title: string }) {
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) {
      return
    }

    setLoading(true)
    await deleteActivity(id)
    setLoading(false)
  }

  return (
    <Button
      onClick={handleDelete}
      variant="danger"
      size="sm"
      disabled={loading}
      className="p-2 min-h-[36px] min-w-[36px]"
      aria-label={`Delete ${title}`}
    >
      {loading ? (
        <Loader2 size={14} className="animate-spin text-current" />
      ) : (
        <Trash2 size={14} />
      )}
    </Button>
  )
}
