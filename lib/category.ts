export const CATEGORY_STYLE: Record<string, { bg: string; text: string; border: string; dot: string }> = {
  '바이브코딩': {
    bg: 'bg-indigo-50',
    text: 'text-indigo-700',
    border: 'border-indigo-200',
    dot: 'bg-indigo-400',
  },
  '사업': {
    bg: 'bg-amber-50',
    text: 'text-amber-700',
    border: 'border-amber-200',
    dot: 'bg-amber-400',
  },
  '개념정리': {
    bg: 'bg-emerald-50',
    text: 'text-emerald-700',
    border: 'border-emerald-200',
    dot: 'bg-emerald-400',
  },
  '일지': {
    bg: 'bg-purple-50',
    text: 'text-purple-700',
    border: 'border-purple-200',
    dot: 'bg-purple-400',
  },
}

export function getCategoryStyle(category: string | null) {
  return CATEGORY_STYLE[category ?? ''] ?? {
    bg: 'bg-gray-50',
    text: 'text-gray-600',
    border: 'border-gray-200',
    dot: 'bg-gray-400',
  }
}

export function getPreview(text: string | null, maxLength = 120): string {
  if (!text) return ''
  return text
    .replace(/^#+\s*/gm, '')
    .replace(/\*\*/g, '')
    .replace(/`/g, '')
    .replace(/\n+/g, ' ')
    .trim()
    .slice(0, maxLength)
}
