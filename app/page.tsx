export const dynamic = 'force-dynamic'

import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export default async function Home() {
  const { data: entries } = await supabase
    .from('entries')
    .select('*')
    .order('date', { ascending: false })

  return (
    <main className="max-w-2xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">📚 Vibelog</h1>
          <p className="text-gray-500 mt-1">오늘 한 것을 기록해요</p>
        </div>
        <div className="flex gap-2">
          <Link href="/concepts">
            <Button variant="outline">💡 개념 노트</Button>
          </Link>
          <Link href="/new">
            <Button>+ 오늘 일지 쓰기</Button>
          </Link>
        </div>
      </div>

      {entries && entries.length === 0 && (
        <div className="text-center py-20 text-gray-400">
          <p className="text-5xl mb-4">✏️</p>
          <p>아직 기록이 없어요.</p>
          <p>첫 번째 일지를 써볼까요?</p>
        </div>
      )}

      <div className="flex flex-col gap-4">
        {entries?.map((entry) => (
          <Link key={entry.id} href={`/entry/${entry.id}`}>
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{entry.date}</Badge>
                </div>
                {entry.my_view && (
                  <CardTitle className="text-base line-clamp-2 mt-1">
                    {entry.my_view}
                  </CardTitle>
                )}
              </CardHeader>
              {entry.expert_view && (
                <CardContent>
                  <p className="text-sm text-gray-500 line-clamp-1">
                    👔 {entry.expert_view}
                  </p>
                </CardContent>
              )}
            </Card>
          </Link>
        ))}
      </div>
    </main>
  )
}
