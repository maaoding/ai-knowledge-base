import { cp, mkdir, readFile, rm, stat, writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const root = resolve(fileURLToPath(new URL('..', import.meta.url)))
const docsDir = join(root, 'docs')
const distDir = join(docsDir, '.vitepress', 'dist')
const manifestPath = join(root, '.pages-manifest.json')
const cname = 'ai-knowledge-base.maaoding.icu'
const protectedRootEntries = new Set([
  '.git',
  '.gitignore',
  '.nojekyll',
  '.pages-manifest.json',
  'CNAME',
  'README.md',
  'docs',
  'node_modules',
  'package-lock.json',
  'package.json',
  'scripts'
])

function run(command, args) {
  const result =
    process.platform === 'win32'
      ? spawnSync('cmd.exe', ['/d', '/s', '/c', [command, ...args].join(' ')], {
          cwd: root,
          stdio: 'inherit'
        })
      : spawnSync(command, args, {
          cwd: root,
          stdio: 'inherit'
        })

  if (result.status !== 0) {
    const reason = result.error ? `: ${result.error.message}` : ''
    throw new Error(`${command} ${args.join(' ')} failed with exit code ${result.status}${reason}`)
  }
}

async function readPreviousManifest() {
  if (!existsSync(manifestPath)) return []

  try {
    const raw = await readFile(manifestPath, 'utf8')
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed.entries) ? parsed.entries : []
  } catch {
    return []
  }
}

async function listDistEntries() {
  const dir = await stat(distDir)
  if (!dir.isDirectory()) {
    throw new Error(`VitePress dist directory not found: ${distDir}`)
  }

  const { readdir } = await import('node:fs/promises')
  return readdir(distDir)
}

async function removePreviousEntries(entries) {
  for (const entry of entries) {
    if (!entry || protectedRootEntries.has(entry)) continue

    const target = join(root, entry)
    if (existsSync(target)) {
      await rm(target, { recursive: true, force: true })
    }
  }
}

async function copyDistEntries(entries) {
  for (const entry of entries) {
    if (protectedRootEntries.has(entry)) {
      throw new Error(`Refusing to overwrite protected root entry: ${entry}`)
    }

    await cp(join(distDir, entry), join(root, entry), {
      recursive: true,
      force: true
    })
  }
}

run('npm', ['run', 'docs:build'])

const previousEntries = await readPreviousManifest()
await removePreviousEntries(previousEntries)

const distEntries = await listDistEntries()
await copyDistEntries(distEntries)

await writeFile(join(root, '.nojekyll'), '')
await writeFile(join(root, 'CNAME'), cname)
await writeFile(
  manifestPath,
  `${JSON.stringify(
    {
      generatedAt: new Date().toISOString(),
      source: 'docs/.vitepress/dist',
      entries: distEntries
    },
    null,
    2
  )}\n`
)

await mkdir(root, { recursive: true })
console.log(`Exported ${distEntries.length} root entries for GitHub Pages.`)
