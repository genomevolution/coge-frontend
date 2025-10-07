export interface Tool {
  id: string;
  icon: string;
  title: string;
  description: string;
  buttonText: string;
}

export const TOOLS: readonly Tool[] = [
  {
    id: 'search',
    icon: '🧬',
    title: 'comparative.genomics.tools.search.title',
    description: 'comparative.genomics.tools.search.description',
    buttonText: 'comparative.genomics.tools.search.button'
  },
  {
    id: 'comparative-genomics',
    icon: '🔍',
    title: 'comparative.genomics.tools.blast.title',
    description: 'comparative.genomics.tools.blast.description',
    buttonText: 'comparative.genomics.tools.blast.button'
  }
] as const; 