기획(OS Interview) → 개발(Next.js + Supabase) → 배포(Vercel)까지 하루에 완성. 첫 풀스택 바이브 코딩 프로젝트.

**핵심 구현:**
- 3-view 구조 설계: 같은 일지를 나의 관점 / SNS / 전문가 관점으로 분리 저장
- RLS 비활성화 이슈 → SQL로 해결, 캐싱 이슈 → `force-dynamic`으로 해결
- react-markdown으로 마크다운 렌더링, 탭 UI로 스크롤 문제 해결
- write-post 스킬 연동 스크립트(`npm run import`) 구현
- 커스텀 `/vibelog-post` 스킬 제작 (성장 수준 자동 파악, 전역 등록)

**사용 도구:** Next.js 15 App Router, Supabase PostgreSQL, TypeScript, Vercel  
**배포:** https://vibelog-eta.vercel.app
