import type { IncomingMessage, ServerResponse } from 'node:http'
import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'

function apiDevServerPlugin(): Plugin {
  return {
    name: 'api-dev-server',
    configureServer(server) {
      server.middlewares.use(async (req: IncomingMessage, res: ServerResponse, next: () => void) => {
        if (req.url === '/api/send-enquiry' && req.method === 'POST') {
          let body = ''
          req.on('data', (chunk: Buffer | string) => {
            body += chunk
          })
          req.on('end', async () => {
            try {
              const parsedBody = body ? JSON.parse(body) : {}
              // Dynamically import the handler so dev updates reload automatically
              // @ts-expect-error Dynamic import of local JS serverless handler without type declarations
              const handlerModule = await import('./api/send-enquiry.js')
              const fakeReq = {
                method: 'POST',
                body: parsedBody,
                headers: req.headers,
              }
              const fakeRes = {
                statusCode: 200,
                setHeader(k: string, v: string) {
                  res.setHeader(k, v)
                },
                status(code: number) {
                  this.statusCode = code
                  res.statusCode = code
                  return this
                },
                json(data: unknown) {
                  res.setHeader('Content-Type', 'application/json')
                  res.end(JSON.stringify(data))
                  return this
                },
                end(data?: string) {
                  res.end(data)
                  return this
                },
              }
              await handlerModule.default(fakeReq, fakeRes)
            } catch (err: unknown) {
              res.statusCode = 500
              res.setHeader('Content-Type', 'application/json')
              const errorMessage = err instanceof Error ? err.message : 'Internal Server Error'
              res.end(JSON.stringify({ success: false, error: errorMessage }))
            }
          })
        } else {
          next()
        }
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), apiDevServerPlugin()],
})
