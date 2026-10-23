# WordWell frontend

WordWell is a React + Vite starter for a vocabulary-learning app. The UI uses JavaScript/JSX and Chakra UI v3. Authentication is already wired so the learning features can be built separately.

## Run locally

```bash
npm install
npm run dev
```

Vite prints the local URL, normally `http://localhost:5173`. The app uses `HashRouter`, so routes look like `http://localhost:5173/#/practice`.

Create a production build with:

```bash
npm run build
```

## Current routes

- `/` — public home page
- `/login` — direct login and OAuth/PKCE login entry
- `/register` and `/signup` — registration
- `/callback` — OAuth authorization-code callback
- `/onboarding` — protected home page
- `/practice` — protected server-generated vocabulary quiz
- `/leaderboard` — protected XP leaderboard showing each learner's email
- `/pet` — protected feeding page
- `/dashboard` — protected compatibility redirect to `/onboarding`

## Authentication

Login validates the session against the backend before granting access. Tokens
refresh automatically near expiry, and protected requests retry once after a 401. Concurrent callers share one refresh request. XP and coins update in the
navbar after practice and feeding.

Browser OAuth clients use S256 PKCE and validate callback state. Configure the
backend application as a public client with no client secret. The browser does
not send a client secret.

For a HashRouter callback, register a redirect URI shaped like `http://localhost:5173/#/callback` with the backend/client configuration.

Set `VITE_API_BASE_URL` to override the backend origin, for example
`http://localhost:3000`. Otherwise localhost uses the local backend and hosted
pages use the existing Render backend. Restart Vite after changing environment
variables.

## Checks

```bash
npm test
npm run lint
npm run build
```

Tests cover session initialization, concurrent refreshes, logout races, protected
request retries, and OAuth state and duplicate exchanges. Backend database
integration tests are run separately in `WW_Backend`.
