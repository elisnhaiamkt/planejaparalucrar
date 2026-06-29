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
