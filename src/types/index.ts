export type ToolType = 'weighted' | 'final' | 'gpa' | 'converter' | 'curve';

export type PageView = 
  | ToolType 
  | 'guides' 
  | 'guide-detail' 
  | 'about' 
  | 'contact' 
  | 'privacy' 
  | 'disclaimer' 
  | 'terms';

export interface Assignment {
  id: string;
  name: string;
  gradeEarned: number | '';
  gradeTotal: number | '';
  weight: number | '';
  category: string;
  isExtraCredit?: boolean;
}

export interface CategorySummary {
  category: string;
  totalWeight: number;
  earnedPercentage: number;
  itemsCount: number;
}

export interface GpaCourse {
  id: string;
  name: string;
  letterGrade: string;
  creditHours: number;
  courseType: 'regular' | 'honors' | 'ap_ib' | 'college';
}

export interface GradingScaleTier {
  letter: string;
  minPercent: number;
  maxPercent: number;
  gpaStandard: number;
  gpaHonors: number;
  gpaAP: number;
  description: string;
}

export interface ArticleSection {
  heading: string;
  body: string;
  bullets?: string[];
  formula?: string;
  exampleBox?: {
    title: string;
    description: string;
    steps: string[];
    result: string;
  };
  table?: {
    headers: string[];
    rows: string[][];
  };
}

export interface ArticleFAQ {
  question: string;
  answer: string;
}

export interface AcademicArticle {
  id: string;
  slug: string;
  title: string;
  shortTitle: string;
  category: 'Grade Calculations' | 'Final Exams' | 'GPA Mastery' | 'Academic Policies' | 'Study Strategy';
  author: string;
  authorRole: string;
  publishDate: string;
  readTime: string;
  wordCount: number;
  excerpt: string;
  keyTakeaways: string[];
  sections: ArticleSection[];
  faqs: ArticleFAQ[];
  relatedTool: ToolType;
  relatedArticleSlugs: string[];
}
