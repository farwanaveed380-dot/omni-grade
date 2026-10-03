import { useState, useEffect } from 'react';
import { Cookie, X, Check, Shield } from 'lucide-react';

interface CookieConsentProps {
  onLearnMore: () => void;
}

export function CookieConsent({ onLearnMore }: CookieConsentProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('omnigrade_cookie_consent');
    if (!consent) {
      // Delay showing by 1.5 seconds for clean initial render
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('omnigrade_cookie_consent', 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('omnigrade_cookie_consent', 'essential_only');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Cookie consent banner"
      className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 bg-white border border-slate-200/90 rounded-2xl shadow-xl p-5 text-slate-800 space-y-3 no-print transition-all duration-300 animate-in fade-in slide-in-from-bottom-4"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2 text-indigo-600">
          <Cookie className="w-4 h-4 shrink-0" />
          <h3 className="font-serif-display text-sm font-bold text-slate-900">
            Cookie & Privacy Notice
          </h3>
        </div>
        <button
          onClick={handleDecline}
          aria-label="Close cookie consent"
          className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <p className="text-xs text-slate-600 leading-relaxed font-sans">
        OmniGrade uses essential cookies to ensure calculation reliability and third-party advertising cookies (including Google AdSense) to deliver relevant educational ads and maintain our free tools. We never store personal grade data on servers.
      </p>

      <div className="flex items-center justify-between gap-2 pt-1 text-xs">
        <button
          onClick={onLearnMore}
          className="text-slate-500 hover:text-indigo-600 underline font-medium cursor-pointer"
        >
          Privacy Policy
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handleDecline}
            className="px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
          >
            Essential Only
          </button>
          <button
            onClick={handleAccept}
            className="px-3.5 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-2xs transition-colors cursor-pointer"
          >
            Accept All
          </button>
        </div>
      </div>
    </aside>
  );
}
