/**
 * Build script for the GitHub Workshops site.
 *
 * 1. Discovers all *.slidev.md files in workshops/
 * 2. Builds each Slidev deck into its own subfolder
 * 3. Builds the Astro site (landing page + LAB files)
 * 4. Copies Slidev build outputs into the Astro dist
 * 5. Creates SPA fallbacks for Slidev routes on GitHub Pages
 * 6. Writes .nojekyll marker
 *
 * Usage:
 *   node scripts/build-site.mjs
 *
 * Environment variables (can also be set in .env at repo root):
 *   BASE_PATH   — URL base path (default: /GH-Hack/)
 *   SHOW_DRAFTS — Set to "true" to include draft workshops (default: false)
 */

import { execSync } from 'child_process'
import { readdirSync, readFileSync, existsSync, cpSync, writeFileSync, mkdirSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import { config as loadEnv } from 'dotenv'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const ROOT = resolve(__dirname, '..')

// Load .env from repo root (won't override existing env vars)
loadEnv({ path: resolve(ROOT, '.env') })
const WORKSHOPS_DIR = resolve(ROOT, 'workshops')
const SITE_DIST = resolve(ROOT, 'dist', 'site')
const BASE_PATH = process.env.BASE_PATH || '/GH-Hack/'

function run(cmd, opts = {}) {
  console.log(`\n> ${cmd}`)
  execSync(cmd, { stdio: 'inherit', cwd: ROOT, ...opts })
}

// --- Step 1: Discover Slidev decks ---
function discoverDecks(dir) {
  const decks = []
  const entries = readdirSync(dir, { withFileTypes: true })
  for (const entry of entries) {
    const fullPath = resolve(dir, entry.name)
    if (entry.isDirectory()) {
      decks.push(...discoverDecks(fullPath))
    } else if (entry.name.endsWith('.slidev.md')) {
      decks.push(fullPath)
    }
  }
  return decks
}

const decks = discoverDecks(WORKSHOPS_DIR)
console.log(`Found ${decks.length} Slidev deck(s):`)
decks.forEach(d => console.log(`  - ${d}`))

// --- Step 2: Build each Slidev deck ---
for (const deckPath of decks) {
  const relFromWorkshops = deckPath
    .slice(WORKSHOPS_DIR.length + 1)
    .replace(/\\/g, '/')
  const workshopName = dirname(relFromWorkshops)
  const outDir = resolve(ROOT, 'dist', workshopName, 'slides')
  const slidesBase = `${BASE_PATH}${workshopName}/slides/`

  console.log(`\nBuilding deck: ${relFromWorkshops}`)
  console.log(`  Output: dist/${workshopName}/slides/`)
  console.log(`  Base:   ${slidesBase}`)

  const relDeck = deckPath.slice(ROOT.length + 1).replace(/\\/g, '/')
  run(`npx slidev build "${relDeck}" --base "${slidesBase}" --out "${outDir}"`)
}

// --- Step 3: Build Astro site ---
console.log('\nBuilding Astro site...')
run(`npx astro build`, { cwd: resolve(ROOT, 'site'), env: { ...process.env, BASE_PATH } })

// --- Step 4: Copy Slidev outputs into Astro dist ---
for (const deckPath of decks) {
  const relFromWorkshops = deckPath
    .slice(WORKSHOPS_DIR.length + 1)
    .replace(/\\/g, '/')
  const workshopName = dirname(relFromWorkshops)
  const slidevOut = resolve(ROOT, 'dist', workshopName, 'slides')
  const target = resolve(SITE_DIST, workshopName, 'slides')

  if (existsSync(slidevOut)) {
    console.log(`Copying slides: ${workshopName}/slides/ → Astro dist`)
    mkdirSync(dirname(target), { recursive: true })
    cpSync(slidevOut, target, { recursive: true })

    // Create SPA fallback copies for slide routes (/1, /2, ... /N)
    const indexHtml = resolve(target, 'index.html')
    if (existsSync(indexHtml)) {
      const html = readFileSync(indexHtml, 'utf-8')
      for (let i = 1; i <= 200; i++) {
        const slideDir = resolve(target, String(i))
        mkdirSync(slideDir, { recursive: true })
        writeFileSync(resolve(slideDir, 'index.html'), html)
      }
      console.log(`  Created SPA fallbacks for slide routes 1-200`)
    }
  }
}

// --- Step 5: Write .nojekyll ---
writeFileSync(resolve(SITE_DIST, '.nojekyll'), '')
console.log('\nWrote .nojekyll')

console.log(`\n✓ Build complete → ${SITE_DIST}`)
