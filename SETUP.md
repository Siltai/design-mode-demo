# Setting this repo up with silt-design-mode

What was actually run, in order, on a Mac with Node 25 and a fresh clone.
Design mode is pointed at **beta.silt.app** throughout — that is the only thing
that makes this different from the published quick start.

---

## 1. Install the package

```bash
npm i silt-design-mode
```

The install prints what it wrote, which is easy to miss because npm hides
postinstall output unless you ask for it (`--foreground-scripts`):

```
silt-design-mode: wrote AGENTS.md
silt-design-mode: wrote .claude/skills/silt-design-mode/SKILL.md
silt-design-mode: wrote .claude/skills/silt-setup/SKILL.md
silt-design-mode: wrote .claude/skills/silt/SKILL.md
silt-design-mode: wrote .claude/commands/silt-send.md
```

Those are instructions for your coding agent. They are checked in on purpose —
they are how the agent knows what an annotation is without reading the
package's source.

## 2. Link the project to beta

```bash
npx silt-design-mode-beta setup
```

The `-beta` suffix is the whole difference: same CLI, pointed at
`https://beta.silt.app` instead of production. Beta and production are separate
accounts, so signing in to one does nothing for the other.

It runs four steps and none of them can break the others:

1. writes the agent skills (already done by the install, so it says so)
2. downloads the `silt` binary and links **this project** — it opens a browser
   at `beta.silt.app/link` with a code to approve
3. registers the MCP server so your agent can reach Silt
4. reports whether the build plugin is wired — it only reports, it never writes

The credential is per-project, not per-machine, so the Silt settings list shows
the project name rather than one shared key.

**After this, restart your editor** (or run `/mcp`). A client reads its list of
servers when it starts, so a server registered thirty seconds ago does not
exist in the session that registered it. This is normal and not a failure.

## 3. Wire the build plugin

Step 4 above ended with:

```
source: stamps OFF — vite.config.ts does not load the plugin,
        so annotations carry no file:line
        ↳ npx silt-design-mode wire
```

So:

```bash
npx silt-design-mode wire
```

It shows the diff and asks before touching your config. It added one import and
one plugin:

```diff
+ import designMode from 'silt-design-mode/vite';
  import react from '@vitejs/plugin-react'

  export default defineConfig({
-   plugins: [react()],
+   plugins: [designMode(), react()],
  })
```

**Order matters.** `designMode()` has to come before `react()`. Both run early,
and if React goes first its Fast Refresh preamble is already in the file, so
every line number the stamper records is wrong by about nineteen lines.

### Why this step is not optional

Without it, nothing errors. You just never get a "push to canvas" affordance
and every annotation arrives with no location, so the agent has to search for
your element instead of opening it. The failure is silent, which is exactly why
it is easy to skip.

With it on, every element carries its own address:

```html
<div data-dm-source="src/App.tsx:9:5">
```

## 4. Mount the component

Wiring the config gets you locations. It does not put anything on screen —
design mode is a React component you wrap your app in. In `src/main.tsx`:

```tsx
import { DesignMode, createLocalSink, revertLocalEdit } from 'silt-design-mode'

const app = import.meta.env.DEV ? (
  <DesignMode
    anchor="viewport"
    onRevert={revertLocalEdit}
    onSend={createLocalSink({ repoRoot: __REPO_ROOT__ })}
    repoRoot={__REPO_ROOT__}
  >
    <App />
  </DesignMode>
) : (
  <App />
)
```

Three decisions in there:

- **`anchor="viewport"`.** The default is `parent`, which pins the pill inside
  whatever box you wrapped. On a page taller than the screen that parks it at
  the bottom of the document, invisible unless you scroll to the footer.
- **Dev only.** It is a tool for working on the page, not part of the page, and
  there is nothing for it to talk to in a production build. Guarding it also
  keeps it out of the bundle — the production build came back the same size
  afterwards.
- **`repoRoot`.** A browser cannot work out where the repo lives on disk, and
  design mode needs that to find the service editing *this* tree — more than
  one project can be running at once. Build time is the only place that knows,
  so it comes in through `define` in `vite.config.ts`:

  ```ts
  define: { __REPO_ROOT__: JSON.stringify(process.cwd()) }
  ```

  with `declare const __REPO_ROOT__: string` in `src/vite-env.d.ts` so
  TypeScript is happy.

## 5. Start the service

```bash
npx silt-design-mode start
```

Leave it running; it owns a terminal.

```
silt · silt-demo
project   /Users/…/silt-demo
design    http://127.0.0.1:4747   ready — annotate, and edits land in this folder
edits     fast tier: off (no provider key in env — edits go to your own coding agent)
silt      https://beta.silt.app — this project is reachable from a canvas
```

"fast tier: off" is not a problem. It means small edits go to your own coding
agent instead of a bounded fast model. Setting `ANTHROPIC_API_KEY` (or OpenAI /
xAI / Groq) and restarting turns the fast path on.

## 6. Check it

```bash
npx silt-design-mode doctor
```

```
✓ source   stamps on, wired in vite.config.ts
✓ gate     syntax gate on — no unparseable file is ever written
✓ skill    your coding agent knows this tool
✓ push     can push components as siltai/design-mode-demo
✓ Login:   logged in
✓ Server:  https://beta.silt.app reachable
✓ Scope:   project — silt-demo
```

Run the dev server, and the pill sits in the bottom-right corner.

---

## What has to be true before any of this works

- **A git remote.** Push identifies your project by its `origin`, so a folder
  with no remote has nothing to push under. This repo is
  `github.com/Siltai/design-mode-demo`.
- **Public, or GitHub connected.** A public repo is read without any
  credential. A private one cannot be read at all until you connect GitHub in
  Silt's settings.
- **The wired config committed.** Silt builds your component from a clean clone
  of the repo, not from your laptop. If `vite.config.ts` imports
  `silt-design-mode` but `package.json` in that clone does not list it, the
  build fails on a dependency your machine has and the clone does not. Normal
  `npm i` plus committing the lockfile is all it takes — but a locally packed
  `.tgz` will not survive the trip.

## One thing the tool tells you wrong

Before the repo has been set up on Silt's side, the push row says:

```
Push to canvas
siltai/design-mode-demo needs a one-time setup first — a mirror, a build and
a sandbox warm, usually a few minutes and up to about 20.
↳ npx silt-design-mode setup
```

**That command does not do it.** `setup` writes skills, signs you in and
registers the MCP server; it never touches the repo on Silt's side. Running it
again just prints the same three green ticks and the panel keeps saying the
same thing.

The setup it means happens through your agent. Once the MCP tools are loaded
(after the editor restart in step 2), ask it to register the repo — the tool is
`silt_setup`, and it takes the repo (`siltai/design-mode-demo`) and its git URL.
It returns immediately and the mirror and build run in the background; the push
row flips to "Copy push command" when it is done.

## Then

Point at anything on the page, type what should change, and the edit lands in
this folder. Or push a component to a canvas and it renders there — still
running, still interactive. Hover a card once it is on the canvas: the drawing
answers, which is the short way of showing it is the component and not a
screenshot of it.
