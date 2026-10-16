'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useTheme } from '@/components/providers/theme-provider';
import { useBookmarks } from '@/components/providers/bookmarks-provider';
import {
  Compass,
  Bookmark,
  Sun,
  Moon,
  Search,
  Menu,
  X,
  BookOpen,
  Route,
  LayoutDashboard,
} from 'lucide-react';

export function Header() {
  const pathname = usePathname();
  const { resolvedTheme, toggleTheme } = useTheme();
  const { bookmarkCount } = useBookmarks();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { href: '/explore', label: 'Explore', icon: Search },
    { href: '/topics/web-dev', label: 'Topics', icon: BookOpen },
    { href: '/paths/frontend-performance-essentials', label: 'Learning Paths', icon: Route },
    { href: '/bookmarks', label: 'Saved', icon: Bookmark, badge: bookmarkCount },
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  ];

  return (
    <header
      className={`sticky top-0 z-40 transition-colors duration-200 border-b ${
        scrolled
          ? 'bg-white/90 dark:bg-slate-950/90 backdrop-blur-md border-slate-200 dark:border-slate-800 shadow-xs'
          : 'bg-white dark:bg-slate-950 border-slate-200/80 dark:border-slate-800/80'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="flex items-center gap-2.5 text-slate-900 dark:text-white font-bold text-xl tracking-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-md py-1 px-1.5"
            aria-label="DevAtlas homepage"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-xs">
              <Compass className="w-5 h-5" aria-hidden="true" />
            </div>
            <span>DevAtlas</span>
            <span className="hidden sm:inline-block text-[11px] font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded-full border border-blue-200 dark:border-blue-800">
              Learn. Build. Share.
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1" aria-label="Main Navigation">
          {navLinks.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.href.startsWith('/topics') && pathname.startsWith('/topics')) ||
              (link.href.startsWith('/paths') && pathname.startsWith('/paths'));

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-3.5 py-2 text-sm font-medium rounded-md transition-colors flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 ${
                  isActive
                    ? 'text-blue-600 dark:text-blue-400 bg-blue-50/80 dark:bg-blue-950/40'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
                }`}
              >
                <span>{link.label}</span>
                {link.badge !== undefined && link.badge > 0 && (
                  <span className="inline-flex items-center justify-center text-[10px] font-bold text-white bg-blue-600 rounded-full h-4 min-w-4 px-1">
                    {link.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Controls: Search button, Theme Toggle, Mobile Toggle */}
        <div className="flex items-center gap-2">
          <Link
            href="/explore"
            className="hidden sm:flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 px-3 py-1.5 rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
            aria-label="Search articles"
          >
            <Search className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Search articles...</span>
            <kbd className="hidden lg:inline-block font-mono text-[10px] bg-slate-200 dark:bg-slate-800 px-1.5 py-0.5 rounded text-slate-600 dark:text-slate-300">
              /
            </kbd>
          </Link>

          {/* Theme Switcher */}
          <button
            onClick={toggleTheme}
            className="p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
            aria-label={`Switch to ${resolvedTheme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {resolvedTheme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" aria-hidden="true" />
            ) : (
              <Moon className="w-4 h-4 text-slate-700" aria-hidden="true" />
            )}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div
          data-lenis-prevent
          className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 pt-3 pb-6 space-y-2 animate-fade-in shadow-lg"
        >
          <Link
            href="/explore"
            className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-900"
          >
            <Search className="w-4 h-4 text-blue-500" />
            <span>Search articles & topics</span>
          </Link>

          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center justify-between px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50'
                    : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4 text-slate-400" />
                  <span>{link.label}</span>
                </div>
                {link.badge !== undefined && link.badge > 0 && (
                  <span className="text-xs font-bold text-white bg-blue-600 rounded-full px-2 py-0.5">
                    {link.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
