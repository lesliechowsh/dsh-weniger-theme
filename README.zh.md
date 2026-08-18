# Weniger

[English](./README.md)

[![npm](https://img.shields.io/npm/v/dsh-weniger-theme)](https://www.npmjs.com/package/dsh-weniger-theme)
[![license](https://img.shields.io/npm/l/dsh-weniger-theme)](LICENSE)

*„Weniger, aber besser" —— 少，但更好。*

一个受迪特·拉姆斯设计哲学启发的 [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness)（DSH）Web GUI 主题：暖纸白底色、发丝线边框、近黑墨色、唯一的信号橙点缀、0–4px 直角网格、完全扁平的无阴影表面，以及全界面统一的瑞士字体栈。

![Weniger —— 应用了 Weniger 主题的 DSH Web 界面，右侧为十项设计原则面板](docs/screenshot-hero.png)

---

## 安装

三种方式任选其一，效果相同，按你的环境挑一种即可。

### 方式 A · 让 agent 安装（零依赖，推荐）

任何 DSH 部署都能用，不需要 npm，不需要 CLI，也不用复制代码。只发给 agent 这一句话：

> 帮我安装 Weniger 主题：仓库是 github:lesliechowsh/dsh-weniger-theme，把其中的 `weniger-theme.client.js` 创建为动态 Cordis 插件并运行。

然后点击 Run 卡片上的**批准**——界面立即切换为 Weniger 风格。

<details>
<summary>无网络时的备选（agent 无法联网取文件）</summary>

把 `weniger-theme.client.js` 的**全文**粘贴到这句话后面：

> 请把下面的代码创建为动态 Cordis 插件并运行：
> `（在此粘贴 weniger-theme.client.js 的全部内容）`

</details>

### 方式 B · npm 插件包安装（生态标准）

适用于带 `dsh plugin` 子命令的 DSH 发行版：

```sh
dsh plugin --profile web add dsh-weniger-theme@latest
```

也可以直接从 GitHub 仓库安装：

```sh
dsh plugin --profile web add github:lesliechowsh/dsh-weniger-theme
```

重启 `dsh web` 生效。

### 卸载

- 侧边栏底部 → 插件管理器（Cordis 面板）→ 找到 **Weniger** → 停用/移除；
- 或对 agent 说：*"移除 Weniger 插件"*。

主题会在激活时把界面切换到浅色方案一次；之后你仍可在「设置 → 外观」切回深色（Weniger 的深色变体同样完整）。

---

## 做了什么

- 将整个设计 token 图谱（主题服务 token、派生 token、静态色阶）重映射为 Braun 风格的暖色板，亮色与深色模式均完整。
- 所有组件圆角收敛到 0–4px 网格，阴影全部拍平。
- 重新着色：用户气泡、代码块、发送键、侧栏激活指示、聚焦环、文本选区、代码高亮色板。
- 在侧边栏底部新增品牌按钮（橙色方块 + 标签），点击弹出面板，以中德双语引述「十项设计原则」并署名致敬。

## 仓库结构

- `weniger-theme.client.js` — 动态插件形式的主题（安装方式 A）。
- `client.js` + `index.js` + `package.json` — 同一主题的标准 DSH 客户端模块（`dsh.client` manifest，安装方式 B）。
- `ui-probe.host.js` / `ui-probe.client.js` — 开发期自审工具（计算样式探针 + Snapdom 截图回传），可选。
- `DESIGN-NOTES.md` — 设计决策：token 分层、色板、圆角网格、验证流程。
- `docs/` — 截图。

## 许可证

MIT —— 见 `LICENSE`。

## 致敬与声明

本主题受迪特·拉姆斯的设计哲学及其「十项设计原则」启发，界面中仅以致敬形式简短引述并署名。本项目与迪特·拉姆斯本人、Vitsœ、Braun GmbH 及宝洁公司**无任何隶属、背书或赞助关系**。"Braun" 为其权利人的商标；本仓库不复制任何 Braun 商标、标识或产品设计。色板与布局数值均为原创。
