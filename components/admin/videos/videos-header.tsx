import { Plus, Video } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { CreateVideoModal } from './create-video-modal'

export function VideosHeader() {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-800 ">
          <Video className="h-6 w-6 text-blue-600 " />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight  text-white">
            Videos
          </h1>
          <p className="mt-1 text-sm  text-gray-300">
            Manage your YouTube video gallery and content
          </p>
        </div>
      </div>
      
      <CreateVideoModal>
        <Button className=' bg-blue-600 text-white '>
          <Plus className="mr-2 h-4 w-4" />
          Add Video
        </Button>
      </CreateVideoModal>
    </div>
  )
}