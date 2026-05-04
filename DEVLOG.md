# Vibelog - 개발 로그

AI 코딩 도구(Claude Code)와 함께 진행한 첫 번째 바이브 코딩 프로젝트 기록입니다.

---

## 2026-05-04 (Day 1)

### 1. OS Interview Skill로 앱 기획하기

```
https://github.com/selfishclub/os-interview-skill
나는 이 스킬을 이용해서 학습 일지 앱을 만들고 싶어.
바이브 코딩 초보자로서 매일 배운 내용을 기록하고 싶은데,
OS Interview Skill로 인터뷰를 진행해서 기획서를 만들고 싶어.
```

**Claude Code 작업:**
- GitHub에서 OS Interview Skill(SKILL.md) 내용을 가져와서 프로젝트에 설치
  - `.claude/skills/os-interview/SKILL.md` 생성
  - `.claude/skills/os-interview/templates/output-prd.md` 생성
- 6단계 인터뷰 진행 (Phase 1~3)
  - Step 1 풍경: 경력 단절 후 바이브 코딩 시작, 스폰지 클럽 수강 중
  - Step 2 통점: 매일 배우는데 손에 남는 게 없는 느낌, 막혔을 때 뭘 모르는지 말로 못 함
  - Step 3 이상향: "나는 오늘 배운 것과 만든 것을 기록하는 것만 하고, 나머지 정리·연결·공유는 시스템이 한다"
  - Step 4 부품 매핑: 일지, 개념 카드, 진도 캘린더, SNS 변환, 신랑용 데일리 요약
  - Step 5 첫 부품 결정: 일지 (MVP)
  - Step 6 PRD 작성 완료

**생성된 파일:**
- `os-blueprint.md` — OS 청사진 (나의 현재 상황, 통점, 이상향, 부품 목록)
- `vibelog.prd.md` — 앱 기획서 (기능 정의, 기술 스택, MVP 범위)

---

### 2. OS Interview 인터뷰 핵심 Q&A

**기획 과정에서 결정된 주요 내용들:**

```
Q: SNS 공유 기능을 어떻게 구현하면 좋을까요?
A: 복사+붙여넣기 방식 선택 (직접 자동 포스팅은 플랫폼 심사 필요로 복잡)
```

```
Q: 이 앱에 로그인 기능이 필요한가요?
A: 처음엔 간단하게, 이후에 로그인을 붙이는 방식으로
```

```
Q: 1~5번 기능을 한꺼번에 만들 수 있나요?
A: 순차적으로 만들기로 결정
   1주차: 일지 (작성+저장+보기)
   2주차: 개념 카드 + 진도 캘린더
   3주차: SNS 변환 + 신랑 데일리 요약
```

---

### 3. Next.js 프로젝트 초기화

```
이제 첫 번째부터 만들어보자.
우리가 한 내용을 정리하고 만드는 게 맞겠지?
```

**Claude Code 작업:**
- `npx create-next-app@latest` 로 Next.js 15 프로젝트 생성
  - TypeScript, Tailwind CSS, ESLint, App Router 포함
- `npx shadcn@latest init` 로 UI 컴포넌트 도구 설치
- `npx shadcn@latest add textarea card badge` 로 필요한 부품 추가

**🤔 이 과정에서 배운 것:**
> "초기화"란 빈 폴더에 앱의 기본 뼈대(파일들)를 자동으로 만들어주는 것. 직접 파일을 하나하나 만드는 대신, `create-next-app`이 한 번에 필요한 모든 파일을 생성해줌.

---

### 4. Supabase 데이터베이스 연결

```
Vercel과 Supabase는 다른 거지?
```

**개념 이해:**
- Vercel = 식당 건물 (앱을 인터넷에 보여주는 곳)
- Supabase = 주방 냉장고 (기록을 저장하는 데이터베이스)
- 둘 다 있어야 "쓰고 → 저장 → 나중에 다시 보기" 가능

**직접 한 것 (Supabase 웹사이트에서):**
1. vibelog 조직(Organization) 생성 — Type: Personal, Plan: Free
2. vibelog 프로젝트 생성 — 지역: 아시아태평양(서울)
3. RLS(행 레벨 보안) 해제 — 지금은 로그인 없이 혼자 쓰는 앱이라서
4. entries 테이블 생성 — 일지를 저장할 공간

**entries 테이블 구조:**
| 컬럼명 | 타입 | 역할 |
|--------|------|------|
| id | int8 | 각 일지의 고유 번호 (자동) |
| created_at | timestamptz | 만든 시간 (자동) |
| date | date | 일지 날짜 |
| learned | text | 오늘 배운 개념 |
| made | text | 오늘 만든 것 |
| stuck | text | 막힌 부분 |

**Claude Code 작업:**
- `.env.local` 파일 생성 — Supabase URL과 API 키 저장
  - `NEXT_PUBLIC_SUPABASE_URL` — Supabase 프로젝트 주소
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY` — 앱이 Supabase에 접근하는 비밀번호
- `lib/supabase.ts` 생성 — 앱과 Supabase를 연결하는 코드
- `npm install @supabase/supabase-js` — Supabase 연결 도구 설치

**🤔 이 과정에서 배운 것:**
> API 키란 앱이 Supabase에 "나 정식 사용자야"라고 증명하는 비밀번호 같은 것. .env.local 파일에 저장해야 외부에 노출되지 않음.
> RLS(Row Level Security)를 켜면 "이 사람만 읽을 수 있어"라는 규칙이 필요한데, 로그인 기능이 없으면 규칙을 못 만들어서 데이터가 아예 안 읽힘. 그래서 로그인 없는 MVP에서는 꺼두고 시작.

---

### 5. 앱 화면 3개 만들기

```
이제 첫 번째부터 만들어보자.
앱이 잘 동작하는지 확인해보고 싶어.
```

**Claude Code 작업:**
- `app/page.tsx` — 홈(목록) 화면
  - Supabase에서 일지 목록 불러오기
  - 날짜, 배운 내용, 막힌 부분 카드로 표시
  - "오늘 일지 쓰기" 버튼
- `app/new/page.tsx` — 일지 작성 화면
  - 날짜 입력 (오늘 날짜 자동)
  - 오늘 배운 개념, 오늘 만든 것, 막힌 부분 입력칸
  - 저장 버튼 → Supabase에 저장 → 홈으로 이동
- `app/entry/[id]/page.tsx` — 일지 상세 보기 화면
  - 저장된 일지 내용 상세 표시

**앱 실행 방법:**
```
D:                              ← D 드라이브로 이동 (Windows 필수)
cd kyra-test\projects\vibelog   ← vibelog 폴더로 이동
npm run dev                     ← 개발 서버 시작
```
→ 브라우저에서 `localhost:3000` 열면 앱 확인 가능

**🤔 이 과정에서 배운 것:**
> Windows에서 터미널로 다른 드라이브(C: → D:)로 이동할 때는 먼저 `D:`를 입력해서 드라이브를 바꿔야 함. 그냥 `cd D:\...`만 하면 드라이브가 안 바뀜.

---

### 6. 일지 구조를 3가지 관점으로 재설계

```
나의 관점, SNS 포스팅 관점, 전문가(신랑) 관점 — 이렇게 세 가지로 나눠서 저장하고 싶어.
```

**Claude Code 작업:**
- Supabase `entries` 테이블 컬럼 재구성
  - 기존: `learned`, `made`, `stuck` → 삭제
  - 신규: `my_view`, `sns_view`, `expert_view` — 같은 내용을 보는 사람에 따라 다르게 표현
- `app/new/page.tsx` — 3가지 관점 입력 폼으로 교체
- `components/entry-tabs.tsx` — 탭으로 3가지 관점 전환하는 컴포넌트 생성
- `concept_notes` 테이블 별도 생성 — 개념 공부를 일지와 분리해서 쌓는 공간

**🤔 이 과정에서 배운 것:**
> 같은 내용을 세 명이 본다: "나"(기억용), "SNS 팔로워"(공유용), "신랑"(검증용). 데이터는 하나인데 보는 방식을 다르게 만드는 게 핵심이었다.

---

### 7. Vercel 배포 완료

```
이게 자동으로 배포될 수 있도록 해줘.
```

**직접 한 것 (Vercel 웹사이트에서):**
1. GitHub `kandara-ai/vibelog` 리포지토리를 Vercel에 연결
2. `.env.local`의 환경변수 2개를 Vercel에 입력 (Import .env 기능 활용)
3. Deploy 클릭 → 자동 빌드 및 배포

**배포된 주소:** https://vibelog-eta.vercel.app

**앱이 비어 보이는 문제 → 두 가지 원인 발견 및 해결:**
1. Supabase RLS(행 레벨 보안)가 다시 켜져 있었음 → SQL로 비활성화
2. Next.js 서버가 데이터를 캐시해서 새 데이터를 안 가져옴 → `export const dynamic = 'force-dynamic'` 추가

**🤔 이 과정에서 배운 것:**
> Vercel 배포 = GitHub에 코드를 올리면 Vercel이 자동으로 웹사이트를 다시 만들어줌. 코드를 바꿀 때마다 git push만 하면 자동으로 반영됨.
> `force-dynamic`이란: Next.js가 "이 페이지는 매번 새로 불러와야 해"라고 알려주는 것. 이게 없으면 한 번 캐시된 내용을 계속 보여줘서 새 일지가 안 보임.

---

### 8. 마크다운 렌더링 및 탭 UI 구현

```
md파일 형식으로 전달되어 읽기도 불편해. 스크롤이 너무 많이 되.
```

**Claude Code 작업:**
- `npm install react-markdown` — 마크다운을 예쁘게 보여주는 도구 설치
- `components/entry-tabs.tsx` — 3가지 관점을 탭으로 전환하는 UI 구현
  - 나의 관점, 전문가 요약, SNS 탭 전환
  - 마크다운 텍스트 → 제목·굵게·목록 등으로 자동 변환
- `components/copy-button.tsx` — SNS 탭에 복사 버튼 추가 ("복사됨!" 피드백 포함)
- `components/sns-guide.tsx` — 스폰지클럽 1기 SNS 업로드 가이드 접이식 메뉴

**🤔 이 과정에서 배운 것:**
> 마크다운이란 `**굵게**`, `## 제목` 같은 기호로 서식을 표현하는 방식. 저장할 때는 기호 그대로 저장되고, 화면에 보여줄 때 react-markdown이 예쁜 글씨로 변환해줌.
> 긴 내용을 스크롤 없이 보려면 탭 UI가 효과적 — 하나의 카드에 여러 내용을 담아 전환해서 봄.

---

### 9. write-post 연동 → 자동 저장 스크립트

```
이것이 자동으로 오늘의 일지에 세 가지 형태로 날짜별로 자동으로 등록되게는 어떻게 해야해?
```

**Claude Code 작업:**
- `scripts/import-devlog.ts` 생성 — DEVLOG.md와 AI_CASE_STUDY.md를 읽어 Supabase에 저장
  - DEVLOG.md 오늘 날짜 섹션 → `my_view`
  - AI_CASE_STUDY.md 전체 → `sns_view`
  - 기술 스택 + 결과물 자동 추출 → `expert_view`
  - `EXPERT_VIEW.md` 있으면 우선 사용 (vibelog-post 스킬이 직접 작성한 요약)
- `package.json`에 `"import": "tsx scripts/import-devlog.ts"` 스크립트 추가

**사용 방법:**
```
npm run import
```

**🤔 이 과정에서 배운 것:**
> 스크립트란 반복 작업을 한 줄 명령어로 자동화한 것. npm run import 하나로 파일 읽기 → 데이터 변환 → DB 저장이 한 번에 됨.

---

### 10. vibelog-post 커스텀 스킬 제작

```
내 상황에 맞는 것을 따로 만들어서 사용하는 게 더 좋을 것 같아요.
7주가 지나서도 계속할 거잖아. 쌓이면 쌓일수록 나는 점점 고도화되는 거잖아.
```

**Claude Code 작업:**
- `.claude/skills/vibelog-post/SKILL.md` 생성
  - Phase 1: 세션 스캔 → DEVLOG 작성
  - Phase 2: 과거 Vibelog entries 읽어 성장 수준 파악 (입문/초급/중급/고급)
  - Phase 3: 3가지 관점 생성 (수준에 맞게 자동 조정)
  - Phase 4: Vibelog에 저장
- `C:\Users\kanda\.claude\skills\vibelog-post\` 에 전역 복사 → 어디서든 `/vibelog-post` 사용 가능

**🤔 이 과정에서 배운 것:**
> 스킬이란 Claude Code에게 "이런 상황에서 이렇게 행동해"를 가르치는 파일. 내 상황(신랑이 시니어 개발자, 스폰지클럽 활동 중)을 기억하고, 기록이 쌓일수록 더 깊은 제안을 해줌.

---

### 11. Git 연결 및 자동 배포 설정

```
Git과 연결하고, 이게 자동으로 배포될 수 있도록 해줘.
```

**Claude Code 작업:**
- `git init` → 기존 GitHub remote(`kandara-ai/vibelog`) 확인
- `git add . && git commit` → 오늘 변경사항 저장
- `git push origin main` → GitHub에 업로드

**결과:** 코드 push → Vercel이 자동 감지 → 웹사이트 자동 재배포

**🤔 이 과정에서 배운 것:**
> Git = 변경 기록 관리 도구. 로컬(내 컴퓨터)에서 저장한다고 웹사이트가 바뀌는 게 아니라, GitHub에 push해야 Vercel이 감지하고 자동으로 새로 배포해줌.

---

## 기술 스택

- **Frontend**: Next.js 15 (App Router), Tailwind CSS, shadcn/ui, react-markdown
- **Database**: Supabase (PostgreSQL)
- **Language**: TypeScript
- **Deployment**: Vercel (GitHub 연동 자동 배포)

---

## 오늘 만든 것

1. **os-blueprint.md** — 나의 OS 청사진
2. **vibelog.prd.md** — 앱 기획서
3. **Vibelog 웹앱** — https://vibelog-eta.vercel.app (실제 배포 완료)
   - 3가지 관점 탭 UI (나의 관점 / 전문가 요약 / SNS)
   - 마크다운 렌더링, SNS 복사 버튼, 스폰지클럽 업로드 가이드
   - Supabase 연동 일지 저장
4. **scripts/import-devlog.ts** — write-post → Vibelog 자동 저장 스크립트
5. **.claude/skills/vibelog-post/SKILL.md** — 나에게 맞는 커스텀 기록 스킬

---

## 앞으로 할 것

- [x] GitHub repository 생성 및 코드 업로드
- [x] Vercel 배포 완료
- [ ] 개념 노트 페이지 다듬기
- [ ] 홈 화면 UI 개선
- [ ] 2주차: 진도 캘린더 추가
