import { useState } from 'react';
import { STANDARD_GRADING_SCALE, getLetterForPercentage } from '../../utils/calculatorMath';
import { ArrowLeftRight, Globe, Layers, ArrowRight } from 'lucide-react';

interface GradeConverterProps {
  onNavigateToGuide?: (slug: string) => void;
}

export function GradeConverter({ onNavigateToGuide }: GradeConverterProps) {
  const [sliderPercent, setSliderPercent] = useState<number>(88.5);

  const letterInfo = getLetterForPercentage(sliderPercent);

  // International classification mapping
  const getUkClassification = (pct: number) => {
    if (pct >= 70) return { label: 'First-Class Honours (1st)', color: 'text-indigo-600' };
    if (pct >= 60) return { label: 'Upper Second-Class Honours (2:1)', color: 'text-emerald-600' };
    if (pct >= 50) return { label: 'Lower Second-Class Honours (2:2)', color: 'text-amber-600' };
    if (pct >= 40) return { label: 'Third-Class Honours (3rd)', color: 'text-slate-700' };
    return { label: 'Fail / Non-Honours', color: 'text-rose-600' };
  };

  const getEctsGrade = (pct: number) => {
    if (pct >= 90) return { grade: 'A', desc: 'Excellent (Top 10%)' };
    if (pct >= 80) return { grade: 'B', desc: 'Very Good (Next 25%)' };
    if (pct >= 70) return { grade: 'C', desc: 'Good (Next 30%)' };
    if (pct >= 60) return { grade: 'D', desc: 'Satisfactory (Next 25%)' };
    if (pct >= 50) return { grade: 'E', desc: 'Sufficient (Passing)' };
    return { grade: 'F', desc: 'Fail / Insufficient' };
  };

  const ukInfo = getUkClassification(sliderPercent);
  const ectsInfo = getEctsGrade(sliderPercent);

  return (
    <div className="space-y-8">
      {/* Intro Header */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
        <h1 className="font-serif-display text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          Grading Scale & Letter Grade Converter
        </h1>
        <p className="text-sm text-slate-600 mt-2 max-w-2xl">
          Instantly convert numerical percentage marks into standard US letter grades, 4.0 GPA points, UK Honours classifications, and European ECTS tiers.
        </p>

        {/* Live Interactive Conversion Bar */}
        <div className="mt-8 p-6 bg-slate-50/80 rounded-2xl border border-slate-200/80">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
            <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
              Drag Percentage to Convert:
            </label>
            <div className="font-serif-display text-3xl font-bold text-slate-900 font-data-mono">
              {sliderPercent.toFixed(1)}%
            </div>
          </div>

          <input
            type="range"
            min="0"
            max="100"
            step="0.5"
            value={sliderPercent}
            onChange={(e) => setSliderPercent(parseFloat(e.target.value))}
            className="w-full accent-indigo-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
          />

          {/* Real-time Multi-System Conversion Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
            <div className="bg-white p-3.5 rounded-xl border border-slate-200/80">
              <div className="text-xs text-slate-400">US Letter Grade</div>
              <div className="font-serif-display text-2xl font-bold text-slate-900 mt-1">
                {letterInfo.letter}
              </div>
              <div className="text-xs text-slate-500 mt-0.5">{letterInfo.description}</div>
            </div>

            <div className="bg-white p-3.5 rounded-xl border border-slate-200/80">
              <div className="text-xs text-slate-400">4.0 GPA Points</div>
              <div className="font-serif-display text-2xl font-bold text-indigo-600 mt-1 font-data-mono">
                {letterInfo.gpa.toFixed(1)}
              </div>
              <div className="text-xs text-slate-500 mt-0.5">Standard US Collegiate</div>
            </div>

            <div className="bg-white p-3.5 rounded-xl border border-slate-200/80">
              <div className="text-xs text-slate-400">UK Degree Standard</div>
              <div className={`font-serif-display text-lg font-bold mt-1 ${ukInfo.color}`}>
                {ukInfo.label.split(' ')[0]}
              </div>
              <div className="text-xs text-slate-500 mt-0.5">{ukInfo.label}</div>
            </div>

            <div className="bg-white p-3.5 rounded-xl border border-slate-200/80">
              <div className="text-xs text-slate-400">European ECTS</div>
              <div className="font-serif-display text-2xl font-bold text-slate-900 mt-1">
                ECTS {ectsInfo.grade}
              </div>
              <div className="text-xs text-slate-500 mt-0.5">{ectsInfo.desc}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Complete Standard Reference Table */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="font-serif-display text-xl font-bold text-slate-900">
              Official US 4.0 Grading Scale Matrix
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Standardized cutoffs used by universities, secondary schools, and the College Board.
            </p>
          </div>

          {onNavigateToGuide && (
            <button
              onClick={() => onNavigateToGuide('international-grading-systems-compared')}
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 cursor-pointer"
            >
              <span>Compare UK & European Systems</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <th className="pb-3 pr-4">Letter</th>
                <th className="pb-3 px-3">Percentage Range</th>
                <th className="pb-3 px-3 font-data-mono">Standard 4.0</th>
                <th className="pb-3 px-3 font-data-mono">Honors (+0.5)</th>
                <th className="pb-3 px-3 font-data-mono">AP / IB (+1.0)</th>
                <th className="pb-3 pl-3">Performance Descriptor</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {STANDARD_GRADING_SCALE.map((tier) => (
                <tr key={tier.letter} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-2.5 pr-4 font-bold text-slate-900 font-serif-display text-base">
                    {tier.letter}
                  </td>
                  <td className="py-2.5 px-3 font-data-mono text-slate-700">
                    {tier.minPercent}% – {tier.maxPercent}%
                  </td>
                  <td className="py-2.5 px-3 font-data-mono font-semibold text-indigo-600">
                    {tier.gpaStandard.toFixed(1)}
                  </td>
                  <td className="py-2.5 px-3 font-data-mono text-slate-700">
                    {tier.gpaHonors.toFixed(1)}
                  </td>
                  <td className="py-2.5 px-3 font-data-mono text-slate-700">
                    {tier.gpaAP.toFixed(1)}
                  </td>
                  <td className="py-2.5 pl-3 text-xs text-slate-500">
                    {tier.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
