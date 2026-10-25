'use client';

import { useState } from 'react';
import Image, { ImageProps } from 'next/image';
import { Layers, Terminal, Cpu, Globe } from 'lucide-react';

interface SafeImageProps extends Omit<ImageProps, 'onError'> {
  fallbackCategory?: 'web-dev' | 'ai-ml' | 'computer-science' | 'engineering-projects' | string;
  fallbackTitle?: string;
  containerClassName?: string;
}

export function SafeImage({
  src,
  alt,
  fallbackCategory = 'web-dev',
  fallbackTitle,
  className = '',
  containerClassName = '',
  fill,
  width,
  height,
  priority,
  sizes,
  ...rest
}: SafeImageProps) {
  const [hasError, setHasError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const getCategoryIcon = () => {
    switch (fallbackCategory) {
      case 'ai-ml':
        return <Cpu className="w-8 h-8 text-purple-400" aria-hidden="true" />;
      case 'computer-science':
        return <Terminal className="w-8 h-8 text-emerald-400" aria-hidden="true" />;
      case 'engineering-projects':
        return <Layers className="w-8 h-8 text-orange-400 dark:text-purple-400" aria-hidden="true" />;
      case 'web-dev':
      default:
        return <Globe className="w-8 h-8 text-emerald-500 dark:text-emerald-400" aria-hidden="true" />;
    }
  };

  const getCategoryGradient = () => {
    switch (fallbackCategory) {
      case 'ai-ml':
        return 'from-[#63284F] via-[#4D1938] to-[#3b1532] border-[#803366]';
      case 'computer-science':
        return 'from-[#174B35] via-[#103d24] to-[#0c2f1b] border-[#416C53]';
      case 'engineering-projects':
        return 'from-[#F04B35] via-[#d63a25] to-[#8f2817] border-[#E7B4A0]';
      case 'web-dev':
      default:
        return 'from-[#174B35] via-[#224936] to-[#103d24] border-[#416C53]';
    }
  };

  if (hasError || !src) {
    return (
      <div
        className={`relative w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br ${getCategoryGradient()} border rounded-xl overflow-hidden select-none ${containerClassName}`}
        role="img"
        aria-label={alt}
      >
        {/* Subtle background tech grid */}
        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.4) 1px, transparent 0)',
            backgroundSize: '16px 16px',
          }}
        />
        <div className="relative z-10 flex flex-col items-center gap-2">
          <div className="p-2.5 rounded-xl bg-[#174B35] border border-[#416C53] shadow-inner">
            {getCategoryIcon()}
          </div>
          {fallbackTitle && (
            <span className="text-xs font-mono font-semibold text-slate-200 tracking-wide line-clamp-1 max-w-[85%]">
              {fallbackTitle}
            </span>
          )}
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
            Architecture Blueprint
          </span>
        </div>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      width={width}
      height={height}
      priority={priority}
      sizes={sizes}
      unoptimized={true} // Bypasses /_next/image 400 Bad Request on SVG/local assets
      onLoad={() => setLoaded(true)}
      onError={() => setHasError(true)}
      className={`${className} transition-opacity duration-300 ${
        loaded ? 'opacity-100' : 'opacity-90'
      }`}
      {...rest}
    />
  );
}
