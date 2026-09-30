import { createClient } from '@supabase/supabase-js'

// Ensure this file is never imported on the client
if (typeof window !== 'undefined') {
  throw new Error('This module can only be imported on the server.')
}

export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    }
  )
}
