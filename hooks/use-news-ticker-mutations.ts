'use client'

import { useState, useTransition } from 'react'
import { useToast } from '@/components/ui/UseToast'
import { createNewsTicker, updateNewsTicker, deleteNewsTicker } from '@/lib/actions/news-ticker'
// import type { NewsTicker } from '@/lib/types'

interface UseMutationsReturn {
  createTicker: (data: FormData) => Promise<boolean>
  updateTicker: (id: string, data: FormData) => Promise<boolean>
  deleteTicker: (id: string) => Promise<boolean>
  isCreating: boolean
  isUpdating: boolean
  isDeleting: boolean
}

export function useNewsTickerMutations(onSuccess?: () => void): UseMutationsReturn {
  const [isPending, startTransition] = useTransition()
  const [currentOperation, setCurrentOperation] = useState<'create' | 'update' | 'delete' | null>(null)
  const { toast } = useToast()

  const createTicker = async (formData: FormData): Promise<boolean> => {
    return new Promise((resolve) => {
      setCurrentOperation('create')
      startTransition(async () => {
        try {
          const result = await createNewsTicker(formData)
          
          if (result.success) {
            toast({
              title: 'Success',
              description: 'News ticker created successfully',
            })
            onSuccess?.()
            resolve(true)
          } else {
            toast({
              title: 'Error',
              description: result.error || 'Failed to create news ticker',
              variant: 'destructive',
            })
            resolve(false)
          }
        } catch (error) {
          toast({
            title: 'Error',
            description: 'An unexpected error occurred',
            variant: 'destructive',
          })
          resolve(false)
        } finally {
          setCurrentOperation(null)
        }
      })
    })
  }

  const updateTicker = async (id: string, formData: FormData): Promise<boolean> => {
    return new Promise((resolve) => {
      setCurrentOperation('update')
      startTransition(async () => {
        try {
          const result = await updateNewsTicker(id, formData)
          
          if (result.success) {
            toast({
              title: 'Success',
              description: 'News ticker updated successfully',
            })
            onSuccess?.()
            resolve(true)
          } else {
            toast({
              title: 'Error',
              description: result.error || 'Failed to update news ticker',
              variant: 'destructive',
            })
            resolve(false)
          }
        } catch (error) {
          toast({
            title: 'Error',
            description: 'An unexpected error occurred',
            variant: 'destructive',
          })
          resolve(false)
        } finally {
          setCurrentOperation(null)
        }
      })
    })
  }

  const deleteTicker = async (id: string): Promise<boolean> => {
    return new Promise((resolve) => {
      setCurrentOperation('delete')
      startTransition(async () => {
        try {
          const result = await deleteNewsTicker(id)
          
          if (result.success) {
            toast({
              title: 'Success',
              description: 'News ticker deleted successfully',
            })
            onSuccess?.()
            resolve(true)
          } else {
            toast({
              title: 'Error',
              description: result.error || 'Failed to delete news ticker',
              variant: 'destructive',
            })
            resolve(false)
          }
        } catch (error) {
          toast({
            title: 'Error',
            description: 'An unexpected error occurred',
            variant: 'destructive',
          })
          resolve(false)
        } finally {
          setCurrentOperation(null)
        }
      })
    })
  }

  return {
    createTicker,
    updateTicker,
    deleteTicker,
    isCreating: isPending && currentOperation === 'create',
    isUpdating: isPending && currentOperation === 'update',
    isDeleting: isPending && currentOperation === 'delete',
  }
}