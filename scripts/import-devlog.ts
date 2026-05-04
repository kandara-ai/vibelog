import { createClient } from '@supabase/supabase-js'
import * as fs from 'fs'
import * as path from 'path'

// .env.local 읽기
const envPath = path.join(process.cwd(), '.env.local')
const envContent = fs.readFileSync(envPath, 'utf-8')
const env: Record<string, string> = {}
for (const line of envContent.split('\n')) {
  const [key, ...rest] = line.split('=')
  if (key && rest.length) env[key.trim()] = rest.join('=').trim()
}

const supabase = createClient(
  env['NEXT_PUBLIC_SUPABASE_URL'],
  env['NEXT_PUBLIC_SUPABASE_ANON_KEY']
)

function extractTodaySection(content: string, date: string): string {
  // "## YYYY-MM-DD" 형식의 섹션 찾기
  const regex = new RegExp(`## ${date}[\\s\\S]*?(?=\\n## \\d{4}-|$)`)
  const match = content.match(regex)
  return match ? match[0].trim() : content.trim()
}

function extractExpertSummary(content: string): string {
  // "오늘 만든 것" 섹션에서 번호 목록 추출
  const madeSection = content.match(/## 오늘 만든 것\n([\s\S]*?)(?=\n##|$)/)
  if (madeSection) {
    const lines = madeSection[1].trim().split('\n').filter(l => l.startsWith('1.') || l.startsWith('2.') || l.startsWith('3.'))
    if (lines.length) return lines.join(', ').replace(/\*\*/g, '').replace(/\d+\. /g, '').trim()
  }
  // fallback: 첫 번째 의미있는 줄들
  const lines = content.split('\n').filter(l => l.trim() && !l.startsWith('#')).slice(0, 2)
  return lines.join(' ').trim()
}

async function main() {
  const today = new Date().toISOString().split('T')[0]

  // DEVLOG.md 읽기
  const devlogPath = path.join(process.cwd(), 'DEVLOG.md')
  if (!fs.existsSync(devlogPath)) {
    console.error('❌ DEVLOG.md 파일이 없어요. /write-post를 먼저 실행해주세요.')
    process.exit(1)
  }
  const devlogContent = fs.readFileSync(devlogPath, 'utf-8')
  const myView = extractTodaySection(devlogContent, today)
  const expertView = extractExpertSummary(devlogContent)

  // AI_CASE_STUDY.md 읽기 (SNS용)
  const caseStudyPath = path.join(process.cwd(), 'AI_CASE_STUDY.md')
  const snsView = fs.existsSync(caseStudyPath)
    ? fs.readFileSync(caseStudyPath, 'utf-8')
    : ''

  // Supabase에 저장
  const { error } = await supabase.from('entries').insert({
    date: today,
    my_view: myView,
    sns_view: snsView,
    expert_view: expertView,
  })

  if (error) {
    console.error('❌ 저장 오류:', error.message)
  } else {
    console.log(`✅ ${today} 일지가 Vibelog에 저장됐어요!`)
    console.log(`🌐 확인: https://vibelog-eta.vercel.app`)
  }
}

main()
