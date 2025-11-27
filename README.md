# Simple KYC

Lightweight KYC (Know Your Customer) demo app built with React + TypeScript + Vite.  
Implements auth, a multi-step KYC form with validation and file uploads, a local JSON server (mock API), and Supabase storage integration.

---

## Folder structures:

```
simple-kyc/
├─ .env                     # env vars (VITE_API_URL, VITE_JSON_SERVER_URL, Supabase keys)
├─ package.json             # scripts, deps
├─ tsconfig.json
├─ vite.config.ts
├─ README.md
├─ db.json                  # json-server mock DB
├─ public/                  # static assets served by Vite
└─ src/
   ├─ main.tsx              # app entry (mount react)
   ├─ App.tsx               # top-level routes/layout
   ├─ index.css / styles/   # global styles
   ├─ assets/               # images/icons/fonts
   ├─ app/
   │  ├─ store.ts           # redux store configuration
   │  └─ hooks.ts           # typed hooks (useAppDispatch/useAppSelector)
   ├─ features/             # redux slices + feature logic
   │  ├─ auth/
   │  │  └─ authSlice.ts    # login/register state & thunks
   │  └─ user/
   │     └─ userSlice.ts    # profile updates
   ├─ pages/                # route-level page components
   │  ├─ Login.tsx
   │  ├─ Register.tsx
   │  ├─ Kyc.tsx            # multi-step KYC form
   │  ├─ Profile.tsx
   │  └─ Submissions.tsx    # admin view for json-server records
   ├─ components/           # reusable UI pieces (forms, buttons, inputs)
   ├─ services/             # API & third-party integrations
   │  ├─ axiosClient.ts     # axios instances (base + json-server)
   │  ├─ kycService.ts      # kyc submission endpoints
   │  └─ supabaseClient.ts  # supabase init + upload helpers
   ├─ schemas/              # zod schemas / validation logic
   │  ├─ kyc/               # per-step schemas
   │  └─ auth.ts
   ├─ utils/                # small helpers and formatters
   └─ types/                # shared TypeScript types/interfaces
```

---

## Key features

- Multi-step KYC form with client-side validation (Zod + react-hook-form).
- Document uploads to Supabase.
- Auth + profile flows using Redux Toolkit.
- Local mock API using json-server for development and testing.
- Example data stored in `db.json`.

---

## Quick start

Prerequisites:

- Node.js 18+
- npm

Install dependencies:

```bash
npm install
```

Start development:

- Run Vite dev server:

```bash
npm run dev
```

- Run mock JSON API (in a separate terminal):

```bash
npm run server
```

Build and preview:

```bash
npm run build
npm run preview
```

Lint:

```bash
npm run lint
```

---

## Environment variables

Ensure `.env` contains:

- VITE_API_URL — external API base (optional)
- VITE_JSON_SERVER_URL — json-server URL (default: http://localhost:3001)
- VITE_SUPABASE_URL — Supabase project URL
- VITE_SUPABASE_ANON_KEY — Supabase anon key

See `.env.example` for example values.

---

## Important files / folders

- App entry: `src/main.tsx`, `src/App.tsx`
- Pages: `src/pages/*` (Kyc, Login, Register, Profile, Submissions)
- Services: `src/services/*` (axios client, kycService, supabase client)
- Validation schemas: `src/schemas/*`
- Redux: `src/app/store.ts`, `src/features/*`

---

## Notes for contributors

- KYC form validation and shape live under `src/schemas/kyc`.
- KYC submissions are sent to the local json-server and stored in `db.json`.
- To test file uploads, configure Supabase credentials in `.env`.
- Suggested additions: CONTRIBUTING.md, CODE_OF_CONDUCT, CI badges.
