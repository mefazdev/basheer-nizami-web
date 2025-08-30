import { Metadata } from 'next'
import Link from 'next/link'
import { AlertTriangle, ArrowLeft } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
 
 
export const metadata: Metadata = {
  title: 'Unauthorized Access',
  description: 'You do not have permission to access this resource',
}

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/20">
              <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400" aria-hidden="true" />
            </div>
            <CardTitle className="mt-4 text-2xl font-bold">
              Access Denied
            </CardTitle>
            <CardDescription>
              You do not have permission to access this resource
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
              The page you are trying to access requires administrator privileges. 
              If you believe this is an error, please contact your system administrator.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild variant="outline" className="flex-1">
                <Link href="/login">
                  <ArrowLeft className="mr-2 h-4 w-4" aria-hidden="true" />
                  Back to Login
                </Link>
              </Button>
              
              <Button asChild className="flex-1">
                <Link href="/">
                  Go to Homepage
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}