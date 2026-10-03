import { AlertTriangle, Scale, BookOpen, ShieldAlert } from 'lucide-react';

export function Disclaimer() {
  return (
    <div className="max-w-4xl mx-auto space-y-10">
      <div className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200/80 shadow-xs space-y-6">
        <div>
          <span className="text-xs font-semibold text-amber-600 uppercase tracking-wider">Legal & Academic Notice</span>
          <h1 className="font-serif-display text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mt-1">
            Academic & Calculation Disclaimer
          </h1>
          <p className="text-xs text-slate-400 mt-1">Last Updated: October 2026</p>
          <p className="text-sm text-slate-600 mt-3 leading-relaxed">
            Please review this academic disclaimer regarding calculation models, rounding variations, and institutional registrar authority before relying on estimations for official academic decisions.
          </p>
        </div>

        {/* Notice Card */}
        <div className="p-5 bg-amber-50 rounded-2xl border border-amber-100 flex items-start gap-4">
          <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h2 className="font-serif-display text-sm font-bold text-amber-950">
              Unofficial Planning & Estimation Tool
            </h2>
            <p className="text-xs text-amber-900/90 leading-relaxed">
              OmniGrade provides mathematical models and educational estimates for student self-assessment and academic planning purposes only. It is not an official university registrar ledger, student information system (SIS), or binding academic transcript.
            </p>
          </div>
        </div>

        <div className="border-t border-slate-100 pt-6 space-y-6 text-sm text-slate-700 leading-relaxed">
          <section className="space-y-2">
            <h2 className="font-serif-display text-lg font-bold text-slate-900">
              1. Institutional & Syllabus Policy Variances
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              While our mathematical formulas mirror standard collegiate and secondary school grading logic, each educational institution, department, and individual instructor maintains complete sovereign autonomy to establish unique grading criteria. Policies regarding grade curves, extra credit caps, minimum exam score requirements to pass, and grade drop rules vary widely.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif-display text-lg font-bold text-slate-900">
              2. Rounding Discrepancies and Truncation
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              Calculations displayed on OmniGrade are typically rounded to two decimal places for visual legibility. However, institutional gradebook software (such as Canvas, Blackboard, or Banner) may calculate internal floating-point values out to six or eight decimal places or implement specific truncation rules. Consequently, borderline scores (such as an 89.49% or 89.98%) may produce different letter grades depending on your instructor’s individual rounding policy.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif-display text-lg font-bold text-slate-900">
              3. Financial Aid, Scholarships, and Degree Certification
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              Do not make irreversible academic decisions—such as dropping a course, declining a prerequisite retake, or committing to financial aid loan obligations—solely based on online calculations. Always verify your official cumulative GPA, attempted credit totals, and degree audit with your certified college academic advisor or university registrar’s office.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
