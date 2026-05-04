# Vibelog - 개발 로그

AI 코딩 도구(Claude Code)와 함께 진행한 바이브 코딩 첫 번째 프로젝트 기록입니다.

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
- 6단계 인터뷰 진행
  - Step 1 풍경: 경력 단절 후 바이브 코딩 시작, 스폰지 클럽 수강 중. 소상공인 웹사이트를 빠르게 만들어 크몽에서 판매하는 것이 목표
  - Step 2 통점: 매일 배우는데 손에 남는 게 없는 느낌. 막혔을 때 뭘 모르는지 말로 못 함
  - Step 3 이상향: "나는 오늘 배운 것과 만든 것을 기록하는 것만 하고, 나머지 정리·연결·공유는 시스템이 한다"
  - Step 4 부품 매핑: 일지, 개념 카드(이해 과정 쌓기), 막힌 순간 기록, SNS 변환(복사+붙여넣기), 신랑용 데일리 요약
  - Step 5 첫 부품 결정: MVP — 일지부터 (날짜, 배운 것, 만든 것, 막힌 부분)
  - Step 6 PRD 작성 완료
- `os-blueprint.md` — OS 청사진 생성
- `vibelog.prd.md` — 앱 기획서 생성

**핵심 결정 사항:**
- SNS 공유: 복사+붙여넣기 방식 (직접 자동 포스팅 X)
- 로그인 기능: 나중에 추가, MVP는 없이 시작
- 1~5번 기능 모두 필요하나 일지부터 순차적으로 구현

---

### 2. Next.js 프로젝트 초기화

```
이제 첫 번째부터 만들어보자.
```

**Claude Code 작업:**
- `npx create-next-app@latest`로 Next.js 프로젝트 생성 (TypeScript, Tailwind CSS, App Router 포함)
- `npx shadcn@latest init`으로 UI 컴포넌트 도구 설치
- `npx shadcn@latest add textarea card badge`로 필요한 부품 추가

> 🤔 **이 과정에서 배운 것:**
> "초기화"란 빈 폴더에 앱의 기본 뼈대(파일들)를 자동으로 만들어주는 것. `create-next-app`이 한 번에 필요한 모든 파일을 생성해줌.

---

### 3. Supabase 데이터베이스 연결

```
Vercel과 Supabase는 다른 거지?
```

**개념 이해:**
- Vercel = 식당 건물 (앱을 인터넷에 보여주는 곳)
- Supabase = 주방 냉장고 (기록을 저장하는 데이터베이스)

**직접 한 것 (Supabase 웹사이트에서):**
1. vibelog 프로젝트 생성 — 지역: 아시아태평양(서울)
2. RLS(행 레벨 보안) 해제 — 로그인 없이 혼자 쓰는 앱이라서
3. entries 테이블 생성

**Claude Code 작업:**
- `.env.local` 파일 생성 — Supabase URL과 API 키 저장
- `lib/supabase.ts` 생성 — 앱과 Supabase를 연결하는 코드
- `npm install @supabase/supabase-js` — Supabase 연결 도구 설치

> 🤔 **이 과정에서 배운 것:**
> API 키란 앱이 Supabase에 "나 정식 사용자야"라고 증명하는 비밀번호 같은 것. `.env.local` 파일에 저장해야 외부에 노출되지 않음.
> RLS를 켜면 "이 사람만 읽을 수 있어"라는 규칙이 필요한데, 로그인 기능이 없으면 규칙을 못 만들어서 데이터가 아예 안 읽힘. 그래서 로그인 없는 MVP에서는 꺼두고 시작.

---

### 4. 앱 화면 3개 만들기

**Claude Code 작업:**
- `app/page.tsx` — 홈(목록) 화면: Supabase에서 일지 목록 불러오기, 카드로 표시
- `app/new/page.tsx` — 일지 작성 화면: 날짜, 배운 것, 만든 것, 막힌 부분 입력 → Supabase 저장
- `app/entry/[id]/page.tsx` — 일지 상세 보기

**앱 실행 방법:**
```
D:
cd kyra-test\projects\vibelog
npm run dev
```

> 🤔 **이 과정에서 배운 것:**
> Windows에서 다른 드라이브(C: → D:)로 이동할 때는 먼저 `D:`를 입력해서 드라이브를 바꿔야 함.

---

### 5. GitHub 업로드 & Vercel 배포

```
그냥 이걸 나만 보는 게 아니라 다른 사람과 공유할 수 있는 걸로 우리 거를 바꿔보자.
```

**Claude Code 작업:**
- `git init` → `git add` → `git commit` → GitHub `kandara-ai/vibelog` 저장소에 push
- 첫 push 후 Vercel 연결 시 앱이 기본 Next.js 화면으로 표시되는 문제 발생
  - 원인: 초기 commit에 `app/new/`, `app/entry/`, `lib/` 등 핵심 파일들이 누락되어 있었음
  - 해결: 누락 파일들을 추가 commit하여 push → Vercel 자동 재배포

**직접 한 것 (Vercel 웹사이트에서):**
1. Vercel → New Project → `kandara-ai/vibelog` Import
2. Environment Variables에 `.env.local` 파일 import (Import .env 기능 활용)
3. Deploy 클릭

> 🤔 **이 과정에서 배운 것:**
> `.env.local` 파일은 GitHub에 올라가지 않아서 Vercel에서도 따로 환경변수를 설정해야 함. Vercel의 "Import .env" 기능으로 파일을 통째로 올릴 수 있음.
> 프로젝트마다 GitHub 저장소와 Vercel 프로젝트를 따로 만들어 연결함. GitHub push 시 Vercel이 자동으로 재배포함.

**배포 주소:** https://vibelog-eta.vercel.app

---

### 6. 앱 구조 고도화 — 3가지 관점으로 재설계

```
지금 우리는 '오늘 배운 것', '오늘 만든 것', '막힌 것' 이렇게 나누어져 있잖아.
이걸 그렇게 하지 말고 다음과 같이 세 가지 관점으로 나눌 수 있도록 하자.
1. 나의 관점
2. SNS 포스팅 관점
3. 신랑이 볼 수 있는 전문가 관점
```

**Claude Code 작업:**
- Supabase `entries` 테이블 재설계 (SQL Editor에서 직접 실행)
  - 기존: `learned`, `made`, `stuck` → 변경: `my_view`, `sns_view`, `expert_view`
- `app/new/page.tsx` — 3가지 관점으로 작성 폼 재구성
- `app/entry/[id]/page.tsx` — 3가지 관점 카드로 상세 보기
- `components/copy-button.tsx` — SNS 내용 복사 버튼 (클라이언트 컴포넌트)
- `app/page.tsx` — 홈 화면에 "💡 개념 노트" 버튼 추가

> 🤔 **이 과정에서 배운 것:**
> Supabase 테이블을 UI에서 컬럼 하나하나 클릭하는 것보다 SQL Editor에 코드를 붙여넣고 Run 누르는 게 훨씬 빠름. 앞으로 이 방식으로 테이블 변경.

---

### 7. 개념 노트 기능 추가

```
그냥 수동으로 내가 개념 정리를 할 수 있는 게 따로 있었으면 좋겠어.
내가 개념 정리를 따로 공부한다고 하면, 거기에 내용이 쌓일 수 있도록만 해줘.
```

**Claude Code 작업:**
- Supabase `concept_notes` 테이블 생성 (SQL Editor)
  - `id`, `created_at`, `title`, `content`
- `app/concepts/page.tsx` — 개념 노트 목록
- `app/concepts/new/page.tsx` — 개념 노트 작성
- `app/concepts/[id]/page.tsx` — 개념 노트 상세 보기

**개념 노트의 정의:**
완벽히 이해한 것을 정리하는 게 아니라, **이해해 나가는 과정을 날짜별로 쌓아가는 기록물**

---

### 8. write-post 연동 스크립트 & SNS 업로드 가이드

```
응 그렇게 해주고, 나는 7주동안 스폰지 클럽 1기를 하면서 그것을 함께 공유하면서
나의 SNS를 신규로 만들거야. 아래의 것도 함께 포함해서 해줘.
```

**Claude Code 작업:**
- `scripts/import-devlog.ts` 생성
  - `/write-post` 실행 후 생성된 DEVLOG.md → `my_view` 자동 추출
  - AI_CASE_STUDY.md → `sns_view` 자동 추출
  - 오늘 만든 것 요약 → `expert_view` 자동 생성
  - Supabase entries 테이블에 저장
- `package.json`에 `"import": "tsx scripts/import-devlog.ts"` 스크립트 추가
- `components/sns-guide.tsx` — 스폰지클럽 1기 SNS 업로드 가이드 (접이식)
  - 인스타그램: #스폰지클럽 #스폰지클럽1기 #셀피쉬클럽, 공동 작업자 @spongeclub.ai @selfishclub.official
  - 스레드: 해시태그 + @selfishclub.official 멘션
  - 링크드인, 네이버 블로그 가이드 포함

**앞으로의 매일 루틴:**
```
1. /write-post 실행 → DEVLOG.md + AI_CASE_STUDY.md 생성
2. npm run import → Vibelog에 자동 저장
3. vibelog-eta.vercel.app 에서 확인 및 SNS 업로드
```

---

## 커밋 히스토리

| 날짜 | 커밋 | 설명 |
|------|------|------|
| 05/04 | `353170f` | Add write-post import script and SNS guide |
| 05/04 | `a61117d` | Restructure entries to 3-view format (my/sns/expert) |
| 05/04 | `37f2ed1` | Add concept notes pages |
| 05/04 | `6e0c9ee` | Add Vibelog app pages and Supabase integration |
| 05/04 | `189f8db` | Initial commit from Create Next App |

---

## 기술 스택

- **Frontend**: Next.js 15 (App Router), Tailwind CSS, shadcn/ui
- **Database**: Supabase (PostgreSQL)
- **Language**: TypeScript
- **Deployment**: Vercel (https://vibelog-eta.vercel.app)
- **Source**: GitHub (kandara-ai/vibelog)

---

## 오늘 만든 것

1. **os-blueprint.md** — 나의 OS 청사진 (인터뷰로 발견한 나의 상황·통점·이상향)
2. **vibelog.prd.md** — 앱 기획서
3. **Vibelog 웹앱** — https://vibelog-eta.vercel.app (누구나 접속 가능)
   - 일지 작성·목록·상세 (3가지 관점: 나의 관점 / SNS / 전문가)
   - 개념 노트 작성·목록·상세
   - SNS 복사 버튼 + 스폰지클럽 업로드 가이드
4. **import 스크립트** — write-post → Vibelog 자동 연동 (`npm run import`)
