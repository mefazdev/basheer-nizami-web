export interface VideoItem {
  id: string;
  title: string;
  description: string;
  youtubeId: string;
  thumbnail?: string;
  category: 'conferences' | 'tv' | 'public-events';
  date: string;
  venue?: string;
  duration: string;
  views?: number;
  featured?: boolean;
  tags: string[];
}


export interface Video {
  id: string;
  title: string;
  description: string;
  youtubeId: string;
  thumbnail?: string;
  category: 'lectures' | 'highlights' | 'talk-shows';
  duration: string;
  views: number;
  uploadDate: string;
  tags: string[];
  featured?: boolean;
}