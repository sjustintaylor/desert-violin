# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### pnpm Commands
- `pnpm dev` - Start development server with Turbopack
- `pnpm build` - Build the production application with Turbopack
- `pnpm start` - Start the production server
- `pnpm lint` - Run ESLint

### Task Runner (Taskfile.yml)
This project includes a Taskfile for task automation:
- `task` or `task default` - Show available tasks
- `task install` - Install dependencies with pnpm
- `task dev` - Start development server
- `task build` - Build the application
- `task start` - Start production server
- `task lint` - Run ESLint

## Architecture

This is a Next.js 15 application using the App Router with TypeScript and Tailwind CSS, implementing a **modular page architecture** that separates concerns for maintainability and scalability.

### Key Technologies
- **Next.js 15** with App Router and Turbopack for fast development
- **React 19** with TypeScript for type safety
- **Tailwind CSS 4** for styling
- **pnpm** as the package manager
- **Task** as the task runner

### Implemented Project Structure
```
src/
├── app/
│   ├── layout.tsx           # Root layout with Geist fonts
│   ├── page.tsx             # Home page (delegates to home module)
│   ├── dashboard/
│   │   └── page.tsx         # Dashboard page (delegates to dashboard module)
│   └── globals.css          # Global Tailwind styles
└── page-modules/            # Modular page architecture (IMPLEMENTED)
    ├── home/
    │   ├── home.server.tsx  # Server-side logic and components
    │   ├── home.client.tsx  # Client mounting component
    │   ├── home.view.tsx    # Pure UI components
    │   └── home.hook.ts     # useHome custom hook
    └── dashboard/
        ├── dashboard.server.tsx  # Server-side logic and components
        ├── dashboard.client.tsx  # Client mounting component
        ├── dashboard.view.tsx    # Pure UI components
        └── dashboard.hook.ts     # useDashboard custom hook
```

### Modular Architecture Pattern (IMPLEMENTED)
Each page follows the separation of concerns pattern:

- **{page}.server.tsx**: Server-side data fetching and server components
- **{page}.client.tsx**: Client mounting component with 'use client' directive
- **{page}.view.tsx**: Pure UI components that receive props from hooks
- **{page}.hook.ts**: Custom hooks containing all client-side logic

### Implementation Pattern
```typescript
// app/page.tsx - Minimal route delegation
import { HomeServer } from "@/page-modules/home/home.server";
export default HomeServer;

// page-modules/home/home.server.tsx - Server logic
export async function getHomeData() { /* server data fetching */ }
export async function HomeServer() {
  const serverData = await getHomeData();
  return <HomeClient serverData={serverData} />;
}

// page-modules/home/home.client.tsx - Client mounting
'use client';
export function HomeClient({ serverData }) {
  const pageLogic = useHome({ serverData });
  return <HomeView {...pageLogic} />;
}
```

### Configuration
- **TypeScript**: Uses `@/*` path mapping for src imports
- **ESLint**: Configured with Next.js core web vitals and TypeScript rules
- **Turbopack**: Enabled for both dev and build for faster compilation
- **Package Name**: "next-ssr" (configured in package.json)