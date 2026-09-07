<!-- BEGIN:silt-design-mode -->
## silt-design-mode is installed here

Someone points at an element in the running UI, says what should change, and you
make the change in the source. This package ships its own instructions — do not
read its source to work out how to drive it.

- **Silt is MCP tools, never a shell command.** The `silt_*` tools act in context.
  `npx silt-design-mode` is what a person types in a terminal; from here it costs a
  process spawn and returns text you then have to parse.
- **An annotation carries its own location.** `<source exact="true"/>` ENDS the
  search — open that file at that line and edit it there. Do not grep the codebase.
- **That location only exists if the build stamps it.** `npx silt-design-mode doctor`
  says whether stamping is on, `npx silt-design-mode wire` turns it on. Unwired,
  `source` never arrives and every edit falls back to matching class names and DOM
  shape — so check before concluding the tool is sending bad annotations.

Detail lives in three skills — `silt` (reaching Silt), `silt-setup` (running or
linking the tool), `silt-design-mode` (applying an annotation batch). Whatever your
agent loads, the same files are always readable at
`node_modules/silt-design-mode/skill/`.

Everything between the two markers is written by silt-design-mode's installer and
replaced on upgrade; text outside them is left alone. Put your own notes outside.
<!-- END:silt-design-mode -->
