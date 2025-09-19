# Desert Violin - Modular Next.js Architecture

A Next.js application implementing a modular page architecture that separates concerns for maintainability, testability, and scalability.

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
│   ├── page.tsx                  # Home route - delegates to home page module
│   ├── about/page.tsx            # About route - delegates to about page module
│   └── dashboard/page.tsx        # Dashboard route - delegates to dashboard page module
│
├── page-modules/                 # Business logic organized by page and concern
│   ├── home/
│   │   ├── home.server.ts        # Server-side logic and data fetching
│   │   ├── home.client.ts        # Client mounting component (wires hook + view)
│   │   ├── home.view.ts          # Pure UI components
│   │   ├── home.hook.ts          # useHome hook with ALL client-side logic
│   │   └── components/           # Home-specific components
│   │       ├── HeroSection.tsx
│   │       └── FeatureGrid.tsx
│   ├── about/
│   │   ├── about.server.ts
│   │   ├── about.client.ts
│   │   ├── about.view.ts
│   │   ├── about.hook.ts
│   │   └── components/
│   └── dashboard/
│       ├── dashboard.server.ts
│       ├── dashboard.client.ts
│       ├── dashboard.view.ts
│       ├── dashboard.hook.ts
│       └── components/
│
└── shared/                       # Shared utilities and components
    ├── components/               # Reusable components across pages
    ├── hooks/                    # Shared custom hooks
    └── utils/                    # Utility functions
```

## File Type Definitions

### `{pageName}.server.ts`
**Purpose**: Server-side logic, data fetching, and server components
```typescript
// Example: home.server.ts
export async function getHomeData() {
  const data = await fetch('/api/data');
  return data.json();
}

export function HomeServerComponent({ data }: { data: any }) {
  return <div>Server-rendered content: {data.title}</div>;
}
```

### `{pageName}.client.ts`
**Purpose**: Client mounting component that wires together the page hook and view
```typescript
// Example: home.client.ts
'use client';

import { PageView } from './home.view';
import { useHome } from './home.hook';

export function ClientMount({ serverData }: { serverData: any }) {
  const pageLogic = useHome({ serverData });

  return <PageView {...pageLogic} />;
}
```

### `{pageName}.view.ts`
**Purpose**: Pure UI components with no business logic
```typescript
// Example: home.view.ts
interface PageViewProps {
  data: any;
  onSubmit: (data: FormData) => void;
}

export function PageView({ data, onSubmit }: PageViewProps) {
  return (
    <div>
      <h1>{data.title}</h1>
      <form onSubmit={onSubmit}>
        {/* UI elements */}
      </form>
    </div>
  );
}
```

### `{pageName}.hook.ts`
**Purpose**: Contains the main `use{PageName}` hook with all client-side logic for the page
```typescript
// Example: home.hook.ts
import { useState, useEffect } from 'react';

export function useHome({ serverData }: { serverData: any }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({});

  const handleSubmit = (data: FormData) => {
    setLoading(true);
    // Client-side form handling logic
    console.log('Submitting:', data);
    setLoading(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    // Any page-specific effects
  }, [serverData]);

  return {
    // All props needed by PageView
    loading,
    formData,
    serverData,
    handleSubmit,
    handleInputChange,
  };
}
```

### `components/`
**Purpose**: Components that are only used by this specific page
- Place components here if they're tightly coupled to the page
- Move to `shared/components/` if they become useful for other pages

## Implementation Examples

### Current Monolithic Approach (Before)
```typescript
// app/page.tsx - Everything mixed together
export default function Home() {
  const [state, setState] = useState(); // Client state
  const data = fetchServerData();       // Server logic

  const handleClick = () => {           // Client logic
    // Event handling
  };

  return (                              // View logic
    <div>
      <h1>{data.title}</h1>
      <button onClick={handleClick}>Click</button>
    </div>
  );
}
```

### Modular Approach (After)
```typescript
// app/page.tsx - Minimal route definition
import { getHomeData, HomeServerComponent } from '@/page-modules/home/home.server';
import { ClientMount } from '@/page-modules/home/home.client';

export default async function Home() {
  const serverData = await getHomeData();

  return (
    <div>
      <HomeServerComponent data={serverData} />
      <ClientMount serverData={serverData} />
    </div>
  );
}
```

```typescript
// page-modules/home/home.server.ts
export async function getHomeData() {
  // Server-side data fetching
  return { title: 'Welcome Home', items: [] };
}

export function HomeServerComponent({ data }) {
  // Server component rendering
  return <h1>{data.title}</h1>;
}
```

```typescript
// page-modules/home/home.client.ts
'use client';

import { PageView } from './home.view';
import { useHome } from './home.hook';

export function ClientMount({ serverData }: { serverData: any }) {
  const pageLogic = useHome({ serverData });

  return <PageView {...pageLogic} />;
}
```

```typescript
// page-modules/home/home.hook.ts
import { useState } from 'react';

export function useHome({ serverData }: { serverData: any }) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (data: FormData) => {
    setLoading(true);
    // All client-side logic goes here
    console.log('Submitting:', data);
    setLoading(false);
  };

  return {
    serverData,
    loading,
    handleSubmit,
  };
}
```

```typescript
// page-modules/home/home.view.ts
interface PageViewProps {
  serverData: any;
  loading: boolean;
  handleSubmit: (data: FormData) => void;
}

export function PageView({ serverData, loading, handleSubmit }: PageViewProps) {
  return (
    <div>
      <h2>{serverData.title}</h2>
      <button disabled={loading} onClick={() => handleSubmit(new FormData())}>
        {loading ? 'Loading...' : 'Submit'}
      </button>
    </div>
  );
}
```

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
// ✅ Good: Clean exports from page modules
export { getHomeData, HomeServerComponent } from './home.server';
export { ClientMount } from './home.client';
export { PageView } from './home.view';
export { useHome } from './home.hook';

// ✅ Good: app/page.tsx imports only what it needs
import { getHomeData, HomeServerComponent } from '@/page-modules/home/home.server';
import { ClientMount } from '@/page-modules/home/home.client';
```

### Client Mounting Pattern
- **{pageName}.client.ts role**: Only responsible for mounting - calls `use{PageName}` and renders `PageView`
- **'use client' directive**: Should be the only place this directive appears for the page
- **No logic**: Should contain no business logic, state, or event handlers
- **Data flow**: `app/page.tsx` → `ClientMount` → `use{PageName}` → `PageView`

### Testing Strategies
- **Server logic**: Test data fetching and server component rendering
- **use{PageName} hook**: Test all client-side logic by testing the page-specific hook in isolation
- **View components**: Test UI rendering with different props from the hook
- **Integration**: Test the `ClientMount` component with mocked hook returns

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
2. Add the four core files: `{pageName}.server.ts`, `{pageName}.client.ts`, `{pageName}.view.ts`, `{pageName}.hook.ts`
3. Create `components/` directory for page-specific components
4. Create minimal route in `app/` that imports server components and `ClientMount`
5. Implement:
   - **{pageName}.server.ts**: Data fetching and server components
   - **{pageName}.hook.ts**: `use{PageName}` hook with all client logic
   - **{pageName}.view.ts**: Pure UI components that receive hook props
   - **{pageName}.client.ts**: Simple mounting component that connects hook and view

This modular architecture scales with your application and team, making it easier to maintain and extend as your project grows.

