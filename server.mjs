import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
const root = resolve(import.meta.dirname, 'public');
const referenceRoot = resolve(import.meta.dirname, 'references');
const port = Number(process.env.PORT || 4186);
const types = {'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.svg':'image/svg+xml','.png':'image/png','.webp':'image/webp','.ttf':'font/ttf'};
createServer(async (req, res) => {
  try {
    const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    const base = pathname.startsWith('/reference/') ? referenceRoot : root;
    const requestedPath = base === referenceRoot ? pathname.slice('/reference'.length) : pathname === '/' ? '/index.html' : pathname;
    const file = resolve(base, `.${requestedPath}`);
    if (!file.startsWith(base + sep)) {res.writeHead(403).end(); return;}
    const data = await readFile(file);
    res.writeHead(200, {'Content-Type': types[extname(file)] || 'application/octet-stream', 'Cache-Control':'no-store', 'X-Robots-Tag':'noindex, nofollow'});
    res.end(data);
  } catch {res.writeHead(404).end('Not found');}
}).listen(port, '127.0.0.1', () => console.log(`Local: http://127.0.0.1:${port}`));
