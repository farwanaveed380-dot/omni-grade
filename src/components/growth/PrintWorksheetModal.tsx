import { X, Printer } from 'lucide-react';

interface PrintWorksheetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PrintWorksheetModal({ isOpen, onClose }: PrintWorksheetModalProps) {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs no-print">
      <div className="bg-white rounded-2xl max-w-3xl w-full p-6 sm:p-8 shadow-xl border border-slate-200 space-y-6 relative max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Printer className="w-5 h-5 text-indigo-600" />
            <h2 className="font-serif-display text-xl font-bold text-slate-900">
              Printable Syllabus Weight & Grade Planning Worksheet
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed">
          Below is a printer-ready syllabus grade tracker. Print this worksheet or save it as a PDF to record assignment categories, weights, target scores, and midterm review dates for your courses.
        </p>

        {/* Printable Area Preview */}
        <div className="p-6 bg-slate-50 border border-slate-200 rounded-xl space-y-6 text-xs text-slate-800">
          <div className="flex justify-between items-center border-b border-slate-300 pb-3">
            <div>
              <div className="font-bold text-base font-serif-display">OmniGrade Academic Planning Worksheet</div>
              <div className="text-[11px] text-slate-500">Course Syllabus & Target Grade Architecture</div>
            </div>
            <div className="text-right text-[11px] text-slate-500">
              <div>Semester / Term: _________________</div>
              <div className="mt-1">Student: _______________________</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>Course Name: __________________________________</div>
            <div>Target Letter Grade: _____ (e.g. A, B+)</div>
          </div>

          {/* Worksheet Table */}
          <table className="w-full text-left border border-slate-300">
            <thead>
              <tr className="bg-slate-200/80 text-[11px] font-bold">
                <th className="p-2 border border-slate-300">Assignment Category</th>
                <th className="p-2 border border-slate-300 w-24">Syllabus Weight</th>
                <th className="p-2 border border-slate-300 w-28">Current Score</th>
                <th className="p-2 border border-slate-300 w-28">Target Score</th>
                <th className="p-2 border border-slate-300">Notes / Drop Rules</th>
              </tr>
            </thead>
            <tbody>
              {['Homework / Problem Sets', 'Quizzes / Reading Checks', 'Laboratory Reports', 'Midterm Exam 1', 'Midterm Exam 2', 'Term Project / Essay', 'Final Examination'].map((item, idx) => (
                <tr key={idx} className="border-b border-slate-200">
                  <td className="p-2 border border-slate-300 font-medium">{item}</td>
                  <td className="p-2 border border-slate-300 font-data-mono">____ %</td>
                  <td className="p-2 border border-slate-300 font-data-mono">____ / ____</td>
                  <td className="p-2 border border-slate-300 font-data-mono">____ %</td>
                  <td className="p-2 border border-slate-300 text-slate-400 text-[11px]"></td>
                </tr>
              ))}
              <tr className="bg-slate-100 font-bold">
                <td className="p-2 border border-slate-300">TOTAL SYLLABUS WEIGHT</td>
                <td className="p-2 border border-slate-300 font-data-mono">100 %</td>
                <td colSpan={3} className="p-2 border border-slate-300 text-[11px] text-slate-600 font-normal">
                  Calculate weighted standing on https://omnigrade.org
                </td>
              </tr>
            </tbody>
          </table>

          <div className="border border-slate-300 p-3 rounded-lg bg-white space-y-1">
            <div className="font-bold text-[11px]">Final Exam Preparation Checklist:</div>
            <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600">
              <div>[ ] Calculated minimum required score on final</div>
              <div>[ ] Attended professor / TA review session</div>
              <div>[ ] Solved past 3 semester exam archives</div>
              <div>[ ] Reviewed highest-weight category errors</div>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-800 rounded-lg cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handlePrint}
            className="px-5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <Printer className="w-4 h-4" />
            <span>Print Worksheet / Save PDF</span>
          </button>
        </div>

      </div>
    </div>
  );
}
