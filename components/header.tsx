import { ModeToggle } from '@/components/mode-toggle'
import { Button } from '@/components/ui/button'
import { Github } from 'lucide-react'
import Link from 'next/link'

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-5xl items-center">
        <Link href="/" className="font-bold text-xl mr-6">
          Paste<span className="text-primary">Bin</span>
        </Link>
        <nav className="flex items-center gap-2 text-sm">
          <Link href="/about">
            <Button variant="ghost" size="sm">About</Button>
          </Link>
          <Link href="/docs">
            <Button variant="ghost" size="sm">Docs</Button>
          </Link>
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <ModeToggle />
          <Link href="https://github.com/saikothasan/invention">
            <Button variant="ghost" size="icon">
              <Github className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}

