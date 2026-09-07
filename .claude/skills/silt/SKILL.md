---
name: silt
description: Reach Silt — the product context layer — through its MCP tools. Use when asked what the team has decided, explored or shipped; to read, search or act on a canvas; to share this session to Silt; or to push or pull a component version. Silt holds product context on visual canvases.
---

# Silt

Silt is reached through **MCP tools, named `silt_*`**. They are in your context
already when the server is registered — no shell, no command to run.

## The routing rule

**Anything you want to do with Silt is a `silt_*` tool.** If a tool for the job is
listed below, call it. Do not shell out to a `silt` or `silt-design-mode` command
instead — those exist for a person typing in a terminal, they cost a process spawn
and a round trip, and their output is text you then have to parse. The one case
where a command is right is when the tools are genuinely absent; see the bottom of
this file, which tells you how to fix that rather than work around it.

## Which tool

| You want to                                           | Call                                                                                                                                                                                                                                                                               |
| ----------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| see what is connected at all                          | `silt_status` — call it early; it tells you which of the others will pay off                                                                                                                                                                                                       |
| find a canvas                                         | `silt_list`                                                                                                                                                                                                                                                                        |
| read one canvas                                       | `silt_inspect`                                                                                                                                                                                                                                                                     |
| query specific nodes                                  | `silt_nodes` — fast, no LLM in the way, when you know what you are after                                                                                                                                                                                                           |
| read a canvas's context document                      | `silt_context_read` — often already holds the answer; read it first                                                                                                                                                                                                                |
| **share THIS session as a transcript**                | `silt_send`                                                                                                                                                                                                                                                                        |
| put component(s) from one repo on a canvas            | `silt_push` — ONE call: pass `entry_path` for one, or `items` for 2–4 concurrent captures. It registers the repo itself on first use. Reach for `silt_repo` first only when you do not know the entry path, and `silt_setup` only as a warm-up. `silt_pull` brings a version back. |
| put a component on a canvas with NO repo to point at  | `silt_sketch` — inline `files`, built server-side into a versioned node exactly like `silt_push`. For a fresh idea or a one-off; use `silt_push` to iterate something that IS in a repo.                                                                                           |
| answer a pinned design-mode note with a settled value | `silt_design_edit` — a colour, radius, spacing, font size, position or a copy change, previewed live with no source change and no rebuild (~1s vs the ~40s a rebuild costs). Only reach for a source edit when structure or logic has to change.                                   |

That is the whole routed surface. Anything absent from this table does not exist,
and calling it costs a failed round-trip. Eleven names were retired: `silt_search`,
`silt_team`, `silt_context_write`, `silt_repo_files`, `silt_repo_file`, `silt_history`,
`silt_create_canvas`, `silt_share`, `silt_wish`, `silt_agent` and `silt_agent_result`.
Three of those are the tempting symmetric guess beside a tool that DOES exist —
`silt_context_write` next to `silt_context_read`, and the two `silt_repo_file*` beside
`silt_repo`. There is no write door for a context document and no file-level repo tool.

Read canvases and synthesize the answer yourself; Silt gives you the raw context, not a
second agent.

**Each tool's own description is the authority on how to call it** — arguments, return
shape, and what not to do around it. That text ships with the tool, so it cannot drift
from the code implementing it. This file answers the question a description cannot:
which tool, and what to do when there are none. Do not restate a tool's mechanics here.

## Two things that are easy to get wrong

**Nothing here answers a question for you.** Every read tool returns raw context —
canvases, nodes, the context document. There is no "ask Silt" tool and no canvas agent
to delegate to: you read what is there and synthesize the answer yourself. Reaching for
one is the most common mistake, because it used to exist.

**Cite what you read.** These tools return real team decisions with sources attached.
An answer that drops the source is worth less than one that says where it came from.

## If there are no `silt_*` tools

Two different states, with two different fixes. Read which one you are in before
acting — the wrong fix does nothing and looks like a broken tool.

1. **The server was never registered here.** Nothing in the client's config mentions
   Silt. Fix: `npx silt-design-mode setup` (it registers the server, and skips every
   step already done). Restarting achieves nothing — there is nothing to load.
2. **Registered, but this session started before it.** A client reads its server list
   at startup, so a server registered a minute ago does not exist in the session that
   registered it. Fix: the user restarts the client, or runs `/mcp`. This is the
   normal state immediately after `setup` and it is not a failure.

In state 2 — and only there — the `send`, `push` and `pull` commands on
`npx silt-design-mode` do the same jobs from the shell, and are a reasonable bridge
until the restart. Say which state you are in and what you did.

The tools always carry a server prefix (`mcp__<server>__silt_*`) — that is how MCP
tools are named, not a sign that something is misconfigured, so match on the
`silt_*` suffix rather than the whole string. When several Silt servers are
registered the suffixes are identical and only the prefix differs: check which one
you are calling before any write, and say which you used.
