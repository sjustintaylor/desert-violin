# Desert Violin - Modular Next.js Architecture

A Next.js 15 application with a **fully implemented** modular page architecture that separates concerns for maintainability, testability, and scalability. This project demonstrates a working example of the modular pattern in action.

## Architecture Philosophy

This project follows a **separation of concerns** principle where the Next.js `app/` directory serves only as route definitions and minimal glue code, while all business logic lives in organized `page-modules/`. This approach provides:

### Benefits
- **Maintainability**: Changes to one concern (server, client, view, hooks) don't affect others
- **Testability**: Each concern can be tested independently with focused unit tests
- **Team Collaboration**: Multiple developers can work on different aspects of the same page
- **Scalability**: Large pages don't become monolithic files as features are added
- **Code Reuse**: Hooks and utilities can be easily extracted and shared
- **Clear Boundaries**: Business logic is separated from routing infrastructure

## Directory Structure

```
src/
├── app/                          # Next.js App Router (minimal route definitions)
│   ├── layout.tsx                # Root layout with Geist fonts
│   ├── page.tsx                  # Home route - delegates to home page module
│   ├── dashboard/page.tsx        # Dashboard route - delegates to dashboard page module
│   └── globals.css               # Global Tailwind CSS styles
│
├── page-modules/                 # Business logic organized by page and concern (IMPLEMENTED)
│   ├── home/
│   │   ├── home.server.tsx       # Server-side logic and components
│   │   ├── home.client.tsx       # Client mounting component (wires hook + view)
│   │   ├── home.view.tsx         # Pure UI components
│   │   └── home.hook.ts          # useHome hook with ALL client-side logic
│   └── dashboard/
│       ├── dashboard.server.tsx  # Server-side logic and components
│       ├── dashboard.client.tsx  # Client mounting component (wires hook + view)
│       ├── dashboard.view.tsx    # Pure UI components with tab navigation
│       └── dashboard.hook.ts     # useDashboard hook with tab and navigation logic
│
└── shared/                       # Shared utilities and components (to be added)
    ├── components/               # Reusable components across pages
    ├── hooks/                    # Shared custom hooks
    └── utils/                    # Utility functions
```

## File Type Definitions

### `{pageName}.server.tsx`
**Purpose**: Server-side logic, data fetching, and server components
```typescript
// Example: home.server.tsx (ACTUAL IMPLEMENTATION)
import { HomeClient } from "./home.client";

export async function getHomeData() {
  return {
    title: "Desert Violin",
    description: "Welcome to your application",
    tagline: "The future of web development starts here",
  };
}

export async function HomeServer() {
  const serverData = await getHomeData();
  return <HomeClient serverData={serverData} />;
}
```

### `{pageName}.client.tsx`
**Purpose**: Client mounting component that wires together the page hook and view
```typescript
// Example: home.client.tsx (ACTUAL IMPLEMENTATION)
"use client";

import { HomeView } from "./home.view";
import { useHome } from "./home.hook";

export function HomeClient({ serverData }: { serverData: any }) {
  const pageLogic = useHome({ serverData });

  return <HomeView {...pageLogic} />;
}
```

### `{pageName}.view.tsx`
**Purpose**: Pure UI components with no business logic
```typescript
// Example: home.view.tsx (ACTUAL IMPLEMENTATION)
interface PageViewProps {
  serverData: any;
  handleLogin: () => void;
  handleRegister: () => void;
}

export function HomeView({
  serverData,
  handleLogin,
  handleRegister,
}: PageViewProps) {
  return (
    <div className="min-h-screen bg-background">
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
              {serverData.title}
            </h1>
            <p className="mt-6 text-lg leading-8 text-foreground/70">
              {serverData.tagline}
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <button onClick={handleLogin} className="...">Login</button>
              <button onClick={handleRegister} className="...">Register</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

### `{pageName}.hook.ts`
**Purpose**: Contains the main `use{PageName}` hook with all client-side logic for the page
```typescript
// Example: home.hook.ts (ACTUAL IMPLEMENTATION)
import { useRouter } from 'next/navigation';

export function useHome({ serverData }: { serverData: any }) {
  const router = useRouter();

  const handleLogin = () => {
    router.push('/dashboard');
  };

  const handleRegister = () => {
    router.push('/dashboard');
  };

  return {
    serverData,
    handleLogin,
    handleRegister,
  };
}

// Example: dashboard.hook.ts (ACTUAL IMPLEMENTATION)
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function useDashboard({ serverData }: { serverData: any }) {
  const [selectedTab, setSelectedTab] = useState('overview');
  const router = useRouter();

  const handleTabChange = (tab: string) => {
    setSelectedTab(tab);
  };

  const handleLogout = () => {
    router.push('/');
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  return {
    serverData,
    selectedTab,
    handleTabChange,
    handleLogout,
    handleRefresh,
  };
}
```

### `components/`
**Purpose**: Components that are only used by this specific page
- Place components here if they're tightly coupled to the page
- Move to `shared/components/` if they become useful for other pages

## Implementation Examples

### Actual Working Implementation

This project demonstrates the modular architecture in action with two working pages: Home and Dashboard.

```typescript
// app/page.tsx - Minimal route delegation (ACTUAL CODE)
import { HomeServer } from "@/page-modules/home/home.server";

export default HomeServer;
```

```typescript
// app/dashboard/page.tsx - Minimal route delegation (ACTUAL CODE)
import { DashboardServer } from "@/page-modules/dashboard/dashboard.server";

export default DashboardServer;
```

```typescript
// page-modules/home/home.server.tsx - Server logic and data (ACTUAL CODE)
import { HomeClient } from "./home.client";

export async function getHomeData() {
  return {
    title: "Desert Violin",
    description: "Welcome to your application",
    tagline: "The future of web development starts here",
  };
}

export async function HomeServer() {
  const serverData = await getHomeData();
  return <HomeClient serverData={serverData} />;
}
```

```typescript
// page-modules/home/home.client.tsx - Client mounting (ACTUAL CODE)
"use client";

import { HomeView } from "./home.view";
import { useHome } from "./home.hook";

export function HomeClient({ serverData }: { serverData: any }) {
  const pageLogic = useHome({ serverData });

  return <HomeView {...pageLogic} />;
}
```

```typescript
// page-modules/home/home.hook.ts - Client logic (ACTUAL CODE)
import { useRouter } from 'next/navigation';

export function useHome({ serverData }: { serverData: any }) {
  const router = useRouter();

  const handleLogin = () => {
    router.push('/dashboard');
  };

  const handleRegister = () => {
    router.push('/dashboard');
  };

  return {
    serverData,
    handleLogin,
    handleRegister,
  };
}
```

The Dashboard page includes more complex features like tab navigation, state management, and user interactions, demonstrating the scalability of this pattern.

## Guidelines & Best Practices

### When to Create New Page Modules
- Create a new page module for each distinct route in your `app/` directory
- Each page module should represent a unique user journey or functional area

### When to Share vs Keep Page-Specific
- **Keep in page module**: Logic, components, and hooks that are specific to one page
- **Move to shared**: When the same logic or component is needed by 2+ pages
- **Extract to library**: When logic becomes complex enough to warrant its own package

### The use{PageName} Hook Pattern
- **Single hook**: All client-side logic must be contained in the `use{PageName}` hook (e.g., `useHome`, `useDashboard`)
- **Complete interface**: The hook should return everything the view needs as props
- **Server data integration**: Accept server data as parameters and integrate with client state
- **Event handlers**: All user interactions should be handled through functions returned by the hook

### Import/Export Patterns
```typescript
// ✅ Actual implementation pattern: Direct server component export
export { HomeServer } from './home.server';
export { HomeClient } from './home.client';
export { HomeView } from './home.view';
export { useHome } from './home.hook';

// ✅ Actual app/page.tsx import pattern
import { HomeServer } from "@/page-modules/home/home.server";
export default HomeServer;

// ✅ Internal page module imports
import { HomeClient } from "./home.client";  // server imports client
import { HomeView } from "./home.view";      // client imports view
import { useHome } from "./home.hook";       // client imports hook
```

### Client Mounting Pattern
- **{pageName}.client.tsx role**: Only responsible for mounting - calls `use{PageName}` and renders `PageView`
- **'use client' directive**: Should be the only place this directive appears for the page
- **No logic**: Should contain no business logic, state, or event handlers
- **Data flow**: `app/page.tsx` → `{PageName}Server` → `{PageName}Client` → `use{PageName}` → `PageView`

### Testing Strategies
- **Server logic**: Test data fetching and server component rendering
- **use{PageName} hook**: Test all client-side logic by testing the page-specific hook in isolation
- **View components**: Test UI rendering with different props from the hook
- **Integration**: Test the `ClientMount` component with mocked hook returns

## Development Workflow

### Task Runner (Taskfile.yml)
This project includes a Taskfile for streamlined development:

```yaml
# Available tasks
task              # Show all available tasks
task install      # Install dependencies with pnpm
task dev          # Start development server with Turbopack
task build        # Build the production application
task start        # Start production server
task lint         # Run ESLint
```

### Development Commands
- **pnpm**: Package management and script execution
- **Turbopack**: Fast bundling for development and production
- **ESLint**: Code quality and consistency

## Migration Path

### For Existing Projects
1. **Audit current pages**: Identify server logic, client logic, views, and hooks
2. **Create page-modules structure**: Start with one page as a proof of concept
3. **Extract concerns**: Move logic from monolithic page files to appropriate module files
4. **Update app routes**: Modify `app/` files to import from page modules
5. **Test thoroughly**: Ensure functionality remains the same after refactoring
6. **Repeat gradually**: Convert additional pages one at a time

### Starting a New Page
1. Create directory in `page-modules/[page-name]/`
2. Add the four core files: `{pageName}.server.tsx`, `{pageName}.client.tsx`, `{pageName}.view.tsx`, `{pageName}.hook.ts`
3. Create `components/` directory for page-specific components (if needed)
4. Create minimal route in `app/` that imports server component
5. Implement:
   - **{pageName}.server.tsx**: Data fetching and server component that renders client
   - **{pageName}.hook.ts**: `use{PageName}` hook with all client logic
   - **{pageName}.view.tsx**: Pure UI components that receive hook props
   - **{pageName}.client.tsx**: Simple mounting component that connects hook and view

### Implemented Features
This project includes working examples of:
- **Home page**: Basic navigation and routing
- **Dashboard page**: Complex state management with tab navigation
- **Task runner integration**: Streamlined development workflow
- **Tailwind CSS**: Modern styling with design tokens

This modular architecture scales with your application and team, making it easier to maintain and extend as your project grows.

