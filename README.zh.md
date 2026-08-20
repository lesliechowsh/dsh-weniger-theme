# Weniger

[English](./README.md)

[![npm](https://img.shields.io/npm/v/dsh-weniger-theme)](https://www.npmjs.com/package/dsh-weniger-theme)
[![license](https://img.shields.io/npm/l/dsh-weniger-theme)](LICENSE)

*„Weniger, aber besser" —— 少，但更好。*

一个受迪特·拉姆斯设计哲学启发的 [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness)（DSH）Web GUI 主题：暖纸白底色、发丝线边框、近黑墨色、唯一的信号橙点缀、0–4px 直角网格、完全扁平的无阴影表面，以及全界面统一的瑞士字体栈。

![Weniger —— 应用了 Weniger 主题的 DSH Web 界面，右侧为十项设计原则面板](docs/screenshot-hero.png)

---

## 安装

作为 DSH web 插件安装，然后重启 `dsh web`：

```sh
dsh plugin --profile web add dsh-weniger-theme@latest
```

> **从 ≤ 0.1.3 升级？** 旧版没有声明 `dsh.bundle`，`dsh plugin add` 只会把它装成普通依赖——主题不加载，`/plugins/dsh-weniger-theme/client.js` 返回 404。0.1.4 新增 `cordis.patch.yml` 作为 bundle 补丁层；重新执行上面的 add 命令（或 `dsh plugin --profile web update dsh-weniger-theme`）并重启 `dsh web`，reconciler 会自动识别声明并激活。

也可以直接从 GitHub 仓库安装：

```sh
dsh plugin --profile web add github:lesliechowsh/dsh-weniger-theme
```

<details>
<summary>没有 <code>dsh plugin</code> 子命令的部署（手动安装）</summary>

1. 把包安装进你的 web profile：

   ```sh
   cd "$DSH_HOME/profiles/web"
   npm install dsh-weniger-theme
   ```

2. 在 profile 的 `cordis.patch.yml` 中追加一段 insert 条目：

   ```yaml
   - insert:
       - id: weniger-theme
         name: 'dsh-weniger-theme'
   ```

3. 重启 `dsh web`。

</details>

## 卸载

```sh
dsh plugin --profile web remove dsh-weniger-theme
```

（手动安装：删除 `cordis.patch.yml` 中的条目和依赖，再重启。）主题会在激活时把界面切换到浅色方案一次；之后你仍可在「设置 → 外观」切回深色——Weniger 的深色变体同样完整。

---

## 做了什么

- 将整个设计 token 图谱（主题服务 token、派生 token、静态色阶）重映射为 Braun 风格的暖色板，亮色与深色模式均完整。
- 所有组件圆角收敛到 0–4px 网格，阴影全部拍平。
- 重新着色：用户气泡、代码块、发送键、侧栏激活指示、聚焦环、文本选区、代码高亮色板。
- 在侧边栏底部新增品牌按钮（橙色方块 + 标签），点击弹出面板，以中德双语引述「十项设计原则」并署名致敬。

## 仓库结构

- `client.js` + `index.js` + `package.json` — 标准 DSH 客户端模块形式的插件（`dsh.client` manifest）。
- `weniger-theme.client.js` — 开发用动态插件形式（迭代调试用），安装不需要。
- `ui-probe.host.js` / `ui-probe.client.js` — 开发期自审工具。
- `DESIGN-NOTES.md` — 设计决策：token 分层、色板、圆角网格、验证流程。
- `docs/` — 截图。

## 许可证

MIT —— 见 `LICENSE`。

## 致敬与声明

本主题受迪特·拉姆斯的设计哲学及其「十项设计原则」启发，界面中仅以致敬形式简短引述并署名。本项目与迪特·拉姆斯本人、Vitsœ、Braun GmbH 及宝洁公司**无任何隶属、背书或赞助关系**。"Braun" 为其权利人的商标；本仓库不复制任何 Braun 商标、标识或产品设计。色板与布局数值均为原创。
