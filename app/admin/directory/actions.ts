'use server'

import { createAdminClient } from '@/lib/supabase/admin'
import { revalidatePath } from 'next/cache'

export async function uploadPhotoAndSavePerson(formData: FormData) {
  const supabase = createAdminClient()
  
  const file = formData.get('file') as File
  let photoUrl = null
  
  if (file && file.size > 0) {
    const fileExt = file.name.split('.').pop()
    const fileName = `directory/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
    
    const buffer = Buffer.from(await file.arrayBuffer())

    const { data: uploadData, error: uploadError } = await supabase.storage
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
      
    photoUrl = publicUrlData.publicUrl
  }
  
  const { error: insertError } = await supabase.from('people').insert({
    name: formData.get('name') as string,
    hierarchy: formData.get('hierarchy') as string,
    department: formData.get('department') as string || null,
    sub_association: formData.get('sub_association') as string || null,
    rank_or_position: formData.get('rank_or_position') as string,
    tenure_status: formData.get('tenure_status') as string,
    start_year: parseInt(formData.get('start_year') as string) || null,
    end_year: parseInt(formData.get('end_year') as string) || null,
    display_order: parseInt(formData.get('display_order') as string) || 0,
    photo_url: photoUrl
  })
  
  if (insertError) {
    return { error: insertError.message }
  }
  
  revalidatePath('/admin/directory')
  return { success: true }
}
