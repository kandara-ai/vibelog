export const dynamic = 'force-dynamic'

import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { deleteAppointment } from './actions'

const B = {
  surface: '#1a1612',
  surface2: '#2a231b',
  ink: '#fbf4e1',
  inkDim: '#b9a988',
  inkFaint: '#7a6e55',
  line: 'rgba(251, 244, 225, 0.14)',
  lineSoft: 'rgba(251, 244, 225, 0.06)',
  tan: '#f0b878',
  tanGlow: 'rgba(240, 184, 120, 0.22)',
  rose: '#e08888',
}

const mono = "'IBM Plex Mono', ui-monospace, monospace"
const sans = "'IBM Plex Sans KR', system-ui, sans-serif"
const serif = "'Gowun Batang', Georgia, serif"

const WEEKDAY = ['일', '월', '화', '수', '목', '금', '토']

function formatDate(iso: string) {
  const d = new Date(iso)
  const today = new Date(); today.setHours(0,0,0,0)
  const diff = Math.floor((d.setHours(0,0,0,0) - today.getTime()) / 86400000)
  const base = new Date(iso)
  const label = diff === 0 ? '오늘' : diff === 1 ? '내일' : diff === 2 ? '모레' : ''
  const dateStr = `${base.getMonth()+1}월 ${base.getDate()}일 (${WEEKDAY[base.getDay()]})`
  return { label, dateStr }
}

function formatTime(iso: string) {
  const d = new Date(iso)
  const h = d.getHours(), m = d.getMinutes()
  const period = h < 12 ? '오전' : '오후'
  const hh = h === 0 ? 12 : h > 12 ? h - 12 : h
  return `${period} ${hh}:${String(m).padStart(2,'0')}`
}

function groupByDate(appointments: any[]) {
  const groups: Record<string, any[]> = {}
  appointments.forEach(a => {
    const key = new Date(a.scheduled_at).toDateString()
    if (!groups[key]) groups[key] = []
    groups[key].push(a)
  })
  return Object.entries(groups)
}

export default async function SchedulePage() {
  const { data: all } = await supabase
    .from('appointments')
    .select('*')
    .order('scheduled_at', { ascending: true })

  const now = new Date()
  const upcoming = (all ?? []).filter(a => new Date(a.scheduled_at) >= now)
  const past = (all ?? []).filter(a => new Date(a.scheduled_at) < now).reverse()

  return (
    <div>
      {/* 헤더 */}
      <div style={{ marginBottom: '40px', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontFamily: mono, fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: B.tan, marginBottom: '8px' }}>
            UPCOMING · 약속
          </div>
          <div style={{ fontFamily: serif, fontSize: '26px', fontWeight: 400, color: B.ink }}>
            다가오는 약속들
          </div>
          <p style={{ fontSize: '13px', color: B.inkFaint, margin: '6px 0 0', fontFamily: sans }}>
            텔레그램에서 "내일 2시 병원 예약" 이렇게 보내면 자동 저장돼요.
          </p>
        </div>
        <Link href="/schedule/new" style={{
          fontSize: '11px', fontFamily: mono,
          color: B.tan, textDecoration: 'none',
          border: `1px solid ${B.tan}`,
          borderRadius: '3px', padding: '6px 14px',
          flexShrink: 0, marginTop: '4px',
        }}>
          + 직접 추가
        </Link>
      </div>

      {/* 다가오는 약속 */}
      {upcoming.length === 0 ? (
        <p style={{ color: B.inkFaint, fontSize: '14px', fontFamily: sans, textAlign: 'center', padding: '48px 0' }}>
          다가오는 약속이 없어요.
        </p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', marginBottom: '48px' }}>
          {groupByDate(upcoming).map(([dateKey, appts]) => {
            const { label, dateStr } = formatDate(appts[0].scheduled_at)
            return (
              <div key={dateKey}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                  {label && (
                    <span style={{ fontFamily: mono, fontSize: '11px', fontWeight: 600, color: B.tan, letterSpacing: '1px', textTransform: 'uppercase' }}>
                      {label}
                    </span>
                  )}
                  <span style={{ fontFamily: mono, fontSize: '11px', color: B.inkDim }}>{dateStr}</span>
                  <div style={{ flex: 1, height: '1px', background: B.lineSoft }} />
                  <span style={{ fontFamily: mono, fontSize: '10px', color: B.inkFaint }}>{appts.length}개</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  {appts.map((a: any) => (
                    <div key={a.id} style={{
                      display: 'grid', gridTemplateColumns: '80px 1fr auto',
                      gap: '14px', padding: '12px 16px',
                      background: B.surface, border: `1px solid ${B.line}`,
                      borderRadius: '3px', alignItems: 'center',
                    }}>
                      <span style={{ fontFamily: mono, fontSize: '12px', color: B.tan, fontVariantNumeric: 'tabular-nums' }}>
                        {formatTime(a.scheduled_at)}
                      </span>
                      <div>
                        <p style={{ fontSize: '14px', color: B.ink, margin: 0, fontFamily: sans, fontWeight: 400 }}>
                          {a.title}
                        </p>
                        {a.memo && (
                          <p style={{ fontSize: '12px', color: B.inkFaint, margin: '2px 0 0', fontFamily: sans }}>
                            {a.memo}
                          </p>
                        )}
                      </div>
                      <div style={{ display: 'flex', gap: '6px', flexShrink: 0 }}>
                        <Link href={`/schedule/${a.id}/edit`} style={{
                          fontSize: '10px', fontFamily: mono, color: B.inkDim,
                          textDecoration: 'none', border: `1px solid ${B.line}`,
                          borderRadius: '2px', padding: '3px 8px',
                        }}>
                          수정
                        </Link>
                        <form action={deleteAppointment}>
                          <input type="hidden" name="id" value={a.id} />
                          <button type="submit" style={{
                            fontSize: '10px', fontFamily: mono, color: B.inkFaint,
                            background: 'transparent', border: `1px solid ${B.line}`,
                            borderRadius: '2px', padding: '3px 8px', cursor: 'pointer',
                          }}>
                            삭제
                          </button>
                        </form>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* 지난 약속 */}
      {past.length > 0 && (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <span style={{ fontFamily: mono, fontSize: '10px', color: B.inkFaint, letterSpacing: '1.5px', textTransform: 'uppercase' }}>
              PAST · 지난 약속
            </span>
            <div style={{ flex: 1, height: '1px', background: B.lineSoft }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', opacity: 0.6 }}>
            {past.slice(0, 5).map((a: any) => {
              const { dateStr } = formatDate(a.scheduled_at)
              return (
                <div key={a.id} style={{
                  display: 'grid', gridTemplateColumns: '80px 120px 1fr auto',
                  gap: '14px', padding: '10px 16px',
                  background: B.surface, border: `1px solid ${B.line}`,
                  borderRadius: '3px', alignItems: 'center',
                }}>
                  <span style={{ fontFamily: mono, fontSize: '11px', color: B.inkFaint }}>{formatTime(a.scheduled_at)}</span>
                  <span style={{ fontFamily: mono, fontSize: '11px', color: B.inkFaint }}>{dateStr}</span>
                  <p style={{ fontSize: '13px', color: B.inkFaint, margin: 0, fontFamily: sans }}>{a.title}</p>
                  <form action={deleteAppointment}>
                    <input type="hidden" name="id" value={a.id} />
                    <button type="submit" style={{
                      fontSize: '10px', fontFamily: mono, color: B.inkFaint,
                      background: 'transparent', border: `1px solid ${B.line}`,
                      borderRadius: '2px', padding: '3px 8px', cursor: 'pointer',
                    }}>
                      삭제
                    </button>
                  </form>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
