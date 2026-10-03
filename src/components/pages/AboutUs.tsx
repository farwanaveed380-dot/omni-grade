import { ShieldCheck, BookOpen, Calculator, Award, Users, CheckCircle } from 'lucide-react';

export function AboutUs() {
  return (
    <div className="max-w-4xl mx-auto space-y-10">
      <div className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200/80 shadow-xs space-y-6">
        <div>
          <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">About OmniGrade</span>
          <h1 className="font-serif-display text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mt-1">
            Precision Academic Computation & Ethical Educational Infrastructure
          </h1>
          <p className="text-base text-slate-600 mt-3 leading-relaxed">
            OmniGrade was founded to eliminate ambiguity in academic progress tracking. We engineer free, mathematically rigorous, privacy-first grade calculators and educational resources for students, educators, and university academic advisors worldwide.
          </p>
        </div>

        <div className="border-t border-slate-100 pt-6 space-y-6 text-sm text-slate-700 leading-relaxed">
          <h2 className="font-serif-display text-xl font-bold text-slate-900">
            Our Origin & Pedagogical Philosophy
          </h2>
          <p>
            Modern syllabus architecture has evolved dramatically. Simple raw-point gradebooks have been largely supplanted by multi-tiered weighted systems, differential exam weighting, dropped assessment rules, and quality point multipliers. While these frameworks encourage nuanced learning assessments, they frequently leave students guessing about their actual standing until final letter grades appear on official transcripts.
          </p>
          <p>
            When students do not understand their exact standing, cognitive stress increases and study hours are misallocated. OmniGrade bridges this gap by providing transparent, client-side calculation engines that allow students to model target grades with mathematical certainty.
          </p>
        </div>

        {/* 4 Pillars of Excellence */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
          <div className="p-5 bg-slate-50 rounded-xl border border-slate-100 space-y-2">
            <div className="flex items-center gap-2 text-indigo-600 font-bold text-sm">
              <Calculator className="w-4 h-4" />
              <span>Mathematical Transparency</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every formula is published openly with step-by-step arithmetic proofs. We do not use proprietary black boxes or hidden rounding tricks.
            </p>
          </div>

          <div className="p-5 bg-slate-50 rounded-xl border border-slate-100 space-y-2">
            <div className="flex items-center gap-2 text-indigo-600 font-bold text-sm">
              <ShieldCheck className="w-4 h-4" />
              <span>Zero-Telemetry Privacy Stance</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              All calculations run 100% inside your local web browser. Student grades, course names, and GPA records never touch an external server or database.
            </p>
          </div>

          <div className="p-5 bg-slate-50 rounded-xl border border-slate-100 space-y-2">
            <div className="flex items-center gap-2 text-indigo-600 font-bold text-sm">
              <BookOpen className="w-4 h-4" />
              <span>Rigorous Editorial Standards</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Our 20+ academic guides are researched, written, and peer-reviewed by former university academic deans, admissions advisors, and mathematics faculty.
            </p>
          </div>

          <div className="p-5 bg-slate-50 rounded-xl border border-slate-100 space-y-2">
            <div className="flex items-center gap-2 text-indigo-600 font-bold text-sm">
              <Award className="w-4 h-4" />
              <span>Open Educational Fair Use</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              We empower instructors and secondary schools to embed our interactive tools directly on their course portals, Canvas, or syllabi free of charge.
            </p>
          </div>
        </div>

        {/* Editorial Board */}
        <div className="border-t border-slate-100 pt-8 space-y-4">
          <h2 className="font-serif-display text-xl font-bold text-slate-900">
            Our Academic Advisory & Editorial Team
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-white border border-slate-200 rounded-xl">
              <div className="font-bold text-sm text-slate-900">Dr. Marcus Vance</div>
              <div className="text-xs text-indigo-600 font-medium">Senior Academic Advisor & Quantitative Researcher</div>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Specializes in collegiate credit inertia, Satisfactory Academic Progress (SAP) recovery modeling, and syllabus grading distribution analytics.
              </p>
            </div>
            <div className="p-4 bg-white border border-slate-200 rounded-xl">
              <div className="font-bold text-sm text-slate-900">Prof. Elena Rostova</div>
              <div className="text-xs text-indigo-600 font-medium">Department Chair of Applied Mathematics</div>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Leads curriculum research into grading curve mechanics, statistical normalization, and peer evaluation matrices for collaborative STEM capstones.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
