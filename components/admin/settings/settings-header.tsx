import { Settings } from 'lucide-react'

export function SettingsHeader() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-12 w-12 items-center justify-center rounded-lg  bg-gray-800">
        <Settings className="h-6 w-6  text-blue-400" />
      </div>
      <div>
        <h1 className="text-3xl font-bold tracking-tight  text-white">
          Settings
        </h1>
        <p className="mt-1 text-sm  text-gray-300">
          Manage categories and system configuration
        </p>
      </div>
    </div>
  )
}