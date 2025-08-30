'use client'

import { useState } from 'react'
import { Plus, MoreHorizontal, Edit, Trash2 } from 'lucide-react'

import { Button } from '@/components/ui/Button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/Table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu'
import { CreateCategoryModal } from './create-category-modal'
import { EditCategoryModal } from './edit-category-modal'
import { DeleteCategoryModal } from './delete-category-modal'
import { usePhotoCategoriesData } from '@/hooks/use-photo-categories'
import { formatDate } from '@/lib/utils'
import type { PhotoCategory } from '@/lib/types'

export function PhotoCategoriesTable() {
  const [editingCategory, setEditingCategory] = useState<PhotoCategory | null>(null)
  const [deletingCategory, setDeletingCategory] = useState<PhotoCategory | null>(null)
  const { data: categories, isLoading, error, refetch } = usePhotoCategoriesData()

  if (error) {
    return (
      <div className="text-center text-red-600 dark:text-red-400 py-8">
        Failed to load photo categories. Please try again.
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">Photo Categories</h3>
          <p className="text-sm text-muted-foreground">
            Categories help organize your photo gallery
          </p>
        </div>
        
        <CreateCategoryModal type="photo" onSuccess={refetch}>
          <Button className='bg-blue-600 hover:bg-blue-700    text-white'>
            <Plus className="mr-2 h-4 w-4" />
            Add Category 
          </Button>
        </CreateCategoryModal>
      </div>

      <div className="rounded-md border border-gray-700 ">
        <Table>
          <TableHeader>
            <TableRow className='border border-gray-700 '>
              <TableHead>Name</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow className='border border-gray-700 '>
                <TableCell colSpan={4} className="text-center py-8">
                  <div className="animate-pulse">Loading categories...</div>
                </TableCell>
              </TableRow>
            ) : categories?.length === 0 ? (
              <TableRow className='border border-gray-700 '>
                <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                  No categories found. Create your first category to get started.
                </TableCell>
              </TableRow>
            ) : (
              categories?.map((category) => (
                <TableRow key={category.id} className='border border-gray-700'>
                  <TableCell className="font-medium">{category.name}</TableCell>
                  <TableCell>
                    <code className="text-sm bg-muted px-2 py-1 rounded">
                      {category.slug}  
                    </code>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {formatDate(category.created_at, 'MMM dd, yyyy')}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu >
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className='bg-gray-900 text-gray-200'>
                        <DropdownMenuItem onClick={() => setEditingCategory(category)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => setDeletingCategory(category)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Modals */}
      {editingCategory && (
        <EditCategoryModal
          type="photo"
          category={editingCategory}
          open={!!editingCategory}
          onOpenChange={(open) => !open && setEditingCategory(null)}
          onSuccess={refetch}
        />
      )}

      {deletingCategory && (
        <DeleteCategoryModal
          type="photo"
          category={deletingCategory}
          open={!!deletingCategory}
          onOpenChange={(open) => !open && setDeletingCategory(null)}
          onSuccess={refetch}
        />
      )}
    </div>
  )
}