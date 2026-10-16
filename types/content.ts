export type CategorySlug = 'web-dev' | 'ai-ml' | 'computer-science' | 'engineering-projects';

export type DifficultyLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export interface Author {
  name: string;
  role: string;
  avatar: string;
  bio: string;
  github?: string;
  twitter?: string;
}

export interface Prerequisite {
  title: string;
  url: string;
  description: string;
}

export interface HeadingItem {
  id: string;
  text: string;
  level: 2 | 3;
}

export interface Article {
  slug: string;
  title: string;
  summary: string;
  category: CategorySlug;
  categoryName: string;
  tags: string[];
  author: Author;
  publishedAt: string;
  updatedAt: string;
  readingTime: string;
  difficulty: DifficultyLevel;
  views: number;
  featured?: boolean;
  prerequisites: Prerequisite[];
  relatedArticleSlugs: string[];
  headings: HeadingItem[];
  content: string;
}

export interface Topic {
  slug: CategorySlug;
  title: string;
  tagline: string;
  description: string;
  icon: string;
  featuredTags: string[];
  learningPathSlugs: string[];
}

export interface PathStep {
  stepNumber: number;
  title: string;
  summary: string;
  estimatedMinutes: number;
  articleSlug: string;
  articleTitle: string;
  keyConcepts: string[];
  image?: string;
  visualDescription?: string;
}

export interface LearningPath {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  difficulty: DifficultyLevel;
  totalMinutes: number;
  category: CategorySlug;
  steps: PathStep[];
}

export type SortOption = 'newest' | 'popular' | 'reading-time-asc' | 'reading-time-desc';

export interface SearchParams {
  q?: string;
  category?: string;
  tag?: string;
  sort?: SortOption;
  page?: number;
  pageSize?: number;
}

export interface PaginatedResult<T> {
  items: T[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
  hasPrev: boolean;
  hasNext: boolean;
}
