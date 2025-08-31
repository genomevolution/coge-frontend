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
    title: 'Search',
    description: 'Search Biosample',
    buttonText: 'Start Analysis'
  },
  {
    id: 'comparative-genomics',
    icon: '🔍',
    title: 'Search by sequence',
    description: 'BLAST.',
    buttonText: 'Compare Genomes'
  }
] as const; 