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
  // 기술 스택 추출
  const stackSection = content.match(/## 기술 스택\n([\s\S]*?)(?=\n##|$)/)
  const stackLines = stackSection
    ? stackSection[1].trim().split('\n')
        .filter(l => l.startsWith('-'))
        .map(l => l.replace(/^-\s+\*\*[^*]+\*\*:\s*/, '').trim())
        .join(', ')
    : ''

  // 오늘 만든 것 추출 (파일명 제외, 설명만)
  const madeSection = content.match(/## 오늘 만든 것\n([\s\S]*?)(?=\n##|$)/)
  const madeLines = madeSection
    ? madeSection[1].trim().split('\n')
        .filter(l => /^\d+\./.test(l))
        .map(l => l
          .replace(/^\d+\.\s+/, '')
          .replace(/\*\*[^*]+\*\*\s*—\s*/, '') // 파일명 제거
          .replace(/`[^`]+`/g, '')              // 코드 제거
          .trim()
        )
        .filter(l => l.length > 5)
        .slice(0, 3)
    : []

  // 배포 주소 추출
  const deployMatch = content.match(/https:\/\/[a-z0-9-]+\.vercel\.app/)
  const deployUrl = deployMatch ? deployMatch[0] : ''

  // 조합
  const parts: string[] = []
  if (madeLines.length) parts.push(madeLines.join(', '))
  if (stackLines) parts.push(`사용 도구: ${stackLines}`)
  if (deployUrl) parts.push(`배포: ${deployUrl}`)

  return parts.join('\n') || content.split('\n').find(l => l.trim() && !l.startsWith('#')) || ''
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

  // EXPERT_VIEW.md가 있으면 우선 사용, 없으면 자동 추출
  const expertViewPath = path.join(process.cwd(), 'EXPERT_VIEW.md')
  const finalExpertView = fs.existsSync(expertViewPath)
    ? (() => {
        const content = fs.readFileSync(expertViewPath, 'utf-8')
        console.log('📋 EXPERT_VIEW.md에서 전문가 요약을 읽었어요.')
        return content.trim()
      })()
    : expertView

  // Supabase에 저장
  const { error } = await supabase.from('entries').insert({
    date: today,
    my_view: myView,
    sns_view: snsView,
    expert_view: finalExpertView,
  })

  if (error) {
    console.error('❌ 저장 오류:', error.message)
  } else {
    console.log(`✅ ${today} 일지가 Vibelog에 저장됐어요!`)
    console.log(`🌐 확인: https://vibelog-eta.vercel.app`)
  }
}

main()
