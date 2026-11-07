import './globals.css'
import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google'

const plusJakartaSans = Plus_Jakarta_Sans({ 
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Department of Electrical & Electronics Engineering | University of Port Harcourt',
  description: 'Official digital portal for the Department of Electrical & Electronics Engineering, Faculty of Engineering, University of Port Harcourt (UniPort).',
  icons: {
    icon: '/eee-logo.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-slate-50 text-slate-900 font-sans antialiased selection:bg-blue-600/20 selection:text-blue-900 min-h-screen">
        {children}
      </body>
    </html>
  )
}
