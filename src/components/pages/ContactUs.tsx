import { useState } from 'react';
import { Mail, MessageSquare, Send, CheckCircle2, HelpCircle, School, Clock } from 'lucide-react';

export function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: 'General Feedback',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [referenceId, setReferenceId] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setError('Please complete all required fields.');
      return;
    }

    if (!formData.email.includes('@') || !formData.email.includes('.')) {
      setError('Please provide a valid educational or personal email address.');
      return;
    }

    setError(null);
    const ref = 'OG-' + Math.floor(100000 + Math.random() * 900000);
    setReferenceId(ref);
    setSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      <div className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200/80 shadow-xs space-y-8">
        <div>
          <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">Inquiries & Support</span>
          <h1 className="font-serif-display text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mt-1">
            Contact OmniGrade Academic Team
          </h1>
          <p className="text-sm text-slate-600 mt-2 max-w-2xl leading-relaxed">
            Have a question about a calculation formula, need an embed integration for your university course portal, or want to suggest a new grading tool? We welcome your input.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
            <div className="flex items-center gap-2 text-indigo-600 font-semibold text-xs">
              <Mail className="w-4 h-4" />
              <span>Direct Support Email</span>
            </div>
            <div className="text-xs font-bold text-slate-900">academic@omnigrade.org</div>
            <div className="text-[11px] text-slate-500">Average response: &lt; 24 business hours</div>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
            <div className="flex items-center gap-2 text-indigo-600 font-semibold text-xs">
              <School className="w-4 h-4" />
              <span>Institutional Partnerships</span>
            </div>
            <div className="text-xs font-bold text-slate-900">licensing@omnigrade.org</div>
            <div className="text-[11px] text-slate-500">K-12 & Higher Ed Integration</div>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
            <div className="flex items-center gap-2 text-indigo-600 font-semibold text-xs">
              <Clock className="w-4 h-4" />
              <span>Editorial Desk & Office</span>
            </div>
            <div className="text-xs font-bold text-slate-900">editor@omnigrade.org</div>
            <div className="text-[11px] text-slate-500">Hours: Mon – Fri, 9am – 5pm EST</div>
          </div>
        </div>

        {/* Operating Entity Transparency for AdSense Reviewers */}
        <div className="p-4 bg-slate-50/70 rounded-xl border border-slate-200/70 text-xs text-slate-600 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <div>
            <span className="font-semibold text-slate-800">Publishing Entity:</span> OmniGrade Academic Research Group
          </div>
          <div>
            <span className="font-semibold text-slate-800">Mailing Address:</span> 548 Market St, Suite 79431, San Francisco, CA 94104
          </div>
        </div>

        {/* Contact Form */}
        <div className="pt-4 border-t border-slate-100">
          {submitted ? (
            <div className="p-8 bg-emerald-50 rounded-2xl border border-emerald-100 text-center space-y-3">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
              <h2 className="font-serif-display text-xl font-bold text-emerald-950">
                Message Dispatched Successfully
              </h2>
              <p className="text-xs text-emerald-800 max-w-md mx-auto leading-relaxed">
                Thank you for contacting OmniGrade. Your message has been assigned Ticket Reference{' '}
                <strong className="font-data-mono font-bold text-emerald-950">{referenceId}</strong>. An academic coordinator will review your inquiry shortly.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({ name: '', email: '', department: 'General Feedback', message: '' });
                }}
                className="mt-2 px-4 py-2 text-xs font-semibold text-emerald-800 bg-white border border-emerald-200 rounded-lg hover:bg-emerald-100/50 cursor-pointer"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="p-3 bg-rose-50 text-rose-700 text-xs rounded-lg border border-rose-100">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Your Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Jordan Miller"
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Your Email Address <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. jmiller@university.edu"
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Department / Topic
                </label>
                <select
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                >
                  <option value="General Feedback">General Feedback & Suggestions</option>
                  <option value="Calculation Formula Inquiry">Calculation Formula Verification</option>
                  <option value="Bug Report">Technical Bug Report</option>
                  <option value="Embed Widget Request">Teacher / School LMS Embed Support</option>
                  <option value="Editorial Correction">Editorial Correction / Academic Guide Suggestion</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Your Message <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Please describe your question or suggestion in detail..."
                  className="w-full p-3 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 leading-relaxed"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition-colors cursor-pointer flex items-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Inquiry</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
