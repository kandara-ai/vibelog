export interface CategoryStyle {
  fg: string
  bg: string
}

export const CATEGORY_STYLE: Record<string, CategoryStyle> = {
  '바이브코딩': { fg: '#a8c485', bg: 'rgba(168, 196, 133, 0.20)' },
  '사업': { fg: '#f0b878', bg: 'rgba(240, 184, 120, 0.22)' },
  '개념정리': { fg: '#cba6e0', bg: 'rgba(203, 166, 224, 0.20)' },
  '일지': { fg: '#b9a988', bg: 'rgba(185, 169, 136, 0.15)' },
}

export function getCategoryStyle(category: string | null): CategoryStyle {
  return CATEGORY_STYLE[category ?? ''] ?? { fg: '#b9a988', bg: 'rgba(185, 169, 136, 0.15)' }
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
