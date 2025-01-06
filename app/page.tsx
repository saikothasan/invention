import { Header } from '@/components/header'
import { PasteForm } from '@/components/paste-form'
import { Suspense } from 'react'
import { RecentPastes } from '@/components/recent-pastes'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container max-w-5xl py-8 px-4 md:py-10 space-y-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1 space-y-6">
            <h2 className="text-2xl font-bold tracking-tight">New Paste</h2>
            <Suspense>
              <PasteForm />
            </Suspense>
          </div>
          <div className="md:w-[300px] space-y-6">
            <h2 className="text-2xl font-bold tracking-tight">Recent Pastes</h2>
            <Suspense>
              <RecentPastes />
            </Suspense>
          </div>
        </div>
      </main>
    </div>
  )
}

