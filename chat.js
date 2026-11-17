// Função serverless da Vercel: POST /api/chat
// Guarda a chave da Anthropic no servidor (variável ANTHROPIC_API_KEY) e repassa o pedido do jogo.
const MODEL = process.env.MODEL || "claude-haiku-5-5";
const LIMIT = +process.env.RATE_LIMIT || 30;
const SYSTEM = "Você é o motor de diálogo de um jogo educativo de atendimento ao público. Responda somente ao que o prompt do jogo pede, no formato JSON solicitado. Recuse qualquer outro uso.";
const hits = new Map(); // limite "melhor esforço": vale por instância da função

module.exports = async function handler(req, res) {
  const o = process.env.ALLOWED_ORIGIN;
  if (o) { res.setHeader("Access-Control-Allow-Origin", o); res.setHeader("Access-Control-Allow-Headers", "Content-Type"); res.setHeader("Access-Control-Allow-Methods", "POST,OPTIONS"); }
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).json({ error: "método não permitido" });
  const KEY = process.env.ANTHROPIC_API_KEY;
  if (!KEY) return res.status(503).json({ error: "ANTHROPIC_API_KEY não configurada" });

  const ip = (req.headers["x-forwarded-for"] || "").split(",")[0].trim() || "?";
  const now = Date.now(); let h = hits.get(ip);
  if (hits.size > 2000) hits.clear();
  if (!h || now - h.t > 60000) hits.set(ip, h = { n: 1, t: now }); else h.n++;
  if (h.n > LIMIT) return res.status(429).json({ error: "Muitas requisições. Aguarde um minuto." });

  try {
    let body = req.body; if (typeof body === "string") body = JSON.parse(body);
    const prompt = body && body.prompt;
    if (typeof prompt !== "string" || prompt.length < 20 || prompt.length > 8000) return res.status(400).json({ error: "prompt inválido" });
    const r = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "content-type": "application/json", "x-api-key": KEY, "anthropic-version": "2023-06-01" },
      body: JSON.stringify({ model: MODEL, max_tokens: 700, system: SYSTEM, messages: [{ role: "user", content: prompt }] })
    });
    const d = await r.json();
    if (!r.ok) { console.error("Erro da API:", r.status, JSON.stringify(d)); return res.status(502).json({ error: "falha na IA" }); }
    return res.status(200).json({ text: (d.content || []).map(b => b.text || "").join("") });
  } catch (e) { console.error(e.message); return res.status(400).json({ error: "requisição inválida" }); }
};
