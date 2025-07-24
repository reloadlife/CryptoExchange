# Frontend Application Structure

This document outlines the restructured frontend application with modern React patterns and best practices.

## Folder Structure

```
src/
├── app/                 # Next.js App Router
├── components/          # Reusable UI components
├── providers/           # Application providers (Theme, Query, Locale)
├── contexts/            # React contexts and state management
├── hooks/               # Custom React hooks
├── forms/               # Form components and validation
├── styles/              # Style utilities and theme definitions
├── lib/                 # Utility functions and configurations
└── env.js              # Environment variable validation
```

## Key Features

### 1. Providers (`/providers`)

**Main Provider Wrapper:**

```tsx
import { Providers } from "@/providers";

<Providers locale="en">{children}</Providers>;
```

**Individual Providers:**

- `ThemeProvider` - Next.js themes with dark/light mode
- `QueryProvider` - TanStack Query for API state management
- `LocaleProvider` - Internationalization with next-intl

### 2. Context Management (`/contexts`)

**App Context** - Global application state:

```tsx
import { useApp } from "@/contexts/app-context";

const { setLoading, addNotification, state } = useApp();
```

**User Context** - User authentication state:

```tsx
import { useUser } from "@/contexts/user-context";

const { user, login, logout, isAuthenticated } = useUser();
```

**Context Manager** - Combines all contexts:

```tsx
import { ContextManager } from "@/contexts/context-manager";
```

### 3. API Integration (`/hooks`)

**API Hook** - Easy access to API with TanStack Query:

```tsx
import { useApi } from "@/hooks/use-api";

const { useTrades, useCreateTrade, client } = useApi();
const trades = useTrades();
const createTrade = useCreateTrade();
```

**Available API Hooks:**

- `useHealth()` - API health status
- `useTrades()` - Get all trades
- `useTrade(id)` - Get specific trade
- `useCreateTrade()` - Create new trade (mutation)

### 4. Forms (`/forms`)

**Base Form Component:**

```tsx
import { BaseForm } from "@/forms/base-form";
import { FormField } from "@/forms/form-field";

<BaseForm schema={mySchema} onSubmit={handleSubmit}>
  <FormField name="email" type="email" required />
  <FormField name="message" type="textarea" />
</BaseForm>;
```

**Trade Form Example:**

```tsx
import { TradeForm } from "@/forms/trade-form";

<TradeForm onSubmit={handleSubmit} isLoading={false} />;
```

### 5. Theme & Styles (`/styles`)

**Typography:**

```tsx
import { typography } from "@/styles/typography";

<h1 className={typography.headings.h1}>Title</h1>
<p className={typography.text.muted}>Subtitle</p>
```

**Animations:**

```tsx
import { animations, transitions } from "@/styles/animations";

<div className={`${animations.fadeIn} ${transitions.normal}`}>Content</div>;
```

### 6. Environment Variables (`/env.js`)

Type-safe environment variables with t3-oss/env:

```tsx
import { env } from "@/env";

const apiUrl = env.NEXT_PUBLIC_API_URL; // Fully typed and validated
```

## Usage Examples

### Creating a New Page with API Data

```tsx
"use client";

import { useApi } from "@/hooks/use-api";
import { useApp } from "@/contexts/app-context";

export default function TradePage() {
  const { useTrades } = useApi();
  const { addNotification } = useApp();
  const { data: trades, isLoading, error } = useTrades();

  if (error) {
    addNotification({
      type: "error",
      message: "Failed to load trades"
    });
  }

  return (
    <div>
      {isLoading ? "Loading..." : trades?.data?.trades.map(...)}
    </div>
  );
}
```

### Creating a Form

```tsx
import { BaseForm, FormField } from "@/forms";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
});

function MyForm({ onSubmit }) {
  return (
    <BaseForm schema={schema} onSubmit={onSubmit}>
      <FormField name="name" label="Name" required />
      <FormField name="email" label="Email" type="email" required />
    </BaseForm>
  );
}
```

### Theme Integration

```tsx
import { useTheme } from "@/hooks/use-theme";

function ThemeToggle() {
  const { toggleTheme, isDark } = useTheme();

  return (
    <button onClick={toggleTheme}>{isDark ? "Light" : "Dark"} Mode</button>
  );
}
```

## Environment Setup

Required environment variables in `.env.local`:

```bash
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_ENVIRONMENT=development
```

## Benefits

1. **Type Safety** - Full TypeScript support with proper typing
2. **Performance** - Optimized with TanStack Query caching
3. **Developer Experience** - Clear patterns and easy-to-use APIs
4. **Maintainability** - Organized structure with separation of concerns
5. **Scalability** - Easy to extend with new features and components
6. **Modern Patterns** - Latest React and Next.js best practices
