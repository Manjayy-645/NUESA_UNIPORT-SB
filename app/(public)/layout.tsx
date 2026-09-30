import { PublicNavigation } from '@/components/PublicNavigation'
import Link from 'next/link'
import { Mail, MapPin } from 'lucide-react'

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <PublicNavigation />
      
      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-uniport-navy text-gray-300 py-12 border-t-[6px] border-nuesa-orange">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-white text-xl font-bold mb-4">NUESA UniPort Chapter</h3>
              <p className="text-sm mb-4 max-w-md">
                The Nigerian Universities Engineering Students Association (NUESA), 
                University of Port Harcourt Chapter. Creating a platform for engineering 
                excellence, innovation, and student welfare.
              </p>
              <div className="flex items-center gap-2 text-sm">
                <MapPin size={16} className="text-nuesa-orange" />
                <span>Faculty of Engineering, Choba Campus, Port Harcourt, Rivers State.</span>
              </div>
            </div>
            
            <div>
              <h3 className="text-white text-lg font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/" className="hover:text-nuesa-orange transition-colors">Home</Link></li>
                <li><Link href="/directory" className="hover:text-nuesa-orange transition-colors">Directory</Link></li>
                <li><Link href="/documents" className="hover:text-nuesa-orange transition-colors">Timetables & Calendars</Link></li>
                <li><Link href="/portal/dues" className="hover:text-nuesa-orange transition-colors">Pay Faculty Dues</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white text-lg font-bold mb-4">Connect With Us</h3>
              <div className="flex space-x-4 mb-4">
                <a href="#" className="w-10 h-10 rounded-full bg-blue-900 flex items-center justify-center hover:bg-nuesa-orange transition-colors text-white">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-blue-900 flex items-center justify-center hover:bg-nuesa-orange transition-colors text-white">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-blue-900 flex items-center justify-center hover:bg-nuesa-orange transition-colors text-white">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                </a>
              </div>
              <div className="flex items-center gap-2 text-sm mt-4">
                <Mail size={16} className="text-nuesa-orange" />
                <span>contact@nuesauniport.edu.ng</span>
              </div>
            </div>
          </div>
          
          <div className="border-t border-blue-900 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-xs">
            <p>&copy; {new Date().getFullYear()} NUESA UniPort. All rights reserved.</p>
            <p className="mt-2 md:mt-0 italic">"Engineering the Future"</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
