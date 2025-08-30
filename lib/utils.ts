import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { format, formatDistanceToNow, parseISO } from "date-fns"
import { createHash } from "crypto"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string | Date, pattern = "MMM dd, yyyy") {
  const dateObj = typeof date === "string" ? parseISO(date) : date
  return format(dateObj, pattern)
}

export function formatRelativeDate(date: string | Date) {
  const dateObj = typeof date === "string" ? parseISO(date) : date
  return formatDistanceToNow(dateObj, { addSuffix: true })
}

export function hashIP(ip: string, secret: string, day?: string): string {
  const dateStr = day || new Date().toISOString().split('T')[0]
  return createHash('sha256')
    .update(`${ip}${secret}${dateStr}`)
    .digest('hex')
}

export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength).replace(/\s+\S*$/, "") + "..."
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map(word => word.charAt(0))
    .join("")
    .toUpperCase()
    .slice(0, 2)
}

export function formatFileSize(bytes: number): string {
  const sizes = ["B", "KB", "MB", "GB"] as const
  if (bytes === 0) return "0 B"
  const i = Math.floor(Math.log(bytes) / Math.log(1024))
  return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${sizes[i]}`
}

export function debounce<T extends (...args: unknown[]) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

export function isValidUUID(uuid: string): boolean {
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
  return uuidRegex.test(uuid)
}

export function isValidYouTubeId(id: string): boolean {
  const youtubeRegex = /^[A-Za-z0-9_-]{11}$/
  return youtubeRegex.test(id)
}

export function getYouTubeThumbnail(
  videoId: string,
  quality: "default" | "hqdefault" | "maxresdefault" = "hqdefault"
): string {
  return `https://img.youtube.com/vi/${videoId}/${quality}.jpg`
}

// --- Additional Helpers ---

export function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = seconds % 60

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`
  } else {
    return `${minutes}:${secs.toString().padStart(2, "0")}`
  }
}

export function parseDuration(durationString: string): number | null {
  const parts = durationString.split(":").map(Number)

  if (parts.length === 2) {
    // MM:SS
    const [minutes, seconds] = parts
    return minutes * 60 + seconds
  } else if (parts.length === 3) {
    // HH:MM:SS
    const [hours, minutes, seconds] = parts
    return hours * 3600 + minutes * 60 + seconds
  }

  return null
}


// import { type ClassValue, clsx } from "clsx"
// import { twMerge } from "tailwind-merge"
// import { format, formatDistanceToNow, parseISO } from "date-fns"
// import { createHash } from "crypto"

// export function cn(...inputs: ClassValue[]) {
//   return twMerge(clsx(inputs))
// }

// export function formatDate(date: string | Date, pattern = "MMM dd, yyyy") {
//   const dateObj = typeof date === "string" ? parseISO(date) : date
//   return format(dateObj, pattern)
// }

// export function formatRelativeDate(date: string | Date) {
//   const dateObj = typeof date === "string" ? parseISO(date) : date
//   return formatDistanceToNow(dateObj, { addSuffix: true })
// }

// export function hashIP(ip: string, secret: string, day?: string): string {
//   const dateStr = day || new Date().toISOString().split('T')[0]
//   return createHash('sha256')
//     .update(`${ip}${secret}${dateStr}`)
//     .digest('hex')
// }

// export function generateSlug(text: string): string {
//   return text
//     .toLowerCase()
//     .replace(/[^\w\s-]/g, '')
//     .replace(/[\s_-]+/g, '-')
//     .replace(/^-+|-+$/g, '')
// }

// export function truncateText(text: string, maxLength: number): string {
//   if (text.length <= maxLength) return text
//   return text.slice(0, maxLength).replace(/\s+\S*$/, '') + '...'
// }

// export function getInitials(name: string): string {
//   return name
//     .split(' ')
//     .map(word => word.charAt(0))
//     .join('')
//     .toUpperCase()
//     .slice(0, 2)
// }

// export function formatFileSize(bytes: number): string {
//   const sizes = ['B', 'KB', 'MB', 'GB']
//   if (bytes === 0) return '0 B'
//   const i = Math.floor(Math.log(bytes) / Math.log(1024))
//   return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${sizes[i]}`
// }

// export function debounce<T extends (...args: any[]) => any>(
//   func: T,
//   wait: number
// ): (...args: Parameters<T>) => void {
//   let timeout: NodeJS.Timeout
//   return (...args: Parameters<T>) => {
//     clearTimeout(timeout)
//     timeout = setTimeout(() => func(...args), wait)
//   }
// }

// export function isValidUUID(uuid: string): boolean {
//   const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
//   return uuidRegex.test(uuid)
// }

// export function isValidYouTubeId(id: string): boolean {
//   const youtubeRegex = /^[A-Za-z0-9_-]{11}$/
//   return youtubeRegex.test(id)
// }

// export function getYouTubeThumbnail(videoId: string, quality: 'default' | 'hqdefault' | 'maxresdefault' = 'hqdefault'): string {
//   return `https://img.youtube.com/vi/${videoId}/${quality}.jpg`
// }




// // Add to existing lib/utils.ts
// export function formatDuration(seconds: number): string {
//   const hours = Math.floor(seconds / 3600)
//   const minutes = Math.floor((seconds % 3600) / 60)
//   const secs = seconds % 60

//   if (hours > 0) {
//     return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
//   } else {
//     return `${minutes}:${secs.toString().padStart(2, '0')}`
//   }
// }

// export function parseDuration(durationString: string): number | null {
//   const parts = durationString.split(':').map(Number)
  
//   if (parts.length === 2) {
//     // MM:SS format
//     const [minutes, seconds] = parts
//     return minutes * 60 + seconds
//   } else if (parts.length === 3) {
//     // HH:MM:SS format
//     const [hours, minutes, seconds] = parts
//     return hours * 3600 + minutes * 60 + seconds
//   }
  
//   return null
// }


