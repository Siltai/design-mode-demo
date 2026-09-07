---
name: silt-setup
description: Set up or run silt-design-mode in a repo. `npx silt-design-mode setup` does first-time setup (agent skills, link the machine, register the MCP server); `npx silt-design-mode start` runs the service. Use when asked to set up, install, start, run, connect or log in to silt-design-mode or Silt, or when the design-mode pill is not appearing in the browser.
---

# silt-design-mode — setup and running

Someone points at an element in their running UI, says what should change, and an
agent makes the change. This document is how you get it RUNNING. Applying a batch
of annotations is a different job with its own document: the `silt-design-mode`
skill.

## Two commands. Pick by what was asked.

    npx silt-design-mode setup     FIRST TIME in this repo: writes the agent skills, links the
                      machine, registers the MCP server. Every step is skipped if
                      already done, so it is safe to run whatever state you are in.

    npx silt-design-mode start     RUNS THE SERVICE. Runs until stopped — background it.

- *"set it up" / "install it" / "connect it"* → `setup`, then `start`.
- *"run it" / "start it" / "the pill isn't showing"* → `start`.
- Not sure? `setup` is safe and cheap; it tells you to run `start` when it's done.

## YOU run these, not the user

If you can run `npx`, you can do the whole thing and report what happened. Nobody
should be told to open a terminal and paste commands.

`start` runs until stopped. **Launch it in the background.** In the foreground you
sit there until your tool call times out, and the process dies with the shell — so
the user is told it started when nothing is running. Then confirm it actually came
up, and report *that*, not "I started it":

    for p in $(seq 4747 4762); do curl -s -m 1 localhost:$p/health; done

If you have no way to background a process, say plainly that the command has to
stay running and give the user the one line. Do not run it in the foreground and
hope.

## What `setup` does, and deliberately does not

It runs three independent, idempotent steps: writes the agent skills, links **this
project** (skipped when it already has its own key), and registers the MCP server
for this project. It reports each one.

The first step also maintains a short block in `AGENTS.md`, between
`<!-- BEGIN:silt-design-mode -->` and `<!-- END:silt-design-mode -->`. Only that
region belongs to the tool; anything outside the markers is left alone on every
upgrade, and `--force` does not reach it — the rest of that file is the user's.

If it reports `AGENTS.md` as not updated, read the file before touching anything.
Four things produce that, and they need different answers:

- the markers are duplicated, orphaned or out of order — repair or delete them
- one clean pair, but the text between it was not written by the installer — the
  markers were hand-typed, so move that text outside them and delete the pair
- the file could not be read, or could not be written — a permission or a full
  disk, not a marker problem

Nothing was changed in any of these cases. Do not hand-edit the block to "fix" it
and do not delete the file to force a clean write without asking first: only the
user knows which bytes in there are theirs.

- **It does not start the service.** That runs until stopped, so it is separate.
- **It does not wire the build plugin**, and nothing else will either — `npx
  silt-design-mode wire` is its own command because it edits a config file the user
  owns and shows the diff first. Until it runs there are no `file:line` stamps, which
  is the difference between opening the right line and searching for it. `doctor`
  says whether it is on; the last section of this file has the detail.
- **It does not re-login needlessly.** Re-running login mints a second key and
  leaves the old one live. It checks first — and so should you, if you ever run the
  steps by hand.
- If the MCP step says it needs a newer daemon, that is expected and self-healing.
  See "Reading Silt" below. Everything else still completed.

## What `start` brings up

One service, per project, as ONE object:

- the **listener**, which applies edits to this project's source. No account, no
  API key. Without a provider key it runs the user's own coding agent per edit
  (slower, self-authenticating); with one, a single fast round-trip.
- the **Silt agent**, only if the machine is linked, scoped to this project — this
  is what makes the project reachable from a canvas.

**Not linked is not a failure.** `start` says so in one line and runs anyway.
Design mode is the product; Silt is additive. Never tell someone they must log in
to use it.

It prints one status block naming the project, URL, edit tier and Silt half. Read
that block back rather than paraphrasing it.

## The project is a folder, and not always cwd

The project is the nearest folder up from you whose `package.json` **declares**
`silt-design-mode` — not the `node_modules` location (workspaces and pnpm hoist,
so those differ) and not the git root (a monorepo is one repo, many projects).
`start` moves into that folder itself, so running it from a subdirectory is fine.

That folder is the ONLY tree the service edits; it refuses batches from any other.

## The port is discovered, never assumed

`start` binds the first free port in **4747–4762**, so several projects run at
once. `--port` / `DM_PORT` pins one. The browser sweeps the same range and picks
the listener whose folder contains the page's own. **Never hardcode 4747.**

`/health` answers `{"ok":true,"listening":true,"root":"<abs path>","tiers":{…}}`.
`root` is the folder that service serves — it is how you tell "a service is
running" from "a service is running for something else". `tiers` reports which
provider keys the listener holds and which local agent it found; it does not say
which tier an edit will take, because that also depends on the model chosen in the
browser (`TierFacts` in `src/loop/service.ts`).

## Four failures that look alike

"It doesn't work" covers four situations with four different fixes. Tell them
apart before acting; the wrong fix wastes time and can mint a second credential.

1. **Not started.** Nothing answers on 4747–4762. The browser says *No Silt
   service in `<folder>`. Start it: `npx silt-design-mode start` (leave it running)* — do
   exactly that, in that folder.
2. **Started in the wrong folder.** Something answers, but its `root` is not an
   ancestor of the page's project. The browser names the folder it does serve.
   Do NOT start a second one in the same wrong place — start one in the right
   folder (they coexist happily on different ports).
3. **Not linked.** Design mode works; the canvas can't reach this machine. `start`
   says *Silt is not set up here yet — run `npx silt-design-mode setup`*, which is the fix, and
   only worth doing if the user wants Silt at all. Use `setup` rather than bare
   `login`: someone in this state has no MCP server either, and `setup` skips
   whatever is already done.
4. **Linked to the wrong instance.** A credential exists but names a different
   server. `status` reports both. Re-run login for the instance they mean —
   nothing about the listener is wrong.

## Silt commands

    npx silt-design-mode status            what is linked, and to which instance
    npx silt-design-mode login             link THIS PROJECT — device flow, opens a browser
    npx silt-design-mode send              share THIS session to a canvas as a transcript
    npx silt-design-mode push <entry>      render a local component onto a canvas
    npx silt-design-mode pull <name>       cherry-pick a pushed version onto your branch
    npx silt-design-mode mcp               register the MCP server (no login needed)
    npx silt-design-mode doctor            health check + detected agents
    npx silt-design-mode logout            remove THIS PROJECT's credential (--all for every one)

`push`/`pull` move COMPONENTS (your source ↔ a canvas version); `send` moves a
CONVERSATION. Different axes — don't reach for push when asked to share a session.

**No command lists canvases.** `send` and `push` default to the most-recently-
updated one and take `--canvas <id>`. Listing and searching are MCP tools. If you
don't know the canvas, say so rather than guessing an id.

**Check `status` before suggesting login.** Already has its own key → say so and
stop. State unreadable → report that; do not log in "just in case", which is how a
project ends up with two live keys. Each key belongs to ONE instance.

**Keys are per project.** Every project gets its own revocable key, named
`<project> — <host>` in Silt → Settings → API keys, so you can revoke one repo
without touching the others. They live in the machine config dir, never in the
repo — a key in a working tree is one `git add -A` from being committed.

**A project with no key of its own borrows the machine one and says so** — `npx silt-design-mode
status` prints a `Key:  machine credential` line. That is working, not broken. `npx
sdm login` in that project gives it its own; only suggest it if the user wants
per-repo revocation.

**Do NOT reach for a bare `silt`.** This package does not put it on your PATH — its
executables are `silt-design-mode`, `sdm`, and the `-beta` variants. A bare `silt`
only exists if the user separately installed the standalone CLI.

## Sending this conversation to Silt

"Send this to Silt" / "share this session" / "save this context" → **`silt_send`,
whenever that tool is in your context.** It authenticates through the MCP session, so
it needs no linked project and no local daemon, and it takes the same id, URL or name.
The `silt` skill covers it and the nine other `silt_*` tools.

Only when the tool is absent — right after `setup`, before the client has restarted —
does this job belong to the CLI. Then it is TWO steps, because sending cannot log
anybody in:

1. `npx silt-design-mode status` — if not linked, run `npx silt-design-mode login` and wait for it.
2. `npx silt-design-mode send` — lands on the most-recently-updated canvas. `--canvas <id>`
   targets one, `--agent cursor|codex` picks another session format, `--file`
   skips locating it.

**Never `cat` or read the session file, or pass its contents as an argument.** The
command streams it straight to Silt precisely so a large transcript never enters a
context window — yours included. Locating it is the command's job.

## Reading Silt, as opposed to writing to it

`send` is one-way. Listing canvases, reading a canvas's context document, inspecting
nodes — those are MCP tools, as is the `/silt-send` shortcut. None exist until the MCP
server is registered. (There is no history tool; the `silt` skill has the full list.)
`setup` registers it; `npx silt-design-mode mcp` does it on its own. Its scopes, its
three flags and what each one stores are in the package README — read that before
composing a command, rather than guessing a flag.

Five ways to report the wrong thing about it:

- **Run it yourself — do NOT paste a `claude mcp add` line for the user.** This
  command IS that, with the endpoint and the per-instance server name already worked
  out.
- **`--client cursor` / `--client codex` register nothing.** Silt does not write those
  clients' config files, so the command prints the server name and endpoint for the
  user to add themselves, and exits 0. Report that as instructions to follow, never as
  "registered" — only the default `claude` actually registers.
- **The client must restart before the tools appear.** It reads its server list at
  startup, so they don't exist in the session that ran the command. Say so, and ask the
  user to restart (or run `/mcp`) and come back. This is the normal state immediately
  after `setup`, not a failure.
- **Never run `login` on account of `mcp`.** OAuth in the browser works on an unlinked
  machine. A login does help — registration then points the client at a credential
  helper instead — but it is not a prerequisite, and the output says which of the two
  happened.
- **`already has silt — nothing to do` is not a repair.** Unlinked, a re-run leaves an
  existing entry untouched and exits 0. When an entry is stale rather than absent, the
  unconditional form is `npx silt-design-mode mcp remove` (`--all` for every scope, not
  just one) followed by a fresh `mcp`.

**"needs a newer daemon" is expected, not a bug.** It prints `needs 0.1.24 or newer`,
exits 1 and changes nothing — report it as-is, do NOT retry, do NOT fall back to
pasting `claude mcp add`. It clears itself when the published checksum changes. But a
non-zero exit is not always that: the same code also means "no `claude` CLI on PATH"
(the user has to install it; that never clears itself) or a genuine failure the client
printed verbatim. Read the message before deciding — registering nothing and reporting
success because the exit code looked familiar is the failure mode to avoid here.

**An instruction telling the user to export `Authorization: Bearer ${SILT_API_KEY}` or
to source an env file is stale wherever you find it, and worth replacing** — an
unresolved reference 401s forever AND suppresses the browser fallback.

## If it's installed but nothing appears on screen

It hasn't been mounted. It's a React component wrapping the subtree it can pick
from:

    <DesignMode onSend={createLocalSink({ repoRoot })} repoRoot={repoRoot}>
      {children}
    </DesignMode>

Two things get this wrong in practice:

- **`anchor`** defaults to `parent`, pinning the pill inside the wrapped box — on
  a page taller than the viewport that puts it at the bottom of the DOCUMENT,
  invisible until you scroll to the footer. Any full page wants `anchor="viewport"`.
- **`repoRoot`** cannot be discovered by a browser. The host must pass it from
  build-time or server-side code.

Source stamps (`file:line` on every annotation) come from the bundler plugin —
`silt-design-mode/next`, `/vite`, or `/loader`. **`npx silt-design-mode wire` adds
it** (it shows the diff and asks first); `npx silt-design-mode doctor` says whether
it is on, along with everything else that can be off.

Without the plugin annotations still work, but every edit takes the slow path —
and on React 18 there is no other route to a location at all, so the stamp is not
the fast path there, it is the only one. A non-JSX host (`.astro`, `.vue`, `.erb`)
cannot be stamped: the stamper parses JSX.

---

`npx silt-design-mode agent` still works but is DEPRECATED — it now runs `start`, which is a
superset. Use `npx silt-design-mode start`.
