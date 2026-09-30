'use server'

import { createAdminClient } from '@/lib/supabase/admin'
import { revalidatePath } from 'next/cache'

export async function uploadDocumentAndSave(formData: FormData) {
  const supabase = createAdminClient()
  
  const file = formData.get('file') as File
  let fileUrl = ''
  
  if (file && file.size > 0) {
    const fileExt = file.name.split('.').pop()
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
    
    const buffer = Buffer.from(await file.arrayBuffer())
    
    // Upload bypassing RLS using admin client
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('document-files')
      .upload(fileName, buffer, {
        contentType: file.type
      })
      
    if (uploadError) {
      return { error: uploadError.message }
    }
    
    // Get public URL
    const { data: publicUrlData } = supabase.storage
      .from('document-files')
      .getPublicUrl(fileName)
      
    fileUrl = publicUrlData.publicUrl
  } else {
    return { error: 'Please upload a valid PDF file.' }
  }
  
  const { error: insertError } = await supabase.from('documents').insert({
    title: formData.get('title') as string,
    category: formData.get('category') as string,
    session: formData.get('session') as string,
    version_label: formData.get('version_label') as string || null,
    revision_no: parseInt(formData.get('revision_no') as string) || 1,
    file_url: fileUrl,
    is_active: true
  })
  
  if (insertError) {
    return { error: insertError.message }
  }
  
  revalidatePath('/admin/documents')
  return { success: true }
}
