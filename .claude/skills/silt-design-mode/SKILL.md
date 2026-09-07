---
name: silt-design-mode
description: Apply a batch of silt-design-mode annotations — visual change requests pinned to real elements in a running UI, each carrying the source file and line. Use when handed an <annotations> block, a silt-design-mode JSON batch, or a file under .silt-design-mode/.
---

# silt-design-mode annotations

Someone pointed at elements in their running UI and said what should change.
Each annotation is one located visual edit. Make exactly those edits.

## 1. Read `source` first

`<source file line exact/>` is the only field that ENDS the search. Every other
field merely narrows it. Read it before you form any plan.

- `exact="true"` — that is the element's own JSX line. Open the file, go to the
  line, edit. **Do not search the codebase.** If you grep at all, grep inside
  that one file to confirm you are on the right element.
- `exact="false"` — the line belongs to an ancestor's JSX, usually the page that
  renders the component. The file is a strong starting point; the line is not
  the element's. Confirm with the handles below before editing anything.
- absent — a production build, a non-React host, or React offered nothing. Fall
  back to the handles.

## 2. The handles, strongest first

Any one of them can be missing. Use as many as are present to confirm you have
the right element — that is what they are for, and a wrong edit is far more
expensive than a slow one.

| field | what it is |
|---|---|
| `source` | file + line. Ends the search. Where the element is WRITTEN — for a component instance that is inside the component's own file, so an edit there changes every instance. |
| `callSite` | file + line of the JSX call that produced THIS one — `CardGrid.tsx:88` where `source` is `MediaCard.tsx:44`. When the request is about one instance, the change belongs here, not in the shared definition. Absent unless the host runs React 19 in dev. |
| `components` | the component chain, nearest first — `ProductCard` inside `Grid`. The name a human would say. |
| `componentPath` | the FILE the nearest component is written in. Where the name sends you looking, this ends the looking — open it before searching. Absent unless the host runs the build transform. |
| `className` | the authored class string. Near-unique, and it survives production builds. |
| `text` | the element's own copy. Near-unique when it has any. |
| `props` | the props the component was called with. Tells four identical `<NavLink>`s apart — the call site, not the definition. |
| `selector` + `index` | structural position: `nth` of `of` identical siblings. The last resort, and it always works. |
| `label` / `path` | the DOM shape. Weakest. |

## 3. Context you must not ignore

- `route` — the page it was said on. Open that one.
- `viewport` — the width the complaint was made at. A layout complaint is a
  statement about a width; "this wraps badly" at 1550 may be correct at 375.
- `size` — the element's box at the moment of the complaint. "Add more height"
  is unanswerable without the height it had.
- `styles` — the resolved values the complaint is about, not the whole computed
  style. If the sentence says "too tight" the gap is in here.
- `state` — `hover`, `focus`, `active`, `disabled` means edit THAT state's
  styles, not the resting look. `default` means the resting look.
- `intent` — `fix` changes it in place. `explore` means produce a variant and
  **leave the original intact**; the person is comparing, not replacing.

## 4. Rules

1. Change only the elements described. Leave every other line byte-identical.
2. Do not refactor, rename, extract, reformat, add comments, or "also fix"
   something you noticed. You were not asked.
3. Prefer the smallest edit that satisfies the sentence. A token or class change
   beats a new wrapper.
4. Use the design system already in the file — its tokens, its component
   library, its spacing scale. Never introduce a raw value where the
   surrounding code uses a named one.
5. If what you find at the location does not match the description, change
   nothing and say so. The location is a fact, not a hint.
6. `source` points at where the element is **defined**, not at the one instance
   that was clicked. If `index` says it is one of several, editing that line
   changes all of them — when the request is about this instance, add a prop or
   variant at the call site and say which file you changed instead.

## 5. Batch behaviour

Annotations are independent and arrive in the order they were pinned, which is
the order they are numbered in the tool. Apply them all. One that fails does not
block the rest.

Report per annotation, by `id`:

    a7f3  done — reduced the gap from 24px to 16px
    b1c9  skipped — line 88 is a <section>, not the badge described

That mapping is what lets the person see, in their own tool, which pins landed.

## 6. Ruler annotations — fix the cause, not the symptom

A `<ruler>` block means the person was MEASURING when they wrote the note. It
carries readings, never a verdict — the sentence states the intent, EXCEPT when
there is none: a scrub with no typed words is a complete instruction on its own,
and then `<edits>` IS the statement of what should change.

- `<edits>` — **the values the person SET BY HAND**, by dragging the number in
  the browser. `<edit property="padding-left" from="40" to="38"/>` means they
  looked at 38px and decided that is what they want. There is no interpretation
  left to do: use `to`. When the sentence is empty, these edits are the whole
  ask — apply every one; do not wait for prose that is not coming.

  **Express it in the file's own vocabulary.** The preview was an inline style
  and the source was never touched, so do NOT write `style="padding-left:38px"`
  through. If the element is styled with Tailwind, find the class that equals
  `to` (`p-8` is 32px, so 38px is `p-[38px]` — there is no whole step) and say
  which you used and why. If the file uses spacing tokens, use the nearest token
  and name it. Matching the surrounding code matters more than matching the
  number to the pixel; if you have to choose, say so in your report.
- `<padding>` / `<margin>` — the element's own bands, in px, at the moment of
  the complaint. "This padding is wrong" is unanswerable without them.
- `<distance x y>` with a `<from>` — the gap they had on screen, measured from
  the element named in `<from>` to the annotated one. `x` is a horizontal gap,
  `y` a vertical one. "Too tight" means this number.
- `<chain>` — the annotated element's ancestor box-model styles, outward.

**Read `<chain>` before deciding what to edit.** A gap or an offset is usually
produced by an ancestor rather than by the element itself: a wrapper's stray
padding, an uneven margin, a `gap` on the flex parent, a gutter the page
layout adds. Correct THAT.

**Never nudge the symptom.** A `transform`, a compensating negative margin, or
an absolute offset makes the number right and the code wrong, and the next
edit reintroduces the problem. If the chain shows `padding-left: 4px` on a
wrapper, the fix is that padding, not a `-4px` further in.

If nothing in the chain explains the reading, the cause is likely a shared
parent above what was captured. Say so in your report rather than forcing a
local fudge.

