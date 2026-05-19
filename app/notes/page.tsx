export const dynamic = 'force-dynamic'

import { supabase } from '@/lib/supabase'

const B = {
  surface: '#1a1612',
  ink: '#fbf4e1',
  inkDim: '#b9a988',
  inkFaint: '#7a6e55',
  line: 'rgba(251, 244, 225, 0.14)',
  lineSoft: 'rgba(251, 244, 225, 0.06)',
  tan: '#f0b878',
  tanGlow: 'rgba(240, 184, 120, 0.22)',
  sage: '#a8c485',
  sageGlow: 'rgba(168, 196, 133, 0.20)',
  plum: '#cba6e0',
  plumGlow: 'rgba(203, 166, 224, 0.20)',
}

const CAT: Record<string, { fg: string; bg: string }> = {
  '일상':    { fg: B.tan,  bg: B.tanGlow },
  '공부':    { fg: B.sage, bg: B.sageGlow },
  'AI학습':  { fg: B.plum, bg: B.plumGlow },
  '홈페이지': { fg: '#78b8e0', bg: 'rgba(120, 184, 224, 0.20)' },
  '테라셀':   { fg: '#e08888', bg: 'rgba(224, 136, 136, 0.20)' },
  '스폰지클럽': { fg: '#e8c068', bg: 'rgba(232, 192, 104, 0.20)' },
  '약속':     { fg: '#d4a0c8', bg: 'rgba(212, 160, 200, 0.20)' },
}

function getCat(cat: string) {
  return CAT[cat] ?? { fg: B.inkDim, bg: 'rgba(185, 169, 136, 0.15)' }
}

const mono = "'IBM Plex Mono', ui-monospace, monospace"
const sans = "'IBM Plex Sans KR', system-ui, sans-serif"
const serif = "'Gowun Batang', Georgia, serif"

export default async function NotesPage() {
  const { data: notes } = await supabase
    .from('notes')
    .select('*')
    .order('created_at', { ascending: false })

  const grouped: Record<string, typeof notes> = {}
  notes?.forEach(note => {
    const day = new Date(note.created_at).toLocaleDateString('ko-KR', {
      year: 'numeric', month: 'long', day: 'numeric'
    })
    if (!grouped[day]) grouped[day] = []
    grouped[day]!.push(note)
  })

  return (
    <div>
      <div style={{ marginBottom: '40px' }}>
        <div style={{
          fontFamily: mono,
          fontSize: '10px',
          letterSpacing: '2px',
          textTransform: 'uppercase',
          color: B.tan,
          marginBottom: '8px',
        }}>FEED · 말하기</div>
        <div style={{
          fontFamily: serif,
          fontSize: '26px',
          fontWeight: 400,
          color: B.ink,
          marginBottom: '6px',
        }}>텔레그램에서 보낸 말들</div>
        <p style={{ fontSize: '13px', color: B.inkFaint, margin: 0, fontFamily: sans }}>
          일상, 공부, AI학습이 차곡차곡 쌓여요.
        </p>
      </div>

      {!notes?.length ? (
        <p style={{ fontSize: '14px', color: B.inkFaint, textAlign: 'center', padding: '60px 0', fontFamily: sans }}>
          아직 메모가 없어요. 텔레그램에서 말해보세요.
        </p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '36px' }}>
          {Object.entries(grouped).map(([day, dayNotes]) => (
            <div key={day}>
              <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{
                  fontFamily: mono,
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '1.5px',
                  textTransform: 'uppercase',
                  color: B.tan,
                  flexShrink: 0,
                }}>{day}</span>
                <div style={{ flex: 1, height: '1px', background: B.lineSoft }} />
                <span style={{
                  fontFamily: mono,
                  fontSize: '10px',
                  color: B.inkFaint,
                  flexShrink: 0,
                }}>{dayNotes?.length} notes</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                {dayNotes?.map(note => {
                  const cat = getCat(note.category)
                  return (
                    <div key={note.id} style={{
                      display: 'grid',
                      gridTemplateColumns: '52px 68px 1fr',
                      gap: '12px',
                      padding: '10px 16px',
                      background: B.surface,
                      border: `1px solid ${B.line}`,
                      borderRadius: '3px',
                      alignItems: 'baseline',
                    }}>
                      <span style={{
                        fontFamily: mono,
                        fontSize: '11px',
                        color: B.inkFaint,
                        fontVariantNumeric: 'tabular-nums',
                      }}>
                        {new Date(note.created_at).toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })}
                      </span>
                      <span style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        background: cat.bg,
                        color: cat.fg,
                        padding: '2px 7px',
                        fontSize: '10px',
                        fontFamily: mono,
                        fontWeight: 500,
                        letterSpacing: '0.3px',
                        textTransform: 'uppercase',
                        borderRadius: '2px',
                      }}>{note.category}</span>
                      <p style={{
                        fontSize: '14px',
                        color: B.ink,
                        lineHeight: 1.65,
                        fontWeight: 300,
                        margin: 0,
                        fontFamily: sans,
                      }}>{note.text}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
