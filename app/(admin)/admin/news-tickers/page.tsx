import { Metadata } from "next";
import { Suspense } from "react";
import { requireAdmin } from "@/lib/auth";
import { Card, CardContent } from "@/components/ui/Card";
import { NewsTickersHeader } from "@/components/admin/news-tickers/news-tickers-header";
import { NewsTickersTable } from "@/components/admin/news-tickers/news-ticker-table";
import { Skeleton } from "@/components/ui/Skeletone";

export const metadata: Metadata = {
  title: "News Tickers",
  description: "Manage news tickers and announcements",
};

function NewsTickersLoading() {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex justify-between">
            <Skeleton className="h-10 w-64" />
            <Skeleton className="h-10 w-32" />
          </div>
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// export default async function NewsTickersPage({
//   searchParams,
// }: {
//   searchParams?: { page?: string; search?: string; status?: string }
// }) {
//   await requireAdmin()
//   const resolvedSearchParams = await searchParams

//   const page = parseInt(resolvedSearchParams?.page ?? "1", 10)
//   const search = resolvedSearchParams?.search ?? ""
//   const status = resolvedSearchParams?.status ?? "all"
//   //   const page = parseInt(searchParams?.page ?? "1", 10)
//   // const search = searchParams?.search ?? ""
//   // const status = searchParams?.status ?? "all"

//   return (
//     <div className="space-y-6">
//       <NewsTickersHeader />

//       <Suspense fallback={<NewsTickersLoading />}>
//         <NewsTickersTable
//           page={page}
//           search={search}
//           status={status}
//         />
//       </Suspense>
//     </div>
//   )
// }

export default async function NewsTickersPage({
  searchParams,
}: {
  searchParams?: Promise<{ page?: string; search?: string; status?: string }>;
}) {
  await requireAdmin();

  // Await the searchParams Promise
  const resolvedSearchParams = await searchParams;

  const page = parseInt(resolvedSearchParams?.page ?? "1", 10);
  const search = resolvedSearchParams?.search ?? "";
  const status = resolvedSearchParams?.status ?? "all";

  return (
    <div className="space-y-6">
      <NewsTickersHeader />

      <Suspense fallback={<NewsTickersLoading />}>
        <NewsTickersTable page={page} search={search} status={status} />
      </Suspense>
    </div>
  );
}
