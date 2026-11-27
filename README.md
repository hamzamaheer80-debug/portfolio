# Hamza Akbar — Portfolio

React + Vite + Tailwind CSS. Node.js 20.19 or newer is required.

## Run locally

```bash
npm install
npm run dev        # development  → http://localhost:4001
```

To test speed (Lighthouse), always use the production build:

```bash
npm run build
npm run preview    # production   → http://localhost:4001
```

Both servers only listen on `localhost`, so they are not reachable from other devices on your network.

## Deploy

The site is fully static. The build output is the `dist` folder.

**Netlify** — import the repo (settings come from `netlify.toml`), or drag the `dist` folder onto app.netlify.com/drop.
**Vercel** — import the repo; `vercel.json` sets the build and headers.
**Cloudflare Pages** — build command `npm run build`, output directory `dist`.

Security headers (Content-Security-Policy, HSTS, X-Frame-Options, nosniff, Referrer-Policy, Permissions-Policy) and caching rules are in `public/_headers` (Netlify / Cloudflare) and `vercel.json` (Vercel).

After you have a domain, change `og:image` in `index.html` to the full URL (e.g. `https://your-domain.com/icon-512.png`) so link previews show the icon.
