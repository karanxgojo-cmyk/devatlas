import { Prerequisite } from '@/types/content';
import { BookOpen, ExternalLink } from 'lucide-react';

interface PrerequisitesProps {
  items: Prerequisite[];
}

export function Prerequisites({ items }: PrerequisitesProps) {
  if (!items || items.length === 0) return null;

  return (
    <div className="my-8 rounded-xl border border-[#DFD0BE] bg-[#FFF8EE] p-6 shadow-xs text-[#49372F]">
      <div className="flex items-center gap-2 mb-3">
        <BookOpen className="w-4 h-4 text-[#174B35]" aria-hidden="true" />
        <h2 className="text-sm font-bold uppercase tracking-wider text-[#174B35]">
          What You Should Know First
        </h2>
      </div>

      <p className="text-xs text-[#49372F] mb-4">
        To get the most out of this architecture guide, we recommend reviewing these foundational concepts:
      </p>

      <div className="space-y-3">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-4 p-3 rounded-lg bg-[#F5F0E8] border border-[#DFD0BE]"
          >
            <div>
              <a
                href={item.url}
                target={item.url.startsWith('http') ? '_blank' : undefined}
                rel={item.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="text-xs font-bold text-[#174B35] hover:text-[#F04B35] hover:underline flex items-center gap-1"
              >
                <span>{item.title}</span>
                {item.url.startsWith('http') && <ExternalLink className="w-3 h-3 text-[#795548]" />}
              </a>
              <p className="text-xs text-[#795548] mt-0.5">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
