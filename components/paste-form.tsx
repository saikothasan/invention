'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { createPaste } from "@/lib/actions"
import { FileUp, Minus, Plus } from 'lucide-react'
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const LANGUAGES = [
  { label: 'Plain text', value: 'plain' },
  { label: 'JavaScript', value: 'javascript' },
  { label: 'TypeScript', value: 'typescript' },
  { label: 'Python', value: 'python' },
  { label: 'HTML', value: 'html' },
  { label: 'CSS', value: 'css' },
  { label: 'JSON', value: 'json' },
  { label: 'Markdown', value: 'markdown' },
  { label: 'SQL', value: 'sql' },
  { label: 'XML', value: 'xml' },
  { label: 'YAML', value: 'yaml' },
]

export function PasteForm() {
  const router = useRouter()
  const { toast } = useToast()
  const [content, setContent] = useState('')
  const [language, setLanguage] = useState('plain')
  const [expiryWeeks, setExpiryWeeks] = useState(2)
  const [isPrivate, setIsPrivate] = useState(false)
  const [title, setTitle] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsLoading(true)

    try {
      const expiresAt = new Date()
      expiresAt.setDate(expiresAt.getDate() + (expiryWeeks * 7))
      
      const paste = await createPaste({
        content,
        language,
        title: title || undefined,
        isPrivate,
        expiresAt: expiryWeeks > 0 ? expiresAt : null,
      })

      router.push(`/${paste.id}`)
      toast({
        title: "Success!",
        description: "Your paste has been created.",
      })
    } catch (error) {
      console.error(error)
      toast({
        title: "Error",
        description: "Failed to create paste. Please try again.",
        variant: "destructive",
      })
      setIsLoading(false)
    }
  }

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      const text = await file.text()
      setContent(text)
      
      // Try to detect language from file extension
      const ext = file.name.split('.').pop()?.toLowerCase()
      const lang = LANGUAGES.find(l => l.value === ext)
      if (lang) {
        setLanguage(lang.value)
      }
      
      setTitle(file.name)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to read file. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="title">Title (optional)</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter a title for your paste"
          />
        </div>
        <Tabs defaultValue="text" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="text">Text</TabsTrigger>
            <TabsTrigger value="file">File Upload</TabsTrigger>
          </TabsList>
          <TabsContent value="text">
            <Card>
              <CardContent className="p-0">
                <Textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Paste your content here..."
                  className="min-h-[300px] rounded-b-none border-0 resize-none focus-visible:ring-0 font-mono"
                />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="file">
            <Card>
              <CardContent className="py-4">
                <div className="grid gap-4">
                  <Label htmlFor="file">Upload a file</Label>
                  <Input
                    id="file"
                    type="file"
                    onChange={handleFileUpload}
                    className="cursor-pointer"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Highlight:</span>
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {LANGUAGES.map((lang) => (
                <SelectItem key={lang.value} value={lang.value}>
                  {lang.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Expiry:</span>
          <div className="flex items-center">
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-r-none"
              onClick={() => setExpiryWeeks(Math.max(0, expiryWeeks - 1))}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <div className="px-3 h-8 flex items-center border-y">
              {expiryWeeks}
            </div>
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-l-none"
              onClick={() => setExpiryWeeks(expiryWeeks + 1)}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <span className="text-sm">weeks</span>
        </div>
        <div className="flex items-center gap-2">
          <Label htmlFor="private" className="text-sm font-medium">Private:</Label>
          <input
            type="checkbox"
            id="private"
            checked={isPrivate}
            onChange={(e) => setIsPrivate(e.target.checked)}
            className="h-4 w-4"
          />
        </div>
        <Button type="submit" className="ml-auto" disabled={!content || isLoading}>
          {isLoading ? "Uploading..." : "Upload"}
        </Button>
      </div>
    </form>
  )
}

