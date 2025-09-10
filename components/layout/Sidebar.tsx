'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  BarChart3,
  FileText,
  MessageSquare,
  Video,
  Camera,
  BookOpen,
  Settings,
  Menu,
  X,
  Home,
  Newspaper,
} from 'lucide-react'
import { Button } from '../ui/Button'


const navigation = [
  {
    name: 'Dashboard',
    href: '/admin',
    icon: Home,
    description: 'Overview and analytics'
  },
 
  {
    name: 'Articles',
    href: 'https://basheer-nizami-web.sanity.studio/',
    icon: FileText,
    description: 'View articles from Sanity'
  },
  {
    name: 'Updates',
    href: 'https://basheer-nizami-web.sanity.studio/',
    icon: MessageSquare,
    description: 'View updates from Sanity'
  },
  {
    name: 'Videos',
    href: '/admin/videos',
    icon: Video,
    description: 'Manage video gallery'
  },
  {
    name: 'Photos',
    href: '/admin/photos',
    icon: Camera,
    description: 'Manage photo gallery'
  },
  {
    name: 'Publications',
    href: '/admin/publications',
    icon: BookOpen,
    description: 'Manage publications'
  },
   {
    name: 'News Tickers',
    href: '/admin/news-tickers',
    icon: Newspaper,
    description: 'Manage news tickers'
  },
  {
    name: 'Settings',
    href: '/admin/settings',
    icon: Settings,
    description: 'System settings'
  },
]

export function Sidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  // Close sidebar when route changes on mobile
  useEffect(() => {
    setSidebarOpen(false)
  }, [pathname])

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const sidebar = document.getElementById('mobile-sidebar')
      const toggle = document.getElementById('sidebar-toggle')
      
      if (
        sidebarOpen &&
        sidebar &&
        !sidebar.contains(event.target as Node) &&
        toggle &&
        !toggle.contains(event.target as Node)
      ) {
        setSidebarOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [sidebarOpen])

  const SidebarContent = () => (
    <div className='bg-gray-900 h-screen'>
      {/* Logo */}
      <div className="flex h-16 shrink-0 items-center px-6  ">
        <Link 
          href="/admin" 
          className="flex items-center space-x-2"
          aria-label="Admin Dashboard Home"
        >
          <BarChart3 className="h-8 w-8 text-blue-600   " aria-hidden="true" />
          <span className="text-xl font-bold  text-white ">
            Admin
          </span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex flex-1 flex-col px-6 pb-4   mt-4">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" className="-mx-2 space-y-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href || 
                  (item.href !== '/admin' && pathname.startsWith(item.href))
                
                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={cn(
                        'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 transition-colors',
                        isActive
                          ? '  text-white  bg-blue-600'
                          : '  hover:text-blue-600  text-gray-300  hover:bg-gray-800 dark:hover:text-blue-400'
                      )}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      <item.icon
                        className={cn(
                          'h-6 w-6 shrink-0',
                          isActive
                            ? 'text-white'
                            : 'text-gray-400   group-hover:text-blue-700'
                        )}
                        aria-hidden="true"
                      />
                      <span className="truncate">{item.name}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </li>

          {/* Footer info */}
          <li className="mt-auto">
            <div className="rounded-md   p-3 bg-gray-800">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <BarChart3 className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <div className="ml-3 flex-1 text-xs">
                  <p className="font-medium   text-gray-100">
                    Admin Dashboard
                  </p>
                  <p className="text-gray-500 dark:text-gray-400">
                    Content Management
                  </p>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </nav>
    </div>
  )

  return (
    <>
      {/* Mobile sidebar toggle button */}
      <div className="sticky top-0 z-40 lg:hidden">
        <div className="flex h-16 items-center gap-x-4 border-b    px-4 shadow-sm  border-gray-700  bg-gray-900 sm:gap-x-6 sm:px-6">
          <Button
            id="sidebar-toggle"
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label={sidebarOpen ? 'Close sidebar' : 'Open sidebar'}
            className="-m-2.5 p-2.5 text-gray-200"
          >
            {sidebarOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </Button>
          <div className="h-6 w-px  bg-gray-700" aria-hidden="true" />
          <span className="text-sm font-semibold  text-white">
            Admin Dashboard
          </span>
        </div>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="relative z-50 lg:hidden"
          role="dialog" 
          aria-modal="true"
          aria-label="Sidebar"
        >
          <div className="fixed inset-0 bg-gray-900/80 transition-opacity" />
          <div className="fixed inset-0 flex">
            <div 
              id="mobile-sidebar"
              className="relative mr-16 flex w-full max-w-xs flex-1"
            >
              <div className="flex grow flex-col gap-y-5 overflow-y-auto  bg-gray-900 pb-4">
                <SidebarContent />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-64 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r      border-gray-700  bg-gray-900 pb-4">
          <SidebarContent />
        </div>
      </div>
    </>
  )
}