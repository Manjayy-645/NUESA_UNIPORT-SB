import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

async function createBuckets() {
  console.log('Creating media-assets bucket...')
  const { data: b1, error: e1 } = await supabase.storage.createBucket('media-assets', { public: true })
  console.log(e1 || b1)
  
  console.log('Creating document-files bucket...')
  const { data: b2, error: e2 } = await supabase.storage.createBucket('document-files', { public: true })
  console.log(e2 || b2)
}

createBuckets()
