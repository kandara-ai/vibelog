import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { EntryTabs } from '@/components/entry-tabs'

export default async function EntryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const { data: entry } = await supabase
    .from('entries')
    .select('*')
    .eq('id', id)
    .single()

  if (!entry) {
    return (
      <main className="max-w-2xl mx-auto px-4 py-10">
        <p>일지를 찾을 수 없어요.</p>
        <Link href="/"><Button className="mt-4">홈으로</Button></Link>
      </main>
    )
  }

  return (
    <main className="max-w-2xl mx-auto px-4 py-10">
      <div className="mb-6">
        <Link href="/" className="text-sm text-gray-400 hover:text-gray-600">← 목록으로</Link>
        <div className="flex items-center gap-2 mt-2">
          <h1 className="text-2xl font-bold">📖 학습 일지</h1>
          <Badge variant="outline">{entry.date}</Badge>
        </div>
      </div>

      <EntryTabs entry={entry} />
    </main>
  )
}
