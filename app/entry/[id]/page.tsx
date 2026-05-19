import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { EntryTabs } from '@/components/entry-tabs'
import { getCategoryStyle } from '@/lib/category'

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

export default async function EntryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const { data: entry } = await supabase
    .from('entries')
    .select('*')
    .eq('id', id)
    .single()

  if (!entry) {
    return (
      <div style={{ padding: '40px 0' }}>
        <p style={{ color: B.inkFaint, fontFamily: sans }}>일지를 찾을 수 없어요.</p>
        <Link href="/" style={{ fontSize: '13px', color: B.tan, textDecoration: 'none', marginTop: '16px', display: 'inline-block', fontFamily: mono }}>← 홈으로</Link>
      </div>
    )
  }

  const style = getCategoryStyle(entry.category)
  const backHref = entry.category ? `/category/${encodeURIComponent(entry.category)}` : '/'

  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <Link href={backHref} style={{ fontSize: '13px', color: B.inkDim, textDecoration: 'none', fontFamily: mono }}>← 목록으로</Link>
        <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
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
              background: style.bg,
              color: style.fg,
            }}>
              {entry.category}
            </span>
          )}
          <span style={{ fontSize: '12px', color: B.inkFaint, fontFamily: mono }}>{entry.date}</span>
        </div>
      </div>

      <div style={{
        background: B.surface,
        border: `1px solid ${B.line}`,
        borderRadius: '4px',
        padding: '28px 32px',
      }}>
        <EntryTabs entry={entry} />
      </div>
    </div>
  )
}
