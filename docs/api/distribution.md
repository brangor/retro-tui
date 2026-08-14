# Distribution

`retro-tui` ships two builds. They contain the same components — the only
difference is whether Lit travels inside the file.

| Build | Import | Lit | For |
|-------|--------|-----|-----|
| `dist/retro-tui.js` | `retro-tui` | external | Projects with a bundler |
| `dist/retro-tui.cdn.js` | `retro-tui/cdn` | bundled | A plain HTML file, no tooling |

## With a bundler

```bash
npm install retro-tui
```

```js
import 'retro-tui';
import 'retro-tui/tokens.css';
```

Lit stays external so your page has exactly one Lit module instance. This
matters if you compose `sharedStyles` into your own Lit components, or subclass
a retro-tui component — objects made by one Lit instance are not recognised by
another.

## Without a bundler

```html
<script type="module" src="https://cdn.jsdelivr.net/npm/retro-tui/dist/retro-tui.cdn.js"></script>

<tui-tiled preset="console">
  <div slot="main">…</div>
  <tui-output slot="footer"></tui-output>
</tui-tiled>
```

One request, ~35 kB gzipped, no import map. Design tokens are injected by the
library on load, so there is no stylesheet to link. Themes are still a class on
`<body>`, e.g. `class="theme-vibrant-scifi"`.

Don't use this build alongside your own Lit — you'd load Lit twice.

## Types

TypeScript declarations ship at `dist/types/` and resolve automatically.
