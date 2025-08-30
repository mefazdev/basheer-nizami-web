import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { CreatePublicationModal } from './create-publication-modal'

export function PublicationsHeader() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight  text-white">
          Publications
        </h1>
        <p className="mt-2 text-sm  text-gray-300">
          Manage your books, papers, and published works
        </p>
      </div>
      
      <CreatePublicationModal>
        <Button className='bg-blue-600 text-white hover:bg-blue-700'>
          <Plus className="mr-2 h-4 w-4" />
          Add Publication
        </Button>
      </CreatePublicationModal>
    </div>
  )
}