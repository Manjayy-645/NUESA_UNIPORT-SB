'use server'

import { createAdminClient } from '@/lib/supabase/admin'
import { revalidatePath } from 'next/cache'

export async function createActivity(formData: FormData) {
  const supabase = createAdminClient()
  
  const title = formData.get('title') as string
  const description = formData.get('description') as string
  const date = formData.get('date') as string
  const file = formData.get('image') as File | null
  
  if (!title || !description) {
    return { error: 'Title and description are required.' }
  }

  let imageUrl: string | null = null

  if (file && file.size > 0) {
    const fileExt = file.name.split('.').pop()
    const fileName = `activities/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
    const buffer = Buffer.from(await file.arrayBuffer())

    const { error: uploadError } = await supabase.storage
      .from('media-assets')
      .upload(fileName, buffer, {
        contentType: file.type
      })

    if (uploadError) {
      return { error: uploadError.message }
    }

    const { data: publicUrlData } = supabase.storage
      .from('media-assets')
      .getPublicUrl(fileName)

    imageUrl = publicUrlData.publicUrl
  }

  const { error: insertError } = await supabase.from('activities').insert({
    title,
    description,
    date: date ? new Date(date).toISOString() : null,
    image_url: imageUrl,
  })

  if (insertError) {
    return { error: insertError.message }
  }

  revalidatePath('/activities')
  revalidatePath('/admin/activities')
  revalidatePath('/')
  return { success: true }
}

export async function deleteActivity(id: string) {
  const supabase = createAdminClient()
  
  const { error } = await supabase
    .from('activities')
    .delete()
    .eq('id', id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/activities')
  revalidatePath('/admin/activities')
  revalidatePath('/')
  return { success: true }
}
