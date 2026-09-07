# kettle — a demo page

The smallest honest landing page we could build: a header, a hero, four cards
and a footer. There is no product behind it. It exists so there is something
real to point at with [silt-design-mode](https://www.npmjs.com/package/silt-design-mode),
change, and push onto a Silt canvas.

```bash
npm install
npm run dev
```

## Layout

```
src/
  index.css              tokens — color, space, radius, type
  App.tsx                composes the page
  components/
    SiteHeader.tsx       nav
    Hero.tsx             eyebrow, headline, two buttons
    FeatureGrid.tsx      section wrapper, owns the card data
    FeatureCard.tsx      one card — well, title, description, optional badge
    SiteFooter.tsx
```

Each component keeps its styles in a co-located CSS module, so it renders
correctly on its own — which is the point, since a captured component has no
page around it.

## Notes

Every value comes off a closed scale in `index.css`. Themes are single
`light-dark()` tokens rather than paired blocks. No web font: type character
comes from scale, tracking and weight, so nothing depends on a network fetch
that might not resolve wherever the component ends up rendering.

## Scripts

| Script | Does |
| --- | --- |
| `npm run dev` | Vite dev server |
| `npm run build` | typecheck, then production build |
| `npm run lint` | oxlint |
| `npm run preview` | serve the production build |
