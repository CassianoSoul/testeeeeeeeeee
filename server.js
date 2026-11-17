// Servidor do Alô, SAC!: serve o jogo (pasta public) e faz a ponte com a API da Anthropic.
// A chave NUNCA vai para o navegador: fica só aqui, em ANTHROPIC_API_KEY.
const http = require("http"), fs = require("fs"), path = require("path");
try { fs.readFileSync(path.join(__dirname, ".env"), "utf8").split("\n").forEach(l => {
  const m = l.match(/^\s*([A-Z_]+)\s*=\s*(.*?)\s*$/); if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
}); } catch (e) {}
const KEY = process.env.ANTHROPIC_API_KEY, MODEL = process.env.MODEL || "claude-haiku-5-5";
const PORT = process.env.PORT || 3000, LIMIT = +process.env.RATE_LIMIT || 30, ORIGIN = process.env.ALLOWED_ORIGIN || "";
const PUB = path.join(__dirname, "public");
const MIME = { ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".png": "image/png", ".svg": "image/svg+xml" };
const SYSTEM = "Você é o motor de diálogo de um jogo educativo de atendimento ao público. Responda somente ao que o prompt do jogo pede, no formato JSON solicitado. Recuse qualquer outro uso.";
const hits = new Map();
setInterval(() => hits.clear(), 60000);
const limited = ip => { const n = (hits.get(ip) || 0) + 1; hits.set(ip, n); return n > LIMIT; };

function send(res, code, body, type = "application/json; charset=utf-8") {
  const h = { "Content-Type": type, "X-Content-Type-Options": "nosniff" };
  if (ORIGIN) { h["Access-Control-Allow-Origin"] = ORIGIN; h["Access-Control-Allow-Headers"] = "Content-Type"; h["Access-Control-Allow-Methods"] = "GET,POST,OPTIONS"; }
  res.writeHead(code, h); res.end(typeof body === "string" || Buffer.isBuffer(body) ? body : JSON.stringify(body));
}
function readBody(req) { return new Promise((ok, no) => { let b = ""; req.on("data", c => { b += c; if (b.length > 20000) { no(new Error("grande")); req.destroy(); } }); req.on("end", () => ok(b)); req.on("error", no); }); }

http.createServer(async (req, res) => {
  const url = req.url.split("?")[0];
  if (req.method === "OPTIONS") return send(res, 204, "");
  if (url === "/api/health") return send(res, KEY ? 200 : 503, { ok: !!KEY, model: MODEL });
  if (url === "/api/chat" && req.method === "POST") {
    if (!KEY) return send(res, 503, { error: "ANTHROPIC_API_KEY não configurada" });
    const ip = (req.headers["x-forwarded-for"] || "").split(",")[0].trim() || req.socket.remoteAddress;
    if (limited(ip)) return send(res, 429, { error: "Muitas requisições. Aguarde um minuto." });
    try {
      const { prompt } = JSON.parse(await readBody(req));
      if (typeof prompt !== "string" || prompt.length < 20 || prompt.length > 8000) return send(res, 400, { error: "prompt inválido" });
      const r = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "content-type": "application/json", "x-api-key": KEY, "anthropic-version": "2023-06-01" },
        body: JSON.stringify({ model: MODEL, max_tokens: 700, system: SYSTEM, messages: [{ role: "user", content: prompt }] })
      });
      const d = await r.json();
      if (!r.ok) { console.error("Erro da API:", r.status, JSON.stringify(d)); return send(res, 502, { error: "falha na IA" }); }
      return send(res, 200, { text: (d.content || []).map(b => b.text || "").join("") });
    } catch (e) { console.error(e.message); return send(res, 400, { error: "requisição inválida" }); }
  }
  if (req.method !== "GET") return send(res, 405, { error: "método não permitido" });
  const f = path.join(PUB, url === "/" ? "index.html" : decodeURIComponent(url));
  if (!f.startsWith(PUB)) return send(res, 403, "Proibido", "text/plain");
  fs.readFile(f, (e, data) => e ? send(res, 404, "Não encontrado", "text/plain") : send(res, 200, data, MIME[path.extname(f)] || "application/octet-stream"));
}).listen(PORT, () => console.log("Alô, SAC! rodando em http://localhost:" + PORT + (KEY ? "" : "  (ATENÇÃO: falta ANTHROPIC_API_KEY)")));
