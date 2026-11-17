// GET /api/health: o jogo usa para saber se a IA está configurada
module.exports = function handler(req, res) {
  const ok = !!process.env.ANTHROPIC_API_KEY;
  if (process.env.ALLOWED_ORIGIN) res.setHeader("Access-Control-Allow-Origin", process.env.ALLOWED_ORIGIN);
  res.status(ok ? 200 : 503).json({ ok, model: process.env.MODEL || "claude-haiku-5-5" });
};
