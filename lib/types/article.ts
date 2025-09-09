import { PortableTextBlock } from "@portabletext/react";

export interface Article {
  _id: string;
  title: string;
  slug: string;
  // content:  string
    content: PortableTextBlock[] 
  excerpt?: string;
  mainImage?: { asset: { url: string }; alt?: string };
  author?: string  ;
  // category?: { title: string; slug: { current: string } } ;
  category?: string;
  readTime?: string |  number;
  publishedAt?: string;
  views?: number;
  featured?: boolean;
  image?:string;
  publishDate:string;
  tags: string[]
}
