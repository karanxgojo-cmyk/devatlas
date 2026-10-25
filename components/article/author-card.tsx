import { Author } from '@/types/content';
import { ExternalLink } from 'lucide-react';

interface AuthorCardProps {
  author: Author;
}

function GithubIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

export function AuthorCard({ author }: AuthorCardProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-6 rounded-2xl border border-[#DFD0BE] bg-[#FFF8EE] my-8 shadow-sm">
      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#174B35] to-[#FF8A24] text-[#FFF8EE] font-bold text-xl flex items-center justify-center shrink-0 shadow-sm border-2 border-white">
        {author.name.charAt(0)}
      </div>

      <div className="flex-1 space-y-1">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-[#174B35]">
              {author.name}
            </h3>
            <p className="text-xs text-[#F04B35] font-semibold">
              {author.role}
            </p>
          </div>

          <div className="flex items-center gap-2 text-[#795548]">
            {author.github && (
              <a
                href={author.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#174B35] transition-colors p-1"
                aria-label={`${author.name}'s GitHub profile`}
              >
                <GithubIcon className="w-4 h-4" />
              </a>
            )}
            <ExternalLink className="w-3.5 h-3.5 text-[#795548]" />
          </div>
        </div>

        <p className="text-xs text-[#49372F] leading-relaxed">
          {author.bio}
        </p>
      </div>
    </div>
  );
}
