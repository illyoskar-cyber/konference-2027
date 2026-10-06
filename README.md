# Jak se mění svět 2027

Web školní konference ZŠ a LMŠ Hnízdo. Statický web v [Astru](https://astro.build) s obsahem editovatelným přes [TinaCMS](https://tina.io), nasazovaný z GitHubu na Netlify.

## Vývoj

Potřeba je Node.js 24 (viz `.nvmrc`).

```sh
npm install
npm run dev
```

- Web: http://localhost:4321
- Admin (editace obsahu): http://localhost:4321/admin/index.html

`npm run dev` běží proti lokálním souborům a TinaCloud nepotřebuje.

## Build

- `npm run build`: produkční build, stejný jako na Netlify. Potřebuje `PUBLIC_TINA_CLIENT_ID` a `TINA_TOKEN` v `.env` (vzor v `.env.example`).
- `npm run build:local`: build bez TinaCloud, stačí na ověření, že se web sestaví.

## Struktura

| Kde | Co |
|---|---|
| `src/pages/` | Stránky: načtou data z Tiny a vykreslí obsah v `TinaIsland` |
| `src/components/site/` | Obsah stránek (`*Body.astro`), hlavička, patička |
| `src/layouts/SiteLayout.astro` | Layout: `<head>`, hlavička, patička |
| `src/styles/site.css` | Tailwind téma: barvy, fonty, stíny |
| `src/lib/` | Loadery dat, registr islandů, helpery pro odkazy a obrázky |
| `src/content/site/` | Obsah stránek (JSON, edituje se v adminu) |
| `tina/collections/site/` | Schéma obsahu pro Tinu |
| `public/uploads/` | Obrázky ze správce médií |

## Úprava schématu

Po změně v `tina/` spusťte `npm run dev` a commitněte i `tina/tina-lock.json`. Lock přegeneruje jen `tinacms dev` a TinaCloud podle něj zná schéma.

## Nasazení

Netlify buildí podle `netlify.toml`. Commity, které mění jen obsah (`src/content/`, `public/uploads/`), build nespouští. Obsah se zveřejní s dalším nasazením kódu nebo přes build hook v Netlify.
