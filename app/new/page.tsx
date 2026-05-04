'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function NewEntryPage() {
  const router = useRouter()
  const today = new Date().toISOString().split('T')[0]

  const [date, setDate] = useState(today)
  const [learned, setLearned] = useState('')
  const [made, setMade] = useState('')
  const [stuck, setStuck] = useState('')
  const [saving, setSaving] = useState(false)

  async function handleSave() {
    if (!learned.trim()) {
      alert('오늘 배운 내용을 입력해주세요!')
      return
    }

    setSaving(true)
    const { error } = await supabase.from('entries').insert({
      date,
      learned,
      made,
      stuck,
    })

    if (error) {
      alert('저장 중 오류가 발생했어요. 다시 시도해주세요.')
      setSaving(false)
      return
    }

    router.push('/')
  }

  return (
    <main className="max-w-2xl mx-auto px-4 py-10">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">✏️ 오늘 일지 쓰기</h1>
        <p className="text-gray-500 mt-1">오늘 배운 것을 내 말로 기록해요</p>
      </div>

      <div className="flex flex-col gap-4">
        <div>
          <label className="text-sm font-medium mb-1 block">날짜</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border rounded-md px-3 py-2 text-sm w-full"
          />
        </div>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">📖 오늘 배운 개념</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="오늘 배운 것을 내 말로 써보세요. 완벽하지 않아도 괜찮아요!"
              value={learned}
              onChange={(e) => setLearned(e.target.value)}
              rows={4}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">🛠️ 오늘 만든 것</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="오늘 직접 만들거나 따라 해본 것을 써주세요"
              value={made}
              onChange={(e) => setMade(e.target.value)}
              rows={3}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">🤔 막힌 부분</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="어디서 막혔나요? 어떤 부분이 아직 헷갈리나요?"
              value={stuck}
              onChange={(e) => setStuck(e.target.value)}
              rows={3}
            />
          </CardContent>
        </Card>

        <div className="flex gap-3 justify-end">
          <Button variant="outline" onClick={() => router.push('/')}>
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
