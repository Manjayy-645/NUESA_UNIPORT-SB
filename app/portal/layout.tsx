import { PortalNavigation } from '@/components/PortalNavigation'

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <PortalNavigation />
      <main className="flex-1">
        {children}
      </main>
      
      <footer className="bg-white border-t border-slate-200 py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-xs text-slate-500 font-mono font-medium">
          &copy; {new Date().getFullYear()} Department of Electrical &amp; Electronics Engineering &bull; Faculty of Engineering, University of Port Harcourt.
        </div>
      </footer>
    </div>
  )
}
