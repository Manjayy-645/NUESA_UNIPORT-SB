import { PortalNavigation } from '@/components/PortalNavigation'

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <PortalNavigation />
      <main className="flex-1">
        {children}
      </main>
      
      <footer className="bg-white border-t border-primary/10 py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-primary/50 font-sans">
          &copy; {new Date().getFullYear()} Nigerian Universities Engineering Students Association (NUESA), UniPort Chapter.
        </div>
      </footer>
    </div>
  )
}
