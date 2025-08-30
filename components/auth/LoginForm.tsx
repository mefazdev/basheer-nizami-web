'use client'

import { useState, useTransition } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Eye, EyeOff, Loader2 } from 'lucide-react'

 
// import { Label } from '@/components/ui/label'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/Form'
 import { createClient } from '@/lib/supabase/client'
import { Input } from '../ui/Input'
import { Button } from '../ui/Button'
import { useToast } from '../ui/UseToast'

const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(6, 'Password must be at least 6 characters'),
})

type LoginFormData = z.infer<typeof loginSchema>

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (data: LoginFormData) => {
    
    startTransition(async () => {
      try {
        const supabase = createClient()
        
        const { data: authData, error } = await supabase.auth.signInWithPassword({
          email: data.email,
          password: data.password,
        })

        if (error) {
          // Handle specific auth errors with user-friendly messages
          let errorMessage = 'Failed to sign in. Please try again.'
          
          if (error.message.includes('Invalid login credentials')) {
            errorMessage = 'Invalid email or password. Please check your credentials and try again.'
          } else if (error.message.includes('Email not confirmed')) {
            errorMessage = 'Please check your email and click the confirmation link before signing in.'
          } else if (error.message.includes('Too many requests')) {
            errorMessage = 'Too many login attempts. Please wait a moment before trying again.'
          }

          toast({
            title: 'Authentication Error',
            description: errorMessage,
            variant: 'destructive',
          })
          return
        }

        if (!authData.user) {
          toast({
            title: 'Authentication Error',
            description: 'No user data received. Please try again.',
            variant: 'destructive',
          })
          return
        }
 
        // Check if user has admin role
        // const userRole = authData.user.user_metadata?.role || authData.user.app_metadata?.role
       const userRole = authData.user.app_metadata.role
       console.log(authData.user.app_metadata.role)
       console.log(userRole)
        if (userRole !== 'admin') {
          // alert('hiii')
          // Sign out the user if they don't have admin access
          await supabase.auth.signOut()
          toast({
            title: 'Access Denied',
            description: 'You do not have permission to access the admin dashboard.',
            variant: 'destructive',
          })
          return
        }

        toast({
          title: 'Welcome back!',
          description: 'You have successfully signed in.',
        })

        // Redirect to the intended page or admin dashboard
        const redirectTo = searchParams.get('redirectTo')
        const targetUrl = redirectTo && redirectTo.startsWith('/admin') 
          ? redirectTo 
          : '/admin'
        
        router.push(targetUrl)
        router.refresh()
      } catch (error) {
        console.error('Login error:', error)
        toast({
          title: 'Unexpected Error',
          description: 'An unexpected error occurred. Please try again later.',
          variant: 'destructive',
        })
      }
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="email"
                  placeholder="admin@example.com"
                  disabled={isPending}
                  autoComplete="email"
                  aria-describedby={form.formState.errors.email ? `email-error` : undefined}
                />
              </FormControl>
              <FormMessage id="email-error" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    {...field}
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    disabled={isPending}
                    autoComplete="current-password"
                    aria-describedby={form.formState.errors.password ? `password-error` : undefined}
                    className="pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isPending}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" aria-hidden="true" />
                    ) : (
                      <Eye className="h-4 w-4" aria-hidden="true" />
                    )}
                  </Button>
                </div>
              </FormControl>
              <FormMessage id="password-error" />
            </FormItem>
          )}
        />

        <Button 
          type="submit" 
          className="w-full" 
          disabled={isPending}
          aria-describedby={isPending ? 'loading-message' : undefined}
        >
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
              <span id="loading-message">Signing in...</span>
            </>
          ) : (
            'Sign In'
          )}
        </Button>

        {/* <div className="text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Having trouble signing in? Contact your administrator.
          </p>
        </div> */}
      </form>
    </Form>
  )
}