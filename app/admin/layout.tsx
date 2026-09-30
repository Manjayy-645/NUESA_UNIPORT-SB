import { AdminNavigation } from '@/components/AdminNavigation'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <AdminNavigation />
      <main className="flex-1">
        {children}
      </main>
    </div>
  )
}
