import { Topic } from '@/types/content';

export const TOPICS: Topic[] = [
  {
    slug: 'web-dev',
    title: 'Web Development',
    tagline: 'Modern frontend architecture, backend APIs, browser rendering, and web performance.',
    description: 'Deep dives into modern full-stack web engineering. Master Next.js App Router, React 19, CSS Container Queries, browser rendering pipelines, Core Web Vitals, and secure API design.',
    icon: 'Globe',
    featuredTags: ['Next.js', 'React 19', 'Performance', 'CSS', 'Security', 'TypeScript'],
    learningPathSlugs: ['web-development-roadmap', 'frontend-performance-essentials'],
  },
  {
    slug: 'ai-ml',
    title: 'AI and Machine Learning',
    tagline: 'Foundational concepts, production ML pipelines, transformers, and vector search.',
    description: 'Bridge theory and production. Explore neural architectures, attention mechanisms, feature engineering, vector indexing with HNSW, RAG evaluation frameworks, and model serving.',
    icon: 'Brain',
    featuredTags: ['Transformers', 'Vector Search', 'Pipelines', 'LLMs', 'Scikit-Learn', 'RAG'],
    learningPathSlugs: ['ai-ml-roadmap', 'first-ml-pipeline'],
  },
  {
    slug: 'computer-science',
    title: 'Computer Science',
    tagline: 'Operating system internals, networking protocols, databases, and distributed consensus.',
    description: 'Fundamental computing principles that underpin modern software systems. Dive into virtual memory, B-trees vs LSM-trees, Raft consensus, and TCP/UDP/QUIC network transport.',
    icon: 'Cpu',
    featuredTags: ['OS Internals', 'Distributed Systems', 'Databases', 'Networking', 'Algorithms'],
    learningPathSlugs: ['computer-science-roadmap', 'system-design-foundations'],
  },
  {
    slug: 'engineering-projects',
    title: 'Engineering Projects',
    tagline: 'Architecture notes, zero-downtime migrations, smooth scrolling, and debugging case studies.',
    description: 'Real-world engineering challenges solved with disciplined systems thinking. Case studies on Kafka event pipelines, database schema migrations, Node.js memory leaks, and Lenis integration.',
    icon: 'Layers',
    featuredTags: ['Architecture', 'Kafka', 'Migrations', 'Debugging', 'Smooth Scrolling'],
    learningPathSlugs: ['frontend-performance-essentials', 'system-design-foundations'],
  },
];

export function getTopicBySlug(slug: string): Topic | undefined {
  return TOPICS.find((topic) => topic.slug === slug);
}
