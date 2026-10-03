import { useState, useMemo } from 'react';
import { ARTICLES_DATA } from '../../data/articles';
import { Search, BookOpen, Clock, Calendar, ArrowRight, UserCheck } from 'lucide-react';

interface ArticlesIndexProps {
  onSelectArticle: (slug: string) => void;
}

export function ArticlesIndex({ onSelectArticle }: ArticlesIndexProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Topics (22)' },
    { id: 'Grade Calculations', label: 'Grade Calculations' },
    { id: 'Final Exams', label: 'Final Exams' },
    { id: 'GPA Mastery', label: 'GPA Mastery' },
    { id: 'Academic Policies', label: 'Academic Policies' },
    { id: 'Study Strategy', label: 'Study Strategy' }
  ];

  const filteredArticles = useMemo(() => {
    return ARTICLES_DATA.filter((art) => {
      const matchesCategory = selectedCategory === 'all' || art.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || (
        art.title.toLowerCase().includes(q) ||
        art.excerpt.toLowerCase().includes(q) ||
        art.keyTakeaways.some(k => k.toLowerCase().includes(q))
      );
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="space-y-10">
      {/* Hero Banner */}
      <div className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200/80 shadow-xs text-center max-w-4xl mx-auto">
        <h1 className="font-serif-display text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
          Academic Grading Knowledge Base
        </h1>
        <p className="text-sm text-slate-600 mt-3 max-w-2xl mx-auto leading-relaxed">
          Comprehensive, mathematically verified masterclasses on syllabus weighting, GPA calculations, final exam forecasting, grading curves, and academic policies.
        </p>

        {/* Search Bar */}
        <div className="mt-8 max-w-xl mx-auto relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search guides (e.g. weighted grades, final exam formula, cumulative GPA)..."
            className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 shadow-2xs"
          />
        </div>

        {/* Category Filters (interactive functional buttons) */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 mt-6">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-indigo-600 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArticles.map((article) => (
          <article
            key={article.id}
            onClick={() => onSelectArticle(article.slug)}
            className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:border-indigo-200 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div>
              {/* Unboxed metadata with typographic separators */}
              <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
                <span className="font-semibold text-indigo-600">{article.category}</span>
                <span aria-hidden="true">·</span>
                <span>{article.readTime}</span>
                <span aria-hidden="true">·</span>
                <span className="font-data-mono">{article.wordCount} words</span>
              </div>

              <h2 className="font-serif-display text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors leading-snug line-clamp-2">
                {article.title}
              </h2>

              <p className="text-xs text-slate-600 mt-2.5 leading-relaxed line-clamp-3">
                {article.excerpt}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <div className="flex items-center gap-1.5">
                <span className="font-medium text-slate-700">{article.author}</span>
              </div>
              <span className="text-indigo-600 font-semibold group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                Read Guide
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </article>
        ))}
      </div>

      {filteredArticles.length === 0 && (
        <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 p-8">
          <BookOpen className="w-8 h-8 text-slate-300 mx-auto mb-2" />
          <h3 className="font-serif-display text-lg font-bold text-slate-800">No guides match your search</h3>
          <p className="text-xs text-slate-500 mt-1">Try searching for broader academic terms like "GPA", "exam", or "curving".</p>
          <button
            onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
            className="mt-4 px-4 py-2 text-xs font-semibold text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
