'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
}

export function CodeBlock({ code, language = 'typescript', filename }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(code);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = code;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="my-6 rounded-xl border border-[#D9CDBB] bg-[#F0E4D3] text-[#332A26] shadow-md overflow-hidden font-mono text-sm">
      {/* Code Header bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#E5D7C3] border-b border-[#D9CDBB] text-xs text-[#332A26]">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#F04B35] inline-block"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-[#FF8A24] inline-block"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-[#174B35] inline-block"></span>
          {filename ? (
            <span className="ml-2 text-[#174B35] font-bold">{filename}</span>
          ) : (
            <span className="ml-2 uppercase tracking-wider text-[11px] font-bold text-[#174B35]">
              {language}
            </span>
          )}
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#FBE2CB] hover:bg-[#ebd0b8] text-[#174B35] border border-[#D9CDBB] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#174B35]"
          aria-label={copied ? 'Code snippet copied' : 'Copy code snippet to clipboard'}
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-[#174B35]" aria-hidden="true" />
              <span className="text-[#174B35] text-[11px] font-bold">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-[#174B35]" aria-hidden="true" />
              <span className="text-[11px] font-semibold text-[#174B35]">Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code Body with data-lenis-prevent to avoid smooth scrolling conflicts on horizontal swipe */}
      <pre
        data-lenis-prevent
        className="p-4 overflow-x-auto text-[13px] leading-relaxed font-mono text-[#332A26] focus:outline-none focus-visible:ring-1 focus-visible:ring-[#174B35]"
        tabIndex={0}
      >
        <code>{code.trim()}</code>
      </pre>
    </div>
  );
}
