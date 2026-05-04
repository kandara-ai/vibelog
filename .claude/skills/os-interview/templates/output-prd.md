# Output Template C · 독립 프로덕트 PRD

**언제 사용**: Step 5에서 사용자가 **C. 독립 프로덕트** 형태를 선택했을 때.

> 💡 C는 시작점이지 끝이 아닙니다. PRD는 **Claude Code에 던질 입력 문서**이고, 그 뒤에 실제 코드 생성 단계가 따라옵니다.

---

## Step 6 추가 질문 (Q 톤, 발판형, 10~15분)

### 1. 한 줄 정체성
> "'[누구]를 위한 [무엇]을 [어떻게] 해주는 [형태]'"

### 2. 타겟 사용자 페르소나
> "누가, 언제, 왜 쓰나요? 페르소나 한 명 묘사해주세요."

### 3. 핵심 기능 3~5개
> "이 프로덕트의 핵심 기능 3~5개. 각 기능 한 줄로."

### 4. MVP 스코프 (1주 안 만들 것)
> "위 기능 중 처음 1주에 만들 **1개**만 골라주세요."

### 5. 기술 스택 (선호)
> "선호하는 기술 스택이 있나요? 없으면 'Claude 추천'으로."

### 6. 인증 & 저장
> "사용자 로그인 필요? 데이터는 어디 저장?"

### 7. 첫 검증 방법
> "만들어진 직후 어떻게 '잘 됐는지' 확인할 건가요?"

### 8. 확장 방향 (선택)
> "v2.0에 추가될 만한 것이 있다면 1~2개."

---

## 결과물 — `<product-name>.prd.md`

```markdown
# <Product Name> · PRD draft

**Status**: v0.1 (MVP scope)
**Date**: <YYYY-MM-DD>

## Why
## Who
## What (핵심 기능)
## MVP Scope
## Tech Stack
## Auth & Storage
## Validation Plan
## Future (v2.0+)

---

## 🤖 Implementation prompt for Claude Code

> 이 PRD를 읽고 MVP 스코프부터 구현해줘.
```
