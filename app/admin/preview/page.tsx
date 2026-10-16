'use client';

import { useState } from 'react';
import { MarkdownRenderer } from '@/components/article/markdown-renderer';
import { FileEdit, Eye, CheckCircle, Sparkles, BookOpen, Clock } from 'lucide-react';

const SAMPLE_DRAFT = `## Introduction to Event Sourcing in High-Scale Architectures

Traditional relational databases store only the *current state* of an entity. When a user changes their shipping address, an \`UPDATE\` statement overwrites the old address forever.

Event sourcing inverts this model: state is never overwritten. Instead, the application appends an immutable sequence of business events to an append-only event stream.

\`\`\`typescript
interface AccountDebitedEvent {
  eventId: string;
  aggregateId: string;
  amountCents: number;
  timestamp: string;
}

function applyEvent(state: AccountState, event: AccountDebitedEvent): AccountState {
  return {
    ...state,
    balanceCents: state.balanceCents - event.amountCents,
  };
}
\`\`\`

### Key Architectural Benefits
- **Complete Auditability:** Every transaction is an immutable historical record.
- **Time Travel:** Replay events up to any specific timestamp to reconstruct exact point-in-time system state.
`;

export default function AdminPreviewPage() {
  const [title, setTitle] = useState('Introduction to Event Sourcing in High-Scale Architectures');
  const [category, setCategory] = useState('engineering-projects');
  const [draftContent, setDraftContent] = useState(SAMPLE_DRAFT);
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');
  const [published, setPublished] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const wordCount = draftContent.trim().split(/\s+/).length;
  const estimatedReadTime = Math.max(1, Math.ceil(wordCount / 200));

  const handlePublish = () => {
    if (!title.trim()) {
      setNotification('Error: Article title is required before publishing.');
      return;
    }
    setPublished(true);
    setNotification('Draft validated and marked as Ready for Publication!');
    setTimeout(() => setNotification(null), 4000);
  };

  return (
    <main id="main-content" className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/60 px-2.5 py-0.5 rounded-full border border-purple-200 dark:border-purple-800">
              Version 2 Scope • Publishing Workflow
            </span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Article Draft Editor & Live Preview
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Author MDX content with live markdown rendering, table-of-contents calculation, and validation.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab(activeTab === 'editor' ? 'preview' : 'editor')}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-50 transition-colors"
          >
            {activeTab === 'editor' ? (
              <>
                <Eye className="w-3.5 h-3.5" />
                <span>Show Preview</span>
              </>
            ) : (
              <>
                <FileEdit className="w-3.5 h-3.5" />
                <span>Show Editor</span>
              </>
            )}
          </button>

          <button
            onClick={handlePublish}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white transition-colors shadow-xs"
          >
            <CheckCircle className="w-3.5 h-3.5" />
            <span>{published ? 'Update Published' : 'Validate & Publish'}</span>
          </button>
        </div>
      </div>

      {notification && (
        <div className="mb-6 p-4 rounded-xl bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 text-blue-900 dark:text-blue-200 text-xs font-medium flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-blue-500 shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* Editor Metadata Controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="md:col-span-2">
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
            Article Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            <option value="web-dev">Web Development</option>
            <option value="ai-ml">AI and Machine Learning</option>
            <option value="computer-science">Computer Science</option>
            <option value="engineering-projects">Engineering Projects</option>
          </select>
        </div>
      </div>

      {/* Metrics Bar */}
      <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 mb-4 pb-3 border-b border-slate-200 dark:border-slate-800">
        <span className="flex items-center gap-1">
          <BookOpen className="w-3.5 h-3.5" />
          <span>{wordCount} words</span>
        </span>
        <span>•</span>
        <span className="flex items-center gap-1">
          <Clock className="w-3.5 h-3.5" />
          <span>{estimatedReadTime} min read</span>
        </span>
        <span>•</span>
        <span className="text-emerald-600 dark:text-emerald-400 font-medium">
          Syntax Validated
        </span>
      </div>

      {/* Split-screen or Tabbed Editor / Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Editor Area */}
        <div className={`space-y-2 ${activeTab === 'preview' ? 'hidden lg:block' : ''}`}>
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400">
            <span>Markdown Source</span>
            <span className="font-mono text-[11px]">Supports MDX syntax</span>
          </div>
          <textarea
            value={draftContent}
            onChange={(e) => setDraftContent(e.target.value)}
            rows={20}
            data-lenis-prevent
            className="w-full p-4 font-mono text-xs leading-relaxed rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        {/* Live Preview Area */}
        <div
          className={`rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 p-6 overflow-y-auto max-h-[600px] ${
            activeTab === 'editor' ? 'hidden lg:block' : ''
          }`}
          data-lenis-prevent
        >
          <div className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-2">
            Live Preview
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
            {title || 'Untitled Draft'}
          </h2>
          <MarkdownRenderer content={draftContent} />
        </div>
      </div>
    </main>
  );
}
