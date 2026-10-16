import { Prerequisite } from '@/types/content';
import { BookOpen, ExternalLink } from 'lucide-react';

interface PrerequisitesProps {
  items: Prerequisite[];
}

export function Prerequisites({ items }: PrerequisitesProps) {
  if (!items || items.length === 0) return null;

  return (
    <div className="my-8 rounded-xl border border-blue-200 dark:border-blue-900/60 bg-blue-50/50 dark:bg-blue-950/20 p-6">
      <div className="flex items-center gap-2 mb-3">
        <BookOpen className="w-4 h-4 text-blue-600 dark:text-blue-400" aria-hidden="true" />
        <h2 className="text-sm font-bold uppercase tracking-wider text-blue-900 dark:text-blue-300">
          What You Should Know First
        </h2>
      </div>

      <p className="text-xs text-slate-600 dark:text-slate-400 mb-4">
        To get the most out of this architecture guide, we recommend reviewing these foundational concepts:
      </p>

      <div className="space-y-3">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-4 p-3 rounded-lg bg-white dark:bg-slate-900/80 border border-blue-100 dark:border-blue-900/40"
          >
            <div>
              <a
                href={item.url}
                target={item.url.startsWith('http') ? '_blank' : undefined}
                rel={item.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="text-xs font-semibold text-blue-700 dark:text-blue-300 hover:underline flex items-center gap-1"
              >
                <span>{item.title}</span>
                {item.url.startsWith('http') && <ExternalLink className="w-3 h-3 text-slate-400" />}
              </a>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
