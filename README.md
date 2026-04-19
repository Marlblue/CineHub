# 🎬 CineHub

A modern movie discovery web application built with **React 19**, **TypeScript**, and the **TMDB API**. Browse trending films, search by title, explore genres, view detailed cast & crew info, watch trailers, and manage a personal watchlist — all with a sleek, responsive dark-themed UI.

> **Live Demo:** [cinehub.netlify.app](https://cinehub.netlify.app) *(update with your actual URL)*

---

## ✨ Features

- 🔥 **Trending Movies** — Weekly trending films powered by TMDB with infinite scroll
- 🔍 **Real-time Search** — Debounced search-as-you-type with paginated results
- 🎭 **Genre Filtering** — Discover movies by genre categories
- 🎬 **Movie Details** — Full movie info including synopsis, ratings, runtime, revenue, and YouTube trailers
- 👤 **Cast & Crew** — Actor/director profiles with filmography
- 📋 **Watchlist** — Persistent watchlist saved to `localStorage` with toast notifications
- ⚡ **Lazy Loading** — Code-split pages for optimal bundle size
- 🛡️ **Error Handling** — React Error Boundary + graceful API error states
- 🔎 **SEO** — Dynamic `<head>` meta tags via `react-helmet-async`

---

## 🛠️ Tech Stack

### Frontend

| Technology | Version | Purpose |
|---|---|---|
| [React](https://react.dev/) | 19.2 | UI framework with hooks, Context API, lazy/Suspense |
| [TypeScript](https://www.typescriptlang.org/) | 5.9 | Static typing & type-safe API responses |
| [Vite](https://vite.dev/) | 7.2 | Build tool, HMR, dev server with API proxy |
| [Tailwind CSS](https://tailwindcss.com/) | 4.1 | Utility-first CSS via `@tailwindcss/vite` plugin |
| [React Router](https://reactrouter.com/) | 7.13 | Client-side routing with nested layouts |
| [TanStack Query](https://tanstack.com/query) | 5.x | Server state management, caching, infinite queries |
| [Axios](https://axios-http.com/) | 1.x | HTTP client with typed request/response |
| [Lucide React](https://lucide.dev/) | 0.563 | Icon library |
| [React Hot Toast](https://react-hot-toast.com/) | 2.6 | Toast notification system |
| [React Helmet Async](https://github.com/staylor/react-helmet-async) | 2.0 | Dynamic SEO meta tags |

### Backend / Infrastructure

| Technology | Purpose |
|---|---|
| [Netlify Functions](https://www.netlify.com/products/functions/) | Serverless proxy to hide TMDB API key from client |
| [TMDB API](https://developer.themoviedb.org/) | Movie database — trending, search, details, credits, videos |

### Developer Tooling

| Tool | Purpose |
|---|---|
| [Vitest](https://vitest.dev/) | Unit testing framework (Vite-native) |
| [Testing Library](https://testing-library.com/) | React component testing (`@testing-library/react`) |
| [jsdom](https://github.com/jsdom/jsdom) | Browser environment for tests |
| [ESLint](https://eslint.org/) | Linting with `react-hooks` & `react-refresh` plugins |
| [TypeScript ESLint](https://typescript-eslint.io/) | Type-aware linting rules |
| [pnpm](https://pnpm.io/) | Fast, disk-efficient package manager |

---

## 🏗️ Architecture

```
src/
├── api/            # Axios client & TMDB API functions (typed)
├── components/     # Reusable UI (Navbar, MovieCard, SEO, ErrorBoundary, etc.)
├── context/        # React Context (WatchlistProvider with localStorage)
├── hooks/          # Custom hooks (useMovies, useDebounce, usePerson)
├── pages/          # Route pages (Home, MovieDetail, PersonDetail, Watchlist)
├── types/          # TypeScript interfaces for TMDB API responses
├── test/           # Test setup & component tests
├── App.tsx         # Router config with lazy-loaded routes
└── main.tsx        # Entry point — providers (Query, Helmet, Watchlist, ErrorBoundary)

netlify/
└── functions/
    └── tmdb.js     # Serverless proxy — injects API key server-side
```

### Key Architectural Decisions

- **API Key Security** — TMDB API key is injected server-side via Netlify Functions, never exposed to the client bundle
- **Server State vs. Client State** — TanStack Query handles all API data (caching, refetching, pagination); React Context is only used for client-side watchlist
- **Code Splitting** — All page components are `React.lazy()` loaded with a shared `<Suspense>` fallback
- **Infinite Scroll** — `useInfiniteQuery` for trending, discover, and search — loads next page on demand
- **Debounced Search** — Custom `useDebounce` hook prevents excessive API calls during typing

---

## 🚀 Getting Started

### Prerequisites

- Node.js ≥ 18
- pnpm (or npm/yarn)
- [TMDB API Key](https://developer.themoviedb.org/docs/getting-started)

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/cinehub.git
cd cinehub

# Install dependencies
pnpm install

# Create environment file
cp .env.example .env
# Add your TMDB API key to .env:
# VITE_TMDB_API_KEY=your_api_key_here

# Start development server
pnpm dev
```

### Available Scripts

| Command | Description |
|---|---|
| `pnpm dev` | Start Vite dev server with HMR & API proxy |
| `pnpm build` | Type-check with `tsc` then build for production |
| `pnpm preview` | Preview production build locally |
| `pnpm test` | Run unit tests with Vitest |
| `pnpm lint` | Lint codebase with ESLint |

---

## 📦 Deployment

CineHub is configured for **Netlify** deployment out of the box:

- `netlify.toml` defines build settings and redirect rules
- Netlify Functions proxy handles `/api/tmdb/*` routes
- SPA fallback redirects all routes to `index.html`
- Set `VITE_TMDB_API_KEY` in Netlify environment variables

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
