'use client'

// import { useState, useEffect } from 'react'
import {  FileText, Camera, Video, BookOpen, Activity, TrendingUp, AlertTriangle, RefreshCw } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
// import { useDashboardStats } from '@/hooks/useDashboardStats'
 
import { useArticles } from '@/hooks/sanity/useArticles'
import { useUpdates } from '@/hooks/sanity/useUpdates'
import { useNewsTickersData } from '@/hooks'
import { usePhotosData } from '@/hooks/use-photos-data'
import { usePublicationsData } from '@/hooks/use-publications-data'
import { useVideosData } from '@/hooks/use-videos-data'
import Link from 'next/link'

export function DashboardClient() {
  // Option 1: Use the combined dashboard stats hook
//   const { totalArticles, totalUpdates, totalVideos, totalPhotos, totalPublications, activeNewsItems, loading, error } = useDashboardStats()

  // Option 2: Use individual API hooks for real-time data (recommended for better performance)
  const { articles, loading: articlesLoading, error: articlesError } = useArticles()
  const { updates, loading: updatesLoading, error: updatesError } = useUpdates()
  
  // Add your other API hooks here - uncomment and adjust based on your hook signatures
 
  const { data: newsData,    } = useNewsTickersData({
    page: 1,
    search: '',
    status: undefined,
  })

  const { data: photosData,   } = usePhotosData({
    page: 1,
    search: '',
    category_id: undefined,
  })

  const { data: publicationsData  } = usePublicationsData({
    page: 1,
    search: '',
    category_id: undefined,
    year: undefined,
  })

  const { data: videosData,   } = useVideosData({
    page: 1,
    search: '',
    category_id: undefined,
    published: undefined,
  })
 

  // Calculate real stats
  const stats = {
    totalArticles: articles?.length || 0,
    totalUpdates: updates?.length || 0,
    // Replace these with real data when you uncomment the hooks above:
    totalVideos: videosData?.data?.length   || 0,
    totalPhotos: photosData?.data?.length  || 0,
    totalPublications: publicationsData?.data?.length  || 0,
    activeNewsItems: newsData?.data?.length || 0,
    
    // Temporary static values - replace with real data above
 
    
  }

  // Check loading state
  const isLoading = articlesLoading || updatesLoading
  // Add other loading states: || newsLoading || photosLoading || publicationsLoading || videosLoading

  // Check for errors
  const hasError = articlesError || updatesError
  // Add other error states: || newsError || photosError || publicationsError || videosError

  // Calculate trends (you can make this more sophisticated with historical data)
//   const [previousStats, setPreviousStats] = useState(stats)
  
//   useEffect(() => {
//     // Store previous stats for trend calculation
//     const timer = setTimeout(() => {
//       setPreviousStats(stats)
//     }, 1000)
//     return () => clearTimeout(timer)
//   }, [stats])

//   const getTrend = (current: number, previous: number) => {
//     if (previous === 0) return 'New'
//     const change = current - previous
//     if (change > 0) return `+${change} new`
//     if (change < 0) return `${change} removed`
//     return 'No change'
//   }

  const statCards = [
    {
      title: 'Articles',
      value: stats.totalArticles.toString(),
      description: 'Published articles',
      icon: FileText,
    //   trend: getTrend(stats.totalArticles, previousStats.totalArticles),
      color: 'text-blue-600',
      loading: articlesLoading,
      error: articlesError,
    },
    {
      title: 'Updates',
      value: stats.totalUpdates.toString(),
      description: 'Published updates',
      icon: Activity,
    //   trend: getTrend(stats.totalUpdates, previousStats.totalUpdates),
      color: 'text-green-600',
      loading: updatesLoading,
      error: updatesError,
    },
    {
      title: 'Videos',
      value: stats.totalVideos.toString(),
      description: 'Published videos',
      icon: Video,
    //   trend: getTrend(stats.totalVideos, previousStats.totalVideos),
      color: 'text-purple-600',
      loading: false, // Replace with videosLoading
      error: null, // Replace with videosError
    },
    {
      title: 'Photos',
      value: stats.totalPhotos.toString(),
      description: 'Gallery photos',
      icon: Camera,
    //   trend: getTrend(stats.totalPhotos, previousStats.totalPhotos),
      color: 'text-green-600',
      loading: false, // Replace with photosLoading
      error: null, // Replace with photosError
    },
    {
      title: 'Publications',
      value: stats.totalPublications.toString(),
      description: 'Published works',
      icon: BookOpen,
    //   trend: getTrend(stats.totalPublications, previousStats.totalPublications),
      color: 'text-indigo-600',
      loading: false, // Replace with publicationsLoading
      error: null, // Replace with publicationsError
    },
    {
      title: 'News Tickers',
      value: stats.activeNewsItems.toString(),
      description: 'Active news tickers',
      icon: Activity,
    //   trend: getTrend(stats.activeNewsItems, previousStats.activeNewsItems),
      color: 'text-orange-600',
      loading: false, // Replace with newsLoading
      error: null, // Replace with newsError
    },
  ]

  const handleRefresh = () => {
    // You can add refresh logic here
    window.location.reload()
  }

  return (
    <>
      {/* Global Loading State */}
      {isLoading && (
        <div className="mb-4 p-4 bg-blue-900/20 border border-blue-700 rounded-lg">
          <div className="flex items-center">
            <RefreshCw className="h-4 w-4 animate-spin text-blue-400 mr-2" />
            <span className="text-blue-300">Loading dashboard data...</span>
          </div>
        </div>
      )}

      {/* Global Error State */}
      {hasError && (
        <div className="mb-4 p-4 bg-red-900/20 border border-red-700 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <AlertTriangle className="h-4 w-4 text-red-400 mr-2" />
              <span className="text-red-300">Error loading some dashboard data</span>
            </div>
            <button
              onClick={handleRefresh}
              className="text-red-300 hover:text-red-200 underline text-sm"
            >
              Retry
            </button>
          </div>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {statCards.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title} className="relative">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">
                    {stat.loading ? (
                      <div className="flex items-center">
                        <RefreshCw className="h-5 w-5 animate-spin text-gray-400 mr-2" />
                        <span className="text-gray-400">--</span>
                      </div>
                    ) : stat.error ? (
                      <span className="text-red-400">Error</span>
                    ) : (
                      stat.value
                    )}
                  </div>
                  {!stat.loading && !stat.error && (
                    <TrendingUp className="h-4 w-4 text-green-500" />
                  )}
                </div>
                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>
                {/* <p className={`text-xs mt-1 ${
                  stat.loading ? 'text-gray-400' : 
                  stat.error ? 'text-red-400' : 
                  stat.trend.includes('+') ? 'text-green-600 dark:text-green-400' :
                  stat.trend.includes('-') ? 'text-red-600 dark:text-red-400' :
                  'text-gray-600 dark:text-gray-400'
                }`}>
                  {stat.loading ? 'Loading...' : 
                   stat.error ? 'Failed to load' : 
                   stat.trend}
                </p> */}
              </CardContent>
              
              {/* Loading Overlay */}
              {stat.loading && (
                <div className="absolute inset-0 bg-black/10 rounded-lg flex items-center justify-center">
                  <RefreshCw className="h-6 w-6 animate-spin text-gray-400" />
                </div>
              )}
            </Card>
          )
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4  ">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Frequently used admin tasks
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <a target='_blank' href='https://basheer-nizami-web.sanity.studio/'><Card className="p-4 hover:bg-gray-800 cursor-pointer transition-colors">
                <div className="text-center">
                  <FileText className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                  <p className="text-sm font-medium">New Article</p>
                </div>
              </Card></a>
              <a target='_blank' href='https://basheer-nizami-web.sanity.studio/'><Card className="p-4 hover:bg-gray-800 cursor-pointer transition-colors">
                <div className="text-center">
                  <Activity className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                  <p className="text-sm font-medium">Updates</p>
                </div>
              </Card></a>

              <Link href='/admin/videos'><Card className="p-4 hover:bg-gray-800 cursor-pointer transition-colors">
                <div className="text-center">
                  <Video className="h-6 w-6 mx-auto mb-2 text-purple-600" />
                  <p className="text-sm font-medium">Add Video</p>
                </div>
              </Card></Link>
             <Link href={'/admin/photos'}><Card className="p-4 hover:bg-gray-800 cursor-pointer transition-colors">
                <div className="text-center">
                  <Camera className="h-6 w-6 mx-auto mb-2 text-green-600" />
                  <p className="text-sm font-medium">Upload Photo</p>
                </div>
              </Card></Link> 
              <Link href={'/admin/publications'}><Card className="p-4 hover:bg-gray-800 cursor-pointer transition-colors">
                <div className="text-center">
                  <BookOpen className="h-6 w-6 mx-auto mb-2 text-green-600" />
                  <p className="text-sm font-medium">Publications</p>
                </div>
              </Card></Link>
              <Link href={'/admin/news-tickers'}><Card className="p-4 hover:bg-gray-800 cursor-pointer transition-colors">
                <div className="text-center">
                  <Activity className="h-6 w-6 mx-auto mb-2 text-orange-600" />
                  <p className="text-sm font-medium">News Ticker</p>
                </div>
              </Card></Link> 
            </div>
          </CardContent>
        </Card>

        {/* Real-time Stats Summary */}
        {/* <Card>
          <CardHeader>
            <CardTitle>Content Summary</CardTitle>
            <CardDescription>
              Overview of your published content
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-300">Total Content Items</span>
                <span className="font-bold text-lg">
                  {isLoading ? (
                    <RefreshCw className="h-4 w-4 animate-spin" />
                  ) : (
                    (stats.totalArticles + stats.totalUpdates + stats.totalVideos + 
                     stats.totalPhotos + stats.totalPublications).toLocaleString()
                  )}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-300">Most Recent Content</span>
                <span className="text-sm text-green-400">
                  {stats.totalArticles > 0 || stats.totalUpdates > 0 ? 'Today' : 'No recent activity'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-300">Active News Items</span>
                </div>
            </div>
          </CardContent>
        </Card> */}
      </div>
 
     
    </>
  )
}