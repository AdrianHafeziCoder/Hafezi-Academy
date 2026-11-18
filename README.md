# Hafezi Academy Admin Panel

## Run

1. Open this folder in VS Code (`File > Open Folder`).
2. In the terminal of this same folder (the one that has `package.json`):

```
npm install
npm run dev
```

3. Open the displayed address (e.g. `http://localhost:5173`). It automatically goes to `/admin/login`.

## Folder structure (inside src)

- Fonts: Playfair Display (headings) and Poppins (body), loaded from Google Fonts in `index.html`
- `components/ui` reusable components (button, table, form, modal...)
- `config` settings and the sidebar menu
- `hooks` hooks (search, GSAP animation, dark theme...)
- `layouts` overall panel layout (menu and top bar)
- `lib` helper functions
- `pages` pages (one folder per section)
- `routes` routes
- `services` API communication

## Changing the API URL

Rename the `.env.example` file to `.env` and change the value of `VITE_ADMIN_API_URL`.

## Connecting the Sepehr Academy APIs

The list of 241 routes extracted from the documentation is in `src/services/academyApi.js`. The calling guide, server URL setup and Schema limitations are in the `API_INTEGRATION.md` file. The final server URL must be set in `VITE_ADMIN_API_URL`.
You can change tha APIs
