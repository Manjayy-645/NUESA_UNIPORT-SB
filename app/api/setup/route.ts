import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

export async function GET() {
  const supabase = createAdminClient()
  
  const results = []
  
  const { data: b1, error: e1 } = await supabase.storage.createBucket('media-assets', { public: true })
  results.push({ bucket: 'media-assets', result: b1 || e1 })
  
  const { data: b2, error: e2 } = await supabase.storage.createBucket('document-files', { public: true })
  results.push({ bucket: 'document-files', result: b2 || e2 })
  
  return NextResponse.json(results)
}
