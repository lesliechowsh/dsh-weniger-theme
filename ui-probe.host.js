// UI Review Probe for the Rams theme work — dynamic Cordis plugin `uiprb-2`, host half.
// Deployed version: pkg-13 (v8). Persists the page report to ~/ui-probe.json and the
// screenshot payload to ~/ui-shot.b64; also registers the model tool `ui_probe`.
return {
  apply(ctx) {
    let latest = null
    let shotState = { saved: false }

    async function writeFile(path, text) {
      const fsService = ctx.get('fs')
      if (fsService === undefined) return false
      try {
        const target = await fsService.resolve(path)
        await fsService.writeText(target, text)
        return true
      } catch (err) { return false }
    }

    harness.handle('report', (args) => {
      latest = args
      const text = typeof args === 'string' ? args : JSON.stringify(args)
      writeFile('/data/data/com.termux/files/home/ui-probe.json', text)
      return { ok: true }
    })

    harness.handle('shot', async (args) => {
      let b64 = ''
      if (args !== null && typeof args === 'object' && typeof args.data === 'string') b64 = args.data
      if (b64 === '') {
        shotState = { saved: false, error: args && args.error ? args.error : 'empty payload' }
        writeFile('/data/data/com.termux/files/home/ui-shot-status.json', JSON.stringify(shotState))
        return { ok: false }
      }
      if (b64.indexOf(',') >= 0) b64 = b64.split(',')[1]
      const ok = await writeFile('/data/data/com.termux/files/home/ui-shot.b64', b64)
      shotState = ok ? { saved: true, chars: b64.length, at: Date.now() } : { saved: false, error: 'fs write failed' }
      writeFile('/data/data/com.termux/files/home/ui-shot-status.json', JSON.stringify(shotState))
      return { ok, chars: b64.length }
    })

    const tool = harness.defineTool({
      name: 'ui_probe',
      description: 'Read the latest live UI probe report from this session browser page: computed theme tokens, typography, and layout geometry of the Dieter Rams chip and panel, plus the page-screenshot capture status.',
      parameters: {},
      output: {
        schema: { type: 'object', additionalProperties: true },
        render(args, value) {
          const text = value && value.report ? JSON.stringify(value.report) : 'no probe data yet (client pending approval or page busy)'
          return [{ type: 'text', text: 'SHOT=' + JSON.stringify(value && value.shot) + '\n' + text.slice(0, 6000) }]
        },
      },
      execute: async () => ({ report: latest, shot: shotState }),
    })
    harness.registerTool(ctx, tool)
  },
}
