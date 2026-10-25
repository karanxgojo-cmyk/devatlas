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
      <div className="rounded-2xl border border-[#DCCBB6] bg-[#FFF5E6] p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-[#174B35]">
                Learning Progress
              </span>
              {isAllCompleted && (
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#174B35] bg-[#D8E9DA] px-2.5 py-0.5 rounded-full border border-[#174B35]/30">
                  <Trophy className="w-3 h-3 text-[#FF8A24]" />
                  Path Completed!
                </span>
              )}
            </div>
            <p className="text-sm text-[#332A26]">
              {completedCount} of {totalSteps} modules completed ({progressPercent}%)
            </p>
          </div>

          <div className="text-sm font-bold text-[#174B35] bg-white px-3.5 py-1.5 rounded-xl border border-[#DCCBB6] shadow-xs">
            {progressPercent}% Complete
          </div>
        </div>

        {/* Dynamic Progress Bar */}
        <div className="w-full h-3 bg-white rounded-full overflow-hidden border border-[#DCCBB6]">
          <div
            className="h-full bg-gradient-to-r from-[#174B35] via-[#FF8A24] to-[#F04B35] transition-all duration-300 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Sequential Modules List */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-[#174B35]">
          Curated Learning Modules
        </h2>

        <div className="relative border-l-2 border-[#DCCBB6] ml-4 pl-6 space-y-6">
          {path.steps.map((step) => {
            const isCompleted = completedSteps.includes(step.stepNumber);

            return (
              <div
                key={step.stepNumber}
                className={`relative rounded-2xl border p-5 transition-all duration-200 ${
                  isCompleted
                    ? 'border-[#174B35] bg-[#D8E9DA]/40 shadow-xs'
                    : 'border-[#DCCBB6] bg-white hover:border-[#174B35] shadow-xs'
                }`}
              >
                {/* Step indicator node on vertical timeline */}
                <button
                  onClick={() => toggleStep(step.stepNumber)}
                  className={`absolute -left-[37px] top-5 w-6 h-6 rounded-full flex items-center justify-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#174B35] ${
                    isCompleted
                      ? 'bg-[#174B35] text-white shadow-xs'
                      : 'bg-[#FFF5E6] text-[#597260] border-2 border-[#DCCBB6] hover:border-[#174B35]'
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
                      <span className="text-xs font-bold text-[#174B35] uppercase tracking-wider">
                        Step {step.stepNumber}
                      </span>
                      <span className="text-[#DCCBB6]">•</span>
                      <span className="text-xs text-[#597260] flex items-center gap-1 font-medium">
                        <Clock className="w-3 h-3 text-[#FF8A24]" />
                        {step.estimatedMinutes} min
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-[#174B35] mb-1">
                      {step.title}
                    </h3>

                    <p className="text-sm text-[#332A26] mb-3 leading-relaxed">
                      {step.summary}
                    </p>

                    <div className="flex flex-wrap gap-1.5">
                      {step.keyConcepts.map((concept) => (
                        <span
                          key={concept}
                          className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#FFF5E6] text-[#332A26] border border-[#DCCBB6]"
                        >
                          {concept}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center gap-3">
                    <Link
                      href={`/articles/${step.articleSlug}`}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-[#174B35] hover:bg-[#123a29] text-[#FFF5E6] transition-colors shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#174B35]"
                    >
                      <span>Study Guide</span>
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
