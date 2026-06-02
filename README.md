# JK Art & Design Projects — Deployment Package

A static, single-page site. Plain HTML + React (loaded from CDN) + Babel-in-the-browser JSX. **No build step required** — drop the contents of this folder onto any static host and you're live.

## What changed in this version

**All 224 artist / work / exhibition images are now hosted locally** in `assets/img/scraped/` as WebP at quality 82. The site no longer depends on `collectiveartdesign.com` for photos — when that domain eventually goes away, the gallery still works.

Only remaining external dependencies: 7 press article **PDFs** still link to `collectiveartdesign.com/wp-content/uploads/2017/08/*.pdf`. These open in a new tab when a user clicks a press row. We can localize those next if you want; for now they still resolve fine.

## What's inside

| File / folder | Purpose |
| --- | --- |
| `index.html` | Page shell — mounts the React app, loads fonts, contains all CSS. |
| `components.jsx` | Shared components (Nav, Footer, Img, Lightbox, logo). |
| `pages.jsx` | Page components. |
| `data.standalone.js` | Site content — every artist/work/exhibition entry now points at a local file. |
| `assets/fonts/` | Self-hosted Gloock / Inter Tight / JetBrains Mono (16 woff2 files). |
| `assets/img/` | Site-chrome images (logo, footer building, hero photo, Jean Gillon hero, visit building line, founders portrait). |
| `assets/img/scraped/` | **224 WebP images** — artist portraits, work photos, exhibition heroes. Average 70%+ smaller than the JPEG originals. |
| `assets/favicon/` | Multi-size favicons. |

## Hosting on Cloudflare Pages

You're already set up. Just push this folder's contents to your `criercomm/jkcollective` repo and Pages will redeploy automatically. Cloudflare's edge CDN serves the WebP files globally — no separate image host needed.

## Once `jkprojects.info` is Active in Cloudflare

1. Workers & Pages → `jk-projects` → **Domains** → **Add Domain** → pick `jkprojects.info`.
2. Repeat for `www.jkprojects.info`.
3. SSL provisions automatically within a minute.

## Hard refresh after deploying

Cmd/Ctrl + Shift + R after the new build goes live, otherwise your browser may serve the cached `pages.jsx` and `data.standalone.js` from before. Images are new filenames so they won't conflict.
