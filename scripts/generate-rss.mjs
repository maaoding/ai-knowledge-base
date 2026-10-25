import { readdir, readFile, writeFile } from 'node:fs/promises'
import { join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { spawnSync } from 'node:child_process'

const root = resolve(fileURLToPath(new URL('..', import.meta.url)))
const docsDir = join(root, 'docs')
const distDir = join(docsDir, '.vitepress', 'dist')
const siteUrl = 'https://ai-knowledge-base.maaoding.icu'
const siteName = 'AI 综合知识库'
const siteDescription = '面向零基础用户的 AI 基础、LLM 理论、Prompt、工具与 AI 绘画知识库'
const maxItems = 20

// RSS 只收录教程文章页；导航、清单与工具页更新不进订阅源
const excludedFromRss = new Set([
  'glossary.md',
  'guide/getting-started.md',
  'resources/tutorials.md',
  'resources/websites.md'
])

function gitLastCommitDate(file) {
  const result = spawnSync('git', ['log', '-1', '--format=%aI', '--', file], {
    cwd: root,
    encoding: 'utf8'
  })
  const date = result.status === 0 ? result.stdout.trim() : ''
  return date || new Date().toISOString()
}

function parseFrontmatter(text) {
  const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---/)
  if (!match) return {}
  const frontmatter = {}
  for (const line of match[1].split(/\r?\n/)) {
    const pair = line.match(/^(\w[\w-]*):\s*(.*)$/)
    if (!pair) continue
    frontmatter[pair[1]] = pair[2].trim().replace(/^['"]|['"]$/g, '')
  }
  return frontmatter
}

function extractTitle(text, fallback) {
  const frontmatter = text.match(/^---\r?\n([\s\S]*?)\r?\n---/)
  if (frontmatter) {
    const titleLine = frontmatter[1].match(/^title:\s*(.+)$/m)
    if (titleLine) return titleLine[1].trim().replace(/^['"]|['"]$/g, '')
  }
  const h1 = text.match(/^#\s+(.+)$/m)
  return h1 ? h1[1].trim() : fallback
}

function escapeXml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

async function listMarkdownFiles(dir) {
  const files = []
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (entry.name.startsWith('.')) continue
    const full = join(dir, entry.name)
    if (entry.isDirectory()) {
      files.push(...(await listMarkdownFiles(full)))
    } else if (entry.name.endsWith('.md') && entry.name !== 'index.md') {
      files.push(full)
    }
  }
  return files
}

const mdFiles = await listMarkdownFiles(docsDir)
const items = []

for (const file of mdFiles) {
  const text = await readFile(file, 'utf8')
  const frontmatter = parseFrontmatter(text)
  const relativePath = file.slice(docsDir.length + 1).replace(/\\/g, '/')
  if (excludedFromRss.has(relativePath)) continue
  const route = relativePath.replace(/\.md$/, '')
  const title = extractTitle(text, route)
  items.push({
    title,
    description: frontmatter.description || '',
    link: `${siteUrl}/${route}`,
    pubDate: gitLastCommitDate(`docs/${relativePath}`)
  })
}

// 同一提交时间的条目按路径排序，保证批次提交时选出的 20 篇是确定的
items.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate) || a.link.localeCompare(b.link))
const selected = items.slice(0, maxItems)

const rssItems = selected
  .map(
    (item) => [
      '    <item>',
      `      <title>${escapeXml(item.title)}</title>`,
      `      <link>${escapeXml(item.link)}</link>`,
      `      <guid isPermaLink="true">${escapeXml(item.link)}</guid>`,
      `      <description>${escapeXml(item.description)}</description>`,
      `      <pubDate>${new Date(item.pubDate).toUTCString()}</pubDate>`,
      '    </item>'
    ].join('\n')
  )
  .join('\n')

const rss = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
  '  <channel>',
  `    <title>${escapeXml(siteName)}</title>`,
  `    <link>${escapeXml(siteUrl)}/</link>`,
  `    <description>${escapeXml(siteDescription)}</description>`,
  '    <language>zh-CN</language>',
  `    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>`,
  `    <atom:link href="${escapeXml(siteUrl)}/rss.xml" rel="self" type="application/rss+xml" />`,
  rssItems,
  '  </channel>',
  '</rss>',
  ''
].join('\n')

await writeFile(join(distDir, 'rss.xml'), rss, 'utf8')
console.log(`RSS generated: ${selected.length} items -> dist/rss.xml`)
