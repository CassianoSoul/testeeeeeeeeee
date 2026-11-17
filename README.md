# Alô, SAC! Central do Caos

Jogo de atendimento ao público com clientes controlados por IA (Claude), voz e microfone.

## Rodar no seu computador
1. Instale o Node.js 18 ou mais novo.
2. Crie uma chave de API em https://console.anthropic.com (é paga por uso).
3. Copie `.env.example` para `.env` e cole a chave em `ANTHROPIC_API_KEY`.
4. Rode `npm start` e abra http://localhost:3000.

## Colocar online na Vercel (recomendado)
O backend roda como função serverless (`api/chat.js` e `api/health.js`) e o jogo é servido da pasta `public`. Não precisa de servidor ligado nem de comando de início.

1. Crie um repositório no GitHub e envie esta pasta inteira (o `.gitignore` já impede o envio do `.env`). A raiz do repositório deve ter `api/`, `public/` e `package.json`.
2. Em https://vercel.com, clique em **Add New > Project** e importe o repositório.
3. Deixe **Framework Preset: Other** e **Root Directory: ./**. Não precisa de Build Command.
4. Em **Environment Variables**, adicione `ANTHROPIC_API_KEY` com a sua chave (marque Production, Preview e Development).
5. Clique em **Deploy**. O jogo abre em `https://seu-projeto.vercel.app`, já com HTTPS (necessário para o microfone).
6. Teste `https://seu-projeto.vercel.app/api/health`: deve mostrar `{"ok":true,...}`.

Pelo terminal, em vez do site: `npm i -g vercel`, depois `vercel` na pasta (primeira vez), `vercel env add ANTHROPIC_API_KEY` e `vercel --prod`.

Observações:
- Mudou ou adicionou uma variável depois do deploy? Faça um novo deploy (Deployments > Redeploy) para ela valer.
- O limite por minuto (`RATE_LIMIT`) é "melhor esforço" em funções serverless. Defina também um limite de gastos no console da Anthropic.
- O plano gratuito (Hobby) da Vercel é voltado a uso pessoal e não comercial. Confira os termos se a rede de jogos for comercial.

### Alternativa: servidor Node (Render, Railway, Fly.io)
O `server.js` faz o mesmo e serve a pasta `public`. Comando de início `npm start` e variável `ANTHROPIC_API_KEY`. No plano gratuito do Render o serviço dorme após 15 minutos sem acesso.

## Segurança e custos
- A chave fica só no servidor. Nunca a coloque no `game.js`.
- `RATE_LIMIT` limita as mensagens por minuto por IP, e o servidor recusa pedidos grandes. Configure também um limite de gastos no console da Anthropic.
- O modelo padrão é o `claude-haiku-5-5`, rápido e barato. Mude em `MODEL` se quiser.

## Embutir em uma rede de jogos
- Mesmo domínio: basta servir a pasta `public`.
- Outro domínio: defina `ALLOWED_ORIGIN` no servidor e, na página, `window.SAC_API_URL="https://seu-servidor/api/chat"` antes de carregar o `game.js`.

## Estrutura
- `api/chat.js`, `api/health.js`: backend na Vercel (chave e ponte com a IA)
- `server.js`: o mesmo backend como servidor Node (para rodar local ou fora da Vercel)
- `public/index.html`, `style.css`, `game.js`: o jogo
