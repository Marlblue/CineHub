<div align="center">

# 🎬 CINEHUB
### The Ultimate Premium Movie Discovery Experience

[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7.2-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)

---

**CineHub** is a high-end, immersive web application designed for cinema enthusiasts. Built with cutting-edge technology, it delivers a stunning cinematic browsing experience featuring fluid animations, glassmorphism aesthetics, and real-time data powered by TMDB.

[**Live Demo**](https://marlblue-cinehub.netlify.app/) | [**Get Started**](#-getting-started)

</div>

## ✨ Key Features

- 🎭 **Cinematic Glass-UI** — A premium design system utilizing deep gradients, backdrop filters, and mesh backgrounds for a truly immersive feel.
- 🔥 **Trending & Discover** — Real-time updates on what's hot in the world of cinema, powered by the TMDB API.
- 🔍 **Pro Search Experience** — Instant, debounced search results with a sleek overlay interface and visual feedback.
- 🔀 **Surprise Me** — Feeling indecisive? Let CineHub pick a highly-rated trending movie for you with a single click.
- 📋 **Persistent Watchlist** — Save your "must-watch" movies to your personal collection, synced with local storage.
- 🎬 **Deep Movie Insights** — Comprehensive details including cast profiles, trailers, and intelligent recommendations.
- 📱 **Adaptive Design** — Perfectly optimized for everything from ultra-wide monitors to the smallest smartphone screens.
- ⚡ **Turbocharged Performance** — Leveraging React 19's speed, TanStack Query caching, and skeleton loading states for a lag-free experience.

## 🛠️ Modern Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 19.2 (Functional Components, Context API) |
| **Framework** | Vite 7.2 (Lightning fast HMR & builds) |
| **Styling** | Tailwind CSS v4.1 (Modern JIT engine & native CSS variables) |
| **State Management** | TanStack Query v5 (Server State) + React Context (Client State) |
| **Routing** | React Router v7.13 |
| **Data Source** | TMDB (The Movie Database) API |
| **Icons** | Lucide React |

## 🏗️ Project Structure

```bash
src/
├── api/            # TMDB API Client & Axios configuration
├── components/     # UI Components (Navbar, MovieCard, Layout, etc.)
├── context/        # Global State (Watchlist, Search, Language)
├── hooks/          # Custom React Query hooks for data fetching
├── pages/          # Full-page route components
├── types/          # TypeScript interfaces for TMDB data
└── utils/          # Helper functions (Formatting, Image URLs, Translations)
```

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/Marlblue/CineHub.git
cd CineHub
```

### 2. Install dependencies
We recommend using **pnpm** for faster and more efficient dependency management.
```bash
pnpm install
```

### 3. Set up Environment Variables
Create a `.env` file in the root directory and add your TMDB API Key:
```env
VITE_TMDB_API_KEY=your_api_key_here
```

### 4. Launch the Development Server
```bash
pnpm dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser to see the results.


---

<div align="center">
Built with ❤️ for Movie Lovers worldwide.
<br/>
© 2026 CineHub Project
</div>
