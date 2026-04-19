import { createApp } from './app.js'

const isProd = process.env.NODE_ENV === 'production'
const port = Number(process.env.PORT) || 5173
const app = await createApp({ isProd })

app.listen(port, () => {
  console.log(`SSR server running at http://localhost:${port}`)
})
