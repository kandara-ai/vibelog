'use client'

import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { CopyButton } from '@/components/copy-button'
import { SnsGuide } from '@/components/sns-guide'

type Entry = {
  id: number
  date: string
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

  return (
    <div>
      <div className="flex gap-2 mb-4 border-b">
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
