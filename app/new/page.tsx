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
  const [myView, setMyView] = useState('')
  const [snsView, setSnsView] = useState('')
  const [expertView, setExpertView] = useState('')
  const [saving, setSaving] = useState(false)

  async function handleSave() {
    if (!myView.trim()) {
      alert('나의 관점을 입력해주세요!')
      return
    }

    setSaving(true)
    const { error } = await supabase.from('entries').insert({
      date,
      my_view: myView,
      sns_view: snsView,
      expert_view: expertView,
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
        <p className="text-gray-500 mt-1">오늘 한 것을 세 가지 관점으로 기록해요</p>
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
            <CardTitle className="text-base">🙋 나의 관점</CardTitle>
            <p className="text-xs text-gray-400">오늘 배운 것, 만든 것, 막힌 것을 내 말로 자유롭게</p>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="오늘 무엇을 했나요? 어떻게 느꼈나요? 막힌 부분은요?"
              value={myView}
              onChange={(e) => setMyView(e.target.value)}
              rows={6}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">📱 SNS 포스팅</CardTitle>
            <p className="text-xs text-gray-400">스레드·인스타용 — write-post로 자동 생성되거나 직접 작성</p>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="SNS에 올릴 내용을 써보세요 (선택사항)"
              value={snsView}
              onChange={(e) => setSnsView(e.target.value)}
              rows={4}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">👔 전문가 요약</CardTitle>
            <p className="text-xs text-gray-400">신랑·멘토용 — 오늘 한 것을 한두 줄로</p>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="예: Claude Code로 Next.js 앱 설계부터 Vercel 배포까지 완성. Supabase 연결, RLS 비활성화로 MVP 구성. 사용 도구: Next.js 15, Supabase, TypeScript"
              value={expertView}
              onChange={(e) => setExpertView(e.target.value)}
              rows={2}
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
