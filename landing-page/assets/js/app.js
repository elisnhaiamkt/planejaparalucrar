/**
 * PLANEJAR PARA LUCRAR — Turma 4
 * app.js
 *
 * O que este arquivo faz, em ordem:
 *  1. Carrega os componentes HTML (hero, seções, faq, footer) dentro do index.html
 *  2. Carrega os arquivos JSON de assets/data/
 *  3. Preenche todo texto marcado com [data-bind="chave.subchave"]
 *  4. Renderiza as listas (dores, etapas do método, depoimentos, FAQ, etc.)
 *  5. Aplica os links reais (checkout, WhatsApp) vindos de config.json
 *  6. Liga o clique de cada CTA ao rastreamento (GA4 / Meta Pixel — ver função
 *     dispararRastreamento)
 *
 * PARA EDITAR TEXTOS OU LINKS: normalmente você NÃO precisa tocar neste
 * arquivo. Edite os .json em assets/data/. Só edite este arquivo se quiser
 * mudar COMO algo é montado na tela.
 */

(function () {
  "use strict";

  const CAMINHO_DADOS = "assets/data/";
  const CAMINHO_COMPONENTES = "components/";

  /* IDs das seções, na ordem em que aparecem no menu (content.header.nav) */
  const IDS_MENU = ["metodo", "autoridade", "depoimentos", "garantia", "investimento", "faq"];

  /* ---------------------------------------------------------------------
   * 1. CARREGAMENTO DE COMPONENTES E DADOS
   * ------------------------------------------------------------------- */

  async function carregarParcial(seletorMontagem, arquivo) {
    const alvo = document.querySelector(seletorMontagem);
    if (!alvo) return;
    try {
      const resposta = await fetch(CAMINHO_COMPONENTES + arquivo);
      if (!resposta.ok) throw new Error("HTTP " + resposta.status);
      alvo.innerHTML = await resposta.text();
    } catch (erro) {
      console.error("Não foi possível carregar " + arquivo + ":", erro);
      alvo.innerHTML = "<p style='padding:2rem;color:#D9783D'>Não foi possível carregar esta seção (" + arquivo + ").</p>";
    }
  }

  async function carregarJSON(arquivo) {
    const resposta = await fetch(CAMINHO_DADOS + arquivo);
    if (!resposta.ok) throw new Error("HTTP " + resposta.status + " ao buscar " + arquivo);
    return resposta.json();
  }

  async function iniciar() {
    // Componentes e dados podem ser buscados em paralelo
    const [, dados] = await Promise.all([
      Promise.all([
        carregarParcial("#mount-hero", "hero.html"),
        carregarParcial("#mount-sections", "sections.html"),
        carregarParcial("#mount-faq", "faq.html"),
        carregarParcial("#mount-footer", "footer.html"),
      ]),
      Promise.all([
        carregarJSON("content.json"),
        carregarJSON("config.json"),
        carregarJSON("faq.json"),
        carregarJSON("testimonials.json"),
      ]).then(([content, config, faq, testimonials]) => ({ content, config, faq, testimonials })),
    ]);

    montarPagina(dados);
  }

  /* ---------------------------------------------------------------------
   * 2. MONTAGEM DA PÁGINA
   * ------------------------------------------------------------------- */

  function montarPagina({ content, config, faq, testimonials }) {
    preencherTextos(content);
    montarMenu(content.header.nav);
    montarListaSimples("#lista-dores", content.dores.lista, criarItemDor);
    montarStats("#stats-autoridade", content.autoridade.stats);
    montarParagrafos("#autoridade-paragrafos", content.autoridade.paragrafos);
    montarFotoAutoridade(config.imagens.autoridade, content);
    montarRedesSociais(config.links);
    montarTimelineMetodo("#timeline-metodo", content.metodo.etapas);
    montarListaSimples("#transformacao-antes", content.transformacao.antes.itens, (t) => criarLi(t));
    montarListaSimples("#transformacao-depois", content.transformacao.depois.itens, (t) => criarLi(t));
    montarGruposParaQuem("#grupos-paraquem", content.para_quem.grupos);
    montarDepoimentos("#grid-depoimentos", testimonials.depoimentos);
    montarInvestimento("#grid-investimento", content.investimento.opcoes);
    montarGarantia(config.garantia, content.garantia);
    montarFAQ("#lista-faq", faq.perguntas);

    aplicarLinks(config.links);
    aplicarEscassez(config.exibicao, content);
    aplicarTokens(config);
    ligarRastreamento(config.rastreamento);
    iniciarContador(config.contador, content.contador);

    document.title = content.hero.headline + " — " + content.marca.empresa;

    // animations.js expõe esta função globalmente; reaplica o observer
    // de revelação para os elementos que acabamos de criar dinamicamente.
    if (typeof window.observarRevelacoes === "function") {
      window.observarRevelacoes();
    }
  }

  /* ---------- Textos simples [data-bind] ---------- */

  function buscarValor(obj, caminho) {
    return caminho.split(".").reduce((atual, chave) => (atual == null ? undefined : atual[chave]), obj);
  }

  function preencherTextos(content) {
    document.querySelectorAll("[data-bind]").forEach((el) => {
      const caminho = el.getAttribute("data-bind");
      const valor = buscarValor(content, caminho);
      if (typeof valor === "string") {
        el.textContent = valor;
      }
    });

    // Casos especiais: link de e-mail e site no rodapé
    const linkEmail = document.querySelector("#footer-email");
    if (linkEmail) {
      linkEmail.textContent = content.links_exibicao || "";
    }
  }

  /* ---------- Menu ---------- */

  function montarMenu(itensMenu) {
    const nav = document.querySelector("#header-nav");
    if (!nav) return;
    nav.innerHTML = "";
    itensMenu.forEach((rotulo, indice) => {
      const id = IDS_MENU[indice] || "hero";
      const link = document.createElement("a");
      link.href = "#" + id;
      link.textContent = rotulo;
      nav.appendChild(link);
    });
  }

  /* ---------- Helpers de criação de elementos ---------- */

  function criarLi(texto) {
    const li = document.createElement("li");
    li.textContent = texto;
    return li;
  }

  function criarItemDor(texto) {
    const li = document.createElement("li");
    li.className = "item-dor revelar";
    li.innerHTML =
      '<span class="item-dor__marca" aria-hidden="true">✗</span>' +
      '<span class="item-dor__texto"></span>';
    li.querySelector(".item-dor__texto").textContent = texto;
    return li;
  }

  function montarGruposParaQuem(seletor, grupos) {
    const alvo = document.querySelector(seletor);
    if (!alvo || !grupos) return;
    alvo.innerHTML = "";
    grupos.forEach((grupo) => {
      const div = document.createElement("div");
      div.className = "grupo-paraquem revelar";
      div.innerHTML =
        '<p class="grupo-paraquem__titulo"></p><p class="grupo-paraquem__texto"></p>';
      div.querySelector(".grupo-paraquem__titulo").textContent = grupo.titulo;
      div.querySelector(".grupo-paraquem__texto").textContent = grupo.texto;
      alvo.appendChild(div);
    });
  }

  function montarListaSimples(seletor, itens, fabricaItem) {
    const alvo = document.querySelector(seletor);
    if (!alvo || !itens) return;
    alvo.innerHTML = "";
    itens.forEach((item) => alvo.appendChild(fabricaItem(item)));
  }

  /* ---------- Autoridade: estatísticas e parágrafos ---------- */

  function montarStats(seletor, stats) {
    const alvo = document.querySelector(seletor);
    if (!alvo || !stats) return;
    alvo.innerHTML = "";
    stats.forEach((stat) => {
      const div = document.createElement("div");
      div.className = "stat-item revelar";
      div.innerHTML =
        '<span class="stat-item__numero"></span><span class="stat-item__label"></span>';
      div.querySelector(".stat-item__numero").textContent = stat.numero;
      div.querySelector(".stat-item__label").textContent = stat.label;
      alvo.appendChild(div);
    });
  }

  function montarParagrafos(seletor, paragrafos) {
    const alvo = document.querySelector(seletor);
    if (!alvo || !paragrafos) return;
    alvo.innerHTML = "";
    paragrafos.forEach((texto) => {
      const p = document.createElement("p");
      p.className = "autoridade__paragrafo";
      p.textContent = texto;
      alvo.appendChild(p);
    });
  }

  /**
   * Tenta carregar uma imagem real; se o arquivo não existir ainda
   * (ex.: foto da Elis ou de um cliente não foi adicionada), mostra
   * um placeholder elegante em vez de um ícone de imagem quebrada.
   */
  function carregarImagemComFallback(imgEl, placeholderEl, src) {
    if (!imgEl || !src) return;
    imgEl.addEventListener("load", () => {
      imgEl.style.display = "block";
      if (placeholderEl) placeholderEl.style.display = "none";
    });
    imgEl.addEventListener("error", () => {
      imgEl.style.display = "none";
      if (placeholderEl) placeholderEl.style.display = "flex";
    });
    imgEl.src = src;
  }

  function montarFotoAutoridade(caminhoFoto) {
    const img = document.querySelector("#img-autoridade");
    const placeholder = document.querySelector("#placeholder-autoridade");
    carregarImagemComFallback(img, placeholder, caminhoFoto);
  }

  function montarRedesSociais(links) {
    const instagram = document.querySelector('[data-link="instagram"]');
    const linkedin = document.querySelector('[data-link="linkedin"]');
    if (instagram && links.instagram) {
      instagram.href = links.instagram;
    }
    if (linkedin && links.linkedin) {
      linkedin.href = links.linkedin;
    }
  }

  /* ---------- Método: linha do tempo (elemento de assinatura) ---------- */

  function montarTimelineMetodo(seletor, etapas) {
    const alvo = document.querySelector(seletor);
    if (!alvo || !etapas) return;
    alvo.innerHTML = "";

    etapas.forEach((etapa) => {
      const artigo = document.createElement("article");
      artigo.className = "etapa revelar";

      const numero = document.createElement("div");
      numero.className = "etapa__numero";
      numero.textContent = etapa.numero;
      numero.setAttribute("aria-hidden", "true");

      const corpo = document.createElement("div");
      corpo.className = "etapa__corpo";

      const nome = document.createElement("h3");
      nome.className = "etapa__nome";
      nome.textContent = "Encontro " + etapa.numero + " — " + etapa.nome;

      const frase = document.createElement("p");
      frase.className = "etapa__frase";
      frase.textContent = etapa.frase;

      const listaPontos = document.createElement("div");
      listaPontos.className = "etapa__pontos";
      etapa.pontos.forEach((ponto) => {
        const p = document.createElement("p");
        p.className = "etapa__ponto";
        p.textContent = ponto;
        listaPontos.appendChild(p);
      });

      const entrega = document.createElement("div");
      entrega.className = "etapa__entrega";
      entrega.innerHTML = "<span>Entrega</span>";
      entrega.appendChild(document.createTextNode(etapa.entrega));

      corpo.append(nome, frase, listaPontos, entrega);
      artigo.append(numero, corpo);
      alvo.appendChild(artigo);
    });
  }

  /* ---------- Depoimentos ---------- */

  function obterIniciais(nome) {
    return nome
      .replace(/^Dra?\.\s*/i, "")
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((parte) => parte[0].toUpperCase())
      .join("");
  }

  function montarDepoimentos(seletor, depoimentos) {
    const alvo = document.querySelector(seletor);
    if (!alvo || !depoimentos) return;
    alvo.innerHTML = "";
    depoimentos.forEach((dep) => {
      const div = document.createElement("figure");
      div.className = "depoimento revelar";
      div.innerHTML =
        '<span class="depoimento__aspas" aria-hidden="true">“</span>' +
        '<blockquote class="depoimento__texto"></blockquote>' +
        '<figcaption class="depoimento__autor">' +
        '  <div class="depoimento__cabeca">' +
        '    <div class="depoimento__avatar">' +
        '      <span class="depoimento__iniciais"></span>' +
        '      <img alt="" loading="lazy" style="display:none;">' +
        "    </div>" +
        "    <div>" +
        '      <div class="depoimento__nome"></div>' +
        '      <span class="depoimento__cargo"></span>' +
        "    </div>" +
        "  </div>" +
        "</figcaption>";

      div.querySelector(".depoimento__texto").textContent = dep.texto;
      div.querySelector(".depoimento__nome").textContent = dep.nome;
      div.querySelector(".depoimento__cargo").textContent = dep.cargo;
      div.querySelector(".depoimento__iniciais").textContent = obterIniciais(dep.nome);

      const img = div.querySelector(".depoimento__avatar img");
      const iniciais = div.querySelector(".depoimento__iniciais");
      carregarImagemComFallback(img, iniciais, dep.foto);

      alvo.appendChild(div);
    });
  }

  /* ---------- Investimento ---------- */

  function montarInvestimento(seletor, opcoes) {
    const alvo = document.querySelector(seletor);
    if (!alvo || !opcoes) return;
    alvo.innerHTML = "";
    opcoes.forEach((opcao) => {
      const div = document.createElement("div");
      div.className = "cartao-preco revelar" + (opcao.destaque ? " cartao-preco--destaque" : "");
      div.innerHTML =
        '<span class="cartao-preco__label"></span>' +
        '<p class="cartao-preco__valor"></p>' +
        '<span class="cartao-preco__nota"></span>';
      div.querySelector(".cartao-preco__label").textContent = opcao.label;
      div.querySelector(".cartao-preco__valor").textContent = opcao.valor;
      div.querySelector(".cartao-preco__nota").textContent = opcao.nota;
      alvo.appendChild(div);
    });
  }

  /* ---------- Garantia ---------- */

  function montarGarantia(configGarantia, textoGarantia) {
    const secao = document.querySelector("#garantia");
    if (!secao) return;

    if (!configGarantia || !configGarantia.ativo) {
      secao.remove();
      return;
    }

    const numero = document.querySelector("#garantia-dias");
    if (numero) numero.textContent = configGarantia.dias;

    montarListaSimples("#garantia-lista", textoGarantia.itens, (texto) => {
      const div = document.createElement("div");
      div.className = "garantia__item";
      div.textContent = texto;
      return div;
    });
  }

  /* ---------- FAQ (acordeão acessível) ---------- */

  function montarFAQ(seletor, perguntas) {
    const alvo = document.querySelector(seletor);
    if (!alvo || !perguntas) return;
    alvo.innerHTML = "";

    perguntas.forEach((item, indice) => {
      const wrapper = document.createElement("div");
      wrapper.className = "faq-item-wrapper";

      const idResposta = "faq-resposta-" + indice;

      const botao = document.createElement("button");
      botao.className = "faq-item__pergunta faq-item";
      botao.setAttribute("aria-expanded", "false");
      botao.setAttribute("aria-controls", idResposta);
      botao.innerHTML =
        '<span></span><span class="faq-item__icone" aria-hidden="true">+</span>';
      botao.querySelector("span").textContent = item.pergunta;

      const resposta = document.createElement("div");
      resposta.className = "faq-item__resposta";
      resposta.id = idResposta;
      resposta.innerHTML = '<div class="faq-item__resposta-interno"></div>';
      resposta.querySelector("div").textContent = item.resposta;

      botao.addEventListener("click", () => {
        const aberto = botao.getAttribute("aria-expanded") === "true";
        botao.setAttribute("aria-expanded", String(!aberto));
        resposta.style.maxHeight = aberto ? "0px" : resposta.scrollHeight + "px";
      });

      wrapper.append(botao, resposta);
      alvo.appendChild(wrapper);
    });
  }

  /* ---------------------------------------------------------------------
   * 3. LINKS REAIS (checkout, WhatsApp) — vêm de config.json
   * ------------------------------------------------------------------- */

  function aplicarLinks(links) {
    document.querySelectorAll('[data-cta^="checkout-"]').forEach((el) => {
      el.href = links.checkout_hotmart;
      el.target = "_blank";
      el.rel = "noopener";
    });
    document.querySelectorAll('[data-cta^="grupo-"]').forEach((el) => {
      el.href = links.whatsapp_grupo_vip;
      el.target = "_blank";
      el.rel = "noopener";
    });
    document.querySelectorAll('[data-cta^="whatsapp-"]').forEach((el) => {
      el.href = links.whatsapp_equipe;
      el.target = "_blank";
      el.rel = "noopener";
    });

    const linkSite = document.querySelector("#footer-site");
    if (linkSite) {
      linkSite.href = links.site;
      linkSite.textContent = links.site.replace(/^https?:\/\//, "");
    }
    const linkEmail = document.querySelector("#footer-email");
    if (linkEmail) {
      linkEmail.href = "mailto:" + links.email;
      linkEmail.textContent = links.email;
    }
  }

  /* ---------------------------------------------------------------------
   * 4. ESCASSEZ DINÂMICA (vagas restantes) — opcional, via config.json
   * ------------------------------------------------------------------- */

  function aplicarEscassez(exibicao, content) {
    if (!exibicao || !exibicao.mostrar_contagem_vagas) return;
    const vagas = exibicao.vagas_restantes;
    const sufixo = " · " + vagas + (vagas === 1 ? " vaga restante" : " vagas restantes");
    const tarjaHero = document.querySelector(".hero .tarja");
    if (tarjaHero) tarjaHero.textContent = content.hero.escassez + sufixo;
  }

  /**
   * Substitui marcadores como {dias} pelo valor real vindo do config.json.
   * Usado, por ex., em cta_final.nota_cta ("Garantia de {dias} dias").
   */
  function aplicarTokens(config) {
    const dias = config.garantia && config.garantia.ativo ? config.garantia.dias : null;
    document.querySelectorAll("[data-bind]").forEach((el) => {
      if (el.textContent.includes("{dias}")) {
        el.textContent = dias
          ? el.textContent.replace("{dias}", dias)
          : el.textContent.replace(/\s*·\s*Garantia de \{dias\} dias/, "");
      }
    });
  }

  /* ---------------------------------------------------------------------
   * CONTADOR REGRESSIVO (urgência) — dígitos com efeito de giro
   * ------------------------------------------------------------------- */

  function iniciarContador(configContador, textoContador) {
    const instancias = document.querySelectorAll(".js-contador-instancia");
    if (!instancias.length) return;

    if (!configContador || !configContador.ativo) {
      instancias.forEach((el) => el.remove());
      return;
    }

    function obterDataLimiteAtiva() {
      const dataFinal = new Date(configContador.data_limite).getTime();
      if (configContador.modo !== "semanal_ate_data_limite") return dataFinal;

      const dataInicio = new Date(configContador.data_inicio).getTime();
      const janelaDias = Number(configContador.janela_dias || 7);
      const janelaMs = janelaDias * 24 * 60 * 60 * 1000;
      const agora = Date.now();

      if (isNaN(dataInicio) || isNaN(dataFinal) || janelaMs <= 0) return dataFinal;
      if (agora < dataInicio) return Math.min(dataInicio + janelaMs, dataFinal);

      const ciclosPassados = Math.floor((agora - dataInicio) / janelaMs) + 1;
      return Math.min(dataInicio + ciclosPassados * janelaMs, dataFinal);
    }

    function atualizar() {
      const dataLimite = obterDataLimiteAtiva();
      const agora = Date.now();
      const restante = dataLimite - agora;

      if (isNaN(dataLimite) || restante <= 0) {
        instancias.forEach((instancia) => {
          instancia.innerHTML = "";
          instancia.textContent = textoContador.expirado;
        });
        clearInterval(intervalo);
        return;
      }

      const dias = Math.floor(restante / (1000 * 60 * 60 * 24));
      const horas = Math.floor((restante / (1000 * 60 * 60)) % 24);
      const min = Math.floor((restante / (1000 * 60)) % 60);
      const seg = Math.floor((restante / 1000) % 60);

      atualizarUnidade("dias", dias);
      atualizarUnidade("horas", horas);
      atualizarUnidade("min", min);
      atualizarUnidade("seg", seg);
    }

    function atualizarUnidade(unidade, valor) {
      const valorFormatado = String(valor).padStart(2, "0");
      document.querySelectorAll('[data-unidade="' + unidade + '"]').forEach((el) => {
        if (el.textContent === valorFormatado) return;
        el.textContent = valorFormatado;
        el.classList.remove("girando");
        // força reflow para a animação rodar de novo a cada troca de dígito
        void el.offsetWidth;
        el.classList.add("girando");
      });
    }

    atualizar();
    const intervalo = setInterval(atualizar, 1000);
  }

  /* ---------------------------------------------------------------------
   * 5. RASTREAMENTO DE CLIQUES (preparado para GA4 / Meta Pixel)
   * ------------------------------------------------------------------- */

  function dispararRastreamento(nomeEvento, dataAttrs) {
    // Google Analytics 4 (gtag.js) — descomente quando o snippet estiver instalado
    if (typeof window.gtag === "function") {
      window.gtag("event", nomeEvento, dataAttrs);
    }
    // Meta Pixel — descomente quando o snippet estiver instalado
    if (typeof window.fbq === "function") {
      window.fbq("trackCustom", nomeEvento, dataAttrs);
    }
    // Sempre loga no console para facilitar testes antes de plugar as ferramentas
    console.info("[rastreamento]", nomeEvento, dataAttrs);
  }

  function ligarRastreamento() {
    document.body.addEventListener("click", (evento) => {
      const el = evento.target.closest("[data-track]");
      if (!el) return;
      dispararRastreamento(el.getAttribute("data-track"), {
        cta_id: el.getAttribute("data-cta") || "",
        texto: el.textContent.trim(),
      });
    });
  }

  /* ---------------------------------------------------------------------
   * 6. HEADER FIXO COM EFEITO AO ROLAR
   * ------------------------------------------------------------------- */

  function ligarHeaderRolagem() {
    const header = document.querySelector("#header");
    if (!header) return;
    const aoRolar = () => {
      header.classList.toggle("header--rolado", window.scrollY > 40);
    };
    window.addEventListener("scroll", aoRolar, { passive: true });
    aoRolar();
  }

  /* ---------------------------------------------------------------------
   * INICIALIZAÇÃO
   * ------------------------------------------------------------------- */

  document.addEventListener("DOMContentLoaded", () => {
    ligarHeaderRolagem();
    iniciar().catch((erro) => console.error("Erro ao montar a página:", erro));
  });
})();
