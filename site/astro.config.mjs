import { defineConfig } from 'astro/config'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const base = process.env.BASE_PATH || '/GH-Hack/'

export default defineConfig({
  srcDir: '.',
  outDir: '../dist/site',
  base,
  build: {
    format: 'file'
  },
  vite: {
    define: {
      __WORKSHOPS_DIR__: JSON.stringify(resolve(__dirname, '..', 'workshops'))
    }
  }
})
