import './globals.css'
import type { Metadata } from 'next'
import { Fraunces, IBM_Plex_Sans, IBM_Plex_Mono } from 'next/font/google'

const fraunces = Fraunces({ 
  subsets: ['latin'],
  variable: '--font-fraunces',
  weight: ['400', '600']
})

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  variable: '--font-ibm-sans',
  weight: ['400', '500']
})

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  variable: '--font-ibm-mono',
  weight: ['400', '500']
})

export const metadata: Metadata = {
  title: 'SEEES UniPort | Society of Electrical and Electronic Engineering Students',
  description: 'Official digital portal for the Society of Electrical and Electronic Engineering Students (SEEES), Department of Electrical & Electronic Engineering, University of Port Harcourt.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${fraunces.variable} ${ibmPlexSans.variable} ${ibmPlexMono.variable}`}>
      <body className="bg-background text-primary font-sans antialiased selection:bg-accent/30 selection:text-primary">
        {children}
      </body>
    </html>
  )
}
