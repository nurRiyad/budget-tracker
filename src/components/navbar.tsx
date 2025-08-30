"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Wallet, BarChart3, User } from "lucide-react"

const publicNavigationItems = [
  {
    title: "About",
    href: "/about",
    icon: User,
  },
]

const authenticatedNavigationItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: BarChart3,
  },
  {
    title: "About",
    href: "/about",
    icon: User,
  },
]

export function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2">
              <Wallet className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold">BudgetTracker</span>
            </Link>
          </div>

          {/* Navigation Menu */}
          <div className="hidden md:block">
            <NavigationMenu>
              <NavigationMenuList>
                <SignedOut>
                  {publicNavigationItems.map((item) => {
                    const isActive = pathname === item.href
                    return (
                      <NavigationMenuItem key={item.href}>
                          <NavigationMenuLink asChild
                            className={`${navigationMenuTriggerStyle()} ${
                              isActive ? "bg-accent text-accent-foreground" : ""
                            }`}
                          >
                          <Link href={item.href}>{item.title}</Link>
                          </NavigationMenuLink>
                      </NavigationMenuItem>
                    )
                  })}
                </SignedOut>
                
                <SignedIn>
                  {authenticatedNavigationItems.map((item) => {
                    const isActive = pathname === item.href
                    return (
                      <NavigationMenuItem key={item.href}>
                          <NavigationMenuLink asChild
                            className={`${navigationMenuTriggerStyle()} ${
                              isActive ? "bg-accent text-accent-foreground" : ""
                            }`}
                          >
                          <Link href={item.href}>{item.title}</Link>
                          </NavigationMenuLink>
                      </NavigationMenuItem>
                    )
                  })}
                </SignedIn>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Auth Section */}
          <div className="flex items-center space-x-4">
            <SignedOut>
              <SignInButton mode="modal">
                <Button variant="ghost" size="sm">
                  Sign In
                </Button>
              </SignInButton>
              <SignUpButton mode="modal">
                <Button size="sm">
                  Sign Up
                </Button>
              </SignUpButton>
            </SignedOut>
            
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </div>
      </div>
    </nav>
  )
}
