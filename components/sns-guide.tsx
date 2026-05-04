'use client'

import { useState } from 'react'

export function SnsGuide() {
  const [open, setOpen] = useState(false)

  return (
    <div className="mt-3 border rounded-md overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 flex items-center justify-between"
      >
        <span>📋 스폰지클럽 1기 업로드 가이드</span>
        <span>{open ? '▲' : '▼'}</span>
      </button>

      {open && (
        <div className="px-4 py-3 text-sm text-gray-600 space-y-4 bg-gray-50">

          <div>
            <p className="font-semibold mb-1">📸 인스타그램</p>
            <p className="text-xs text-gray-500 mb-1">해시태그 (필수)</p>
            <code className="text-xs bg-white px-2 py-1 rounded block">#스폰지클럽 #스폰지클럽1기 #셀피쉬클럽</code>
            <p className="text-xs text-gray-500 mt-2 mb-1">공동 작업자 초대 (필수)</p>
            <p className="text-xs">게시물 작성 → "사람 태그" → "공동 작업자 초대"</p>
            <p className="text-xs font-medium mt-1">@spongeclub.ai · @selfishclub.official</p>
          </div>

          <div>
            <p className="font-semibold mb-1">🧵 스레드</p>
            <code className="text-xs bg-white px-2 py-1 rounded block">#스폰지클럽 #스폰지클럽1기 #셀피쉬클럽</code>
            <p className="text-xs mt-1">본문에 <strong>@selfishclub.official</strong> 멘션 추가</p>
          </div>

          <div>
            <p className="font-semibold mb-1">💼 링크드인</p>
            <code className="text-xs bg-white px-2 py-1 rounded block">#스폰지클럽 #스폰지클럽1기 #셀피쉬클럽</code>
          </div>

          <div>
            <p className="font-semibold mb-1">🟢 네이버 블로그</p>
            <p className="text-xs text-gray-500 mb-1">태그 (# 없이 입력)</p>
            <code className="text-xs bg-white px-2 py-1 rounded block">스폰지클럽 · 스폰지클럽1기 · 셀피쉬클럽</code>
          </div>

        </div>
      )}
    </div>
  )
}
