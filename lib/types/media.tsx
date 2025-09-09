 
export interface VideoItem {
  id: string;
  title: string;
  description: string;
  youtubeId: string;
  thumbnail?: string;
  category: string ;
  date: string;
  venue?: string;
  duration: number;
  // views?: number;
  featured?: boolean;
  tags: string[];
 
  
}


export interface Video {
  id: string;
  title: string;
  description: string;
  youtubeId: string;
  thumbnail?: string;
  category: string
  duration: number;
  date: string;
  // views: number;
  // uploadDate: string;
  tags: string[];
  featured?: boolean;
}