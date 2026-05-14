# Vibelog - 개발 로그

AI 코딩 도구(Claude Code)와 함께 진행한 첫 번째 바이브 코딩 프로젝트 기록입니다.

---

## 2026-05-12

### 1. OS 인터뷰 스킬로 "AI 마켓이 뭔지" 정의했다

```
소상공인들이 전환되지 않는 문제를 사업적으로 어떻게 설명할 수 있을지 구체화하고 싶어.
지금 당장 랜딩 페이지를 만드는 것보다 그게 우선이야.
```

**오늘 하기 전 상태:**
아이디어와 IPO 구현 워크플로우는 있었는데, "AI 마켓이 무엇인지"를 한 문장으로 정의하지 못하고 있었다. 사업계획서도 있고, 만든 것도 있는데, 막상 설명하려 하면 뭐라고 해야 할지 뒤엉켜 있었다.

**OS 인터뷰를 통해 나온 것:**
- 풍경: 아이디어와 워크플로우만 있는 상태
- 통점: "AI 마켓이 뭔지" 한 문장으로 말하지 못함 → 사업계획서도, 홈페이지도, 소개도 다 막힘
- 이상향: 소비자가 자연스럽게 흘러들어오는 구조
- 결론: **"AI 마켓은 내가 만드는 도구다"** — AI+전문가가 만든 전환 최적화 홈페이지

**깨달은 것:**
워크플로우를 먼저 고객에게 쓰기 전에, 내 사이트에 먼저 적용해봐야 한다. 내가 만든 걸 내가 못 쓰면 설명도 안 된다.

---

### 2. 원페이지 → 5페이지 사이트로 수정

```
이건 너무 짧게 되어 있잖아. 홈화면에 다른 페이지로 연결될 수 있는 구성을 해줘야지.
```

**기존**: 홈 랜딩 1페이지만 있었고, 내가 누구인지·무엇을 하는지 보여주는 공간이 없었다.

**수정한 것:**
- `Navigation.tsx` — 서비스·블로그·소개 메뉴 + 모바일 햄버거 메뉴 추가
- `SiteNav.tsx` — 서브페이지 전용 독립 네비게이션 신규 생성
- `app/about/page.tsx` — 소개 페이지: 이미지 작업 → AI 마케팅 → "노력이 아니라 연결이 문제"라는 스토리로
- `app/services/page.tsx` — 서비스·가격 페이지 (베이직 49만 / 스탠다드 89만 / 프리미엄 149만)
- `app/blog/page.tsx` + `[slug]` — 블로그 (실용팁·AI트렌드·케이스노트 3카테고리)
- `app/contact/page.tsx` — 상담 신청 폼
- `AIMarket_IA_재구성_v0.4.md` — 기획서도 실제 구현 구조로 업데이트

**배포**: GitHub `main` 머지 → Vercel 자동 배포
https://ai-market-virid.vercel.app/

---

## 기술 스택

- **Framework**: Next.js 15 App Router + TypeScript
- **Styling**: Tailwind CSS 4
- **배포**: Vercel (GitHub 연동)

## 오늘 만든 것

1. OS 인터뷰로 "AI 마켓 = 내가 만드는 전환 도구"라는 정의 도출
2. 원페이지 랜딩 → 5페이지 멀티사이트 (about·services·blog·contact)
3. 정적 블로그 시스템 + 서브페이지 네비게이션

---

## 2026-05-08

### 1. gwscli 설치 및 Gmail 자동분류 설정

```
gwscli 설치부터 Gmail 자동분류 설정까지 오늘 경험한 내용 정리
```

**오늘 한 것:**
- gwscli(Google Workspace CLI) npm으로 설치
- Google Cloud Console에서 OAuth 출입증 발급 (처음 해봄)
- Gmail API, Drive API, Sheets API 활성화
- kandara866@gmail.com 계정 인증 완료
- Gmail 최근 50개 메일 읽고 패턴 분석
- 분류 기준 5가지 결정 → 라벨 8개 생성
- 기존 메일 45개에 라벨 적용 완료
- 자동 필터 생성 시도 → 스코프 권한 문제로 미완 (Gmail 자체 필터로 대체 가능)

---

### 2. 오늘 처음 알게 된 것들

**gwscli가 뭔지 — 설치 전에 몰랐던 것**

처음엔 이름만 보고 Google 관련 도구라는 것만 알았어요. 써보니까 이런 거예요.

> gwscli는 Gmail·Drive·Sheets 같은 Google 서비스를 터미널 명령어로 다루는 도구예요.
> 보통 브라우저에서 마우스로 하는 일을 코드 한 줄로 할 수 있어요.

**OAuth 출입증이 뭔지**

gwscli가 내 Gmail에 접근하려면 Google한테 허가를 받아야 해요. 그 허가증을 만드는 곳이 Google Cloud Console이에요. 오늘 처음으로 직접 만들었어요. 한 번 만들면 재사용돼요.

**API 활성화가 뭔지**

허가증을 만든 다음에, "이 도구가 Gmail에 접근해도 돼", "Drive에 접근해도 돼"를 Google Cloud 프로젝트에서 하나씩 켜줘야 해요. 기본은 다 꺼져있어요. 스위치 켜듯이 활성화하는 거예요.

**인증이 뭔지**

허가증 만들고 API 켜고 나서, 실제로 내 Google 계정으로 로그인해서 "이 도구가 내 Gmail을 쓰는 걸 허용한다"고 승인하는 단계예요. 브라우저에서 Google 계정 선택하고 허용 누른 그거예요.

> 출입증 만들기(OAuth) → 문 열기(API 활성화) → 열쇠로 들어가기(인증) 순서.

---

### 3. gwscli로 할 수 있는 것들 (전체 범위)

**Gmail**
- 메일 읽기·보내기·답장·전달
- 라벨 만들기·붙이기
- 필터 생성 (자동 분류 규칙)
- 받은 편지함 요약
- 새 메일 실시간 감시

**Google Drive**
- 파일 목록 조회·업로드·다운로드
- 공유 설정 변경

**Google Sheets**
- 셀 읽기, 행 추가, 새 시트 생성
- 데이터 자동 기록

**Google Calendar**
- 오늘 일정 보기, 이벤트 추가

**Workflow 자동화 (진짜 강점)**
- `+standup-report`: 오늘 회의 + 미완료 작업 자동 정리
- `+meeting-prep`: 회의 전 의제·참석자·관련 파일 준비
- `+email-to-task`: 중요 메일을 할 일 목록으로 변환
- `+weekly-digest`: 한 주 요약 자동 생성

**Claude Code와 연결하면**
```
매일 오전 → Gmail 미읽음 요약
→ 뉴스레터 제목 Sheets에 기록
→ 중요 메일만 별도 라벨
→ 요약을 Notion에 저장
```
반복 작업을 자동화하는 흐름을 만들 수 있어요.

---

### 4. 오늘 만든 Gmail 라벨 구조

| 라벨 | 대상 발신처 |
|---|---|
| 🔴 즉시확인 | Google 보안·인증, Adobe 결제 |
| 📰 뉴스레터/뉴스·시사 | NEWNEEK |
| 📰 뉴스레터/비즈니스 | 뷰트랩, 폴인, 플렉스웍 |
| 📰 뉴스레터/AI·기술 | 지피터스 |
| 📰 뉴스레터/영어콘텐츠 | Medium, DBpia |
| 🤖 AI·기술업데이트 | GitHub, Vercel, Notion |
| 📢 프로모션 | 세시간전, Dribbble, AirAsia 등 |
| 👤 소셜 | LinkedIn, MutualArt |

---

### 5. 이 영상 보고 시작했어요

**참고 유튜브**: [gwscli 설치부터 실전 활용까지](https://www.youtube.com/watch?v=S99_UhOQjNw)

1인 기업가가 세 개 사업을 혼자 운영하면서 매일 아침 탭 15개씩 열던 루틴을 gwscli로 바꾼 이야기예요.

**영상에서 인상 깊었던 것들:**

> "진짜 문제는 시간이 아니었어요. 잡무에 하루를 갈아넣고 있었던 거죠."

gwscli를 "만능 USB 포트"에 비유했어요. Gmail, Drive, Calendar, Sheets, Docs, Slides — 따로따로 연결하던 걸 하나만 설치하면 전부 다 된다는 거예요.

**영상에서 실제로 한 것들:**
- 30일치 249개 이메일 중요도 점수 매기기 → 낮은 중요도 105개 읽음 처리
- 뉴스레터 189개 내용 요약 → Google Docs에 자동 정리
- 유튜브 영상 링크 던지면 → 가이드 문서로 Google Docs에 자동 작성
- 브랜드 로고·가이드라인 넣으면 → Google Slides 자동 생성
- 슬라이드 스크린샷 찍어서 레이아웃 오류 자동 보정

**이 사람이 실제로 쓰는 방식:**
- 이메일 중요도 요약 → 직접 볼 것만 처리
- 뉴스레터 → Google Docs에 모아서 일주일에 한 번 리뷰
- 반죽 유통 사업 마감 시간 → 캘린더 자동 알람
- 무료 컨설팅 신청 메일 → 하루치 자동 수집, 놓치지 않기
- 유튜브 콘텐츠 → 슬라이드 자동 생성

**영상에서 말한 gwscli 4가지 강점:**
1. **자동 업데이트**: Google API 목록 실시간으로 읽어서 명령어 자동 생성
2. **MCP 서버 내장**: Claude Code와 연결하는 복잡한 설정 불필요
3. **100개 이상 스킬**: 이메일·드라이브·독스·캘린더 워크플로우 포함
4. **보안 (Model Armor)**: AI가 받는 응답을 자동 검사해서 위험 차단

---

### 6. 막힌 것 & 배운 것

**막힌 것**: Gmail 자동 필터(새 메일 올 때마다 자동 분류) 생성이 API 권한 문제로 실패.

**배운 것**: gwscli로 안 되는 건 Gmail 자체 기능으로 대체할 수 있어요. Gmail → 설정 → 필터 및 차단된 주소에서 직접 만들면 돼요.

**느낀 것**: 설치는 쉬웠는데 Google Cloud Console 설정이 생각보다 많은 단계였어요. OAuth, API 활성화, 스코프, 인증 — 다 처음 들어보는 개념이었는데 하나씩 하다 보니 연결이 됐어요.

영상에서 "자동화는 도구가 먼저가 아니라 내 브랜드와 시스템을 어떻게 설계하고 그중 반복 작업을 AI한테 맡길까, 이 위임의 문제다"라고 했는데 — gwscli를 직접 써보니까 그 말이 더 와 닿았어요.

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

---

## 2026-05-05 (Day 2) — AI 마켓 프로젝트

vibelog가 아닌 **AI 마켓**(소상공인 홈페이지 제작 서비스) 프로젝트 작업.
흩어진 자료 통합 정리부터 자사 홈페이지 디자인 업그레이드, GitHub 분리까지.

---

### 1. AI 마켓 프로젝트 통합 정리

```
이곳에서 소상공인들을 위한 웹페이지 만드는 것을 하나의 프로젝트 파일 안에 넣어 줄 수 있을까?
프로젝트 파일 안에 AI 마켓이라는 이름으로 정리해줘.
나는 프로젝트 내부에 있는 파일 외에는, 예전에 클로드 코드가 익숙하지 않았을 때 구성된 것들이라
그 안에 어떤 폴더들이 있는지 잘 몰라.
```

**문제 상황:** D:\kyra-test 안에 AI 마켓 관련 자료가 여러 곳(01_web_automation_core, 02_business_docs, AI-MARKET, .claude, .codex 등)에 흩어져 있고, 어디에 무엇이 있는지 잘 모르는 상태.

**Claude Code 작업:**
- Explore 에이전트 2개를 병렬로 D:\kyra-test 내부와 외부(Downloads, Documents) 동시 조사
- 새 폴더 `D:\AI-MARKET` 만들고 robocopy로 단계별 통합 (200+ files)
- 외부 자료(Downloads, Documents)는 옮기지 않고 `EXTERNAL-REFERENCES.md` 인덱스로만 정리
- 단계별 진행 (사전 점검 → 골격 생성 → 앱 이동 → docs 재분류 → business 통합 → automation 정리)

**🤔 이 과정에서 배운 것:**
> 흩어진 자료를 통합할 때는 "복사 → 검증 → 원본 삭제" 순서가 안전. 한 번에 옮기면 위험.

---

### 2. 자사 / 제작서비스 영역 분리

```
여기서 에이아이 마켓의 자사 홈페이지만드는 것과 
실제 진행하는 서비스 소상공인들의 웹페이지를 만드는 것을 구분지어서 확인할수 있었음 좋겠는데
```

**Claude Code 작업:**
- D:\AI-MARKET 안을 두 개의 상위 폴더로 재편성:
  - 🏢 `01_자사\` — AI 마켓 회사 본체 (자사 홈페이지·사업계획서·발표자료)
  - 🛠️ `02_제작서비스\` — 소상공인 고객 홈페이지 제작 사업 (자동화·리서치·기획)
- README.md, CLAUDE.md, ROADMAP.md 작성 — 프로젝트 정체성·규칙·향후 로드맵
- Claude Code 메모리 파일 경로도 새 위치로 갱신

**🤔 이 과정에서 배운 것:**
> "두 종류의 일이 한 폴더에 섞이면 헷갈린다." 폴더 단위로 나누면 매번 어디서 작업하는지 명확해짐.

---

### 3. 자사 홈페이지 디자인 업그레이드

```
1차 자사 홈페이지를 먼저 수정을 해보자. 
디자인이 좀더 세련되었음 좋겠는데...
마음에 든다는건 문구 cta등을 이야기 하는거야
```

**문제:** 현재 자사 홈페이지(Next.js 15)의 디자인이 평범함. 텍스트(카피·CTA)는 마음에 들지만 디자인 디테일이 약함. `page.tsx`가 816줄 단일 파일로 모든 섹션이 한 파일에.

**Claude Code 작업:**
- `frontend-design` 스킬 호출 — "Generic AI 미감 회피"가 명시된 스킬
- 디자인 방향: **"Editorial Architectural"** (Swiss 디자인 + 일본 미니멀 출판 + 종이 텍스처)
- `page.tsx` 816줄 → 60줄 (15개 컴포넌트로 분리):
  - `components/sections/` — Hero, PainPoints, Why, Process, Price, FreeResource, FAQ 등 11개
  - `components/ui/` — Reveal (모션), SectionLabel
  - `lib/payment.ts` — Toss 결제 로직 분리
- `globals.css`에 디자인 토큰·종이 텍스처·키프레임 확장
- **텍스트 콘텐츠는 한 글자도 변경 안 함** (사용자 요청)
- 빌드 검증: 5.6초 컴파일, 7개 페이지 정상

**🤔 이 과정에서 배운 것:**
> AI에게 디자인을 일임할 때 "유지할 것"을 명확히 정해주면 (텍스트·색 팔레트) 신뢰감 있는 결과가 나옴.
> 큰 단일 파일을 컴포넌트로 분리하면 부분 수정이 가능해짐.

---

### 4. GitHub 분리 작업

```
우리 AI 마켓의 자사 홈페이지와 외부 작업하는 것을 깃허브(GitHub)로 나누어야 할 것 같은데
아예 저장소를 따로 만들까?
```

**Claude Code 작업:**
- 자사 홈페이지(이미 있는 `kandara-ai/AI-MARKET` 레포)는 그대로 사용
- 디자인 업그레이드는 `redesign-2026-05` **새 브랜치**로 push (main 안전 보존)
  - Vercel이 자동으로 preview URL 생성 → 본 사이트 영향 없이 새 디자인 확인 가능
- 02_제작서비스용 새 레포(`aimarket-service`) git init + commit
  - 178MB benchmarks/ 폴더는 .gitignore 처리 (9.47MB만 staged)
  - 환경변수·비밀 파일 .gitignore로 사전 차단

**🤔 이 과정에서 배운 것:**
> "한 번 push하면 GitHub에 영구 기록 남음." .gitignore로 비밀 파일·큰 파일 사전 차단 필수.
> 새 디자인은 main이 아니라 별도 브랜치로 → Vercel preview URL로 안전하게 확인.

---

### 5. Claude Design 출시 발견

```
혹시 클로드 디자인과 합쳐서 고칠수 있는 방법은 없을까?
클로디자인이 출시 되었자나?
```

**Claude Code 작업:**
- WebSearch로 확인: Anthropic이 **2026-04-17 Claude Design 출시**
- 대화로 디자인·프로토타입·슬라이드 만드는 AI 도구 (Figma·Canva 경쟁작)
- Pro/Max/Team/Enterprise 플랜 research preview
- 향후 워크플로우: Claude Design에서 시안 변주 → Claude Code가 코드 적용

---

## 기술 스택

- **Framework**: Next.js 15, React 19, TypeScript
- **Style**: Tailwind CSS 4, Framer Motion (motion), tw-animate-css
- **Fonts**: Inter, Anton, Pretendard
- **Backend**: Supabase, Toss Payments, Google GenAI
- **Deploy**: Vercel
- **Tools**: frontend-design 스킬, Claude Design (예정), git/GitHub
- **OS**: Windows 11 + Git Bash + PowerShell

## 오늘 만든 것

1. **`D:\AI-MARKET` 통합 폴더** — 흩어진 자료 200+ files 한곳에 정리
2. **자사/제작서비스 영역 분리** — 폴더 단위로 시각적 구분
3. **자사 홈페이지 디자인 리프레시** — editorial-architectural 톤, 15개 컴포넌트로 분리, 빌드 통과
4. **GitHub 2개 레포 정리** — kandara-ai/AI-MARKET (`redesign-2026-05` 브랜치 push), aimarket-service (commit 완료, push 대기)
5. **README · CLAUDE.md · ROADMAP.md** — 프로젝트 지침과 단기·중기·장기 로드맵

---

## 앞으로 할 것

- [ ] aimarket-service GitHub 빈 레포 만들고 push
- [ ] Vercel preview URL로 새 디자인 확인 → 마음에 들면 main에 merge
- [ ] Claude Design 직접 사용해보기 (시안 변주)
- [ ] D:\kyra-test의 옛 원본 폴더 정리 (안전망 역할 끝나면)
- [ ] AI-MARKET-map-update (옛 git worktree)를 archive로 이동
- [ ] 자사 홈페이지 카카오 링크 5곳 → "준비 중" 토스트로 교체

---

## 2026-05-06 (Day 3) — 스폰지타임즈 워크스페이스 + 캐러셀 두 편

### 1. 스폰지타임즈 첫 회의 내용 정리

```
회의 시작 했고, 클로드 구글 다른 계정으로 ai.mkt.heaja@gmail.com
회의 요약 및 녹취록 [Notion 영문 요약]
```

**Claude Code 작업:**
- 노션 AI 회의 요약(영문) → 한국어 번역
- 핵심 결정사항 5가지 정제 (인스타 co-author 발행 / Slack-Claude 자동화 / 개별→통합 워크플로우 / MVP 시스템 / 일요일 사이클)
- 회의록 정제본: `meetings/2026-05-06-kickoff.md`

---

### 2. 1주차 작업 현황 정리

```
사람들이 이것으로 스킬을 사용하고 있어
내가 여기에 복붙한 것들을 1차 정리
```

**Claude Code 작업:**
- 슬랙 #스킬공유 17개 항목 → 7개 카테고리 분류
- 슬로우 퀵 활용 우선순위 매트릭스
- `references/slack/2026-05-06-skill-shares-batch01.md`

---

### 3. 0주차 캐러셀 제작 — "스폰지클럽 1기가 시작됐습니다"

```
Sponge Club 첫 회 오리엔테이션이었는데, 이것을 가지고 콘텐츠를 만들 거야
이것을 캐러셀로 만들어 보자
```

**Claude Code 작업:**
- 0504 오리엔테이션 트랜스크립트 핵심 추출 (모토·5개 유닛·뉴스룸 정의·7주 흐름)
- 8장 슬라이드 카피 + 인스타 캡션
- `content/instagram/2026-W19-week00-spongeclub-intro.md`

---

### 4. 1주차 캐러셀 제작 — "1주차에 스폰지가 본 것들"

```
정리된 내용을 가지고 캐러셀을 만들려고 하는데
17가지를 다 하지말고 정리를 해줘
```

**Claude Code 작업:**
- 17개 → 5개 큐레이션 (CC101 / CLAUDE.md / Viral Hook / Marketing Skills / Notion Meeting Intelligence)
- 8장 슬라이드 카피 + 인스타 캡션 + 매핑 검증
- `content/instagram/2026-W19-week01-selfish-skillers.md`

## 2026-05-15

### 1. AI MARKET 자사 홈페이지 대규모 리뉴얼

```
서비스 가격을 49만원으로 통일하고, GA4 설치 내용을 페이지에 반영.
소개 페이지에 팀 섹션 추가하고 스토리도 새 포지셔닝으로 전면 재작성.
```

**Claude Code 작업:**
- `PriceSection.tsx` — 3티어 가격 플랜 삭제, 단일 490,000원 다크 카드로 교체
- `WhySection.tsx` — "방문자 행동 추적 (GA4)" 카드 추가, 2열 그리드로 전환
- `ProcessSection.tsx` — 5단계 → 8단계 AI+전문가 워크플로우로 업데이트
- `app/services/page.tsx` — Hero 카피·가격·과정·FAQ 전면 업데이트
- `app/about/page.tsx` — 팀 섹션 신규 추가 (이니셜 E.A / Y.H, WhySection 카드 스타일)
- `app/about/page.tsx` — 스토리 섹션 재작성: "제작 vs 전략" 포지셔닝으로 교체
- `AIMarket_IPO_기획서.md` — v2.0 업데이트: 팀 구성, IA 트리, 작업 현황 반영

---

### 2. 오늘 깨달은 것

홈페이지 카피가 서비스 포지셔닝과 맞지 않으면 방문자가 혼란스러워진다.
"AI 툴은 만드는 문제를 해결했고, 우리는 작동하는 문제를 해결한다" —
이 한 문장으로 스토리·서비스·랜딩 전체가 일관성 있게 연결됐다.

## 기술 스택

- **Framework**: Next.js 15 App Router
- **Styling**: Tailwind CSS 4, Framer Motion
- **배포**: Vercel (main 브랜치 자동 배포)
- **분석**: Google Analytics 4

## 오늘 만든 것

1. 자사 홈페이지 포지셔닝 전면 리뉴얼 (가격·팀·스토리·서비스 페이지)
2. 소개 페이지 팀 섹션 신규 (이니셜 카드 디자인)
3. IPO 기획서 v2.0

---
