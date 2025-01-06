import { CopyButton } from "@/components/copy-button"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { getPaste } from "@/lib/actions"
import { formatDistanceToNow } from "date-fns"
import { ArrowLeft, Clock, Code2, Globe, Lock } from 'lucide-react'
import Link from "next/link"
import { notFound } from "next/navigation"
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

export default async function PastePage({
  params
}: {
  params: { id: string }
}) {
  let paste
  try {
    paste = await getPaste(params.id)
  } catch (error) {
    notFound()
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container max-w-5xl py-8 px-4 md:py-10 space-y-8">
        <div className="flex flex-wrap items-center gap-4">
          <Link href="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold tracking-tight">
            {paste.title || 'Untitled Paste'}
          </h1>
          <div className="ml-auto flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>
                {formatDistanceToNow(new Date(paste.createdAt), {
                  addSuffix: true,
                })}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Code2 className="h-4 w-4" />
              <span>{paste.language}</span>
            </div>
            {paste.isPrivate ? (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Lock className="h-4 w-4" />
                <span>Private</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Globe className="h-4 w-4" />
                <span>Public</span>
              </div>
            )}
            <CopyButton value={paste.content} />
          </div>
        </div>
        <Card className="overflow-hidden">
          <SyntaxHighlighter
            language={paste.language}
            style={oneDark}
            showLineNumbers
            customStyle={{
              margin: 0,
              borderRadius: 0,
              background: 'transparent',
            }}
          >
            {paste.content}
          </SyntaxHighlighter>
        </Card>
      </main>
    </div>
  )
}

