import { readdir, readFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { join, resolve, relative, sep } from 'node:path'
import { fileURLToPath } from 'node:url'

// 源层内容校验：文章模板块、关联阅读理由、术语表回链与排序、文字细节。
// 只读 docs/ 下的 Markdown，不构建、不访问网络、不依赖部署域名。

const root = resolve(fileURLToPath(new URL('..', import.meta.url)))
const docsDir = join(root, 'docs')

// 非文章页整页豁免（首页与术语表不套用文章模板）
const exemptPages = new Set(['index.md', 'glossary.md'])
// 导航与清单页按块豁免：值为缺失也不报错的节名
const exemptSections = {
  'guide/getting-started.md': ['official-sources'],
  'resources/websites.md': [],
  'resources/tutorials.md': []
}

const problems = []

async function listMd(dir, base = dir, out = []) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (entry.name.startsWith('.') || entry.name === 'node_modules') continue
    const full = join(dir, entry.name)
    if (entry.isDirectory()) await listMd(full, base, out)
    else if (entry.name.endsWith('.md')) out.push(full)
  }
  return out
}

function bodyLinesWithoutCode(text) {
  const lines = text.split(/\r?\n/)
  let inFence = false
  return lines.filter((line) => {
    if (/^\s*(```|~~~)/.test(line)) {
      inFence = !inFence
      return false
    }
    return !inFence
  })
}

function sectionsOf(lines) {
  const map = new Map()
  let current = null
  for (const line of lines) {
    const heading = line.match(/^##\s+(.+)$/)
    if (heading) {
      current = heading[1].trim()
      if (!map.has(current)) map.set(current, [])
    } else if (current) {
      map.get(current).push(line)
    }
  }
  return map
}

const files = await listMd(docsDir)

for (const file of files) {
  const rel = relative(docsDir, file).split(sep).join('/')
  const text = await readFile(file, 'utf8')
  const lines = bodyLinesWithoutCode(text)

  // --- 文字细节（全部页面，含豁免页） ---
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    if (line.includes('　')) problems.push(`${rel}: 全角空格 U+3000`)
    if (/\d GB/.test(line)) problems.push(`${rel}: 数字与 GB 之间不应有空格（全站统一为如 8GB）`)
    if (/[\u4e00-\u9fff]—[\u4e00-\u9fff]/.test(line)) problems.push(`${rel}: 中文之间用了单个 — 作连接号（复合结构用 -，破折号用 ——）`)
    if (/[ \t]+$/.test(line)) problems.push(`${rel}: 行尾空格`)
  }

  if (exemptPages.has(rel)) continue

  // --- 文章模板块 ---
  const fm = text.match(/^---\r?\n([\s\S]*?)\r?\n---/)
  const fmDescription = fm ? fm[1].match(/^description:\s*(.+)$/m) : null
  if (!fmDescription || fmDescription[1].replace(/^['"]|['"]$/g, '').trim().length < 8) {
    problems.push(`${rel}: frontmatter 缺少有效 description`)
  }

  const h1 = lines.filter((l) => /^#\s+/.test(l))
  if (h1.length !== 1) problems.push(`${rel}: H1 数量应为 1，实际 ${h1.length}`)

  const firstH2Index = lines.findIndex((l) => /^##\s/.test(l))
  const intro = lines.slice(0, firstH2Index === -1 ? 20 : firstH2Index)
  if (!intro.some((l) => /^>\s*\*\*一句话结论/.test(l))) {
    problems.push(`${rel}: 缺开头「一句话结论」blockquote`)
  }

  const sections = sectionsOf(lines)
  const waived = new Set(exemptSections[rel] ?? [])
  const requiredSections = [
    ['前置知识', 'prereq'],
    ['自测问题', 'quiz'],
    ['关联阅读', 'related'],
    ['官方或原始资料来源', 'official-sources']
  ]
  for (const [name, key] of requiredSections) {
    if (!waived.has(key) && !sections.has(name)) problems.push(`${rel}: 缺「## ${name}」节`)
  }

  const quizLines = sections.get('自测问题') ?? []
  const detailsBlocks = [...quizLines.join('\n').matchAll(/<details>[\s\S]*?<\/details>/g)].map((m) => m[0])
  if (quizLines.length > 0) {
    if (detailsBlocks.length < 3) problems.push(`${rel}: 自测题少于 3 题（${detailsBlocks.length}）`)
    for (const block of detailsBlocks) {
      const answer = block.match(/<summary>查看答案<\/summary>([\s\S]*?)<\/details>/)
      if (!answer || !answer[1].trim()) problems.push(`${rel}: 存在空的或无「查看答案」summary 的自测答案`)
    }
  }

  const relatedLines = sections.get('关联阅读') ?? []
  for (const line of relatedLines) {
    if (!/^-/.test(line)) continue
    // 剥掉「- **标签：**」后整条只剩一个链接（允许句尾句号）即视为裸链接；
    // 链接后带（括号理由）或正文文字的条目合规
    const stripped = line.replace(/^-\s*\*\*[^*]+\*\*[：:]\s*/, '')
    if (/^\[[^\]]*\]\([^)]+\)\s*[。.]?\s*$/.test(stripped)) {
      problems.push(`${rel}: 关联阅读存在裸链接条目（缺理由）：${line.slice(0, 60)}`)
    }
  }
}

// --- glossary：回链存在 + 条目字母序 ---
{
  const text = await readFile(join(docsDir, 'glossary.md'), 'utf8')
  const entryRe = /^## (.+)$/gm
  const entries = []
  let match
  while ((match = entryRe.exec(text)) !== null) {
    const start = match.index + match[0].length
    const nextH2 = text.indexOf('\n## ', start)
    entries.push({ title: match[1].trim(), body: text.slice(start, nextH2 === -1 ? undefined : nextH2) })
  }
  for (const entry of entries) {
    const links = [...entry.body.matchAll(/\]\((\/[^)#\s]+)(?:#[^)\s]*)?\)/g)]
    if (links.length === 0) {
      problems.push(`glossary.md: 条目「${entry.title}」缺站内回链`)
      continue
    }
    for (const link of links) {
      const target = join(docsDir, link[1].replace(/^\/+/, ''))
      if (!existsSync(target) && !existsSync(`${target}.md`)) {
        problems.push(`glossary.md: 条目「${entry.title}」回链目标不存在 ${link[1]}`)
      }
    }
  }
  const normalize = (title) => title.toLowerCase().replace(/[\s-]/g, '')
  for (let i = 1; i < entries.length; i++) {
    if (normalize(entries[i - 1].title) >= normalize(entries[i].title)) {
      problems.push(`glossary.md: 条目乱序「${entries[i - 1].title}」应排在「${entries[i].title}」之后`)
    }
  }
}

if (problems.length > 0) {
  const unique = [...new Set(problems)]
  throw new Error(`Content check failed (${unique.length}):\n${unique.join('\n')}`)
}

const articleCount = files.filter((f) => !exemptPages.has(relative(docsDir, f).split(sep).join('/'))).length
console.log(`Content check passed: ${files.length} markdown files (${articleCount} articles), glossary links and ordering verified.`)
