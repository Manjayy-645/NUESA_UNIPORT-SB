import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: '',
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value: '',
            ...options,
          })
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()

  const isPortal = request.nextUrl.pathname.startsWith('/portal')
  const isAdmin = request.nextUrl.pathname.startsWith('/admin')
  const isOnboarding = request.nextUrl.pathname.startsWith('/portal/onboarding')

  // Not logged in -> redirect to login (placeholder /login)
  if (!user && (isPortal || isAdmin)) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (user && isPortal) {
    // Check if student profile exists
    const { data: student } = await supabase
      .from('students')
      .select('id')
      .eq('id', user.id)
      .single()

    if (!student) {
      // Since student creation is now tied to signup, if it's missing, something is wrong.
      return NextResponse.redirect(new URL('/signup', request.url))
    }
    
  }

  if (user && isAdmin) {
    // Check if admin
    const { data: admin } = await supabase
      .from('admin_roles')
      .select('user_id')
      .eq('user_id', user.id)
      .single()

    if (!admin) {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
