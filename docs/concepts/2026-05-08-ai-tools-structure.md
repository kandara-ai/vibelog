# AI 도구 구조 한 방 정리

## 왜 이 노트를 만들었나

AI 개발 도구를 이야기하다 보면 이름이 너무 많이 나온다.

- ChatGPT
- Gemini
- Claude
- Codex
- Claude Code
- Gemini Code Assist
- Cursor
- Antigravity
- VS Code

어떤 것은 회사 이름이고, 어떤 것은 모델이고, 어떤 것은 앱이고, 어떤 것은 개발 도구다.

그래서 헷갈리지 않게 4층 구조로 정리한다.

```text
1층. 회사
2층. AI 모델
3층. 서비스/앱
4층. 내가 쓰는 작업 공간
```

---

## 1층: 회사

AI를 만들고 운영하는 회사들이다.

```text
OpenAI
Google
Anthropic
Cursor / Anysphere
```

회사 이름은 자동차 회사 이름처럼 보면 된다.

예:

```text
현대
기아
테슬라
```

AI에서는:

```text
OpenAI
Google
Anthropic
```

---

## 2층: AI 모델

모델은 실제로 말을 이해하고, 글을 만들고, 코드를 생각하는 AI의 두뇌다.

```text
OpenAI → GPT 계열 / Codex 계열
Google → Gemini
Anthropic → Claude
```

여기서 자주 나오는 말이 `LLM`이다.

```text
LLM = Large Language Model
```

쉽게 말하면:

```text
LLM = AI의 머리
```

ChatGPT, Claude, Gemini가 똑똑하게 말하는 이유는 안에 이런 언어 모델이 있기 때문이다.

---

## 3층: 서비스와 앱

모델이라는 두뇌를 사람이 쓰기 쉽게 만든 제품들이 있다.

```text
ChatGPT
= OpenAI 모델을 대화로 쓰는 앱

Claude
= Anthropic 모델을 대화로 쓰는 앱

Gemini
= Google 모델을 대화로 쓰는 앱
```

여기까지는 주로 "대화하는 AI"에 가깝다.

---

## 4층: 개발 도구와 작업 공간

개발을 할 때는 AI 모델을 코드 작업에 맞게 감싼 도구들이 나온다.

```text
Codex
= OpenAI의 개발용 코딩 에이전트

Claude Code
= Claude를 코딩 작업에 쓰는 개발 도구

Gemini Code Assist
= Gemini를 VS Code 같은 IDE 안에서 쓰게 해주는 코딩 도우미

Antigravity
= Google/Gemini 중심의 에이전트형 개발 IDE

Cursor
= 여러 AI 모델을 골라 쓸 수 있는 AI 코드 편집기
```

---

## 전체 관계 표

| 회사 | AI 두뇌 | 대화 앱 | 개발 도구 |
|---|---|---|---|
| OpenAI | GPT / Codex 계열 | ChatGPT | Codex |
| Google | Gemini | Gemini | Gemini Code Assist, Antigravity |
| Anthropic | Claude | Claude | Claude Code |
| Cursor / Anysphere | 여러 모델 사용 | Cursor 내부 채팅 | Cursor IDE |

---

## VS Code는 무엇인가

VS Code는 기본 코드 편집기다.

```text
VS Code
= 빈 교실
```

VS Code 자체에 특정 AI가 기본으로 들어있는 것은 아니다.

여기에 Claude Code, Codex, Gemini Code Assist 같은 도구를 붙여서 쓴다.

```text
VS Code + Claude Code
= VS Code라는 교실에 Claude 선생님을 데려온 것
```

```text
VS Code + Codex
= VS Code라는 교실에 OpenAI 코딩 조교를 데려온 것
```

```text
VS Code + Gemini Code Assist
= VS Code라는 교실에 Gemini 코딩 도우미를 데려온 것
```

---

## Cursor는 무엇인가

Cursor는 AI 기능이 깊게 들어간 코드 편집기다.

VS Code와 비슷하게 생겼지만, 처음부터 AI로 코드 작업하기 좋게 만들어졌다.

```text
Cursor
= AI 선생님을 여러 명 고를 수 있는 스마트 교실
```

Cursor 안에서는 여러 모델을 선택해 쓸 수 있다.

```text
Cursor
├─ Claude
├─ GPT
├─ Gemini
└─ 기타 모델
```

즉 Cursor는 특정 모델 하나가 아니라, 여러 AI 모델을 연결해 쓰는 개발 환경에 가깝다.

---

## Antigravity는 무엇인가

Antigravity는 Google이 만든 AI 중심 개발 환경이다.

기본적으로 Google의 Gemini와 매우 가까운 관계다.

```text
Google
↓
Gemini
↓
Antigravity
```

Cursor가 "AI가 붙은 편집기"에 가깝다면, Antigravity는 "에이전트가 일하는 개발 관제실"에 가깝다.

Antigravity의 핵심은 에이전트가 여러 작업을 오가며 처리하는 것이다.

```text
에이전트가 계획을 세움
↓
파일을 수정함
↓
터미널 명령을 실행함
↓
브라우저에서 확인함
↓
결과를 아티팩트로 남김
```

---

## Codex, Claude Code, Gemini Code Assist 비교

```text
Codex
= OpenAI 쪽 개발 조교

Claude Code
= Claude 쪽 개발 조교

Gemini Code Assist
= Gemini를 IDE 안에 붙여 쓰는 개발 조교
```

세 도구 모두 코딩을 도와주지만, 연결된 회사와 모델이 다르다.

---

## 한 번에 보는 비유

학교로 비유하면 이렇게 볼 수 있다.

```text
LLM
= 선생님의 두뇌

ChatGPT / Claude / Gemini
= 질문하면 설명해주는 과외 선생님

VS Code
= 빈 교실

Claude Code / Codex / Gemini Code Assist
= 교실에 들어와서 같이 숙제하고 파일도 고쳐주는 조교

Cursor
= AI 조교들이 기본으로 붙어 있는 스마트 교실

Antigravity
= Google이 만든 Gemini 중심의 AI 개발 학원
```

---

## 내가 지금 쓰는 구조

현재 작업 방식은 대략 이렇게 볼 수 있다.

```text
VS Code
+
Claude Code 또는 Codex 같은 AI 개발 도구
+
프로젝트 폴더
```

즉:

> 기본 편집기 위에 AI 개발 조교를 붙여서 쓰는 방식이다.

---

## 최종 한 줄 정리

```text
ChatGPT, Claude, Gemini는 AI 두뇌를 대화로 쓰는 서비스.
Codex, Claude Code, Gemini Code Assist는 그 AI를 개발에 쓰는 도구.
Cursor와 Antigravity는 AI가 들어간 개발 환경.
VS Code는 기본 편집기라서 AI를 따로 붙여 쓰는 공간.
```

---

## Vibelog 관점에서의 의미

Vibelog를 만들 때 이 구분을 알면 좋다.

- ChatGPT / Claude / Gemini는 개념 설명과 글 정리에 도움을 줄 수 있다.
- Codex / Claude Code는 실제 프로젝트 파일을 읽고 수정하는 데 도움을 준다.
- Cursor는 코드 편집 화면 안에서 AI와 빠르게 협업하는 데 좋다.
- Antigravity는 더 큰 작업을 에이전트에게 맡기고 결과를 확인하는 방향에 가깝다.
- Obsidian과 연결할 때는 어떤 AI를 쓰든, 원본 기록은 Obsidian에 두고 AI는 연결과 회상 보조 역할을 하게 만드는 것이 좋다.

---

## 기억할 문장

> AI 도구를 이해할 때는 "회사 - 모델 - 앱 - 작업 공간" 네 층으로 나누면 헷갈리지 않는다.

> LLM은 AI의 머리이고, ChatGPT/Claude/Gemini는 그 머리를 대화로 쓰는 앱이다.

> 개발 도구는 그 AI를 코드 작업에 맞게 붙인 것이다.
