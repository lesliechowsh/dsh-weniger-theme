window.__ModuleLoader__.load({
  id: "dsh-weniger-theme",
  factory: (require) => {
    var module = { exports: {} };
    var exports = module.exports;
    var React = require("react");

    // Weniger — "less, but better". A Dieter Rams-inspired theme for the DSH Web GUI.
    function apply(ctx) {
      // ---------- 1. Palette over the active theme (light + dark) ----------
      var theme = ctx.get("theme");
      if (theme !== undefined) {
        try { theme.setTheme("light"); } catch (err) { /* keep current preference */ }
        ctx.effect(() => theme.overrideTokens("weniger", {
          "--dsw-alias-bg-base": { light: "#F5F4F0", dark: "#1C1A17" },
          "--dsw-alias-bg-layer-1": { light: "#FBFAF7", dark: "#232220" },
          "--dsw-alias-bg-layer-2": { light: "#ECEAE4", dark: "#2C2A26" },
          "--dsw-alias-bg-overlay": { light: "#FFFFFF", dark: "#232220" },
          "--dsw-alias-border-l1": { light: "#DFDDD5", dark: "#3A3832" },
          "--dsw-alias-border-l2": { light: "#BFBCB2", dark: "#57544B" },
          "--dsw-alias-brand-primary": { light: "#E8541E", dark: "#FF6B35" },
          "--dsw-alias-label-primary": { light: "#1A1917", dark: "#F2EFE8" },
          "--dsw-alias-label-secondary": { light: "#6B6A63", dark: "#ABA89E" },
          "--dsw-alias-state-error-primary": { light: "#B53D2E", dark: "#FF6B5E" },
          "--dsw-alias-state-success-primary": { light: "#34754A", dark: "#7CBB84" },
          "--dsw-alias-state-warn-primary": { light: "#A8621F", dark: "#E0A84C" },
          "--dsw-specific-sidebar-fill": { light: "#ECEAE4", dark: "#1E1C19" },
        }));
      }

      // ---------- 2. Comprehensive stylesheet ----------
      ctx.effect(() => {
        var tag = document.createElement("style");
        tag.dataset.weniger = "1";
        tag.textContent = CSS;
        document.head.appendChild(tag);
        return () => tag.remove();
      });

      // ---------- 3. Brand chip (rail-adaptive) + Ten Principles overlay ----------
      var slots = ctx.get("slots");
      if (slots === undefined) return;

      var store = {
        open: false,
        listeners: new Set(),
        get() { return store.open },
        set(value) {
          store.open = value;
          store.listeners.forEach((fn) => fn());
        },
        subscribe(fn) {
          store.listeners.add(fn);
          return () => store.listeners.delete(fn);
        },
      };

      function Chip(props) {
        var openState = React.useState(store.get());
        var open = openState[0];
        var setOpen = openState[1];
        React.useEffect(() => store.subscribe(setOpen), []);
        var wide = Boolean(props.wide);
        var label = "Weniger — less, but better";
        var square = React.createElement("span", {
          style: { width: 14, height: 14, background: "var(--dsw-alias-brand-primary)", flexShrink: 0, flexGrow: 0 },
        });
        var railStyle = {
          display: "flex", alignItems: "center", justifyContent: "center",
          width: 36, height: 36, flexShrink: 0, margin: 0, padding: 0,
          background: "transparent", borderWidth: 0, borderStyle: "none", borderColor: "transparent",
          cursor: "pointer", boxSizing: "border-box",
        };
        var wideStyle = {
          display: "flex", alignItems: "center", gap: 8, height: 42, width: "100%",
          padding: "0 10px 0 8px", margin: 0,
          background: "transparent", borderWidth: 0, borderStyle: "none", borderColor: "transparent",
          cursor: "pointer", boxSizing: "border-box", flexShrink: 0, minWidth: 0,
          color: "var(--dsw-alias-label-primary)", fontSize: 14, fontFamily: "inherit",
        };
        return React.createElement(
          "button",
          {
            "data-weniger-chip": "1",
            onClick: () => store.set(!open),
            title: label,
            "aria-label": label,
            "aria-pressed": open,
            style: wide ? wideStyle : railStyle,
          },
          square,
          wide
            ? React.createElement("span", {
                style: {
                  color: "var(--dsw-alias-label-primary)", fontSize: 14, fontWeight: 400,
                  letterSpacing: "normal", textTransform: "none", whiteSpace: "nowrap",
                  minWidth: 0, overflow: "hidden", textOverflow: "ellipsis",
                },
              }, "less, but better")
            : null
        );
      }

      var PRINCIPLES = [
        ["Innovativ", "好的设计是创新的"],
        ["Macht ein Produkt brauchbar", "好的设计让产品有用"],
        ["Ästhetisch", "好的设计是审美的"],
        ["Macht ein Produkt verständlich", "好的设计让产品易于理解"],
        ["Unaufdringlich", "好的设计是不张扬的"],
        ["Ehrlich", "好的设计是诚实的"],
        ["Langlebig", "好的设计是持久的"],
        ["Konsequent bis ins letzte Detail", "好的设计贯彻到每个细节"],
        ["Umweltfreundlich", "好的设计是环保的"],
        ["So wenig Design wie möglich", "好的设计是尽可能少的设计"],
      ];

      var STYLES = {
        panel: {
          position: "fixed", top: 16, right: 16,
          width: "min(400px, calc(100vw - 32px))", maxHeight: "calc(100vh - 32px)", overflowY: "auto",
          pointerEvents: "auto", background: "var(--dsw-alias-bg-overlay)",
          color: "var(--dsw-alias-label-primary)", border: "1px solid var(--dsw-alias-border-l2)",
          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.18)", borderRadius: 4,
        },
        header: { display: "flex", alignItems: "center", gap: 12, padding: "14px 16px", borderBottom: "1px solid var(--dsw-alias-border-l1)" },
        square: { width: 14, height: 14, background: "var(--dsw-alias-brand-primary)", flexShrink: 0 },
        title: { fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase" },
        subtitle: { fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--dsw-alias-label-secondary)", marginTop: 3 },
        close: { background: "transparent", border: "none", color: "var(--dsw-alias-label-secondary)", fontSize: 14, lineHeight: 1, padding: "4px 6px", cursor: "pointer" },
        list: { listStyle: "none", margin: 0, padding: "4px 16px 10px" },
        item: { display: "flex", gap: 12, padding: "9px 0", borderTop: "1px solid var(--dsw-alias-border-l1)" },
        num: { width: 22, flexShrink: 0, fontSize: 11, letterSpacing: "0.05em", color: "var(--dsw-alias-label-secondary)", fontVariantNumeric: "tabular-nums" },
        de: { display: "block", fontSize: 13, fontWeight: 600 },
        zh: { display: "block", fontSize: 12, color: "var(--dsw-alias-label-secondary)", marginTop: 2 },
        foot: { padding: "10px 16px", borderTop: "1px solid var(--dsw-alias-border-l1)", fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--dsw-alias-label-secondary)" },
      };

      function Panel() {
        var openState = React.useState(store.get());
        var open = openState[0];
        var setOpen = openState[1];
        React.useEffect(() => store.subscribe(setOpen), []);
        if (!open) return null;
        return React.createElement(
          "div",
          { "data-weniger-panel": "1", role: "dialog", "aria-label": "Weniger — Zehn Grundsätze guter Gestaltung", style: STYLES.panel },
          React.createElement("div", { style: STYLES.header },
            React.createElement("span", { style: STYLES.square }),
            React.createElement("div", { style: { flex: 1, minWidth: 0 } },
              React.createElement("div", { style: STYLES.title }, "Weniger, aber besser"),
              React.createElement("div", { style: STYLES.subtitle }, "Zehn Grundsätze guter Gestaltung · Dieter Rams")
            ),
            React.createElement("button", { onClick: () => store.set(false), "aria-label": "关闭 Close", style: STYLES.close }, "✕")
          ),
          React.createElement("ol", { style: STYLES.list },
            PRINCIPLES.map((entry, i) =>
              React.createElement("li", { key: i, style: STYLES.item },
                React.createElement("span", { style: STYLES.num }, String(i + 1).padStart(2, "0")),
                React.createElement("span", { style: { flex: 1, minWidth: 0 } },
                  React.createElement("span", { style: STYLES.de }, entry[0]),
                  React.createElement("span", { style: STYLES.zh }, entry[1])
                )
              )
            )
          ),
          React.createElement("div", { style: STYLES.foot }, "«Gutes Design ist so wenig Design wie möglich.»")
        );
      }

      slots.inject("sidebar.footer.action", () => slots.register(
        { name: "sidebar.footer.action", id: "weniger", order: 100, label: "Weniger" },
        (props) => Chip(props)
      ));
      slots.inject("shell.overlay", () => slots.register(
        { name: "shell.overlay", id: "weniger", order: 100 },
        () => Panel()
      ));
    }

    var CSS = [
      '/* ============ Weniger — "Weniger, aber besser" ============ */',
      ':root {',
      "  --dsw-font-family: 'Inter', 'Helvetica Neue', Helvetica, Arial, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'Noto Sans SC', system-ui, sans-serif;",
      "  --ds-font-family-code: 'SF Mono', 'JetBrains Mono', 'IBM Plex Mono', Menlo, Consolas, 'Liberation Mono', monospace;",
      '}',
      'body, button, input, textarea, select { font-family: var(--dsw-font-family); }',
      'code, pre, kbd, samp { font-family: var(--ds-font-family-code); }',
      'body { letter-spacing: -0.006em; }',
      'body {',
      '  --dsw-static-deepseek-50: #FBF3EE; --dsw-static-deepseek-100: #F3E2D6; --dsw-static-deepseek-200: #F0C4A8;',
      '  --dsw-static-deepseek-300: #E8A87F; --dsw-static-deepseek-400: #F07B45; --dsw-static-deepseek-450: #E8541E;',
      '  --dsw-static-deepseek-500: #E8541E; --dsw-static-deepseek-600: #C94814; --dsw-static-deepseek-700-delete: #5C4436;',
      '  --dsw-static-deepseek-800: #3A322B; --dsw-static-deepseek-900: #26221E;',
      '  --dsw-static-blue-50: #F7F6F2; --dsw-static-blue-50p: #F5F4F0; --dsw-static-blue-75: #EFEDE7;',
      '  --dsw-static-blue-100: #E6E4DD; --dsw-static-blue-300: #C9C6BC; --dsw-static-blue-400: #A6A59C;',
      '  --dsw-static-blue-450: #8A8981; --dsw-static-blue-500: #6B6A63; --dsw-static-blue-600: #57544B;',
      '  --dsw-static-blue-800: #3A3935; --dsw-static-blue-900: #26241F; --dsw-static-blue-950: #1E1C19;',
      '  --dsw-static-neutral-bluish-00: #FFFFFF; --dsw-static-neutral-bluish-50: #FAFAF7; --dsw-static-neutral-bluish-60: #F1F0EB;',
      '  --dsw-static-neutral-bluish-75: #EFEDE7; --dsw-static-neutral-bluish-100: #E6E4DD; --dsw-static-neutral-bluish-150: #DEDCD3;',
      '  --dsw-static-neutral-bluish-200: #D5D3CA; --dsw-static-neutral-bluish-250: #C9C6BC; --dsw-static-neutral-bluish-300: #BDBBB2;',
      '  --dsw-static-neutral-bluish-400: #A6A59C; --dsw-static-neutral-bluish-500: #8A8981; --dsw-static-neutral-bluish-550: #77766D;',
      '  --dsw-static-neutral-bluish-600: #6B6A63; --dsw-static-neutral-bluish-700: #57544B; --dsw-static-neutral-bluish-750: #4A4941;',
      '  --dsw-static-neutral-bluish-800: #3A3935; --dsw-static-neutral-bluish-850: #2C2A26; --dsw-static-neutral-bluish-875: #26241F;',
      '  --dsw-static-neutral-bluish-900: #232220; --dsw-static-neutral-bluish-950: #1E1C19; --dsw-static-neutral-bluish-1000: #1A1917;',
      '  --dsw-static-neutral-00: #FFFFFF; --dsw-static-neutral-50: #FAFAF7; --dsw-static-neutral-100: #F1F0EB;',
      '  --dsw-static-neutral-150: #E6E4DD; --dsw-static-neutral-200: #D5D3CA; --dsw-static-neutral-250: #C9C6BC;',
      '  --dsw-static-neutral-300: #BDBBB2; --dsw-static-neutral-400: #A6A59C; --dsw-static-neutral-500: #8A8981;',
      '  --dsw-static-neutral-550: #77766D; --dsw-static-neutral-600: #6B6A63; --dsw-static-neutral-700: #57544B;',
      '  --dsw-static-neutral-800: #3A3935; --dsw-static-neutral-850: #2C2A26; --dsw-static-neutral-900: #1E1C19;',
      '  --dsw-static-neutral-1000: #1A1917;',
      '  --dsw-static-amber-100: #F3E9D9; --dsw-static-amber-400: #D9A05B; --dsw-static-amber-500: #A8621F;',
      '  --dsw-static-amber-600: #8A511A; --dsw-static-amber-900: #2B231A;',
      '  --dsw-static-green-100: #E7EEE7; --dsw-static-green-400: #7CBB84; --dsw-static-green-500: #34754A;',
      '  --dsw-static-green-900: #1F2B22;',
      '  --dsw-static-red-50: #F7EAE7; --dsw-static-red-400: #FF7A6A; --dsw-static-red-500: #E05A45;',
      '  --dsw-static-red-600: #B53D2E; --dsw-static-red-900: #3A1F1A;',
      '}',
      'body {',
      '  --dsw-alias-bg-layer-3: #E6E4DD; --dsw-alias-bg-module-platform: #EFEDE7; --dsw-alias-bg-multi-select: #ECEAE4;',
      '  --dsw-alias-bg-skeleton: rgba(26, 25, 23, 0.05); --dsw-alias-border-l2-darkmode-thin: rgba(26, 25, 23, 0.14);',
      '  --dsw-alias-border-l3: rgba(26, 25, 23, 0.28); --dsw-alias-border-l4: rgba(26, 25, 23, 0.38);',
      '  --dsw-alias-brand-primary-new-colorprimary-new-color: #E8541E; --dsw-alias-brand-text: #1A1917;',
      '  --dsw-alias-button-contrast-fill: #1A1917; --dsw-alias-button-elevated-fill: #FFFFFF;',
      '  --dsw-alias-button-floating-fill: #FFFFFF; --dsw-alias-button-floating-hover: #F1EFE9;',
      '  --dsw-alias-button-ghost-active-border: #6B6A63; --dsw-alias-button-ghost-active-fill: #ECEAE4;',
      '  --dsw-alias-button-ghost-active-hover: #F1F0EB; --dsw-alias-button-info-fill: #E8541E;',
      '  --dsw-alias-button-info-hover: #C94814; --dsw-alias-button-primary-dimmed: #ECEAE4;',
      '  --dsw-alias-button-primary-hover: #3A3935; --dsw-alias-interactive-bg-active: rgba(26, 25, 23, 0.08);',
      '  --dsw-alias-interactive-bg-hover-accent: rgba(232, 84, 30, 0.10); --dsw-alias-interactive-bg-hover-danger: rgba(181, 61, 46, 0.06);',
      '  --dsw-alias-interactive-bg-hover-solid: #ECEAE4; --dsw-alias-interactive-bg-hover: rgba(26, 25, 23, 0.05);',
      '  --dsw-alias-label-caption: #A6A59C; --dsw-alias-label-dimmed: #D5D3CA; --dsw-alias-label-primary-bluish: #1A1917;',
      '  --dsw-alias-label-primary-dimmed: #3A3935; --dsw-alias-label-primary-foreground: #FFFFFF;',
      '  --dsw-alias-label-primary-inverted: #FFFFFF; --dsw-alias-label-tertiary: #8A8981;',
      '  --dsw-alias-markdown-citation: #EFEDE7; --dsw-alias-markdown-code-block-banner: #F7F6F2;',
      '  --dsw-alias-markdown-code-block: #F7F6F2; --dsw-alias-markdown-code-segment-selected: #FFFFFF;',
      '  --dsw-alias-markdown-code-segment-unselected: #EFEDE7; --dsw-alias-markdown-inline-code: #EFEDE7;',
      '  --dsw-alias-markdown-placeholder: #F1F0EB; --dsw-alias-markdown-tag: #E6E4DD;',
      '  --dsw-alias-scrollbar-bg-l1: #D9D7CF; --dsw-alias-scrollbar-bg-l2: #D9D7CF;',
      '  --dsw-alias-scrollbar-hover-l1: #BDBBB2; --dsw-alias-scrollbar-hover-l2: #BDBBB2;',
      '  --dsw-alias-state-business-primary: #E8541E; --dsw-alias-state-business-tertiary: rgba(232, 84, 30, 0.10);',
      '  --dsw-alias-state-success-tertiary: #E7EEE7; --dsw-alias-state-warn-tertiary: #F3E9D9;',
      '  --dsw-alias-toast-bg: #23221F; --dsw-alias-tooltip-bg: #23221F;',
      '  --dsw-specific-bubble-highlight: rgba(232, 84, 30, 0.20); --dsw-specific-bubble: #FBFAF7;',
      '  --dsw-specific-input-major: #FFFFFF; --dsw-specific-login-input: #F5F4F0; --dsw-specific-menu: #FFFFFF;',
      '  --dsw-specific-selector: #ECEAE4; --dsw-specific-sidebar-nav-item-active-accent: #E8541E;',
      '  --dsw-specific-sidebar-nav-item-active: #E6E4DD; --dsw-specific-sidebar-nav-item-hover: #F1F0EB;',
      '  --dsw-specific-tip: #F1F0EB; --dsw-shadow-lv1: none; --dsw-shadow-lv2: none; --dsw-shadow-lv3: none;',
      '}',
      'body[data-ds-dark-theme] {',
      '  --dsw-alias-border-l2-darkmode-thin: rgba(242, 239, 232, 0.10); --dsw-alias-bg-layer-3: #232220;',
      '  --dsw-alias-bg-module-platform: #26241F; --dsw-alias-bg-multi-select: #2C2A26;',
      '  --dsw-alias-bg-skeleton: rgba(242, 239, 232, 0.08); --dsw-alias-border-l3: rgba(242, 239, 232, 0.20);',
      '  --dsw-alias-border-l4: rgba(242, 239, 232, 0.26); --dsw-alias-brand-primary-new-colorprimary-new-color: #FF6B35;',
      '  --dsw-alias-brand-text: #F2EFE8; --dsw-alias-button-contrast-fill: #F2EFE8;',
      '  --dsw-alias-button-elevated-fill: #26241F; --dsw-alias-button-floating-fill: #232220;',
      '  --dsw-alias-button-floating-hover: #2C2A26; --dsw-alias-button-ghost-active-border: #ABA89E;',
      '  --dsw-alias-button-ghost-active-fill: #2C2A26; --dsw-alias-button-ghost-active-hover: #26241F;',
      '  --dsw-alias-button-info-fill: #FF6B35; --dsw-alias-button-info-hover: #FF8252;',
      '  --dsw-alias-button-primary-dimmed: #2C2A26; --dsw-alias-button-primary-hover: #3A3833;',
      '  --dsw-alias-interactive-bg-active: rgba(242, 239, 232, 0.14); --dsw-alias-interactive-bg-hover-accent: rgba(255, 107, 53, 0.18);',
      '  --dsw-alias-interactive-bg-hover-danger: rgba(255, 107, 94, 0.14); --dsw-alias-interactive-bg-hover-solid: #2C2A26;',
      '  --dsw-alias-interactive-bg-hover: rgba(242, 239, 232, 0.08); --dsw-alias-label-caption: #6E6C64;',
      '  --dsw-alias-label-dimmed: #57554E; --dsw-alias-label-primary-bluish: #F2EFE8;',
      '  --dsw-alias-label-primary-dimmed: #C9C6BC; --dsw-alias-label-primary-foreground: #1C1A17;',
      '  --dsw-alias-label-primary-inverted: #1C1A17; --dsw-alias-label-tertiary: #8F8D83;',
      '  --dsw-alias-markdown-citation: #26241F; --dsw-alias-markdown-code-block-banner: #1E1C19;',
      '  --dsw-alias-markdown-code-block: #1E1C19; --dsw-alias-markdown-code-segment-selected: #232220;',
      '  --dsw-alias-markdown-code-segment-unselected: #1E1C19; --dsw-alias-markdown-inline-code: #26241F;',
      '  --dsw-alias-markdown-placeholder: #26241F; --dsw-alias-markdown-tag: #232220;',
      '  --dsw-alias-scrollbar-bg-l1: #57544B; --dsw-alias-scrollbar-bg-l2: #57544B;',
      '  --dsw-alias-scrollbar-hover-l1: #6B675D; --dsw-alias-scrollbar-hover-l2: #6B675D;',
      '  --dsw-alias-state-business-primary: #FF6B35; --dsw-alias-state-business-tertiary: rgba(255, 107, 53, 0.16);',
      '  --dsw-alias-state-success-tertiary: #22302A; --dsw-alias-state-warn-tertiary: #33291C;',
      '  --dsw-alias-toast-bg: #0F0E0C; --dsw-alias-tooltip-bg: #0F0E0C;',
      '  --dsw-specific-bubble-highlight: rgba(255, 107, 53, 0.22); --dsw-specific-bubble: #232220;',
      '  --dsw-specific-input-major: #232220; --dsw-specific-login-input: #1E1C19; --dsw-specific-menu: #232220;',
      '  --dsw-specific-selector: #2C2A26; --dsw-specific-sidebar-nav-item-active-accent: #FF6B35;',
      '  --dsw-specific-sidebar-nav-item-active: #2C2A26; --dsw-specific-sidebar-nav-item-hover: #26241F;',
      '  --dsw-specific-tip: #26241F;',
      '}',
      ':root {',
      '  --shiki-token-constant: #C94814; --shiki-token-string: #8A511A; --shiki-token-comment: #A6A59C;',
      '  --shiki-token-keyword: #57544B; --shiki-token-parameter: #6B6A63; --shiki-token-function: #1A1917;',
      '  --shiki-token-string-expression: #8A511A; --shiki-token-punctuation: #8A8981; --shiki-token-link: #E8541E;',
      '}',
      'body[data-ds-dark-theme] {',
      '  --shiki-token-constant: #FF8252; --shiki-token-string: #E0A84C; --shiki-token-comment: #6E6C64;',
      '  --shiki-token-keyword: #C9C6BC; --shiki-token-parameter: #ABA89E; --shiki-token-function: #F2EFE8;',
      '  --shiki-token-string-expression: #E0A84C; --shiki-token-punctuation: #8F8D83; --shiki-token-link: #FF6B35;',
      '}',
      'button, input, textarea, select { border-radius: 2px; }',
      'input, textarea { border-color: var(--dsw-alias-border-l1); }',
      '.uV2eYG_card{border-radius:4px} .uV2eYG_notice{border-radius:3px} .uV2eYG_add{border-radius:4px}',
      '.uV2eYG_select{border-radius:4px} .uV2eYG_primary{border-radius:4px} .uV2eYG_chip{border-radius:3px;background:rgba(26,25,23,0.06)}',
      '.hHd-Xa_newSession{border-radius:4px} .gdEzaW_bubble{border-radius:4px;border:1px solid var(--dsw-alias-border-l1)}',
      '.gdEzaW_compactionButton{border-radius:3px} .gdEzaW_refChip{border-radius:3px;background:rgba(26,25,23,0.06)}',
      '.gdEzaW_retrySummary{border-radius:3px} .bqrRRG_card{border-radius:4px} .lXshSW_root{border-radius:4px}',
      '.Md3f7G_toBottom{border-radius:4px} .Md3f7G_callRow{border-radius:3px} .ztWv_q_callRow{border-radius:3px}',
      '.Md3f7G_older button{border-radius:4px} .JObwrW_panel{border-radius:4px} .JObwrW_trigger{border-radius:4px}',
      '.T1PP_q_selector{border-radius:4px} .p-xYUq_action{border-radius:4px} .Sh0Q9G_trigger{border-radius:4px}',
      '.pC0e7a_body{border-radius:4px} .ydkMvW_code{border-radius:4px} .ydkMvW_close{border-radius:4px}',
      '.CY-8Ka_ioCard{border-radius:4px} .o3BgMG_ioCard{border-radius:4px} .xDAfVq_code{border-radius:4px}',
      '.CY-8Ka_inspectButton{border-radius:4px} .o3BgMG_inspectButton{border-radius:4px} .cvtE3a_output{border-radius:4px}',
      '.Nqubda_badge{border-radius:4px} .Nqubda_rail .Nqubda_badge{border-radius:4px}',
      'button { transition: filter 0.12s ease; }',
      'button:hover { filter: brightness(0.965); }',
      'button:active { filter: brightness(0.92); }',
      ':focus-visible { outline: 2px solid var(--dsw-alias-brand-primary); outline-offset: 1px; }',
      '::selection { background: rgba(232, 84, 30, 0.2); }',
      '@supports (color: color-mix(in srgb, red 20%, transparent)) {',
      '  ::selection { background: color-mix(in srgb, var(--dsw-alias-brand-primary) 20%, transparent); }',
      '}',
      '::-webkit-scrollbar { width: 10px; height: 10px; }',
      '::-webkit-scrollbar-track { background: transparent; }',
      '::-webkit-scrollbar-thumb { background: var(--dsw-alias-border-l2); border: 3px solid transparent; background-clip: content-box; }',
      '::-webkit-scrollbar-thumb:hover { background: var(--dsw-alias-label-secondary); border: 3px solid transparent; background-clip: content-box; }',
      'a { text-decoration-color: var(--dsw-alias-border-l2); }',
      'a:hover { text-decoration-color: var(--dsw-alias-brand-primary); }',
      '[class*="_footerActions"] { flex-wrap: wrap; }',
      'button[data-weniger-chip] { border: 0 !important; border-radius: 2px; background: transparent !important; -webkit-appearance: none; appearance: none; }',
      'button[data-weniger-chip]:hover { background: var(--dsw-alias-interactive-bg-hover) !important; }',
    ].join("\n");

    exports.apply = apply;
    return module.exports;
  }
});
