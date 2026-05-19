'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import { CopyButton } from '@/components/copy-button'
import { SnsGuide } from '@/components/sns-guide'

type Entry = {
  id: number
  date: string
  category: string | null
  my_view: string | null
  sns_view: string | null
  expert_view: string | null
}

const B = {
  ink: '#fbf4e1',
  inkDim: '#b9a988',
  inkFaint: '#7a6e55',
  line: 'rgba(251, 244, 225, 0.14)',
  tan: '#f0b878',
  surface2: '#2a231b',
}

const mono = "'IBM Plex Mono', ui-monospace, monospace"
const sans = "'IBM Plex Sans KR', system-ui, sans-serif"

const tabs = [
  { key: 'my', label: '나의 관점' },
  { key: 'expert', label: '전문가 요약' },
  { key: 'sns', label: 'SNS' },
]

const proseVars = {
  '--tw-prose-body': B.ink,
  '--tw-prose-headings': B.ink,
  '--tw-prose-lead': B.inkDim,
  '--tw-prose-links': B.tan,
  '--tw-prose-bold': B.ink,
  '--tw-prose-counters': B.inkDim,
  '--tw-prose-bullets': B.inkDim,
  '--tw-prose-hr': B.line,
  '--tw-prose-quotes': B.inkDim,
  '--tw-prose-quote-borders': B.line,
  '--tw-prose-captions': B.inkFaint,
  '--tw-prose-code': '#cba6e0',
  '--tw-prose-pre-code': B.ink,
  '--tw-prose-pre-bg': B.surface2,
  '--tw-prose-th-borders': B.line,
  '--tw-prose-td-borders': B.line,
} as React.CSSProperties

export function EntryTabs({ entry }: { entry: Entry }) {
  const [active, setActive] = useState('my')
  const router = useRouter()

  const content = active === 'my' ? entry.my_view
    : active === 'expert' ? entry.expert_view
    : entry.sns_view

  return (
    <div>
      {/* 탭 헤더 */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '20px',
        borderBottom: `1px solid ${B.line}`,
        paddingBottom: '0',
      }}>
        <div style={{ display: 'flex', gap: '0' }}>
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActive(tab.key)}
              style={{
                padding: '8px 16px',
                fontSize: '12px',
                fontFamily: mono,
                fontWeight: active === tab.key ? 600 : 400,
                color: active === tab.key ? B.ink : B.inkFaint,
                borderBottom: active === tab.key ? `2px solid ${B.tan}` : '2px solid transparent',
                background: 'transparent',
                border: 'none',
                borderBottom: active === tab.key ? `2px solid ${B.tan}` : '2px solid transparent',
                cursor: 'pointer',
                transition: 'color 0.15s',
                marginBottom: '-1px',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <button
          onClick={() => router.push(`/entry/${entry.id}/edit?tab=${active}`)}
          style={{
            fontSize: '11px',
            fontFamily: mono,
            color: B.inkDim,
            background: 'transparent',
            border: `1px solid ${B.line}`,
            borderRadius: '3px',
            padding: '4px 12px',
            cursor: 'pointer',
            marginBottom: '8px',
          }}
        >
          수정
        </button>
      </div>

      {/* 콘텐츠 */}
      {active === 'sns' ? (
        <div>
          {entry.sns_view ? (
            <>
              <div
                className="prose prose-sm prose-invert max-w-none"
                style={{ ...proseVars, fontFamily: sans }}
              >
                <ReactMarkdown>{entry.sns_view}</ReactMarkdown>
              </div>
              <div style={{ marginTop: '16px' }}>
                <CopyButton text={entry.sns_view} />
              </div>
              <SnsGuide />
            </>
          ) : (
            <p style={{ color: B.inkFaint, fontSize: '14px', fontFamily: sans }}>
              아직 작성된 내용이 없어요.
            </p>
          )}
        </div>
      ) : (
        <div>
          {content ? (
            <div
              className="prose prose-sm prose-invert max-w-none"
              style={{ ...proseVars, fontFamily: sans }}
            >
              <ReactMarkdown>{content}</ReactMarkdown>
            </div>
          ) : (
            <p style={{ color: B.inkFaint, fontSize: '14px', fontFamily: sans }}>
              아직 작성된 내용이 없어요.
            </p>
          )}
        </div>
      )}
    </div>
  )
}
