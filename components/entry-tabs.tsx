'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import { CopyButton } from '@/components/copy-button'
import { SnsGuide } from '@/components/sns-guide'
import { Button } from '@/components/ui/button'

type Entry = {
  id: number
  date: string
  category: string | null
  my_view: string | null
  sns_view: string | null
  expert_view: string | null
}

const tabs = [
  { key: 'my', label: '🙋 나의 관점' },
  { key: 'expert', label: '👔 전문가 요약' },
  { key: 'sns', label: '📱 SNS' },
]

export function EntryTabs({ entry }: { entry: Entry }) {
  const [active, setActive] = useState('my')
  const router = useRouter()

  return (
    <div>
      <div className="flex items-center justify-between mb-4 border-b">
        <div className="flex gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActive(tab.key)}
              className={`pb-2 px-1 text-sm font-medium transition-colors ${
                active === tab.key
                  ? 'border-b-2 border-black text-black'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <Button
          variant="outline"
          size="sm"
          className="mb-2"
          onClick={() => router.push(`/entry/${entry.id}/edit?tab=${active}`)}
        >
          ✏️ 수정
        </Button>
      </div>

      {active === 'my' && (
        <div className="prose prose-sm max-w-none text-gray-700">
          {entry.my_view
            ? <ReactMarkdown>{entry.my_view}</ReactMarkdown>
            : <p className="text-gray-400">아직 작성된 내용이 없어요.</p>
          }
        </div>
      )}

      {active === 'expert' && (
        <div className="prose prose-sm max-w-none text-gray-700">
          {entry.expert_view
            ? <ReactMarkdown>{entry.expert_view}</ReactMarkdown>
            : <p className="text-gray-400">아직 작성된 내용이 없어요.</p>
          }
        </div>
      )}

      {active === 'sns' && (
        <div>
          {entry.sns_view ? (
            <>
              <div className="prose prose-sm max-w-none text-gray-700 mb-3">
                <ReactMarkdown>{entry.sns_view}</ReactMarkdown>
              </div>
              <CopyButton text={entry.sns_view} />
              <SnsGuide />
            </>
          ) : (
            <p className="text-gray-400">아직 작성된 내용이 없어요.</p>
          )}
        </div>
      )}
    </div>
  )
}
