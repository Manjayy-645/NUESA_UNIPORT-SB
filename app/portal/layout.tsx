import { PortalNavigation } from '@/components/PortalNavigation'

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background flex flex-col font-sans">
      <PortalNavigation />
      <main className="flex-1">
        {children}
      </main>
      
      <footer className="bg-white border-t border-blue-900/10 py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-xs text-blue-900/60 font-mono">
          &copy; {new Date().getFullYear()} Society of Electrical and Electronic Engineering Students (SEEES), UniPort Chapter &bull; Department of Electrical &amp; Electronic Engineering.
        </div>
      </footer>
    </div>
  )
}
