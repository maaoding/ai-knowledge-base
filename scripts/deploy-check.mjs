import { existsSync } from 'node:fs'
import { readFile } from 'node:fs/promises'
import { join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(fileURLToPath(new URL('..', import.meta.url)))
const required = ['index.html', '.nojekyll', 'CNAME']

for (const file of required) {
  const path = join(root, file)
  if (!existsSync(path)) {
    throw new Error(`Missing required Pages file: ${file}`)
  }
}

const cname = (await readFile(join(root, 'CNAME'), 'utf8')).trim()
if (cname !== 'ai-knowledge-base.maaoding.icu') {
  throw new Error(`Unexpected CNAME: ${cname}`)
}

console.log('Deploy check passed.')
