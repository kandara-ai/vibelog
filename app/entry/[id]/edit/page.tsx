'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter, useParams, useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'

const B = {
  bg: '#0b0907',
  surface: '#1a1612',
  surface2: '#2a231b',
  ink: '#fbf4e1',
  inkDim: '#b9a988',
  inkFaint: '#7a6e55',
  line: 'rgba(251, 244, 225, 0.14)',
  tan: '#f0b878',
}

const mono = "'IBM Plex Mono', ui-monospace, monospace"
const sans = "'IBM Plex Sans KR', system-ui, sans-serif"

const inputStyle: React.CSSProperties = {
  width: '100%',
  background: B.surface2,
  border: `1px solid ${B.line}`,
  borderRadius: '3px',
  padding: '10px 14px',
  color: B.ink,
  fontSize: '14px',
  fontFamily: sans,
  outline: 'none',
  boxSizing: 'border-box',
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '10px',
  fontFamily: mono,
  letterSpacing: '1.5px',
  textTransform: 'uppercase',
  color: B.tan,
  marginBottom: '8px',
}

const sectionStyle: React.CSSProperties = {
  background: B.surface,
  border: `1px solid ${B.line}`,
  borderRadius: '4px',
  padding: '20px 24px',
}

export default function EditEntryPage() {
  const router = useRouter()
  const params = useParams()
  const searchParams = useSearchParams()
  const id = params.id as string
  const focusTab = searchParams.get('tab') ?? 'my'

  const myRef = useRef<HTMLDivElement>(null)
  const expertRef = useRef<HTMLDivElement>(null)
  const snsRef = useRef<HTMLDivElement>(null)

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

  useEffect(() => {
    if (loading) return
    const refMap: Record<string, React.RefObject<HTMLDivElement | null>> = {
      my: myRef, expert: expertRef, sns: snsRef,
    }
    refMap[focusTab]?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [loading, focusTab])

  async function handleSave() {
    if (!myView.trim()) { alert('나의 관점을 입력해주세요!'); return }
    setSaving(true)
    const { error } = await supabase
      .from('entries')
      .update({ date, my_view: myView, sns_view: snsView, expert_view: expertView })
      .eq('id', id)
    if (error) { alert('저장 중 오류가 발생했어요.'); setSaving(false); return }
    router.push(`/entry/${id}`)
  }

  if (loading) return (
    <p style={{ color: B.inkFaint, fontFamily: sans }}>불러오는 중...</p>
  )

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <div style={{ fontFamily: mono, fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: B.tan, marginBottom: '8px' }}>
          EDIT · 수정하기
        </div>
        <p style={{ fontSize: '13px', color: B.inkFaint, fontFamily: sans, margin: 0 }}>{date} 일지를 수정해요</p>
      </div>

      {/* 날짜 */}
      <div>
        <label style={labelStyle}>날짜</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          style={{ ...inputStyle, colorScheme: 'dark' }}
        />
      </div>

      {/* 나의 관점 */}
      <div ref={myRef} style={{
        ...sectionStyle,
        outline: focusTab === 'my' ? `2px solid ${B.tan}` : 'none',
      }}>
        <label style={labelStyle}>나의 관점</label>
        <p style={{ fontSize: '12px', color: B.inkFaint, fontFamily: sans, marginBottom: '12px', marginTop: 0 }}>
          오늘 배운 것, 만든 것, 막힌 것을 내 말로 자유롭게
        </p>
        <textarea
          value={myView}
          onChange={(e) => setMyView(e.target.value)}
          rows={10}
          style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.7 }}
        />
      </div>

      {/* SNS */}
      <div ref={snsRef} style={{
        ...sectionStyle,
        outline: focusTab === 'sns' ? `2px solid ${B.tan}` : 'none',
      }}>
        <label style={labelStyle}>SNS 포스팅</label>
        <textarea
          value={snsView}
          onChange={(e) => setSnsView(e.target.value)}
          rows={6}
          style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.7 }}
        />
      </div>

      {/* 전문가 요약 */}
      <div ref={expertRef} style={{
        ...sectionStyle,
        outline: focusTab === 'expert' ? `2px solid ${B.tan}` : 'none',
      }}>
        <label style={labelStyle}>전문가 요약</label>
        <textarea
          value={expertView}
          onChange={(e) => setExpertView(e.target.value)}
          rows={4}
          style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.7 }}
        />
      </div>

      {/* 버튼 */}
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
        <button
          onClick={() => router.push(`/entry/${id}`)}
          style={{
            fontSize: '12px', fontFamily: mono,
            color: B.inkDim, background: 'transparent',
            border: `1px solid ${B.line}`, borderRadius: '3px',
            padding: '8px 20px', cursor: 'pointer',
          }}
        >
          취소
        </button>
        <button
          onClick={handleSave}
          disabled={saving}
          style={{
            fontSize: '12px', fontFamily: mono,
            color: B.bg, background: B.tan,
            border: 'none', borderRadius: '3px',
            padding: '8px 20px', cursor: saving ? 'not-allowed' : 'pointer',
            opacity: saving ? 0.7 : 1,
          }}
        >
          {saving ? '저장 중...' : '저장하기'}
        </button>
      </div>
    </div>
  )
}
