'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function signUpAndCreateStudent(
  email: string, 
  password: string, 
  studentData: {
    mat_no: string;
    full_name: string;
    department: string;
    level: string;
    phone: string;
  }
) {
  const supabase = await createClient()
  
  // 1. Sign up user
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  })

  if (error) {
    console.error('Supabase SignUp Error:', error)
    return { error: error.message }
  }
  
  if (!data.user) {
    return { error: 'Sign up failed.' }
  }

  // 2. Create student row using admin client to bypass RLS
  const { createAdminClient } = await import('@/lib/supabase/admin')
  const adminSupabase = createAdminClient()

  const { error: insertError } = await adminSupabase
    .from('students')
    .insert({
      id: data.user.id,
      mat_no: studentData.mat_no.toUpperCase(),
      full_name: studentData.full_name,
      department: studentData.department,
      level: studentData.level,
      phone: studentData.phone,
      verified: false
    })

  if (insertError) {
    // Check if unique constraint error
    if (insertError.message.includes('students_mat_no_key')) {
      return { error: 'Matriculation number already exists.' }
    }
    if (insertError.message.includes('students_phone_key')) {
      return { error: 'Phone number already exists.' }
    }
    return { error: insertError.message }
  }

  return { success: true }
}

export async function loginWithPassword(email: string, password: string) {
  const supabase = await createClient()
  
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return { error: error.message }
  }

  return { success: true }
}
