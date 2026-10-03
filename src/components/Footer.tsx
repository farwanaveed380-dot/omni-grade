import { PageView } from '../types';
import { ShieldCheck, BookOpen, Lock, Sparkles, Printer, Code, Share2 } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageView) => void;
  onOpenEmbed: () => void;
  onOpenCitation: () => void;
  onOpenPrint: () => void;
}

export function Footer({ onNavigate, onOpenEmbed, onOpenCitation, onOpenPrint }: FooterProps) {
  const handleNav = (page: PageView) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 text-sm">
      {/* Trust & Ethics Banner */}
      <div className="border-b border-slate-800/80 bg-slate-950/60 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>100% Client-Side Computing: Zero grade data or student records are ever transmitted or stored on remote servers.</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>FERPA Compliant</span>
            <span aria-hidden="true">·</span>
            <span>COPPA Safe</span>
            <span aria-hidden="true">·</span>
            <span>GDPR Aligned</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Col 1: Brand & Purpose */}
          <div className="space-y-4">
            <span className="font-serif-display text-xl font-bold text-white tracking-tight">
              OmniGrade
            </span>
            <p className="text-xs text-slate-400 leading-relaxed">
              Precision academic calculation tools engineered for university undergraduates, high school scholars, and faculty. Transparent algebraic models with zero tracking.
            </p>
            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={onOpenEmbed}
                className="inline-flex items-center gap-2 text-xs text-indigo-400 hover:text-indigo-300 transition-colors cursor-pointer"
              >
                <Code className="w-3.5 h-3.5" />
                <span>Embed free calculator on your school site</span>
              </button>
              <button
                onClick={onOpenPrint}
                className="inline-flex items-center gap-2 text-xs text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Printable syllabus & GPA worksheet</span>
              </button>
            </div>
          </div>

          {/* Col 2: Academic Calculators */}
          <div>
            <h3 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">
              Academic Calculators
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => handleNav('weighted')} className="hover:text-white transition-colors cursor-pointer">
                  Weighted Grade Calculator
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('final')} className="hover:text-white transition-colors cursor-pointer">
                  Final Exam Target Calculator
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('gpa')} className="hover:text-white transition-colors cursor-pointer">
                  College & High School GPA Tool
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('converter')} className="hover:text-white transition-colors cursor-pointer">
                  Letter Grade & Scale Converter
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('curve')} className="hover:text-white transition-colors cursor-pointer">
                  Grade Curve Visualizer & Stats
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Academic Guides & SEO Topic Clusters */}
          <div>
            <h3 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">
              Educational Guides
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => handleNav('guides')} className="hover:text-white transition-colors cursor-pointer">
                  All 20+ Academic Knowledge Base Guides
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('guides')} className="hover:text-white transition-colors cursor-pointer">
                  Weighted Syllabus Mathematics
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('guides')} className="hover:text-white transition-colors cursor-pointer">
                  Final Exam Required Score Formula
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('guides')} className="hover:text-white transition-colors cursor-pointer">
                  Cumulative Quality Points Model
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('guides')} className="hover:text-white transition-colors cursor-pointer">
                  How Instructors Curve Class Exams
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Trust & Compliance (Essential Pages Required by User) */}
          <div>
            <h3 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">
              Trust & Legal
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => handleNav('about')} className="hover:text-white transition-colors cursor-pointer">
                  About Us & Editorial Standards
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('contact')} className="hover:text-white transition-colors cursor-pointer">
                  Contact Us & Feedback
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('privacy')} className="hover:text-white transition-colors cursor-pointer">
                  Privacy Policy (Zero Data Retention)
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('disclaimer')} className="hover:text-white transition-colors cursor-pointer">
                  Academic & Rounding Disclaimer
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('terms')} className="hover:text-white transition-colors cursor-pointer">
                  Terms & Conditions of Service
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 OmniGrade Academic Suite. All rights reserved. Mathematical algorithms verified against standard university registrars.</p>
          <div className="flex items-center gap-4">
            <button onClick={onOpenCitation} className="hover:text-slate-300 transition-colors cursor-pointer">
              Cite in Paper / Syllabus
            </button>
            <span aria-hidden="true">·</span>
            <button onClick={() => handleNav('privacy')} className="hover:text-slate-300 transition-colors cursor-pointer">
              Privacy
            </button>
            <span aria-hidden="true">·</span>
            <button onClick={() => handleNav('terms')} className="hover:text-slate-300 transition-colors cursor-pointer">
              Terms
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
