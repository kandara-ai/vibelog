import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default async function ConceptPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const { data: concept } = await supabase
    .from('concept_notes')
    .select('*')
    .eq('id', id)
    .single()

  if (!concept) {
    return (
      <main className="max-w-2xl mx-auto px-4 py-10">
        <p>개념 노트를 찾을 수 없어요.</p>
        <Link href="/concepts"><Button className="mt-4">목록으로</Button></Link>
      </main>
    )
  }

  return (
    <main className="max-w-2xl mx-auto px-4 py-10">
      <div className="mb-6">
        <Link href="/concepts" className="text-sm text-gray-400 hover:text-gray-600">← 개념 목록으로</Link>
        <h1 className="text-2xl font-bold mt-2">💡 {concept.title}</h1>
        <p className="text-sm text-gray-400 mt-1">{new Date(concept.created_at).toLocaleDateString('ko-KR')}</p>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">📝 개념 설명</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 whitespace-pre-wrap">{concept.content}</p>
        </CardContent>
      </Card>
    </main>
  )
}
