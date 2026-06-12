# CLAUDE.md

이 문서는 Claude Code가 **B PLi** 프로젝트를 이해하고 일관된 방향으로 개발하기 위한 기준 문서입니다.

---

## 1. Product Essence

**B PLi는 도서를 위한 Spotify 클론이다.**

음악 스트리밍 서비스에서 사용자가 앨범, 트랙, 플레이리스트, 추천 알고리즘을 통해 음악을 가볍게 탐색하고 소비하듯이, B PLi는 사용자가 책을 더 작고 가볍고 감각적인 단위로 발견하고 읽고 기록하게 만드는 서비스다.

기존 독서 서비스가 “책 한 권을 끝까지 읽는 경험”에 집중한다면, B PLi는 “지금 내 상태에 맞는 장, 구절, 흐름을 발견하고 짧게 읽는 경험”에 집중한다.

핵심 은유는 다음과 같다.

- 책 = 앨범
- 장 / 챕터 / 에피소드 = 트랙
- 독서 플로우 = 플레이리스트
- 구절 코멘트 = SoundCloud 타임라인 코멘트
- 추천 피드 = Spotify 홈 / Discover Weekly
- 연말 결산 = Spotify Wrapped for Reading

B PLi의 본질은 단순한 독서 기록 앱이 아니라, **책을 음악처럼 탐색하고 소비하게 만드는 큐레이션 기반 독서 플랫폼**이다.

---

## 2. Product Name

서비스명은 **B PLi**다.

의미는 다음 방향성을 가진다.

- B = Book
- PLi = Playlist / Play / Pliability / Flow의 감각
- “책을 플레이한다”는 인상을 준다.
- Spotify, SoundCloud, Watcha, Kinolights의 익숙한 소비 문법을 독서 경험으로 가져온다.

문서, 코드, UI 카피에서 기본 표기는 `B PLi`로 사용한다.

---

## 3. Core Positioning

B PLi는 “전자책 무제한 구독 서비스”가 아니다.

B PLi는 모든 책을 많이 보유하는 것을 목표로 하지 않는다. 밀리의서재, 리디셀렉트, 교보문고, Yes24 같은 기존 전자책 플랫폼과 정면으로 카탈로그 경쟁을 하지 않는다.

대신 다음에 집중한다.

1. 큐레이션된 책과 챕터
2. 오리지널 콘텐츠
3. 짧고 가벼운 독서 단위
4. 감각적인 기록과 공유
5. 취향 기반 추천
6. 사용자가 직접 만드는 독서 플로우

즉, B PLi는 “책의 Netflix”보다는 **“책의 Spotify + SoundCloud + Watcha”**에 가깝다.

---

## 4. Target Users

초기 핵심 사용자는 다음과 같다.

### Primary Target

20-30대 독서 관심층.

책을 좋아하거나 좋아하고 싶지만, 완독 부담 때문에 자주 실패하는 사람들이다.

특징:

- 책을 사지만 끝까지 읽지 못하는 경험이 많다.
- 인스타그램, X, 블로그, 브런치 등에서 구절을 저장하거나 공유한다.
- 북스타그램, 독서 모임, 취향 기반 콘텐츠에 관심이 있다.
- Spotify, Watcha, Netflix, SoundCloud 같은 추천/큐레이션 UX에 익숙하다.
- 긴 책보다 “지금 나에게 맞는 짧은 텍스트”에 반응한다.

### Secondary Target

콘텐츠 생산자, 작가, 에디터, 출판사.

B PLi의 큐레이션과 오리지널 콘텐츠 생태계에 참여할 수 있는 공급자다.

---

## 5. Core User Problem

많은 사용자는 책을 읽고 싶지만 다음 문제를 겪는다.

1. 한 권을 끝까지 읽어야 한다는 부담이 크다.
2. 지금 내 상황에 맞는 책을 찾기 어렵다.
3. 책을 읽고 느낀 감정과 생각을 예쁘게 기록하기 어렵다.
4. 독서 경험이 혼자 끝나고, 공유와 확산이 약하다.
5. 전자책 구독 서비스는 많지만, “가볍게 시작할 수 있는 독서 경험”은 부족하다.

B PLi는 이 문제를 “책을 잘게 나누고, 추천하고, 기록하고, 공유하는 방식”으로 해결한다.

---

## 6. Product Principles

개발과 기획에서 항상 지켜야 할 원칙이다.

### 6.1 Full Book보다 Chapter First

B PLi의 핵심 단위는 책 한 권이 아니라 챕터다.

사용자는 “이 책을 읽어야지”보다 “이 챕터 하나 읽어볼까?”라는 마음으로 진입해야 한다.

### 6.2 Archive보다 Play

기록은 중요하지만, 단순 보관함처럼 느껴지면 안 된다.

사용자가 책, 장, 구절, 코멘트를 계속 재생하고 다시 발견할 수 있어야 한다.

### 6.3 Curation over Catalog

모든 책을 넣으려 하지 않는다.

B PLi의 가치는 양이 아니라 “무엇을 어떻게 묶어 보여주는가”에 있다.

### 6.4 Shareable by Default

좋은 구절, 코멘트, 독서 성향, 연말 결산은 자연스럽게 이미지로 공유될 수 있어야 한다.

공유 기능은 부가 기능이 아니라 성장 엔진이다.

### 6.5 Emotional UX

독서는 기능적 행동이 아니라 감정적 행동이다.

UI는 차갑고 관리 도구처럼 보이기보다, 감각적이고 따뜻하고 취향이 느껴져야 한다.

---

## 7. MVP Scope

초기 MVP는 “기록”에 집중한다.

단, 단순 독서 기록 앱으로 끝나면 안 된다. 향후 콘텐츠 플랫폼으로 확장될 수 있도록 데이터 구조와 UX를 설계해야 한다.

### MVP 핵심 기능

1. 책 검색 / 등록
2. 독서 상태 관리
3. 독서 기록 작성
4. 구절 저장
5. 페이지 번호 기반 코멘트
6. 사진 OCR 기반 구절 입력
7. 구절 공유 카드 생성
8. 기본 추천 피드
9. 독서 성향 테스트
10. 연말 결산을 고려한 이벤트 데이터 적재

### MVP에서 하지 않는 것

- 전체 전자책 뷰어 구축
- 대규모 콘텐츠 구독 BM
- 모든 책 카탈로그 확보
- 출판사 계약 기반 유료 콘텐츠 제공
- 복잡한 소셜 네트워크 기능
- 실시간 도서관 대출/예약 연동

---

## 8. Phase Direction

현재 전략상 별도의 프리미엄 구독 Phase 2는 두지 않는다.

제품은 다음 흐름으로 간다.

### Phase 1 — Reading Record MVP

목표: 사용자가 책을 기록하고, 구절을 저장하고, 공유할 이유를 만든다.

핵심:

- 기록 앱으로 진입
- 공유 카드로 바이럴 검증
- 취향 데이터 축적
- 독서 성향 테스트로 온보딩
- 연말 결산을 위한 데이터 구조 확보

### Phase 3 — Curated Content Platform

목표: B PLi만의 큐레이션 콘텐츠 경험을 만든다.

핵심:

- 책을 챕터/트랙 단위로 제공
- 큐레이션된 챕터 묶음 제공
- 오리지널 콘텐츠 중심 운영
- Flow 기능 강화
- 구절과 코멘트 기반 커뮤니티 형성
- 광고 또는 파트너십 기반 수익화 후, 장기적으로 콘텐츠 BM 검토

---

## 9. Core Feature Model

### 9.1 Book

책은 Spotify의 앨범과 유사하다.

주요 필드:

- id
- title
- subtitle
- author
- publisher
- coverImageUrl
- description
- categories
- isbn
- sourceType
- createdAt
- updatedAt

sourceType 예시:

- user_added
- public_api
- curated
- original
- licensed

### 9.2 Chapter

챕터는 Spotify의 트랙과 유사하다.

책을 잘게 나누어 소비할 수 있게 만드는 핵심 단위다.

주요 필드:

- id
- bookId
- title
- order
- estimatedReadingMinutes
- summary
- contentAvailability
- isOriginal
- isCurated
- createdAt
- updatedAt

contentAvailability 예시:

- metadata_only
- preview
- full_content
- original_content

### 9.3 Flow

Flow는 독서 플레이리스트다.

여러 책의 챕터, 구절, 오리지널 콘텐츠를 하나의 주제나 감정에 맞춰 묶는다.

예시:

- 퇴근 후 마음을 가라앉히는 20분
- 번아웃에서 빠져나오는 문장들
- 사랑이 끝난 뒤 읽는 챕터
- 일의 감각을 되찾는 짧은 독서
- 혼자 있는 밤을 위한 고전 챕터

주요 필드:

- id
- title
- description
- coverImageUrl
- creatorId
- visibility
- items
- tags
- mood
- estimatedTotalMinutes
- createdAt
- updatedAt

Flow는 두 종류가 있다.

1. Editorial Flow — B PLi 팀이 직접 큐레이션
2. User Flow — 사용자가 직접 생성

초기에는 Editorial Flow를 통해 서비스의 취향과 품질을 정의한다.

### 9.4 Quote

Quote는 사용자가 저장한 구절이다.

주요 필드:

- id
- userId
- bookId
- chapterId
- text
- pageNumber
- imageUrl
- sourceType
- createdAt
- updatedAt

sourceType 예시:

- manual
- ocr
- imported

### 9.5 Comment

Comment는 구절 또는 페이지 위치에 남기는 사용자의 감상이다.

SoundCloud의 특정 시점 코멘트처럼, 책의 특정 위치에 감정을 붙이는 구조다.

주요 필드:

- id
- userId
- bookId
- chapterId
- quoteId
- pageNumber
- body
- visibility
- createdAt
- updatedAt

visibility 예시:

- private
- followers
- public

---

## 10. Viral Features

B PLi의 성장은 공유 가능한 독서 경험에서 나온다.

### 10.1 Quote Share Card

사용자가 저장한 구절과 자신의 코멘트를 이미지 카드로 생성해 공유할 수 있어야 한다.

목표 채널:

- Instagram Story
- Instagram Feed
- X
- Threads
- KakaoTalk

카드 구성:

- 책 구절
- 사용자 코멘트
- 책 제목
- 저자명
- B PLi 워터마크
- 선택적으로 사용자 독서 성향 뱃지

디자인 방향:

- 미니멀
- 여백 중심
- 종이 질감 또는 앨범 커버 감성
- 인스타그램 스토리 비율 지원
- 정사각형 피드 비율 지원

기술 방향:

- 서버 사이드 이미지 렌더링 우선 고려
- 폰트 깨짐, 이모지 깨짐, 기기별 렌더링 차이를 줄인다.
- 템플릿 기반으로 확장 가능하게 설계한다.

### 10.2 Reading Personality Test

독서 심리 테스트는 신규 유저 유입용 바이럴 기능이다.

결과 예시:

- 감성 수집가형
- 몰입 탐험가형
- 문장 채집가형
- 지적 방랑자형
- 고요한 완독가형
- 취향 큐레이터형

퍼널:

1. 테스트 링크 유입
2. 8-12개 문항 응답
3. 결과 카드 생성
4. 결과에 맞는 책/챕터/Flow 추천
5. 가입 유도
6. 첫 기록 생성

### 10.3 Yearly Wrapped

Spotify Wrapped처럼 사용자의 1년 독서 데이터를 시각화한다.

지표 예시:

- 올해 읽은 책 수
- 저장한 구절 수
- 가장 많이 읽은 장르
- 가장 많이 남긴 감정
- 올해의 문장
- 올해의 책
- 올해의 독서 성향
- 나와 비슷한 독서 취향 사용자 비율

MVP부터 Wrapped를 위한 이벤트 데이터를 적재해야 한다.

---

## 11. Recommendation System

초기 추천은 복잡한 ML보다 규칙 기반 + 태그 기반으로 시작한다.

추천에 사용할 신호:

- 저장한 책
- 읽는 중인 책
- 완독한 책
- 저장한 구절
- 코멘트의 감정 태그
- 선호 장르
- 독서 심리 테스트 결과
- 클릭한 Flow
- 공유한 카드

추천 화면은 Spotify 홈처럼 구성한다.

섹션 예시:

- 오늘의 가벼운 챕터
- 지금 기분에 맞는 Flow
- 당신이 저장한 문장과 닮은 책
- 15분 안에 읽는 고전
- 다시 읽기 좋은 구절
- 감성 수집가형을 위한 추천

---

## 12. Library Availability

초기 도서관 기능은 단순 정보 제공 수준으로 제한한다.

목표:

- “이 책 주변 도서관에 있어요” 수준
- 실시간 예약/대출까지는 MVP에서 제외

도서관 기능은 핵심 경험이 아니라 보조 경험이다.

B PLi의 핵심은 도서 접근성보다 큐레이션, 기록, 공유, 챕터 단위 소비다.

---

## 13. Tech Stack

현재 개발 방향은 Svelte 기반이다.

### Frontend

- SvelteKit
- Svelte 5
- TypeScript
- TanStack Query
- Svelte Store 또는 runes 기반 상태 관리
- Tailwind CSS 또는 CSS variables 기반 디자인 시스템

### Backend

초기에는 SvelteKit 서버 기능으로 시작할 수 있다.

서비스가 커지면 별도 API 서버를 분리한다.

가능한 백엔드 옵션:

- SvelteKit server routes
- Node.js API
- FastAPI

초기 개발 속도를 우선한다면 SvelteKit full-stack 구조를 기본으로 한다.

### Database

- PostgreSQL
- Prisma 또는 Drizzle ORM

### Storage

- S3 호환 스토리지
- 이미지 카드
- OCR 원본 이미지
- 책 커버 이미지 캐시

### Search / Recommendation

초기:

- PostgreSQL full-text search
- 태그 기반 추천

확장:

- Meilisearch
- Typesense
- Qdrant 또는 pgvector

### OCR

초기 OCR 후보:

- Naver CLOVA OCR
- Google Cloud Vision
- AWS Textract

한국어 인쇄체 책 사진 인식이 중요하므로, 실제 샘플 이미지로 정확도를 비교해야 한다.

---

## 14. Suggested Project Structure

```txt
src/
  lib/
    components/
      book/
      chapter/
      flow/
      quote/
      card/
      common/
    server/
      db/
      services/
      repositories/
      auth/
      ocr/
      image-renderer/
    stores/
    types/
    utils/
  routes/
    /
    /onboarding
    /books
    /books/[id]
    /books/[id]/chapters/[chapterId]
    /flows
    /flows/[id]
    /quotes
    /share/[id]
    /personality-test
    /wrapped
prisma/
  schema.prisma
static/
  images/
  fonts/
```

---

## 15. Initial Routes

### `/`

홈 피드.

Spotify 홈처럼 추천 섹션을 보여준다.

### `/onboarding`

가입 후 초기 취향 설정.

- 선호 장르
- 읽고 싶은 분위기
- 관심 주제
- 독서 목표

### `/books`

책 검색 / 등록 / 탐색.

### `/books/[id]`

책 상세 페이지.

앨범 상세처럼 구성한다.

포함 요소:

- 커버
- 제목
- 저자
- 설명
- 독서 상태
- 챕터 리스트
- 저장한 구절
- 관련 Flow

### `/books/[id]/chapters/[chapterId]`

챕터 상세.

트랙 플레이 화면처럼 가볍게 읽는 경험을 제공한다.

### `/flows`

Flow 탐색.

### `/flows/[id]`

Flow 상세.

플레이리스트처럼 여러 챕터/구절/콘텐츠를 순서대로 보여준다.

### `/quotes`

내가 저장한 구절 모음.

### `/share/[id]`

공유 카드 랜딩 페이지.

### `/personality-test`

독서 성향 테스트.

### `/wrapped`

연말 결산 페이지.

MVP에서는 실제 연말이 아니어도 테스트용 미리보기 페이지를 만들 수 있다.

---

## 16. Design Direction

B PLi의 UI는 Spotify의 구조적 명확함과 독서 서비스의 감성적 무드를 함께 가져간다.

키워드:

- 감각적
- 미니멀
- 어두운 배경도 잘 어울리는
- 앨범 커버처럼 책 커버를 강조하는
- 카드 기반
- 부드러운 모션
- 공유 이미지가 예쁜

주요 UI 패턴:

- 홈 피드 추천 섹션
- 가로 스크롤 카드
- 책 커버 중심 레이아웃
- Flow 플레이리스트 화면
- 챕터 리스트
- 저장한 구절 카드
- Floating action button for quote capture
- 하단 탭 내비게이션

초기 탭 후보:

1. Home
2. Search
3. Flow
4. Library
5. My

---

## 17. Data Events

Wrapped와 추천을 위해 초기부터 이벤트를 저장한다.

이벤트 예시:

- book_added
- book_started
- book_finished
- chapter_opened
- chapter_completed
- quote_created
- quote_shared
- comment_created
- flow_opened
- flow_saved
- personality_test_completed
- recommendation_clicked

이벤트 필드:

- id
- userId
- eventName
- properties
- createdAt

---

## 18. Development Priorities

Claude Code는 다음 순서로 개발한다.

1. SvelteKit 프로젝트 기본 구조 생성
2. 데이터 모델 정의
3. 인증 또는 임시 사용자 구조 구현
4. 책 등록 / 검색 기본 기능
5. 독서 상태 관리
6. 구절 저장 기능
7. OCR 업로드 플로우의 UI 먼저 구현
8. 공유 카드 템플릿 구현
9. Flow 데이터 모델과 기본 UI 구현
10. 추천 홈 피드 mock 구현
11. 독서 성향 테스트 구현
12. 이벤트 로깅 구조 구현

초기에는 실제 외부 API 연동보다 mock 데이터와 내부 구조를 우선한다.

---

## 19. Coding Guidelines

### General

- TypeScript를 사용한다.
- 명확한 타입을 우선한다.
- UI 컴포넌트와 비즈니스 로직을 분리한다.
- MVP라도 향후 Phase 3 콘텐츠 플랫폼 확장을 고려한다.

### Naming

- 책 관련 모델은 `Book`
- 챕터는 `Chapter`
- 플레이리스트형 묶음은 `Flow`
- 구절은 `Quote`
- 감상은 `Comment`
- 공유 이미지는 `ShareCard`

### UI Components

컴포넌트는 기능 단위로 나눈다.

예시:

- `BookCard.svelte`
- `BookCover.svelte`
- `ChapterList.svelte`
- `FlowCard.svelte`
- `QuoteCard.svelte`
- `ShareCardPreview.svelte`
- `RecommendationShelf.svelte`

### Server Logic

서버 로직은 route 안에 길게 쓰지 않는다.

`src/lib/server/services`와 `src/lib/server/repositories`로 분리한다.

---

## 20. MVP Acceptance Criteria

MVP는 다음이 가능하면 1차 완성으로 본다.

1. 사용자가 책을 검색하거나 직접 등록할 수 있다.
2. 사용자가 책의 독서 상태를 바꿀 수 있다.
3. 사용자가 구절을 저장할 수 있다.
4. 사용자가 페이지 번호와 코멘트를 남길 수 있다.
5. 사용자가 저장한 구절을 이미지 카드로 미리 볼 수 있다.
6. 사용자가 이미지 카드를 저장하거나 공유할 수 있다.
7. 사용자가 독서 성향 테스트를 완료할 수 있다.
8. 홈에서 추천 섹션을 볼 수 있다.
9. Flow의 기본 구조를 볼 수 있다.
10. 주요 행동 이벤트가 기록된다.

---

## 21. Do Not Build Yet

아래 기능은 지금 만들지 않는다.

- 전체 전자책 뷰어
- 출판사 정산 시스템
- 유료 구독 결제
- 대규모 소셜 팔로우 시스템
- 실시간 채팅
- 복잡한 ML 추천 시스템
- 모든 도서관 실시간 대출 연동
- 모든 책의 전문 제공

---

## 22. Claude Code Instruction

Claude Code는 이 프로젝트를 구현할 때 항상 다음 질문을 기준으로 판단한다.

> “이 기능이 B PLi를 도서를 위한 Spotify 클론에 더 가깝게 만드는가?”

그렇지 않다면 우선순위를 낮춘다.

특히 모든 기능은 다음 중 하나에 기여해야 한다.

1. 책을 더 쉽게 발견하게 한다.
2. 책을 더 작고 가볍게 읽게 한다.
3. 읽은 내용을 더 감각적으로 기록하게 한다.
4. 기록을 더 쉽게 공유하게 한다.
5. 사용자의 취향 데이터를 더 잘 쌓게 한다.
6. 향후 큐레이션/오리지널 콘텐츠 플랫폼으로 확장되게 한다.

---

## 23. First Implementation Prompt for Claude Code

아래 프롬프트로 Claude Code 개발을 시작할 수 있다.

```txt
Build the initial SvelteKit project structure for B PLi, a Spotify-like reading platform.

B PLi treats books like albums, chapters like tracks, and flows like playlists.

Start with the MVP reading record app:
- SvelteKit + TypeScript
- Basic route structure
- Mock data for books, chapters, flows, and quotes
- Home recommendation feed
- Book detail page
- Chapter list
- Quote save UI
- Quote share card preview UI
- Flow list and flow detail page
- Reading personality test placeholder

Do not implement payment, full ebook viewer, or complex ML recommendation yet.
Focus on clean architecture, reusable components, and future expansion into curated chapter-based content.
```

---

## 24. Product Reminder

B PLi는 “책을 관리하는 앱”이 아니라 “책을 플레이하는 앱”이다.

사용자가 느껴야 할 첫인상은 다음과 같다.

> 책 한 권을 다 읽지 않아도 괜찮다.  
> 지금 내 기분에 맞는 한 챕터, 한 문장, 한 흐름부터 시작하면 된다.

