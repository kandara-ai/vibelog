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

export default async function CategoryPage({ params }: { params: Promise<{ name: string }> }) {
  const { name } = await params
  const category = decodeURIComponent(name)

  const { data: entries } = await supabase
    .from('entries')
    .select('*')
    .eq('category', category)
    .order('date', { ascending: false })

  const style = getCategoryStyle(category)

  return (
    <div>
      <div style={{ marginBottom: '40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            fontSize: '11px',
            fontFamily: mono,
            fontWeight: 500,
            letterSpacing: '0.5px',
            padding: '4px 12px',
            borderRadius: '2px',
            background: style.bg,
            color: style.fg,
          }}>
            {category}
          </span>
        </div>
        <p style={{ fontSize: '13px', color: B.inkFaint, margin: 0, fontFamily: mono }}>
          {entries?.length ?? 0} records
        </p>
      </div>

      {!entries?.length ? (
        <p style={{ fontSize: '14px', color: B.inkFaint, textAlign: 'center', padding: '60px 0' }}>
          아직 기록이 없어요.
        </p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '12px' }}>
          {entries.map((entry) => {
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
                  boxSizing: 'border-box',
                }}>
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
                    {category}
                  </span>
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
