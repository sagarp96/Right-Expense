# Finance App Development Guide

## Architecture Overview

This is a modern React TypeScript finance application built with Vite, using shadcn/ui components and preparing for Supabase authentication. The project follows a component-first architecture with strict type safety.

### Very Important

Don't try to add things, Just guide me the wayout or reference material, don't try to apply the functionality. Only Give me strategy and reference.

**Tech Stack:**

- **Frontend**: React 19.1 + TypeScript + Vite
- **Styling**: Tailwind CSS 4.1 with shadcn/ui "new-york" style
- **Forms**: React Hook Form + Zod validation (planned)
- **Auth**: Supabase (in setup phase)
- **State**: Zustand (planned)
- **Icons**: React Icons + Lucide (via shadcn/ui)

## Critical Development Patterns

### Path Aliases & Imports

- Always use `@/` for src imports: `import { cn } from "@/lib/utils"`
- UI components: `@/components/ui/button`
- Business components: `@/components/signup`
- Utils/libs: `@/lib/utils`

### Styling Standards

- Use `cn()` utility for className merging: `cn("flex flex-col gap-6", className)`
- Follow shadcn/ui data-slot pattern: `data-slot="button"`
- Leverage CSS variables for theming (see `src/index.css` for color tokens)
- Use Tailwind's new `@theme inline` configuration approach

### Component Architecture

- **UI Components** (`src/components/ui/`): Reusable, styled primitives based on Radix UI
- **Feature Components** (`src/components/`): Business logic components like forms
- All components accept `className` and spread props: `{ className, ...props }`
- Use forwardRef pattern for UI components when needed

### Form Patterns (In Development)

Currently basic HTML forms, transitioning to:

- React Hook Form for form state
- Zod for validation schemas
- Supabase for authentication
- React Hot Toast for notifications

Example current form structure:

```tsx
<form className={cn("flex flex-col gap-6", className)} {...props}>
  <div className="grid gap-3">
    <Label htmlFor="email">Email</Label>
    <Input id="email" name="email" type="email" required />
  </div>
</form>
```

## Environment & Configuration

### Environment Variables

- Store in `.env.local` (gitignored)
- Supabase config: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- All public vars prefixed with `NEXT_PUBLIC_` despite using Vite

### Key Configuration Files

- `components.json`: shadcn/ui configuration with aliases
- `tsconfig.app.json`: Main app TypeScript config with path mapping
- `vite.config.ts`: Vite setup with Tailwind plugin and path alias
- `src/index.css`: Global styles with CSS variables and Tailwind imports

## Development Workflow

### Build Commands

```bash
npm run dev          # Development server
npm run build        # TypeScript check + Vite build
npm run lint         # ESLint check
npm run preview      # Preview production build
```

### Adding New Components

1. UI components go in `src/components/ui/` following shadcn/ui patterns
2. Use `npx shadcn add <component>` for new UI primitives
3. Business components in `src/components/` import from `@/components/ui/`

### Authentication Setup (In Progress)

- Supabase client will be in `src/lib/supabase.ts`
- Environment variables already configured in `.env.local`
- Forms being upgraded to handle auth with proper validation

## Integration Points

### Supabase Integration

- Environment: `.env.local` with project URL and anon key
- Client initialization pattern: `createClient(url, key)`
- Auth methods: `signUp()`, `signInWithPassword()`, `signInWithOAuth()`

### Styling Integration

- Tailwind configured via Vite plugin, not PostCSS
- CSS variables follow shadcn/ui naming: `--background`, `--foreground`, etc.
- Dark mode supported via `.dark` class and CSS variables

### Form Integration Strategy

- Transitioning from basic HTML forms to React Hook Form
- Adding Zod validation schemas
- Integrating with Supabase auth endpoints
- Toast notifications for user feedback

## Project-Specific Conventions

### File Naming

- Components: PascalCase files, named exports for UI (`Button`), default exports for pages
- Utilities: camelCase files, named exports
- Keep forms co-located: `loginform.tsx`, `signup.tsx`

### Import Organization

1. React imports
2. Third-party libraries
3. Internal UI components (`@/components/ui/`)
4. Internal utilities (`@/lib/`)
5. Local imports

### TypeScript Patterns

- Extend React component props: `React.ComponentProps<"form">`
- Use strict mode with all linting enabled
- Leverage path mapping for clean imports
- Type props with VariantProps for styled components
