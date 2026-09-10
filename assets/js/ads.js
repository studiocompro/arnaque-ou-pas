/*
 * Arnaque ou pas ? — gestion centralisée des publicités AdSense
 *
 * 4 blocs AdSense utilisés sur tout le site :
 * - gauche  : 9571656655
 * - droite  : 4536997996
 * - milieu  : 5317199379
 * - mobile / bas : 4800721870
 *
 * Le script AdSense global est déjà présent dans le <head> de toutes les pages.
 * Les colonnes latérales s'allongent automatiquement selon la hauteur du contenu.
 */
window.AOP_ADS = {
  client: 'ca-pub-8281021937433044',
  slots: {
    left: '9571656655',
    right: '4536997996',
    middle: '5317199379',
    bottom: '4800721870'
  }
};

(function () {
  'use strict';

  const cfg = window.AOP_ADS;
  if (!cfg) return;

  const DESKTOP_BREAKPOINT = 1230;
  const RAIL_GAP = 22;
  const TARGET_SIDE_HEIGHT = 390;

  function ensureAdSenseLoader() {
    const selector = `script[src*="pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"][src*="${cfg.client}"]`;
    if (document.querySelector(selector)) return;
    const s = document.createElement('script');
    s.async = true;
    s.crossOrigin = 'anonymous';
    s.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${cfg.client}`;
    document.head.appendChild(s);
  }

  function queueAd(ins) {
    if (!ins || ins.dataset.aopQueued === '1') return;
    ins.dataset.aopQueued = '1';
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      // AdSense peut être bloqué par un bloqueur de pubs : le site reste utilisable.
    }
  }

  function buildAd(slot, className, label) {
    const box = document.createElement('div');
    box.className = `aop-ad-unit ${className || ''}`.trim();
    box.setAttribute('aria-label', label || 'Publicité');

    const caption = document.createElement('div');
    caption.className = 'aop-ad-label';
    caption.textContent = label || 'PUBLICITÉ';

    const ins = document.createElement('ins');
    ins.className = 'adsbygoogle';
    ins.style.display = 'block';
    ins.style.width = '100%';
    ins.style.height = '100%';
    ins.setAttribute('data-ad-client', cfg.client);
    ins.setAttribute('data-ad-slot', slot);
    ins.setAttribute('data-ad-format', 'auto');
    ins.setAttribute('data-full-width-responsive', 'true');

    box.appendChild(caption);
    box.appendChild(ins);
    requestAnimationFrame(() => queueAd(ins));
    return box;
  }

  function removeOldMobilePlaceholders() {
    document.querySelectorAll('.mobilead').forEach(el => el.remove());
  }

  function insertMiddleAd(main) {
    if (!main || main.querySelector('.aop-middle-ad')) return;

    const ad = buildAd(cfg.slots.middle, 'aop-middle-ad', 'PUBLICITÉ');
    const topLevel = [...main.children].filter(el => !el.classList.contains('aop-bottom-ad'));

    // Pages composées de plusieurs grandes cartes : on place la pub entre deux blocs.
    if (topLevel.length >= 2) {
      const pivot = topLevel[Math.max(0, Math.floor(topLevel.length / 2) - 1)];
      pivot.insertAdjacentElement('afterend', ad);
      return;
    }

    // Pages article : on l'insère au milieu du contenu, sans casser le titre.
    const container = main.querySelector('.article') || main.querySelector('.section') || main.firstElementChild;
    if (container) {
      const candidates = [...container.children].filter(el =>
        !el.matches('h1, .eyebrow, .verdict, .aop-ad-unit')
      );
      if (candidates.length >= 3) {
        const pivot = candidates[Math.floor(candidates.length / 2) - 1] || candidates[0];
        pivot.insertAdjacentElement('afterend', ad);
        return;
      }
    }

    main.appendChild(ad);
  }

  function insertBottomAd(main) {
    if (!main || main.querySelector('.aop-bottom-ad')) return;
    main.appendChild(buildAd(cfg.slots.bottom, 'aop-bottom-ad', 'PUBLICITÉ'));
  }

  function buildSideRails(main) {
    const rails = [...document.querySelectorAll('.rail')];
    if (!main || rails.length < 2) return;

    if (window.innerWidth <= DESKTOP_BREAKPOINT) {
      rails.forEach(rail => {
        rail.innerHTML = '';
        rail.style.height = '';
      });
      return;
    }

    const mainHeight = Math.max(main.scrollHeight, main.offsetHeight, 760);
    // Au minimum 4 emplacements de chaque côté, puis on continue aussi loin que la page.
    const count = Math.max(4, Math.ceil(mainHeight / TARGET_SIDE_HEIGHT));
    const available = Math.max(220, (mainHeight - (count - 1) * RAIL_GAP) / count);

    rails.forEach((rail, index) => {
      const isLeft = index === 0;
      const slot = isLeft ? cfg.slots.left : cfg.slots.right;
      const sideClass = isLeft ? 'aop-left-ad' : 'aop-right-ad';

      rail.innerHTML = '';
      rail.style.height = `${mainHeight}px`;
      rail.style.gridTemplateRows = `repeat(${count}, minmax(220px, 1fr))`;

      for (let i = 0; i < count; i++) {
        const ad = buildAd(slot, `aop-side-ad ${sideClass}`, 'PUBLICITÉ');
        ad.style.minHeight = `${Math.floor(available)}px`;
        rail.appendChild(ad);
      }
    });
  }

  function initialiseAds() {
    ensureAdSenseLoader();
    removeOldMobilePlaceholders();

    const main = document.querySelector('.main');
    if (!main) return;

    insertMiddleAd(main);
    insertBottomAd(main);

    // Laisse le navigateur finir la mise en page avant de mesurer la hauteur centrale.
    requestAnimationFrame(() => requestAnimationFrame(() => buildSideRails(main)));
  }

  // On attend le chargement complet : certaines pages (ex. "Nos sites") sont remplies par JS.
  if (document.readyState === 'complete') {
    initialiseAds();
  } else {
    window.addEventListener('load', initialiseAds, { once: true });
  }

  let resizeTimer = null;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      const main = document.querySelector('.main');
      if (main) buildSideRails(main);
    }, 250);
  });
})();
