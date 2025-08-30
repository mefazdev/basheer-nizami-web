import { Metadata } from 'next'
import { Suspense } from 'react'
import { requireAdmin } from '@/lib/auth'
import { VideosTable } from '@/components/admin/videos/videos-table'
import { VideosHeader } from '@/components/admin/videos/videos-header'
import { Card, CardContent } from '@/components/ui/Card'
import { Skeleton } from '@/components/ui/Skeletone'

export const metadata: Metadata = {
  title: 'Videos',
  description: 'Manage video gallery and YouTube content',
}

// interface PageProps {
//   searchParams: {
//     page?: string
//     search?: string
//     category?: string
//     published?: string
//     dateFrom?: string
//     dateTo?: string
//   }
// }

function VideosLoading() {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex justify-between">
            <Skeleton className="h-10 w-64" />
            <Skeleton className="h-10 w-32" />
          </div>
          <div className="flex gap-4 mb-6">
            <Skeleton className="h-10 w-48" />
            <Skeleton className="h-10 w-48" />
            <Skeleton className="h-10 w-32" />
          </div>
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-20 w-full" />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default async function VideosPage({ searchParams }:  {searchParams?: Promise<{
    page?: string
    search?: string
    category?: string
    published?: string
    dateFrom?: string
    dateTo?: string
  }>}) {
  await requireAdmin()
  const resolvedSearchParams = await searchParams;
  return (
    <div className="space-y-6">
      <VideosHeader />
      
      <Suspense fallback={<VideosLoading />}>
{resolvedSearchParams &&         <VideosTable searchParams={resolvedSearchParams} />}
      </Suspense>
    </div>
  )
}