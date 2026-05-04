import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default async function ConceptsPage() {
  const { data: concepts } = await supabase
    .from('concept_notes')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <main className="max-w-2xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">💡 개념 노트</h1>
          <p className="text-gray-500 mt-1">공부한 개념을 모아두는 곳</p>
        </div>
        <Link href="/concepts/new">
          <Button>+ 개념 추가</Button>
        </Link>
      </div>

      <div className="mb-4">
        <Link href="/" className="text-sm text-gray-400 hover:text-gray-600">← 일지로</Link>
      </div>

      {concepts && concepts.length === 0 && (
        <div className="text-center py-20 text-gray-400">
          <p className="text-5xl mb-4">💡</p>
          <p>아직 개념 노트가 없어요.</p>
          <p>공부한 개념을 정리해볼까요?</p>
        </div>
      )}

      <div className="flex flex-col gap-4">
        {concepts?.map((concept) => (
          <Link key={concept.id} href={`/concepts/${concept.id}`}>
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">{concept.title}</CardTitle>
              </CardHeader>
              {concept.content && (
                <CardContent>
                  <p className="text-sm text-gray-500 line-clamp-2">{concept.content}</p>
                </CardContent>
              )}
            </Card>
          </Link>
        ))}
      </div>
    </main>
  )
}
