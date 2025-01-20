# Svelte Starter Kit

A modern Svelte starter template with authentication, database integration, form handling, and UI components built-in.

## Features

- **Authentication** - Email/Password and OAuth2 support using [better-auth](https://www.better-auth.com/)
- **Database** - PostgreSQL with [Drizzle ORM](https://orm.drizzle.team/) for type-safe database operations
- **Forms** - Form handling and validation using [Sveltekit Superforms](https://superforms.rocks/) and [Zod](https://zod.dev/)
- **UI Components** - Styled using [shadcn-svelte](https://next.shadcn-svelte.com/) and [TailwindCSS](https://tailwindcss.com/)
- **Modern Svelte** - Built with Svelte 5
- **Type Safety** - Full TypeScript support
- **Developer Experience** - ESLint, Prettier, and convenient npm scripts

## Prerequisites

- Node.js 18+
- Docker & Docker Compose (for local PostgreSQL database)
- pnpm

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/IcelandicIcecream/svelte-starter.git
cd svelte-starter
```

2. Install dependencies:

```bash
pnpm install
```

3. Set up your environment variables:

```bash
cp .env.example .env
```

4. Start the development database:

```bash
pnpm start-db
```

5. Run database migrations:

```bash
pnpm db:push
```

6. Start the development server:

```bash
pnpm dev
```

## Project Structure

```
.
├── src/
│   ├── lib/
│   │   ├── components/
│   │   │   ├── custom/       # Custom components
│   │   │   └── ui/          # shadcn components
│   │   ├── forms/           # Form components and schemas
│   │   ├── schema/          # Database and validation schemas
│   │   └── server/
│   │       └── db/          # Database configuration and queries
│   └── routes/
│       ├── (protected)/     # Authenticated routes
│       └── (unprotected)/   # Public routes
```

## Database Management

This starter uses Drizzle ORM with PostgreSQL running in Docker. The database setup is defined in `dev/db/`:

```
dev/db/
├── build-db.sql       # Database initialization script
└── db.docker-compose.yml  # Docker Compose configuration
```

### Database Setup Commands

```bash
# Start PostgreSQL container
pnpm start-db

# Reset database (removes all data and recreates container)
pnpm reset-db

# Generate migrations
npx drizzle-kit generate

# Push schema changes
pnpm db:push

# Run Drizzle Studio
pnpm db:studio
```

## Authentication

Authentication is handled by better-auth, supporting:

- Email/Password authentication
- OAuth2 providers (Google)
- Protected routes under `src/routes/(protected)`
- Public routes under `src/routes/(unprotected)`

## Forms

Forms are built using sveltekit-superforms:

1. Create a Zod schema in `lib/forms`
2. Create a form component in `lib/forms`
3. Use the form component with superforms for validation and submission

## UI Components

This starter uses shadcn-svelte components. To add new components:

```bash
npx shadcn-svelte@latest add [component-name]
```

## Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm check` - Type-check the project
- `pnpm lint` - Lint and format code
- `pnpm format` - Format code with Prettier
