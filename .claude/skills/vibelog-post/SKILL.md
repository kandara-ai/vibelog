# Vibelog Post 스킬

오늘 한 작업을 3가지 관점(나의 관점 / 전문가 요약 / SNS)으로 정리하고 Vibelog에 저장합니다.

---

## 이 스킬은 이렇게 성장합니다

Vibelog에 쌓인 기록을 읽어 현재 나의 수준을 파악합니다.  
초보일 때는 "환경 설정 완료" 도 대단한 성과이고,  
중급이 되면 "API 설계" 를, 고급이 되면 "아키텍처 결정" 을 강조합니다.  
기록이 쌓일수록 제안도 함께 고도화됩니다.

---

## 전체 흐름

```
Phase 1: 오늘 한 것 정리 (세션 스캔 → DEVLOG 초안)
       ↓
Phase 2: 성장 맥락 파악 (과거 Vibelog 기록 → 현재 수준 파악)
       ↓
Phase 3: 3가지 관점 생성 (나의 관점 / 전문가 요약 / SNS)
       ↓
Phase 4: Vibelog에 저장
```

---

## Phase 1: 오늘 한 것 정리

### 1-1. Claude Code 세션 스캔

`~/.claude/projects/` 에서 현재 프로젝트와 매칭되는 세션 파일(`.jsonl`) 을 찾습니다.

**파싱 사전 검증:**
- Windows 환경: Git Bash 경로(`/c/Users/...`) 또는 Python 경로(`C:/Users/...`) 구분
- `PYTHONIOENCODING=utf-8` 필수
- 파일 1개 샘플링 후 `type: user` / `type: assistant` 필드 확인

**수집 대상:**
- `type: "user"` 메시지 → 사용자 요청 (코드블록으로 기록)
- `type: "assistant"` 메시지 → 작업 내용 요약 (불릿으로 기록)
- 시스템 메타데이터 (`<ide_opened_file>` 등) 제외

### 1-2. 기존 DEVLOG 확인

프로젝트 루트에 `DEVLOG.md`가 있으면:

> 오늘 날짜({날짜})의 세션을 발견했어요.  
> 기존 DEVLOG.md에 이어쓸까요, 아니면 오늘 날짜로 새 섹션만 추가할까요?

**선택:**
1. 이어쓰기 → 마지막 기록 다음에 오늘 날짜 섹션 추가
2. 새 섹션만 → `## YYYY-MM-DD` 섹션을 DEVLOG.md 맨 위에 추가

### 1-3. DEVLOG 작성 형식

```markdown
## YYYY-MM-DD

### 1. 작업 제목

```
사용자가 입력한 요청 원문
```

**Claude Code 작업:**
- 수행한 작업
- `파일명` — 파일 설명

---

### 2. 다음 작업

...

## 기술 스택

- **Framework**: ...
- **DB**: ...

## 오늘 만든 것

1. 결과물 설명
```

DEVLOG 초안 작성 후 사용자에게 확인:

> DEVLOG 초안을 작성했어요. 수정할 부분이 있으면 말씀해주세요.  
> 확인이 되면 Phase 2로 넘어갈게요.

---

## Phase 2: 성장 맥락 파악

### 2-1. 과거 Vibelog entries 조회

`scripts/import-devlog.ts` 와 동일한 Supabase 클라이언트 설정을 사용합니다.

```
D:\kyra-test\projects\vibelog\.env.local
→ NEXT_PUBLIC_SUPABASE_URL
→ NEXT_PUBLIC_SUPABASE_ANON_KEY
```

최근 5~10개의 entries를 조회해 다음을 파악합니다:

| 항목 | 방법 |
|------|------|
| 기술 스택 변화 | expert_view에서 "사용 도구:" 부분 추출 |
| 작업 복잡도 | my_view 길이와 내용 분석 |
| 반복 등장 키워드 | Next.js, Supabase, API, 배포, 설계 등 |
| 현재 주제 | 가장 최근 entries의 주제 |

### 2-2. 성장 수준 판단

| 수준 | 기준 | 전문가 요약 톤 |
|------|------|----------------|
| 입문 (0~5개) | 환경 설정, 첫 배포 경험 | "처음 접하는 기술로 ~를 구현" |
| 초급 (5~15개) | CRUD, 기본 연동, UI | "~를 활용해 ~를 구현, 핵심은 ~" |
| 중급 (15~30개) | 설계 결정, 최적화, 복잡한 기능 | "~를 적용해 ~를 해결. 트레이드오프: ~" |
| 고급 (30개+) | 아키텍처, 성능, 팀 작업 | "~를 채택한 이유: ~. 대안 대비 장점: ~" |

> **주의**: entries 수만으로 판단하지 않습니다.  
> my_view 내용의 깊이, 사용 기술의 고도화 여부를 함께 봅니다.

### 2-3. 현재 진행 맥락 파악

과거 entries에서 연속성 있는 프로젝트나 주제를 찾습니다:

- 같은 프로젝트를 계속 발전시키고 있는가?
- 새로운 기술로 전환 중인가?
- 특정 문제를 반복해서 만나고 있는가?

이 맥락은 전문가 요약과 SNS에서 "오늘의 위치"를 설명하는 데 사용합니다.

---

## Phase 3: 3가지 관점 생성

### 3-1. 나의 관점 (my_view)

DEVLOG에서 그대로 가져옵니다. 사용자가 직접 쓴 언어가 살아있어야 합니다.

- 마크다운 형식 유지
- 오늘 날짜 섹션 전체 (`## YYYY-MM-DD` 이하)
- 수정 없이 원문 사용

---

### 3-2. 전문가 요약 (expert_view)

**목적**: 신랑(25년차 시니어 개발자)이 30초 안에 오늘 한 것을 이해할 수 있게.

**형식 (성장 수준에 따라 조정):**

```
[오늘 핵심 작업 1~2줄]
사용 도구: [기술 스택]
[배포 주소가 있으면] 배포: URL
```

**수준별 예시:**

입문:
```markdown
Next.js + Supabase 연결 완료, 첫 CRUD 구현.

**사용 도구:** Next.js 15, Supabase, TypeScript  
**배포:** https://vibelog-eta.vercel.app
```

초급:
```markdown
Vibelog 일지 앱에 탭 UI 추가. ReactMarkdown으로 마크다운 렌더링 구현, 복사 버튼 컴포넌트 분리.

**사용 도구:** Next.js 15, Supabase, react-markdown, shadcn/ui  
**배포:** https://vibelog-eta.vercel.app
```

중급:
```markdown
RLS 비활성화 → MVP 단계 결정. Server Component 캐싱 이슈 → `force-dynamic`으로 해결.

- 컴포넌트 구조: `page`(서버) → `EntryTabs`(클라이언트) 분리
- 캐싱 정책: 실시간 데이터 필요 → SSR 강제

**사용 도구:** Next.js 15 App Router, Supabase PostgreSQL, TypeScript
```

**생성 후 사용자에게 보여주고 확인받기:**

> 전문가 요약 초안이에요:
> ```
> [초안]
> ```
> 수정할 부분 있으면 말씀해주세요. 없으면 그대로 저장할게요.

---

### 3-3. SNS (sns_view)

**목적**: AI 활용 사례를 보고 싶어하는 사람들에게 공유.

**기본 생성 방식:**

DEVLOG의 오늘 작업을 기반으로 스토리텔링 형식으로 작성합니다.

```markdown
# [오늘의 작업 제목] — AI와 함께 만든 것

## 📝 한줄 요약
오늘 [무엇]을 [어떻게] 만들었어요.

## 😫 문제 상황
[구체적인 불편함 / 막힌 부분]

## 🔧 AI와 함께 해결한 방법
[오늘 핵심 작업을 스토리텔링으로]

## ✅ 결과
[달라진 것, 배운 것]

## 💬 오늘의 팁
[다음 사람에게 전하고 싶은 것]
```

**커뮤니티 정보는 대화 중에 파악:**

SNS 작성 전에 물어보기:

> 오늘 SNS 포스팅을 어떤 채널에 올릴 예정인가요?
> 1. 스폰지클럽 1기 커뮤니티
> 2. 개인 인스타그램 / 스레드
> 3. 링크드인
> 4. 아직 모르겠어요 (나중에 수정)

**선택에 따라 말투와 맥락 조정:**
- 스폰지클럽: 동기들과 공유하는 학습 기록 톤
- 인스타/스레드: 가볍고 친근한 톤
- 링크드인: 성과 중심, 전문적 톤

**생성 후 사용자에게 보여주고 확인:**

> SNS 초안이에요. 수정하거나 빼고 싶은 내용 있으면 말씀해주세요.

---

## Phase 4: Vibelog에 저장

### 4-1. 저장 방법

3가지 뷰가 모두 확인되면 `scripts/import-devlog.ts` 방식으로 저장합니다.

**DEVLOG.md 저장** (my_view용):
- 오늘 날짜 섹션을 DEVLOG.md에 반영

**SNS 저장** (sns_view용):
- `AI_CASE_STUDY.md` 파일에 저장

**그런 다음 `npm run import` 실행:**

```bash
cd D:\kyra-test\projects\vibelog
npm run import
```

이 명령어가:
1. DEVLOG.md → my_view (오늘 날짜 섹션)
2. AI_CASE_STUDY.md → sns_view
3. Phase 3에서 확정된 expert_view → expert_view
로 Supabase에 저장합니다.

> **expert_view는 scripts/import-devlog.ts가 자동 추출하지 않고, 이 스킬에서 생성한 것을 사용합니다.**  
> import 스크립트를 수정하거나, 저장 후 Supabase에서 직접 업데이트합니다.

### 4-2. expert_view 저장 방법

Phase 3에서 확정된 전문가 요약을 `EXPERT_VIEW.md` 파일에 저장합니다:

```
D:\kyra-test\projects\vibelog\EXPERT_VIEW.md
```

`npm run import` 실행 시 이 파일이 있으면 자동으로 읽어 expert_view로 사용합니다.  
파일이 없으면 DEVLOG.md에서 자동 추출하는 방식으로 폴백합니다.

> import 완료 후 EXPERT_VIEW.md는 삭제하지 않아도 됩니다. 다음 실행 때 덮어씁니다.

### 4-3. 저장 확인

```
✅ {날짜} 일지가 Vibelog에 저장됐어요!
🌐 확인: https://vibelog-eta.vercel.app
```

---

## 이 스킬을 사용하는 방법

프로젝트 폴더(어디서든)에서:

```
/vibelog-post
```

---

## 스킬이 성장하는 방식

이 스킬은 다음 상황에서 자동으로 적응합니다:

| 상황 | 변화 |
|------|------|
| Vibelog entries 10개 돌파 | 전문가 요약에 기술적 결정 이유 추가 |
| 특정 기술 3번 이상 사용 | "이 기술을 꾸준히 사용 중" 맥락 추가 |
| 새로운 기술 등장 | "처음 시도한 기술" 강조 |
| 배포 프로젝트 증가 | 포트폴리오 관점 추가 |
| 같은 문제 반복 | "이전에도 겪은 이슈" 패턴 인식 |

---

## 사용자 맥락 (고정값)

이 스킬은 다음 정보를 알고 있습니다:

- **주요 도구**: Claude Code
- **주요 기술**: Next.js, Supabase, TypeScript, Vercel
- **신랑**: 25년차 시니어 개발자 → 전문가 요약의 타겟 독자
- **Vibelog URL**: https://vibelog-eta.vercel.app
- **프로젝트 경로**: `D:\kyra-test\projects\vibelog`

> 상황이 바뀌면 이 섹션을 직접 수정해도 됩니다.
