import { defineConfig } from 'astro/config'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const base = process.env.BASE_PATH || '/ghcp-agentic-hack/'

export default defineConfig({
  srcDir: '.',
  outDir: '../dist/site',
  base,
  build: {
    format: 'directory'
  },
  vite: {
    define: {
      __WORKSHOPS_DIR__: JSON.stringify(resolve(__dirname, '..', 'workshops')),
      __SHOW_DRAFTS__: JSON.stringify(process.env.SHOW_DRAFTS === 'true' || process.env.NODE_ENV !== 'production')
    },
    plugins: [{
      name: 'slidev-dev-proxy',
      enforce: 'pre',
      configureServer(server) {
        // In dev mode, redirect /<workshop>/slides/* to the Slidev dev server
        // Astro strips the base path, so req.url is e.g. /ado-setup/slides/1
        const slidePathRe = /^(?:\/ghcp-agentic-hack)?\/[^/]+\/slides(\/.*)?$/
        server.middlewares.use((req, res, next) => {
          const match = req.url?.match(slidePathRe)
          if (match) {
            const targetPath = match[1] || '/'
            res.writeHead(302, { Location: `http://localhost:3030${targetPath}` })
            res.end()
            return
          }
          next()
        })
      }
    }]
  }
})
