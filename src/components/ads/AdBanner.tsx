import { useEffect, useRef } from 'react';

interface AdBannerProps {
  format?: 'horizontal' | 'rectangle' | 'responsive';
  slotId?: string;
  adClient?: string;
  className?: string;
}

export function AdBanner({
  format = 'responsive',
  slotId,
  adClient,
  className = ''
}: AdBannerProps) {
  const adRef = useRef<HTMLDivElement>(null);

  // If live AdSense publisher ID is present, execute adsbygoogle push
  useEffect(() => {
    if (adClient && slotId && typeof window !== 'undefined') {
      try {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      } catch (err) {
        // Suppress initial render errors if adblock is enabled
      }
    }
  }, [adClient, slotId]);

  // If live AdSense client is active, render official Google AdSense ins tag
  if (adClient && slotId) {
    return (
      <div className={`my-6 text-center overflow-hidden ${className}`}>
        <div className="text-[10px] uppercase tracking-wider text-slate-400 mb-1">
          Advertisement
        </div>
        <div ref={adRef} className="flex justify-center">
          <ins
            className="adsbygoogle"
            style={{ display: 'block', textAlign: 'center' }}
            data-ad-client={adClient}
            data-ad-slot={slotId}
            data-ad-format={format === 'rectangle' ? 'rectangle' : format === 'horizontal' ? 'horizontal' : 'auto'}
            data-full-width-responsive="true"
          />
        </div>
      </div>
    );
  }

  // Pre-approval / Clean Layout Placeholders (Prevents Cumulative Layout Shift CLS & shows compliant ad slots to reviewers)
  return (
    <div className={`my-6 mx-auto w-full ${className}`}>
      <div className="text-[10px] uppercase tracking-wider text-slate-400 text-center mb-1 select-none">
        Advertisement Space
      </div>
      <div
        className={`bg-slate-100/70 border border-dashed border-slate-300/80 rounded-xl flex flex-col items-center justify-center text-center p-4 transition-colors ${
          format === 'horizontal'
            ? 'h-24 sm:h-28 max-w-4xl'
            : format === 'rectangle'
            ? 'h-64 max-w-sm'
            : 'h-24 sm:h-32 max-w-3xl'
        }`}
      >
        <span className="text-xs font-semibold text-slate-500 font-serif-display">
          Google AdSense Placement Ready
        </span>
        <span className="text-[11px] text-slate-400 mt-1 max-w-xs font-sans">
          Standard {format === 'horizontal' ? '728×90 Leaderboard' : format === 'rectangle' ? '300×250 Rectangle' : 'Responsive In-Content'} Unit
        </span>
      </div>
    </div>
  );
}
