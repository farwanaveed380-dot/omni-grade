import { Assignment, GpaCourse, GradingScaleTier } from '../types';

export const STANDARD_GRADING_SCALE: GradingScaleTier[] = [
  { letter: 'A+', minPercent: 97, maxPercent: 100, gpaStandard: 4.0, gpaHonors: 4.5, gpaAP: 5.0, description: 'Outstanding Academic Performance' },
  { letter: 'A',  minPercent: 93, maxPercent: 96.99, gpaStandard: 4.0, gpaHonors: 4.5, gpaAP: 5.0, description: 'Excellent Mastery of Material' },
  { letter: 'A-', minPercent: 90, maxPercent: 92.99, gpaStandard: 3.7, gpaHonors: 4.2, gpaAP: 4.7, description: 'Superior Achievement' },
  { letter: 'B+', minPercent: 87, maxPercent: 89.99, gpaStandard: 3.3, gpaHonors: 3.8, gpaAP: 4.3, description: 'Very Good Comprehension' },
  { letter: 'B',  minPercent: 83, maxPercent: 86.99, gpaStandard: 3.0, gpaHonors: 3.5, gpaAP: 4.0, description: 'Good Understanding' },
  { letter: 'B-', minPercent: 80, maxPercent: 82.99, gpaStandard: 2.7, gpaHonors: 3.2, gpaAP: 3.7, description: 'Adequate Competence' },
  { letter: 'C+', minPercent: 77, maxPercent: 79.99, gpaStandard: 2.3, gpaHonors: 2.8, gpaAP: 3.3, description: 'Satisfactory Performance' },
  { letter: 'C',  minPercent: 73, maxPercent: 76.99, gpaStandard: 2.0, gpaHonors: 2.5, gpaAP: 3.0, description: 'Acceptable Baseline' },
  { letter: 'C-', minPercent: 70, maxPercent: 72.99, gpaStandard: 1.7, gpaHonors: 2.2, gpaAP: 2.7, description: 'Marginal Performance' },
  { letter: 'D+', minPercent: 67, maxPercent: 69.99, gpaStandard: 1.3, gpaHonors: 1.8, gpaAP: 2.3, description: 'Below Average Passing' },
  { letter: 'D',  minPercent: 63, maxPercent: 66.99, gpaStandard: 1.0, gpaHonors: 1.5, gpaAP: 2.0, description: 'Minimum Passing' },
  { letter: 'D-', minPercent: 60, maxPercent: 62.99, gpaStandard: 0.7, gpaHonors: 1.2, gpaAP: 1.7, description: 'Critical Passing Limit' },
  { letter: 'F',  minPercent: 0,  maxPercent: 59.99, gpaStandard: 0.0, gpaHonors: 0.0, gpaAP: 0.0, description: 'Failing / No Credit' },
];

export function getLetterForPercentage(percent: number): { letter: string; gpa: number; description: string } {
  if (isNaN(percent) || percent < 0) return { letter: 'F', gpa: 0.0, description: 'Failing / No Credit' };
  for (const tier of STANDARD_GRADING_SCALE) {
    if (percent >= tier.minPercent) {
      return { letter: tier.letter, gpa: tier.gpaStandard, description: tier.description };
    }
  }
  return { letter: 'F', gpa: 0.0, description: 'Failing / No Credit' };
}

export function calculateWeightedGrade(
  assignments: Assignment[],
  dropLowestByCategory: boolean = false
): {
  currentGrade: number;
  totalCompletedWeight: number;
  categoryBreakdown: { category: string; weight: number; earned: number; count: number }[];
  isPassing: boolean;
} {
  const valid = assignments.filter(
    (a) => a.gradeEarned !== '' && a.gradeTotal !== '' && Number(a.gradeTotal) > 0
  );

  if (valid.length === 0) {
    return { currentGrade: 0, totalCompletedWeight: 0, categoryBreakdown: [], isPassing: false };
  }

  // Group by category if weights are set per category or assignment
  const categoriesMap = new Map<string, { earned: number; total: number; weight: number; items: { score: number; weight: number }[] }>();

  for (const item of valid) {
    const earned = Number(item.gradeEarned);
    const total = Number(item.gradeTotal);
    const weight = Number(item.weight) > 0 ? Number(item.weight) : 1;
    const cat = item.category || 'General';

    if (!categoriesMap.has(cat)) {
      categoriesMap.set(cat, { earned: 0, total: 0, weight: 0, items: [] });
    }
    const catData = categoriesMap.get(cat)!;
    const percentage = (earned / total) * 100;
    catData.items.push({ score: percentage, weight });
    catData.weight += weight;
  }

  let totalWeightSum = 0;
  let weightedScoreSum = 0;
  const categoryBreakdown: { category: string; weight: number; earned: number; count: number }[] = [];

  for (const [catName, catData] of categoriesMap.entries()) {
    let itemsToInclude = catData.items;

    if (dropLowestByCategory && catData.items.length > 1) {
      // Find lowest percentage
      let lowestIndex = 0;
      let minScore = catData.items[0].score;
      for (let i = 1; i < catData.items.length; i++) {
        if (catData.items[i].score < minScore) {
          minScore = catData.items[i].score;
          lowestIndex = i;
        }
      }
      itemsToInclude = catData.items.filter((_, idx) => idx !== lowestIndex);
    }

    const catItemsWeight = itemsToInclude.reduce((sum, item) => sum + item.weight, 0);
    const catWeightedScore = itemsToInclude.reduce((sum, item) => sum + (item.score * item.weight), 0);
    const catAverage = catItemsWeight > 0 ? catWeightedScore / catItemsWeight : 0;

    totalWeightSum += catItemsWeight;
    weightedScoreSum += catWeightedScore;

    categoryBreakdown.push({
      category: catName,
      weight: catItemsWeight,
      earned: Math.round(catAverage * 100) / 100,
      count: itemsToInclude.length
    });
  }

  const finalPercentage = totalWeightSum > 0 ? (weightedScoreSum / totalWeightSum) : 0;

  return {
    currentGrade: Math.round(finalPercentage * 100) / 100,
    totalCompletedWeight: Math.round(totalWeightSum * 100) / 100,
    categoryBreakdown,
    isPassing: finalPercentage >= 60
  };
}

export function calculateFinalExamRequired(
  currentGrade: number,
  targetGrade: number,
  finalExamWeight: number
): {
  requiredScore: number;
  isFeasible: boolean;
  isGuaranteed: boolean;
  statusLabel: string;
} {
  if (finalExamWeight <= 0 || finalExamWeight >= 100) {
    return {
      requiredScore: targetGrade,
      isFeasible: targetGrade <= 100,
      isGuaranteed: false,
      statusLabel: 'Invalid final weight (must be 1-99%)'
    };
  }

  const remainingWeight = (100 - finalExamWeight) / 100;
  const examWeightRatio = finalExamWeight / 100;

  // Formula: Target = (Current * remainingWeight) + (Required * examWeightRatio)
  // Required = (Target - Current * remainingWeight) / examWeightRatio
  const required = (targetGrade - (currentGrade * remainingWeight)) / examWeightRatio;
  const rounded = Math.round(required * 10) / 10;

  let statusLabel = 'Achievable';
  let isFeasible = true;
  let isGuaranteed = false;

  if (rounded <= 0) {
    statusLabel = 'Target Guaranteed (Already Secured!)';
    isGuaranteed = true;
  } else if (rounded <= 75) {
    statusLabel = 'Comfortable Target';
  } else if (rounded <= 90) {
    statusLabel = 'Feasible with Focused Study';
  } else if (rounded <= 100) {
    statusLabel = 'Challenging (Requires High Mastery)';
  } else if (rounded <= 105) {
    statusLabel = 'Difficult (May Require Extra Credit)';
    isFeasible = false;
  } else {
    statusLabel = 'Mathematically Out of Reach';
    isFeasible = false;
  }

  return {
    requiredScore: rounded,
    isFeasible,
    isGuaranteed,
    statusLabel
  };
}

export function calculateGPA(
  courses: GpaCourse[],
  priorGpa: number = 0,
  priorCredits: number = 0
): {
  semesterUnweightedGPA: number;
  semesterWeightedGPA: number;
  semesterCredits: number;
  cumulativeGPA: number;
  totalCumulativeCredits: number;
  academicStanding: string;
} {
  const validCourses = courses.filter((c) => c.creditHours > 0 && c.letterGrade);
  if (validCourses.length === 0) {
    return {
      semesterUnweightedGPA: 0,
      semesterWeightedGPA: 0,
      semesterCredits: 0,
      cumulativeGPA: priorGpa,
      totalCumulativeCredits: priorCredits,
      academicStanding: 'No Course Data'
    };
  }

  let totalCredits = 0;
  let totalUnweightedPoints = 0;
  let totalWeightedPoints = 0;

  for (const course of validCourses) {
    const tier = STANDARD_GRADING_SCALE.find((t) => t.letter === course.letterGrade) || {
      gpaStandard: 0,
      gpaHonors: 0,
      gpaAP: 0
    };

    const credits = Number(course.creditHours);
    totalCredits += credits;
    totalUnweightedPoints += tier.gpaStandard * credits;

    let weightedPoint = tier.gpaStandard;
    if (course.courseType === 'honors') {
      weightedPoint = tier.gpaHonors;
    } else if (course.courseType === 'ap_ib' || course.courseType === 'college') {
      weightedPoint = tier.gpaAP;
    }
    totalWeightedPoints += weightedPoint * credits;
  }

  const semesterUnweightedGPA = totalCredits > 0 ? totalUnweightedPoints / totalCredits : 0;
  const semesterWeightedGPA = totalCredits > 0 ? totalWeightedPoints / totalCredits : 0;

  // Cumulative
  const totalCumulativeCredits = priorCredits + totalCredits;
  const cumulativeQualityPoints = (priorGpa * priorCredits) + totalUnweightedPoints;
  const cumulativeGPA = totalCumulativeCredits > 0 ? cumulativeQualityPoints / totalCumulativeCredits : semesterUnweightedGPA;

  let academicStanding = 'Good Standing';
  if (cumulativeGPA >= 3.9) {
    academicStanding = 'Summa Cum Laude (Highest Honors)';
  } else if (cumulativeGPA >= 3.7) {
    academicStanding = 'Magna Cum Laude / Dean\'s List';
  } else if (cumulativeGPA >= 3.5) {
    academicStanding = 'Cum Laude / Dean\'s List';
  } else if (cumulativeGPA >= 2.0) {
    academicStanding = 'Good Standing';
  } else if (cumulativeGPA >= 1.5) {
    academicStanding = 'Academic Warning';
  } else {
    academicStanding = 'Academic Probation';
  }

  return {
    semesterUnweightedGPA: Math.round(semesterUnweightedGPA * 100) / 100,
    semesterWeightedGPA: Math.round(semesterWeightedGPA * 100) / 100,
    semesterCredits: totalCredits,
    cumulativeGPA: Math.round(cumulativeGPA * 100) / 100,
    totalCumulativeCredits,
    academicStanding
  };
}

export function applyGradeCurve(
  rawScores: number[],
  curveMethod: 'flat' | 'linear_max' | 'sqrt' | 'bell',
  parameter: number = 5
): {
  originalAverage: number;
  curvedAverage: number;
  curvedScores: number[];
  gain: number;
} {
  if (rawScores.length === 0) {
    return { originalAverage: 0, curvedAverage: 0, curvedScores: [], gain: 0 };
  }

  const sum = rawScores.reduce((a, b) => a + b, 0);
  const originalAverage = Math.round((sum / rawScores.length) * 10) / 10;
  const maxScore = Math.max(...rawScores);

  let curvedScores: number[] = [];

  switch (curveMethod) {
    case 'flat':
      // Add flat points
      curvedScores = rawScores.map((score) => Math.min(100, Math.round(score + parameter)));
      break;
    case 'linear_max':
      // Bump highest score to 100, everyone gets difference
      const bump = Math.max(0, 100 - maxScore);
      curvedScores = rawScores.map((score) => Math.min(100, Math.round(score + bump)));
      break;
    case 'sqrt':
      // Square root curve: 10 * sqrt(score)
      curvedScores = rawScores.map((score) => Math.min(100, Math.round(Math.sqrt(Math.max(0, score)) * 10)));
      break;
    case 'bell':
      // Standardized normalized curve
      const mean = originalAverage;
      const variance = rawScores.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / rawScores.length;
      const stdDev = Math.sqrt(variance) || 1;
      const targetMean = 78; // B- target average
      const targetStdDev = 12;
      curvedScores = rawScores.map((score) => {
        const z = (score - mean) / stdDev;
        const projected = targetMean + (z * targetStdDev);
        return Math.min(100, Math.max(0, Math.round(projected)));
      });
      break;
  }

  const curvedSum = curvedScores.reduce((a, b) => a + b, 0);
  const curvedAverage = Math.round((curvedSum / curvedScores.length) * 10) / 10;

  return {
    originalAverage,
    curvedAverage,
    curvedScores,
    gain: Math.round((curvedAverage - originalAverage) * 10) / 10
  };
}
