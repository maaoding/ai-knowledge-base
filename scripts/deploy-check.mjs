import { readdir, readFile } from 'node:fs/promises'
import { existsSync, statSync } from 'node:fs'
import { join, resolve, dirname, relative, sep } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(fileURLToPath(new URL('..', import.meta.url)))
const distDir = join(root, 'docs', '.vitepress', 'dist')
const expectedDomain = 'ai-knowledge-base.maaoding.icu'

const required = ['index.html', 'CNAME', '.nojekyll', 'robots.txt', 'sitemap.xml']

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

// cleanUrls 下 /a/b 对应 a/b.html，目录链接对应 index.html
function linkTargetExists(rawTarget) {
  let target = rawTarget
  try {
    target = decodeURIComponent(target)
  } catch {
    // 保留原样继续
  }
  target = target.split('#')[0].split('?')[0]
  if (target === '') return distFileSet.has('index.html')

  const normalized = target.replace(/^\/+/, '').replace(/\/+$/, '')
  if (normalized === '') return distFileSet.has('index.html')

  if (distFileSet.has(normalized)) return true
  if (distFileSet.has(`${normalized}.html`)) return true
  if (distFileSet.has(join(normalized, 'index.html').split(sep).join('/'))) return true
  return false
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
for (const file of htmlFiles) {
  const html = await readFile(join(distDir, file), 'utf8')
  for (const link of extractLinks(html)) {
    if (/^(https?:)?\/\//i.test(link)) continue
    if (/^(mailto|tel|data|javascript):/i.test(link)) continue
    if (link.startsWith('#')) continue

    const target = link.startsWith('/')
      ? link
      : join(dirname(file), link).split(sep).join('/')

    if (!linkTargetExists(target)) {
      broken.push(`${file} -> ${link}`)
    }
  }
}

if (broken.length > 0) {
  throw new Error(`Broken local links found (${broken.length}):\n${broken.join('\n')}`)
}

console.log(`Deploy check passed: ${required.length} required files, ${htmlFiles.length} pages, ${distFiles.length} dist files, 0 broken local links.`)
