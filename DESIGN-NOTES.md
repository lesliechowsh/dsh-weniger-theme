# Rams Theme — design notes

Why the values in `dieter-rams-theme.client.js` are what they are. Read before changing any color, radius, or font decision.

## Principles (Dieter Rams / Braun language)

1. Paper, ink, hairline. Warm paper whites and near-black warm ink; separation by 1px hairlines, not by gray fills or shadows.
2. One signal color. Braun orange (`#E8541E` light / `#FF6B35` dark) appears only where a device would put an indicator light: focus ring, selection, links, active-nav accent, send button, brand squares.
3. Zero decorative radius. Corners are 0–4px. Anything rounder is noise.
4. One typeface, one scale. The whole UI resolves the same `--dsw-font-family`; code resolves `--ds-font-family-code`. No component gets its own "special" typography.
5. Flat. All `--dsw-shadow-lv*` are `none`.

## The app's token graph (where the levers are)

All sheets live in the built checkout
`/data/data/com.termux/files/usr/lib/node_modules/@deepseek-ai/dsh/node_modules/@deepseek-ai/dsh-client-ui-theme/lib/styles/`:

- `design-platform.css` — the full map. `body { --dsw-static-* }` (raw palette), `body { --dsw-alias-* / --dsw-specific-* }` (light), `body[data-ds-dark-theme] { ... }` (dark).
- `base.css` — `:root { --dsw-font-family, --ds-font-family-code }` and easing vars.
- `shiki.css` — syntax-highlight palette (`--shiki-token-*`, light on `:root`, dark on `body[data-ds-dark-theme]`).

Three override layers, in the order the theme plugin applies them:

1. **Theme-service tokens** (13 alias tokens, via `theme.overrideTokens`) — the only tokens the theme service accepts. Core surfaces: base/layer/overlay backgrounds, l1/l2 borders, brand, primary/secondary labels, three state colors, sidebar fill.
2. **Body-level derived tokens** (via `styles.insert`) — every other `--dsw-alias-*`/`--dsw-specific-*` the app resolves on `body`; set for both `body` and `body[data-ds-dark-theme]`.
3. **Static ramp** (via `styles.insert`) — `--dsw-static-deepseek-*`, `--dsw-static-blue-*`, `--dsw-static-neutral-bluish-*`, `--dsw-static-neutral-*`, plus amber/green/red. Some components reference statics directly (turn-status shimmer, meter tints, chips), bypassing the alias layer — remapping the statics is what kills the last blues. One warm ramp serves both schemes because light mode uses the light end and dark mode the dark end.

## Palette (core values)

Light: base `#F5F4F0` · layer-1 `#FBFAF7` · layer-2 `#ECEAE4` · overlay `#FFFFFF` · ink `#1A1917` · secondary `#6B6A63` · border-l1 `#DFDDD5` · border-l2 `#BFBCB2` · orange `#E8541E` · sidebar `#ECEAE4`.
Dark: base `#1C1A17` · layers `#232220`/`#2C2A26` · ink `#F2EFE8` · secondary `#ABA89E` · borders `#3A3832`/`#57544B` · orange `#FF6B35` · sidebar `#1E1C19`.

User bubble: paper `#FBFAF7` + hairline border (was DeepSeek blue). Send button: orange (was DeepSeek blue). Markdown code block: `#F7F6F2` warm near-white (was bluish gray). Shiki: monochrome ink with orange constants/links — no blue/purple/pink syntax colors.

## Radius grid

0–4px everywhere. The shipped UI was 12–22px pills; the stylesheet pins the shipped hashed classes (composer card, bubble, send button, tool cards, code blocks, panels) to 3–4px, and the generic `button/input/textarea/select` rule to 2px. Hash prefixes (e.g. `uV2eYG_`, `gdEzaW_`) are build-stable — if the app is rebuilt and radii reappear, re-extract the new prefixes from the built CSS.

## Chip + panel

- Chip: `sidebar.footer.action` entry, `data-rams-chip`. Rail (56px): 36×36 centered orange square (matches the shipped footer footprint). Wide: 36px row, 12px square + lowercase label in the app's own 14px regular typography.
- The footer row does not wrap natively — `[class*="_footerActions"] { flex-wrap: wrap }` keeps extra actions from overflowing the rail.
- Panel: `shell.overlay` entry, `data-rams-panel` — Braun device card with the ten principles (German + Chinese). `pointer-events: auto` is required (the overlay layer is click-through).

## Verification (the review loop)

The probe plugin (`uiprb-2`, code in `ui-probe.host.js` / `ui-probe.client.js`) is the eyes:

1. Live report: `python3 -m json.tool ~/ui-probe.json` — computed token values, and geometry of chip / user bubble / send button / composer / code block.
2. Screenshot: `base64 -d ~/ui-shot.b64 > ~/ui-shot.jpg` — Snapdom render; analyze with PIL pixel sampling (the driving model has no image input, so quantify colors instead of eyeballing).
3. Restart the probe (`cordis_run` update on `uiprb-2`) to force a fresh report + screenshot after each theme change.

Every change is verified against the report; a change that the probe cannot confirm did not land.
