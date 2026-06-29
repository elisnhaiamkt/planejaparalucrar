# Planejar para Lucrar — Turma 4
### Landing page de venda direta (consultoria Elis Nhaia)

Página estática, sem framework, pensada para edição fácil via arquivos JSON —
sem precisar tocar em HTML, CSS ou JS no dia a dia.

---

## 1. O que editar para o lançamento de cada turma

**Você só precisa editar 4 arquivos**, todos dentro de `assets/data/`:

| Arquivo | O que tem dentro |
|---|---|
| `config.json` | Link do checkout Hotmart, link do grupo de WhatsApp, link do WhatsApp da equipe, IDs de rastreamento (GA4/Meta Pixel), número de vagas restantes |
| `content.json` | Todo o texto da página: headline, dores, método, investimento, etc. |
| `testimonials.json` | Depoimentos das turmas anteriores |
| `faq.json` | Perguntas e respostas do FAQ |

Abra qualquer um deles em um editor de texto simples. Edite apenas o que vem
**depois dos dois pontos, entre aspas**. Não apague vírgulas, aspas ou chaves
`{ }` — isso quebra o arquivo.

### Antes de publicar, troque obrigatoriamente em `config.json`:
- `links.checkout_hotmart` → link real do checkout
- `links.whatsapp_grupo_vip` → link real do grupo de WhatsApp
- `links.whatsapp_equipe` → número real de WhatsApp da equipe (formato `5547999999999`)
- `links.instagram` e `links.linkedin` → perfis reais da Elis
- `contador.data_limite` → data/hora real em que as inscrições da Turma 4 fecham
  (formato `AAAA-MM-DDTHH:MM:SS-03:00`). O valor que está lá agora é só um exemplo.
- `garantia.dias` → confirme com a Elis o prazo real de garantia (está em 7 dias por padrão)

Sem isso, os botões de compra e WhatsApp não vão funcionar, e o contador vai
mostrar uma data que não é real.

### Para a próxima turma (Turma 5, 6...):
Troque os textos relacionados a "Turma 4" e "Julho 2026" no `content.json`
(campos `produto.turma`, `hero.escassez`, `autoridade.escassez`, etc. — use
Ctrl+F por "Turma 4" para encontrar todas as ocorrências), ajuste
`config.json > exibicao > vagas_restantes` e atualize `config.json > contador > data_limite`
para a nova data-limite de inscrição.

### Para desativar o contador ou a garantia temporariamente
Sem apagar nada, é só trocar `"ativo": true` para `"ativo": false` em
`config.json > contador` ou `config.json > garantia`. O bloco correspondente
desaparece da página automaticamente.

---

## 2. Estrutura de arquivos

```
landing-page/
│ index.html              ← esqueleto da página + SEO + cabeçalho fixo
│
├── assets/
│   ├── css/
│   │   style.css          ← cores, fontes, todos os componentes visuais
│   │   responsive.css     ← ajustes para tablet/desktop (mobile é a base)
│   │
│   ├── js/
│   │   app.js             ← carrega os JSONs, monta a página, liga os CTAs
│   │   animations.js      ← animações leves de entrada ao rolar a página
│   │
│   ├── images/
│   │   autoridade/    ← foto da Elis (assets/images/autoridade/elis-nhaia.jpg)
│   │   depoimentos/   ← fotos dos clientes que deram depoimento
│   │   brand/         ← favicon e imagem de compartilhamento (og-image)
│   │
│   └── data/
│       content.json       ← todo o texto da página
│       faq.json           ← perguntas frequentes
│       testimonials.json  ← depoimentos
│       config.json        ← links, vagas, rastreamento
│
├── components/             ← pedaços de HTML que o app.js injeta na página
│   hero.html              ← headline + contador de urgência + CTAs
│   sections.html          ← dores, autoridade (foto + redes sociais),
│                             método, transformação, para quem (em grupos),
│                             depoimentos (com avatar), investimento, garantia
│   faq.html               ← FAQ + CTA final (com 2º contador)
│   footer.html
│
└── README.md               ← este arquivo
```

### Por que a página é dividida em `components/`?
Cada seção fica em um arquivo separado para ser mais fácil de achar e editar
a estrutura (sem precisar abrir um `index.html` gigante). O `app.js` busca
esses arquivos com `fetch()` e os encaixa nos espaços marcados no
`index.html` (`#mount-hero`, `#mount-sections`, etc.).

**Importante:** por usar `fetch()`, a página não funciona ao abrir
`index.html` direto no navegador (`file://`) — o navegador bloqueia esse
tipo de requisição por segurança. Para testar localmente, rode um servidor
simples na pasta do projeto, por exemplo:

```bash
# Python (já vem instalado na maioria dos computadores)
python3 -m http.server 8000
# depois abra http://localhost:8000 no navegador
```

Ao publicar em qualquer hospedagem real (Hostinger, Vercel, Netlify, GitHub
Pages, ou um subdiretório do seu domínio), isso funciona normalmente sem
nenhuma configuração extra.

---

## 3. Fotos (Elis e clientes)

A página já está preparada para receber as fotos reais — enquanto elas não
chegam, aparece um placeholder elegante (silhueta + texto) no lugar da foto
da Elis, e um círculo com as iniciais no lugar da foto de cada depoimento.
Nada fica quebrado ou com ícone de imagem faltando.

### Foto da Elis (seção "Quem é a Elis")
1. Salve a foto em `assets/images/autoridade/` (ex.: `elis-nhaia.jpg`)
2. Atualize o caminho em `config.json > imagens > autoridade`
3. Pronto — o placeholder desaparece e a foto real aparece automaticamente

### Fotos dos depoimentos
1. Salve cada foto em `assets/images/depoimentos/` (ex.: `daiani.jpg`)
2. Atualize o caminho correspondente em `testimonials.json` (campo `foto`
   de cada depoimento)
3. Se não tiver a foto de alguém, deixe o campo como está — continua
   aparecendo o círculo com as iniciais do nome, sem nenhum erro visual

### Outras imagens
- `brand/` — `favicon.png` (32×32) e `og-image.jpg` (1200×630, usada quando
  o link é compartilhado no WhatsApp/Instagram)

Ao adicionar qualquer foto, lembre de:
1. Usar formato `.webp` ou `.jpg` otimizado (peso baixo = carregamento rápido)
2. Manter `loading="lazy"` (já está pronto no código)
3. Preencher um `alt="..."` descritivo se trocar a tag `<img>` manualmente

---

## 4. Rastreamento de tráfego pago (Google Ads / Meta)

Os botões já têm os atributos `data-track="..."` prontos (ex.:
`cta_checkout`, `cta_whatsapp_equipe`, `cta_grupo_whatsapp`). Cada clique já
é registrado no console do navegador (F12 → aba "Console") para você testar
antes de plugar as ferramentas de verdade.

Para ativar de fato:
1. Cole o snippet oficial do Google tag (gtag.js) e/ou do Meta Pixel dentro
   do `<head>` do `index.html`, no local indicado pelo comentário
   `RASTREAMENTO`.
2. Não precisa editar mais nada — o `app.js` já chama `gtag()` e `fbq()`
   automaticamente quando eles existem na página (função
   `dispararRastreamento`, dentro de `app.js`).

---

## 5. Cores e tipografia (caso precise ajustar no futuro)

Definidas no topo de `assets/css/style.css`, dentro de `:root`:

```css
--azul-petroleo: #17394A;   /* cor principal */
--azul-escuro:   #0E2332;   /* fundo base */
--terracota:     #D9783D;   /* botões e destaques */
--bege-claro:    #F8EEE4;   /* seções de leitura */
--branco:        #FFFFFF;
--cinza-azulado: #60727C;   /* textos secundários */
```

Tipografia: **Montserrat** (títulos) + **Lato** (texto), carregadas via
Google Fonts no `index.html`. Para troсar a fonte, edite as variáveis
`--fonte-titulo` e `--fonte-corpo` no mesmo arquivo, e troque o link do
Google Fonts no `<head>`.

---

## 6. Checklist antes de colocar tráfego pago

- [ ] Link do checkout Hotmart real em `config.json`
- [ ] Link do grupo de WhatsApp VIP real em `config.json`
- [ ] Número de WhatsApp da equipe real em `config.json`
- [ ] Perfis de Instagram e LinkedIn da Elis em `config.json`
- [ ] Data-limite real do contador em `config.json > contador > data_limite`
- [ ] Prazo de garantia confirmado com a Elis em `config.json > garantia > dias`
- [ ] Foto da Elis em `assets/images/autoridade/` (opcional, mas muito recomendado)
- [ ] Fotos dos clientes em `assets/images/depoimentos/` (opcional)
- [ ] Pixel do Meta e/ou tag do Google instalados
- [ ] Testar todos os botões de CTA da página (compra, grupo, WhatsApp) em um celular real
- [ ] Verificar `vagas_restantes` em `config.json` antes de abrir a turma
- [ ] Conferir se o contador não está mostrando uma data já vencida
