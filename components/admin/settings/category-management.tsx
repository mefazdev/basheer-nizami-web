'use client'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { VideoCategoriesTable } from './video-categories-table'
import { PhotoCategoriesTable } from './photo-categories-table'
import { PublicationCategoriesTable } from './publication-categories-table'

export function CategoryManagement() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Category Management</CardTitle>
        <CardDescription>
          Organize your content with categories for videos, photos, and publications
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="videos" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="videos">Video Categories</TabsTrigger>
            <TabsTrigger value="photos">Photo Categories</TabsTrigger>
            <TabsTrigger value="publications">Publication Categories</TabsTrigger>
          </TabsList>
          
          <TabsContent value="videos" className="space-y-4  ">
            <VideoCategoriesTable/>
          </TabsContent>
          
          <TabsContent value="photos" className="space-y-4">
            <PhotoCategoriesTable />
          </TabsContent>
          
          <TabsContent value="publications" className="space-y-4">
            <PublicationCategoriesTable />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}