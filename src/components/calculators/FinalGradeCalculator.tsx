import { useState } from 'react';
import { calculateFinalExamRequired, getLetterForPercentage } from '../../utils/calculatorMath';
import { Target, CheckCircle, AlertTriangle, HelpCircle, ArrowRight, Clock, Award } from 'lucide-react';

interface FinalGradeCalculatorProps {
  onNavigateToGuide?: (slug: string) => void;
}

export function FinalGradeCalculator({ onNavigateToGuide }: FinalGradeCalculatorProps) {
  const [currentGrade, setCurrentGrade] = useState<number>(84.5);
  const [targetGrade, setTargetGrade] = useState<number>(90.0);
  const [finalWeight, setFinalWeight] = useState<number>(25.0);

  const finalResult = calculateFinalExamRequired(currentGrade, targetGrade, finalWeight);

  // Targets matrix
  const targets = [
    { label: 'Grade A (93%)', targetPct: 93 },
    { label: 'Grade A- (90%)', targetPct: 90 },
    { label: 'Grade B+ (87%)', targetPct: 87 },
    { label: 'Grade B (83%)', targetPct: 83 },
    { label: 'Grade C (73%)', targetPct: 73 },
    { label: 'Passing (70%)', targetPct: 70 },
  ];

  return (
    <div className="space-y-8">
      {/* Hero Header */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
        <h1 className="font-serif-display text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          Final Exam Grade Calculator
        </h1>
        <p className="text-sm text-slate-600 mt-2 max-w-2xl">
          Determine the exact score required on your final exam to achieve your desired course grade. Calculate your required percentage, check mathematical feasibility, and view tier cutoffs.
        </p>

        {/* Input Parameters Form */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          
          {/* Current Grade */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <label className="font-semibold text-slate-700">Current Course Grade (%)</label>
              <span className="font-data-mono font-medium text-indigo-600">{currentGrade}%</span>
            </div>
            <input
              type="range"
              min="40"
              max="100"
              step="0.5"
              value={currentGrade}
              onChange={(e) => setCurrentGrade(parseFloat(e.target.value))}
              className="w-full accent-indigo-600 cursor-pointer"
            />
            <div className="relative">
              <input
                type="number"
                min="0"
                max="120"
                step="0.1"
                value={currentGrade}
                onChange={(e) => setCurrentGrade(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 text-sm font-data-mono bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
              <span className="absolute right-3 top-2.5 text-xs text-slate-400 font-data-mono">%</span>
            </div>
          </div>

          {/* Target Desired Grade */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <label className="font-semibold text-slate-700">Target Desired Grade (%)</label>
              <span className="font-data-mono font-medium text-indigo-600">{targetGrade}%</span>
            </div>
            <input
              type="range"
              min="50"
              max="100"
              step="0.5"
              value={targetGrade}
              onChange={(e) => setTargetGrade(parseFloat(e.target.value))}
              className="w-full accent-indigo-600 cursor-pointer"
            />
            <div className="relative">
              <input
                type="number"
                min="0"
                max="100"
                step="0.1"
                value={targetGrade}
                onChange={(e) => setTargetGrade(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 text-sm font-data-mono bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
              <span className="absolute right-3 top-2.5 text-xs text-slate-400 font-data-mono">%</span>
            </div>
          </div>

          {/* Final Exam Weight */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <label className="font-semibold text-slate-700">Final Exam Weight (%)</label>
              <span className="font-data-mono font-medium text-indigo-600">{finalWeight}%</span>
            </div>
            <input
              type="range"
              min="5"
              max="70"
              step="1"
              value={finalWeight}
              onChange={(e) => setFinalWeight(parseFloat(e.target.value))}
              className="w-full accent-indigo-600 cursor-pointer"
            />
            <div className="relative">
              <input
                type="number"
                min="1"
                max="99"
                step="1"
                value={finalWeight}
                onChange={(e) => setFinalWeight(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 text-sm font-data-mono bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
              <span className="absolute right-3 top-2.5 text-xs text-slate-400 font-data-mono">%</span>
            </div>
          </div>

        </div>

        {/* Quick Target Presets */}
        <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap items-center gap-2">
          <span className="text-xs text-slate-400">Quick Targets:</span>
          {targets.map((t) => (
            <button
              key={t.label}
              onClick={() => setTargetGrade(t.targetPct)}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                targetGrade === t.targetPct
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Result Display Box */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Big Score Card */}
        <div className="md:col-span-2 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
              <Target className="w-4 h-4 text-indigo-600" />
              <span>Required Score on Final Examination</span>
            </div>

            <div className="flex items-baseline gap-4 my-4">
              <span className="font-serif-display text-5xl sm:text-6xl font-bold text-slate-900 font-data-mono">
                {finalResult.requiredScore}%
              </span>
              <span className="text-sm font-medium text-slate-500">
                to finish with <strong className="text-slate-800 font-data-mono">{targetGrade}%</strong>
              </span>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 mt-4 flex items-start gap-3">
              {finalResult.isGuaranteed ? (
                <Award className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              ) : finalResult.isFeasible ? (
                <CheckCircle className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
              ) : (
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              )}
              <div className="text-xs">
                <div className="font-semibold text-slate-900">{finalResult.statusLabel}</div>
                <p className="text-slate-600 mt-0.5 leading-relaxed">
                  {finalResult.isGuaranteed
                    ? 'Your current score is already high enough that even scoring 0% on the final would keep you above your goal.'
                    : finalResult.requiredScore > 100
                    ? `Mathematically impossible without extra credit or a curved distribution, because you need ${finalResult.requiredScore}%. Consider lowering your goal to the next letter grade.`
                    : finalResult.requiredScore > 85
                    ? 'Requires rigorous, focused preparation. Begin active practice problems and past exam review early.'
                    : 'Comfortably achievable with regular review sessions and consistent study.'}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Formula: Required = (Target - Current × (1 - w)) / w</span>
            {onNavigateToGuide && (
              <button
                onClick={() => onNavigateToGuide('how-to-calculate-final-exam-grade')}
                className="text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1 cursor-pointer"
              >
                <span>Read Full Formula Guide</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>

        {/* Target Grade Comparison Matrix */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">
            Required Scores for Other Tiers
          </div>
          
          <div className="space-y-2.5 text-xs">
            {targets.map((tier) => {
              const res = calculateFinalExamRequired(currentGrade, tier.targetPct, finalWeight);
              return (
                <div key={tier.label} className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-colors">
                  <span className="font-medium text-slate-700">{tier.label}</span>
                  <span className={`font-data-mono font-semibold ${
                    res.requiredScore <= 0 ? 'text-emerald-600' :
                    res.requiredScore <= 85 ? 'text-slate-900' :
                    res.requiredScore <= 100 ? 'text-amber-600' : 'text-rose-600'
                  }`}>
                    {res.requiredScore <= 0 ? 'Locked' : `${res.requiredScore}%`}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-400">
            Based on {finalWeight}% final exam weighting.
          </div>
        </div>

      </div>
    </div>
  );
}
