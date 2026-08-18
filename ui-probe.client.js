// UI Review Probe for the Rams theme work — dynamic Cordis plugin `uiprb-2`, client half.
// Deployed version: pkg-16 (v9). Every 2s it pushes computed styles / token values / layout
// geometry of the live page to the host (report -> ~/ui-probe.json). Once, it screenshots
// the page: Snapdom first (same-origin /assets/snapdom.js), html-to-image fallback
// (/assets/html-to-image.js), payload -> ~/ui-shot.b64 via host.
return {
  inject: ['timer'],
  apply(ctx) {
    const ROOT_TOKENS = [
      '--dsw-alias-bg-base', '--dsw-alias-brand-primary', '--dsw-alias-label-primary',
      '--dsw-specific-sidebar-fill', '--dsw-font-family',
    ]
    const BODY_TOKENS = [
      '--dsw-alias-markdown-code-block', '--dsw-specific-bubble', '--dsw-alias-button-info-fill',
      '--dsw-alias-state-business-primary', '--dsw-specific-sidebar-nav-item-active-accent',
      '--dsw-alias-interactive-bg-hover', '--dsw-shadow-lv2', '--dsw-alias-border-l2',
      '--dsw-specific-input-major', '--dsw-alias-markdown-inline-code',
      '--dsw-static-deepseek-500', '--dsw-static-blue-450', '--dsw-static-neutral-bluish-100',
    ]

    const shotInfo = { state: 'pending' }

    const ENGINES = [
      {
        lib: 'snapdom',
        src: 'http://127.0.0.1:3080/assets/snapdom.js',
        ready: () => typeof window.snapdom === 'object' && typeof window.snapdom.toCanvas === 'function',
        render: async () => {
          const canvas = await window.snapdom.toCanvas(document.body, { scale: 0.5, backgroundColor: '#F5F4F0', embedFonts: false })
          return canvas.toDataURL('image/jpeg', 0.72)
        },
      },
      {
        lib: 'html-to-image',
        src: 'http://127.0.0.1:3080/assets/html-to-image.js',
        ready: () => typeof window.htmlToImage === 'object' && typeof window.htmlToImage.toJpeg === 'function',
        render: async () => window.htmlToImage.toJpeg(document.body, { quality: 0.75, pixelRatio: 0.5, skipFonts: true }),
      },
    ]

    function elInfo(el) {
      if (el === null || el === undefined) return null
      const cs = window.getComputedStyle(el)
      const r = el.getBoundingClientRect()
      return {
        tag: el.tagName,
        cls: String(el.className || '').slice(0, 100),
        rect: { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) },
        background: cs.backgroundColor,
        color: cs.color,
        borderTop: cs.borderTopWidth + ' ' + cs.borderTopColor,
        borderLeft: cs.borderLeftWidth + ' ' + cs.borderLeftColor,
        borderRadius: cs.borderRadius,
        boxShadow: cs.boxShadow.slice(0, 80),
        font: cs.fontFamily.slice(0, 80),
        fontSize: cs.fontSize,
        display: cs.display,
        flexDirection: cs.flexDirection,
        justifyContent: cs.justifyContent,
        alignItems: cs.alignItems,
        padding: cs.padding,
        width: cs.width,
        height: cs.height,
      }
    }

    function ancestorsOf(el, n) {
      const out = []
      let node = el
      for (let i = 0; i < n; i++) {
        node = node ? node.parentElement : null
        if (node === null) break
        const cs = window.getComputedStyle(node)
        const r = node.getBoundingClientRect()
        out.push({
          tag: node.tagName,
          cls: String(node.className || '').slice(0, 80),
          rect: { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) },
          display: cs.display,
          flexDirection: cs.flexDirection,
          justifyContent: cs.justifyContent,
          alignItems: cs.alignItems,
          background: cs.backgroundColor,
        })
      }
      return out
    }

    function childrenOf(el, n) {
      if (el === null || el === undefined) return []
      const list = Array.from(el.children).slice(0, n)
      return list.map((child) => {
        const cs = window.getComputedStyle(child)
        const r = child.getBoundingClientRect()
        return {
          tag: child.tagName,
          cls: String(child.className || '').slice(0, 60),
          rect: { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) },
          display: cs.display,
          flexDirection: cs.flexDirection,
          background: cs.backgroundColor,
        }
      })
    }

    function gather() {
      const data = {
        at: Date.now(),
        viewport: { w: window.innerWidth, h: window.innerHeight, dpr: window.devicePixelRatio },
        scheme: (typeof window.matchMedia === 'function' && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light',
        rootVars: {},
        bodyVars: {},
        body: null,
        chip: null,
        chipAncestors: [],
        chipRow: [],
        panel: null,
        bubble: null,
        sendButton: null,
        composer: null,
        codeBlock: null,
        shot: shotInfo,
      }
      const root = window.getComputedStyle(document.documentElement)
      for (const name of ROOT_TOKENS) data.rootVars[name] = root.getPropertyValue(name).trim().slice(0, 120)
      const bcs = window.getComputedStyle(document.body)
      for (const name of BODY_TOKENS) data.bodyVars[name] = bcs.getPropertyValue(name).trim()
      data.body = {
        background: bcs.backgroundColor,
        color: bcs.color,
        font: bcs.fontFamily.slice(0, 100),
        fontSize: bcs.fontSize,
        letterSpacing: bcs.letterSpacing,
      }
      const chip = document.querySelector('[data-rams-chip]')
      if (chip !== null) {
        data.chip = elInfo(chip)
        data.chipAncestors = ancestorsOf(chip, 4)
        data.chipRow = childrenOf(chip.parentElement, 8)
      }
      const panel = document.querySelector('[data-rams-panel]')
      if (panel !== null) data.panel = elInfo(panel)
      const bubble = document.querySelector('[class*="gdEzaW_bubble"]')
      if (bubble !== null) data.bubble = elInfo(bubble)
      const send = document.querySelector('[class*="uV2eYG_primary"]')
      if (send !== null) data.sendButton = elInfo(send)
      const composer = document.querySelector('[class*="uV2eYG_card"]')
      if (composer !== null) data.composer = elInfo(composer)
      const codeBlock = document.querySelector('[class*="ydkMvW_code"], pre')
      if (codeBlock !== null) data.codeBlock = elInfo(codeBlock)
      return data
    }

    async function pushReport() {
      try { await host.call('report', gather()) } catch (err) { /* silent */ }
    }

    async function loadScript(src) {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script')
        script.src = src
        script.onload = () => resolve()
        script.onerror = () => reject(new Error('load failed: ' + src))
        document.head.appendChild(script)
      })
    }

    async function tryShot() {
      if (shotInfo.state === 'rendering' || shotInfo.state === 'saved' || shotInfo.state === 'error') return
      for (let i = 0; i < ENGINES.length; i++) {
        const engine = ENGINES[i]
        if (!engine.ready()) {
          if (shotInfo.loading === engine.lib) continue
          shotInfo.loading = engine.lib
          shotInfo.state = 'injecting'
          try { await loadScript(engine.src) } catch (err) {
            shotInfo.message = engine.lib + ': ' + String((err && err.message) || err)
            shotInfo.loading = engine.lib + '-failed'
            shotInfo.state = 'retrying'
            continue
          }
        }
        shotInfo.state = 'rendering'
        try {
          const url = await engine.render()
          const ok = await host.call('shot', { data: url, engine: engine.lib })
          shotInfo.state = ok && ok.ok ? 'saved' : 'sent'
          shotInfo.engine = engine.lib
          return
        } catch (err) {
          shotInfo.message = engine.lib + ' render failed: ' + String((err && err.message) || err).slice(0, 160)
          shotInfo.loading = engine.lib + '-render-failed'
          shotInfo.state = 'retrying'
        }
      }
      shotInfo.state = 'error'
    }

    ctx.effect(() => {
      const stopInterval = ctx.interval(() => { pushReport() }, 2000)
      const stopTimeout = ctx.timeout(() => { tryShot() }, 1200)
      pushReport()
      return () => { stopInterval(); stopTimeout() }
    })
  },
}
