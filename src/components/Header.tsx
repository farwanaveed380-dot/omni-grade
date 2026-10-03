import { useState } from 'react';
import { PageView } from '../types';
import { Calculator, BookOpen, Code2, Menu, X, Share2 } from 'lucide-react';

interface HeaderProps {
  activePage: PageView;
  onNavigate: (page: PageView) => void;
  onOpenEmbed: () => void;
  onOpenCitation: () => void;
}

export function Header({ activePage, onNavigate, onOpenEmbed, onOpenCitation }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (page: PageView) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Zone 1: Brand title, single line text element */}
        <button 
          onClick={() => handleNavClick('weighted')} 
          className="text-left font-serif-display text-xl font-bold tracking-tight text-slate-900 hover:text-indigo-600 transition-colors cursor-pointer"
        >
          OmniGrade
        </button>

        {/* Zone 2: 4-6 text navigation links, 1-2 word labels, single-line */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
          <button
            onClick={() => handleNavClick('weighted')}
            className={`transition-colors whitespace-nowrap cursor-pointer hover:text-slate-900 ${
              activePage === 'weighted' ? 'text-indigo-600 font-semibold' : ''
            }`}
          >
            Weighted Grade
          </button>

          <button
            onClick={() => handleNavClick('final')}
            className={`transition-colors whitespace-nowrap cursor-pointer hover:text-slate-900 ${
              activePage === 'final' ? 'text-indigo-600 font-semibold' : ''
            }`}
          >
            Final Exam
          </button>

          <button
            onClick={() => handleNavClick('gpa')}
            className={`transition-colors whitespace-nowrap cursor-pointer hover:text-slate-900 ${
              activePage === 'gpa' ? 'text-indigo-600 font-semibold' : ''
            }`}
          >
            GPA Tool
          </button>

          <button
            onClick={() => handleNavClick('converter')}
            className={`transition-colors whitespace-nowrap cursor-pointer hover:text-slate-900 ${
              activePage === 'converter' ? 'text-indigo-600 font-semibold' : ''
            }`}
          >
            Scale Converter
          </button>

          <button
            onClick={() => handleNavClick('curve')}
            className={`transition-colors whitespace-nowrap cursor-pointer hover:text-slate-900 ${
              activePage === 'curve' ? 'text-indigo-600 font-semibold' : ''
            }`}
          >
            Curve Tool
          </button>

          <button
            onClick={() => handleNavClick('guides')}
            className={`transition-colors whitespace-nowrap cursor-pointer hover:text-slate-900 ${
              activePage === 'guides' || activePage === 'guide-detail' ? 'text-indigo-600 font-semibold' : ''
            }`}
          >
            Guides & Articles
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={onOpenCitation}
            title="Cite this tool (APA, MLA, Harvard)"
            className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Cite Tool</span>
          </button>

          <button
            onClick={onOpenEmbed}
            className="px-3.5 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5"
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Embed Widget</span>
          </button>
        </div>

        {/* Mobile menu hamburger toggle */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={onOpenEmbed}
            aria-label="Embed Widget"
            className="p-1.5 text-slate-700 bg-slate-100 rounded-lg"
          >
            <Code2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            className="p-2 text-slate-700 hover:text-slate-900 focus:outline-none"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile navigation drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2">
          <div className="text-xs font-semibold text-slate-400 px-3 py-1 uppercase tracking-wider">Calculators</div>
          <button
            onClick={() => handleNavClick('weighted')}
            className={`w-full text-left px-3 py-2 text-sm font-medium rounded-lg ${
              activePage === 'weighted' ? 'bg-indigo-50 text-indigo-700 font-semibold' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            Weighted Grade Calculator
          </button>
          <button
            onClick={() => handleNavClick('final')}
            className={`w-full text-left px-3 py-2 text-sm font-medium rounded-lg ${
              activePage === 'final' ? 'bg-indigo-50 text-indigo-700 font-semibold' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            Final Exam Grade Calculator
          </button>
          <button
            onClick={() => handleNavClick('gpa')}
            className={`w-full text-left px-3 py-2 text-sm font-medium rounded-lg ${
              activePage === 'gpa' ? 'bg-indigo-50 text-indigo-700 font-semibold' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            College & High School GPA Calculator
          </button>
          <button
            onClick={() => handleNavClick('converter')}
            className={`w-full text-left px-3 py-2 text-sm font-medium rounded-lg ${
              activePage === 'converter' ? 'bg-indigo-50 text-indigo-700 font-semibold' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            Grading Scale & Letter Converter
          </button>
          <button
            onClick={() => handleNavClick('curve')}
            className={`w-full text-left px-3 py-2 text-sm font-medium rounded-lg ${
              activePage === 'curve' ? 'bg-indigo-50 text-indigo-700 font-semibold' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            Grade Curve Calculator
          </button>

          <div className="text-xs font-semibold text-slate-400 px-3 pt-3 py-1 uppercase tracking-wider">Resources</div>
          <button
            onClick={() => handleNavClick('guides')}
            className={`w-full text-left px-3 py-2 text-sm font-medium rounded-lg ${
              activePage === 'guides' ? 'bg-indigo-50 text-indigo-700 font-semibold' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            Academic Knowledge Base (20+ Guides)
          </button>
          <button
            onClick={() => handleNavClick('about')}
            className="w-full text-left px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-lg"
          >
            About Us & Methodology
          </button>
          <button
            onClick={() => handleNavClick('contact')}
            className="w-full text-left px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-lg"
          >
            Contact & Support
          </button>
        </div>
      )}
    </header>
  );
}
