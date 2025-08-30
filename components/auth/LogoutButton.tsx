'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { LogOut, Loader2 } from 'lucide-react'
 
import { createClient } from '@/lib/supabase/client'
import { Button } from '../ui/Button'
import { useToast } from '../ui/UseToast'

interface LogoutButtonProps {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  className?: string
  showIcon?: boolean
  children?: React.ReactNode
}
 
export function LogoutButton({ 
  variant = 'ghost', 
  size = 'default',
  className,
  showIcon = true,
  children = 'Sign Out'
}: LogoutButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleLogout = async () => {
    setIsLoading(true)
    
    try {
      const supabase = createClient()
      const { error } = await supabase.auth.signOut()
      
      if (error) {
        toast({
          title: 'Error',
          description: 'Failed to sign out. Please try again.',
          variant: 'destructive',
        })
        return
      }

      toast({
        title: 'Signed Out',
        description: 'You have been successfully signed out.',
      })
      
      router.push('/login')
      router.refresh()
    } catch (error) {
      console.error('Logout error:', error)
      toast({
        title: 'Error',
        description: 'An unexpected error occurred.',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      variant={variant}
      size={size}
      className={className}
      onClick={handleLogout}
      disabled={isLoading}
      aria-label="Sign out of your account"
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
      ) : showIcon ? (
        <LogOut className="h-4 w-4" aria-hidden="true" />
      ) : null}
      {size !== 'icon' && (
     <span className={showIcon && (size as string) !== 'icon' ? 'ml-2' : ''}>
  {children}
</span>
      )}
    </Button>
  )
}