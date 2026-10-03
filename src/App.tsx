import { useState, useEffect } from 'react';
import { PageView, ToolType, AcademicArticle } from './types';
import { ARTICLES_DATA } from './data/articles';
import { SeoHead } from './components/seo/SeoHead';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { WeightedGradeCalculator } from './components/calculators/WeightedGradeCalculator';
import { FinalGradeCalculator } from './components/calculators/FinalGradeCalculator';
import { GpaCalculator } from './components/calculators/GpaCalculator';
import { GradeConverter } from './components/calculators/GradeConverter';
import { CurveCalculator } from './components/calculators/CurveCalculator';
import { ArticlesIndex } from './components/pages/ArticlesIndex';
import { ArticleDetail } from './components/pages/ArticleDetail';
import { AboutUs } from './components/pages/AboutUs';
import { ContactUs } from './components/pages/ContactUs';
import { PrivacyPolicy } from './components/pages/PrivacyPolicy';
import { Disclaimer } from './components/pages/Disclaimer';
import { TermsConditions } from './components/pages/TermsConditions';
import { EmbedWidgetModal } from './components/growth/EmbedWidgetModal';
import { AcademicCitationModal } from './components/growth/AcademicCitationModal';
import { PrintWorksheetModal } from './components/growth/PrintWorksheetModal';
import { Calculator, Target, GraduationCap, ArrowLeftRight, Sliders, BookOpen, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';

export default function App() {
  const [activePage, setActivePage] = useState<PageView>('weighted');
  const [selectedArticleSlug, setSelectedArticleSlug] = useState<string>('weighted-grade-calculation-guide');
  const [isEmbedOpen, setIsEmbedOpen] = useState(false);
  const [isCitationOpen, setIsCitationOpen] = useState(false);
  const [isPrintOpen, setIsPrintOpen] = useState(false);

  // Sync URL hash for browser history / direct links
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (!hash) return;

      if (hash.startsWith('guide/')) {
        const slug = hash.replace('guide/', '');
        const exists = ARTICLES_DATA.some(a => a.slug === slug);
        if (exists) {
          setSelectedArticleSlug(slug);
          setActivePage('guide-detail');
        }
      } else if (['weighted', 'final', 'gpa', 'converter', 'curve', 'guides', 'about', 'contact', 'privacy', 'disclaimer', 'terms'].includes(hash)) {
        setActivePage(hash as PageView);
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handleNavigate = (page: PageView) => {
    setActivePage(page);
    window.location.hash = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectArticle = (slug: string) => {
    setSelectedArticleSlug(slug);
    setActivePage('guide-detail');
    window.location.hash = `guide/${slug}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToTool = (tool: ToolType) => {
    setActivePage(tool);
    window.location.hash = tool;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentArticle = ARTICLES_DATA.find(a => a.slug === selectedArticleSlug);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      
      {/* Dynamic SEO Meta Tags & JSON-LD Injection */}
      <SeoHead page={activePage} currentArticle={currentArticle} />

      {/* Primary Top Bar Contract */}
      <Header
        activePage={activePage}
        onNavigate={handleNavigate}
        onOpenEmbed={() => setIsEmbedOpen(true)}
        onOpenCitation={() => setIsCitationOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        
        {/* Interactive Tool Switcher Tab Bar (only visible on calculator views) */}
        {['weighted', 'final', 'gpa', 'converter', 'curve'].includes(activePage) && (
          <div className="mb-8">
            <div className="flex items-center gap-1.5 p-1.5 bg-slate-200/70 rounded-xl overflow-x-auto max-w-fit shadow-2xs">
              <button
                onClick={() => handleNavigate('weighted')}
                className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                  activePage === 'weighted'
                    ? 'bg-white text-indigo-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Calculator className="w-3.5 h-3.5 text-indigo-600" />
                <span>Weighted Calculator</span>
              </button>

              <button
                onClick={() => handleNavigate('final')}
                className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                  activePage === 'final'
                    ? 'bg-white text-indigo-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Target className="w-3.5 h-3.5 text-indigo-600" />
                <span>Final Exam Tool</span>
              </button>

              <button
                onClick={() => handleNavigate('gpa')}
                className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                  activePage === 'gpa'
                    ? 'bg-white text-indigo-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <GraduationCap className="w-3.5 h-3.5 text-indigo-600" />
                <span>GPA Calculator</span>
              </button>

              <button
                onClick={() => handleNavigate('converter')}
                className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                  activePage === 'converter'
                    ? 'bg-white text-indigo-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <ArrowLeftRight className="w-3.5 h-3.5 text-indigo-600" />
                <span>Scale Converter</span>
              </button>

              <button
                onClick={() => handleNavigate('curve')}
                className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                  activePage === 'curve'
                    ? 'bg-white text-indigo-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Sliders className="w-3.5 h-3.5 text-indigo-600" />
                <span>Curve Visualizer</span>
              </button>
            </div>
          </div>
        )}

        {/* View Router */}
        {activePage === 'weighted' && (
          <WeightedGradeCalculator
            onNavigateToGuide={handleSelectArticle}
            onOpenPrint={() => setIsPrintOpen(true)}
          />
        )}

        {activePage === 'final' && (
          <FinalGradeCalculator onNavigateToGuide={handleSelectArticle} />
        )}

        {activePage === 'gpa' && (
          <GpaCalculator onNavigateToGuide={handleSelectArticle} />
        )}

        {activePage === 'converter' && (
          <GradeConverter onNavigateToGuide={handleSelectArticle} />
        )}

        {activePage === 'curve' && (
          <CurveCalculator onNavigateToGuide={handleSelectArticle} />
        )}

        {activePage === 'guides' && (
          <ArticlesIndex onSelectArticle={handleSelectArticle} />
        )}

        {activePage === 'guide-detail' && currentArticle && (
          <ArticleDetail
            article={currentArticle}
            onBackToArticles={() => handleNavigate('guides')}
            onNavigateToTool={handleNavigateToTool}
            onSelectArticle={handleSelectArticle}
          />
        )}

        {activePage === 'about' && <AboutUs />}
        {activePage === 'contact' && <ContactUs />}
        {activePage === 'privacy' && <PrivacyPolicy />}
        {activePage === 'disclaimer' && <Disclaimer />}
        {activePage === 'terms' && <TermsConditions />}

        {/* Semantic Knowledge Base Teaser (Shown on tool pages to encourage deep exploration) */}
        {['weighted', 'final', 'gpa', 'converter', 'curve'].includes(activePage) && (
          <div className="mt-16 pt-12 border-t border-slate-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">
                  Academic Knowledge Base
                </span>
                <h2 className="font-serif-display text-2xl font-bold text-slate-900 mt-1">
                  Master Syllabus Mathematics & Grading Policies
                </h2>
                <p className="text-xs text-slate-600 mt-1">
                  Peer-reviewed guides written by former academic advisors and faculty.
                </p>
              </div>

              <button
                onClick={() => handleNavigate('guides')}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 cursor-pointer"
              >
                <span>View All 22 Guides</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {ARTICLES_DATA.slice(0, 4).map((art) => (
                <div
                  key={art.id}
                  onClick={() => handleSelectArticle(art.slug)}
                  className="bg-white p-5 rounded-2xl border border-slate-200/80 hover:border-indigo-200 hover:shadow-xs transition-all cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    <div className="text-[11px] font-semibold text-indigo-600 mb-1">{art.category}</div>
                    <h3 className="font-serif-display text-sm font-bold text-slate-900 line-clamp-2 leading-snug">
                      {art.shortTitle}
                    </h3>
                    <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                      {art.excerpt}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                    <span>{art.readTime}</span>
                    <span className="text-indigo-600 font-semibold">Read</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>

      {/* Universal Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenEmbed={() => setIsEmbedOpen(true)}
        onOpenCitation={() => setIsCitationOpen(true)}
        onOpenPrint={() => setIsPrintOpen(true)}
      />

      {/* Modals */}
      <EmbedWidgetModal
        isOpen={isEmbedOpen}
        onClose={() => setIsEmbedOpen(false)}
      />

      <AcademicCitationModal
        isOpen={isCitationOpen}
        onClose={() => setIsCitationOpen(false)}
      />

      <PrintWorksheetModal
        isOpen={isPrintOpen}
        onClose={() => setIsPrintOpen(false)}
      />

    </div>
  );
}
