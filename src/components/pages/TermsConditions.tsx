import { Scale, FileText, CheckCircle, ShieldCheck } from 'lucide-react';

export function TermsConditions() {
  return (
    <div className="max-w-4xl mx-auto space-y-10">
      <div className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200/80 shadow-xs space-y-6">
        <div>
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Legal Framework</span>
          <h1 className="font-serif-display text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mt-1">
            Terms & Conditions of Service
          </h1>
          <p className="text-xs text-slate-400 mt-1">Version 2.4.0 · Effective October 2026</p>
          <p className="text-sm text-slate-600 mt-3 leading-relaxed">
            By accessing or using OmniGrade’s academic calculators, embeddable widgets, or educational publications, you agree to comply with and be bound by the following terms and conditions.
          </p>
        </div>

        <div className="border-t border-slate-100 pt-6 space-y-6 text-sm text-slate-700 leading-relaxed">
          <section className="space-y-2">
            <h2 className="font-serif-display text-lg font-bold text-slate-900">
              1. Permitted Educational Fair Use
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              OmniGrade is provided free of charge for personal study planning, secondary school academic counseling, collegiate coursework modeling, and non-commercial educational instruction. You are welcome to print worksheets, share calculation summaries, and cite our mathematical reference models in syllabi or academic papers.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif-display text-lg font-bold text-slate-900">
              2. Embed Widget License
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              Educators, university department portals, and academic bloggers are granted a non-exclusive, revocable, royalty-free license to embed OmniGrade calculators via the provided iframe code snippet, subject to the condition that the embedded attribution backlink to OmniGrade remains intact and unmodified.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif-display text-lg font-bold text-slate-900">
              3. Intellectual Property Rights
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              All written academic guides, curriculum masterclasses, UI layout architectures, graphic visual assets, and custom mathematical formulas are the intellectual property of OmniGrade Academic Research Group and protected under applicable copyright laws. Unaltered automated scraping, commercial content spinning, or unauthorized bulk republication is strictly prohibited.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif-display text-lg font-bold text-slate-900">
              4. Limitation of Liability
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              OmniGrade is provided "as is" without warranties of any kind, whether express or implied. Under no circumstances shall OmniGrade, its contributors, or researchers be liable for any academic penalties, course failures, loss of scholarship funding, or graduation delays resulting from reliance upon calculations or editorial content.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
