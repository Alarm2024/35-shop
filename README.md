# 35 — Dubai jewelry store (static)

Premium static storefront for brand **35**. Quiet luxury jewelry: gemstones, 925 sterling, and branded accessories. Cash on delivery only. English UI.

> **Brand name is 35 only.** The hostname `dubai.elghaly.dev` is a deploy/DNS target — not the brand name. Do not put that hostname string into customer-facing copy as if it were the brand.

## Preview locally

```bash
cd /workspace/35-store
# Option A — Python
python3 -m http.server 8080
# Option B — Node (if installed)
npx --yes serve -l 8080 .
```

Open [http://localhost:8080](http://localhost:8080).

Or open `index.html` directly in a browser (WhatsApp / social links still work; Unsplash images need network).

## Files

| File | Role |
|------|------|
| `index.html` | Structure, meta, hero, shop, policies, footer |
| `styles.css` | Luxury editorial styles (ivory / black / soft gold) |
| `script.js` | Section filters, product cards, WhatsApp/IG/TikTok order links |
| `products.js` | Placeholder catalog (9 EXAMPLE products + AED prices) |

## Commerce rules (shown on site)

- **Cash on delivery (COD)** — primary payment; no Visa/card checkout
- **Free delivery** on orders over **250 AED**
- **Refunds allowed** — short policy accordion
- WhatsApp order buttons use `wa.me` in `href` only — **phone number is never shown** on the page

## Social (placeholders)

- Instagram: [instagram.com/35.dubai](https://www.instagram.com/35.dubai/) · handle `@35.dubai`
- TikTok: [tiktok.com/@35.dubai](https://www.tiktok.com/@35.dubai) · handle `@35.dubai`
- WhatsApp order: `wa.me` link with prefilled message (number not displayed)

Handles are **placeholders** until Wyndham creates the accounts.

## Deploy

### GitHub Pages

1. Push this folder to a repo (e.g. `35-store`).
2. Settings → Pages → Deploy from branch → `/` (root) or `/docs` if you nest files.
3. Custom domain: add `dubai.elghaly.dev` in Pages settings and create the DNS records your host asks for (usually CNAME → `username.github.io`).

### Cloudflare Pages

1. Connect the repo (or upload the folder).
2. Build command: none (static). Output directory: `/` (or the folder that contains `index.html`).
3. Custom domain: attach `dubai.elghaly.dev` and follow Cloudflare DNS.

Remember: domain host may be `dubai.elghaly.dev`; **brand display name stays 35**.

## TODO

- [ ] Create Instagram & TikTok accounts `@35.dubai`
- [ ] Replace placeholder Unsplash images with real product photos
- [ ] Replace EXAMPLE AED prices with live prices
- [ ] Optional: UAE virtual WhatsApp number later (update `wa.me` href only — still never show the number on the page)
- [ ] Confirm delivery fee under 250 AED and refund window wording with the owner

## Success checks

```bash
# Must print nothing (no brand leak of the DNS hostname into site assets):
grep -ri elghaly index.html styles.css script.js products.js || true
```

Site should look premium, three filter sections work, WhatsApp links open with a prefilled order message, and no phone number appears in visible copy.
