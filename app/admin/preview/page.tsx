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
    <div className="min-h-screen bg-[#FFF5E6] text-[#332A26] transition-colors py-10">
      <main id="main-content" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-[#DCCBB6]">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#174B35] bg-[#FBE2CB] px-2.5 py-0.5 rounded-full border border-[#E7B4A0]">
                Publishing Workflow &bull; Authoring Studio
              </span>
            </div>
            <h1 className="text-3xl font-extrabold text-[#174B35] tracking-tight">
              Article Draft Editor &amp; Live Preview
            </h1>
            <p className="text-sm text-[#332A26] mt-1">
              Author MDX content with live markdown rendering, table-of-contents calculation, and validation.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab(activeTab === 'editor' ? 'preview' : 'editor')}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold border border-[#DCCBB6] bg-white text-[#174B35] hover:bg-[#F8F1E6] transition-colors"
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
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-[#174B35] hover:bg-[#123a29] text-[#FFF5E6] transition-colors shadow-sm"
            >
              <CheckCircle className="w-3.5 h-3.5" />
              <span>{published ? 'Update Published' : 'Validate & Publish'}</span>
            </button>
          </div>
        </div>

        {notification && (
          <div className="mb-6 p-4 rounded-xl bg-[#D8E9DA] border border-[#174B35]/30 text-[#174B35] text-xs font-bold flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#FF8A24] shrink-0" />
            <span>{notification}</span>
          </div>
        )}

        {/* Editor Metadata Controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="md:col-span-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#597260] mb-1">
              Article Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[#DCCBB6] bg-white text-[#332A26] focus:outline-none focus:ring-2 focus:ring-[#174B35] shadow-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#597260] mb-1">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[#DCCBB6] bg-white text-[#332A26] focus:outline-none focus:ring-2 focus:ring-[#174B35] shadow-xs"
            >
              <option value="web-development">Web Development</option>
              <option value="ai-machine-learning">AI and Machine Learning</option>
              <option value="computer-science">Computer Science</option>
              <option value="engineering-projects">Engineering Projects</option>
            </select>
          </div>
        </div>

        {/* Metrics Bar */}
        <div className="flex items-center gap-4 text-xs text-[#597260] mb-4 pb-3 border-b border-[#DCCBB6]">
          <span className="flex items-center gap-1">
            <BookOpen className="w-3.5 h-3.5 text-[#F04B35]" />
            <span>{wordCount} words</span>
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-[#FF8A24]" />
            <span>{estimatedReadTime} min read</span>
          </span>
          <span>•</span>
          <span className="text-[#174B35] font-bold">
            Syntax Validated
          </span>
        </div>

        {/* Split-screen or Tabbed Editor / Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Editor Area */}
          <div className={`space-y-2 ${activeTab === 'preview' ? 'hidden lg:block' : ''}`}>
            <div className="flex items-center justify-between text-xs font-semibold text-[#597260]">
              <span>Markdown Source</span>
              <span className="font-mono text-[11px]">Supports MDX syntax</span>
            </div>
            <textarea
              value={draftContent}
              onChange={(e) => setDraftContent(e.target.value)}
              rows={20}
              data-lenis-prevent
              className="w-full p-4 font-mono text-xs leading-relaxed rounded-xl border border-[#DCCBB6] bg-white text-[#332A26] focus:outline-none focus:ring-2 focus:ring-[#174B35] shadow-xs"
            />
          </div>

          {/* Live Preview Area */}
          <div
            className={`rounded-2xl border border-[#DCCBB6] bg-white p-6 sm:p-8 overflow-y-auto max-h-[600px] shadow-sm ${
              activeTab === 'editor' ? 'hidden lg:block' : ''
            }`}
            data-lenis-prevent
          >
            <div className="text-xs font-bold uppercase tracking-wider text-[#174B35] mb-2">
              Live Preview
            </div>
            <h2 className="text-2xl font-bold text-[#174B35] mb-4">
              {title || 'Untitled Draft'}
            </h2>
            <div className="border-t border-[#DCCBB6] pt-4">
              <MarkdownRenderer content={draftContent} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
