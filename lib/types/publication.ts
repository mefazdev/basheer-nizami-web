export  interface Book {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  coverImage: string;
  isbn: string;
  publicationDate: string;
  publisher: string;
  pages: number;
  category: string;
  date: string;
  purchaseLinks: {
    amazon?: string;
    barnes?: string;
    publisher?: string;
    google?: string;
  };
  tags: string[];
  cover_path?:string| null
  featured?:boolean
}
 