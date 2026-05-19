export const dynamic = 'force-dynamic'

import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { getCategoryStyle, getPreview } from '@/lib/category'

const B = {
  surface: '#1a1612',
  ink: '#fbf4e1',
  inkDim: '#b9a988',
  inkFaint: '#7a6e55',
  line: 'rgba(251, 244, 225, 0.14)',
  tan: '#f0b878',
}

const mono = "'IBM Plex Mono', ui-monospace, monospace"
const sans = "'IBM Plex Sans KR', system-ui, sans-serif"
const serif = "'Gowun Batang', Georgia, serif"

export default async function Home() {
  const { data: entries } = await supabase
    .from('entries')
    .select('*')
    .order('date', { ascending: false })

  return (
    <div>
      <div style={{ marginBottom: '48px' }}>
        <div style={{
          fontFamily: mono,
          fontSize: '10px',
          letterSpacing: '2px',
          textTransform: 'uppercase',
          color: B.tan,
          marginBottom: '10px',
        }}>slowquick · 기록</div>
        <h1 style={{
          fontFamily: serif,
          fontSize: '32px',
          fontWeight: 400,
          color: B.ink,
          margin: '0 0 8px',
          letterSpacing: '-0.5px',
        }}>바이브코딩하고, 사업하고,<br />배우고, 기록합니다.</h1>
        <p style={{ fontSize: '14px', color: B.inkFaint, margin: 0, fontFamily: sans }}>
          경력단절 후 다시 시작하는 slowquick의 기록장
        </p>
      </div>

      {!entries?.length ? (
        <p style={{ fontSize: '14px', color: B.inkFaint, textAlign: 'center', padding: '60px 0' }}>
          아직 기록이 없어요.
        </p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '12px' }}>
          {entries.map((entry) => {
            const style = getCategoryStyle(entry.category)
            const preview = getPreview(entry.my_view)
            return (
              <Link key={entry.id} href={`/entry/${entry.id}`} style={{ textDecoration: 'none' }}>
                <div style={{
                  background: B.surface,
                  border: `1px solid ${B.line}`,
                  borderRadius: '4px',
                  padding: '18px 20px',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                  transition: 'border-color 0.15s',
                  boxSizing: 'border-box',
                }}>
                  {entry.category && (
                    <span style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      fontSize: '10px',
                      fontFamily: mono,
                      fontWeight: 500,
                      letterSpacing: '0.3px',
                      padding: '2px 8px',
                      borderRadius: '2px',
                      width: 'fit-content',
                      background: style.bg,
                      color: style.fg,
                    }}>
                      {entry.category}
                    </span>
                  )}
                  <p style={{
                    fontSize: '13px',
                    color: B.ink,
                    lineHeight: 1.65,
                    flex: 1,
                    margin: 0,
                    fontFamily: sans,
                    fontWeight: 300,
                    display: '-webkit-box',
                    WebkitLineClamp: 4,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}>
                    {preview || '내용 없음'}
                  </p>
                  <p style={{
                    fontSize: '11px',
                    color: B.inkFaint,
                    margin: 0,
                    fontFamily: mono,
                  }}>{entry.date}</p>
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
