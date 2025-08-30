import Link from 'next/link'

export default function FooterLink() {
  return (
    <div className="space-y-4 md:justify-self-center">
      <h3 className="text-xl font-semibold text-foreground">Quick Links</h3>
      <div className="space-y-2">
        <Link href="/" className="block text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">Home</Link>
        <Link href="/dashboard" className="block text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">Dashboard</Link>
        <Link href="/about" className="block text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">About Me</Link>
      </div>
    </div>
  )
}