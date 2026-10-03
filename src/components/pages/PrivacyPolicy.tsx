import { ShieldCheck, Lock, EyeOff, Server, HardDrive, CheckCircle } from 'lucide-react';

export function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto space-y-10">
      <div className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200/80 shadow-xs space-y-6">
        <div>
          <span className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">Privacy & Data Governance</span>
          <h1 className="font-serif-display text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mt-1">
            Privacy Policy & Student Data Protection
          </h1>
          <p className="text-xs text-slate-400 mt-1">Effective Date: October 2026 · Version 2.4.0</p>
          <p className="text-sm text-slate-600 mt-3 leading-relaxed">
            OmniGrade is built upon a fundamental architectural commitment: student grades, course titles, test scores, and academic projections are private educational records that must never be monitored, monetized, or stored on remote servers.
          </p>
        </div>

        {/* Core Privacy Highlight Box */}
        <div className="p-5 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-start gap-4">
          <ShieldCheck className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h2 className="font-serif-display text-sm font-bold text-emerald-950">
              100% Client-Side Computation Architecture
            </h2>
            <p className="text-xs text-emerald-800 leading-relaxed">
              When you enter an assignment score, syllabus weight, or GPA course into OmniGrade, all mathematical operations execute strictly inside your local web browser’s JavaScript memory runtime. No grade data is ever transmitted across the internet to our servers or any third-party advertising network.
            </p>
          </div>
        </div>

        <div className="border-t border-slate-100 pt-6 space-y-6 text-sm text-slate-700 leading-relaxed">
          <section className="space-y-2">
            <h2 className="font-serif-display text-lg font-bold text-slate-900">
              1. Compliance with Federal & International Educational Standards
            </h2>
            <p>
              OmniGrade complies with the strict standards set forth by:
            </p>
            <ul className="space-y-1.5 text-xs text-slate-600 pl-4 list-disc marker:text-emerald-600">
              <li>
                <strong>FERPA (Family Educational Rights and Privacy Act):</strong> Because OmniGrade does not collect, record, or maintain student education records or Personally Identifiable Information (PII), student privacy is preserved in accordance with federal statutory benchmarks.
              </li>
              <li>
                <strong>COPPA (Children’s Online Privacy Protection Act):</strong> Our calculation tools do not knowingly collect personal information from individuals under the age of 13.
              </li>
              <li>
                <strong>GDPR (General Data Protection Regulation):</strong> We adhere to principles of privacy by design and extreme data minimization.
              </li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif-display text-lg font-bold text-slate-900">
              2. Local Storage (Client-Side Persistence)
            </h2>
            <p>
              To improve usability so that you do not need to re-type your course assignments every time you refresh your browser, OmniGrade utilizes the standard HTML5 <code className="text-xs font-data-mono bg-slate-100 px-1.5 py-0.5 rounded">localStorage</code> API.
            </p>
            <p className="text-xs text-slate-600">
              This data resides entirely on your device’s physical storage. You can delete this stored data at any time by clicking "Reset" inside the calculators or by clearing your browser cache.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif-display text-lg font-bold text-slate-900">
              3. Cookies and Tracking Technologies
            </h2>
            <p className="text-xs text-slate-600">
              OmniGrade does not use tracking cookies to build personal student dossiers or sell behavioral profiles. Standard anonymous technical session headers (such as server error diagnostics or CDN delivery metrics) may be monitored strictly to maintain infrastructure uptime and prevent denial-of-service abuse.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif-display text-lg font-bold text-slate-900">
              4. External Links and Embeddable Widgets
            </h2>
            <p className="text-xs text-slate-600">
              When an educator embeds OmniGrade using our official iframe snippet, the embedded calculation frame adheres to the exact same zero-telemetry client-side privacy safeguards described in this policy.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
