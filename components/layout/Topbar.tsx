"use client";
// import { useState } from "react";
// import { useTheme } from "next-themes";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/DropdownMenu";
import {
  getUserDisplayName,
  getUserInitials,
  getUserRole,
  type AuthUser,
} from "@/lib/auth";
import { LogoutButton } from "../auth/LogoutButton";

import { Button } from "../ui/Button";

interface TopbarProps {
  user: AuthUser;
}

export function Topbar({ user }: TopbarProps) {
  // const [searchQuery, setSearchQuery] = useState("");
  // const { theme, setTheme } = useTheme();

  // const handleSearch = (e: React.FormEvent) => {
  //   e.preventDefault()
  //   if (searchQuery.trim()) {
  //     // TODO: Implement search functionality
  //     console.log('Search query:', searchQuery)
  //   }
  // }

  // const themeOptions = [
  //   { value: "light", label: "Light", icon: Sun },
  //   { value: "dark", label: "Dark", icon: Moon },
  //   { value: "system", label: "System", icon: Monitor },
  // ];

  return (
    <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b  px-4 shadow-sm border-gray-700 bg-gray-900 sm:gap-x-6 sm:px-6 lg:px-8">
      {/* Search */}
      {/* <form onSubmit={handleSearch} className="flex flex-1 max-w-lg">
        <label htmlFor="search-field" className="sr-only">
          Search
        </label>
        <div className="relative w-full">
          <Search 
            className="pointer-events-none    absolute inset-y-0 left-0 h-full  text-gray-400" 
            aria-hidden="true" 
          />
          <Input
            id="search-field"
            className="block h-full w-full border-0 py-0 pl-8 pr-0   placeholder:text-gray-400 focus:ring-0  text-white sm:text-sm"
            placeholder="Search..."
            type="search"
            name="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </form> */}

      {/* Right side items */}
      <div className="flex items-center justify-end gap-x-4 lg:gap-x-6  w-full ">
        {/* Theme toggle */}
        {/* <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              size="sm"
              aria-label="Toggle theme"
              className="h-9 w-9 px-0"
            >
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Theme</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {themeOptions.map((option) => {
              const Icon = option.icon
              return (
                <DropdownMenuItem
                  key={option.value}
                  onClick={() => setTheme(option.value)}
                  className="cursor-pointer"
                >
                  <Icon className="mr-2 h-4 w-4" />
                  {option.label}
                  {theme === option.value && (
                    <span className="ml-auto text-xs">✓</span>
                  )}
                </DropdownMenuItem>
              )
            })}
          </DropdownMenuContent>
        </DropdownMenu> */}

        {/* Separator */}
        {/* <div className="hidden lg:block lg:h-6 lg:w-px  lg:bg-gray-700" aria-hidden="true" /> */}

        {/* User menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex items-center gap-x-2 text-sm font-semibold  text-white"
              aria-label="User menu"
            >
              <span className="sr-only">Open user menu</span>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-sm font-medium text-white">
                {getUserInitials(user)}
              </div>
              <span className="hidden lg:flex lg:items-center">
                <span className="ml-2 text-sm font-semibold leading-6  text-white">
                  {getUserDisplayName(user)?.slice(0, 5)}
                </span>
                <ChevronDown
                  className="ml-2 h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-56 bg-blue-50 border-blue-100"
            align="end"
            forceMount
          >
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">
                  {getUserDisplayName(user)?.slice(0, 5)}
                </p>
                <p className="text-xs leading-none text-muted-foreground">
                  {user.email}
                </p>
                <p className="text-xs leading-none text-muted-foreground">
                  {getUserRole(user)}
                </p>
              </div>
            </DropdownMenuLabel>
            {/* <DropdownMenuSeparator />
            <DropdownMenuItem disabled className="cursor-default">
              <User className="mr-2 h-4 w-4" />
              <span>Profile Settings</span>
              <span className="ml-auto text-xs text-muted-foreground">Soon</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator /> */}
            <DropdownMenuItem asChild>
              <LogoutButton
                variant="ghost"
                className="w-full justify-start px-2 py-1.5 h-auto font-normal"
                showIcon
              >
                Sign Out
              </LogoutButton>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
