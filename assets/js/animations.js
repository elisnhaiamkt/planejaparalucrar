/**
 * animations.js
 * Pequenas animações de entrada (fade + slide leve) ao rolar a página.
 * Respeita prefers-reduced-motion automaticamente (ver style.css e o
 * teste abaixo) e funciona tanto com elementos estáticos quanto com os
 * elementos criados dinamicamente pelo app.js (por isso a função
 * observarRevelacoes() é exposta em window para ser chamada de novo
 * sempre que novo conteúdo for inserido no DOM).
 */

(function () {
  "use strict";

  const preferenciaPorReducaoDeMovimento =
    window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let observador = null;

  function criarObservador() {
    if (preferenciaPorReducaoDeMovimento) {
      // Sem observer: tudo aparece direto, sem animação.
      return null;
    }
    return new IntersectionObserver(
      (entradas) => {
        entradas.forEach((entrada) => {
          if (entrada.isIntersecting) {
            entrada.target.classList.add("revelar--ativo");
            observador.unobserve(entrada.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
  }

  function observarRevelacoes() {
    const elementos = document.querySelectorAll(".revelar:not(.revelar--ativo)");

    if (preferenciaPorReducaoDeMovimento) {
      elementos.forEach((el) => el.classList.add("revelar--ativo"));
      return;
    }

    if (!observador) observador = criarObservador();

    elementos.forEach((el, indice) => {
      // pequeno atraso escalonado para listas (dores, etapas, depoimentos)
      el.style.transitionDelay = Math.min(indice * 60, 360) + "ms";
      observador.observe(el);
    });
  }

  // Disponível globalmente para o app.js chamar depois de montar cada bloco
  window.observarRevelacoes = observarRevelacoes;

  // Primeira chamada para qualquer elemento .revelar já presente no HTML estático
  document.addEventListener("DOMContentLoaded", observarRevelacoes);
})();
