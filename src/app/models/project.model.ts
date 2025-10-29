export interface Project {
  id: string;
  title: string;
  image: string;
  description: string;
  githubUrl: string;
  slides: string[];
  highlights: string[];
  impact: string;
  category: 'all' | 'ml-ai' | 'software' | 'full-stack';
  tags?: string[];
}
