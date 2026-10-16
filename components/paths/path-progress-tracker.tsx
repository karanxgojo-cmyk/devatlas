'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { LearningPath } from '@/types/content';
import { CheckCircle2, Circle, ArrowRight, Clock, Trophy } from 'lucide-react';

interface PathProgressTrackerProps {
  path: LearningPath;
}

export function PathProgressTracker({ path }: PathProgressTrackerProps) {
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const storageKey = `devatlas-path-progress-${path.slug}`;

  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        setCompletedSteps(JSON.parse(saved));
      }
    } catch {
      // ignore
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

  const totalSteps = path.steps.length;
  const completedCount = completedSteps.length;
  const progressPercent = Math.round((completedCount / totalSteps) * 100);
  const isAllCompleted = completedCount === totalSteps;

  return (
    <div className="space-y-8">
      {/* Progress Header Card */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                Learning Progress
              </span>
              {isAllCompleted && (
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                  <Trophy className="w-3 h-3" />
                  Path Completed!
                </span>
              )}
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {completedCount} of {totalSteps} modules completed ({progressPercent}%)
            </p>
          </div>

          <div className="text-sm font-bold text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700">
            {progressPercent}% Complete
          </div>
        </div>

        {/* Dynamic Progress Bar */}
        <div className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 transition-all duration-300 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Sequential Modules List */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          Curated Learning Modules
        </h2>

        <div className="relative border-l-2 border-slate-200 dark:border-slate-800 ml-4 pl-6 space-y-6">
          {path.steps.map((step) => {
            const isCompleted = completedSteps.includes(step.stepNumber);

            return (
              <div
                key={step.stepNumber}
                className={`relative rounded-xl border p-5 transition-all duration-200 ${
                  isCompleted
                    ? 'border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/30 dark:bg-emerald-950/20'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                {/* Step indicator node on vertical timeline */}
                <button
                  onClick={() => toggleStep(step.stepNumber)}
                  className={`absolute -left-[37px] top-5 w-6 h-6 rounded-full flex items-center justify-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 ${
                    isCompleted
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-white dark:bg-slate-900 text-slate-400 border-2 border-slate-300 dark:border-slate-700 hover:border-blue-500'
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

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                        Step {step.stepNumber}
                      </span>
                      <span className="text-xs text-slate-400">•</span>
                      <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {step.estimatedMinutes} min
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
                      {step.title}
                    </h3>

                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                      {step.summary}
                    </p>

                    <div className="flex flex-wrap gap-1.5">
                      {step.keyConcepts.map((concept) => (
                        <span
                          key={concept}
                          className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                        >
                          {concept}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center gap-3">
                    <Link
                      href={`/articles/${step.articleSlug}`}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white transition-colors shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                    >
                      <span>Read Guide</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
