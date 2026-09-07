---
description: Share this conversation with the team as a transcript on a Silt canvas
allowed-tools: Bash(npx silt-design-mode status), Bash(npx silt-design-mode login), Bash(npx silt-design-mode send:*)
---

Share THIS conversation to Silt as a transcript node, so a teammate can read what
happened here and pick it up.

**If `silt_send` is in your tools, call it instead of everything below** — it
authenticates through the MCP session, so it needs no linked machine and no local
daemon, and it takes the same id/URL/name. The steps below are for when that tool is
absent: right after `setup` it is, because a client reads its server list at startup,
so the tools only exist once it has restarted.

This ordering is the point. A teammate who cloned a repo with a committed `.mcp.json`
(`mcp --scope project`) has `silt_send` working off OAuth and no credential on disk, so
starting at step 1 sends them through a second browser flow and mints a project
credential to do a job the tool in their context does with no user interaction at all.

Do it in this order and stop at the first step that fails:

1. `npx silt-design-mode status`

   It prints the instance, whether this machine is linked, and which credential it
   found. Read it — do not skip to login.

2. If it says **not linked**, run `npx silt-design-mode login` and wait for it.

   It opens a browser and prints a code; the person approves there. If it says the
   machine is ALREADY linked, do not run login — a second login mints a second
   credential for one machine. If the state could not be read at all, say so and stop
   rather than logging in "just in case".

3. `npx silt-design-mode send`

   With no `$ARGUMENTS` this lands on the person's most-recently-updated canvas.

   **`$ARGUMENTS` is whatever they called the canvas — pass it straight through as
   `--canvas <value>` without translating it.** An id, a pasted URL and an exact name
   all resolve server-side. This used to say "is a canvas id", which was a trap: asked
   to "send this to Test123" you had no way to turn a name into an id, so the choice
   looked like guessing an id or dropping the argument — and dropping it publishes the
   transcript to whichever canvas was touched last, i.e. confidently to the wrong
   place. Neither is needed. Pass the name.

   If a name matches several canvases the command refuses and lists their ids. That
   is not a failure to work around: show the person the list and let them pick, or
   re-run with one of the ids. **Never** fall back to omitting `--canvas`.

   Report the canvas name and URL the command prints back.

**Never read the session file.** Do not `cat` it, do not pass its contents as an
argument, do not try to summarise it first. `send` locates it and streams it straight to
Silt precisely so a large transcript never enters a context window — including yours. A
long session is tens of megabytes.

If `send` refuses because the daemon is too old, that is expected and self-healing: the
wrapper re-downloads whenever the published release changes. Report it and stop; there is
nothing for the person to install.

Deeper detail — instances, credentials, what to do when the pill does not appear — is in
the `silt-setup` skill.
