import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { User } from '@supabase/supabase-js'
import { cache } from 'react'

export interface AuthUser extends User {
  role?: string
}

export interface SessionData {
  user: AuthUser
  isAdmin: boolean
}

// Cache the user session for the duration of the request
export const getUser = cache(async (): Promise<AuthUser | null> => {
  try {
    const supabase = await createClient()
    const { data: { user }, error } = await supabase?.auth?.getUser()
    
    if (error) {
      console.error('Error getting user:', error)
      return null
    }
    
    if (!user) {
      return null
    }

    return {
      ...user,
      role: user.user_metadata?.role || user.app_metadata?.role
    }
  } catch (error) {
    console.error('Unexpected error getting user:', error)
    return null
  }
})

// Get session data with user and admin status
export const getSession = cache(async (): Promise<SessionData | null> => {
  const user = await getUser()
  
  if (!user) {
    return null
  }

  return {
    user,
    isAdmin: user.role === 'admin'
  }
})

// Require authentication and redirect if not authenticated
export async function requireAuth(): Promise<AuthUser> {
  const user = await getUser()
  
  if (!user) {
    redirect('/login')
  }
  
  return user
}

// Require admin access and redirect if not admin
export async function requireAdmin(): Promise<AuthUser> {
  const user = await requireAuth()
  
  if (user.role !== 'admin') {
    redirect('/unauthorized')
  }
  
  return user
}

// Get session or redirect to login with return path
export async function getSessionOrRedirect(returnPath?: string): Promise<SessionData> {
  const session = await getSession()
  
  if (!session) {
    const loginUrl = returnPath 
      ? `/login?redirectTo=${encodeURIComponent(returnPath)}`
      : '/login'
    redirect(loginUrl)
  }
  
  return session
}

// Get admin session or redirect appropriately
export async function getAdminSessionOrRedirect(returnPath?: string): Promise<SessionData> {
  const session = await getSessionOrRedirect(returnPath)
  
  if (!session.isAdmin) {
    redirect('/unauthorized')
  }
  
  return session
}

// Utility functions for checking user permissions
export function isAdmin(user: AuthUser | null): boolean {
  return user?.role === 'admin'
}

export function isAuthenticated(user: AuthUser | null): boolean {
  return user !== null
}

// Get user initials for display
export function getUserInitials(user: AuthUser): string {
  // Try to get initials from full name
  if (user.user_metadata?.full_name) {
    return user.user_metadata.full_name
      .split(' ')
      .map((name: string) => name.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }
  
  // Try to get initials from first and last name
  if (user.user_metadata?.first_name && user.user_metadata?.last_name) {
    return (user.user_metadata.first_name.charAt(0) + user.user_metadata.last_name.charAt(0)).toUpperCase()
  }
  
  // Fall back to email
  if (user.email) {
    return user.email.charAt(0).toUpperCase()
  }
  
  return 'U'
}

// Get user display name
export function getUserDisplayName(user: AuthUser): string {
  if (user.user_metadata?.full_name) {
    return user.user_metadata.full_name
  }
  
  if (user.user_metadata?.first_name && user.user_metadata?.last_name) {
    return `${user.user_metadata.first_name} ${user.user_metadata.last_name}`
  }
  
  if (user.user_metadata?.first_name) {
    return user.user_metadata.first_name
  }
  
  return user.email || 'User'
}

// Server action for logout (alternative to route handler)
export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/login')
}

// Check if the current request has admin access (for use in Server Components)
export async function checkAdminAccess(): Promise<boolean> {
  const user = await getUser()
  return isAdmin(user)
}

// Get user role string for display
export function getUserRole(user: AuthUser): string {
  switch (user.role) {
    case 'admin':
      return 'Administrator'
    case 'editor':
      return 'Editor'
    default:
      return 'User'
  }
}