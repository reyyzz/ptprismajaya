# PT Prisma Cahaya Lestari Website (SSR)

This project now uses React + Vite with Server-Side Rendering (SSR) via an Express server.

## Run Locally

```bash
npm install
npm run dev
```

Open `http://localhost:5173`.

## Build Production

```bash
npm run build
npm run preview
```

## Scripts

- `npm run dev`: run SSR server in development mode
- `npm run build`: build client and server bundles
- `npm run preview`: run SSR server from production build
- `npm run lint`: run ESLint

## SEO Files

- `public/robots.txt`
- `public/sitemap.xml`
- `scripts/generate-sitemap.mjs`

Regenerate sitemap:

```bash
npm run sitemap
```

If your domain is not `https://prismacahayalestari.com`, update both files.

## Deployment Notes

This app requires a Node.js runtime for SSR.

- Suitable: Vercel, Render, Railway, VPS, or any Node hosting.
- Not suitable for SSR: GitHub Pages (static hosting only).

## Google Search Console Checklist

1. Deploy site to your production domain.
2. Add and verify the domain in Google Search Console.
3. Submit sitemap URL: `https://your-domain.com/sitemap.xml`.
4. Use URL Inspection for `/`, `/profile/about-us`, `/profile/service`, `/gallery`, `/contacts`.
