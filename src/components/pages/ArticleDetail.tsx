import { useState, useEffect } from 'react';
import { AcademicArticle, PageView, ToolType } from '../../types';
import { ARTICLES_DATA } from '../../data/articles';
import { ArrowLeft, Clock, Calendar, User, Calculator, ArrowRight, Share2, Check, Bookmark, CheckCircle2 } from 'lucide-react';

interface ArticleDetailProps {
  article: AcademicArticle;
  onBackToArticles: () => void;
  onNavigateToTool: (tool: ToolType) => void;
  onSelectArticle: (slug: string) => void;
}

export function ArticleDetail({ article, onBackToArticles, onNavigateToTool, onSelectArticle }: ArticleDetailProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      setScrollProgress(totalScroll > 0 ? (currentScroll / totalScroll) * 100 : 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const relatedArticles = ARTICLES_DATA.filter((a) => article.relatedArticleSlugs.includes(a.slug));

  return (
    <article className="max-w-4xl mx-auto space-y-10">
      {/* Scroll Reading Progress Bar */}
      <div className="fixed top-16 left-0 right-0 h-1 bg-slate-100 z-30">
        <div
          className="h-full bg-indigo-600 transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Top Breadcrumbs & Back Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center justify-between text-xs text-slate-500 pt-2">
        <div className="flex items-center gap-2">
          <button
            onClick={onBackToArticles}
            className="flex items-center gap-1 text-slate-600 hover:text-indigo-600 font-medium transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Academic Guides</span>
          </button>
          <span aria-hidden="true">/</span>
          <span className="text-slate-400">{article.category}</span>
        </div>

        <button
          onClick={handleCopyLink}
          className="flex items-center gap-1.5 text-xs text-slate-600 hover:text-indigo-600 transition-colors cursor-pointer"
        >
          {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
          <span>{copiedLink ? 'Link Copied!' : 'Share Guide'}</span>
        </button>
      </nav>

      {/* Article Header Card */}
      <header className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200/80 shadow-xs space-y-4">
        {/* Unboxed metadata */}
        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
          <span className="font-semibold text-indigo-600">{article.category}</span>
          <span aria-hidden="true">·</span>
          <span>Published {article.publishDate}</span>
          <span aria-hidden="true">·</span>
          <span>{article.readTime}</span>
          <span aria-hidden="true">·</span>
          <span className="font-data-mono">{article.wordCount} words</span>
        </div>

        <h1 className="font-serif-display text-2xl sm:text-4xl font-bold text-slate-900 tracking-tight leading-tight">
          {article.title}
        </h1>

        <p className="text-base text-slate-600 leading-relaxed font-sans">
          {article.excerpt}
        </p>

        {/* Author Byline */}
        <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm">
            {article.author.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900">{article.author}</div>
            <div className="text-[11px] text-slate-500">{article.authorRole}</div>
          </div>
        </div>
      </header>

      {/* Key Takeaways Box */}
      <section className="bg-indigo-50/70 rounded-2xl p-6 sm:p-8 border border-indigo-100 space-y-3">
        <h2 className="font-serif-display text-base font-bold text-indigo-950 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-indigo-600" />
          <span>Executive Takeaways & Core Principles</span>
        </h2>
        <ul className="space-y-2 text-xs text-indigo-950 leading-relaxed">
          {article.keyTakeaways.map((takeaway, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="text-indigo-600 font-bold mt-0.5">•</span>
              <span>{takeaway}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Interactive Tool Banner Callout */}
      <aside className="bg-slate-900 text-white rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
        <div className="space-y-1">
          <div className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">
            Interactive Academic Calculator
          </div>
          <p className="text-sm text-slate-200">
            Calculate your numbers directly using our free mathematical engine.
          </p>
        </div>
        <button
          onClick={() => onNavigateToTool(article.relatedTool)}
          className="px-4 py-2.5 text-xs font-semibold text-slate-950 bg-white hover:bg-slate-100 rounded-xl transition-colors shrink-0 flex items-center gap-2 cursor-pointer"
        >
          <Calculator className="w-4 h-4 text-indigo-600" />
          <span>Launch {article.relatedTool === 'weighted' ? 'Weighted Calculator' : article.relatedTool === 'final' ? 'Final Exam Tool' : article.relatedTool === 'gpa' ? 'GPA Calculator' : 'Calculation Tool'}</span>
        </button>
      </aside>

      {/* Main Body Sections */}
      <div className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200/80 shadow-xs space-y-10">
        {article.sections.map((section, idx) => (
          <section key={idx} className="space-y-4">
            <h2 className="font-serif-display text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              {section.heading}
            </h2>

            <div className="text-sm text-slate-700 leading-relaxed space-y-3 font-sans">
              {section.body.split('\n\n').map((paragraph, pIdx) => (
                <p key={pIdx}>{paragraph}</p>
              ))}
            </div>

            {/* Formula Block */}
            {section.formula && (
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 font-data-mono text-xs sm:text-sm text-slate-900 overflow-x-auto shadow-2xs">
                {section.formula}
              </div>
            )}

            {/* Bullets */}
            {section.bullets && (
              <ul className="space-y-2 text-xs text-slate-600 pl-4 list-disc marker:text-indigo-600">
                {section.bullets.map((bullet, bIdx) => (
                  <li key={bIdx} className="leading-relaxed">
                    {bullet}
                  </li>
                ))}
              </ul>
            )}

            {/* Worked Example Box */}
            {section.exampleBox && (
              <div className="bg-slate-50/90 rounded-xl p-5 border border-slate-200 space-y-3">
                <div className="font-serif-display text-sm font-bold text-slate-900">
                  {section.exampleBox.title}
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {section.exampleBox.description}
                </p>
                <div className="space-y-1.5 pl-3 border-l-2 border-indigo-400 text-xs text-slate-700">
                  {section.exampleBox.steps.map((step, sIdx) => (
                    <div key={sIdx} className="leading-relaxed">
                      {step}
                    </div>
                  ))}
                </div>
                <div className="pt-2 text-xs font-semibold text-indigo-900 border-t border-slate-200">
                  Result: {section.exampleBox.result}
                </div>
              </div>
            )}

            {/* Comparison Table */}
            {section.table && (
              <div className="overflow-x-auto pt-2">
                <table className="w-full text-left text-xs border border-slate-200 rounded-lg overflow-hidden">
                  <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                    <tr>
                      {section.table.headers.map((h, hIdx) => (
                        <th key={hIdx} className="p-2.5">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {section.table.rows.map((row, rIdx) => (
                      <tr key={rIdx} className="hover:bg-slate-50">
                        {row.map((cell, cIdx) => (
                          <td key={cIdx} className="p-2.5 text-slate-600">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        ))}

        {/* FAQs Section */}
        {article.faqs && article.faqs.length > 0 && (
          <section className="pt-8 border-t border-slate-100 space-y-4">
            <h2 className="font-serif-display text-xl font-bold text-slate-900">
              Frequently Asked Questions
            </h2>
            <div className="space-y-3">
              {article.faqs.map((faq, fIdx) => (
                <div key={fIdx} className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-1.5">
                  <h3 className="font-bold text-xs text-slate-900">
                    {faq.question}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Related Academic Guides Footer Cluster */}
      {relatedArticles.length > 0 && (
        <section className="space-y-4 pt-4">
          <h2 className="font-serif-display text-lg font-bold text-slate-900">
            Related Academic Guides & Masterclasses
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {relatedArticles.map((rel) => (
              <div
                key={rel.id}
                onClick={() => onSelectArticle(rel.slug)}
                className="bg-white p-5 rounded-2xl border border-slate-200/80 hover:border-indigo-200 hover:shadow-xs transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="text-[11px] font-semibold text-indigo-600 mb-1">{rel.category}</div>
                  <h3 className="font-serif-display text-sm font-bold text-slate-900 hover:text-indigo-600 transition-colors">
                    {rel.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">{rel.excerpt}</p>
                </div>
                <div className="mt-4 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                  <span>{rel.readTime}</span>
                  <span className="text-indigo-600 font-semibold flex items-center gap-1">
                    Read <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
