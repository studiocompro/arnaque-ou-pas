# Arnaque ou pas ? — site prêt à publier

Domaine prévu : https://arnaque-ou-pas.pages.dev

## Mise en ligne
1. Crée un projet Cloudflare Pages nommé `arnaque-ou-pas` (si le nom est disponible).
2. Envoie **le contenu de ce dossier**, avec `index.html` à la racine.
3. Vérifie `https://arnaque-ou-pas.pages.dev/sitemap.xml` puis ajoute cette URL dans Google Search Console.

## Publicités
Les colonnes gauche/droite sont déjà en place (4 emplacements de chaque côté) + 2 emplacements mobile.
Ouvre `assets/js/ads.js` et remplace les valeurs vides par les **numéros data-ad-slot** des unités AdSense créées pour ce site.
Le client `ca-pub-8281021937433044` est déjà configuré.

## CMP / consentement
Le site n’ajoute volontairement pas un faux bandeau cookie maison. Configure la CMP Google/certifiée depuis AdSense pour les zones où le consentement est requis avant d’activer les annonces personnalisées.

## Avant lancement public
- Complète les informations d’éditeur dans les pages `legal.html` si nécessaire.
- Si le domaine Cloudflare est différent, remplace `https://arnaque-ou-pas.pages.dev` dans `sitemap.xml`, `robots.txt` et les balises canonical/hreflang.
- La page « Soutenir avec une vidéo » est prête visuellement mais reste désactivée jusqu’à ce qu’un vrai format vidéo récompensé compatible soit disponible.

## Contenu
6 langues : français, anglais, espagnol, arabe, chinois simplifié, portugais.
12 familles d’arnaques + méthode + “j’ai cliqué” + quiz + recherche locale + nos sites + soutien + pub spéciale Forgotten Source.

## Ajouter un nouveau site Source Studio plus tard
Tu n’as qu’**un seul fichier** à modifier : `assets/js/sites-data.js`.

Copie un bloc de site existant dans `window.SOURCE_STUDIO_SITES`, change le nom, l’URL, l’icône et les descriptions, puis republie. Les pages **Nos sites** des 6 langues se mettent à jour automatiquement.

Un mémo ultra-simple est aussi fourni à la racine : `AJOUTER_UN_SITE.txt`.

Le site **Rêves, simplement.** (`https://reves-simplement.pages.dev/`) est déjà inclus dans la liste.


## Correctif rails publicitaires
Les colonnes publicitaires gauche et droite sont désormais générées automatiquement sur toute la hauteur du contenu central. Pour modifier leur densité, changer `targetHeight=230` dans `assets/js/ads.js`.
