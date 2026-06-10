# FundHope 💙

A crowdfunding platform where anyone can start a campaign, support causes they care about, and track every naira in real time.

Built as a personal full-stack project , no tutorials, no boilerplate. Just figuring things out and shipping.

-----

## What it does

- Create a fundraising campaign in minutes
- Upload a cover image (stored on Cloudinary)
- Browse public campaigns without an account
- Sign in with Google or email and password
- View and manage your own campaigns from a dashboard
- Routes are protected ,unauthenticated users get redirected automatically

-----

## Tech stack

|              |                           |
|--------------|---------------------------|
|**Framework** |Next.js 15 (App Router)    |
|**Language**  |TypeScript                 |
|**Auth**      |Auth.js v5 (next-auth beta)|
|**Database**  |PostgreSQL via Supabase    |
|**ORM**       |Prisma v7                  |
|**Styling**   |Tailwind CSS               |
|**Images**    |Cloudinary                 |
|**Animations**|Framer Motion              |

-----

## Getting started

### 1. Clone the repo

```bash
git clone https://github.com/yourusername/odd-funds.git
cd odd-funds
npm install
```

### 2. Set up your environment variables

Create a `.env` file in the root and add the following:

```env
# Supabase — pooled connection for runtime
DATABASE_URL="postgresql://postgres.xxx:password@aws-0-eu-west-3.pooler.supabase.com:6543/postgres?pgbouncer=true"

# Supabase — direct connection for Prisma CLI
DIRECT_URL="postgresql://postgres.xxx:password@aws-0-eu-west-3.pooler.supabase.com:5432/postgres"

# Auth secret — generate one at https://generate-secret.vercel.app/32
AUTH_SECRET="your-secret-here"

NEXTAUTH_URL="http://localhost:3000"

# Google OAuth — get from console.cloud.google.com
AUTH_GOOGLE_ID="your-google-client-id"
AUTH_GOOGLE_SECRET="your-google-client-secret"

# Cloudinary — get from cloudinary.com dashboard
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"
```

### 3. Push the database schema

```bash
npx prisma db push
npx prisma generate
```

### 4. Run the dev server

```bash
npm run dev
```

Open <http://localhost:3000> and you’re in.

-----

## Project structure

```
src/
├── app/
│   ├── api/
│   │   ├── auth/[...nextauth]/   ← Auth.js handler
│   │   ├── campaign/             ← Campaign CRUD
│   │   ├── register/             ← User signup
│   │   └── upload/               ← Cloudinary upload
│   ├── auth/                     ← Sign in and sign up pages
│   ├── dashboard/                ← Protected user area
│   └── welcome/                  ← Post-login page
├── components/                   ← Reusable UI
├── lib/db.ts                     ← Prisma client
└── middleware.ts                 ← Route protection

auth.ts                           ← Lightweight auth (Edge-safe, used by middleware)
auth.server.ts                    ← Full auth with Prisma (used by API routes)
prisma/schema.prisma              ← Database schema
prisma.config.ts                  ← Prisma v7 datasource config
```

-----

## A note on the auth setup

This project uses Auth.js v5 with both Google OAuth and email/password (Credentials). There are two auth files intentionally:

- **`auth.ts`** — no Prisma, safe to import in middleware (Edge Runtime)
- **`auth.server.ts`** — full Prisma adapter, used in API routes and server components

This split exists because Next.js middleware runs on the Edge Runtime which does not support Node.js APIs, and Prisma requires Node.js. Import from the wrong file and you’ll get a `PrismaClientInitializationError` at startup.

Also worth noting: Prisma v7 no longer supports the `url` field in `schema.prisma`. The connection URL now lives in `prisma.config.ts`. If you’re following tutorials written before mid-2024, this will catch you out.

-----

## Environment variable notes

Supabase gives you two connection strings and they serve different purposes:

- **Port 6543** (pooled via PgBouncer) → use for `DATABASE_URL`, your running app
- **Port 5432** (direct) → use for `DIRECT_URL`, Prisma CLI commands like `db push`

Using the pooled connection for `db push` will fail with `prepared statement s1 already exists`. Always use the direct URL for CLI operations.

-----

## What’s coming

- [ ] Donation flow with Paystack
- [ ] Email notifications on campaign milestones
- [ ] Open Graph metadata for social sharing
- [ ] Campaign search and filter
- [ ] Admin moderation dashboard

-----

## Built by

**Winnie** — Frontend Developer based in Abuja, Nigeria.

Currently  into full-stack development and Data analytics . This project was built to learn, break things, fix them, and understand how a real production auth system actually works.

-----

> The bugs I hit building this — Prisma v7 breaking changes, the JWTSessionError with custom encode/decode, Prisma in Edge Runtime, Google OAuth not returning user IDs etc. are all documented in the case study file if you hit the same walls.