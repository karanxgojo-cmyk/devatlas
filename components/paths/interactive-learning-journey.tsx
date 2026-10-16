'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { LearningPath, PathStep } from '@/types/content';
import { useLenis } from '@/components/providers/lenis-provider';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  CheckCircle2,
  Circle,
  ArrowRight,
  Clock,
  Sparkles,
  Trophy,
  Layers,
  BookOpen,
} from 'lucide-react';

interface InteractiveLearningJourneyProps {
  path: LearningPath;
  onStepComplete?: (stepNumber: number) => void;
}

export function InteractiveLearningJourney({
  path,
}: InteractiveLearningJourneyProps) {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();
  const storageKey = `devatlas-path-progress-${path.slug}`;

  // Load saved progress from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        setCompletedSteps(JSON.parse(saved));
      }
    } catch {
      // Local storage fallback for restricted contexts
    }
  }, [storageKey]);

  const toggleStep = (stepNumber: number) => {
    const isDone = completedSteps.includes(stepNumber);
    const updated = isDone
      ? completedSteps.filter((s) => s !== stepNumber)
      : [...completedSteps, stepNumber];

    setCompletedSteps(updated);
    try {
      localStorage.setItem(storageKey, JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  // Synchronize ScrollTrigger with Lenis for bidirectional stage activation
  useEffect(() => {
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const stepElements = containerRef.current?.querySelectorAll<HTMLElement>('.journey-step-block');
      if (!stepElements || stepElements.length === 0) return;

      stepElements.forEach((stepEl, index) => {
        ScrollTrigger.create({
          trigger: stepEl,
          start: 'top 75%',
          end: 'bottom 25%',
          onEnter: () => setActiveStepIndex(index),
          onEnterBack: () => setActiveStepIndex(index),
        });
      });
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, [path.slug]);

  const scrollToStage = (index: number) => {
    setActiveStepIndex(index);
    const targetEl = document.getElementById(`stage-${path.slug}-${index + 1}`);
    if (targetEl) {
      if (lenis) {
        lenis.scrollTo(targetEl, {
          offset: -80,
          duration: 0.6,
          onComplete: () => setActiveStepIndex(index),
        });
      } else {
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const currentStep: PathStep = path.steps[activeStepIndex] || path.steps[0];
  const totalSteps = path.steps.length;
  const progressPercent = Math.round((completedSteps.length / totalSteps) * 100);
  const isAllCompleted = completedSteps.length === totalSteps && totalSteps > 0;

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Overview progress pill & Stage Tracker Header */}
      <div className="mb-8 p-4 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Interactive Learning Journey</span>
              </span>
              {isAllCompleted && (
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                  <Trophy className="w-3 h-3" />
                  Path Mastered
                </span>
              )}
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Active Stage {activeStepIndex + 1} of {totalSteps}:{' '}
              <strong className="text-slate-900 dark:text-white font-semibold">
                {currentStep.title}
              </strong>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-xs font-mono text-slate-500 dark:text-slate-400">
              {completedSteps.length}/{totalSteps} Completed
            </div>
            <div className="w-28 sm:w-36 h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden border border-slate-200 dark:border-slate-700">
              <div
                className="h-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 transition-all duration-300 ease-out"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200 min-w-[36px]">
              {progressPercent}% Complete
            </span>
          </div>
        </div>

        {/* Desktop Stage Switcher Pills */}
        <div className="hidden lg:flex items-center gap-2 mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 overflow-x-auto pb-1">
          {path.steps.map((st, idx) => {
            const isActive = idx === activeStepIndex;
            const isCompleted = completedSteps.includes(st.stepNumber);

            return (
              <button
                key={st.stepNumber}
                onClick={() => scrollToStage(idx)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-xs'
                    : isCompleted
                    ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-950/60'
                    : 'bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
                aria-current={isActive ? 'step' : undefined}
                aria-label={`Jump to stage ${st.stepNumber}: ${st.title}`}
              >
                <span>Stage 0{st.stepNumber}</span>
                {isCompleted && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Responsive Grid: Pinned Visual Showcase on Left, Scrolling Stages on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative">
        {/* PINNED VISUAL PANEL (Desktop Sticky, Mobile Responsive Top) */}
        <div className="lg:col-span-5 lg:sticky lg:top-24 z-10 space-y-4">
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 p-5 sm:p-6 shadow-md overflow-hidden relative">
            {/* Visual stage header */}
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="text-[11px] font-mono uppercase tracking-wider font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2.5 py-1 rounded-md border border-blue-200 dark:border-blue-800">
                STAGE 0{currentStep.stepNumber} ARCHITECTURE
              </span>
              <span className="text-xs text-slate-400 flex items-center gap-1 font-mono">
                <Clock className="w-3 h-3" />
                {currentStep.estimatedMinutes} mins
              </span>
            </div>

            {/* Pinned dynamic diagram container */}
            <div className="relative aspect-[16/11] rounded-xl overflow-hidden bg-slate-950 border border-slate-800 flex items-center justify-center group mb-4">
              {path.steps.map((step, idx) => (
                <div
                  key={step.stepNumber}
                  className={`absolute inset-0 transition-all duration-500 ease-out flex items-center justify-center p-2 ${
                    idx === activeStepIndex
                      ? 'opacity-100 scale-100 pointer-events-auto'
                      : 'opacity-0 scale-95 pointer-events-none'
                  }`}
                >
                  {step.image ? (
                    <Image
                      src={step.image}
                      alt={step.visualDescription || step.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 420px"
                      className="object-contain"
                      priority={idx === 0}
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-center p-6 space-y-2">
                      <Layers className="w-12 h-12 text-blue-500/80" />
                      <p className="text-xs text-slate-300 font-mono">{step.title}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Visual Caption & Dynamic Explainer */}
            <div className="space-y-2">
              <h4 className="text-base font-bold text-slate-900 dark:text-white transition-all">
                {currentStep.title}
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed min-h-[40px]">
                {currentStep.visualDescription || currentStep.summary}
              </p>

              {/* Key Concept Badges */}
              <div className="flex flex-wrap gap-1.5 pt-2">
                {currentStep.keyConcepts.map((concept) => (
                  <span
                    key={concept}
                    className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                  >
                    {concept}
                  </span>
                ))}
              </div>

              {/* Direct Read Guide CTA */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <Link
                  href={`/articles/${currentStep.articleSlug}`}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white transition-colors shadow-xs"
                >
                  <span>Explore Stage {currentStep.stepNumber} Guide</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* SCROLLING STAGES COLUMN */}
        <div className="lg:col-span-7 space-y-6">
          {path.steps.map((step, idx) => {
            const isActive = idx === activeStepIndex;
            const isCompleted = completedSteps.includes(step.stepNumber);

            return (
              <div
                key={step.stepNumber}
                id={`stage-${path.slug}-${step.stepNumber}`}
                className={`journey-step-block relative rounded-2xl border p-6 sm:p-7 transition-all duration-300 ${
                  isActive
                    ? 'border-blue-500/90 dark:border-blue-500/90 bg-white dark:bg-slate-900 shadow-lg ring-1 ring-blue-500/30'
                    : 'border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 opacity-80 hover:opacity-100'
                }`}
              >
                {/* Stage Indicator Header */}
                <div className="flex items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2.5">
                    <button
                      onClick={() => toggleStep(step.stepNumber)}
                      className={`w-7 h-7 rounded-full flex items-center justify-center transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 ${
                        isCompleted
                          ? 'bg-emerald-600 text-white shadow-xs'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-blue-500 border border-slate-300 dark:border-slate-700'
                      }`}
                      aria-label={
                        isCompleted
                          ? `Mark step ${step.stepNumber} as incomplete`
                          : `Mark step ${step.stepNumber} as complete`
                      }
                      aria-pressed={isCompleted}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="w-4 h-4 fill-current text-white" />
                      ) : (
                        <Circle className="w-3.5 h-3.5" />
                      )}
                    </button>

                    <span
                      className={`text-xs font-mono font-bold uppercase tracking-wider ${
                        isActive
                          ? 'text-blue-600 dark:text-blue-400'
                          : 'text-slate-500 dark:text-slate-400'
                      }`}
                    >
                      Stage 0{step.stepNumber}
                    </span>
                    <span className="text-slate-300 dark:text-slate-700">&bull;</span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {step.estimatedMinutes} min study
                    </span>
                  </div>

                  {isActive && (
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 animate-pulse">
                      Currently Viewing
                    </span>
                  )}
                </div>

                {/* Stage Heading */}
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-2 leading-snug">
                  <Link
                    href={`/articles/${step.articleSlug}`}
                    className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {step.title}
                  </Link>
                </h3>

                {/* Detailed Summary */}
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                  {step.summary}
                </p>

                {/* Inline Mobile Image when on small screens */}
                {step.image && (
                  <div className="block lg:hidden my-4 relative aspect-[16/10] rounded-xl overflow-hidden bg-slate-950 border border-slate-800">
                    <Image
                      src={step.image}
                      alt={step.visualDescription || step.title}
                      fill
                      sizes="100vw"
                      className="object-contain p-2"
                    />
                  </div>
                )}

                {/* Key Concepts Tags */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {step.keyConcepts.map((concept) => (
                    <span
                      key={concept}
                      className="text-[11px] font-mono px-2.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400"
                    >
                      {concept}
                    </span>
                  ))}
                </div>

                {/* Action Controls */}
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-4">
                  <Link
                    href={`/articles/${step.articleSlug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Read Full Guide: &ldquo;{step.articleTitle}&rdquo;</span>
                  </Link>

                  <button
                    onClick={() => toggleStep(step.stepNumber)}
                    className={`text-xs font-medium px-3 py-1.5 rounded-lg border transition-colors ${
                      isCompleted
                        ? 'border-emerald-300 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/30'
                        : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-blue-500'
                    }`}
                  >
                    {isCompleted ? 'Completed &check;' : 'Mark Complete'}
                  </button>
                </div>
              </div>
            );
          })}

          {/* Journey Conclusion Card */}
          <div className="p-6 sm:p-8 rounded-2xl border border-blue-200 dark:border-blue-900 bg-gradient-to-br from-blue-50/60 to-indigo-50/40 dark:from-blue-950/30 dark:to-slate-900/80 text-center space-y-4">
            <div className="w-12 h-12 mx-auto rounded-full bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Trophy className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Ready to Solidify Your Knowledge?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-lg mx-auto leading-relaxed">
              You have explored all 5 core stages of this curriculum. Test your understanding by diving into the linked code repositories and implementing production benchmarks.
            </p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <Link
                href="/explore"
                className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white transition-colors shadow-xs"
              >
                Browse All Deep Dives
              </Link>
              <Link
                href={`/paths/${path.slug}`}
                className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:border-blue-500 transition-colors"
              >
                Full Syllabus Page
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
