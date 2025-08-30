import { Metadata } from 'next'
import { Suspense } from 'react'
import { requireAdmin } from '@/lib/auth'
import { PublicationsTable } from '@/components/admin/publications/publications-table'
import { PublicationsHeader } from '@/components/admin/publications/publications-header'
import { Card, CardContent } from '@/components/ui/Card'
import { Skeleton } from '@/components/ui/Skeletone'

export const metadata: Metadata = {
  title: 'Publications',
  description: 'Manage publications and book covers',
}

// interface PageProps {
//   searchParams: {
//     page?: string
//     search?: string
//     category?: string
//     year?: string
//   }
// }

function PublicationsLoading() {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex justify-between">
            <Skeleton className="h-10 w-64" />
            <Skeleton className="h-10 w-32" />
          </div>
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-24 w-full" />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default async function PublicationsPage({ searchParams }:  {searchParams?: Promise<{
    page?: string
    search?: string
    category?: string
    year?: string
  }>}) {
  await requireAdmin()
  const resolvedSearchParams = await searchParams;
  const page = parseInt(resolvedSearchParams?.page || '1')
  const search = resolvedSearchParams?.search || ''
  const category = resolvedSearchParams?.category || ''
  const year = resolvedSearchParams?.year || ''

  return (
    <div className="space-y-6">
      <PublicationsHeader />
      
      <Suspense fallback={<PublicationsLoading />}>
        <PublicationsTable
          page={page}
          search={search}
          category={category}
          year={year}
        />
      </Suspense>
    </div>
  )
}