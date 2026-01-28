This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Group Comms (Contacts, Groups, SMS)

This project includes a basic group messaging system for broadcasting SMS to clients and team members.

Features:
- Manage contacts (add/delete) in Settings
- Create groups and manage members in Comms
- Send group texts to selected contacts and/or groups in Comms

APIs:
- GET/POST /api/contacts, PATCH/DELETE /api/contacts/:id
- GET/POST /api/groups, PATCH/DELETE /api/groups/:id
- GET/POST/DELETE /api/groups/:id/members
- POST /api/comms/send with { message, contactIds: string[], groupIds: string[] }

Required Tables (Supabase SQL):

```
-- Contacts
create table if not exists public.contacts (
	id uuid primary key default gen_random_uuid(),
	name text not null,
	phone text not null,
	email text,
	created_at timestamptz not null default now()
);

-- Groups
create table if not exists public.contact_groups (
	id uuid primary key default gen_random_uuid(),
	name text not null,
	description text,
	created_at timestamptz not null default now()
);

-- Group members
create table if not exists public.contact_group_members (
	group_id uuid not null references public.contact_groups(id) on delete cascade,
	contact_id uuid not null references public.contacts(id) on delete cascade,
	primary key (group_id, contact_id)
);
```

Environment:
- Twilio: TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_FROM

Notes:
- Phone numbers are normalized to E.164 with a default +44 prefix fallback when possible.
- The send endpoint deduplicates recipients across selected contacts and groups.
