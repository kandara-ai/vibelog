export const dynamic = 'force-dynamic'

import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { getCategoryStyle, getPreview } from '@/lib/category'

export default async function CategoryPage({ params }: { params: Promise<{ name: string }> }) {
  const { name } = await params
  const category = decodeURIComponent(name)

  const { data: entries } = await supabase
    .from('entries')
    .select('*')
    .eq('category', category)
    .order('date', { ascending: false })

  const style = getCategoryStyle(category)

  return (
    <div>
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-2">
          <span className={`inline-flex items-center gap-1.5 text-sm font-medium px-3 py-1 rounded-full ${style.bg} ${style.text}`}>
            <span className={`w-2 h-2 rounded-full ${style.dot}`} />
            {category}
          </span>
        </div>
        <p className="text-gray-400 text-sm">{entries?.length ?? 0}개의 기록</p>
      </div>

      {!entries?.length ? (
        <p className="text-gray-400 text-center py-20">아직 기록이 없어요.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {entries.map((entry) => {
            const preview = getPreview(entry.my_view)
            return (
              <Link key={entry.id} href={`/entry/${entry.id}`}>
                <div className="bg-white border rounded-xl p-5 h-full hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col gap-3">
                  <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full w-fit ${style.bg} ${style.text}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
                    {category}
                  </span>
                  <p className="text-sm text-gray-700 leading-relaxed flex-1 line-clamp-4">
                    {preview || '내용 없음'}
                  </p>
                  <p className="text-xs text-gray-400">{entry.date}</p>
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
