'use client'

import { usePathname } from 'next/navigation'
import Connect from "./connect"
import Developer from "./developer"
import FooterLink from "./footer-link"

export default function Footer() {
  const pathname = usePathname()
  const path = pathname === '/' ? '' : pathname.replace('/', '')

  return (
    <footer className="py-12 border-t border-border bg-muted/30">
      <div className="px-8 container max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {path === 'about' ? null : <Developer />}
          <FooterLink />
          <Connect />
        </div>

        <div className="border-t border-border pt-6 text-center">
          <p className="text-sm text-muted-foreground mb-2">
            © 2020-2024 No Right is reserved. Who cares 🤷‍♂️? It&apos;s
            <a 
              href="https://github.com/nurriyad/blog" 
              target="_blank" 
              rel="nofollow" 
              className="underline hover:text-foreground transition-colors ml-1"
            >
              open source
            </a>
            anyway.
          </p>

          <a href="/rss.xml" aria-label="Website RSS Feed" className="inline-flex items-center justify-center p-2 text-muted-foreground hover:text-foreground transition-colors">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M5 3a1 1 0 000 2c5.523 0 10 4.477 10 10a1 1 0 102 0C17 8.373 11.627 3 5 3z"/>
              <path d="M4 9a1 1 0 011-1 7 7 0 017 7 1 1 0 11-2 0 5 5 0 00-5-5 1 1 0 01-1-1z"/>
              <path d="M3 15a2 2 0 11-4 0 2 2 0 014 0z"/>
            </svg>
          </a>
        </div>
      </div>
    </footer>
  )
}