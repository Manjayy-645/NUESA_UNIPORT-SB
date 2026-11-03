import React from 'react'
import Link from 'next/link'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Award, Zap, Shield, BookOpen, Users, Compass, ArrowRight } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Header Banner */}
      <div className="bg-white py-16 border-b border-blue-900/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 border border-blue-900/20 bg-slate-50 text-blue-900 px-3 py-1 rounded-full text-xs font-bold tracking-wider mb-4 uppercase">
            Society of Electrical and Electronic Engineering Students &bull; UniPort Chapter
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-blue-900 mb-4 tracking-tight">
            About SEEES UniPort
          </h1>
          <p className="text-blue-900/75 max-w-3xl text-lg font-sans leading-relaxed">
            Pioneering engineering innovation, student empowerment, and technical excellence in the Department of Electrical &amp; Electronic Engineering at the University of Port Harcourt.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* Mission, Vision, Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-8 bg-white border border-blue-900/15 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-lg bg-blue-900 text-white flex items-center justify-center mb-6 border border-red-600/30">
                <Compass size={24} />
              </div>
              <h2 className="font-serif font-bold text-xl text-blue-900 mb-3">Our Mission</h2>
              <p className="text-sm text-blue-900/75 leading-relaxed font-sans">
                To foster academic distinction, provide practical engineering skill-building workshops, advocate for student welfare, and bridge the gap between classroom theory and global industry demands.
              </p>
            </div>
          </Card>

          <Card className="p-8 bg-white border border-blue-900/15 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-lg bg-blue-900 text-white flex items-center justify-center mb-6 border border-red-600/30">
                <Zap size={24} className="text-red-400" />
              </div>
              <h2 className="font-serif font-bold text-xl text-blue-900 mb-3">Our Vision</h2>
              <p className="text-sm text-blue-900/75 leading-relaxed font-sans">
                To stand as the foremost electrical and electronics student organization in Sub-Saharan Africa, recognized for producing visionary engineers, inventors, and technology leaders.
              </p>
            </div>
          </Card>

          <Card className="p-8 bg-white border border-blue-900/15 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-lg bg-blue-900 text-white flex items-center justify-center mb-6 border border-red-600/30">
                <Shield size={24} />
              </div>
              <h2 className="font-serif font-bold text-xl text-blue-900 mb-3">Core Values</h2>
              <p className="text-sm text-blue-900/75 leading-relaxed font-sans">
                Integrity, Academic Rigor, Innovation, Inclusivity, and Professional Ethics in compliance with COREN benchmarks and international IEEE guidelines.
              </p>
            </div>
          </Card>
        </div>

        {/* Department Overview */}
        <div className="bg-white border border-blue-900/15 rounded-lg p-8 sm:p-10 shadow-xs">
          <div className="max-w-4xl space-y-6">
            <div className="inline-block border border-red-600/20 bg-red-50 text-red-700 px-3 py-1 rounded-sm text-xs font-semibold uppercase tracking-wider">
              Departmental Heritage
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-blue-900">
              Department of Electrical &amp; Electronic Engineering
            </h2>
            <div className="space-y-4 text-blue-900/80 font-sans leading-relaxed text-base">
              <p>
                Established as one of the pioneer engineering departments at the University of Port Harcourt, the Department of Electrical &amp; Electronic Engineering has trained generations of engineers spearheading Nigeria's energy, telecommunications, manufacturing, and tech ecosystems.
              </p>
              <p>
                Under the umbrella of SEEES (Society of Electrical and Electronic Engineering Students), undergraduates participate in robotics bootcamps, power system simulations, hackathons, and industrial mentorship programs designed to augment university curricula with real-world competence.
              </p>
            </div>

            <div className="pt-4 flex flex-wrap gap-4">
              <Link href="/programmes">
                <Button variant="primary" className="bg-blue-900 hover:bg-blue-950 text-white font-bold border border-red-600/30">
                  Explore Programmes
                </Button>
              </Link>
              <Link href="/staff">
                <Button variant="secondary" className="border-blue-900/30 text-blue-900">
                  View Academic Faculty
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
