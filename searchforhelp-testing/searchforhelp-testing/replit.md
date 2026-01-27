# Searchforhelp 1.0.0 CB

## Overview

Searchforhelp is a Dutch crisis helpline directory web application that aggregates all helplines in the Netherlands into a single, accessible platform. The application helps users quickly find the right support resources for mental health, abuse, addiction, youth issues, LGBTQ+ support, and other crisis situations. The design prioritizes clarity, accessibility, and trust, following Material Design principles with gov.uk accessibility standards.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack React Query for server state
- **Styling**: Tailwind CSS with shadcn/ui component library
- **Build Tool**: Vite with React plugin
- **Theme**: Light/dark mode support with CSS custom properties

The frontend follows a component-based architecture with:
- Pages in `client/src/pages/` (Home, Categories, CategoryDetail, About, NotFound)
- Reusable components in `client/src/components/`
- UI primitives from shadcn/ui in `client/src/components/ui/`
- Custom hooks in `client/src/hooks/`

### Backend Architecture
- **Runtime**: Node.js with Express
- **Language**: TypeScript with ESM modules
- **API Pattern**: RESTful JSON API with `/api` prefix
- **Development**: Vite middleware for HMR during development
- **Production**: Static file serving from compiled assets

API endpoints:
- `GET /api/categories` - List all helpline categories
- `GET /api/categories/:slug` - Get category by slug
- `GET /api/helplines` - List all helplines
- `GET /api/helplines/featured` - Get featured helplines
- `GET /api/helplines/category/:slug` - Get helplines by category
- `GET /api/helplines/search?q=` - Search helplines

### Data Storage
- **ORM**: Drizzle ORM configured for PostgreSQL
- **Schema**: Defined in `shared/schema.ts` with Zod validation
- **Current Implementation**: In-memory storage with hardcoded Dutch helpline data
- **Database Ready**: Schema includes users table with UUID primary keys

The storage layer uses an interface pattern (`IStorage`) allowing easy swapping between in-memory and database implementations.

### Shared Code
- `shared/schema.ts` contains TypeScript interfaces and Zod schemas for Categories, Helplines, and Users
- Path aliases configured: `@/` for client src, `@shared/` for shared code

## External Dependencies

### Database
- **PostgreSQL**: Required for production (DATABASE_URL environment variable)
- **Drizzle Kit**: Database migrations in `./migrations` directory

### UI Component Libraries
- **Radix UI**: Full suite of accessible primitives (dialog, dropdown, tabs, etc.)
- **shadcn/ui**: Pre-styled component library using Radix primitives
- **Lucide React**: Icon library

### Frontend Libraries
- **TanStack React Query**: Data fetching and caching
- **class-variance-authority**: Component variant styling
- **clsx/tailwind-merge**: Utility class composition
- **wouter**: Client-side routing
- **react-day-picker**: Calendar component
- **embla-carousel-react**: Carousel functionality
- **vaul**: Drawer component
- **cmdk**: Command palette
- **react-hook-form**: Form handling with Zod resolvers

### Backend Libraries
- **express**: HTTP server framework
- **drizzle-orm**: Database ORM
- **drizzle-zod**: Zod schema generation from Drizzle
- **connect-pg-simple**: PostgreSQL session storage (available but not currently used)

### Build Tools
- **Vite**: Frontend bundler with HMR
- **esbuild**: Server bundling for production
- **tsx**: TypeScript execution for development
- **PostCSS/Autoprefixer**: CSS processing