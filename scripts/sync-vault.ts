/**
 * Obsidian vault → Supabase 동기화 스크립트
 * 사용법: npm run sync
 *
 * D:\slowquick\ 의 마크다운 파일을 읽어 Supabase entries 테이블에 저장
 * 폴더명 = category, 파일명 or frontmatter date = date
 */

import { createClient } from '@supabase/supabase-js'
import * as fs from 'fs'
import * as path from 'path'

const envContent = fs.readFileSync(path.join(process.cwd(), '.env.local'), 'utf-8')
const env: Record<string, string> = {}
for (const line of envContent.split('\n')) {
  const [key, ...rest] = line.split('=')
  if (key && rest.length) env[key.trim()] = rest.join('=').trim()
}

const supabase = createClient(env['NEXT_PUBLIC_SUPABASE_URL'], env['NEXT_PUBLIC_SUPABASE_ANON_KEY'])

const VAULT_PATH = 'D:\\slowquick'
const SKIP_FOLDERS = ['.obsidian', '_templates']

function parseFrontmatter(content: string): { meta: Record<string, string>; body: string } {
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
  if (!match) return { meta: {}, body: content.trim() }

  const meta: Record<string, string> = {}
  match[1].split('\n').forEach(line => {
    const [k, ...v] = line.split(':')
    if (k && v.length) meta[k.trim()] = v.join(':').trim()
  })
  return { meta, body: match[2].trim() }
}

function getDateFromFilename(filename: string): string {
  // YYYY-MM-DD 패턴 추출, 없으면 오늘 날짜
  const match = filename.match(/(\d{4}-\d{2}-\d{2})/)
  return match ? match[1] : new Date().toISOString().split('T')[0]
}

async function syncVault() {
  const categories = fs.readdirSync(VAULT_PATH).filter(name => {
    const fullPath = path.join(VAULT_PATH, name)
    return fs.statSync(fullPath).isDirectory() && !SKIP_FOLDERS.includes(name)
  })

  console.log(`\n📂 vault: ${VAULT_PATH}`)
  console.log(`📁 카테고리: ${categories.join(', ')}\n`)

  let synced = 0
  let skipped = 0

  for (const category of categories) {
    const categoryPath = path.join(VAULT_PATH, category)
    const files = fs.readdirSync(categoryPath).filter(f => f.endsWith('.md'))

    for (const file of files) {
      const filePath = path.join(categoryPath, file)
      const raw = fs.readFileSync(filePath, 'utf-8')
      const { meta, body } = parseFrontmatter(raw)

      if (!body.trim()) { skipped++; continue }

      const date = meta.date || getDateFromFilename(file)
      const snsView = meta.sns_view || null
      const expertView = meta.expert_view || null

      const { error } = await supabase.from('entries').upsert(
        { date, category, my_view: body, sns_view: snsView, expert_view: expertView },
        { onConflict: 'date,category' }
      )

      if (error) {
        console.error(`  ✗ ${category}/${file}: ${error.message}`)
      } else {
        console.log(`  ✓ ${category}/${file} → ${date}`)
        synced++
      }
    }
  }

  console.log(`\n✅ ${synced}개 동기화 완료${skipped ? `, ${skipped}개 건너뜀` : ''}`)
  console.log(`🌐 https://vibelog-eta.vercel.app\n`)
}

syncVault()
