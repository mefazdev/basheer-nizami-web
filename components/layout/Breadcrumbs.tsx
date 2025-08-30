"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

const routeLabels: Record<string, string> = {
  "/admin": "Dashboard",
  "/admin/news-tickers": "News Tickers",
  "/admin/articles": "Articles",
  "/admin/updates": "Updates",
  "/admin/videos": "Videos",
  "/admin/photos": "Photos",
  "/admin/publications": "Publications",
  "/admin/settings": "Settings",
};

export function Breadcrumbs() {
  const pathname = usePathname();

  // Don't show breadcrumbs on dashboard home
  if (pathname === "/admin") {
    return null;
  }

  const pathSegments = pathname.split("/").filter(Boolean);
  const breadcrumbs = [];

  // Add home breadcrumb
  breadcrumbs.push({
    label: "Dashboard",
    href: "/admin",
    current: false,
  });

  // Build breadcrumbs from path segments
  let currentPath = "";
  for (let i = 0; i < pathSegments.length; i++) {
    currentPath += `/${pathSegments[i]}`;

    if (currentPath.startsWith("/admin")) {
      const isLast = i === pathSegments.length - 1;
      const label =
        routeLabels[currentPath] || pathSegments[i].replace("-", " ");

      breadcrumbs.push({
        label: label.charAt(0).toUpperCase() + label.slice(1),
        href: currentPath,
        current: isLast,
      });
    }
  }

  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol role="list" className="flex items-center space-x-4">
        <li>
          <div>
            <Link
              href="/admin"
              className="text-gray-400  dark:hover:text-gray-300"
              aria-label="Dashboard home"
            >
              <Home className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
              <span className="sr-only">Dashboard</span>
            </Link>
          </div>
        </li>

        {breadcrumbs.slice(1).map((breadcrumb) => (
          <li key={breadcrumb.href}>
            <div className="flex items-center">
              <ChevronRight
                className="h-5 w-5 flex-shrink-0 text-gray-400"
                aria-hidden="true"
              />
              {breadcrumb.current ? (
                <span
                  className="ml-4 text-sm font-medium text-gray-500 dark:text-gray-400"
                  aria-current="page"
                >
                  {breadcrumb.label}
                </span>
              ) : (
                <Link
                  href={breadcrumb.href}
                  className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  {breadcrumb.label}
                </Link>
              )}
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
}
