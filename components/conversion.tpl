<!-- components/conversion.tpl -->

<!-- 8. PROVAS SOCIAIS -->
<section class="secao secao--bege" id="depoimentos">
  <div class="container">
    <span class="eyebrow" data-bind="provas_sociais.eyebrow"></span>
    <h2 class="titulo-secao" data-bind="provas_sociais.titulo"></h2>

    <div class="grid-depoimentos" id="grid-depoimentos"></div>

    <div class="box-escassez" data-bind="provas_sociais.escassez"></div>

    <p class="texto-lead" data-bind="provas_sociais.cta_titulo" style="margin-bottom: var(--space-md);"></p>
    <div class="grupo-cta">
      <a class="btn btn--primario btn--grande" data-cta="checkout-depoimentos"
         data-track="cta_checkout" href="#" data-bind="provas_sociais.cta_botao"></a>
      <a class="btn btn--whatsapp" data-cta="whatsapp-depoimentos"
         data-track="cta_whatsapp_equipe" href="#">Falar com a equipe</a>
    </div>
    <p class="nota-cta" data-bind="provas_sociais.nota_cta"></p>
  </div>
</section>

<!-- 9. AVALIAÇÕES DO GOOGLE -->
<section class="secao secao--bege avaliacoes-google" id="avaliacoes-google">
  <div class="container">
    <div class="avaliacoes-google__topo">
      <div>
        <span class="eyebrow" id="google-reviews-eyebrow"></span>
        <h2 class="titulo-secao" id="google-reviews-titulo"></h2>
        <p class="texto-lead" id="google-reviews-subtitulo"></p>
      </div>
      <div class="avaliacoes-google__resumo">
        <span class="avaliacoes-google__empresa" id="google-reviews-empresa"></span>
        <span class="avaliacoes-google__nota" id="google-reviews-nota"></span>
        <span class="avaliacoes-google__estrelas" aria-hidden="true">★★★★★</span>
        <span class="avaliacoes-google__total" id="google-reviews-total"></span>
        <a class="avaliacoes-google__link" id="google-reviews-link" href="#" target="_blank" rel="noopener"></a>
      </div>
    </div>

    <div class="avaliacoes-google__carrossel" aria-label="Avaliações do Google">
      <button class="avaliacoes-google__nav avaliacoes-google__nav--anterior" type="button" aria-label="Avaliação anterior">‹</button>
      <div class="avaliacoes-google__viewport" id="google-reviews-viewport">
        <div class="avaliacoes-google__trilho" id="google-reviews-track"></div>
      </div>
      <button class="avaliacoes-google__nav avaliacoes-google__nav--proxima" type="button" aria-label="Próxima avaliação">›</button>
    </div>
  </div>
</section>

<!-- 10. INVESTIMENTO -->
<section class="secao secao--escura secao--centrada investimento" id="investimento">
  <div class="container">
    <span class="eyebrow" data-bind="investimento.eyebrow"></span>
    <h2 class="titulo-secao" data-bind="investimento.titulo"></h2>
    <p class="comparativo-investimento" data-bind="investimento.comparativo"></p>

    <div class="grid-investimento" id="grid-investimento"></div>
    <p class="investimento__rodape" data-bind="investimento.rodape"></p>

    <div class="box-escassez" data-bind="investimento.escassez" style="text-align:left; max-width: 560px; margin: var(--space-lg) auto;"></div>

    <div class="grupo-cta">
      <a class="btn btn--primario btn--grande" data-cta="checkout-investimento"
         data-track="cta_checkout" href="#" data-bind="investimento.cta_botao"></a>
      <a class="btn btn--whatsapp btn--grande" data-cta="whatsapp-pix-investimento"
         data-track="cta_whatsapp_equipe" href="#"
         data-whatsapp-text="Olá! Quero garantir minha vaga no Planejar para Lucrar - Turma 4 pagando via Pix com desconto."
         data-bind="investimento.cta_pix_botao"></a>
    </div>
    <p class="nota-cta" data-bind="investimento.nota_cta"></p>
  </div>
</section>

<!-- GARANTIA -->
<section class="secao secao--bege" id="garantia">
  <div class="container">
    <span class="eyebrow" data-bind="garantia.eyebrow"></span>
    <h2 class="titulo-secao" data-bind="garantia.titulo"></h2>

    <div class="garantia__grid">
      <div class="selo-garantia">
        <span class="selo-garantia__numero" id="garantia-dias"></span>
        <span class="selo-garantia__label" data-bind="garantia.selo_label"></span>
      </div>
      <div>
        <p class="texto-lead" data-bind="garantia.texto" style="margin-bottom: var(--space-md); color: var(--cinza-azulado);"></p>
        <div class="garantia__lista" id="garantia-lista"></div>
        <div class="grupo-cta">
          <a class="btn btn--primario btn--grande" data-cta="checkout-garantia"
             data-track="cta_checkout" href="#" data-bind="garantia.cta_botao"></a>
          <a class="btn btn--whatsapp" data-cta="whatsapp-garantia"
             data-track="cta_whatsapp_equipe" href="#" data-bind="garantia.cta_whatsapp"></a>
        </div>
      </div>
    </div>
  </div>
</section>
