# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `pnpm dev` - Start development server with Turbopack
- `pnpm build` - Build the production application with Turbopack
- `pnpm start` - Start the production server
- `pnpm lint` - Run ESLint

## Architecture

This is a Next.js 15 application using the App Router with TypeScript and Tailwind CSS.

### Key Technologies
- **Next.js 15** with App Router and Turbopack for fast development
- **React 19** with TypeScript for type safety
- **Tailwind CSS 4** for styling
- **pnpm** as the package manager

### Project Structure
```
src/
├── app/
│   ├── layout.tsx    # Root layout with Geist fonts
│   ├── page.tsx      # Home page
│   └── globals.css   # Global Tailwind styles
```

### Planned Architecture Pattern
The README.md indicates a planned modular page architecture:
```
page-modules/
├── page_name/
│   ├── page.server.ts  # Server-side logic
│   ├── page.client.ts  # Client-side logic
│   ├── page.view.ts    # View components
│   ├── page.hook.ts    # Custom hooks
│   └── components/     # Page-specific components
```

### Configuration
- **TypeScript**: Uses `@/*` path mapping for src imports
- **ESLint**: Configured with Next.js core web vitals and TypeScript rules
- **Turbopack**: Enabled for both dev and build for faster compilation