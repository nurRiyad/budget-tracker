"use client"

import { Button } from "@/components/ui/button"
import { SignedIn, SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@clerk/nextjs"

export default function Home() {
  const { isSignedIn, isLoaded } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.push('/dashboard')
    }
  }, [isLoaded, isSignedIn, router])

  if (isLoaded && isSignedIn) {
    return null // Will redirect
  }

  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold tracking-tight mb-6">
          Welcome to BudgetTracker
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Take control of your finances with our powerful budget tracking tools. 
          Monitor expenses, set goals, and achieve financial freedom.
        </p>
        
        <SignedOut>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <SignInButton mode="modal">
              <Button size="lg" variant="outline">
                Sign In
              </Button>
            </SignInButton>
            <SignUpButton mode="modal">
              <Button size="lg">
                Get Started
              </Button>
            </SignUpButton>
          </div>
        </SignedOut>
      </div>
    </div>
  )
}