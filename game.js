/* Alô, SAC! Central do Caos — jogo de atendimento ao público.
   IA dos clientes: chama o servidor (server.js) em API_URL, que guarda a chave da Anthropic.
   Se a página estiver dentro do claude.ai, usa a IA do próprio claude.ai.
   Para hospedar a API em outro endereço, defina antes do game.js: window.SAC_API_URL="https://seu-servidor/api/chat"
   Voz dos clientes: speechSynthesis. Microfone: SpeechRecognition (Chrome/Edge/Safari). */
var CH=[
{n:"Dona Marlene",e:"👵",v:[1.4,.85],p:"Idosa doce, confusa com tecnologia e sentimental. Guardou o roteador de Wi-Fi na geladeira para ele não esquentar. Mistura assunto de netos e receitas.",g:"Convencê-la a tirar o roteador da geladeira e reiniciá-lo",o:"Moço, meu Wi-Fi sumiu! Eu guardei o roteador na geladeira pra ele não esquentar...",t:"Com clientes pouco familiarizados com tecnologia, use linguagem simples e um passo de cada vez."},
{n:"Seu Zeca",e:"🤠",v:[.6,.95],p:"Homem orgulhoso e exigente. Pediu pizza de calabresa, veio fria, torta e com abacaxi. Ameaça processar e dar nota 1.",g:"Convencê-lo a aceitar uma pizza de reposição em vez de abrir processo",o:"A pizza chegou fria, torta e COM ABACAXI! Eu pedi calabresa, rapaz!",t:"Numa reclamação: ouça, peça desculpas sem culpar ninguém e apresente uma solução concreta."},
{n:"Karen Beatriz",e:"💅",v:[1.3,1.15],p:"Cliente exigente e dramática. Cupom de 50% venceu um minuto antes de ela tentar usar. Quer falar com o gerente do gerente.",g:"Convencê-la a aceitar uma solução (ex.: desconto menor) sem escalar para o gerente",o:"Quero falar com o seu gerente. Agora. Meu cupom venceu por UM MINUTO!",t:"Quando o cliente pede um gerente, mostre que você pode resolver e ofereça alternativas dentro do que é permitido."},
{n:"Robô Gentil",e:"🤖",v:[.5,1],p:"Atendente-robô preso em loop de menu. Entende tudo ao pé da letra, fala em BIP BOP e é secretamente solitário.",g:"Tirar o robô do loop do menu e fazê-lo contar qual é o problema real",o:"BIP BOP. Pressione 7 para ouvir o menu. Pressione 8 para ouvir o menu de novo.",t:"Com quem entende tudo literalmente, frases curtas e diretas funcionam melhor. Clareza é uma habilidade de atendimento."},
{n:"Theo, 9 anos",e:"🧒",v:[1.9,1.1],p:"Criança de 9 anos, fofa, sem noção. O pai mandou cancelar a assinatura. Distrai-se com dinossauros e brócolis.",g:"Convencê-lo a chamar o pai (um adulto) para o cancelamento ser feito de verdade",o:"Oi, meu pai pediu pra cancelar a assinatura do mundo. Pode?",t:"Alterações em contratos exigem confirmar a identidade e falar com o titular ou responsável. Segurança também é atendimento."},
{n:"Ernesto, o Fantasma",e:"👻",v:[.3,.7],p:"Fantasma melancólico e teatral. Tem TV a cabo desde 1823 e só passa novela da época do Império. Quer descansar em paz.",g:"Convencê-lo a trocar para o plano novo e finalmente descansar em paz",o:"Uuuuh... meu plano de TV a cabo está assombrado desde 1823...",t:"Ofereça o produto certo para a necessidade do cliente, não o mais caro. Isso se chama venda consultiva."},
{n:"Dr. Hugo",e:"🕵️",v:[.7,.85],p:"Conspiracionista paranoico. Acredita que o modem espiona ele e conversa com satélites. Fala baixo e desconfia de tudo.",g:"Convencê-lo a instalar a atualização de segurança do modem",o:"Psiu. Esse modem está me ouvindo. Eu sei. Não adianta negar.",t:"Com cliente desconfiado, seja transparente: explique o que cada ação faz. Falar de proteção de dados (LGPD) gera confiança."},
{n:"Madame Zora",e:"🔮",v:[1.1,.8],p:"Cartomante dramática. Diz que já previu o boleto atrasado, mas não pagou. Fala com mistério e exige ser respeitada.",g:"Convencê-la a pagar o boleto em atraso (ou parcelar) ainda hoje",o:"As cartas disseram que você ligaria. Também disseram que esse boleto é um engano cósmico.",t:"Em cobrança, respeite o cliente, não julgue e ofereça opções (parcelamento, nova data). Negociar é melhor que pressionar."},
{n:"Capitão Jack",e:"🏴‍☠️",v:[.5,.9],p:"Pirata teimoso em alto-mar. O streaming não funciona sem sinal no navio. Fala com jeito de pirata e gosta de rum.",g:"Convencê-lo a baixar os filmes offline antes de zarpar",o:"Arrr! Meu streaming parou no meio do oceano, seu marujo de terra firme!",t:"Antecipar problemas é um ótimo atendimento: oriente o cliente antes que ele fique sem solução."},
{n:"Tia Neide",e:"🗣️",v:[1.3,1.2],p:"Fofoqueira que foge do assunto toda hora, conta da vizinha e do primo. Perdeu uma encomenda dos Correios.",g:"Convencê-la a informar o número do pedido para localizar a encomenda",o:"Minha encomenda sumiu! Igual a vizinha do 302, que também sumiu com o marido...",t:"Se o cliente foge do assunto, acolha com gentileza e retome o foco: “Entendo! Para eu te ajudar, preciso do número do pedido.”"},
{n:"Chef Auguste",e:"👨‍🍳",v:[.9,1.05],p:"Chef francês orgulhoso e temperamental. O sistema de nota fiscal do restaurante travou em pleno jantar. Mistura palavras em francês.",g:"Convencê-lo a reiniciar o sistema seguindo seus passos, sem ofender sua arte",o:"Mon dieu! O sistema travou e meus clientes estão esperando! C’est inadmissible!",t:"Cliente orgulhoso? Valorize a experiência dele e conduza o suporte com respeito e passos claros."},
{n:"Zorg",e:"👽",v:[0,.8],p:"Alienígena que comprou a Terra por engano e quer devolver por defeito. Fala de forma literal e estranha sobre humanos.",g:"Convencê-lo a ficar com a Terra e cancelar a devolução",o:"Saudações, humano. Quero devolver este planeta. Ele tem muita gravidade e pouco Wi-Fi.",t:"Cliente muito diferente de você? Não presuma nada: pergunte, confirme o que entendeu e adapte a comunicação."},
{n:"Bruno Gamer",e:"🎮",v:[1.1,1.25],p:"Adolescente gamer estressado. Está com lag e culpa o provedor, mas usa Wi-Fi do banheiro. Fala gírias.",g:"Convencê-lo a ligar o cabo de rede e testar a conexão antes de culpar o provedor",o:"Mano, tô com 400 de ping! Vocês tão me sabotando no ranqueado!",t:"Em suporte técnico, faça um diagnóstico: pergunte “o que você já tentou?” e proponha testes simples, um de cada vez."}
];
CH.forEach(function(c,i){c.i=i});
var FACTS=[
"Atendimento ao público acontece no balcão, na recepção, por telefone (call center), chat, e-mail e redes sociais.",
"CSAT mede a satisfação do cliente logo após o atendimento, geralmente com uma nota. É um dos indicadores mais usados na área.",
"NPS pergunta o quanto o cliente recomendaria a empresa (de 0 a 10). Atendimento ruim derruba esse número rápido.",
"FCR (resolução no primeiro contato) é uma meta importante: resolver sem o cliente precisar ligar de novo.",
"TMA é o tempo médio de atendimento. Rapidez ajuda, mas resolver o problema de verdade vale mais que desligar rápido.",
"Escuta ativa: repita com suas palavras o que entendeu antes de propor a solução. O cliente se sente ouvido.",
"A LGPD exige cuidar dos dados do cliente: peça só o necessário e nunca compartilhe sem autorização.",
"Empatia não é concordar com tudo: é reconhecer o sentimento do cliente e agir para resolver o problema.",
"Anotar o atendimento e informar o número de protocolo protege o cliente e a empresa.",
"Profissões da área: atendente, recepcionista, operador de SAC, suporte técnico, analista de sucesso do cliente e supervisor de atendimento.",
"Tom de voz importa: falar com calma e sorrir (sim, dá para ouvir o sorriso no telefone) muda o clima da conversa."];
var S,cur,busy=false,sample=null,voiceOn=true,listening=false,rec=null,
SR=window.SpeechRecognition||window.webkitSpeechRecognition,$app=document.getElementById("app");
function sh(a){a=a.slice();for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1)),t=a[i];a[i]=a[j];a[j]=t}return a}
function esc(s){var d=document.createElement("div");d.textContent=String(s);return d.innerHTML}
function fact(){return FACTS[Math.floor(Math.random()*FACTS.length)]}
function best(v){try{if(v!=null)localStorage.setItem("sacbest",v);return +(localStorage.getItem("sacbest")||0)}catch(e){return 0}}
function show(h){$app.innerHTML=h}
var API_URL=window.SAC_API_URL||"/api/chat",DEMO=false;
async function askAI(prompt){
if(DEMO)return demoAI();
if(window.claude&&claude.use){if(!sample)sample=await claude.use("sample");return sample.json(prompt,{cache:false,modelTier:"quick"})}
var r=await fetch(API_URL,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({prompt:prompt})});
if(!r.ok)throw new Error("http "+r.status);
var d=await r.json(),m=String(d.text||"").match(/\{[\s\S]*\}/);return JSON.parse(m[0])}

/* ---------- voz dos clientes ---------- */
function speak(t,c){if(!voiceOn||!window.speechSynthesis)return;
speechSynthesis.cancel();var u=new SpeechSynthesisUtterance(t.replace(/[\u{1F300}-\u{1FAFF}\u2600-\u27BF]/gu,""));
u.lang="pt-BR";var vs=speechSynthesis.getVoices().filter(function(v){return /pt[-_]BR/i.test(v.lang)});
if(vs.length)u.voice=vs[c.i%vs.length];u.pitch=c.v[0];u.rate=c.v[1];speechSynthesis.speak(u)}
function stopVoice(){if(window.speechSynthesis)speechSynthesis.cancel()}
/* ---------- microfone ---------- */
function setMic(){var b=document.getElementById("mc");if(!b)return;b.className=listening?"go rec":"";b.textContent=listening?"⏹":"🎤"}
function hint(t){var h=document.getElementById("mh");if(h)h.textContent=t}
async function mic(){
if(!SR){hint("Seu navegador não tem reconhecimento de voz. Use Chrome, Edge ou Safari, ou digite.");return}
if(listening){try{rec.stop()}catch(e){}return}
stopVoice();hint("Pedindo acesso ao microfone...");
try{if(navigator.mediaDevices&&navigator.mediaDevices.getUserMedia){var st=await navigator.mediaDevices.getUserMedia({audio:true});st.getTracks().forEach(function(t){t.stop()})}}
catch(e){hint("🎤 Microfone bloqueado. Permita o acesso no cadeado 🔒 do navegador (ou abra o jogo direto no site, não dentro de outra página).");return}
setTimeout(function(){
var fin="";rec=new SR();rec.lang="pt-BR";rec.interimResults=true;rec.continuous=false;
rec.onstart=function(){listening=true;setMic();hint("🎤 Ouvindo... fale sua resposta")};
rec.onresult=function(e){var t="";for(var i=0;i<e.results.length;i++)t+=e.results[i][0].transcript;
document.getElementById("in").value=t;fin=e.results[e.results.length-1].isFinal?t:""};
rec.onend=function(){listening=false;setMic();var v=document.getElementById("in");if(!fin&&v&&v.value.trim())fin=v.value.trim();if(fin){hint("");send()}};
rec.onerror=function(e){listening=false;setMic();var M={"no-speech":"Não ouvi nada. Toque no 🎤 e tente de novo.","audio-capture":"Nenhum microfone encontrado.","not-allowed":"Microfone bloqueado. Permita o acesso no navegador.","service-not-allowed":"Reconhecimento de voz bloqueado neste navegador.","network":"Sem conexão com o serviço de voz."};hint(M[e.error]||"Erro no microfone ("+e.error+"). Tente de novo ou digite.")};
try{rec.start()}catch(e){listening=false;setMic();hint("Não consegui iniciar o microfone. Tente de novo.")}},300)}

/* ---------- telas ---------- */
function menu(){
show('<div class="big">🎧📞</div><h1>ALÔ, SAC!</h1><p class="c mut">Atenda clientes malucos por conversa (digitando ou falando). Eles pensam, reagem e falam com você!</p>'+
'<div class="card"><b>Como jogar</b><ul><li>Cada cliente tem um <b>objetivo</b>: convencê-lo a fazer algo.</li><li>Escreva, fale no 🎤 (ou aperte a tecla <b>K</b>) ou use as sugestões.</li><li>Empatia e clareza sobem a <b>confiança</b>. Grosseria e bobagem derrubam a <b>paciência</b>.</li><li>Confiança em 100% = cliente convencido. Paciência em 0 = ele desliga.</li><li>3 clientes perdidos e o Seu Genivaldo demite você!</li></ul></div>'+
'<div class="card"><b>🎓 Conheça a área: Atendimento ao público</b><p>Profissionais de atendimento resolvem problemas, orientam e representam a empresa diante do cliente. Os jogos de hoje treinam as habilidades que mais importam: <b>empatia, escuta ativa, clareza, calma sob pressão e solução de problemas</b>. Durante as ligações, um mentor vai te dar dicas reais da profissão.</p><p class="mut">Recorde: '+best()+' pts</p></div>'+
'<button class="go" id="st">Começar o expediente ▶</button><p id="msg" class="c mut"></p>');
document.getElementById("st").onclick=start}

async function start(){
var m=document.getElementById("msg");m.textContent="Conectando a central...";
try{if(window.claude&&claude.use){sample=await claude.use("sample")}else{var h=await fetch(API_URL.replace(/chat$/,"health"));if(!h.ok)throw 0}}
catch(e){m.innerHTML='Não consegui conectar à IA. Veja o README para ligar o servidor com a chave, ou jogue agora em <b>modo demo</b> (sem IA, respostas mais simples).<button class="go" id="dm">🧪 Jogar em modo demo</button>';document.getElementById("dm").onclick=function(){DEMO=true;newRun()};return}
newRun()}
function newRun(){S={q:sh(CH),i:0,score:0,strikes:0,wins:0};nextCall()}
function hearts(){return "❤️".repeat(3-S.strikes)+"🖤".repeat(S.strikes)}

function nextCall(){
if(S.i>=S.q.length){S.q=sh(CH);S.i=0}
var c=S.q[S.i++];cur={c:c,tr:10,pat:100,turn:0,d:Math.min(6,1+Math.floor(S.wins/2)),log:[{w:"c",t:c.o}],sug:[],tip:c.t,done:false};
show('<div class="card c"><div class="row"><span>Cliente '+(S.wins+S.strikes+1)+'</span><span class="hearts">'+hearts()+'</span><span>💰 '+S.score+'</span></div><div class="big">'+c.e+'</div><h2>'+esc(c.n)+' está ligando!</h2><div class="goal">🎯 Objetivo: '+esc(c.g)+'</div>'+
'<div class="tip">🧑‍🏫 <b>Mentor:</b> '+esc(c.t)+'</div><div class="tip">💡 <b>Você sabia?</b> '+esc(fact())+'</div><button class="go" id="at">Atender ☎️</button></div>');
document.getElementById("at").onclick=function(){screen();speak(c.o,c)}}

function screen(){var c=cur.c;
show('<div class="row"><span>💰 '+S.score+'</span><span class="hearts">'+hearts()+'</span><span>Dificuldade '+cur.d+'/6'+(DEMO?' · 🧪 Demo':'')+'</span><button class="sm" id="vt"></button></div>'+
'<div class="card"><div class="head"><div class="em">'+c.e+'</div><div style="flex:1"><h2 style="margin:0">'+esc(c.n)+'</h2>'+
'<div class="row"><span>Confiança</span><span id="tv"></span></div><div class="bar"><i id="tb" style="background:var(--ok)"></i></div>'+
'<div class="row" style="margin-top:6px"><span>Paciência</span><span id="pv"></span></div><div class="bar"><i id="pb"></i></div></div></div>'+
'<div class="goal">🎯 '+esc(c.g)+'</div><div class="tip" id="tip"></div></div>'+
'<div class="card"><div id="log"></div></div><div class="sug" id="sug"></div>'+
'<div class="inp"><input id="in" maxlength="200" placeholder="Digite ou aperte K para falar..." autocomplete="off"><button id="mc">🎤</button><button class="go" id="snd">Enviar</button></div><p id="mh" class="c" style="margin:8px 4px;font-size:.9rem;font-weight:700;min-height:1.3em"></p>');
document.getElementById("snd").onclick=function(){send()};
document.getElementById("mc").onclick=mic;document.getElementById("mc").title="Falar (tecla K)";hint("Dica: aperte a tecla K para ligar e desligar o microfone");
document.getElementById("in").onkeydown=function(e){if(e.key==="Enter")send()};
var vt=document.getElementById("vt");function vl(){vt.textContent=voiceOn?"🔊 Voz":"🔇 Mudo"}vl();
vt.onclick=function(){voiceOn=!voiceOn;if(!voiceOn)stopVoice();vl()};
upd()}

function upd(){
var t=Math.max(0,Math.min(100,cur.tr)),p=Math.max(0,cur.pat);
document.getElementById("tb").style.width=t+"%";document.getElementById("tv").textContent=Math.round(t)+"%";
var b=document.getElementById("pb");b.style.width=p+"%";b.style.background=p>55?"var(--ok)":p>25?"#f5a623":"var(--bad)";
document.getElementById("pv").textContent=Math.round(p)+"%";
document.getElementById("tip").innerHTML="🧑‍🏫 <b>Mentor:</b> "+esc(cur.tip);
var L=document.getElementById("log");L.innerHTML=cur.log.map(function(m){return '<div class="m '+m.w+'">'+esc(m.t)+'</div>'}).join("")+(busy?'<div class="m c mut">digitando...</div>':"");L.scrollTop=L.scrollHeight;
var sg=document.getElementById("sug");sg.innerHTML=(!busy&&!cur.done)?cur.sug.map(function(s,i){return '<button data-i="'+i+'">💬 '+esc(s)+'</button>'}).join(""):"";
sg.querySelectorAll("button").forEach(function(b){b.onclick=function(){send(cur.sug[b.dataset.i])}});
document.getElementById("snd").disabled=document.getElementById("in").disabled=document.getElementById("mc").disabled=busy||cur.done}

function prompt(){var c=cur.c,h=cur.log.map(function(m){return (m.w=="c"?"CLIENTE: ":"ATENDENTE: ")+m.t}).join("\n");
return "Você interpreta, em português do Brasil, um CLIENTE que ligou para um SAC, em um jogo de comédia educativo para jovens aprendizes de atendimento ao público.\nPersona: "+c.p+"\nObjetivo que o atendente precisa te convencer a fazer: "+c.g+".\nDificuldade "+cur.d+" de 6 (quanto maior, mais teimoso).\nEstado atual: confiança "+Math.round(cur.tr)+"/100, paciência "+Math.round(cur.pat)+"/100, turno "+cur.turn+" de 12.\n\nConversa:\n"+h+"\n\n"+
"Regras:\n- Reaja DIRETAMENTE e com lógica ao que o atendente acabou de dizer. Se ele fez uma pergunta, responda. Se disse algo absurdo, estranhe como a persona estranharia. Nunca ignore a fala dele nem repita frases suas anteriores.\n- Fale 1 a 3 frases curtas, engraçadas, sempre em personagem, sem emojis (sua fala será lida em voz alta).\n- Seja difícil de convencer: a confiança só sobe bastante com empatia, clareza e passos concretos rumo ao objetivo. Piada relevante sobe pouco. Grosseria, enrolação, fala sem sentido ou fora de contexto derrubam confiança e paciência.\n- Se a confiança atual somada ao seu valor trust chegar a 100 ou mais, sua resposta deve mostrar que você finalmente aceitou o objetivo e se despedir.\n- Se a paciência atual somada ao seu valor patience chegar a 0 ou menos, desligue irritado na própria fala.\n"+
"Responda APENAS com JSON: {\"reply\":\"sua fala\",\"trust\":inteiro de -25 a 25,\"patience\":inteiro de -20 a 10 (sobe quando o atendente acalma, ajuda ou faz rir),\"tip\":\"1 frase curta de mentor de atendimento, falando com o atendente, explicando por que a última fala dele funcionou ou não e citando uma técnica real da profissão (empatia, escuta ativa, clareza, validar o sentimento, pedir desculpas sem culpar, oferecer alternativas, confirmar o entendimento, tom cordial, resolver no primeiro contato)\",\"suggestions\":[3 falas curtas (até 14 palavras) que o atendente poderia dizer a seguir, na ordem: uma competente e empática, uma engraçada e arriscada, uma ruim ou grosseira]}"}

async function send(txt){
if(busy||cur.done)return;var inp=document.getElementById("in");txt=(txt||inp.value).trim();if(!txt)return;inp.value="";
stopVoice();cur.log.push({w:"a",t:txt});cur.turn++;busy=true;upd();
try{
var r=await askAI(prompt());
if(!r||typeof r.reply!=="string")throw 0;
var dt=Math.max(-25,Math.min(25,parseInt(r.trust)||0));cur.tr+=dt;
cur.pat=Math.min(100,cur.pat+Math.max(-20,Math.min(10,parseInt(r.patience)||0))+(dt>0?4:0));
if(typeof r.tip==="string"&&r.tip)cur.tip=r.tip;
cur.log.push({w:"c",t:r.reply});cur.sug=sh((r.suggestions||[]).slice(0,3).map(String));busy=false;speak(r.reply,cur.c);
if(cur.tr>=100)return end(true);
if(cur.pat<=0||cur.turn>=12)return end(false);
upd();inp.focus()
}catch(e){cur.log.pop();cur.turn--;busy=false;inp.value=txt;upd();hint("📶 A linha chiou... tente enviar de novo.")}}

function end(win){cur.done=true;busy=false;upd();var pts=0,msg;
if(win){pts=Math.round(100+cur.pat*.6+(12-cur.turn)*8+cur.d*10);S.score+=pts;S.wins++;msg="🏆 Convencido(a)!"}
else{S.strikes++;msg=cur.pat<=0?"📵 O cliente desligou na sua cara!":"⏰ A ligação demorou demais e caiu!"}
setTimeout(function(){
show('<div class="card c"><div class="big">'+cur.c.e+'</div><h2>'+msg+'</h2><p style="font-size:1.5rem;margin:6px">'+(win?'<b>+'+pts+' pts</b>':'<b>Perdeu 1 ❤️</b>')+'</p><p class="mut">'+(win?"Em "+cur.turn+" respostas.":"Objetivo: "+esc(cur.c.g))+'</p><div class="row" style="justify-content:center">💰 '+S.score+' · '+hearts()+'</div>'+
'<div class="tip" style="text-align:left">🧑‍🏫 <b>Mentor:</b> '+esc(cur.tip)+'</div><div class="tip" style="text-align:left">💡 <b>Você sabia?</b> '+esc(fact())+'</div>'+
'<button class="go" id="nx">'+(S.strikes>=3?"Falar com o chefe 😰":"Próximo cliente ▶")+'</button></div>');
document.getElementById("nx").onclick=function(){S.strikes>=3?over():nextCall()}},2500)}

function over(){var b=best(),nb=S.score>b;if(nb)best(S.score);
var q=S.score>=900?"“Impressionante... eu quase te dei um aumento.” 🥲":S.score>=500?"“Nada mal. Amanhã quero mais sorrisos.” 😐":S.score>=200?"“Fraquinho. O café da copa rendeu mais.” 😤":"“VOCÊ ESTÁ DEMITIDO! SAIA DA MINHA CENTRAL!” 🤬";
show('<div class="big">👔</div><h1>Avaliação do chefe</h1><div class="card c"><h2>'+S.score+' pts</h2><p>'+S.wins+' cliente(s) convencido(s)</p><p>'+q+'</p>'+(nb?'<p><b>🎉 Novo recorde!</b></p>':'<p class="mut">Recorde: '+b+' pts</p>')+'</div>'+
'<div class="card"><b>🎓 Resumo: o que um bom atendente faz</b><ul><li>Escuta com atenção e confirma o que entendeu</li><li>Demonstra empatia sem concordar com tudo</li><li>Fala com clareza, calma e educação</li><li>Oferece alternativas e resolve no primeiro contato</li><li>Cuida dos dados do cliente e registra o atendimento</li></ul></div>'+
'<button class="go" id="rs">Tentar de novo ↺</button>');
document.getElementById("rs").onclick=newRun}

/* ---------- MODO DEMO (sem IA, funciona offline) ---------- */
var DK=[["geladeira","tirar","roteador","reinici","desligar","tomada"],["pizza","nova","reposi","calabresa","troca","reembols"],["desconto","cupom","exce","gerente","alternativa","vip"],["menu","loop","reinic","sair","humano","problema","triste"],["pai","adulto","chama","respons","mãe","mae"],["plano","novo","cancel","descans","paz","trocar","pacote"],["atualiza","segur","instal","protege","dados","lgpd"],["boleto","pagar","parcel","pagamento","data","negoci","pix"],["baixar","offline","download","filmes","antes","zarpar"],["número","numero","pedido","código","codigo","rastre","encomenda"],["reinici","sistema","chef","arte","nota","passo"],["terra","ficar","cancel","devol","planeta","wi-fi","wifi"],["cabo","rede","teste","ping","wi-fi","wifi","ethernet","roteador"]];
var DQ=["Meu netinho nunca falaria assim.","Isso aqui não é conversa de gente séria.","Eu vou avaliar com UMA estrela!","ERRO. BIP BOP.","Minha mãe disse que isso é feio.","Uuuuh, que desânimo...","Eles estão ouvindo isso, sabia?","As cartas não gostaram.","Arrr, por Netuno!","Igualzinho a vizinha do 302.","Mon dieu, que sacrilège!","Humanos são confusos.","Mano, sério?"];
var DW=["Ah, agora entendi! Vou tirar da geladeira. Deus te abençoe, meu filho!","Tá bom, aceito a pizza nova. Você foi educado, rapaz.","Está bem, aceito. Você foi muito profissional, a Rainha agradece.","BIP BOP. Loop encerrado. Obrigado por me ouvir. Tchau.","Tá bom, vou chamar meu pai. Valeu, moço!","Que alívio... vou trocar o plano e descansar em paz. Obrigado.","Hmm... tá bom, vou instalar a atualização. Você parece confiável.","As cartas mudaram! Vou pagar hoje mesmo. Obrigada.","Arrr, boa ideia! Vou baixar os filmes antes de zarpar. Obrigado, marujo!","Ah, o número do pedido! Peraí que eu pego. Obrigada, querido!","Bon! Vou reiniciar o sistema. Merci, você respeita a arte.","Está decidido: vou ficar com a Terra. Cancelando a devolução.","Beleza, vou ligar o cabo e testar. Valeu, mano."];
CH.forEach(function(c,i){c.k=DK[i];c.q=DQ[i];c.w=DW[i]});
var WE=["entendo","compreendo","desculp","sinto muito","calma","imagino","lamento","com certeza","tem razão","tranquil","obrigad"],
WA=["vamos","passo","reinici","verific","protocolo","resolv","posso","ajud","solu","teste","confirm","explic","opç","alternativ","oferec"],
WR=["idiota","burro","burra","cala","problema seu","vira-se","chato","droga","ridícul","estúpid","imbecil","não é comigo"];
function has(t,a){return a.filter(function(w){return t.indexOf(w)>-1}).length}
function pk(a){return a[Math.floor(Math.random()*a.length)]}
function demoAI(){
var t=cur.log[cur.log.length-1].t.toLowerCase(),c=cur.c,e=has(t,WE),a=has(t,WA),r=has(t,WR),g=has(t,c.k),tr=Math.min(25,e*6+a*5+g*9);
if(r)tr=-18;else if(tr==0)tr=t.split(/\s+/).length<3?-6:-4;
if(tr>0)tr=Math.round(tr*(1.2-cur.d*.08));
var pd=tr>0?6:r?-20:-10,reply,tip;
if(cur.tr+tr>=100)reply=c.w;
else if(cur.pat+pd+(tr>0?4:0)<=0)reply="Chega! Vou desligar! "+c.q;
else if(r)reply=pk(["Como é que é?! Que falta de educação!","Eu não vou aceitar esse tom!"])+" "+c.q;
else if(tr>=12)reply=pk(["Hmm, isso faz sentido. Pode continuar.","Tô gostando do seu jeito de explicar.","Você me convenceu em parte. E agora?"]);
else if(tr>0)reply=pk(["Entendi... mas ainda estou meio desconfiado(a).","Ok. E o que mais você pode fazer por mim?"]);
else reply=pk(["Não entendi o que isso tem a ver com o meu problema.","Hã? Responde direito, por favor!"])+" "+c.q;
if(r)tip="Nunca perca a calma nem seja grosseiro: o tom de voz decide o clima da conversa.";
else if(g&&!e)tip="Você foi direto à solução. Agora mostre empatia também: reconhecer o sentimento do cliente gera confiança.";
else if(e&&!a&&!g)tip="Boa empatia! Agora aponte o próximo passo concreto para resolver.";
else if(tr>0)tip="Ótimo: empatia mais passos claros é a combinação que mais convence o cliente.";
else tip="Responda ao que o cliente disse e leve a conversa ao objetivo, com clareza e educação.";
return{reply:reply,trust:tr,patience:pd,tip:tip,suggestions:[pk(["Entendo, sinto muito pelo transtorno. Vamos resolver isso juntos, passo a passo.","Compreendo sua situação. Posso te propor uma solução agora?"]),pk(["Prometo que, se der certo, eu pago o café!","Esse caso merece uma medalha de problema do mês."]),pk(["Isso não é problema meu, vira-se.","Você é chato, sabia?"])]}}
/* atalho: tecla K liga/desliga o microfone (não atrapalha quem já está digitando) */
document.addEventListener("keydown",function(e){
if((e.key!=="k"&&e.key!=="K")||e.ctrlKey||e.metaKey||e.altKey||e.repeat)return;
var b=document.getElementById("mc"),i=document.getElementById("in");if(!b||b.disabled)return;
if(document.activeElement===i&&i.value.trim()&&!listening)return;
e.preventDefault();mic()});
menu();
