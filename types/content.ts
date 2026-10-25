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

export type LearningTier = 'Fundamentals' | 'Beginner' | 'Intermediate' | 'Advanced' | 'Practical Projects';

export type ResourceType = 'Article' | 'Documentation' | 'Video' | 'Tutorial' | 'Interactive Course';

export interface StageResource {
  title: string;
  source: string; // e.g. 'MDN Web Docs', 'GeeksforGeeks', 'roadmap.sh', 'freeCodeCamp', 'Official Docs', 'YouTube'
  url: string;
  type: ResourceType;
  isFree?: boolean;
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
  difficulty?: DifficultyLevel;
  tier?: LearningTier;
  prerequisites?: string[];
  commonMistakes?: string[];
  practicalExercise?: string;
  codeSnippet?: string;
  resources?: StageResource[];
  roadmapUrl?: string;
  externalReference?: {
    title: string;
    url: string;
    source: 'MDN' | 'OSSU' | 'DEV' | 'GitHub';
  };
}

export interface LearningPath {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  difficulty: DifficultyLevel;
  totalMinutes: number;
  category: CategorySlug;
  roadmapReferenceUrl?: string;
  steps: PathStep[];
}

export type SortOption = 'newest' | 'popular' | 'reading-time-asc' | 'reading-time-desc';

export interface SearchParams {
  q?: string;
  category?: string;
  tag?: string;
  difficulty?: string;
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
