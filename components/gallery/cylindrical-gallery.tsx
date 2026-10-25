'use client';

/**
 * ThreeUI Community Cylindrical Gallery Component
 * Adapted for DevAtlas Curriculum & Architecture Visualizations
 *
 * Attribution:
 * Based on the ThreeUI Community Gallery template by Meng To (MIT License)
 * Repository: https://github.com/t8or/threeui-templates
 * Upgraded for modern Three.js r186, GSAP ScrollTrigger synchronization,
 * Lenis smooth-scroll binding, and DevAtlas editorial design tokens.
 */

import React, { useEffect, useRef, useState, useId } from 'react';
import * as THREE from 'three';
import { PathStep } from '@/types/content';
import './gallery.css';

export interface CylindricalGalleryProps {
  stages?: PathStep[];
  category?: string;
  activeStageIndex?: number;
  scrollProgress?: number; // 0 to 1 from parent ScrollTrigger
  speed?: number;
  scale?: number;
  opacity?: number;
  className?: string;
  onSelectStage?: (index: number) => void;
}

// DevAtlas Educational Stage Texture Generator
function createStageCanvasTexture(
  step: PathStep | undefined,
  index: number,
  totalStages: number,
  category = 'web-dev'
): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 320;
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    const fallbackCanvas = document.createElement('canvas');
    fallbackCanvas.width = 16;
    fallbackCanvas.height = 16;
    return new THREE.CanvasTexture(fallbackCanvas);
  }

  // Palette based on DevAtlas tokens
  const isAlt = index % 2 === 1;
  const bgColor = isAlt ? '#4D1938' : '#3B132B';
  const cardBorder = isAlt ? '#803366' : '#63284F';
  const accentColor = index % 4 === 0 ? '#F04B35' : index % 4 === 1 ? '#FF8A24' : index % 4 === 2 ? '#FF8190' : '#174B35';

  // Card Background with rounded corners
  ctx.fillStyle = bgColor;
  ctx.beginPath();
  ctx.roundRect(12, 12, 488, 296, 20);
  ctx.fill();

  // Border
  ctx.lineWidth = 3;
  ctx.strokeStyle = cardBorder;
  ctx.beginPath();
  ctx.roundRect(12, 12, 488, 296, 20);
  ctx.stroke();

  // Subtle interior grid lines
  ctx.strokeStyle = 'rgba(255, 245, 230, 0.05)';
  ctx.lineWidth = 1;
  for (let x = 32; x < 500; x += 40) {
    ctx.beginPath();
    ctx.moveTo(x, 20);
    ctx.lineTo(x, 300);
    ctx.stroke();
  }
  for (let y = 32; y < 300; y += 40) {
    ctx.beginPath();
    ctx.moveTo(20, y);
    ctx.lineTo(492, y);
    ctx.stroke();
  }

  // Header Pill (Stage Number)
  const stageNum = String((index % (totalStages || 5)) + 1).padStart(2, '0');
  ctx.fillStyle = accentColor;
  ctx.beginPath();
  ctx.roundRect(36, 36, 120, 32, 8);
  ctx.fill();

  ctx.fillStyle = '#FFF5E6';
  ctx.font = 'bold 15px "JetBrains Mono", monospace';
  ctx.fillText(`STAGE ${stageNum}`, 48, 58);

  // Category / Curriculum tag
  ctx.fillStyle = 'rgba(255, 245, 230, 0.7)';
  ctx.font = '12px "JetBrains Mono", monospace';
  ctx.fillText(category.toUpperCase().replace('-', ' '), 170, 57);

  // Stage Title
  const title = step?.title || `Architecture Stage ${stageNum}`;
  ctx.fillStyle = '#FFF5E6';
  ctx.font = 'bold 24px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';

  // Multi-line wrap for long titles
  const words = title.split(' ');
  let line = '';
  let y = 115;
  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' ';
    const metrics = ctx.measureText(testLine);
    if (metrics.width > 440 && n > 0) {
      ctx.fillText(line, 36, y);
      line = words[n] + ' ';
      y += 32;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, 36, y);

  // Concept Pills / Summary snippet
  const summary = step?.summary || 'Deep technical breakdown of foundational system architecture.';
  ctx.fillStyle = '#D8E9DA';
  ctx.font = '14px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
  ctx.fillText(summary.length > 55 ? `${summary.substring(0, 52)}...` : summary, 36, y + 42);

  // Architectural Schematic Graphic (Geometric Nodes & Edges)
  const nodeY = 240;
  ctx.strokeStyle = 'rgba(255, 245, 230, 0.4)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(70, nodeY);
  ctx.lineTo(170, nodeY);
  ctx.lineTo(270, nodeY - 15);
  ctx.lineTo(370, nodeY + 15);
  ctx.lineTo(440, nodeY);
  ctx.stroke();

  // Nodes
  [70, 170, 270, 370, 440].forEach((nx, i) => {
    ctx.fillStyle = i === (index % 5) ? '#FF8A24' : '#FFF5E6';
    ctx.beginPath();
    ctx.arc(nx, i === 2 ? nodeY - 15 : i === 3 ? nodeY + 15 : nodeY, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#4D1938';
    ctx.lineWidth = 2;
    ctx.stroke();
  });

  // Footer Duration / Status indicator
  ctx.fillStyle = '#FF8190';
  ctx.font = 'bold 12px "JetBrains Mono", monospace';
  ctx.fillText(`EST: ${step?.estimatedMinutes || 15} MINS &bull; VERIFIED`, 36, 285);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export function CylindricalGallery({
  stages = [],
  category = 'web-dev',
  activeStageIndex = 0,
  scrollProgress,
  scale = 1,
  opacity = 1,
  className = '',
  onSelectStage,
}: CylindricalGalleryProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [webglSupported, setWebglSupported] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const galleryRef = useRef<THREE.Group | null>(null);
  const targetRotationYRef = useRef<number>(0);
  const targetPositionYRef = useRef<number>(0);
  const currentRotationYRef = useRef<number>(0);
  const currentPositionYRef = useRef<number>(0);
  const animationFrameRef = useRef<number | null>(null);

  const totalStages = Math.max(stages.length, 5);

  // Check WebGL support & reduced motion on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      const testCanvas = document.createElement('canvas');
      const gl = testCanvas.getContext('webgl2') || testCanvas.getContext('webgl');
      if (!gl) {
        setWebglSupported(false);
      }
    } catch {
      setWebglSupported(false);
    }

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(motionQuery.matches);

    const onMotionChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    motionQuery.addEventListener('change', onMotionChange);
    return () => motionQuery.removeEventListener('change', onMotionChange);
  }, []);

  // Update target rotation based on scrollProgress or activeStageIndex
  useEffect(() => {
    // 16 panels arranged around the cylinder.
    // Each panel is positioned at: rotation.y = (index / 16) * Math.PI * 4
    // and position.y = (index - 8) * 2.4
    // To align panel i with camera (at z=18, looking at origin):
    let targetIndex = activeStageIndex % 16;

    if (typeof scrollProgress === 'number' && !isNaN(scrollProgress)) {
      targetIndex = scrollProgress * (totalStages - 1);
    }

    // Align panel with camera center
    targetRotationYRef.current = -(targetIndex / 16) * (Math.PI * 4);
    targetPositionYRef.current = -(targetIndex - 8) * 2.4;
  }, [activeStageIndex, scrollProgress, totalStages]);

  // Main Three.js Scene Setup (adapted from ThreeUI Community Gallery)
  useEffect(() => {
    if (!webglSupported || reducedMotion) return undefined;

    const host = hostRef.current;
    const canvas = canvasRef.current;
    if (!host || !canvas) return undefined;

    let renderer: THREE.WebGLRenderer | null = null;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      });
      renderer.setClearColor(0x000000, 0);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
    } catch {
      setWebglSupported(false);
      return undefined;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 100);
    camera.position.z = 18;

    const gallery = new THREE.Group();
    scene.add(gallery);
    galleryRef.current = gallery;

    // Cylinder Geometry with 16 curved panels (ThreeUI standard specification)
    // Cylinder: radius 5, height 1.8, arc of 72 degrees (Math.PI * 0.4)
    const geometry = new THREE.CylinderGeometry(5, 5, 1.8, 64, 1, true, 0, Math.PI * 0.4);

    let disposed = false;
    let hostVisible = true;
    let documentVisible = !document.hidden;

    // Generate educational stage textures for all 16 panels
    const textures: THREE.CanvasTexture[] = [];
    const materials: THREE.MeshBasicMaterial[] = [];
    const panels: THREE.Mesh[] = [];

    for (let i = 0; i < 16; i++) {
      const stageItem = stages[i % totalStages];
      const texture = createStageCanvasTexture(stageItem, i, totalStages, category);
      textures.push(texture);

      const material = new THREE.MeshBasicMaterial({
        map: texture,
        opacity: 0.94,
        side: THREE.DoubleSide,
        toneMapped: false,
        transparent: true,
      });
      materials.push(material);

      const panel = new THREE.Mesh(geometry, material);
      panel.position.y = (i - 8) * 2.4;
      panel.rotation.y = (i / 16) * Math.PI * 4;
      panel.userData = { stageIndex: i % totalStages };
      gallery.add(panel);
      panels.push(panel);
    }

    // Set initial position
    gallery.rotation.y = targetRotationYRef.current;
    gallery.position.y = targetPositionYRef.current;
    currentRotationYRef.current = targetRotationYRef.current;
    currentPositionYRef.current = targetPositionYRef.current;

    // Animation & Smooth Scroll Lerp Loop
    const render = () => {
      // Smooth lerp toward target rotation and position
      const lerpFactor = 0.085;
      currentRotationYRef.current += (targetRotationYRef.current - currentRotationYRef.current) * lerpFactor;
      currentPositionYRef.current += (targetPositionYRef.current - currentPositionYRef.current) * lerpFactor;

      gallery.rotation.y = currentRotationYRef.current;
      gallery.position.y = currentPositionYRef.current;
      gallery.scale.setScalar(scale);

      renderer?.render(scene, camera);
    };

    const tick = () => {
      if (disposed || !hostVisible || !documentVisible) {
        animationFrameRef.current = null;
        return;
      }
      render();
      animationFrameRef.current = window.requestAnimationFrame(tick);
    };

    const start = () => {
      if (!animationFrameRef.current && hostVisible && documentVisible) {
        animationFrameRef.current = window.requestAnimationFrame(tick);
      }
    };

    const stop = () => {
      if (animationFrameRef.current) {
        window.cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };

    const resize = () => {
      if (!host || !renderer) return;
      const bounds = host.getBoundingClientRect();
      const width = Math.max(1, Math.round(bounds.width));
      const height = Math.max(1, Math.round(bounds.height));
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      render();
    };

    const resizeObserver = new ResizeObserver(resize);
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      hostVisible = entry?.isIntersecting ?? true;
      if (hostVisible) start();
      else stop();
    });

    const handleVisibility = () => {
      documentVisible = !document.hidden;
      if (documentVisible) start();
      else stop();
    };

    resizeObserver.observe(host);
    intersectionObserver.observe(host);
    document.addEventListener('visibilitychange', handleVisibility);

    resize();
    start();

    // Clean up WebGL resources
    return () => {
      disposed = true;
      stop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener('visibilitychange', handleVisibility);

      gallery.clear();
      geometry.dispose();
      materials.forEach((m) => m.dispose());
      textures.forEach((t) => t.dispose());
      renderer?.dispose();
    };
  }, [category, reducedMotion, scale, stages, totalStages, webglSupported]);

  // If WebGL is unsupported or reduced-motion is requested, provide accessible CSS-based fallback
  if (!webglSupported || reducedMotion) {
    const currentStep = stages[activeStageIndex % totalStages];

    return (
      <div
        ref={hostRef}
        className={`threeui-background gallery ${className}`}
        role="region"
        aria-label="Cylindrical Stage Visualizer"
      >
        <div className="gallery__css-fallback p-6">
          <div className="gallery__css-cylinder">
            <div className="gallery__css-panel">
              <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-[#FF8A24] bg-[#4D1938] px-2.5 py-1 rounded-md mb-2 border border-[#803366]">
                STAGE 0{((activeStageIndex % totalStages) + 1)} ARCHITECTURE
              </span>
              <h4 className="text-base font-bold text-[#FFF5E6] mb-1 line-clamp-2">
                {currentStep?.title || 'Interactive Architecture Stage'}
              </h4>
              <p className="text-xs text-[#D8E9DA] line-clamp-3">
                {currentStep?.summary || 'Scroll down to advance through the engineering roadmap.'}
              </p>
              <div className="mt-3 flex items-center gap-1.5 text-[11px] font-mono text-[#FF8190]">
                <span>{currentStep?.estimatedMinutes || 15} MINS &bull; ACCESSIBLE VIEW</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={hostRef}
      className={`threeui-background gallery ${className}`}
      data-slot="threeui-cylindrical-gallery"
      role="region"
      aria-label="ThreeUI 3D Cylindrical Learning Stage Visualizer"
      style={{ opacity }}
    >
      <canvas
        ref={canvasRef}
        className="gallery__canvas"
        aria-hidden="true"
      />
    </div>
  );
}
