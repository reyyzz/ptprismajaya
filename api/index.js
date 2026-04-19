import { createApp } from '../app.js'

const appPromise = createApp({ isProd: true })

export default async function handler(req, res) {
  const app = await appPromise
  return app(req, res)
}
