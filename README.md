# Kettle — landing page

A small React + TypeScript landing page, built with Vite.

```bash
npm install
npm run dev
```

## Layout

```
src/
  components/
    SiteHeader.tsx    nav bar
    Hero.tsx          headline, subtitle, call to action
    FeatureGrid.tsx   section wrapper, renders the feature list
    FeatureCard.tsx   one feature — icon, title, description, optional badge
    SiteFooter.tsx    copyright and secondary links
  App.tsx             composes the page
```

Each component keeps its styles in a co-located CSS module, so it renders
correctly on its own without the page around it.

## Scripts

| Script | Does |
| --- | --- |
| `npm run dev` | Vite dev server |
| `npm run build` | typecheck, then production build |
| `npm run lint` | oxlint |
| `npm run preview` | serve the production build |
