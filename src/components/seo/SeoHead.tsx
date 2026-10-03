import { useEffect } from 'react';
import { AcademicArticle, PageView } from '../../types';

interface SeoHeadProps {
  page: PageView;
  currentArticle?: AcademicArticle;
}

export function SeoHead({ page, currentArticle }: SeoHeadProps) {
  useEffect(() => {
    let title = 'OmniGrade – Free Weighted Grade & GPA Calculator Suite';
    let description = 'Free, secure weighted grade calculator, final exam grade predictor, and GPA calculation suite. Explore comprehensive academic grading guides and planning tools.';

    if (page === 'weighted') {
      title = 'Weighted Grade Calculator – Syllabus Weight & Final Exam Estimator | OmniGrade';
      description = 'Calculate your current weighted course grade and discover what score you need on your final exam. Supports dropped lowest scores and custom syllabus categories.';
    } else if (page === 'final') {
      title = 'Final Exam Grade Calculator – What Grade Do I Need on My Final? | OmniGrade';
      description = 'Find out the exact score you need on your final exam to pass or secure an A. Instant formula calculations with feasibility brackets and tier tables.';
    } else if (page === 'gpa') {
      title = 'College & High School GPA Calculator – Weighted 4.0 & 5.0 Scales | OmniGrade';
      description = 'Calculate your semester and cumulative GPA on 4.0 and 5.0 weighted scales. Includes AP/IB honors weighting and cumulative credit projection.';
    } else if (page === 'converter') {
      title = 'Grade Scale & Letter Converter – US 4.0, Percentage & International | OmniGrade';
      description = 'Convert between letter grades, percentages, and 4.0 GPA quality points. Includes UK Honours classification and European ECTS conversion matrices.';
    } else if (page === 'curve') {
      title = 'Grade Curve Calculator & Visualizer – Flat, Linear & Bell Curves | OmniGrade';
      description = 'Test and visualize standard academic curve algorithms: flat point bumps, linear scaling to top score, square root curve (10×√x), and normal distribution.';
    } else if (page === 'guides') {
      title = 'Academic Grading Knowledge Base – 20+ Guides & Masterclasses | OmniGrade';
      description = 'Comprehensive academic grading guides covering syllabus mathematics, GPA computation, final exam triage, grade curving, and international equivalencies.';
    } else if (page === 'guide-detail' && currentArticle) {
      title = `${currentArticle.title} | OmniGrade`;
      description = currentArticle.excerpt;
    } else if (page === 'about') {
      title = 'About OmniGrade – Our Mission, Methodology & Verification Protocols';
      description = 'Learn about OmniGrade’s academic mission, our mathematical verification standards, and our strict zero-data-collection student privacy stance.';
    } else if (page === 'contact') {
      title = 'Contact OmniGrade – Academic Inquiries, Feedback & Partnerships';
      description = 'Contact our educational team with inquiries, feature suggestions, instructor partnership requests, or calculation support.';
    } else if (page === 'privacy') {
      title = 'Privacy Policy – Client-Side Security & FERPA/COPPA Compliance | OmniGrade';
      description = 'Review our student privacy guarantee: 100% client-side calculation execution, zero storage of student academic data, and FERPA/COPPA compliance.';
    } else if (page === 'disclaimer') {
      title = 'Academic Disclaimer & Calculation Policies | OmniGrade';
      description = 'Important legal and institutional disclaimer regarding unofficial grade estimation, rounding variations, and registrar authority.';
    } else if (page === 'terms') {
      title = 'Terms & Conditions of Service | OmniGrade';
      description = 'Review terms of use, educational licensing, and embed widget usage rules for the OmniGrade calculation platform.';
    }

    document.title = title;

    // Update Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description);

    // Update OpenGraph
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', title);
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', description);

    // Dynamic Article & FAQ JSON-LD Schema
    const existingDynamicScript = document.getElementById('dynamic-jsonld');
    if (existingDynamicScript) {
      existingDynamicScript.remove();
    }

    if (page === 'guide-detail' && currentArticle) {
      const script = document.createElement('script');
      script.id = 'dynamic-jsonld';
      script.type = 'application/ld+json';
      
      const articleSchema = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        'headline': currentArticle.title,
        'description': currentArticle.excerpt,
        'author': {
          '@type': 'Person',
          'name': currentArticle.author,
          'jobTitle': currentArticle.authorRole
        },
        'publisher': {
          '@type': 'Organization',
          'name': 'OmniGrade Academic Calculator',
          'url': 'https://omnigrade.org'
        },
        'datePublished': currentArticle.publishDate,
        'wordCount': currentArticle.wordCount,
        'articleSection': currentArticle.category
      };

      const faqSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        'mainEntity': currentArticle.faqs.map(f => ({
          '@type': 'Question',
          'name': f.question,
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': f.answer
          }
        }))
      };

      script.textContent = JSON.stringify([articleSchema, faqSchema]);
      document.head.appendChild(script);
    }
  }, [page, currentArticle]);

  return null;
}
