'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function EditEntryPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string

  const [date, setDate] = useState('')
  const [myView, setMyView] = useState('')
  const [snsView, setSnsView] = useState('')
  const [expertView, setExpertView] = useState('')
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from('entries')
        .select('*')
        .eq('id', id)
        .single()

      if (data) {
        setDate(data.date)
        setMyView(data.my_view ?? '')
        setSnsView(data.sns_view ?? '')
        setExpertView(data.expert_view ?? '')
      }
      setLoading(false)
    }
    load()
  }, [id])

  async function handleSave() {
    if (!myView.trim()) {
      alert('나의 관점을 입력해주세요!')
      return
    }
    setSaving(true)
    const { error } = await supabase
      .from('entries')
      .update({ date, my_view: myView, sns_view: snsView, expert_view: expertView })
      .eq('id', id)

    if (error) {
      alert('저장 중 오류가 발생했어요. 다시 시도해주세요.')
      setSaving(false)
      return
    }
    router.push(`/entry/${id}`)
  }

  if (loading) return <main className="max-w-2xl mx-auto px-4 py-10"><p className="text-gray-400">불러오는 중...</p></main>

  return (
    <main className="max-w-2xl mx-auto px-4 py-10">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">✏️ 일지 수정하기</h1>
        <p className="text-gray-500 mt-1">{date} 일지를 수정해요</p>
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
              value={myView}
              onChange={(e) => setMyView(e.target.value)}
              rows={10}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">📱 SNS 포스팅</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={snsView}
              onChange={(e) => setSnsView(e.target.value)}
              rows={6}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">👔 전문가 요약</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={expertView}
              onChange={(e) => setExpertView(e.target.value)}
              rows={4}
            />
          </CardContent>
        </Card>

        <div className="flex gap-3 justify-end">
          <Button variant="outline" onClick={() => router.push(`/entry/${id}`)}>
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
