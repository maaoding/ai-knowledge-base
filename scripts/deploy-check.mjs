import { readdir, readFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { join, resolve, dirname, relative, sep } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(fileURLToPath(new URL('..', import.meta.url)))
const distDir = join(root, 'docs', '.vitepress', 'dist')
const expectedDomain = 'ai-knowledge-base.maaoding.icu'

const required = ['index.html', 'CNAME', '.nojekyll', 'robots.txt', 'sitemap.xml', 'rss.xml']

for (const file of required) {
  if (!existsSync(join(distDir, file))) {
    throw new Error(`Missing required Pages file in dist: ${file}`)
  }
}

const cname = (await readFile(join(distDir, 'CNAME'), 'utf8')).trim()
if (cname !== expectedDomain) {
  throw new Error(`Unexpected CNAME: ${cname}`)
}

async function listFiles(dir, base = dir) {
  const entries = []
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) {
      entries.push(...(await listFiles(full, base)))
    } else {
      entries.push(relative(base, full).split(sep).join('/'))
    }
  }
  return entries
}

const distFiles = await listFiles(distDir)
const distFileSet = new Set(distFiles)
const htmlFiles = distFiles.filter((file) => file.endsWith('.html'))

// cleanUrls 下 /a/b 对应 a/b.html，目录链接对应 index.html；返回产物内相对路径，找不到返回 null
function resolveTarget(rawTarget) {
  let target = rawTarget
  try {
    target = decodeURIComponent(target)
  } catch {
    // 保留原样继续
  }
  target = target.split('?')[0]

  const normalized = target.replace(/^\/+/, '').replace(/\/+$/, '')
  if (normalized === '') return 'index.html'

  if (distFileSet.has(normalized)) return normalized
  if (distFileSet.has(`${normalized}.html`)) return `${normalized}.html`
  const index = join(normalized, 'index.html').split(sep).join('/')
  if (distFileSet.has(index)) return index
  return null
}

const idCache = new Map()
async function headingIds(file) {
  if (!idCache.has(file)) {
    const html = await readFile(join(distDir, file), 'utf8')
    const ids = new Set()
    const idPattern = /\sid="([^"]+)"/g
    let match
    while ((match = idPattern.exec(html)) !== null) {
      ids.add(match[1].replace(/&amp;/g, '&'))
    }
    idCache.set(file, ids)
  }
  return idCache.get(file)
}

function extractLinks(html) {
  const links = []
  const attributePattern = /(?:href|src|poster|srcset)\s*=\s*"([^"]*)"/g
  let match
  while ((match = attributePattern.exec(html)) !== null) {
    for (const candidate of match[1].split(',')) {
      const url = candidate.trim().split(/\s+/)[0]
      if (url) links.push(url)
    }
  }
  return links
}

const broken = []
const brokenAnchors = []
let anchorsChecked = 0

for (const file of htmlFiles) {
  const html = await readFile(join(distDir, file), 'utf8')
  for (const link of extractLinks(html)) {
    if (/^(https?:)?\/\//i.test(link)) continue
    if (/^(mailto|tel|data|javascript):/i.test(link)) continue

    const hashIndex = link.indexOf('#')
    const rawFragment = hashIndex === -1 ? '' : link.slice(hashIndex + 1).split('?')[0]
    const pathPart = hashIndex === -1 ? link : link.slice(0, hashIndex)

    const target = pathPart === ''
      ? file
      : (pathPart.startsWith('/') ? pathPart : join(dirname(file), pathPart).split(sep).join('/'))
    const resolved = resolveTarget(target)

    if (resolved === null) {
      broken.push(`${file} -> ${link}`)
      continue
    }

    if (rawFragment === '' || !resolved.endsWith('.html')) continue

    let fragment = rawFragment
    try {
      fragment = decodeURIComponent(rawFragment)
    } catch {
      // 保留原样继续
    }

    anchorsChecked += 1
    const ids = await headingIds(resolved)
    if (!ids.has(fragment) && !ids.has(rawFragment)) {
      brokenAnchors.push(`${file} -> ${link}（${resolved} 中不存在 id "${fragment}"）`)
    }
  }
}

if (broken.length > 0) {
  throw new Error(`Broken local links found (${broken.length}):\n${broken.join('\n')}`)
}

if (brokenAnchors.length > 0) {
  throw new Error(`Broken anchor fragments found (${brokenAnchors.length}):\n${brokenAnchors.join('\n')}`)
}

console.log(
  `Deploy check passed: ${required.length} required files, ${htmlFiles.length} pages, ${distFiles.length} dist files, 0 broken local links, 0 broken anchors (${anchorsChecked} fragments checked).`
)
