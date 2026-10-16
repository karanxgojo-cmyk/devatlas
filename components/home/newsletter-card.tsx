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
    <div className="relative overflow-hidden rounded-2xl border border-blue-200 dark:border-blue-900/60 bg-gradient-to-br from-blue-900 to-indigo-950 text-white p-8 sm:p-12 shadow-lg">
      <div className="relative z-10 max-w-2xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold uppercase tracking-wider mb-4">
          <Mail className="w-3.5 h-3.5" />
          <span>Weekly Engineering Brief</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-3">
          Level up your systems thinking.
        </h2>

        <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
          No marketing fluff. Just rigorous technical architecture breakdowns, browser performance optimizations, and deep CS concepts delivered directly to your inbox every Thursday.
        </p>

        {subscribed ? (
          <div className="flex items-center gap-3 p-4 rounded-xl bg-blue-500/20 border border-blue-400/30 text-emerald-300 text-sm">
            <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
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
                className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-700 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm shadow-inner"
                aria-label="Email address for engineering newsletter"
                required
              />
              {error && <p className="text-xs text-red-300 mt-1 absolute -bottom-5">{error}</p>}
            </div>

            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-colors shadow-md flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
            >
              <span>Subscribe Free</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        <p className="text-[11px] text-slate-400 mt-4">
          Zero spam. One-click unsubscribe anytime. Over 14,000 engineers subscribed.
        </p>
      </div>

      {/* Subtle background glow */}
      <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
    </div>
  );
}
