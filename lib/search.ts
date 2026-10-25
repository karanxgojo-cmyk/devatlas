import { Article, PaginatedResult, SearchParams, SortOption } from '@/types/content';
import { ARTICLES } from './content/articles';

export function searchAndFilterArticles(params: SearchParams): PaginatedResult<Article> {
  const query = (params.q || '').trim().toLowerCase();
  const category = params.category && params.category !== 'all' ? params.category : null;
  const tag = params.tag && params.tag !== 'all' ? params.tag : null;
  const difficulty = params.difficulty && params.difficulty !== 'all' ? params.difficulty.toLowerCase() : null;
  const sort: SortOption = params.sort || 'newest';
  const page = Math.max(1, params.page || 1);
  const pageSize = Math.max(1, params.pageSize || 6);

  // 1. Filter
  let filtered = ARTICLES.filter((article) => {
    // Category match
    if (category && article.category !== category) {
      return false;
    }

    // Difficulty level match
    if (difficulty && article.difficulty.toLowerCase() !== difficulty) {
      return false;
    }

    // Tag match
    if (tag && !article.tags.some((t) => t.toLowerCase() === tag.toLowerCase())) {
      return false;
    }

    // Keyword match
    if (query) {
      const titleMatch = article.title.toLowerCase().includes(query);
      const summaryMatch = article.summary.toLowerCase().includes(query);
      const categoryMatch = article.categoryName.toLowerCase().includes(query);
      const tagsMatch = article.tags.some((t) => t.toLowerCase().includes(query));
      const contentMatch = article.content.toLowerCase().includes(query);

      if (!titleMatch && !summaryMatch && !categoryMatch && !tagsMatch && !contentMatch) {
        return false;
      }
    }

    return true;
  });

  // 2. Sort
  filtered = [...filtered].sort((a, b) => {
    if (sort === 'popular') {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
    }

    if (sort === 'reading-time-asc') {
      const getMin = (r: string) => parseInt(r.split(' ')[0], 10) || 0;
      return getMin(a.readingTime) - getMin(b.readingTime);
    }

    if (sort === 'reading-time-desc') {
      const getMin = (r: string) => parseInt(r.split(' ')[0], 10) || 0;
      return getMin(b.readingTime) - getMin(a.readingTime);
    }

    // Default: 'newest'
    return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
  });

  // 3. Paginate
  const totalCount = filtered.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
  const safePage = Math.min(page, totalPages);
  const startIndex = (safePage - 1) * pageSize;
  const paginatedItems = filtered.slice(startIndex, startIndex + pageSize);

  return {
    items: paginatedItems,
    totalCount,
    totalPages,
    currentPage: safePage,
    pageSize,
    hasPrev: safePage > 1,
    hasNext: safePage < totalPages,
  };
}
