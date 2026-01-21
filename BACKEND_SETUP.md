# Backend Setup Guide

This guide explains how to setup and run the backend infrastructure for the Finance Dashboard.

## Architecture Overview

The backend consists of two main packages:

1. **`packages/database`** - Database schemas, migrations, and client using Drizzle ORM + Supabase
2. **`apps/api`** - Hono REST API server with Better Auth and Service/Controller pattern

## Prerequisites

- Node.js 18+ 
- pnpm 9+
- Supabase account and project
- PostgreSQL database (via Supabase)

## Initial Setup

### 1. Install Dependencies

From the root of the monorepo:

```bash
pnpm install
```

### 2. Setup Supabase Project

1. Create a new project at [supabase.com](https://supabase.com)
2. Get your project credentials:
   - Project URL: `https://xxxxx.supabase.co`
   - Anon/Public Key: Found in Settings → API
   - Database Connection String: Found in Settings → Database

### 3. Configure Environment Variables

#### Database Package

Create `packages/database/.env`:

```bash
# Copy from .env.example
cp packages/database/.env.example packages/database/.env
```

Update with your Supabase credentials:

```env
DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@[HOST]:[PORT]/postgres
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_ANON_KEY=your-anon-key-here
```

#### API Package

Create `apps/api/.env`:

```bash
# Copy from .env.example
cp apps/api/.env.example apps/api/.env
```

Update with your configuration:

```env
NODE_ENV=development
PORT=3001

# Same database credentials as above
DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@[HOST]:[PORT]/postgres
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_ANON_KEY=your-anon-key-here

# Generate a random secret (min 32 characters)
BETTER_AUTH_SECRET=your-secret-key-min-32-chars-long
BETTER_AUTH_URL=http://localhost:3001

# Frontend URL for CORS
FRONTEND_URL=http://localhost:3000
```

### 4. Generate and Apply Database Migrations

```bash
cd packages/database

# Generate migrations from schema
pnpm db:generate

# Push schema to database
pnpm db:push

# Seed database with initial data
pnpm db:seed
```

### 5. Start Development Servers

From the root:

```bash
# Start all dev servers (web + api)
pnpm dev
```

Or individually:

```bash
# Start API only
cd apps/api
pnpm dev

# Start Web only (in another terminal)
cd apps/web
pnpm dev
```

## API Endpoints

The API server runs on `http://localhost:3001`

### Authentication

- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user

### Transactions (Requires Auth)

- `GET /api/transactions` - List transactions with filters
- `GET /api/transactions/:id` - Get single transaction
- `POST /api/transactions` - Create transaction
- `PUT /api/transactions/:id` - Update transaction
- `DELETE /api/transactions/:id` - Delete transaction

### Categories

- `GET /api/categories` - List categories (public)
- `GET /api/categories/:id` - Get single category (public)
- `POST /api/categories` - Create category (admin only)
- `PUT /api/categories/:id` - Update category (admin only)
- `DELETE /api/categories/:id` - Delete category (admin only)

### Dashboard (Requires Auth)

- `GET /api/dashboard/stats` - Get statistics
- `GET /api/dashboard/chart-data` - Get chart data

## Database Schema

### Users Table

```sql
- id (text, PK)
- email (text, unique)
- emailVerified (boolean)
- name (text)
- image (text, nullable)
- role (enum: 'admin' | 'user')
- createdAt (timestamp)
- updatedAt (timestamp)
```

### Sessions Table

- Better Auth session management

### Transactions Table

```sql
- id (text, PK)
- userId (text, FK → users)
- type (enum: 'income' | 'expense')
- amount (numeric)
- category (text)
- description (text)
- date (date)
- icon (text, nullable)
- createdAt (timestamp)
- updatedAt (timestamp)

Indexes: userId, date, type, (userId, date)
```

### Categories Table

```sql
- id (text, PK)
- name (text)
- nameId (text) -- Indonesian translation
- type (enum: 'income' | 'expense')
- icon (text, nullable)
- color (text, nullable)
- createdAt (timestamp)
- updatedAt (timestamp)

Unique constraint: (name, type)
```

## Development Workflow

### Making Schema Changes

1. Edit schema files in `packages/database/src/schema/`
2. Generate migration: `cd packages/database && pnpm db:generate`
3. Review the generated SQL in `drizzle/` directory
4. Apply migration: `pnpm db:push`

### Adding New API Endpoints

1. Create service in `apps/api/src/services/`
2. Create route handler in `apps/api/src/routes/`
3. Mount route in `apps/api/src/index.ts`
4. Update types in `packages/types/index.ts`

### Type Safety Flow

```
Database Schema (Drizzle)
    ↓ (type inference)
packages/database (exports types)
    ↓ (imports)
packages/types (re-exports + API types)
    ↓ (imports)
apps/api (uses types for validation)
    ↓ (API contract)
apps/web (consumes typed API)
```

## Testing

### Test API with curl

```bash
# Signup
curl -X POST http://localhost:3001/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123","name":"Test User","role":"user"}'

# Login
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# Get transactions (replace TOKEN)
curl http://localhost:3001/api/transactions \
  -H "Authorization: Bearer TOKEN"
```

### Using Drizzle Studio

Drizzle Studio provides a GUI for browsing your database:

```bash
cd packages/database
pnpm db:studio
```

Opens at `https://local.drizzle.studio`

## Troubleshooting

### Database Connection Issues

- Verify DATABASE_URL format is correct
- Check Supabase project is running
- Ensure IP is whitelisted in Supabase (or disable IP restrictions for development)

### Better Auth Issues

- Ensure BETTER_AUTH_SECRET is at least 32 characters
- Verify session and user tables exist in database
- Check BETTER_AUTH_URL matches your API URL

### Type Errors in API

- Run `pnpm install` in root to link workspace packages
- Verify `@dashboard/database` and `@dashboard/types` are built
- Run `pnpm type-check` to see detailed errors

## Next Steps

- Integrate API with frontend (`apps/web`)
- Add tests for API endpoints
- Setup CI/CD pipeline
- Add API documentation (OpenAPI/Swagger)
- Implement real-time features with Supabase subscriptions
