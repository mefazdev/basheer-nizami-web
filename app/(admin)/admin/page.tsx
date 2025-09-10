import { Metadata } from 'next'
import { requireAdmin } from '@/lib/auth'
import { Users, FileText, Camera, Video, BookOpen, Activity, TrendingUp, AlertTriangle } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { DashboardClient } from '@/components/admin/DashboardClient'
 

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Admin dashboard overview with analytics and insights',
}

export default async function DashboardPage() {
  const user = await requireAdmin()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white">
          Dashboard
        </h1>
        <p className="mt-2 text-sm text-gray-300">
          Welcome back, {user.email}. Here&apos;s what&apos;s happening with your site.
        </p>
      </div>

      {/* Client Component for API Data */}
      <DashboardClient />
    </div>
  )
}







// import { Metadata } from 'next'
// import { requireAdmin } from '@/lib/auth'
 
// import {   Users, FileText, Camera, Video, BookOpen, Activity } from 'lucide-react'
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'

// export const metadata: Metadata = {
//   title: 'Dashboard',
//   description: 'Admin dashboard overview with analytics and insights',
// }

// export default async function DashboardPage() {
//   const user = await requireAdmin()

//   // TODO: Fetch real analytics data
//   const stats = {
//     // totalVisitors: 1234,
//     totalArticles: 42,
//     totalVideos: 28,
//     totalPhotos: 156,
//     totalPublications: 12,
//     activeNewsItems: 3,
//   }

//   const statCards = [
//     // {
//     //   title: 'Total Visitors',
//     //   value: stats.totalVisitors.toLocaleString(),
//     //   description: 'Site visitors this month',
//     //   icon: Users,
//     //   trend: '+12.3%',
//     // },
//     {
//       title: 'Articles',
//       value: stats.totalArticles.toString(),
//       description: 'Published articles',
//       icon: FileText,
//       trend: '+2 this week',
//     },
//     {
//       title: 'Videos',
//       value: stats.totalVideos.toString(),
//       description: 'Published videos',
//       icon: Video,
//       trend: '+1 this week',
//     },
//     {
//       title: 'Photos',
//       value: stats.totalPhotos.toString(),
//       description: 'Gallery photos',
//       icon: Camera,
//       trend: '+15 this week',
//     },
//     {
//       title: 'Publications',
//       value: stats.totalPublications.toString(),
//       description: 'Published works',
//       icon: BookOpen,
//       trend: 'No change',
//     },
//     {
//       title: 'News Items',
//       value: stats.activeNewsItems.toString(),
//       description: 'Active news tickers',
//       icon: Activity,
//       trend: 'All active',
//     },
//   ]

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div>
//         <h1 className="text-3xl font-bold tracking-tight  text-white">
//           Dashboard
//         </h1>
//         <p className="mt-2 text-sm  text-gray-300">
//           Welcome back, {user.email}. Here&apos;s whatcs happening with your site.
//         </p>
//       </div>

//       {/* Stats Grid */}
//       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
//         {statCards.map((stat) => {
//           const Icon = stat.icon
//           return (
//             <Card key={stat.title}>
//               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                 <CardTitle className="text-sm font-medium">
//                   {stat.title}
//                 </CardTitle>
//                 <Icon className="h-4 w-4 text-muted-foreground" />
//               </CardHeader>
//               <CardContent>
//                 <div className="text-2xl font-bold">{stat.value}</div>
//                 <p className="text-xs text-muted-foreground">
//                   {stat.description}
//                 </p>
//                 <p className="text-xs text-green-600 dark:text-green-400 mt-1">
//                   {stat.trend}
//                 </p>
//               </CardContent>
//             </Card>
//           )
//         })}
//       </div>

//       {/* Quick Actions */}
//       <div className="grid gap-4 md:grid-cols-2">
//         <Card>
//           <CardHeader>
//             <CardTitle>Quick Actions</CardTitle>
//             <CardDescription>
//               Frequently used admin tasks
//             </CardDescription>
//           </CardHeader>
//           <CardContent className="space-y-2">
//             <div className="grid grid-cols-2 gap-2">
//               <Card className="p-4 hover:bg-gray-800 cursor-pointer transition-colors">
//                 <div className="text-center">
//                   <FileText className="h-6 w-6 mx-auto mb-2 text-blue-600" />
//                   <p className="text-sm font-medium">New Article</p>
//                 </div>
//               </Card>
//               <Card className="p-4  hover:bg-gray-800 cursor-pointer transition-colors">
//                 <div className="text-center">
//                   <Video className="h-6 w-6 mx-auto mb-2 text-purple-600" />
//                   <p className="text-sm font-medium">Add Video</p>
//                 </div>
//               </Card>
//               <Card className="p-4  hover:bg-gray-800 cursor-pointer transition-colors">
//                 <div className="text-center">
//                   <Camera className="h-6 w-6 mx-auto mb-2 text-green-600" />
//                   <p className="text-sm font-medium">Upload Photo</p>
//                 </div>
//               </Card>
//               <Card className="p-4  hover:bg-gray-800 cursor-pointer transition-colors">
//                 <div className="text-center">
//                   <Activity className="h-6 w-6 mx-auto mb-2 text-orange-600" />
//                   <p className="text-sm font-medium">News Ticker</p>
//                 </div>
//               </Card>
//             </div>
//           </CardContent>
//         </Card>

//             </div>
//     </div>
//   )
// }




//  {/* <Card>
//           <CardHeader>
//             <CardTitle>Recent Activity</CardTitle>
//             <CardDescription>
//               Latest changes to your content
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-4">
//               <div className="flex items-center">
//                 <div className="w-2 h-2 bg-blue-600 rounded-full mr-4"></div>
//                 <div className="flex-1">
//                   <p className="text-sm font-medium">New article published</p>
//                   <p className="text-xs text-muted-foreground">2 hours ago</p>
//                 </div>
//               </div>
//               <div className="flex items-center">
//                 <div className="w-2 h-2 bg-green-600 rounded-full mr-4"></div>
//                 <div className="flex-1">
//                   <p className="text-sm font-medium">Photo gallery updated</p>
//                   <p className="text-xs text-muted-foreground">1 day ago</p>
//                 </div>
//               </div>
//               <div className="flex items-center">
//                 <div className="w-2 h-2 bg-purple-600 rounded-full mr-4"></div>
//                 <div className="flex-1">
//                   <p className="text-sm font-medium">Video added to gallery</p>
//                   <p className="text-xs text-muted-foreground">3 days ago</p>
//                 </div>
//               </div>
//             </div>
//           </CardContent>
//         </Card> */}
 