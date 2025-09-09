import { PublicationWithCategory } from "../types";
import { Book } from "../types/publication";

 
 

export function mapPublicationToBook(pub: PublicationWithCategory): Book {
  return {
    id: pub.id,
    title: pub.name,
    subtitle: "", // no subtitle in DB → optional
    description: pub.description ?? "",
    coverImage: pub.cover_path ?? "/default-cover.png",
    isbn: "", // no isbn in DB → empty
    publicationDate: pub.published_year
      ? `${pub.published_year}-01-01`
      : pub.created_at, // fallback
    publisher: pub.publisher ?? "",
    pages: pub.total_pages ?? 0,
    category: pub.publication_categories?.name ?? "Uncategorized",
    date: pub.created_at,
    purchaseLinks: {
      amazon: pub.buy_url ?? undefined,
    },
    tags: pub.tags ?? [],
    cover_path: pub.cover_path,
    featured:pub.featured
  };
}
