'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function NewConceptPage() {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [saving, setSaving] = useState(false)

  async function handleSave() {
    if (!title.trim()) {
      alert('개념 제목을 입력해주세요!')
      return
    }

    setSaving(true)
    const { error } = await supabase.from('concept_notes').insert({ title, content })

    if (error) {
      alert('저장 중 오류가 발생했어요. 다시 시도해주세요.')
      setSaving(false)
      return
    }

    router.push('/concepts')
  }

  return (
    <main className="max-w-2xl mx-auto px-4 py-10">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">💡 개념 노트 작성</h1>
        <p className="text-gray-500 mt-1">공부한 개념을 내 말로 정리해요</p>
      </div>

      <div className="flex flex-col gap-4">
        <div>
          <label className="text-sm font-medium mb-1 block">개념 제목</label>
          <input
            type="text"
            placeholder="예: Git이란? / RLS(행 레벨 보안)이란?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border rounded-md px-3 py-2 text-sm w-full"
          />
        </div>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">📝 개념 설명</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="내 말로 개념을 설명해보세요. 완벽하지 않아도 괜찮아요!"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={10}
            />
          </CardContent>
        </Card>

        <div className="flex gap-3 justify-end">
          <Button variant="outline" onClick={() => router.push('/concepts')}>
            취소
          </Button>
          <Button onClick={handleSave} disabled={saving}>
            {saving ? '저장 중...' : '💾 저장하기'}
          </Button>
        </div>
      </div>
    </main>
  )
}
