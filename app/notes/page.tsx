export const dynamic = 'force-dynamic'

import { supabase } from '@/lib/supabase'

const STYLE: Record<string, { bg: string; text: string }> = {
  '일상': { bg: '#E8F4F8', text: '#4A8FA8' },
  '공부': { bg: '#EAF5EF', text: '#4A8F6A' },
  'AI학습': { bg: '#F2EEF8', text: '#7A5FA8' },
}

function getStyle(category: string) {
  return STYLE[category] ?? { bg: '#F5F0EB', text: '#8A7A70' }
}

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
      <div style={{ marginBottom: '36px' }}>
        <h1 style={{ fontSize: '18px', fontWeight: 500, color: '#2D2520', marginBottom: '4px' }}>말하기</h1>
        <p style={{ fontSize: '13px', color: '#C0A898' }}>텔레그램에서 보낸 말들이 차곡차곡 쌓여요.</p>
      </div>

      {!notes?.length ? (
        <p style={{ fontSize: '14px', color: '#C0A898', textAlign: 'center', padding: '60px 0' }}>
          아직 메모가 없어요. 텔레그램에서 말해보세요.
        </p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {Object.entries(grouped).map(([day, dayNotes]) => (
            <div key={day}>
              <div style={{ marginBottom: '10px' }}>
                <span style={{
                  display: 'inline-block',
                  fontSize: '10px',
                  fontWeight: 600,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  color: '#FFF8F4',
                  background: '#C4957A',
                  padding: '2px 10px',
                  borderRadius: '2px',
                }}>
                  {day}
                </span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {dayNotes?.map(note => {
                  const style = getStyle(note.category)
                  return (
                    <div key={note.id} style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '10px',
                      padding: '10px 12px',
                      borderRadius: '5px',
                      background: 'rgba(255,255,255,0.7)',
                    }}>
                      <span style={{
                        flexShrink: 0,
                        fontSize: '9px',
                        fontWeight: 600,
                        letterSpacing: '0.05em',
                        padding: '2px 7px',
                        borderRadius: '10px',
                        marginTop: '2px',
                        background: style.bg,
                        color: style.text,
                      }}>
                        {note.category}
                      </span>
                      <p style={{ flex: 1, fontSize: '14px', color: '#3D3028', lineHeight: 1.6, fontWeight: 300 }}>
                        {note.text}
                      </p>
                      <span style={{ flexShrink: 0, fontSize: '11px', color: '#C8B8AE', marginTop: '2px' }}>
                        {new Date(note.created_at).toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })}
                      </span>
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
