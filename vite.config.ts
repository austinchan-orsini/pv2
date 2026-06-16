import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { existsSync, readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))

function localApiPlugin(): Plugin {
  return {
    name: 'local-api',
    configureServer(server) {
      // Load .env.local into process.env so handlers can read secrets
      const envFile = resolve(__dirname, '.env.local')
      if (existsSync(envFile)) {
        for (const line of readFileSync(envFile, 'utf-8').split('\n')) {
          const eqIdx = line.indexOf('=')
          if (eqIdx === -1 || line.trimStart().startsWith('#')) continue
          const key = line.slice(0, eqIdx).trim()
          let val = line.slice(eqIdx + 1).trim()
          if (
            (val.startsWith('"') && val.endsWith('"')) ||
            (val.startsWith("'") && val.endsWith("'"))
          ) {
            val = val.slice(1, -1)
          }
          if (key && process.env[key] === undefined) process.env[key] = val
        }
      }

      // Handle /api/<route> by dynamically loading the handler file
      server.middlewares.use('/api', async (req, res, next) => {
        const route = (req.url ?? '/').split('?')[0].replace(/^\//, '')
        if (!route) { next(); return }

        const handlerFile = resolve(__dirname, 'api', `${route}.ts`)
        if (!existsSync(handlerFile)) { next(); return }

        try {
          const mod = await server.ssrLoadModule(`/api/${route}.ts`)
          const handler: unknown = mod.default
          if (typeof handler !== 'function') { next(); return }

          // Minimal shim matching what @vercel/node provides
          const vReq = Object.assign(req, { query: {}, cookies: {}, body: undefined })
          let ended = false
          const vRes = Object.assign(res, {
            status(code: number) { res.statusCode = code; return vRes },
            json(data: unknown) {
              if (!ended) {
                ended = true
                res.setHeader('Content-Type', 'application/json')
                res.end(JSON.stringify(data))
              }
              return vRes
            },
            send(data: unknown) {
              if (!ended) { ended = true; res.end(String(data)) }
              return vRes
            },
          })

          await handler(vReq, vRes)
        } catch (err) {
          console.error(`[api/${route}]`, err)
          if (!res.headersSent) {
            res.statusCode = 500
            res.end(JSON.stringify({ error: 'Internal server error' }))
          }
        }
      })
    },
  }
}

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    localApiPlugin(),
  ],
})
