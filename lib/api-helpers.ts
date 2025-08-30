import { NextRequest, NextResponse } from 'next/server'
import { ZodError } from 'zod'
import { requireAdmin } from '@/lib/auth'
import { ApiResponse } from '@/lib/types'

export function handleError(error: unknown): NextResponse<ApiResponse> {
  console.error('API Error:', error)
  
  if (error instanceof ZodError) {
    return NextResponse.json(
      {
        success: false,
        error: 'Validation error',
        // message: error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', '),
      },
      { status: 400 }
    )
  }
  
  if (error instanceof Error) {
    // Don't expose internal error messages in production
    const message = process.env.NODE_ENV === 'development' 
      ? error.message 
      : 'Internal server error'
      
    return NextResponse.json(
      {
        success: false,
        error: 'Server error',
        message,
      },
      { status: 500 }
    )
  }
  
  return NextResponse.json(
    {
      success: false,
      error: 'Unknown error',
      message: 'An unexpected error occurred',
    },
    { status: 500 }
  )
}

export async function withAuth<T>(
  request: NextRequest,
  handler: (userId: string) => Promise<NextResponse<T>>
): Promise<NextResponse<T | ApiResponse>> {
  try {
    const user = await requireAdmin()
    return await handler(user.id)
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: 'Unauthorized',
        message: 'Admin access required',
      },
      { status: 401 }
    )
  }
}

export function successResponse<T>(data: T, message?: string): NextResponse<ApiResponse<T>> {
  return NextResponse.json({
    success: true,
    data,
    message,
  })
}

export function notFoundResponse(message = 'Resource not found'): NextResponse<ApiResponse> {
  return NextResponse.json(
    {
      success: false,
      error: 'Not found',
      message,
    },
    { status: 404 }
  )
}