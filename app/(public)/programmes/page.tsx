import type { Metadata } from 'next'
import Link from 'next/link'
import { 
  Zap, Radio, Cpu, Layers, BookOpen, CheckCircle, 
  ArrowRight, ShieldCheck, Award, FileText, Users, Building, Laptop, GraduationCap
} from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { MetiPathwayCard } from '@/components/MetiPathwayCard'

export const metadata: Metadata = {
  title: 'Programmes Offered | Department of Electrical & Electronic Engineering',
  description: 'Undergraduate B.Eng. in Electrical & Electronic Engineering and Postgraduate programmes at UniPort. Explore Power Systems vs Electronics & Telecommunications options.',
}

export default function ProgrammesPage() {
  return (
    <div className="bg-background min-h-screen">
      {/* Hero Banner */}
      <div className="bg-white border-b border-primary/10 py-16 lg:py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="inline-flex items-center gap-2 border border-primary/20 bg-amber-50 text-amber-900 px-3 py-1 rounded-sm text-xs font-bold tracking-wide mb-4 uppercase">
            <ShieldCheck size={14} className="text-amber-600" /> Fully Accredited by COREN &amp; NUC
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-primary mb-4 leading-tight">
            Academic Programmes Offered
          </h1>
          <p className="text-primary/75 text-lg max-w-3xl leading-relaxed font-sans mb-8">
            The Department of Electrical &amp; Electronic Engineering at the University of Port Harcourt provides rigorous, 
            industry-aligned engineering education designed to equip graduates with theoretical depth, hands-on laboratory mastery, 
            and global problem-solving capabilities.
          </p>

          <div className="flex flex-wrap gap-4 text-sm font-sans font-medium">
            <div className="flex items-center gap-2 bg-primary/5 px-3 py-1.5 rounded border border-primary/10 text-primary">
              <Award size={16} className="text-accent" /> Degree: B.Eng (Honours)
            </div>
            <div className="flex items-center gap-2 bg-primary/5 px-3 py-1.5 rounded border border-primary/10 text-primary">
              <Layers size={16} className="text-accent" /> Duration: 5 Years Standard
            </div>
            <div className="flex items-center gap-2 bg-primary/5 px-3 py-1.5 rounded border border-primary/10 text-primary">
              <Building size={16} className="text-accent" /> Department: Department of Electrical &amp; Electronic Engineering
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        
        {/* Core Degree Section */}
        <div className="mb-16">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <Badge variant="gold" className="mb-2 uppercase tracking-wider text-[11px]">Undergraduate Flagship</Badge>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-primary mb-3">
              Bachelor of Engineering (B.Eng.) in Electrical &amp; Electronic Engineering
            </h2>
            <p className="text-primary/70 text-sm sm:text-base font-sans leading-relaxed">
              In the final two years of study (Years 4 and 5), students select one of two specialized professional options, 
              tailoring their expertise to either heavy electrical power infrastructure or cutting-edge digital communications and electronic systems.
            </p>
          </div>

          {/* Options Comparison Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            
            {/* OPTION 1: Power Systems & Machines */}
            <Card className="p-8 border-2 border-amber-300/80 bg-white relative flex flex-col justify-between shadow-xs hover:border-amber-500 transition-colors">
              <div className="absolute top-0 right-0 bg-amber-500 text-slate-950 font-bold font-mono text-[11px] px-3 py-1 rounded-bl-md uppercase tracking-wider">
                Option Pathway A
              </div>

              <div>
                <div className="w-14 h-14 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 mb-6">
                  <Zap size={28} className="fill-amber-400 text-amber-600" />
                </div>

                <h3 className="text-2xl font-bold font-serif text-primary mb-2">
                  Power Systems &amp; Electrical Machines Option
                </h3>
                <p className="text-primary/75 text-sm font-sans mb-6 leading-relaxed">
                  Focuses on the generation, high-voltage transmission, distribution, and utilization of electrical energy, 
                  industrial electric drives, transformer architecture, switchgear protection, and modern smart renewable grids.
                </p>

                {/* Key Course Modules */}
                <div className="mb-6">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-primary/70 mb-3 flex items-center gap-1.5">
                    <BookOpen size={14} className="text-amber-600" /> Core Specialized Courses (400L &amp; 500L)
                  </h4>
                  <ul className="space-y-2 text-xs font-sans text-primary/85">
                    <li className="flex items-start gap-2 bg-primary/5 p-2 rounded">
                      <CheckCircle size={14} className="text-amber-600 shrink-0 mt-0.5" />
                      <span><strong>EEE 401 / 501:</strong> Power Systems Analysis, Stability &amp; Fault Calculations</span>
                    </li>
                    <li className="flex items-start gap-2 bg-primary/5 p-2 rounded">
                      <CheckCircle size={14} className="text-amber-600 shrink-0 mt-0.5" />
                      <span><strong>EEE 403 / 503:</strong> Electrical Machines Design, Induction &amp; Synchronous Systems</span>
                    </li>
                    <li className="flex items-start gap-2 bg-primary/5 p-2 rounded">
                      <CheckCircle size={14} className="text-amber-600 shrink-0 mt-0.5" />
                      <span><strong>EEE 505:</strong> High Voltage Engineering, Insulation &amp; Lightning Protection</span>
                    </li>
                    <li className="flex items-start gap-2 bg-primary/5 p-2 rounded">
                      <CheckCircle size={14} className="text-amber-600 shrink-0 mt-0.5" />
                      <span><strong>EEE 507:</strong> Switchgear, Protective Relaying &amp; Substation Automation</span>
                    </li>
                    <li className="flex items-start gap-2 bg-primary/5 p-2 rounded">
                      <CheckCircle size={14} className="text-amber-600 shrink-0 mt-0.5" />
                      <span><strong>EEE 509:</strong> Power Electronics, Inverters &amp; Renewable Energy Integration</span>
                    </li>
                  </ul>
                </div>

                {/* Laboratory Training */}
                <div className="mb-6">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-primary/70 mb-2 flex items-center gap-1.5">
                    <Laptop size={14} className="text-amber-600" /> Hands-on Laboratory Facilities
                  </h4>
                  <p className="text-xs text-primary/75 font-sans leading-relaxed">
                    Electrical Machines Testing Lab (dynamometer motor testing, winding analysis), High Voltage Safety Test Bay, 
                    and ETAP / MATLAB Power Flow Simulation Workstations.
                  </p>
                </div>
              </div>

              {/* Career Paths */}
              <div className="pt-6 border-t border-primary/10 mt-6">
                <span className="text-xs font-bold uppercase tracking-wider text-primary block mb-2">Career Trajectories:</span>
                <div className="flex flex-wrap gap-1.5">
                  {['TCN & Power Grid Operator', 'DISCO Distribution Engineer', 'Offshore Power Systems', 'Renewable Energy Consultant', 'Substation Design Engineer'].map((tag, i) => (
                    <span key={i} className="text-[11px] bg-amber-50 text-amber-900 border border-amber-200 px-2 py-0.5 rounded font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Card>

            {/* OPTION 2: Electronics & Telecommunications */}
            <Card className="p-8 border-2 border-blue-300/80 bg-white relative flex flex-col justify-between shadow-xs hover:border-blue-500 transition-colors">
              <div className="absolute top-0 right-0 bg-blue-600 text-white font-bold font-mono text-[11px] px-3 py-1 rounded-bl-md uppercase tracking-wider">
                Option Pathway B
              </div>

              <div>
                <div className="w-14 h-14 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700 mb-6">
                  <Radio size={28} className="text-blue-600" />
                </div>

                <h3 className="text-2xl font-bold font-serif text-primary mb-2">
                  Electronics &amp; Telecommunications Option
                </h3>
                <p className="text-primary/75 text-sm font-sans mb-6 leading-relaxed">
                  Focuses on modern cellular and wireless networks (4G/5G/6G), optical fiber communications, digital signal 
                  processing (DSP), embedded microcontrollers, IoT devices, robotics, and VLSI circuit architecture.
                </p>

                {/* Key Course Modules */}
                <div className="mb-6">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-primary/70 mb-3 flex items-center gap-1.5">
                    <BookOpen size={14} className="text-blue-600" /> Core Specialized Courses (400L &amp; 500L)
                  </h4>
                  <ul className="space-y-2 text-xs font-sans text-primary/85">
                    <li className="flex items-start gap-2 bg-primary/5 p-2 rounded">
                      <CheckCircle size={14} className="text-blue-600 shrink-0 mt-0.5" />
                      <span><strong>EEE 402 / 502:</strong> Advanced Digital Signal Processing (DSP) &amp; Filter Design</span>
                    </li>
                    <li className="flex items-start gap-2 bg-primary/5 p-2 rounded">
                      <CheckCircle size={14} className="text-blue-600 shrink-0 mt-0.5" />
                      <span><strong>EEE 404 / 504:</strong> Microwave Engineering, Waveguides &amp; Antennas</span>
                    </li>
                    <li className="flex items-start gap-2 bg-primary/5 p-2 rounded">
                      <CheckCircle size={14} className="text-blue-600 shrink-0 mt-0.5" />
                      <span><strong>EEE 506:</strong> Embedded Systems, FPGA Architecture &amp; Microcontroller Interfacing</span>
                    </li>
                    <li className="flex items-start gap-2 bg-primary/5 p-2 rounded">
                      <CheckCircle size={14} className="text-blue-600 shrink-0 mt-0.5" />
                      <span><strong>EEE 508:</strong> Optical Fiber Communication &amp; High-Speed Network Systems</span>
                    </li>
                    <li className="flex items-start gap-2 bg-primary/5 p-2 rounded">
                      <CheckCircle size={14} className="text-blue-600 shrink-0 mt-0.5" />
                      <span><strong>EEE 510:</strong> Cellular Mobile Communications &amp; Satellite Telemetry</span>
                    </li>
                  </ul>
                </div>

                {/* Laboratory Training */}
                <div className="mb-6">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-primary/70 mb-2 flex items-center gap-1.5">
                    <Laptop size={14} className="text-blue-600" /> Hands-on Laboratory Facilities
                  </h4>
                  <p className="text-xs text-primary/75 font-sans leading-relaxed">
                    Embedded Systems Lab (ESP32, ARM Cortex, STM32 development boards), RF &amp; Microwave Vector Network Analyzers, 
                    Logic Analyzers, and Circuit CAD PCB fabrication lab.
                  </p>
                </div>
              </div>

              {/* Career Paths */}
              <div className="pt-6 border-t border-primary/10 mt-6">
                <span className="text-xs font-bold uppercase tracking-wider text-primary block mb-2">Career Trajectories:</span>
                <div className="flex flex-wrap gap-1.5">
                  {['Telecom Infrastructure (MTN/Airtel)', 'Embedded Firmware Engineer', 'IoT System Architect', 'RF & Antenna Specialist', 'Robotics & Automation Developer'].map((tag, i) => (
                    <span key={i} className="text-[11px] bg-blue-50 text-blue-900 border border-blue-200 px-2 py-0.5 rounded font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Card>

          </div>
        </div>

        {/* 5-Year Curriculum Timeline */}
        <div className="mb-16 bg-white p-8 sm:p-10 rounded-xl border border-primary/10 shadow-xs">
          <div className="max-w-3xl mb-8">
            <Badge variant="neutral" className="mb-2 uppercase tracking-wider text-[11px]">Academic Pathway</Badge>
            <h3 className="text-2xl font-serif font-bold text-primary mb-2">5-Year Curriculum Progression</h3>
            <p className="text-primary/70 text-sm font-sans">
              From foundational natural sciences to the prestigious 6-month industrial internship (SIWES) and capstone design project.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="border border-primary/10 p-4 rounded-md bg-background flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold font-mono text-accent">YEAR 1 (100L)</span>
                <h4 className="font-bold text-primary text-base mt-1 mb-2">Foundations</h4>
                <p className="text-xs text-primary/70 leading-relaxed font-sans">
                  Calculus, University Physics, General Chemistry, Applied Mechanics &amp; Technical Drawing.
                </p>
              </div>
              <span className="mt-4 text-[11px] text-primary/50 font-medium">Faculty Common</span>
            </div>

            <div className="border border-primary/10 p-4 rounded-md bg-background flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold font-mono text-accent">YEAR 2 (200L)</span>
                <h4 className="font-bold text-primary text-base mt-1 mb-2">Core Principles</h4>
                <p className="text-xs text-primary/70 leading-relaxed font-sans">
                  Electric Circuit Theory I &amp; II, Basic Electronics, Thermodynamics, Engineering Workshop Practice &amp; SWEP.
                </p>
              </div>
              <span className="mt-4 text-[11px] text-primary/50 font-medium">SWEP Training</span>
            </div>

            <div className="border border-primary/10 p-4 rounded-md bg-background flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold font-mono text-accent">YEAR 3 (300L)</span>
                <h4 className="font-bold text-primary text-base mt-1 mb-2">Intermediate Dept</h4>
                <p className="text-xs text-primary/70 leading-relaxed font-sans">
                  Electromagnetic Field Theory, Electrical Machines I, Signals &amp; Systems, Microprocessors &amp; SIWES I.
                </p>
              </div>
              <span className="mt-4 text-[11px] text-amber-700 font-semibold">SIWES I Internship</span>
            </div>

            <div className="border border-primary/10 p-4 rounded-md bg-amber-50/50 border-amber-300 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold font-mono text-amber-800">YEAR 4 (400L)</span>
                <h4 className="font-bold text-primary text-base mt-1 mb-2">Specialization &amp; IT</h4>
                <p className="text-xs text-primary/70 leading-relaxed font-sans">
                  First semester coursework in chosen Option Pathway, followed by 6 months intensive Industry SIWES II.
                </p>
              </div>
              <span className="mt-4 text-[11px] text-amber-800 font-bold">6-Month SIWES II</span>
            </div>

            <div className="border border-primary/10 p-4 rounded-md bg-blue-50/50 border-blue-300 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold font-mono text-blue-800">YEAR 5 (500L)</span>
                <h4 className="font-bold text-primary text-base mt-1 mb-2">Capstone &amp; Degree</h4>
                <p className="text-xs text-primary/70 leading-relaxed font-sans">
                  Advanced option electives, engineering management, law &amp; economics, and Year-long B.Eng. Research Project.
                </p>
              </div>
              <span className="mt-4 text-[11px] text-blue-800 font-bold">B.Eng. Capstone</span>
            </div>
          </div>
        </div>

        {/* Postgraduate & Innovation Pathways (METI) */}
        <section aria-labelledby="meti-pathway-heading" className="mb-16">
          <MetiPathwayCard />
        </section>

        {/* Postgraduate Programmes & Admission Requirements */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          
          {/* Postgraduate Overview */}
          <Card className="p-8 bg-white">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded bg-primary/10 text-primary">
                <GraduationCap size={22} />
              </div>
              <div>
                <Badge variant="electric">Postgraduate Studies</Badge>
                <h3 className="text-xl font-serif font-bold text-primary">Advanced Engineering Degrees</h3>
              </div>
            </div>
            <p className="text-sm text-primary/75 font-sans mb-6 leading-relaxed">
              The Department offers vibrant postgraduate research environments for engineers looking to advance their careers, 
              publish pioneering findings, or transition into university academia.
            </p>
            <div className="space-y-3 font-sans text-sm">
              <div className="p-3 rounded border border-primary/10 bg-primary/5">
                <span className="font-bold text-primary block">Postgraduate Diploma (PGD) in EEE</span>
                <span className="text-xs text-primary/70">Conversion &amp; leveling programme for cognate science and polytechnic HND graduates (1.5 - 2 Years).</span>
              </div>
              <div className="p-3 rounded border border-primary/10 bg-primary/5">
                <span className="font-bold text-primary block">Master of Engineering (M.Eng.)</span>
                <span className="text-xs text-primary/70">Specializations in Power Systems, Control Engineering, or Telecommunications (18 - 24 Months).</span>
              </div>
              <div className="p-3 rounded border border-primary/10 bg-primary/5">
                <span className="font-bold text-primary block">Doctor of Philosophy (Ph.D.)</span>
                <span className="text-xs text-primary/70">Intensive independent research contributing novel engineering methodologies (3 - 5 Years).</span>
              </div>
            </div>
          </Card>

          {/* Admission Requirements */}
          <Card className="p-8 bg-white">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded bg-amber-100 text-amber-800">
                <CheckCircle size={22} />
              </div>
              <div>
                <Badge variant="gold">Entry Criteria</Badge>
                <h3 className="text-xl font-serif font-bold text-primary">Admission Requirements</h3>
              </div>
            </div>
            <div className="space-y-4 text-xs sm:text-sm font-sans text-primary/80">
              <div>
                <strong className="text-primary block font-semibold mb-1">1. UTME Entry (100 Level):</strong>
                <p className="text-primary/70 leading-relaxed">
                  Five (5) SSCE/WASSCE/NECO credit passes including English Language, Mathematics, Physics, Chemistry, 
                  and one other science subject (e.g., Further Mathematics or Technical Drawing) at not more than two sittings.
                  <br />
                  <span className="font-medium text-primary">UTME Subjects:</span> English, Mathematics, Physics, Chemistry.
                </p>
              </div>
              <div className="pt-3 border-t border-primary/10">
                <strong className="text-primary block font-semibold mb-1">2. Direct Entry (200 / 300 Level):</strong>
                <p className="text-primary/70 leading-relaxed">
                  Two A-Level passes in Mathematics and Physics, OR an Upper Credit in National Diploma (ND) / Higher National Diploma (HND) 
                  in Electrical/Electronic Engineering from a recognized institution.
                </p>
              </div>
              <div className="pt-3 border-t border-slate-200">
                <strong className="text-[#0A192F] block font-bold mb-1">3. Departmental Clearances:</strong>
                <p className="text-slate-600 leading-relaxed font-normal">
                  Admitted students complete departmental matriculation documentation and official student registration each session.
                </p>
              </div>
            </div>
          </Card>

        </div>

        {/* Action Callout */}
        <div className="bg-[#0A192F] text-white rounded-2xl p-8 sm:p-10 border border-blue-900/40 shadow-card relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-2xl relative z-10">
            <span className="bg-amber-500 text-slate-950 text-xs font-bold px-3 py-1 rounded-md uppercase tracking-wider inline-block mb-3">
              Department of Electrical &amp; Electronics Engineering
            </span>
            <h2 className="text-2xl sm:text-3xl text-white font-extrabold mb-2 tracking-tight">
              Ready to Explore Our Department?
            </h2>
            <p className="text-slate-300 text-sm font-sans leading-relaxed">
              Check out our qualified academic faculty directory, download official lecture timetables, 
              or pay your departmental dues to complete your session clearance.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0 relative z-10">
            <Link href="/staff" className="w-full sm:w-auto">
              <Button variant="gold" fullWidth className="font-bold">
                Staff Directory
              </Button>
            </Link>
            <Link href="/portal/dues" className="w-full sm:w-auto">
              <Button variant="primary" fullWidth className="font-bold">
                Pay Departmental Dues
              </Button>
            </Link>
          </div>
        </div>

      </div>
    </div>
  )
}
