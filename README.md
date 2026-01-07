# User Dashboard — React + Vite

Professional frontend demo application built with React and Vite showcasing
real-world frontend skills: data fetching, client-side pagination, searching,
mocked authentication, form validation, and state management with Redux Toolkit.

This repository implements the task requirements described in the project
brief: it fetches 50 users from the Random User API, presents a searchable,
paginated dashboard, displays detailed user information in a modal, and
provides a mocked login and editable profile for the logged-in user.

---

**Live / Preview**
- Development server: run `npm install` then `npm run dev`.
- Deployed app: https://quantum-hr-task-vercel-v6ny.vercel.app/

---

## Project Highlights
- Tech stack: React, TypeScript , Vite, Redux Toolkit,
  Material-UI, Axios.
- Mocked authentication (frontend only) with persisted token.
- Fetch users from Random User API once and implement client-side pagination
  and case-insensitive search.
- Accessible modal for user details with full address and profile picture.
- Profile editor for the logged-in user with form validation and simulated
  save (mock request) including loading and success/error feedback.
- Graceful loading and error handling across API calls and user flows.

---

## Functional Mapping to Requirements
- Mock Authentication: login page with email/password inputs and validation.
  - Valid credentials (only): `q@quantum.io` / `qTask123#` — returns a mocked
    token pair `{ "access": "fake-token", "refresh": "fake-refresh" }`.
  - Loading and error UI states handled; token persisted to `localStorage` and
    Redux.
- User List Dashboard: shows full name, email, and location (city, country).
- Client-side pagination: 10 users per page with pagination controls.
- Search/filter: case-insensitive name search integrated with pagination.
- User details modal: shows name, email, phone, full address, and profile
  picture; modal is dismissible and accessible.
- Edit own profile: profile page with fields (name, phone, job title, years of
  experience, address, working hours), validation, and a mocked save flow.
- State management: Redux Toolkit stores auth state, users data, search and
  pagination state, and profile edits.

---

## Setup & Run
Prerequisites
- Node.js 18+ recommended

Install and run
```bash
npm install
npm run dev
```

Build
```bash
npm run build
```

Run preview (after build)
```bash
npm run preview
```

Scripts are defined in `package.json` (dev, build, preview, lint, test if present).

---

## How to Use
- Start the app and open the login page.
- Use credentials: email `q@quantum.io` and password `qTask123#` to sign in.
- After login you'll be redirected to the dashboard where users are shown.
- Use the search input to filter users by name (search is case-insensitive).
- Use pagination controls to navigate pages (10 users per page).
- Click the details button on a user row to open the modal with full details.
- Visit the Profile page to edit your own mocked profile; save is simulated and
  user feedback is provided.

---

## Key Files (quick reviewer guide)
- `src/pages/login-page.tsx` — Login screen and validation.
- `src/pages/home-page.tsx` — Dashboard with search, pagination, and refresh.
- `src/components/shared/user-table.tsx` — Table UI for listing users.
- `src/components/shared/modal-app.tsx` — Reusable modal used for user details.
- `src/services/user-service.ts` — Axios wrapper and Random User API fetch.
- `src/store/slices/auth-slice.ts` — Auth state, mocked login and persistence.
- `src/store/slices/users-slice.ts` — Users data fetch, search, and pagination.
- `src/slices/user-profile-slice.ts` or `src/store/slices/user-profile-slice.ts` — Profile edit flows.

Open these files to inspect the implementation details and see how each
requirement is satisfied.

---

## Implementation Notes & Decisions
- The app fetches `https://randomuser.me/api/?results=50` once on initial
  dashboard load and stores the list in Redux. Pagination and searching are
  computed client-side to avoid repeated API calls.
- Authentication is fully mocked on the frontend per requirements; no backend
  calls are made for login or profile saves (save operations are simulated
  with a short timeout to show loading feedback).
- Tokens are persisted to `localStorage` to survive refresh; Redux holds the
  ephemeral auth state.
- Material-UI (MUI) is used for a professional, responsive UI and accessible
  components.

---

## Error Handling & UX
- API calls use Axios with explicit loading and error states.
- The dashboard displays a retry/refresh control if the initial fetch fails.
- Forms show inline validation errors and disable submission while saving.

---

## Bonus Features Implemented
- TypeScript support (project created from Vite template).
- Persisted authentication state in `localStorage`.
- Refresh users button on the dashboard.

If you want any of these expanded into tests or CI integration, I can add
Jest + React Testing Library tests and a simple GitHub Actions workflow.

---

## Assumptions
- No backend will be used — auth and profile saves are mocked on the client.
- The single call to Random User API returns the 50 users used for pagination.

---

Thank you — open an issue or request if you'd like me to update the README
further or add tests and CI.
