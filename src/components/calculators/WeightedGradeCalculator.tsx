import { useState, useEffect } from 'react';
import { Assignment } from '../../types';
import { calculateWeightedGrade, calculateFinalExamRequired, getLetterForPercentage } from '../../utils/calculatorMath';
import { Plus, Trash2, RotateCcw, Download, Sparkles, CheckCircle2, AlertCircle, Bookmark, ArrowRight, Printer } from 'lucide-react';

interface WeightedGradeCalculatorProps {
  onNavigateToGuide?: (slug: string) => void;
  onOpenPrint?: () => void;
}

const DEFAULT_ASSIGNMENTS: Assignment[] = [
  { id: '1', name: 'Homework & Problem Sets', gradeEarned: 95, gradeTotal: 100, weight: 15, category: 'Homework' },
  { id: '2', name: 'Laboratory Reports', gradeEarned: 88, gradeTotal: 100, weight: 25, category: 'Labs' },
  { id: '3', name: 'Midterm Examination 1', gradeEarned: 82, gradeTotal: 100, weight: 15, category: 'Exams' },
  { id: '4', name: 'Midterm Examination 2', gradeEarned: 85, gradeTotal: 100, weight: 15, category: 'Exams' },
  { id: '5', name: 'Research Term Paper', gradeEarned: 91, gradeTotal: 100, weight: 10, category: 'Projects' },
];

export function WeightedGradeCalculator({ onNavigateToGuide, onOpenPrint }: WeightedGradeCalculatorProps) {
  const [assignments, setAssignments] = useState<Assignment[]>(() => {
    const saved = localStorage.getItem('omnigrade_weighted_assignments');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* use default */ }
    }
    return DEFAULT_ASSIGNMENTS;
  });

  const [dropLowest, setDropLowest] = useState<boolean>(false);
  const [targetDesiredGrade, setTargetDesiredGrade] = useState<number>(90);
  const [finalExamWeight, setFinalExamWeight] = useState<number>(20);
  const [savedNotification, setSavedNotification] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('omnigrade_weighted_assignments', JSON.stringify(assignments));
  }, [assignments]);

  const handleAddAssignment = () => {
    const newId = Date.now().toString();
    setAssignments([
      ...assignments,
      { id: newId, name: `Assignment ${assignments.length + 1}`, gradeEarned: '', gradeTotal: 100, weight: '', category: 'Homework' }
    ]);
  };

  const handleRemoveAssignment = (id: string) => {
    if (assignments.length <= 1) return;
    setAssignments(assignments.filter(a => a.id !== id));
  };

  const handleUpdateAssignment = (id: string, field: keyof Assignment, value: any) => {
    setAssignments(assignments.map(a => {
      if (a.id === id) {
        return { ...a, [field]: value };
      }
      return a;
    }));
  };

  const handleReset = () => {
    setAssignments(DEFAULT_ASSIGNMENTS);
    setDropLowest(false);
  };

  const handleLoadPreset = (type: 'stem' | 'humanities' | 'highschool') => {
    if (type === 'stem') {
      setAssignments([
        { id: '1', name: 'Weekly Problem Sets', gradeEarned: 92, gradeTotal: 100, weight: 15, category: 'Homework' },
        { id: '2', name: 'Lab Experiments & Writeups', gradeEarned: 88, gradeTotal: 100, weight: 20, category: 'Labs' },
        { id: '3', name: 'Midterm 1', gradeEarned: 79, gradeTotal: 100, weight: 20, category: 'Exams' },
        { id: '4', name: 'Midterm 2', gradeEarned: 84, gradeTotal: 100, weight: 20, category: 'Exams' },
      ]);
      setFinalExamWeight(25);
    } else if (type === 'humanities') {
      setAssignments([
        { id: '1', name: 'Seminar Participation & Reading Logs', gradeEarned: 96, gradeTotal: 100, weight: 20, category: 'Participation' },
        { id: '2', name: 'Midterm Analytical Essay', gradeEarned: 89, gradeTotal: 100, weight: 25, category: 'Essays' },
        { id: '3', name: 'Peer Review & Workshop Drafts', gradeEarned: 95, gradeTotal: 100, weight: 15, category: 'Essays' },
        { id: '4', name: 'Term Research Project', gradeEarned: 90, gradeTotal: 100, weight: 20, category: 'Projects' },
      ]);
      setFinalExamWeight(20);
    } else {
      setAssignments([
        { id: '1', name: 'Daily Homework & Classwork', gradeEarned: 95, gradeTotal: 100, weight: 30, category: 'Classwork' },
        { id: '2', name: 'Chapter Quizzes', gradeEarned: 88, gradeTotal: 100, weight: 25, category: 'Quizzes' },
        { id: '3', name: 'Unit Assessments & Projects', gradeEarned: 91, gradeTotal: 100, weight: 25, category: 'Tests' },
      ]);
      setFinalExamWeight(20);
    }
  };

  const results = calculateWeightedGrade(assignments, dropLowest);
  const letterInfo = getLetterForPercentage(results.currentGrade);
  const finalNeeded = calculateFinalExamRequired(results.currentGrade, targetDesiredGrade, finalExamWeight);

  const handleCopySummary = () => {
    const text = `OmniGrade Course Summary:
Current Weighted Standing: ${results.currentGrade}% (${letterInfo.letter}, ${letterInfo.gpa} GPA)
Completed Syllabus Weight: ${results.totalCompletedWeight}%
Target Final Grade: ${targetDesiredGrade}%
Final Exam Weight: ${finalExamWeight}%
Required on Final: ${finalNeeded.requiredScore}% (${finalNeeded.statusLabel})
Calculated on: https://omnigrade.org`;
    navigator.clipboard.writeText(text);
    setSavedNotification('Report copied to clipboard!');
    setTimeout(() => setSavedNotification(null), 3000);
  };

  return (
    <div className="space-y-8">
      {/* Intro Header */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-6 mb-6">
          <div>
            <h1 className="font-serif-display text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Weighted Grade Calculator
            </h1>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl">
              Calculate your current course standing based on weighted syllabus categories. Enter your scores, toggle grade drops, and forecast what you need on the final examination.
            </p>
          </div>

          {/* Quick Presets */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-slate-400">Presets:</span>
            <button
              onClick={() => handleLoadPreset('stem')}
              className="px-2.5 py-1 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors cursor-pointer"
            >
              College STEM
            </button>
            <button
              onClick={() => handleLoadPreset('humanities')}
              className="px-2.5 py-1 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors cursor-pointer"
            >
              Liberal Arts
            </button>
            <button
              onClick={() => handleLoadPreset('highschool')}
              className="px-2.5 py-1 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors cursor-pointer"
            >
              High School
            </button>
          </div>
        </div>

        {/* Dynamic Assignment Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <th className="pb-3 pr-4">Assignment / Category</th>
                <th className="pb-3 px-3 w-32">Points Earned</th>
                <th className="pb-3 px-3 w-32">Points Possible</th>
                <th className="pb-3 px-3 w-32">Weight (%)</th>
                <th className="pb-3 pl-3 w-16 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {assignments.map((assignment, index) => {
                const earned = assignment.gradeEarned !== '' ? Number(assignment.gradeEarned) : 0;
                const total = assignment.gradeTotal !== '' ? Number(assignment.gradeTotal) : 100;
                const pct = total > 0 ? Math.round((earned / total) * 1000) / 10 : 0;

                return (
                  <tr key={assignment.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3 pr-4">
                      <input
                        type="text"
                        value={assignment.name}
                        onChange={(e) => handleUpdateAssignment(assignment.id, 'name', e.target.value)}
                        placeholder="e.g. Midterm 1"
                        className="w-full px-3 py-1.5 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                      />
                    </td>
                    <td className="py-3 px-3">
                      <input
                        type="number"
                        min="0"
                        step="any"
                        value={assignment.gradeEarned}
                        onChange={(e) => handleUpdateAssignment(assignment.id, 'gradeEarned', e.target.value === '' ? '' : parseFloat(e.target.value))}
                        placeholder="Score"
                        className="w-full px-3 py-1.5 text-sm font-data-mono bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                      />
                    </td>
                    <td className="py-3 px-3">
                      <input
                        type="number"
                        min="1"
                        step="any"
                        value={assignment.gradeTotal}
                        onChange={(e) => handleUpdateAssignment(assignment.id, 'gradeTotal', e.target.value === '' ? '' : parseFloat(e.target.value))}
                        placeholder="Total"
                        className="w-full px-3 py-1.5 text-sm font-data-mono bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                      />
                    </td>
                    <td className="py-3 px-3">
                      <div className="relative">
                        <input
                          type="number"
                          min="0"
                          max="100"
                          step="any"
                          value={assignment.weight}
                          onChange={(e) => handleUpdateAssignment(assignment.id, 'weight', e.target.value === '' ? '' : parseFloat(e.target.value))}
                          placeholder="Weight"
                          className="w-full px-3 py-1.5 text-sm font-data-mono bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 pr-7"
                        />
                        <span className="absolute right-2.5 top-2 text-xs text-slate-400 font-data-mono">%</span>
                      </div>
                    </td>
                    <td className="py-3 pl-3 text-right">
                      <button
                        onClick={() => handleRemoveAssignment(assignment.id)}
                        disabled={assignments.length <= 1}
                        className="p-1.5 text-slate-400 hover:text-rose-600 disabled:opacity-30 disabled:hover:text-slate-400 rounded-md transition-colors cursor-pointer"
                        title="Delete assignment row"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Action Controls & Options */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-6 pt-4 border-t border-slate-100">
          <div className="flex items-center gap-3">
            <button
              onClick={handleAddAssignment}
              className="px-3.5 py-1.5 text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Assignment Row</span>
            </button>
            <button
              onClick={handleReset}
              className="px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>

          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={dropLowest}
                onChange={(e) => setDropLowest(e.target.checked)}
                className="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500"
              />
              <span>Drop lowest score within categories</span>
            </label>
          </div>
        </div>
      </div>

      {/* Results Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Card 1: Primary Current Grade */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="text-xs font-medium text-slate-500 mb-1">Current Course Standing</div>
            <div className="flex items-baseline gap-3 my-2">
              <span className="font-serif-display text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight font-data-mono">
                {results.currentGrade}%
              </span>
              <span className="text-2xl font-bold text-indigo-600 font-serif-display">
                {letterInfo.letter}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Equivalent to <span className="font-medium text-slate-700 font-data-mono">{letterInfo.gpa}</span> Quality Points on standard 4.0 scale.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 space-y-2 text-xs">
            <div className="flex justify-between text-slate-600">
              <span>Completed Syllabus Weight:</span>
              <span className="font-semibold text-slate-900 font-data-mono">{results.totalCompletedWeight}%</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Remaining Weight:</span>
              <span className="font-semibold text-slate-900 font-data-mono">{Math.max(0, 100 - results.totalCompletedWeight)}%</span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mt-2">
              <div
                className="bg-indigo-600 h-full rounded-full transition-all duration-300"
                style={{ width: `${Math.min(100, results.totalCompletedWeight)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Card 2: Final Exam Target Predictor */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="text-xs font-medium text-slate-500 mb-2">Final Exam Grade Target</div>
            
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div>
                <label className="text-xs text-slate-500 block mb-1">Target Desired Grade</label>
                <div className="relative">
                  <input
                    type="number"
                    min="50"
                    max="100"
                    value={targetDesiredGrade}
                    onChange={(e) => setTargetDesiredGrade(parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-1.5 text-sm font-data-mono bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  />
                  <span className="absolute right-2.5 top-2 text-xs text-slate-400 font-data-mono">%</span>
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-500 block mb-1">Final Exam Weight</label>
                <div className="relative">
                  <input
                    type="number"
                    min="1"
                    max="99"
                    value={finalExamWeight}
                    onChange={(e) => setFinalExamWeight(parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-1.5 text-sm font-data-mono bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  />
                  <span className="absolute right-2.5 top-2 text-xs text-slate-400 font-data-mono">%</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-100">
              <div className="text-xs text-slate-500">Required Score on Final Exam:</div>
              <div className="font-serif-display text-2xl font-bold text-slate-900 mt-1 font-data-mono">
                {finalNeeded.requiredScore}%
              </div>
              <div className="text-xs font-medium text-indigo-700 mt-1">
                {finalNeeded.statusLabel}
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500">Need study planning guidance?</span>
            {onNavigateToGuide && (
              <button
                onClick={() => onNavigateToGuide('how-to-calculate-final-exam-grade')}
                className="text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1 cursor-pointer"
              >
                <span>Read Guide</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>

        {/* Card 3: Report & Quick Sharing */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
              Calculation Summary
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Export your calculation results, download a printable syllabus worksheet, or copy a verified report for academic advising appointments.
            </p>

            <div className="mt-4 space-y-2">
              <button
                onClick={handleCopySummary}
                className="w-full py-2 px-3 text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Copy Calculation Report</span>
              </button>
              
              {onOpenPrint && (
                <button
                  onClick={onOpenPrint}
                  className="w-full py-2 px-3 text-xs font-medium text-slate-700 hover:bg-slate-50 border border-slate-200 rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Grade Worksheet</span>
                </button>
              )}
            </div>

            {savedNotification && (
              <div className="mt-3 p-2 bg-emerald-50 text-emerald-700 text-xs rounded-lg flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                <span>{savedNotification}</span>
              </div>
            )}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-400">
            Auto-saved locally in browser storage.
          </div>
        </div>

      </div>

      {/* Semantic Educational Context & Formulas */}
      <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
        <div>
          <h2 className="font-serif-display text-xl font-bold text-slate-900">
            How Weighted Grades Are Calculated
          </h2>
          <p className="text-sm text-slate-600 mt-2 leading-relaxed">
            In university and secondary school courses, assignments are grouped into categories with assigned percentages (e.g. 20% Homework, 25% Midterm, 30% Final Exam). The arithmetic mean across each category is multiplied by its decimal weight. The sum of these products is then divided by the total completed weight:
          </p>
        </div>

        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/70 font-data-mono text-xs sm:text-sm text-slate-800 overflow-x-auto">
          Weighted Grade = (Category 1 % × Weight 1 + Category 2 % × Weight 2 + ... + Category n % × Weight n) / Total Completed Weight
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-600">
          <div className="p-4 bg-slate-50/70 rounded-xl border border-slate-100">
            <h3 className="font-semibold text-slate-900 mb-1">Ongoing Semester Normalization</h3>
            <p>
              When only 60% of your course assignments have been graded, our calculator divides your earned points by 0.60, accurately projecting your current percentage rather than falsely penalizing you for uncompleted future assignments.
            </p>
          </div>
          <div className="p-4 bg-slate-50/70 rounded-xl border border-slate-100">
            <h3 className="font-semibold text-slate-900 mb-1">Dropping the Lowest Score</h3>
            <p>
              Enabling the drop toggle removes the lowest percentage score within each category, recalculating the average across the remaining items to accurately reflect syllabus forgiveness policies.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
