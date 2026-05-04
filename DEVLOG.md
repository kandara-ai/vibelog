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

## 기술 스택

- **Frontend**: Next.js 15 (App Router), Tailwind CSS, shadcn/ui
- **Database**: Supabase (PostgreSQL)
- **Language**: TypeScript
- **Deployment**: Vercel (예정)

---

## 오늘 만든 것

1. **os-blueprint.md** — 나의 OS 청사진 (인터뷰로 발견한 나의 상황·통점·이상향)
2. **vibelog.prd.md** — 앱 기획서
3. **Vibelog 웹앱 MVP** — localhost:3000에서 실제 동작 확인
   - 일지 작성 → Supabase에 저장 → 목록에서 확인

---

## 앞으로 할 것

- [ ] GitHub repository 생성 및 코드 업로드
- [ ] Vercel 배포 (인터넷 주소 생성)
- [ ] 2주차: 개념 카드 + 진도 캘린더 추가
- [ ] 3주차: SNS 변환 + 신랑용 데일리 요약 추가
