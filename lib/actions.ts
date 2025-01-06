'use server'

import { nanoid } from 'nanoid'
import { db, pastes } from './db/schema'
import { and, desc, eq, isNull } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'

export async function createPaste({
  content,
  language,
  title,
  isPrivate,
  expiresAt,
}: {
  content: string
  language: string
  title?: string
  isPrivate?: boolean
  expiresAt: Date | null
}) {
  const id = nanoid(10)
  
  await db.insert(pastes).values({
    id,
    content,
    language,
    title,
    isPrivate: isPrivate || false,
    expiresAt,
  })

  revalidatePath('/')
  
  return { id }
}

export async function getPaste(id: string) {
  const [paste] = await db
    .select()
    .from(pastes)
    .where(eq(pastes.id, id))
    .limit(1)

  if (!paste) {
    throw new Error('Paste not found')
  }

  if (paste.expiresAt && new Date() > paste.expiresAt) {
    await db.delete(pastes).where(eq(pastes.id, id))
    throw new Error('Paste has expired')
  }

  return paste
}

export async function getRecentPastes() {
  return db
    .select({
      id: pastes.id,
      title: pastes.title,
      createdAt: pastes.createdAt,
    })
    .from(pastes)
    .where(and(
      isNull(pastes.expiresAt),
      eq(pastes.isPrivate, false)
    ))
    .orderBy(desc(pastes.createdAt))
    .limit(5)
}

