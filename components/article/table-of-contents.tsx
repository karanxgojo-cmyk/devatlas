'use client';

import { useState, useEffect } from 'react';
import { HeadingItem } from '@/types/content';
import { useLenis } from 'lenis/react';
import { ListTree } from 'lucide-react';

interface TableOfContentsProps {
  headings: HeadingItem[];
}

export function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>(headings[0]?.id || '');
  const lenis = useLenis();

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-80px 0% -65% 0%',
        threshold: 0.1,
      }
    );

    headings.forEach((heading) => {
      const el = document.getElementById(heading.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  const handleScrollTo = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const targetEl = document.getElementById(id);
    if (!targetEl) return;

    if (lenis) {
      // Use Lenis smooth scroll with sticky header offset
      lenis.scrollTo(targetEl, {
        offset: -90,
        duration: 1.0,
      });
    } else {
      // Fallback native scroll
      const rect = targetEl.getBoundingClientRect();
      const top = rect.top + window.scrollY - 90;
      window.scrollTo({ top, behavior: 'smooth' });
    }

    setActiveId(id);
    window.history.pushState(null, '', `#${id}`);
  };

  if (headings.length === 0) return null;

  return (
    <nav
      className="sticky top-24 rounded-xl border border-[#DFD0BE] bg-[#FFF8EE] p-5 shadow-xs"
      aria-label="Table of contents"
    >
      <div className="flex items-center gap-2 mb-4 text-xs font-semibold uppercase tracking-wider text-[#174B35]">
        <ListTree className="w-4 h-4 text-[#F04B35]" aria-hidden="true" />
        <span>On This Page</span>
      </div>

      <ul className="space-y-2 text-sm border-l border-[#DFD0BE] ml-1">
        {headings.map((heading) => {
          const isActive = activeId === heading.id;
          return (
            <li
              key={heading.id}
              className={`${heading.level === 3 ? 'pl-5' : 'pl-3'}`}
            >
              <a
                href={`#${heading.id}`}
                onClick={(e) => handleScrollTo(e, heading.id)}
                className={`block py-1 text-xs transition-colors rounded-r-sm -ml-px border-l-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#174B35] ${
                  isActive
                    ? 'border-[#F04B35] text-[#F04B35] font-bold'
                    : 'border-transparent text-[#49372F] hover:text-[#F04B35] hover:border-[#F04B35]/40'
                }`}
                aria-current={isActive ? 'location' : undefined}
              >
                {heading.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
