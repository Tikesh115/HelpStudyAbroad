# HelpStudyAbroad — Admin Dashboard (Frontend Assessment)

[![Next.js](https://img.shields.io/badge/Next.js-App%20Router-black?logo=nextdotjs)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue?logo=typescript)](https://www.typescriptlang.org/)
[![MUI](https://img.shields.io/badge/MUI-Material%20UI-007FFF?logo=mui)](https://mui.com/)
[![Zustand](https://img.shields.io/badge/Zustand-State%20Management-000000)](https://github.com/pmndrs/zustand)

A responsive admin dashboard built with **Next.js (App Router) + TypeScript**, featuring authentication, protected routes, and data-driven modules powered by **DummyJSON**.

---

## 1) Project Title

**HelpStudyAbroad — Responsive Admin Dashboard (Frontend Technical Assessment)**

## 2) Project Overview

This project is a recruiter-friendly frontend technical assessment showcasing a modern React/Next.js dashboard architecture.

It includes:
- **Authentication** using DummyJSON Auth API
- **Protected routes** for authenticated pages
- **Persistent login** via Zustand persist
- **Users** and **Products** modules with search, pagination, and filtering
- Clean, responsive UI built with **Material UI**

> Note: This project integrates with **DummyJSON public APIs** and does not require a custom backend.

## 3) Features

- ✅ DummyJSON authentication (login)
- 🔒 Protected routes (authenticated-only dashboard pages)
- 💾 Persistent session using Zustand persist
- 👤 Users module
  - List & detail pages
  - Search and pagination
- 🛒 Products module
  - List & detail pages
  - Search, pagination, and **category filtering**
  - Product image carousel using **Swiper.js**
- 📱 Responsive dashboard layout (mobile → desktop)
- ⚡ Optimized state and network usage patterns

## 4) Tech Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **UI:** Material UI (MUI)
- **State Management:** Zustand (+ persist)
- **API:** DummyJSON (public REST APIs)
- **Carousel:** Swiper.js

## 5) Folder Structure

> The exact structure may vary slightly depending on implementation, but the project follows a standard Next.js App Router layout.

```text
.
├─ app/
│  ├─ (auth)/
│  ├─ (dashboard)/
│  ├─ users/
│  ├─ products/
│  ├─ layout.tsx
│  └─ page.tsx
├─ components/
│  ├─ layout/
│  ├─ ui/
│  └─ ...
├─ store/
│  ├─ auth/
│  ├─ users/
│  ├─ products/
│  └─ index.ts
├─ lib/
│  ├─ api/
│  ├─ utils/
│  └─ ...
├─ public/
├─ styles/
├─ types/
├─ .env.example
├─ next.config.*
├─ package.json
└─ README.md
```

## 6) Setup Instructions

1. **Clone** the repository
2. **Install dependencies**
3. **Run the development server**
4. Open the app in your browser

If you are submitting this as an assessment, ensure you run a quick production build to confirm everything compiles.

## 7) Installation Commands

```bash
# clone
git clone https://github.com/Tikesh115/HelpStudyAbroad.git

# enter the project
cd HelpStudyAbroad

# install dependencies
npm install
```

## 8) Run Commands

```bash
# start dev server
npm run dev

# build for production
npm run build

# start production server
npm run start

# run lint (if configured)
npm run lint
```

## 9) Environment Variables

This project uses **DummyJSON public APIs**, so **no custom backend environment variables are required**.

If you want to keep configuration explicit, you may optionally create a `.env.local` file for client-side constants (e.g., API base URL), but it is not mandatory.

Example (optional):

```bash
# .env.local (optional)
NEXT_PUBLIC_API_BASE_URL=https://dummyjson.com
```

> If you do add env variables, remember that only variables prefixed with `NEXT_PUBLIC_` are exposed to the browser.

## 10) Demo Credentials

DummyJSON provides test credentials you can use to sign in:

- **Username:** `kminchelle`
- **Password:** `0lelplR`

(These are public demo credentials from DummyJSON documentation and are intended for testing.)

## 11) State Management Explanation

**Zustand** was chosen because it provides a lightweight, scalable state management approach without the boilerplate of larger solutions.

Key benefits in this project:
- **Minimal API surface** (easy to reason about during an assessment)
- **Store modularity** (separate auth/users/products stores)
- **Persisted auth session** using `zustand/middleware` to keep the user logged in across reloads
- **Predictable updates** that work well with Next.js client components

## 12) Performance Optimizations

- **Persisted auth state** reduces redundant login calls and improves UX.
- **Paginated queries** to avoid rendering large lists at once.
- **Debounced / controlled search** patterns (where applicable) to prevent excessive requests.
- **Component-driven UI** with reusable layout and UI primitives.
- **Optimized image rendering** using Next.js best practices (where applicable).

## 13) Responsive Design Notes

- Dashboard layout is designed mobile-first and adapts cleanly to tablet and desktop.
- MUI’s responsive system (breakpoints, Grid, and responsive props) is used for consistent behavior.
- Tables/lists and filters are designed to remain usable on smaller screens.

## 14) Future Improvements

- Add **role-based access control** (RBAC) for different admin permissions.
- Add **unit/integration tests** (Vitest/Jest + React Testing Library).
- Add **server-side caching** or data fetching optimization strategies.
- Improve **accessibility** (ARIA labels, keyboard navigation for all controls).
- Add **skeleton loading** states and richer empty/error states.
- Add **CI pipeline** (lint + typecheck + build) and formatting (Prettier).

## 15) Screenshots

> Add screenshots/GIFs to demonstrate the dashboard quickly.

- `screenshots/login.png`
- `screenshots/dashboard.png`
- `screenshots/users.png`
- `screenshots/products.png`
- `screenshots/product-detail.png`

```text
📸 Screenshots will be added here.
```

## 16) Live Demo

```text
🔗 Live demo link will be added here.
```

## 17) Author

**Tikesh115**

- GitHub: https://github.com/Tikesh115

---

### Notes for Reviewers

If you are reviewing this as an internship assessment:
- Start from the **Login** flow using the demo credentials.
- Navigate to **Users** and **Products** modules.
- Verify search, pagination, category filtering, and detail pages.
