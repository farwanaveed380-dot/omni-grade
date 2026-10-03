import { ShieldCheck, Lock, EyeOff, Server, HardDrive, Cookie, ExternalLink } from 'lucide-react';

export function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto space-y-10">
      <div className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200/80 shadow-xs space-y-6">
        <div>
          <span className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">Privacy & Data Governance</span>
          <h1 className="font-serif-display text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mt-1">
            Privacy Policy & AdSense Disclosure
          </h1>
          <p className="text-xs text-slate-400 mt-1">Effective Date: October 2026 · Complies with Google AdSense, GDPR, CCPA & FERPA</p>
          <p className="text-sm text-slate-600 mt-3 leading-relaxed">
            At OmniGrade (accessible from https://omnigrade.org), one of our main priorities is the privacy of our visitors. This Privacy Policy document outlines the types of information collected and recorded by OmniGrade, how we use it, our third-party advertising disclosures (including Google AdSense), and our client-side computing security guarantees.
          </p>
        </div>

        {/* Core Privacy Highlight Box */}
        <div className="p-5 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-start gap-4">
          <ShieldCheck className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h2 className="font-serif-display text-sm font-bold text-emerald-950">
              100% Client-Side Computing Architecture
            </h2>
            <p className="text-xs text-emerald-800 leading-relaxed">
              When you enter assignment scores, weights, or GPA course titles into OmniGrade, all mathematical calculations execute strictly inside your local browser’s JavaScript engine. No student academic records or grades are transmitted, collected, or stored on our servers.
            </p>
          </div>
        </div>

        <div className="border-t border-slate-100 pt-6 space-y-6 text-sm text-slate-700 leading-relaxed">
          
          {/* AdSense Mandatory Section */}
          <section className="space-y-3 bg-slate-50 p-5 rounded-xl border border-slate-200">
            <div className="flex items-center gap-2">
              <Cookie className="w-4 h-4 text-indigo-600" />
              <h2 className="font-serif-display text-base font-bold text-slate-900">
                1. Google AdSense & Third-Party Advertising Cookies
              </h2>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              OmniGrade may display third-party advertisements delivered by Google AdSense and other advertising networks to support our free educational services. Please note the following mandatory advertising disclosures:
            </p>
            <ul className="space-y-2 text-xs text-slate-600 pl-4 list-disc marker:text-indigo-600">
              <li>
                <strong>Third-Party Vendors & Cookies:</strong> Third-party vendors, including Google, use cookies to serve advertisements based on a user’s prior visits to OmniGrade or other websites across the Internet.
              </li>
              <li>
                <strong>DoubleClick DART Cookie:</strong> Google’s use of advertising cookies (such as the DART cookie) enables Google and its partners to serve targeted ads to our users based on their visits to our site and/or other sites on the web.
              </li>
              <li>
                <strong>Opting Out of Personalized Advertising:</strong> Users may opt out of personalized advertising by visiting Google Ads Settings at{' '}
                <a
                  href="https://www.google.com/settings/ads"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:text-indigo-800 underline inline-flex items-center gap-0.5"
                >
                  <span>Google Ads Settings</span>
                  <ExternalLink className="w-3 h-3" />
                </a>.
              </li>
              <li>
                <strong>Network Advertising Initiative (NAI):</strong> Alternatively, users can opt out of a third-party vendor’s use of cookies for personalized advertising by visiting the Digital Advertising Alliance Consumer Choice page at{' '}
                <a
                  href="https://www.aboutads.info/choices/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:text-indigo-800 underline inline-flex items-center gap-0.5"
                >
                  <span>www.aboutads.info</span>
                  <ExternalLink className="w-3 h-3" />
                </a>{' '}
                or the Network Advertising Initiative opt-out page at{' '}
                <a
                  href="https://optout.networkadvertising.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:text-indigo-800 underline inline-flex items-center gap-0.5"
                >
                  <span>optout.networkadvertising.org</span>
                  <ExternalLink className="w-3 h-3" />
                </a>.
              </li>
            </ul>
          </section>

          {/* Log Files Section */}
          <section className="space-y-2">
            <h2 className="font-serif-display text-lg font-bold text-slate-900">
              2. Standard Log Files & Analytics
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              OmniGrade follows a standard procedure of utilizing server log files. These files log visitors when they access websites. The information collected by log files includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of this information is for analyzing trends, administering the site, tracking users’ aggregate movement on the website, and gathering demographic information to ensure website stability.
            </p>
          </section>

          {/* LocalStorage Section */}
          <section className="space-y-2">
            <h2 className="font-serif-display text-lg font-bold text-slate-900">
              3. HTML5 Local Storage (Client-Side Preference Saving)
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              To enhance your user experience and prevent data loss when you refresh or navigate between calculator tools, OmniGrade stores your entered coursework data locally in your browser using standard HTML5 <code className="text-xs font-data-mono bg-slate-100 px-1 rounded">localStorage</code>. This data never leaves your personal device. You can purge all stored records at any moment by clicking "Reset" inside any calculator or clearing your browser cache.
            </p>
          </section>

          {/* CCPA Privacy Rights */}
          <section className="space-y-2">
            <h2 className="font-serif-display text-lg font-bold text-slate-900">
              4. CCPA Privacy Rights (Do Not Sell My Personal Information)
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              Under the California Consumer Privacy Act (CCPA), California consumers have specific rights regarding their personal data:
            </p>
            <ul className="space-y-1.5 text-xs text-slate-600 pl-4 list-disc marker:text-emerald-600">
              <li>Request disclosure of the categories and specific pieces of personal data collected about consumers.</li>
              <li>Request deletion of any personal data collected by the business.</li>
              <li>Request that a business that sells a consumer’s personal data not sell the consumer’s personal data. <em>(OmniGrade does not sell personal information under any circumstances.)</em></li>
            </ul>
          </section>

          {/* GDPR Data Protection Rights */}
          <section className="space-y-2">
            <h2 className="font-serif-display text-lg font-bold text-slate-900">
              5. GDPR Data Protection Rights
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              We ensure that you are fully aware of all of your data protection rights under the General Data Protection Regulation (GDPR). Every European Economic Area (EEA) and UK user is entitled to: the right to access, the right to rectification, the right to erasure, the right to restrict processing, the right to object to processing, and the right to data portability. To exercise any of these rights, contact our Data Protection Officer at privacy@omnigrade.org.
            </p>
          </section>

          {/* Children's Privacy (COPPA & FERPA) */}
          <section className="space-y-2">
            <h2 className="font-serif-display text-lg font-bold text-slate-900">
              6. Children's Privacy & Educational FERPA Alignment
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              Protecting children while using the internet is especially paramount. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity. OmniGrade does not knowingly collect any Personal Identifiable Information from children under the age of 13. Furthermore, because no student academic records are stored or transmitted across our infrastructure, educational institutions can recommend OmniGrade in full alignment with FERPA guidelines.
            </p>
          </section>

          {/* Contact for Privacy Inquiries */}
          <section className="space-y-2 pt-4 border-t border-slate-100">
            <h2 className="font-serif-display text-base font-bold text-slate-900">
              7. Contacting Our Privacy Officer
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              If you have additional questions or require more information about our Privacy Policy or AdSense data compliance, do not hesitate to contact us at <strong>privacy@omnigrade.org</strong> or via our official <a href="#contact" className="text-indigo-600 underline">Contact Page</a>.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}
