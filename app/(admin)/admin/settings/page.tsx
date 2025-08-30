import { Metadata } from 'next'
import { requireAdmin } from '@/lib/auth'
import { SettingsHeader } from '@/components/admin/settings/settings-header'
import { CategoryManagement } from '@/components/admin/settings/category-management'

export const metadata: Metadata = {
  title: 'Settings',
  description: 'Manage categories and system settings',
}

export default async function SettingsPage() {
  await requireAdmin()

  return (
    <div className="space-y-6">
      <SettingsHeader />
      <CategoryManagement />
    </div>
  )
}