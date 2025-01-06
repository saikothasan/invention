import { sql } from '@vercel/postgres'
import { boolean, integer, pgTable, text, timestamp } from 'drizzle-orm/pg-core'
import { drizzle } from 'drizzle-orm/vercel-postgres'

export const pastes = pgTable('pastes', {
  id: text('id').primaryKey(),
  title: text('title'),
  content: text('content').notNull(),
  language: text('language').default('plain').notNull(),
  isPrivate: boolean('is_private').default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  expiresAt: timestamp('expires_at'),
})

export const db = drizzle(sql)

