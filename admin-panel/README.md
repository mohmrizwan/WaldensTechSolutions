# Admin Panel — MERN Stack Frontend

A production-structured React admin dashboard: dark theme, glassmorphism, fully wired to a REST API (no dummy data anywhere in the UI layer).

## Stack

- React 18 (Vite)
- Tailwind CSS (dark theme, glass utility classes)
- React Router DOM (protected routes)
- Axios (centralized instance with auth interceptors)
- React Hook Form (every form: services, projects, team, settings, login)
- Lucide React (icons)

## Getting Started

```bash
npm install
cp .env.example .env   # then set VITE_API_BASE_URL to your backend
npm run dev
```

Build for production:

```bash
npm run build
```

## Folder Structure

```
src/
├── layouts/AdminLayout.jsx        Sidebar + Header shell, responsive drawer logic
├── routes/ProtectedRoute.jsx      Auth guard for admin routes
├── pages/                         One file per route (Dashboard, Services, Projects, Team, Contacts, Settings, Login)
├── components/admin/              Shared UI: Sidebar, Header, DataTable, Modal, ConfirmModal,
│   ├── header/                    StatsCard, ServiceCard, Pagination, Loader, EmptyState, Avatar,
│   ├── dashboard/                 StatusBadge, Tabs, PageSearchInput
│   ├── services/ projects/ team/  + per-entity form modals
│   ├── contacts/ settings/        + per-entity view/settings forms
│   └── form/                      Shared FormField wrapper + input style constants
├── api/                           One Axios module per resource (authApi, serviceApi, projectApi,
│                                  teamApi, contactApi, dashboardApi, settingsApi) + axiosInstance.js
├── hooks/                         useAuth (context), useClickOutside, useDebouncedValue
└── utils/constants.js             ROUTES, NAV_ITEMS, PAGE_SIZE, storage keys, API base URL
```

## Backend API Contract

The frontend expects a REST API at `VITE_API_BASE_URL` (default `http://localhost:5000/api`) with these routes:

| Resource   | Endpoints |
|------------|-----------|
| Auth       | `POST /auth/login`, `POST /auth/logout`, `GET /auth/me`, `PUT /auth/profile`, `PUT /auth/password` |
| Dashboard  | `GET /dashboard/stats`, `GET /dashboard/activity` |
| Services   | `GET/POST /services`, `GET/PUT/DELETE /services/:id` |
| Projects   | `GET/POST /projects`, `GET/PUT/DELETE /projects/:id` |
| Team       | `GET/POST /team`, `GET/PUT/DELETE /team/:id` |
| Contacts   | `GET /contacts`, `GET /contacts/:id`, `PATCH /contacts/:id/read`, `DELETE /contacts/:id` |
| Settings   | `GET/PUT /settings/website` |

List endpoints (`services`, `projects`, `team`, `contacts`) accept `page`, `limit`, `search` query params and are expected to return:

```json
{ "data": [...], "total": 0, "page": 1, "totalPages": 1 }
```

Login is expected to return `{ token, user }`; the token is stored and sent as `Authorization: Bearer <token>` on every subsequent request via the Axios interceptor in `api/axiosInstance.js`.

## Notes

- No page contains hardcoded/dummy data — every list, stat, and table is fetched from the API, with real loading, error, and empty states.
- Every list page (Services, Projects, Team, Contacts) shares the same pattern: debounced search → paginated fetch → reusable table/grid → modal-based create/edit → `ConfirmModal` for delete.
- Services uses a card grid (`ServiceCard`); Projects/Team/Contacts use the generic `DataTable`, demonstrating both reusable patterns from the same component library.
