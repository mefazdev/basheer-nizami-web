import { Metadata } from 'next'
import { requireAdmin } from '@/lib/auth'
import { Sidebar } from '@/components/layout/Sidebar'
import { Topbar } from '@/components/layout/Topbar'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { Toaster } from '@/components/ui/Toaster'

 
 

export const metadata: Metadata = {
  title: {
    template: '%s | Admin Dashboard',
    default: 'Admin Dashboard',
  },
  description: 'Admin dashboard for content management and analytics',
}

interface AdminLayoutProps {
  children: React.ReactNode
}

export default async function AdminLayout({ children }: AdminLayoutProps) {
  // Ensure user is authenticated and has admin role
  const user = await requireAdmin()

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main content area */}
      <div className="lg:pl-64">
        {/* Top navigation */}
        <Topbar user={user} />
        
        {/* Page content */}
        <main className="py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Breadcrumbs */}
            <Breadcrumbs />
            
            {/* Page content */}
            <div className="mt-4">
              {children}
                <Toaster /> 
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}