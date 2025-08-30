


export function getYouTubeThumbnailUrl(videoId: string, quality: 'default' | 'mqdefault' | 'hqdefault' | 'sddefault' | 'maxresdefault' = 'hqdefault'): string {
  return `https://img.youtube.com/vi/${videoId}/${quality}.jpg`
}

export function getYouTubeEmbedUrl(videoId: string): string {
  return `https://www.youtube.com/embed/${videoId}`
}

export function getYouTubeWatchUrl(videoId: string): string {
  return `https://www.youtube.com/watch?v=${videoId}`
}

export function extractYouTubeVideoId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/v\/)([^&\n?#]+)/,
    /^([a-zA-Z0-9_-]{11})$/
  ]
  
  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match && match[1]) {
      return match[1]
    }
  }
  
  return null
}

export function isValidYouTubeVideoId(videoId: string): boolean {
  return /^[a-zA-Z0-9_-]{11}$/.test(videoId)
}

// Client-side fetch for YouTube oEmbed API
export async function fetchYouTubeMetadata(videoId: string) {
  try {
    const response = await fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`)
    
    if (!response.ok) {
      throw new Error('Failed to fetch video metadata')
    }
    
    const data = await response.json()
    
    return {
      title: data.title,
      author_name: data.author_name,
      author_url: data.author_url,
      thumbnail_url: data.thumbnail_url,
      thumbnail_width: data.thumbnail_width,
      thumbnail_height: data.thumbnail_height,
      html: data.html,
    }
  } catch (error) {
    console.error('Error fetching YouTube metadata:', error)
    return null
  }
}

// Server-side YouTube metadata enrichment
export async function enrichVideoMetadata(videoId: string, currentTitle?: string, currentThumbnail?: string) {
  try {
    const response = await fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`)
    
    if (!response.ok) {
      return { title: currentTitle, thumbnail_url: currentThumbnail }
    }
    
    const data = await response.json()
    
    return {
      title: currentTitle || data.title,
      thumbnail_url: currentThumbnail || data.thumbnail_url,
    }
  } catch (error) {
    console.error('Error enriching video metadata:', error)
    return { title: currentTitle, thumbnail_url: currentThumbnail }
  }
}