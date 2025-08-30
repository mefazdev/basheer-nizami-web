// import { Metadata } from "next";
// import { LoginForm } from "@/components/auth/LoginForm";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/Card";

// export const metadata: Metadata = {
//   title: "Login",
//   description: "Sign in to access the admin dashboard",
// };

// export default function LoginPage() {
//   return (
//     <div className="min-h-screen flex items-center justify-center  bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full space-y-8">
//         <div className="text-center">
//           <h1 className="text-3xl font-bold tracking-tight  text-gray-100">
//             Admin Dashboard
//           </h1>
//           <p className="mt-2 text-sm  text-gray-400">
//             Sign in to your admin account
//           </p>
//         </div>

//         <Card>
//           <CardHeader>
//             <CardTitle>Sign In</CardTitle>
//             <CardDescription>
//               Enter your email and password to access the dashboard
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <LoginForm />
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }
import { Metadata } from "next";
import { Suspense } from "react";
import { LoginForm } from "@/components/auth/LoginForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "Login",
  description: "Sign in to access the admin dashboard",
};

function LoginFormFallback() {
  return (
    <div className="space-y-4">
      <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
      <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
      <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-100">
            Admin Dashboard
          </h1>
          <p className="mt-2 text-sm text-gray-400">
            Sign in to your admin account
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>
              Enter your email and password to access the dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Suspense fallback={<LoginFormFallback />}>
              <LoginForm />
            </Suspense>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
