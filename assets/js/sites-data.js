/*
  ================================================================
  SOURCE STUDIO — LISTE DES SITES
  ================================================================
  POUR AJOUTER UN NOUVEAU SITE PLUS TARD :
  1) Copie un bloc {...} ci-dessous.
  2) Change icon, name, url et les descriptions.
  3) Enregistre CE SEUL FICHIER puis republie le site.

  Les 6 pages "Nos sites" se mettent à jour automatiquement.
  Si une traduction manque, le français est utilisé par défaut.
  ================================================================
*/
window.SOURCE_STUDIO_SITES = [
  {
    icon: "📊",
    name: "CreatorRank",
    url: "https://creatorrank-fr.pages.dev/",
    desc: {
      fr: "Classements et actualité des créateurs YouTube, Twitch et Kick francophones.",
      en: "Rankings and news about French-speaking YouTube, Twitch and Kick creators.",
      es: "Clasificaciones y noticias sobre creadores francófonos de YouTube, Twitch y Kick.",
      ar: "تصنيفات وأخبار صناع المحتوى الناطقين بالفرنسية على YouTube وTwitch وKick.",
      "zh-cn": "法语区 YouTube、Twitch 和 Kick 创作者排行榜与资讯。",
      pt: "Rankings e notícias de criadores francófonos do YouTube, Twitch e Kick."
    }
  },
  {
    icon: "🗳️",
    name: "Présidentielle, simplement.",
    url: "https://presidentielle-simple.pages.dev/",
    desc: {
      fr: "La présidentielle française expliquée et comparée de façon très simple.",
      en: "The French presidential election explained and compared in a very simple way.",
      es: "Las elecciones presidenciales francesas explicadas y comparadas de forma muy sencilla.",
      ar: "شرح ومقارنة الانتخابات الرئاسية الفرنسية بطريقة بسيطة جداً.",
      "zh-cn": "用非常简单的方式解释和比较法国总统选举。",
      pt: "A eleição presidencial francesa explicada e comparada de forma muito simples."
    }
  },
  {
    icon: "🌍",
    name: "Terre plate — réfutation",
    url: "https://terre-plate-refutation.pages.dev/",
    desc: {
      fr: "Les arguments de la Terre plate examinés un par un avec expériences et explications.",
      en: "Flat-Earth arguments examined one by one with experiments and explanations.",
      es: "Argumentos de la Tierra plana examinados uno a uno con experimentos y explicaciones.",
      ar: "فحص حجج الأرض المسطحة واحدة تلو الأخرى مع تجارب وتفسيرات.",
      "zh-cn": "逐一分析地平说论点，并配合实验和解释。",
      pt: "Argumentos da Terra plana analisados um a um com experiências e explicações."
    }
  },
  {
    icon: "🤖",
    name: "IA Atlas",
    url: "https://ia-atlas.pages.dev/",
    desc: {
      fr: "Tutoriels et repères simples pour comprendre et utiliser l’intelligence artificielle.",
      en: "Simple tutorials and guides to understand and use artificial intelligence.",
      es: "Tutoriales y guías sencillas para comprender y utilizar la inteligencia artificial.",
      ar: "دروس وأدلة بسيطة لفهم الذكاء الاصطناعي واستخدامه.",
      "zh-cn": "用简单教程和指南理解并使用人工智能。",
      pt: "Tutoriais e guias simples para compreender e usar inteligência artificial."
    }
  },
  {
    icon: "🦴",
    name: "Géants humains — réfutation",
    url: "https://geants-humains-refutation.pages.dev/",
    desc: {
      fr: "Photos, fossiles et affirmations sur les géants humains examinés de façon critique.",
      en: "Photos, fossils and claims about human giants examined critically.",
      es: "Fotos, fósiles y afirmaciones sobre gigantes humanos examinados de forma crítica.",
      ar: "فحص نقدي للصور والأحافير والادعاءات المتعلقة بالعمالقة البشر.",
      "zh-cn": "批判性分析有关“巨人类”的照片、化石和说法。",
      pt: "Fotos, fósseis e alegações sobre gigantes humanos analisados criticamente."
    }
  },
  {
    icon: "🌙",
    name: "Rêves, simplement.",
    url: "https://reves-simplement.pages.dev/",
    desc: {
      fr: "Comprendre les rêves, cauchemars, rêves lucides et l’oubli des rêves simplement.",
      en: "A simple guide to dreams, nightmares, lucid dreams and why dreams are forgotten.",
      es: "Una guía sencilla sobre sueños, pesadillas, sueños lúcidos y por qué olvidamos los sueños.",
      ar: "دليل بسيط لفهم الأحلام والكوابيس والأحلام الواعية ولماذا ننسى أحلامنا.",
      "zh-cn": "简单了解梦、噩梦、清醒梦以及为什么会忘记梦。",
      pt: "Um guia simples sobre sonhos, pesadelos, sonhos lúcidos e por que esquecemos os sonhos."
    }
  }
];

(function () {
  const grid = document.querySelector('[data-sites-grid]');
  if (!grid) return;

  const lang = (document.documentElement.lang || 'fr').toLowerCase();
  const sites = window.SOURCE_STUDIO_SITES || [];

  grid.innerHTML = sites.map(site => {
    const text = (site.desc && (site.desc[lang] || site.desc.fr)) || '';
    const icon = site.icon || '🌐';
    return `<a class="sitecard" target="_blank" rel="noopener" href="${site.url}">
      <div class="siteicon" aria-hidden="true">${icon}</div>
      <b>↗ ${site.name}</b>
      <span>${text}</span>
    </a>`;
  }).join('');
})();
