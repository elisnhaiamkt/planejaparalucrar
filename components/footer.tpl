<!-- components/footer.tpl -->
<footer class="footer">
  <div class="container">
    <div class="footer__topo">
      <div>
        <p class="footer__marca" data-bind="footer.empresa"></p>
        <p class="cinza" data-bind="produto_resumo"></p>
      </div>
      <div class="footer__ctas">
        <a class="btn btn--primario" data-cta="checkout-footer" data-track="cta_checkout"
           href="#" data-bind="footer.cta_compra"></a>
        <a class="btn btn--secundario" data-cta="grupo-footer" data-track="cta_grupo_whatsapp"
           href="#" data-bind="footer.cta_grupo"></a>
        <a class="btn btn--whatsapp" data-cta="whatsapp-footer" data-track="cta_whatsapp_equipe"
           href="#" data-bind="footer.cta_whatsapp"></a>
      </div>
    </div>
    <div class="footer__base">
      <span data-bind="marca.empresa"></span>
      <span><a id="footer-email" href="#" data-bind-href-email="true"></a></span>
      <span><a id="footer-site" href="#" target="_blank" rel="noopener"></a></span>
    </div>
  </div>
</footer>
