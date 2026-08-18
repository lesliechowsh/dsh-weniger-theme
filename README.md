# Weniger

*„Weniger, aber besser" — Less, but better.*

A Dieter Rams-inspired theme for the [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) (DSH) Web GUI: warm paper whites, hairline borders, near-black ink, one signal-orange accent, squared 0–4px geometry, flat surfaces, and a single Swiss type stack across the whole UI.

---

## 安装 / Installation

三种方式任选其一，效果相同。

### 方式 A · 让 agent 安装（零依赖，推荐）

任何 DSH 部署都能用，不需要 npm，不需要 CLI：

1. 启动 DSH Web（`dsh --profile web`）并进入任意会话。
2. 把下面的提示词发给 agent，并把 `weniger-theme.client.js` 的**全文**粘贴给它：

   > 请把下面的代码创建为动态 Cordis 插件并运行：
   > `（粘贴 weniger-theme.client.js 全部内容）`

   也可以让 agent 自己读仓库文件：

   > 安装 Weniger 主题：读取 https://github.com/lesliechowsh/dsh-weniger-theme 仓库里的 weniger-theme.client.js，创建为动态 Cordis 插件并运行。

3. 在弹出的 Run 卡片上点击**批准**。
4. 界面立即切换为 Weniger 风格。

### 方式 B · 插件包安装（生态标准）

适用于带 `dsh plugin` 子命令的 DSH 发行版（npm 发布后）：

```sh
dsh plugin --profile web add dsh-weniger-theme@latest
# 或直接从 GitHub 仓库安装：
dsh plugin --profile web add github:lesliechowsh/dsh-weniger-theme
```

重启 `dsh web` 生效。

### 方式 C · npm 全局安装

```sh
npm install -g dsh-weniger-theme
# 然后配合 dsh plugin 命令启用，或直接从 GitHub 安装：
npm install -g github:lesliechowsh/dsh-weniger-theme
```

> 说明：本包暂未发布到 npm registry（版本 0.1.0 前会发布）。当前推荐方式 A 或 B 的 git 形式。

### 卸载 / Uninstall

- 侧边栏底部 → 插件管理器（Cordis 面板）→ 找到 Weniger → 停用/移除；
- 或对 agent 说：*"移除 Weniger 插件"*（@rams-1 停止并删除）。

主题会在激活时把界面切换到浅色方案一次；之后你仍可在「设置 → 外观」切回深色（Weniger 的深色变体同样完整）。

---

## What it does

- Remaps the entire design-token graph (theme-service tokens, derived tokens, and the static color ramp) to a warm Braun-style palette, in both light and dark modes.
- Converges every component radius to a 0–4px grid and flattens all shadows.
- Recolors the user bubble, code blocks, send button, active-nav accents, focus rings, selection, and the syntax-highlight palette.
- Adds a footer chip (orange square + label) that opens a small panel quoting the ten principles of good design, with attribution.

## Repository layout

- `weniger-theme.client.js` — the theme as a dynamic-plugin client half (install path A).
- `client.js` + `package.json` — the same theme as a standard DSH client module (`dsh.client` manifest, install paths B/C).
- `ui-probe.host.js` / `ui-probe.client.js` — optional self-review tooling (computed-style probe + Snapdom screenshot capture) used during development.
- `DESIGN-NOTES.md` — design decisions: token layers, palette, radius grid, verification loop.

## License

MIT — see `LICENSE`.

## Attribution & disclaimer

Inspired by the design philosophy of Dieter Rams and his ten principles of good design, quoted briefly in the UI as homage. This project is **not** affiliated with, endorsed by, or sponsored by Dieter Rams, Vitsœ, Braun GmbH, or Procter & Gamble. "Braun" is a trademark of its respective owner; no Braun trademarks, logos, or product designs are reproduced here. The color palette and layout values are original.
