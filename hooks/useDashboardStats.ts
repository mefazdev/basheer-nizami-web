// // hooks/useDashboardStats.ts
// import { useState, useEffect } from 'react';
// import { useArticles } from '@/hooks/sanity/useArticles';
// import { useUpdates } from '@/hooks/sanity/useUpdates';
// import { useNewsTickersData } from './use-news-tickers-data';
// import { usePublicationsData } from './use-publications-data';
// import { usePhotosData } from './use-photos-data';
// import { useVideosData } from './use-videos-data';

// // Import your existing API hooks
// // You'll need to adjust these import paths based on your project structure
// // import { useNewsTickersData } from '@/hooks/useNewsTickersData';
// // import { usePhotosData } from '@/hooks/usePhotosData';
// // import { usePublicationsData } from '@/hooks/usePublicationsData';
// // import { useVideosData } from '@/hooks/useVideosData';

// interface DashboardStats {
//   totalArticles: number;
//   totalUpdates: number;
//   totalVideos: number;
//   totalPhotos: number;
//   totalPublications: number;
//   activeNewsItems: number;
//   loading: boolean;
//   error: string | null;
// }

// export function useDashboardStats(): DashboardStats {
//   const [stats, setStats] = useState<DashboardStats>({
//     totalArticles: 0,
//     totalUpdates: 0,
//     totalVideos: 0,
//     totalPhotos: 0,
//     totalPublications: 0,
//     activeNewsItems: 0,
//     loading: true,
//     error: null,
//   });

//   // Fetch articles (already working)
//   const { articles, loading: articlesLoading, error: articlesError } = useArticles();
  
//   // Fetch updates (already working)
//   const { updates, loading: updatesLoading, error: updatesError } = useUpdates();

//   // Fetch other data - you'll need to uncomment and adjust these based on your hooks
 
//   const { data: newsTickersData, isLoading: newsLoading, error: newsError } = useNewsTickersData({
//     page: 1,
//     search: '',
//     status: undefined,
//   });

//   const { data: photosData, isLoading: photosLoading, error: photosError } = usePhotosData({
//     page: 1,
//     search: '',
//     category_id: undefined,
//   });

//   const { data: publicationsData, isLoading: publicationsLoading, error: publicationsError } = usePublicationsData({
//     page: 1,
//     search: '',
//     category_id: undefined,
//     year: undefined,
//   });

//   const { data: videosData, isLoading: videosLoading, error: videosError } = useVideosData({
//     page: 1,
//     search: '',
//     category_id: undefined,
//     published: undefined,
//   });
 

//   useEffect(() => {
//     // Check if all data is loaded
//     const allLoading = articlesLoading || updatesLoading;
//     // Add other loading states: || newsLoading || photosLoading || publicationsLoading || videosLoading

//     // Check for errors
//     const hasError = articlesError || updatesError;
//     // Add other error states: || newsError || photosError || publicationsError || videosError

//     if (!allLoading) {
//       setStats({
//         totalArticles: articles?.length || 0,
//         totalUpdates: updates?.length || 0,
//         // Uncomment and adjust these based on your API response structure:
//         // totalVideos: videosData?.data?.length || videosData?.total || 0,
//         // totalPhotos: photosData?.data?.length || photosData?.total || 0,
//         // totalPublications: publicationsData?.data?.length || publicationsData?.total || 0,
//         // activeNewsItems: newsTickersData?.data?.filter(item => item.status === 'active')?.length || 0,
        
//         // Temporary static values - replace with real data above
//         totalVideos: 28,
//         totalPhotos: 156,
//         totalPublications: 12,
//         activeNewsItems: 3,
        
//         loading: false,
//         error: hasError ? 'Error loading dashboard data' : null,
//       });
//     } else {
//       setStats(prev => ({ ...prev, loading: true }));
//     }
//   }, [
//     articles, articlesLoading, articlesError,
//     updates, updatesLoading, updatesError,
//     // Add other dependencies:
//     // newsTickersData, newsLoading, newsError,
//     // photosData, photosLoading, photosError,
//     // publicationsData, publicationsLoading, publicationsError,
//     // videosData, videosLoading, videosError,
//   ]);

//   return stats;
// }

// // Alternative: Individual stat hooks for better performance
// export function useArticleCount() {
//   const { articles, loading, error } = useArticles();
//   return {
//     count: articles?.length || 0,
//     loading,
//     error,
//   };
// }

// export function useUpdateCount() {
//   const { updates, loading, error } = useUpdates();
//   return {
//     count: updates?.length || 0,
//     loading,
//     error,
//   };
// }

// // Add more individual hooks as needed
 
// export function useVideoCount() {
//   const { data, isLoading, error } = useVideosData({
//     page: 1,
//     search: '',
//     category_id: undefined,
//     published: undefined,
//   });
  
//   return {
//     count: data?.data?.length || 0,
//     loading: isLoading,
//     error,
//   };
// }




// export function usePhotoCount() {
//   const { data, isLoading, error } = usePhotosData({
//     page: 1,
//     search: '',
//     category_id: undefined,
//   });
  
//   return {
//     count: data?.data?.length   || 0,
//     loading: isLoading,
//     error,
//   };
// }

// export function usePublicationCount() {
//   const { data, isLoading, error } = usePublicationsData({
//     page: 1,
//     search: '',
//     category_id: undefined,
//     year: undefined,
//   });
  
//   return {
//     count: data?.data?.length || data?.total || 0,
//     loading: isLoading,
//     error,
//   };
// }

// export function useActiveNewsCount() {
//   const { data, isLoading, error } = useNewsTickersData({
//     page: 1,
//     search: '',
//     status: 'active',
//   });
  
//   return {
//     count: data?.data?.length || 0,
//     loading: isLoading,
//     error,
//   };
// }
 


// dfafasfd?\
// dfdffs