# B PLi

**책을 플레이하다** — 도서를 위한 Spotify 클론.

책 = 앨범, 챕터 = 트랙, Flow = 플레이리스트. 완독 부담 없이 지금 기분에 맞는 한 챕터, 한 문장부터 시작하는 큐레이션 기반 독서 플랫폼입니다. 자세한 제품 방향은 [CLAUDE.md](./CLAUDE.md)를 참고하세요.

## Tech Stack

- SvelteKit + Svelte 5 (runes) + TypeScript
- Tailwind CSS v4
- Prisma (PostgreSQL) — MVP 단계에서는 인메모리 mock 스토어로 동작
- 도서관 정보나루(data4library) + Kakao Books API (키 없으면 mock fallback)

## Getting Started

```sh
npm install
npm run dev
```

API 키를 사용하려면 `.env.example`을 `.env`로 복사 후 키를 채워주세요. 키가 없어도 mock 데이터로 전체 UX가 동작합니다.

## Scripts

| 명령어 | 설명 |
| --- | --- |
| `npm run dev` | 개발 서버 |
| `npm run build` | 프로덕션 빌드 |
| `npm run preview` | 빌드 미리보기 |
| `npm run check` | svelte-check 타입 검사 |

## Structure

```
src/
  lib/
    components/   # book / chapter / flow / quote / card / common
    server/       # db(store) / services / repositories / image-renderer
    data/         # mock catalog & editorial flows
    types/        # domain types (Book, Chapter, Flow, Quote, ...)
  routes/         # /, /books, /flows, /quotes, /share, /library, /my, ...
prisma/
  schema.prisma   # PostgreSQL data model (swap-in ready)
```
