import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { EntryTabs } from '@/components/entry-tabs'
import { getCategoryStyle } from '@/lib/category'

export default async function EntryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const { data: entry } = await supabase
    .from('entries')
    .select('*')
    .eq('id', id)
    .single()

  if (!entry) {
    return (
      <div className="max-w-2xl mx-auto py-10">
        <p className="text-gray-400">일지를 찾을 수 없어요.</p>
        <Link href="/" className="text-sm text-indigo-600 hover:underline mt-4 inline-block">← 홈으로</Link>
      </div>
    )
  }

  const style = getCategoryStyle(entry.category)
  const backHref = entry.category ? `/category/${encodeURIComponent(entry.category)}` : '/'

  return (
    <div className="max-w-2xl mx-auto py-10">
      <div className="mb-8">
        <Link href={backHref} className="text-sm text-gray-400 hover:text-gray-600">← 목록으로</Link>
        <div className="mt-4 flex items-center gap-3">
          {entry.category && (
            <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${style.bg} ${style.text}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
              {entry.category}
            </span>
          )}
          <span className="text-sm text-gray-400">{entry.date}</span>
        </div>
      </div>

      <div className="bg-white rounded-xl border p-6">
        <EntryTabs entry={entry} />
      </div>
    </div>
  )
}
