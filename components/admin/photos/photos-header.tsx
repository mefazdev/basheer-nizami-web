import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { CreatePhotoModal } from './create-photo-modal'

export function PhotosHeader() {
    
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white">
          Photos
        </h1>
        <p className="mt-2 text-sm  text-gray-300">
          Manage your photo gallery and image uploads
        </p>
      </div>
      
      <CreatePhotoModal >
        <Button className='bg-blue-600 text-white hover:bg-blue-700'>
          <Plus className="mr-2 h-4 w-4" />
          Upload Photo
        </Button>
      </CreatePhotoModal>
    </div>
  )
}