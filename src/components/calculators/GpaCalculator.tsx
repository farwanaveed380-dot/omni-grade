import { useState, useEffect } from 'react';
import { GpaCourse } from '../../types';
import { calculateGPA, STANDARD_GRADING_SCALE } from '../../utils/calculatorMath';
import { Plus, Trash2, RotateCcw, GraduationCap, Award, HelpCircle, ArrowRight } from 'lucide-react';

interface GpaCalculatorProps {
  onNavigateToGuide?: (slug: string) => void;
}

const DEFAULT_COURSES: GpaCourse[] = [
  { id: '1', name: 'Calculus II', letterGrade: 'A', creditHours: 4, courseType: 'college' },
  { id: '2', name: 'General Chemistry I & Lab', letterGrade: 'B+', creditHours: 4, courseType: 'college' },
  { id: '3', name: 'Introduction to Computer Science', letterGrade: 'A-', creditHours: 3, courseType: 'college' },
  { id: '4', name: 'Academic Writing & Rhetoric', letterGrade: 'A', creditHours: 3, courseType: 'college' },
  { id: '5', name: 'University Seminar', letterGrade: 'A', creditHours: 1, courseType: 'college' },
];

export function GpaCalculator({ onNavigateToGuide }: GpaCalculatorProps) {
  const [courses, setCourses] = useState<GpaCourse[]>(() => {
    const saved = localStorage.getItem('omnigrade_gpa_courses');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* use default */ }
    }
    return DEFAULT_COURSES;
  });

  const [scaleMode, setScaleMode] = useState<'college' | 'highschool'>('college');
  const [priorGpa, setPriorGpa] = useState<number>(3.45);
  const [priorCredits, setPriorCredits] = useState<number>(45);

  useEffect(() => {
    localStorage.setItem('omnigrade_gpa_courses', JSON.stringify(courses));
  }, [courses]);

  const handleAddCourse = () => {
    const newId = Date.now().toString();
    setCourses([
      ...courses,
      { id: newId, name: `Course ${courses.length + 1}`, letterGrade: 'A', creditHours: 3, courseType: scaleMode === 'highschool' ? 'regular' : 'college' }
    ]);
  };

  const handleRemoveCourse = (id: string) => {
    if (courses.length <= 1) return;
    setCourses(courses.filter(c => c.id !== id));
  };

  const handleUpdateCourse = (id: string, field: keyof GpaCourse, value: any) => {
    setCourses(courses.map(c => {
      if (c.id === id) {
        return { ...c, [field]: value };
      }
      return c;
    }));
  };

  const handleReset = () => {
    setCourses(DEFAULT_COURSES);
    setPriorGpa(3.45);
    setPriorCredits(45);
  };

  const gpaResult = calculateGPA(courses, priorGpa, priorCredits);

  return (
    <div className="space-y-8">
      {/* Intro Header */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-6 mb-6">
          <div>
            <h1 className="font-serif-display text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              College & High School GPA Calculator
            </h1>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl">
              Calculate semester and cumulative Grade Point Averages across 4.0 standard and 5.0 weighted scales. Factor in honors, AP/IB bonuses, and credit-hour quality points.
            </p>
          </div>

          {/* Scale Selector */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg">
            <button
              onClick={() => setScaleMode('college')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                scaleMode === 'college'
                  ? 'bg-white text-indigo-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              College 4.0 Scale
            </button>
            <button
              onClick={() => setScaleMode('highschool')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                scaleMode === 'highschool'
                  ? 'bg-white text-indigo-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              High School Weighted 5.0
            </button>
          </div>
        </div>

        {/* Dynamic Course Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <th className="pb-3 pr-4">Course Title</th>
                <th className="pb-3 px-3 w-36">Grade Earned</th>
                <th className="pb-3 px-3 w-32">Credits / Units</th>
                {scaleMode === 'highschool' && <th className="pb-3 px-3 w-40">Course Rigor</th>}
                <th className="pb-3 pl-3 w-16 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {courses.map((course) => (
                <tr key={course.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3 pr-4">
                    <input
                      type="text"
                      value={course.name}
                      onChange={(e) => handleUpdateCourse(course.id, 'name', e.target.value)}
                      placeholder="e.g. Organic Chemistry"
                      className="w-full px-3 py-1.5 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                    />
                  </td>
                  <td className="py-3 px-3">
                    <select
                      value={course.letterGrade}
                      onChange={(e) => handleUpdateCourse(course.id, 'letterGrade', e.target.value)}
                      className="w-full px-3 py-1.5 text-sm font-data-mono bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                    >
                      {STANDARD_GRADING_SCALE.map((s) => (
                        <option key={s.letter} value={s.letter}>
                          {s.letter} ({s.gpaStandard.toFixed(1)})
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="py-3 px-3">
                    <input
                      type="number"
                      min="0.5"
                      max="10"
                      step="0.5"
                      value={course.creditHours}
                      onChange={(e) => handleUpdateCourse(course.id, 'creditHours', parseFloat(e.target.value) || 0)}
                      className="w-full px-3 py-1.5 text-sm font-data-mono bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                    />
                  </td>
                  {scaleMode === 'highschool' && (
                    <td className="py-3 px-3">
                      <select
                        value={course.courseType}
                        onChange={(e) => handleUpdateCourse(course.id, 'courseType', e.target.value)}
                        className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                      >
                        <option value="regular">Regular (+0.0)</option>
                        <option value="honors">Honors (+0.5)</option>
                        <option value="ap_ib">AP / IB / Dual (+1.0)</option>
                      </select>
                    </td>
                  )}
                  <td className="py-3 pl-3 text-right">
                    <button
                      onClick={() => handleRemoveCourse(course.id)}
                      disabled={courses.length <= 1}
                      className="p-1.5 text-slate-400 hover:text-rose-600 disabled:opacity-30 rounded-md transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-3 mt-6 pt-4 border-t border-slate-100">
          <button
            onClick={handleAddCourse}
            className="px-3.5 py-1.5 text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Course Row</span>
          </button>
          <button
            onClick={handleReset}
            className="px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>
        </div>
      </div>

      {/* Results Dashboard Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Semester GPA */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="text-xs font-medium text-slate-500 mb-1">
              Semester GPA ({scaleMode === 'highschool' ? 'Unweighted' : 'Standard'})
            </div>
            <div className="font-serif-display text-4xl sm:text-5xl font-bold text-slate-900 my-2 font-data-mono">
              {gpaResult.semesterUnweightedGPA.toFixed(2)}
            </div>
            {scaleMode === 'highschool' && (
              <div className="text-xs text-indigo-600 font-semibold mt-1">
                Weighted GPA: <span className="font-data-mono">{gpaResult.semesterWeightedGPA.toFixed(2)}</span>
              </div>
            )}
            <p className="text-xs text-slate-500 mt-2">
              Across <strong className="text-slate-800 font-data-mono">{gpaResult.semesterCredits}</strong> attempted credit hours this term.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 text-xs">
            <span className="text-slate-400">Quality Points: </span>
            <span className="font-semibold text-slate-700 font-data-mono">
              {(gpaResult.semesterUnweightedGPA * gpaResult.semesterCredits).toFixed(1)}
            </span>
          </div>
        </div>

        {/* Cumulative GPA Forecast */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="text-xs font-medium text-slate-500 mb-2">Cumulative GPA Forecaster</div>
            
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div>
                <label className="text-xs text-slate-500 block mb-1">Prior GPA</label>
                <input
                  type="number"
                  min="0"
                  max="5.0"
                  step="0.01"
                  value={priorGpa}
                  onChange={(e) => setPriorGpa(parseFloat(e.target.value) || 0)}
                  className="w-full px-2.5 py-1.5 text-xs font-data-mono bg-slate-50 border border-slate-200 rounded-lg"
                />
              </div>
              <div>
                <label className="text-xs text-slate-500 block mb-1">Prior Credits</label>
                <input
                  type="number"
                  min="0"
                  max="200"
                  step="1"
                  value={priorCredits}
                  onChange={(e) => setPriorCredits(parseFloat(e.target.value) || 0)}
                  className="w-full px-2.5 py-1.5 text-xs font-data-mono bg-slate-50 border border-slate-200 rounded-lg"
                />
              </div>
            </div>

            <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
              <div className="text-xs text-slate-500">Projected Cumulative GPA:</div>
              <div className="font-serif-display text-2xl font-bold text-slate-900 mt-0.5 font-data-mono">
                {gpaResult.cumulativeGPA.toFixed(2)}
              </div>
              <div className="text-xs text-slate-500 mt-1">
                Total Credits: <span className="font-data-mono font-medium text-slate-800">{gpaResult.totalCumulativeCredits}</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-400">
            Calculated via Quality Points formula.
          </div>
        </div>

        {/* Academic Standing */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
              <GraduationCap className="w-4 h-4 text-indigo-600" />
              <span>Projected Standing</span>
            </div>

            <div className="mt-3 p-3.5 bg-indigo-50/60 rounded-xl border border-indigo-100/60">
              <div className="font-serif-display text-base font-bold text-indigo-950">
                {gpaResult.academicStanding}
              </div>
              <p className="text-xs text-indigo-800/80 mt-1 leading-relaxed">
                {gpaResult.cumulativeGPA >= 3.5
                  ? 'Qualifies for collegiate Dean’s List recognition and honors society eligibility.'
                  : gpaResult.cumulativeGPA >= 2.0
                  ? 'Satisfactory academic progress in good standing under standard collegiate guidelines.'
                  : 'Below 2.0 threshold. Academic advising intervention recommended.'}
              </p>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500">Need recovery strategy?</span>
            {onNavigateToGuide && (
              <button
                onClick={() => onNavigateToGuide('how-cumulative-gpa-is-calculated')}
                className="text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1 cursor-pointer"
              >
                <span>Read Guide</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
