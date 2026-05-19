export const dynamic = 'force-dynamic'

import { supabase } from '@/lib/supabase'

const STYLE: Record<string, { bg: string; text: string; dot: string }> = {
  '일상': { bg: 'bg-sky-50', text: 'text-sky-700', dot: 'bg-sky-400' },
  '공부': { bg: 'bg-emerald-50', text: 'text-emerald-700', dot: 'bg-emerald-400' },
  'AI학습': { bg: 'bg-violet-50', text: 'text-violet-700', dot: 'bg-violet-400' },
}

function getStyle(category: string) {
  return STYLE[category] ?? { bg: 'bg-gray-50', text: 'text-gray-600', dot: 'bg-gray-400' }
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
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight mb-2">말하기</h1>
        <p className="text-gray-500">텔레그램에서 보낸 메모들이 자동으로 쌓여요.</p>
      </div>

      {!notes?.length ? (
        <p className="text-gray-400 text-center py-20">아직 메모가 없어요. 텔레그램에 말해보세요.</p>
      ) : (
        <div className="space-y-8">
          {Object.entries(grouped).map(([day, dayNotes]) => (
            <div key={day}>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">{day}</p>
              <div className="space-y-2">
                {dayNotes?.map(note => {
                  const style = getStyle(note.category)
                  return (
                    <div key={note.id} className="bg-white border rounded-xl p-4 flex gap-3 items-start">
                      <span className={`mt-0.5 inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full shrink-0 ${style.bg} ${style.text}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
                        {note.category}
                      </span>
                      <p className="text-sm text-gray-700 leading-relaxed flex-1">{note.text}</p>
                      <p className="text-xs text-gray-400 shrink-0">
                        {new Date(note.created_at).toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })}
                      </p>
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
