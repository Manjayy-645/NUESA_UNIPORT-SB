'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function sendOtp(email: string) {
  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      shouldCreateUser: true, // Create user if doesn't exist for signup
    }
  })

  if (error) {
    return { error: error.message }
  }
  return { success: true }
}

export async function verifyOtpAndCreateStudent(
  email: string, 
  otp: string, 
  studentData: {
    mat_no: string;
    full_name: string;
    department: string;
    level: string;
    phone: string;
  }
) {
  const supabase = await createClient()
  
  // 1. Verify OTP
  const { data, error } = await supabase.auth.verifyOtp({
    email,
    token: otp,
    type: 'email'
  })

  if (error) {
    return { error: error.message }
  }
  
  if (!data.user) {
    return { error: 'Verification failed.' }
  }

  // 2. Create student row using admin client to bypass RLS
  // (RLS blocks inserts by default unless explicitly allowed, and we control this insertion server-side)
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

export async function loginWithOtp(email: string) {
  const supabase = await createClient()
  
  // For login, check if student exists first using an RPC or service role?
  // We can just send OTP and check after, but requirement says:
  // "If an email has no matching students row, show a clear message directing them to sign up instead - don't silently create a new account"
  
  // Since RLS is on students, we can't query by email easily unless we use the admin client.
  const { createAdminClient } = await import('@/lib/supabase/admin')
  const adminSupabase = createAdminClient()
  
  // Check if a user with this email exists in auth schema AND students table
  // Because we don't have email in students table directly, we'd need to find the user ID.
  // Actually, wait, Supabase admin api can get user by email.
  const { data: { users }, error: authError } = await adminSupabase.auth.admin.listUsers()
  const user = users.find(u => u.email === email)
  
  if (!user) {
    return { error: 'No account found. Please sign up instead.' }
  }
  
  const { data: student } = await adminSupabase
    .from('students')
    .select('id')
    .eq('id', user.id)
    .single()
    
  if (!student) {
    return { error: 'No student record found. Please sign up instead.' }
  }

  // Safe to send OTP
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      shouldCreateUser: false,
    }
  })

  if (error) {
    return { error: error.message }
  }
  return { success: true }
}

export async function verifyLoginOtp(email: string, otp: string) {
  const supabase = await createClient()
  
  const { error } = await supabase.auth.verifyOtp({
    email,
    token: otp,
    type: 'email'
  })

  if (error) {
    return { error: error.message }
  }

  return { success: true }
}
