import { Metadata } from 'next'
import { Suspense } from 'react'
import { requireAdmin } from '@/lib/auth'
import { PhotosTable } from '@/components/admin/photos/photos-table'
import { PhotosHeader } from '@/components/admin/photos/photos-header'
import { Card, CardContent } from '@/components/ui/Card'
import { Skeleton } from '@/components/ui/Skeletone'
 

export const metadata: Metadata = {
  title: 'Photos',
  description: 'Manage photo gallery and image uploads',
}

// interface PageProps {
//   searchParams: {
//     page?: string
//     search?: string
//     category?: string
//     view?: 'grid' | 'list'
//   }
// }

function PhotosLoading() {

     
  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex justify-between">
            <Skeleton className="h-10 w-64" />
            <Skeleton className="h-10 w-32" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="aspect-square w-full" />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default async function PhotosPage({ searchParams, }:  { searchParams? : 
   Promise< {page?: string
    search?: string
    category?: string
    view?: 'grid' | 'list'}>
  }) {
  await requireAdmin()
  const resolvedSearchParams = await searchParams
  const page = parseInt(resolvedSearchParams?.page || '1')
  const search = resolvedSearchParams?.search || ''
  const category = resolvedSearchParams?.category || ''
  const view = (resolvedSearchParams?.view as 'grid' | 'list') || 'grid'


  return (
    <div className="space-y-6">
      <PhotosHeader />
 
      <Suspense fallback={<PhotosLoading />}>
        <PhotosTable
          page={page}
          search={search}
          category={category}
          view={view}
        />
      </Suspense>
    </div>
  )
}