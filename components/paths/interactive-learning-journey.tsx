'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { LearningPath, PathStep } from '@/types/content';
import { useLenis } from '@/components/providers/lenis-provider';
import { SafeImage } from '@/components/ui/safe-image';
import { CylindricalGallery } from '@/components/gallery/cylindrical-gallery';
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
  AlertTriangle,
  Code2,
  ExternalLink,
  Box,
  Compass,
} from 'lucide-react';

interface InteractiveLearningJourneyProps {
  path: LearningPath;
  onStepComplete?: (stepNumber: number) => void;
}

export function InteractiveLearningJourney({
  path,
}: InteractiveLearningJourneyProps) {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [viewMode, setViewMode] = useState<'3d-cylinder' | 'schematic'>('3d-cylinder');
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

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // 1. Overall scrollytelling progress tracking for 3D cylindrical rotation
      if (containerRef.current) {
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: 'top 75%',
          end: 'bottom 80%',
          onUpdate: (self) => {
            const p = Math.max(0, Math.min(1, self.progress));
            setScrollProgress(p);
          },
        });
      }

      const stepElements = containerRef.current?.querySelectorAll<HTMLElement>('.journey-step-block');
      if (!stepElements || stepElements.length === 0) return;

      stepElements.forEach((stepEl, index) => {
        // Active step tracking (bidirectional)
        ScrollTrigger.create({
          trigger: stepEl,
          start: 'top 75%',
          end: 'bottom 25%',
          onEnter: () => setActiveStepIndex(index),
          onEnterBack: () => setActiveStepIndex(index),
        });

        // Entrance animation for each stage card
        gsap.fromTo(
          stepEl,
          { 
            opacity: 0, 
            y: 50,
            scale: 0.97,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: stepEl,
              start: 'top 90%',
              once: true,
            },
          }
        );
      });

      // Animate the pinned visual panel card entrance (on inner card to avoid breaking sticky positioning)
      const pinnedCard = containerRef.current?.querySelector('.journey-pinned-card');
      if (pinnedCard) {
        gsap.fromTo(
          pinnedCard,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 85%',
              once: true,
            },
          }
        );
      }

      // Animate the overview progress card
      const overviewCard = containerRef.current?.querySelector('.mb-8');
      if (overviewCard) {
        gsap.fromTo(
          overviewCard,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: overviewCard,
              start: 'top 90%',
              once: true,
            },
          }
        );
      }
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
      <div className="mb-8 p-4 sm:p-6 rounded-2xl border border-[#DCCBB6] bg-[#FFF5E6] shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-[#174B35] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#FF8A24]" />
                <span>Interactive Learning Journey</span>
              </span>
              {isAllCompleted && (
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#F04B35] bg-[#FFF5E6] px-2.5 py-0.5 rounded-full border border-[#F04B35]/40">
                  <Trophy className="w-3 h-3 text-[#FF8A24]" />
                  Path Mastered
                </span>
              )}
            </div>
            <p className="text-sm text-[#332A26]">
              Active Stage {activeStepIndex + 1} of {totalSteps}:{' '}
              <strong className="text-[#174B35] font-bold">
                {currentStep.title}
              </strong>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-xs font-mono text-[#597260] font-semibold">
              {completedSteps.length}/{totalSteps} Completed
            </div>
            <div className="w-28 sm:w-36 h-2.5 bg-white rounded-full overflow-hidden border border-[#DCCBB6]">
              <div
                className="h-full bg-gradient-to-r from-[#174B35] via-[#FF8A24] to-[#F04B35] transition-all duration-300 ease-out"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="text-xs font-bold text-[#174B35] min-w-[36px]">
              {progressPercent}% Complete
            </span>
          </div>
        </div>

        {/* Desktop Stage Switcher Pills */}
        <div className="hidden lg:flex items-center gap-2 mt-4 pt-4 border-t border-[#DCCBB6] overflow-x-auto pb-1">
          {path.steps.map((st, idx) => {
            const isActive = idx === activeStepIndex;
            const isCompleted = completedSteps.includes(st.stepNumber);

            return (
              <button
                key={st.stepNumber}
                onClick={() => scrollToStage(idx)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-[#174B35] text-[#FFF5E6] shadow-xs'
                    : isCompleted
                    ? 'bg-[#D8E9DA] text-[#174B35] hover:bg-[#c5dec8]'
                    : 'bg-white text-[#332A26] border border-[#DCCBB6] hover:bg-[#F8F1E6]'
                }`}
                aria-current={isActive ? 'step' : undefined}
                aria-label={`Jump to stage ${st.stepNumber}: ${st.title}`}
              >
                <span>Stage 0{st.stepNumber}</span>
                {isCompleted && <CheckCircle2 className="w-3.5 h-3.5 text-[#174B35] shrink-0" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Responsive Grid: Pinned Visual Showcase on Left, Scrolling Stages on Right (Velora UI Pattern) */}
      <div
        data-slot="sticky-scroll"
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative"
      >
        {/* PINNED VISUAL PANEL (Desktop Sticky, Deep Plum #63284F background, #FFF5E6 text) */}
        <div className="lg:col-span-5 lg:sticky lg:top-24 z-10 space-y-4">
          <div className="journey-pinned-card card-morph rounded-2xl border border-[#803366] bg-[#63284F] text-[#FFF5E6] p-5 sm:p-6 shadow-xl overflow-hidden relative">
            {/* Visual stage header with 3D/2D View Mode Selector */}
            <div className="flex items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[11px] font-mono uppercase tracking-wider font-bold text-[#FFF5E6] bg-[#4D1938] px-2.5 py-1 rounded-md border border-[#803366]">
                  STAGE 0{currentStep.stepNumber} ARCHITECTURE
                </span>
                {currentStep.tier && (
                  <span className="text-[10px] font-mono uppercase tracking-wider font-bold px-2 py-0.5 rounded bg-[#4D1938] text-[#FF8190] border border-[#803366]">
                    {currentStep.tier}
                  </span>
                )}
              </div>

              {/* View Mode Switcher: 3D Cylinder (ThreeUI) vs 2D Schematic */}
              <div className="flex items-center bg-[#4D1938] p-0.5 rounded-lg border border-[#803366]">
                <button
                  type="button"
                  onClick={() => setViewMode('3d-cylinder')}
                  className={`flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold transition-all ${
                    viewMode === '3d-cylinder'
                      ? 'bg-[#F04B35] text-white shadow-xs'
                      : 'text-[#FFF5E6]/70 hover:text-[#FFF5E6]'
                  }`}
                  aria-pressed={viewMode === '3d-cylinder'}
                  aria-label="Switch to ThreeUI 3D Cylindrical Gallery"
                >
                  <Box className="w-3 h-3" />
                  <span>3D</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('schematic')}
                  className={`flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold transition-all ${
                    viewMode === 'schematic'
                      ? 'bg-[#F04B35] text-white shadow-xs'
                      : 'text-[#FFF5E6]/70 hover:text-[#FFF5E6]'
                  }`}
                  aria-pressed={viewMode === 'schematic'}
                  aria-label="Switch to 2D Architecture Schematic"
                >
                  <Compass className="w-3 h-3" />
                  <span>2D</span>
                </button>
              </div>
            </div>

            {/* Pinned visual display: ThreeUI Cylindrical Gallery and 2D Diagram */}
            <div className="image-morph-container relative aspect-[16/11] rounded-xl overflow-hidden bg-[#4D1938] border border-[#803366] flex items-center justify-center group mb-4">
              {/* Architecture Diagram Layer (Preserved for accessibility, SEO & 2D inspection) */}
              {path.steps.map((step, idx) => (
                <div
                  key={step.stepNumber}
                  className={`absolute inset-0 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] flex items-center justify-center p-2 ${
                    viewMode === 'schematic'
                      ? idx === activeStepIndex
                        ? 'opacity-100 scale-100 pointer-events-auto z-10'
                        : 'opacity-0 scale-95 pointer-events-none'
                      : idx === activeStepIndex
                      ? 'opacity-40 scale-95 pointer-events-none z-0'
                      : 'opacity-0 pointer-events-none'
                  }`}
                >
                  {step.image ? (
                    <SafeImage
                      src={step.image}
                      alt={step.visualDescription || step.title}
                      fallbackCategory={path.category}
                      fallbackTitle={step.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 420px"
                      className="image-morph-target object-contain p-1"
                      priority={idx === 0}
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-center p-6 space-y-2">
                      <Layers className="w-12 h-12 text-[#FF8190]" />
                      <p className="text-xs text-[#FFF5E6] font-mono">{step.title}</p>
                    </div>
                  )}
                </div>
              ))}

              {/* ThreeUI 3D Cylindrical Gallery Canvas Layer */}
              {viewMode === '3d-cylinder' && (
                <div className="absolute inset-0 z-10">
                  <CylindricalGallery
                    stages={path.steps}
                    category={path.category}
                    activeStageIndex={activeStepIndex}
                    scrollProgress={scrollProgress}
                    className="w-full h-full"
                  />
                  <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-md bg-[#3B132B]/90 border border-[#803366] text-[10px] font-mono text-[#FF8190] pointer-events-none shadow-xs">
                    ThreeUI 3D Cylinder &bull; Scroll-Driven
                  </div>
                </div>
              )}
            </div>

            {/* Visual Caption & Dynamic Explainer */}
            <div className="space-y-3">
              <h4 className="text-base font-bold text-[#FFF5E6] transition-all">
                {currentStep.title}
              </h4>
              <p className="text-xs text-[#FFF5E6]/90 leading-relaxed min-h-[40px]">
                {currentStep.visualDescription || currentStep.summary}
              </p>

              {/* Direct Recommended External Resource for Active Stage */}
              {currentStep.resources && currentStep.resources.length > 0 && (
                <div className="pt-3 border-t border-[#803366]">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#FF8190] block mb-1.5">
                    Recommended Learning Material:
                  </span>
                  <a
                    href={currentStep.resources[0].url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-2.5 rounded-xl border border-[#803366] bg-[#4D1938] hover:bg-[#3b1532] transition-colors group"
                  >
                    <div className="min-w-0 pr-2">
                      <span className="text-[10px] font-mono text-[#FF8A24] font-bold block">
                        {currentStep.resources[0].source} &bull; {currentStep.resources[0].type}
                      </span>
                      <span className="text-xs font-bold text-[#FFF5E6] line-clamp-1 group-hover:text-[#FF8190]">
                        {currentStep.resources[0].title}
                      </span>
                    </div>
                    <ExternalLink className="w-4 h-4 text-[#FF8A24] shrink-0" />
                  </a>
                </div>
              )}

              {/* Key Concept Badges */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {currentStep.keyConcepts.map((concept) => (
                  <span
                    key={concept}
                    className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#4D1938] text-[#FFF5E6] border border-[#803366]"
                  >
                    {concept}
                  </span>
                ))}
              </div>

              {/* Direct Read Guide CTA */}
              <div className="pt-3 border-t border-[#803366] flex items-center justify-between">
                <Link
                  href={`/articles/${currentStep.articleSlug}`}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-[#F04B35] hover:bg-[#d63a25] text-white transition-colors shadow-xs"
                >
                  <span>Explore Stage {currentStep.stepNumber} Guide</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* SCROLLING STAGES COLUMN (White #FFFFFF cards with #DCCBB6 borders) */}
        <div className="lg:col-span-7 space-y-6">
          {path.steps.map((step, idx) => {
            const isActive = idx === activeStepIndex;
            const isCompleted = completedSteps.includes(step.stepNumber);

            return (
              <div
                key={step.stepNumber}
                id={`stage-${path.slug}-${step.stepNumber}`}
                data-sticky-step={idx}
                className={`journey-step-block card-morph relative rounded-2xl border p-6 sm:p-7 transition-all duration-300 bg-[#FFF8EE] ${
                  isActive
                    ? 'border-[#F04B35] shadow-lg ring-2 ring-[#F04B35]/20'
                    : 'border-[#DFD0BE] opacity-95 hover:opacity-100 shadow-sm'
                }`}
              >
                {/* Stage Indicator Header */}
                <div className="flex items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <button
                      onClick={() => toggleStep(step.stepNumber)}
                      className={`w-7 h-7 rounded-full flex items-center justify-center transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#174B35] ${
                        isCompleted
                          ? 'bg-[#174B35] text-white shadow-xs'
                          : 'bg-[#FFF8EE] text-[#49372F] hover:text-[#174B35] border border-[#DFD0BE]'
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
                          ? 'text-[#F04B35]'
                          : 'text-[#795548]'
                      }`}
                    >
                      Stage 0{step.stepNumber}
                    </span>
                    <span className="text-[#DFD0BE]">&bull;</span>
                    <span className="text-xs text-[#795548] flex items-center gap-1 font-medium">
                      <Clock className="w-3 h-3 text-[#FF8A24]" />
                      {step.estimatedMinutes} min study
                    </span>

                    {step.tier && (
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#F2B8C6]/50 text-[#49372F] border border-[#DFD0BE]">
                        {step.tier}
                      </span>
                    )}
                  </div>

                  {isActive && (
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#FFF8EE] text-[#F04B35] border border-[#F04B35]/40 shrink-0">
                      Currently Viewing
                    </span>
                  )}
                </div>

                {/* Stage Heading */}
                <h3 className="text-lg sm:text-xl font-bold text-[#174B35] mb-2 leading-snug">
                  <Link
                    href={`/articles/${step.articleSlug}`}
                    className="hover:text-[#F04B35] transition-colors"
                  >
                    {step.title}
                  </Link>
                </h3>

                {/* Prerequisites if present */}
                {step.prerequisites && step.prerequisites.length > 0 && (
                  <div className="mb-3 flex items-center gap-1.5 flex-wrap text-xs">
                    <span className="text-[#795548] font-semibold text-[11px] uppercase tracking-wider">
                      Prerequisites:
                    </span>
                    {step.prerequisites.map((req, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#F5F0E8] text-[#49372F] border border-[#DFD0BE]"
                      >
                        {req}
                      </span>
                    ))}
                  </div>
                )}

                {/* Detailed Summary */}
                <p className="text-sm text-[#49372F] leading-relaxed mb-4">
                  {step.summary}
                </p>

                {/* Common Beginner Mistakes / Pitfalls */}
                {step.commonMistakes && step.commonMistakes.length > 0 && (
                  <div className="mb-4 p-3.5 rounded-xl bg-[#FFF8EE] border border-[#FF8A24]/40 text-xs">
                    <div className="flex items-center gap-1.5 font-bold text-[#F04B35] mb-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-[#FF8A24] shrink-0" />
                      <span>Beginner Pitfalls &amp; Common Mistakes:</span>
                    </div>
                    <ul className="space-y-1 text-[#49372F] text-[11px] list-disc list-inside">
                      {step.commonMistakes.map((mistake, i) => (
                        <li key={i}>{mistake}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Hands-on Practical Exercise */}
                {step.practicalExercise && (
                  <div className="mb-4 p-3.5 rounded-xl bg-[#D8E9DA]/50 border border-[#174B35]/20 text-xs">
                    <div className="flex items-center gap-1.5 font-bold text-[#174B35] mb-1">
                      <Code2 className="w-3.5 h-3.5 text-[#174B35] shrink-0" />
                      <span>Hands-on Practical Exercise:</span>
                    </div>
                    <p className="text-[#332A26] text-[11px] leading-relaxed">
                      {step.practicalExercise}
                    </p>
                  </div>
                )}

                {/* Open Educational Reference */}
                {step.externalReference && (
                  <div className="mb-4 flex items-center gap-2">
                    <a
                      href={step.externalReference.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#174B35] hover:text-[#F04B35] transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5 text-[#F04B35]" />
                      <span>{step.externalReference.source} Open Curriculum: &ldquo;{step.externalReference.title}&rdquo; &rarr;</span>
                    </a>
                  </div>
                )}

                {/* Curated External Learning Resources */}
                {step.resources && step.resources.length > 0 && (
                  <div className="my-5 p-4 rounded-xl border border-[#DFD0BE] bg-[#F5F0E8] space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#174B35] flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5 text-[#F04B35]" />
                        <span>Curated Learning Resources ({step.resources.length})</span>
                      </span>
                      {step.roadmapUrl && (
                        <a
                          href={step.roadmapUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[11px] font-bold text-[#174B35] hover:text-[#F04B35] transition-colors flex items-center gap-1 self-start sm:self-auto"
                        >
                          <span>roadmap.sh syllabus reference</span>
                          <ExternalLink className="w-3 h-3 text-[#F04B35]" />
                        </a>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {step.resources.map((res, i) => (
                        <div
                          key={i}
                          className="rounded-xl border border-[#DFD0BE] bg-[#FFF8EE] p-3.5 shadow-xs hover:border-[#E98898] transition-all flex flex-col justify-between"
                        >
                          <div>
                            <div className="flex items-center justify-between gap-1 mb-1.5">
                              <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-[#F2B8C6]/50 text-[#49372F] border border-[#DFD0BE]">
                                {res.source}
                              </span>
                              <span className="text-[10px] font-semibold text-[#795548]">
                                {res.type}
                              </span>
                            </div>
                            <h4 className="text-xs font-bold text-[#174B35] line-clamp-2 leading-snug">
                              {res.title}
                            </h4>
                          </div>

                          <div className="pt-2.5 mt-2.5 border-t border-[#DFD0BE] flex items-center justify-between">
                            <span className="text-[10px] font-bold text-[#174B35]">
                              {res.isFree !== false ? 'Free Access' : 'Course'}
                            </span>
                            <a
                              href={res.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold bg-[#F04B35] hover:bg-[#d63a25] text-white transition-colors shadow-xs"
                            >
                              <span>Open Resource</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Inline Mobile Image when on small screens */}
                {step.image && (
                  <div className="block lg:hidden my-4 relative aspect-[16/10] rounded-xl overflow-hidden bg-[#4D1938] border border-[#803366]">
                    <SafeImage
                      src={step.image}
                      alt={step.visualDescription || step.title}
                      fallbackCategory={path.category}
                      fallbackTitle={step.title}
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
                      className="text-[11px] font-mono px-2.5 py-0.5 rounded bg-[#9DD8EB]/30 text-[#49372F] border border-[#DFD0BE]"
                    >
                      {concept}
                    </span>
                  ))}
                </div>

                {/* Action Controls */}
                <div className="pt-4 border-t border-[#DFD0BE] flex items-center justify-between gap-4">
                  <Link
                    href={`/articles/${step.articleSlug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#174B35] hover:text-[#F04B35] transition-colors"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-[#F04B35]" />
                    <span>Read Full Guide: &ldquo;{step.articleTitle}&rdquo;</span>
                  </Link>

                  <button
                    onClick={() => toggleStep(step.stepNumber)}
                    className={`text-xs font-semibold px-3 py-1.5 rounded-lg border transition-colors ${
                      isCompleted
                        ? 'border-[#174B35] text-[#174B35] bg-[#D8E9DA]'
                        : 'border-[#DFD0BE] text-[#49372F] hover:border-[#174B35] bg-[#FFF8EE]'
                    }`}
                  >
                    {isCompleted ? 'Completed ✓' : 'Mark Complete'}
                  </button>
                </div>
              </div>
            );
          })}

          {/* Journey Conclusion Card */}
          <div className="p-6 sm:p-8 rounded-2xl border border-[#DFD0BE] bg-[#FFF8EE] text-center space-y-4 shadow-sm">
            <div className="w-12 h-12 mx-auto rounded-full bg-[#F2B8C6]/40 text-[#49372F] flex items-center justify-center border border-[#DFD0BE]">
              <Trophy className="w-6 h-6 text-[#FF8A24]" />
            </div>
            <h3 className="text-xl font-bold text-[#174B35]">
              Ready to Solidify Your Knowledge?
            </h3>
            <p className="text-xs sm:text-sm text-[#49372F] max-w-lg mx-auto leading-relaxed font-normal">
              You have explored all 5 core stages of this curriculum. Test your understanding by diving into the linked code repositories and implementing production benchmarks.
            </p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <Link
                href="/explore"
                className="px-5 py-2.5 rounded-xl text-xs font-bold bg-[#174B35] hover:bg-[#123a29] text-[#FFF8EE] transition-colors shadow-sm"
              >
                Browse All Deep Dives
              </Link>
              <Link
                href={`/paths/${path.slug}`}
                className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-[#FFF8EE] text-[#174B35] border border-[#DFD0BE] hover:bg-[#F5F0E8] transition-colors"
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
