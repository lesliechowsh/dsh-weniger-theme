# Weniger

[中文文档](./README.zh.md)

[![npm](https://img.shields.io/npm/v/dsh-weniger-theme)](https://www.npmjs.com/package/dsh-weniger-theme)
[![license](https://img.shields.io/npm/l/dsh-weniger-theme)](LICENSE)

*„Weniger, aber besser" — Less, but better.*

A Dieter Rams-inspired theme for the [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) (DSH) Web GUI: warm paper whites, hairline borders, near-black ink, one signal-orange accent, squared 0–4px geometry, flat surfaces, and a single Swiss type stack across the whole UI.

![Weniger — DSH Web GUI with the Weniger theme applied, and the ten-principles panel open](docs/screenshot-hero.png)

---

## Installation

Three paths, same result. Pick whichever fits your setup.

### Path A · Ask the agent (zero dependencies, recommended)

Works on any DSH deployment — no npm, no CLI:

1. Start DSH Web (`dsh --profile web`) and open any session.
2. Send this prompt to the agent, pasting the **full content** of `weniger-theme.client.js`:

   > Create the following code as a dynamic Cordis plugin and run it:
   > `(paste the entire weniger-theme.client.js here)`

   Or let the agent fetch the file itself:

   > Install the Weniger theme: read `weniger-theme.client.js` from the repo https://github.com/lesliechowsh/dsh-weniger-theme, create it as a dynamic Cordis plugin, and run it.

3. Click **approve** on the Run card.
4. The UI switches to Weniger immediately.

### Path B · Plugin package via npm (ecosystem standard)

For DSH distributions that ship the `dsh plugin` subcommand:

```sh
dsh plugin --profile web add dsh-weniger-theme@latest
```

Or straight from the GitHub repo:

```sh
dsh plugin --profile web add github:lesliechowsh/dsh-weniger-theme
```

Restart `dsh web` to take effect.

### Uninstall

- Sidebar footer → plugin manager (Cordis panel) → find **Weniger** → stop/remove; or
- Tell the agent: *"Remove the Weniger plugin"*.

On activation the theme switches the UI to the light scheme once; you can still switch back to dark in Settings → Appearance afterwards (the Weniger dark palette is complete).

---

## What it does

- Remaps the entire design-token graph (theme-service tokens, derived tokens, and the static color ramp) to a warm Braun-style palette, in both light and dark modes.
- Converges every component radius to a 0–4px grid and flattens all shadows.
- Recolors the user bubble, code blocks, send button, active-nav accents, focus rings, selection, and the syntax-highlight palette.
- Adds a footer chip (orange square + label) that opens a small panel quoting the ten principles of good design, with attribution.

## Repository layout

- `weniger-theme.client.js` — the theme as a dynamic-plugin client half (install Path A).
- `client.js` + `index.js` + `package.json` — the same theme as a standard DSH client module (`dsh.client` manifest, install Path B).
- `ui-probe.host.js` / `ui-probe.client.js` — optional self-review tooling (computed-style probe + Snapdom screenshot capture) used during development.
- `DESIGN-NOTES.md` — design decisions: token layers, palette, radius grid, verification loop.
- `docs/` — screenshots.

## License

MIT — see `LICENSE`.

## Attribution & disclaimer

Inspired by the design philosophy of Dieter Rams and his ten principles of good design, quoted briefly in the UI as homage. This project is **not** affiliated with, endorsed by, or sponsored by Dieter Rams, Vitsœ, Braun GmbH, or Procter & Gamble. "Braun" is a trademark of its respective owner; no Braun trademarks, logos, or product designs are reproduced here. The color palette and layout values are original.
