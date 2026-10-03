import { useState } from 'react';
import { X, Check, Copy, Share2, BookOpen } from 'lucide-react';

interface AcademicCitationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AcademicCitationModal({ isOpen, onClose }: AcademicCitationModalProps) {
  const [format, setFormat] = useState<'apa' | 'mla' | 'chicago' | 'harvard'>('apa');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const citations = {
    apa: `OmniGrade Academic Research Group. (2026). OmniGrade: Weighted grade calculator, final exam predictor, and collegiate GPA calculation suite (Version 2.4.0) [Web software]. https://omnigrade.org`,
    mla: `OmniGrade Academic Research Group. "OmniGrade: Weighted Grade Calculator & GPA Suite." OmniGrade, 2026, https://omnigrade.org. Accessed 3 Oct. 2026.`,
    chicago: `OmniGrade Academic Research Group. 2026. "OmniGrade: Weighted Grade Calculator and GPA Suite." Version 2.4.0. https://omnigrade.org.`,
    harvard: `OmniGrade Academic Research Group, 2026. OmniGrade: Weighted grade calculator and collegiate GPA suite. Available at: <https://omnigrade.org> [Accessed 3 October 2026].`
  };

  const activeCitation = citations[format];

  const handleCopy = () => {
    navigator.clipboard.writeText(activeCitation);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-xl border border-slate-200 space-y-6 relative">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Share2 className="w-5 h-5 text-indigo-600" />
            <h2 className="font-serif-display text-xl font-bold text-slate-900">
              Cite OmniGrade in Papers or Syllabi
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed">
          If you are referencing OmniGrade’s mathematical algorithms, syllabus weighting methodology, or GPA calculations in an academic paper, course syllabus, or research report, select your citation style below:
        </p>

        {/* Style Selector Tabs */}
        <div className="flex p-1 bg-slate-100 rounded-lg text-xs font-medium">
          {(['apa', 'mla', 'chicago', 'harvard'] as const).map((style) => (
            <button
              key={style}
              onClick={() => setFormat(style)}
              className={`flex-1 py-1.5 rounded-md uppercase tracking-wider transition-colors cursor-pointer ${
                format === style ? 'bg-white text-indigo-700 font-semibold shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {style}
            </button>
          ))}
        </div>

        {/* Citation Box */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="font-semibold text-slate-700">Formatted Citation ({format.toUpperCase()}):</span>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 font-semibold text-indigo-600 hover:text-indigo-700 cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied Citation!' : 'Copy'}</span>
            </button>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 leading-relaxed font-sans select-all">
            {activeCitation}
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg cursor-pointer"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
}
