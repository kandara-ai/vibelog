'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

const B = {
  surface: '#1a1612',
  surface2: '#2a231b',
  ink: '#fbf4e1',
  inkDim: '#b9a988',
  inkFaint: '#7a6e55',
  line: 'rgba(251, 244, 225, 0.14)',
  tan: '#f0b878',
  bg: '#0b0907',
}

const mono = "'IBM Plex Mono', ui-monospace, monospace"
const sans = "'IBM Plex Sans KR', system-ui, sans-serif"
const serif = "'Gowun Batang', Georgia, serif"

const inputStyle: React.CSSProperties = {
  width: '100%', background: B.surface2,
  border: `1px solid ${B.line}`, borderRadius: '3px',
  padding: '10px 14px', color: B.ink,
  fontSize: '14px', fontFamily: sans,
  outline: 'none', boxSizing: 'border-box',
  colorScheme: 'dark',
}

const labelStyle: React.CSSProperties = {
  display: 'block', fontSize: '10px', fontFamily: mono,
  letterSpacing: '1.5px', textTransform: 'uppercase',
  color: B.tan, marginBottom: '8px',
}

function toLocalDateTimeInput(d: Date) {
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`
}

export default function NewAppointmentPage() {
  const router = useRouter()
  const tomorrow = new Date(); tomorrow.setDate(tomorrow.getDate()+1); tomorrow.setHours(12,0,0,0)

  const [title, setTitle] = useState('')
  const [scheduledAt, setScheduledAt] = useState(toLocalDateTimeInput(tomorrow))
  const [memo, setMemo] = useState('')
  const [saving, setSaving] = useState(false)

  async function handleSave() {
    if (!title.trim()) { alert('내용을 입력해주세요!'); return }
    setSaving(true)
    const { error } = await supabase.from('appointments').insert({
      title: title.trim(),
      scheduled_at: new Date(scheduledAt).toISOString(),
      memo: memo.trim() || null,
    })
    if (error) { alert('저장 중 오류가 발생했어요.'); setSaving(false); return }
    router.push('/schedule')
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <div style={{ fontFamily: mono, fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: B.tan, marginBottom: '8px' }}>
          NEW · 약속 추가
        </div>
        <p style={{ fontSize: '13px', color: B.inkFaint, margin: 0, fontFamily: sans }}>
          텔레그램에서 보내도 자동으로 추가돼요.
        </p>
      </div>

      <div style={{ background: B.surface, border: `1px solid ${B.line}`, borderRadius: '4px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div>
          <label style={labelStyle}>내용</label>
          <input
            type="text"
            placeholder="예: 신랑이랑 병원 예약"
            value={title}
            onChange={e => setTitle(e.target.value)}
            style={inputStyle}
          />
        </div>

        <div>
          <label style={labelStyle}>날짜 / 시간</label>
          <input
            type="datetime-local"
            value={scheduledAt}
            onChange={e => setScheduledAt(e.target.value)}
            style={inputStyle}
          />
        </div>

        <div>
          <label style={labelStyle}>메모 (선택)</label>
          <textarea
            placeholder="추가 메모가 있으면 적어두세요"
            value={memo}
            onChange={e => setMemo(e.target.value)}
            rows={3}
            style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6 }}
          />
        </div>
      </div>

      <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
        <button
          onClick={() => router.push('/schedule')}
          style={{ fontSize: '12px', fontFamily: mono, color: B.inkDim, background: 'transparent', border: `1px solid ${B.line}`, borderRadius: '3px', padding: '8px 20px', cursor: 'pointer' }}
        >
          취소
        </button>
        <button
          onClick={handleSave}
          disabled={saving}
          style={{ fontSize: '12px', fontFamily: mono, color: B.bg, background: B.tan, border: 'none', borderRadius: '3px', padding: '8px 20px', cursor: saving ? 'not-allowed' : 'pointer', opacity: saving ? 0.7 : 1 }}
        >
          {saving ? '저장 중...' : '저장하기'}
        </button>
      </div>
    </div>
  )
}
