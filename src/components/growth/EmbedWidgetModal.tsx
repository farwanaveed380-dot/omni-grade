import { useState } from 'react';
import { X, Check, Copy, Code2, ExternalLink } from 'lucide-react';

interface EmbedWidgetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function EmbedWidgetModal({ isOpen, onClose }: EmbedWidgetModalProps) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [calculatorType, setCalculatorType] = useState<'weighted' | 'final' | 'gpa'>('weighted');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const embedCode = `<!-- OmniGrade Academic Calculator Widget -->
<iframe 
  src="https://omnigrade.org/embed/${calculatorType}?theme=${theme}" 
  width="100%" 
  height="600" 
  frameborder="0" 
  style="border: 1px solid #e2e8f0; border-radius: 12px; max-width: 800px;" 
  title="OmniGrade Academic Calculator">
</iframe>
<p style="font-size: 11px; color: #64748b; margin-top: 4px; font-family: sans-serif;">
  Powered by <a href="https://omnigrade.org" target="_blank" rel="noopener" style="color: #4f46e5; text-decoration: underline;">OmniGrade Academic Calculator Suite</a>
</p>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(embedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-xl border border-slate-200 space-y-6 relative max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Code2 className="w-5 h-5 text-indigo-600" />
            <h2 className="font-serif-display text-xl font-bold text-slate-900">
              Embed Calculator on Your Website
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
          Educators, high school advisors, tutoring centers, and student portals are free to embed OmniGrade’s calculators on their websites or Learning Management Systems (Canvas, Blackboard, Google Sites) at zero cost.
        </p>

        {/* Configuration Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="font-semibold text-slate-700 block mb-1">Calculator Tool:</label>
            <select
              value={calculatorType}
              onChange={(e) => setCalculatorType(e.target.value as any)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            >
              <option value="weighted">Weighted Grade Calculator</option>
              <option value="final">Final Exam Required Score Tool</option>
              <option value="gpa">College & High School GPA Calculator</option>
            </select>
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">Color Theme:</label>
            <div className="flex gap-2">
              <button
                onClick={() => setTheme('light')}
                className={`flex-1 py-2 rounded-lg border font-medium cursor-pointer transition-colors ${
                  theme === 'light' ? 'bg-indigo-50 border-indigo-200 text-indigo-700' : 'border-slate-200 text-slate-600'
                }`}
              >
                Clean Light
              </button>
              <button
                onClick={() => setTheme('dark')}
                className={`flex-1 py-2 rounded-lg border font-medium cursor-pointer transition-colors ${
                  theme === 'dark' ? 'bg-slate-900 border-slate-900 text-white' : 'border-slate-200 text-slate-600'
                }`}
              >
                Deep Slate
              </button>
            </div>
          </div>
        </div>

        {/* Code Snippet Box */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="font-semibold text-slate-700">HTML Embed Snippet (Copy & Paste):</span>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 font-semibold text-indigo-600 hover:text-indigo-700 cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied to Clipboard!' : 'Copy Code'}</span>
            </button>
          </div>
          
          <pre className="p-4 bg-slate-950 text-slate-200 text-xs font-data-mono rounded-xl overflow-x-auto border border-slate-800 leading-relaxed">
            {embedCode}
          </pre>
        </div>

        {/* Attribution & Backlink Policy Note */}
        <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 text-[11px] text-slate-500 space-y-1">
          <div className="font-semibold text-slate-700">Embed License & Attribution:</div>
          <p>
            This widget is licensed under Educational Creative Commons. The embedded footer link provides attribution to OmniGrade’s mathematical engine. No telemetry or student information is collected through embedded frames.
          </p>
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
