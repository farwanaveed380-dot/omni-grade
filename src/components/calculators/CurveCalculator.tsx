import { useState } from 'react';
import { applyGradeCurve, getLetterForPercentage } from '../../utils/calculatorMath';
import { Sliders, RotateCcw, TrendingUp, Sparkles, ArrowRight, HelpCircle } from 'lucide-react';

interface CurveCalculatorProps {
  onNavigateToGuide?: (slug: string) => void;
}

const DEFAULT_SCORES = [52, 58, 64, 69, 71, 74, 78, 81, 85, 92];

export function CurveCalculator({ onNavigateToGuide }: CurveCalculatorProps) {
  const [scoresInput, setScoresInput] = useState<string>(DEFAULT_SCORES.join(', '));
  const [curveMethod, setCurveMethod] = useState<'flat' | 'linear_max' | 'sqrt' | 'bell'>('sqrt');
  const [flatBumpValue, setFlatBumpValue] = useState<number>(8);

  const parsedScores = scoresInput
    .split(/[,\s]+/)
    .map((s) => parseFloat(s.trim()))
    .filter((n) => !isNaN(n) && n >= 0 && n <= 100);

  const curveData = applyGradeCurve(parsedScores, curveMethod, flatBumpValue);

  const handleLoadSample = (type: 'hard' | 'moderate') => {
    if (type === 'hard') {
      setScoresInput('42, 49, 53, 56, 61, 65, 70, 74, 82, 88');
      setCurveMethod('sqrt');
    } else {
      setScoresInput('62, 68, 71, 75, 78, 80, 84, 87, 91, 95');
      setCurveMethod('flat');
      setFlatBumpValue(5);
    }
  };

  return (
    <div className="space-y-8">
      {/* Intro Header */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-6 mb-6">
          <div>
            <h1 className="font-serif-display text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Grade Curve Calculator & Visualizer
            </h1>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl">
              Model university curving algorithms on raw exam scores. Compare statistical distributions across flat bumps, linear ceiling scaling, square root curves, and Gaussian normalizations.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">Samples:</span>
            <button
              onClick={() => handleLoadSample('hard')}
              className="px-2.5 py-1 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors cursor-pointer"
            >
              Hard Exam (Mean 64%)
            </button>
            <button
              onClick={() => handleLoadSample('moderate')}
              className="px-2.5 py-1 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors cursor-pointer"
            >
              Moderate Exam (Mean 78%)
            </button>
          </div>
        </div>

        {/* Input & Curve Method Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-2">
            <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block">
              Enter Class Exam Scores (comma or space separated):
            </label>
            <textarea
              rows={3}
              value={scoresInput}
              onChange={(e) => setScoresInput(e.target.value)}
              placeholder="e.g. 55, 62, 70, 78, 85, 92"
              className="w-full p-3 text-sm font-data-mono bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
            <div className="text-xs text-slate-400">
              Parsed <strong className="text-slate-700 font-data-mono">{parsedScores.length}</strong> valid numerical scores.
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block">
              Curving Algorithm:
            </label>
            
            <div className="space-y-1.5 text-xs">
              <label className={`flex items-center gap-2.5 p-2 rounded-lg border cursor-pointer transition-colors ${
                curveMethod === 'sqrt' ? 'bg-indigo-50/70 border-indigo-200 text-indigo-900 font-medium' : 'border-slate-200 hover:bg-slate-50 text-slate-700'
              }`}>
                <input
                  type="radio"
                  name="curveMethod"
                  checked={curveMethod === 'sqrt'}
                  onChange={() => setCurveMethod('sqrt')}
                  className="text-indigo-600"
                />
                <div>
                  <div className="font-semibold">Square Root (10 × √Score)</div>
                  <div className="text-slate-500 text-[11px]">Boosts lower scores most</div>
                </div>
              </label>

              <label className={`flex items-center gap-2.5 p-2 rounded-lg border cursor-pointer transition-colors ${
                curveMethod === 'linear_max' ? 'bg-indigo-50/70 border-indigo-200 text-indigo-900 font-medium' : 'border-slate-200 hover:bg-slate-50 text-slate-700'
              }`}>
                <input
                  type="radio"
                  name="curveMethod"
                  checked={curveMethod === 'linear_max'}
                  onChange={() => setCurveMethod('linear_max')}
                  className="text-indigo-600"
                />
                <div>
                  <div className="font-semibold">Scale Top Score to 100%</div>
                  <div className="text-slate-500 text-[11px]">Bumps all by difference</div>
                </div>
              </label>

              <label className={`flex items-center gap-2.5 p-2 rounded-lg border cursor-pointer transition-colors ${
                curveMethod === 'flat' ? 'bg-indigo-50/70 border-indigo-200 text-indigo-900 font-medium' : 'border-slate-200 hover:bg-slate-50 text-slate-700'
              }`}>
                <input
                  type="radio"
                  name="curveMethod"
                  checked={curveMethod === 'flat'}
                  onChange={() => setCurveMethod('flat')}
                  className="text-indigo-600"
                />
                <div className="flex-1">
                  <div className="font-semibold">Flat Points Bump</div>
                  <div className="flex items-center gap-2 mt-1">
                    <input
                      type="number"
                      min="1"
                      max="30"
                      value={flatBumpValue}
                      onChange={(e) => setFlatBumpValue(parseInt(e.target.value) || 0)}
                      className="w-16 px-1.5 py-0.5 text-xs font-data-mono bg-white border border-slate-200 rounded"
                      disabled={curveMethod !== 'flat'}
                    />
                    <span className="text-[11px] text-slate-500">pts added</span>
                  </div>
                </div>
              </label>

              <label className={`flex items-center gap-2.5 p-2 rounded-lg border cursor-pointer transition-colors ${
                curveMethod === 'bell' ? 'bg-indigo-50/70 border-indigo-200 text-indigo-900 font-medium' : 'border-slate-200 hover:bg-slate-50 text-slate-700'
              }`}>
                <input
                  type="radio"
                  name="curveMethod"
                  checked={curveMethod === 'bell'}
                  onChange={() => setCurveMethod('bell')}
                  className="text-indigo-600"
                />
                <div>
                  <div className="font-semibold">Normal Bell Curve</div>
                  <div className="text-slate-500 text-[11px]">Z-score mean 78 distribution</div>
                </div>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs">
          <div className="text-xs text-slate-400 font-medium">Original Class Mean</div>
          <div className="font-serif-display text-4xl font-bold text-slate-900 my-2 font-data-mono">
            {curveData.originalAverage}%
          </div>
          <div className="text-xs text-slate-500">
            Raw average before curve adjustment
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs">
          <div className="text-xs text-slate-400 font-medium">Curved Class Mean</div>
          <div className="font-serif-display text-4xl font-bold text-indigo-600 my-2 font-data-mono">
            {curveData.curvedAverage}%
          </div>
          <div className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+{curveData.gain}% Class Gain</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="text-xs text-slate-400 font-medium">Curving Philosophy</div>
            <div className="text-xs text-slate-600 mt-2 leading-relaxed">
              {curveMethod === 'sqrt' && 'Square root curves reward students who tested in the 40-70% range without pushing top students beyond 100%.'}
              {curveMethod === 'linear_max' && 'Linear ceiling shift preserves exact score spacing while allowing the top student to achieve 100%.'}
              {curveMethod === 'flat' && `Uniformly adds ${flatBumpValue} points to every student test.`}
              {curveMethod === 'bell' && 'Normalizes standard deviation to model a typical collegiate letter grade distribution.'}
            </div>
          </div>
          {onNavigateToGuide && (
            <button
              onClick={() => onNavigateToGuide('how-teachers-curve-grades')}
              className="text-xs text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1 mt-3 cursor-pointer"
            >
              <span>Read Curve Math Guide</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>

      {/* Individual Score Comparison Table */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
        <h2 className="font-serif-display text-xl font-bold text-slate-900 mb-4">
          Individual Student Score Transformations
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <th className="pb-3 pr-4">Student #</th>
                <th className="pb-3 px-3 font-data-mono">Raw Score</th>
                <th className="pb-3 px-3">Raw Letter</th>
                <th className="pb-3 px-3 font-data-mono">Curved Score</th>
                <th className="pb-3 px-3">Curved Letter</th>
                <th className="pb-3 pl-3 font-data-mono text-right">Net Improvement</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {parsedScores.map((raw, idx) => {
                const curved = curveData.curvedScores[idx] ?? raw;
                const rawLet = getLetterForPercentage(raw);
                const curLet = getLetterForPercentage(curved);
                const diff = Math.round((curved - raw) * 10) / 10;

                return (
                  <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-2.5 pr-4 text-slate-500 font-data-mono">#{idx + 1}</td>
                    <td className="py-2.5 px-3 font-data-mono text-slate-700">{raw}%</td>
                    <td className="py-2.5 px-3 font-medium text-slate-600">{rawLet.letter}</td>
                    <td className="py-2.5 px-3 font-data-mono font-bold text-indigo-600">{curved}%</td>
                    <td className="py-2.5 px-3 font-bold text-slate-900">{curLet.letter}</td>
                    <td className="py-2.5 pl-3 font-data-mono text-right text-emerald-600 font-semibold">
                      +{diff}%
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
