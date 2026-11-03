import React from 'react'
import { ExternalLink, Sparkles, Cpu, Zap, Truck, Factory } from 'lucide-react'

export function MetiPathwayCard() {
  const focusAreas = [
    { name: 'AI & Automation', icon: Cpu },
    { name: 'Energy Technology', icon: Zap },
    { name: 'Supply Chain', icon: Truck },
    { name: 'Industrial Systems', icon: Factory },
  ]

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50/90 via-slate-50 to-blue-50/40 border border-blue-200/90 p-8 sm:p-10 shadow-sm transition-all duration-300 hover:shadow-md hover:border-blue-300">
      {/* Decorative ambient background accents */}
      <div 
        aria-hidden="true" 
        className="absolute -top-20 -right-20 w-72 h-72 bg-blue-200/40 rounded-full blur-3xl pointer-events-none" 
      />
      <div 
        aria-hidden="true" 
        className="absolute -bottom-20 -left-20 w-72 h-72 bg-red-100/30 rounded-full blur-3xl pointer-events-none" 
      />

      <div className="relative z-10">
        {/* Section Header / Tag */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-100/90 border border-blue-200 text-blue-900 text-xs font-semibold tracking-wide uppercase mb-4 shadow-xs">
          <Sparkles size={14} className="text-red-600" />
          <span>Postgraduate &amp; Innovation Pathways</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8">
            <h3 id="meti-pathway-heading" className="text-2xl sm:text-3xl font-serif font-bold text-blue-900 mb-3 tracking-tight">
              Advance Your Engineering Career with METI
            </h3>
            <p className="text-slate-700 text-sm sm:text-base font-sans leading-relaxed mb-6">
              Looking beyond your B.Eng? The Institute of Engineering, Technology and Innovation Management (METI) at UniPort offers specialized postgraduate programs (PGD, MSc, and PhD) designed to bridge the gap between engineering excellence and strategic business leadership.
            </p>

            {/* Master's Focus Areas */}
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-900/80 block mb-3">
                Key Master&apos;s Focus Areas:
              </span>
              <div className="flex flex-wrap gap-2.5">
                {focusAreas.map((area) => {
                  const Icon = area.icon
                  return (
                    <span
                      key={area.name}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-blue-200 text-blue-950 font-medium text-xs sm:text-sm shadow-xs transition-transform hover:-translate-y-0.5"
                    >
                      <Icon size={14} className="text-blue-900 shrink-0" />
                      <span>{area.name}</span>
                    </span>
                  )
                })}
              </div>
            </div>
          </div>

          {/* CTA Box & External Redirect */}
          <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-center pt-6 lg:pt-0 border-t lg:border-t-0 lg:border-l border-blue-200/70 lg:pl-8">
            <div className="w-full sm:w-auto">
              <a
                href="https://meti.uniport.edu.ng/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 w-full sm:w-auto px-6 py-3.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold text-sm sm:text-base shadow-sm hover:shadow-md transition-all duration-200 active:scale-[0.98] group"
              >
                <span>Explore METI Programmes</span>
                <ExternalLink size={16} className="transition-transform group-hover:translate-x-0.5" />
              </a>
              <span className="block mt-2 text-[11px] text-slate-500 lg:text-right font-medium">
                Official UniPort Institute Portal &bull; Opens in new tab
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MetiPathwayCard
