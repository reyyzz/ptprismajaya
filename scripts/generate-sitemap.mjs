import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import {
  chooseReasons,
  clientLogos,
  coreValues,
  galleryProjects,
  heroSlides,
  serviceTeam,
} from '../src/data/siteData.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.resolve(__dirname, '..')

const siteUrl = (process.env.SITE_URL || 'https://prismacahayalestari.com').replace(/\/$/, '')
const lastmod = new Date().toISOString().slice(0, 10)

function xmlEscape(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function toAbsoluteUrl(urlPath) {
  if (urlPath.startsWith('http://') || urlPath.startsWith('https://')) {
    return urlPath
  }
  return `${siteUrl}${urlPath.startsWith('/') ? '' : '/'}${urlPath}`
}

function dedupeImages(images) {
  const byLoc = new Map()
  for (const image of images) {
    const absoluteLoc = toAbsoluteUrl(image.loc)
    if (!byLoc.has(absoluteLoc)) {
      byLoc.set(absoluteLoc, {
        loc: absoluteLoc,
        title: image.title,
        caption: image.caption,
      })
    }
  }
  return [...byLoc.values()]
}

function makeImageNode(image) {
  const absoluteImageLoc = toAbsoluteUrl(image.loc)
  const title = image.title ? `\n      <image:title>${xmlEscape(image.title)}</image:title>` : ''
  const caption = image.caption ? `\n      <image:caption>${xmlEscape(image.caption)}</image:caption>` : ''

  return `    <image:image>\n      <image:loc>${xmlEscape(absoluteImageLoc)}</image:loc>${title}${caption}\n    </image:image>`
}

const homeImages = dedupeImages([
  ...heroSlides.map((item) => ({ loc: item.image, title: item.alt })),
  ...clientLogos.map((item) => ({ loc: item.path, title: item.name })),
  ...chooseReasons.map((item) => ({ loc: item.image, title: item.text })),
  ...coreValues.map((item) => ({ loc: item.image, title: `${item.title} - PT. Prisma Cahaya Lestari` })),
])

const serviceImages = dedupeImages(
  serviceTeam.map((item) => ({ loc: item.image, title: item.title })),
)

const galleryImages = dedupeImages(
  galleryProjects.flatMap((project) =>
    project.images.map((imagePath, index) => ({
      loc: imagePath,
      title: `${project.title} - Photo ${index + 1}`,
      caption: project.title,
    })),
  ),
)

const pages = [
  {
    loc: '/',
    changefreq: 'weekly',
    priority: '1.0',
    images: homeImages,
  },
  {
    loc: '/profile/about-us',
    changefreq: 'monthly',
    priority: '0.9',
    images: homeImages.slice(0, 3),
  },
  {
    loc: '/profile/service',
    changefreq: 'monthly',
    priority: '0.9',
    images: serviceImages,
  },
  {
    loc: '/gallery',
    changefreq: 'weekly',
    priority: '0.9',
    images: galleryImages,
  },
  {
    loc: '/contacts',
    changefreq: 'monthly',
    priority: '0.8',
    images: [{ loc: '/assets/images/brand/logo-prisma.svg', title: 'PT. Prisma Cahaya Lestari Logo' }],
  },
]

const urlEntries = pages
  .map((page) => {
    const imageNodes = page.images.map(makeImageNode).join('\n')

    return `  <url>\n    <loc>${xmlEscape(toAbsoluteUrl(page.loc))}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${page.changefreq}</changefreq>\n    <priority>${page.priority}</priority>${imageNodes ? `\n${imageNodes}` : ''}\n  </url>`
  })
  .join('\n')

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${urlEntries}\n</urlset>\n`

await fs.writeFile(path.join(projectRoot, 'public', 'sitemap.xml'), xml)
console.log(`Generated sitemap with ${pages.length} URLs for ${siteUrl}`)
