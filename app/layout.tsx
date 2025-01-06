import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/toaster'
import { cn } from '@/lib/utils'
import './globals.css'
import { GeistSans } from 'geist/font/sans'
import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ModeToggle } from '@/components/mode-toggle'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'PasteBin - Share Code Snippets',
  description: 'A modern, secure pastebin for sharing code snippets and text online.',
  keywords: 'pastebin, code sharing, text sharing, developer tools',
  authors: [{ name: 'Saikothasan' }],
  manifest: '/site.webmanifest',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-96x96.png',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://innv.vercel.app',
    siteName: 'PasteBin',
    images: [
      {
        url: 'https://innv.vercel.app/web-app-manifest-512x512.png',
        width: 1200,
        height: 630,
        alt: 'PasteBin - Share Code Snippets',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@saikothasan',
    creator: '@saikothasan',
  },
  verification: {
    google: 'VFOQfy__erVvmj4v6M9wXQ7kfOrsIephtjouoPrg3NE',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(
        "min-h-screen bg-background font-sans antialiased",
        inter.className,
        GeistSans.className
      )}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="bg-primary text-primary-foreground p-2 text-center">
            <Link href="https://t.me/drkingbd" target="_blank" rel="noopener noreferrer">
              Join our Telegram community!
            </Link>
          </div>
          <header className="border-b">
            <nav className="container mx-auto px-4 py-2 flex items-center justify-between">
              <Link href="/" className="text-2xl font-bold">
                PasteBin
              </Link>
              <div className="space-x-4">
                <Button variant="ghost" asChild>
                  <Link href="/about">About</Link>
                </Button>
                <Button variant="ghost" asChild>
                  <Link href="/docs">Docs</Link>
                </Button>
                <ModeToggle />
              </div>
            </nav>
          </header>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}

