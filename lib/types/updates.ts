import { PortableTextBlock } from "@portabletext/react";

export interface UpdateItem {
  _id: string
  title: string
  // author:string
  // content:string;
      content: PortableTextBlock[] 
  slug: string ;
  excerpt: string
  category?: string
//  publishedAt: string
  image?: string;
  // source?: string
  // link?: string
  featured?: boolean
  // tags: string[]
  publishedAt:string
 

}
