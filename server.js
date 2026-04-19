import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import express from 'express'

const isProd = process.env.NODE_ENV === 'production'
const port = Number(process.env.PORT) || 5173
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const resolve = (filePath) => path.resolve(__dirname, filePath)

async function createServer() {
  const app = express()
  let vite

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite')
    vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'custom',
    })
    app.use(vite.middlewares)
  } else {
    app.use(
      '/assets',
      express.static(resolve('dist/client/assets'), {
        immutable: true,
        maxAge: '1y',
      }),
    )
    app.use(express.static(resolve('dist/client'), { index: false, maxAge: '1h' }))
  }

  app.get('/profile', (_req, res) => {
    res.redirect(301, '/profile/about-us')
  })

  app.use(async (req, res, next) => {
    const url = req.originalUrl

    try {
      let template
      let render

      if (!isProd) {
        template = await fs.readFile(resolve('index.html'), 'utf-8')
        template = await vite.transformIndexHtml(url, template)
        render = (await vite.ssrLoadModule('/src/entry-server.jsx')).render
      } else {
        template = await fs.readFile(resolve('dist/client/index.html'), 'utf-8')
        render = (await import('./dist/server/entry-server.js')).render
      }

      const appHtml = await render(url)
      const html = template.replace('<!--app-html-->', appHtml)

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (error) {
      if (vite) {
        vite.ssrFixStacktrace(error)
      }
      next(error)
    }
  })

  app.listen(port, () => {
    console.log(`SSR server running at http://localhost:${port}`)
  })
}

createServer()
