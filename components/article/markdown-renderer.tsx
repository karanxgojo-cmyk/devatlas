'use client';

import React from 'react';
import { CodeBlock } from './code-block';
import { useFontSize } from '@/components/providers/font-size-provider';
import { Hash } from 'lucide-react';

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const { fontSizeClass } = useFontSize();

  // Parse lines into tokens: headings, code blocks, lists, paragraphs, tables
  const lines = content.trim().split('\n');
  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // 1. Code blocks: ```language
    if (line.trim().startsWith('```')) {
      const langMatch = line.trim().match(/^```([a-zA-Z0-9_-]*)/);
      const language = langMatch && langMatch[1] ? langMatch[1] : 'typescript';
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith('```')) {
        codeLines.push(lines[i]);
        i++;
      }
      i++; // skip closing ```
      elements.push(
        <CodeBlock
          key={`code-${i}`}
          code={codeLines.join('\n')}
          language={language}
        />
      );
      continue;
    }

    // 2. Table: lines starting with |
    if (line.trim().startsWith('|')) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('|')) {
        tableLines.push(lines[i]);
        i++;
      }
      elements.push(
        <div key={`table-${i}`} className="my-6 overflow-x-auto" data-lenis-prevent>
          <table className="w-full text-left border-collapse border border-slate-200 dark:border-slate-800 text-sm">
            <tbody>
              {tableLines.map((tLine, rIdx) => {
                const cells = tLine
                  .split('|')
                  .filter((_, cIdx, arr) => cIdx > 0 && cIdx < arr.length - 1)
                  .map((c) => c.trim());

                if (cells.every((c) => /^[-:]+$/.test(c))) {
                  return null; // separator row
                }

                const isHeader = rIdx === 0;
                return (
                  <tr
                    key={rIdx}
                    className={
                      isHeader
                        ? 'bg-slate-100 dark:bg-slate-800/80 font-semibold text-slate-900 dark:text-white'
                        : 'border-b border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/40'
                    }
                  >
                    {cells.map((cell, cIdx) =>
                      isHeader ? (
                        <th key={cIdx} className="p-3 border-r border-slate-200 dark:border-slate-800">
                          {renderInline(cell)}
                        </th>
                      ) : (
                        <td key={cIdx} className="p-3 border-r border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300">
                          {renderInline(cell)}
                        </td>
                      )
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
      continue;
    }

    // 3. Headings: ## or ###
    if (line.startsWith('## ')) {
      const title = line.replace('## ', '').trim();
      const id = slugify(title);
      elements.push(
        <h2
          key={`h2-${i}`}
          id={id}
          className="group flex items-center gap-2 text-2xl font-bold tracking-tight text-slate-900 dark:text-white mt-10 mb-4 pt-4 border-t border-slate-100 dark:border-slate-800/60 scroll-mt-24"
        >
          <span>{title}</span>
          <a
            href={`#${id}`}
            className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-blue-600 transition-opacity p-1"
            aria-label={`Link to section ${title}`}
          >
            <Hash className="w-4 h-4" />
          </a>
        </h2>
      );
      i++;
      continue;
    }

    if (line.startsWith('### ')) {
      const title = line.replace('### ', '').trim();
      const id = slugify(title);
      elements.push(
        <h3
          key={`h3-${i}`}
          id={id}
          className="group flex items-center gap-2 text-lg font-bold text-slate-800 dark:text-slate-200 mt-6 mb-3 scroll-mt-24"
        >
          <span>{title}</span>
          <a
            href={`#${id}`}
            className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-blue-600 transition-opacity p-1"
            aria-label={`Link to subsection ${title}`}
          >
            <Hash className="w-3.5 h-3.5" />
          </a>
        </h3>
      );
      i++;
      continue;
    }

    // 4. Blockquote / Callout
    if (line.startsWith('> ')) {
      const quoteText = line.replace('> ', '').trim();
      elements.push(
        <blockquote
          key={`quote-${i}`}
          className="my-4 pl-4 border-l-4 border-blue-500 bg-blue-50/50 dark:bg-blue-950/20 p-3 rounded-r-lg text-slate-700 dark:text-slate-300 italic text-sm"
        >
          {renderInline(quoteText)}
        </blockquote>
      );
      i++;
      continue;
    }

    // 5. Unordered List
    if (line.startsWith('- ') || line.startsWith('* ')) {
      const listItems: string[] = [];
      while (i < lines.length && (lines[i].startsWith('- ') || lines[i].startsWith('* '))) {
        listItems.push(lines[i].replace(/^[-*]\s+/, ''));
        i++;
      }
      elements.push(
        <ul key={`ul-${i}`} className="my-4 space-y-2 list-disc list-inside text-slate-700 dark:text-slate-300 pl-2">
          {listItems.map((item, idx) => (
            <li key={idx} className="leading-relaxed">
              {renderInline(item)}
            </li>
          ))}
        </ul>
      );
      continue;
    }

    // 6. Ordered List
    if (/^\d+\.\s/.test(line)) {
      const listItems: string[] = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i])) {
        listItems.push(lines[i].replace(/^\d+\.\s+/, ''));
        i++;
      }
      elements.push(
        <ol key={`ol-${i}`} className="my-4 space-y-2 list-decimal list-inside text-slate-700 dark:text-slate-300 pl-2">
          {listItems.map((item, idx) => (
            <li key={idx} className="leading-relaxed">
              {renderInline(item)}
            </li>
          ))}
        </ol>
      );
      continue;
    }

    // 7. Empty line
    if (!line.trim()) {
      i++;
      continue;
    }

    // 8. Standard paragraph
    elements.push(
      <p key={`p-${i}`} className={`my-4 text-slate-700 dark:text-slate-300 ${fontSizeClass}`}>
        {renderInline(line)}
      </p>
    );
    i++;
  }

  return <div className="article-body prose dark:prose-invert max-w-none">{elements}</div>;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-');
}

function renderInline(text: string): React.ReactNode {
  // Simple inline token replacement for **bold**, *italic*, `code`, and [link](url)
  const parts: React.ReactNode[] = [];
  const remaining = text;
  let keyIndex = 0;

  // Regex for bold, code, links
  const pattern = /(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g;
  let match: RegExpExecArray | null;
  let lastIndex = 0;

  while ((match = pattern.exec(remaining)) !== null) {
    if (match.index > lastIndex) {
      parts.push(remaining.substring(lastIndex, match.index));
    }

    const token = match[0];
    if (token.startsWith('**') && token.endsWith('**')) {
      parts.push(
        <strong key={`b-${keyIndex++}`} className="font-semibold text-slate-900 dark:text-white">
          {token.slice(2, -2)}
        </strong>
      );
    } else if (token.startsWith('`') && token.endsWith('`')) {
      parts.push(
        <code
          key={`c-${keyIndex++}`}
          className="font-mono text-xs px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400 font-semibold"
        >
          {token.slice(1, -1)}
        </code>
      );
    } else if (token.startsWith('[') && token.includes('](')) {
      const textMatch = token.match(/\[([^\]]+)\]\(([^)]+)\)/);
      if (textMatch) {
        parts.push(
          <a
            key={`a-${keyIndex++}`}
            href={textMatch[2]}
            target={textMatch[2].startsWith('http') ? '_blank' : undefined}
            rel={textMatch[2].startsWith('http') ? 'noopener noreferrer' : undefined}
            className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
          >
            {textMatch[1]}
          </a>
        );
      }
    }

    lastIndex = match.index + token.length;
  }

  if (lastIndex < remaining.length) {
    parts.push(remaining.substring(lastIndex));
  }

  return parts.length > 0 ? parts : text;
}
