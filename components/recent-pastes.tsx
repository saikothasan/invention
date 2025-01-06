import { getRecentPastes } from "@/lib/actions"
import { formatDistanceToNow } from "date-fns"
import Link from "next/link"
import { Card, CardContent } from "./ui/card"

export async function RecentPastes() {
  const pastes = await getRecentPastes()

  return (
    <Card>
      <CardContent className="p-4">
        {pastes.length === 0 ? (
          <p className="text-sm text-muted-foreground">No recent pastes</p>
        ) : (
          <ul className="space-y-2">
            {pastes.map((paste) => (
              <li key={paste.id}>
                <Link
                  href={`/${paste.id}`}
                  className="block p-2 -mx-2 rounded-lg hover:bg-muted transition-colors"
                >
                  <div className="font-medium truncate">
                    {paste.title || 'Untitled'}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {formatDistanceToNow(new Date(paste.createdAt), {
                      addSuffix: true,
                    })}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  )
}

