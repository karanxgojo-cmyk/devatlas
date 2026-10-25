'use client';

import { useState } from 'react';
import { Mail, CheckCircle, ArrowRight } from 'lucide-react';

export function NewsletterCard() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setError('Please provide a valid email address');
      return;
    }
    setError('');
    setSubscribed(true);
  };

  return (
    <div className="relative overflow-hidden rounded-3xl border border-[#FF8190]/40 bg-[#F04B35] p-8 sm:p-12 shadow-xl text-[#FFFFFF]">
      <div className="relative z-10 max-w-2xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFF5E6] text-[#F04B35] border border-[#FFF5E6] text-xs font-semibold uppercase tracking-wider mb-4 shadow-xs">
          <Mail className="w-3.5 h-3.5 text-[#F04B35]" />
          <span>Weekly Engineering Brief</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#FFFFFF] mb-3">
          Level up your systems thinking.
        </h2>

        <p className="text-[#FFF5E6] text-sm sm:text-base leading-relaxed mb-6 font-normal">
          No marketing fluff. Just rigorous technical architecture breakdowns, browser performance optimizations, and deep CS concepts delivered directly to your inbox every Thursday.
        </p>

        {subscribed ? (
          <div className="flex items-center gap-3 p-4 rounded-xl bg-[#FFF5E6] border border-[#FFF5E6] text-[#174B35] text-sm font-semibold">
            <CheckCircle className="w-5 h-5 text-[#174B35] shrink-0" />
            <span>Thank you for subscribing! Your first issue will arrive this Thursday.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="developer@domain.com"
                className="w-full px-4 py-3 rounded-xl bg-[#FFFFFF] border border-[#D9CDBB] text-[#332A26] placeholder:text-[#332A26]/50 focus:outline-none focus:ring-2 focus:ring-[#174B35] text-sm shadow-xs"
                aria-label="Email address for engineering newsletter"
                required
              />
              {error && <p className="text-xs text-white bg-[#174B35] px-2 py-0.5 rounded mt-1 absolute -bottom-6">{error}</p>}
            </div>

            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-[#174B35] hover:bg-[#123d2b] text-[#FFFFFF] font-semibold text-sm transition-colors shadow-md flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFF5E6]"
            >
              <span>Subscribe Free</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        <p className="text-[11px] text-[#FFF5E6]/90 mt-4">
          Zero spam. One-click unsubscribe anytime. Over 14,000 engineers subscribed.
        </p>
      </div>

      {/* Subtle background glow */}
      <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-[#FFF5E6]/10 rounded-full blur-3xl pointer-events-none" />
    </div>
  );
}
