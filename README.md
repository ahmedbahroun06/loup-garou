# 🐺 Loup Garou App

Une application web mobile pensée pour le narrateur d'une partie de **Loup-Garou**. Elle génère une composition de rôles, permet de l'ajuster avant la partie, distribue les rôles de façon privée et conserve un récapitulatif après la partie.

L'application est une **PWA** : elle peut être installée depuis un navigateur compatible et utilisée comme une application sur téléphone.

## Démo en ligne

➡️ [Ouvrir Narrateur Loup Garou](https://loupgarou123.netlify.app/)

## Fonctionnalités

- Sélection du nombre de joueurs, de **5 joueurs minimum** au nombre de rôles disponibles.
- Génération automatique avec environ **35 % de Loups-Garous** (arrondi à l'entier le plus proche, avec au moins un loup).
- Un rôle ne peut être attribué qu'une seule fois dans une même partie.
- Écran de revue pour consulter les rôles générés et les remplacer avant de commencer.
- Création de rôles personnalisés : nom, emoji, camp et description.
- Distribution privée, joueur par joueur, avec révélation au toucher.
- Attribution aléatoire du titre de **Capitaine**.
- Ordre différent et aléatoire entre les écrans de revue, de distribution et de récapitulatif afin d'éviter de déduire l'ordre des rôles.
- Récapitulatif final persistant même après fermeture de l'application.
- Thème sombre et clair.
- Manifest et service worker pour une expérience PWA installable.

## Rôles inclus

### Village et autres camps

Voyante, Sorcière, Protecteur, Chasseur, Alien, Corbeau, Pute, Enfant sauvage, Ours, Voleur, Barbie, Ange, Berger, Feurgeron, Ancien, Détective, Singe, Petite Fille, Cavalier, L'Institutrice et Chien-Loup.

### Loups-Garous

Père infecté, Loup bleu, Loup noir et Loup simple.

Les descriptions des rôles sont visibles pendant la revue et lors de leur distribution. Les rôles personnalisés peuvent compléter cette liste.

## Parcours d'une partie

1. **Nouvelle partie** — Choisir le nombre de joueurs et générer les rôles.
2. **Composition** — Vérifier la sélection, consulter les informations, remplacer un rôle ou ajouter un rôle personnalisé.
3. **Distribution** — Faire défiler les joueurs. Chacun révèle son rôle sur l'écran, puis passe l'appareil au joueur suivant.
4. **Récap narrateur** — Retrouver la composition finale dans un ordre à nouveau mélangé.

Le bouton discret « Nouvelle partie » du récapitulatif remet la partie à zéro tout en conservant les rôles personnalisés et le thème choisi.

## Stack technique

| Technologie | Usage |
| --- | --- |
| [React 19](https://react.dev/) | Interface utilisateur et état de l'application |
| [TypeScript](https://www.typescriptlang.org/) | Typage et fiabilité du code |
| [Vite](https://vite.dev/) | Serveur de développement et build de production |
| [Oxc](https://oxc.rs/) / Oxlint | Vérification statique du code |
| Web App Manifest + Service Worker | Installation et fondations PWA |
| `localStorage` | Sauvegarde locale de la partie, des rôles personnalisés et du thème |

Le projet n'utilise ni base de données ni compte utilisateur : les données restent dans le navigateur de l'appareil du narrateur.

## Démarrer le projet localement

### Prérequis

- [Node.js](https://nodejs.org/) 20 ou supérieur
- npm (fourni avec Node.js)

### Installation

```bash
git clone https://github.com/ahmedbahroun06/loup-garou.git
cd loup-garou
npm install
```

### Commandes disponibles

```bash
# Lancer l'application en développement
npm run dev

# Créer la version de production dans le dossier dist/
npm run build

# Vérifier le code
npm run lint

# Prévisualiser la version de production
npm run preview
```

## Déploiement

Le projet est un site statique. Après avoir exécuté `npm run build`, il suffit de publier le dossier `dist/` sur un hébergeur statique, par exemple Netlify, Vercel, Cloudflare Pages ou GitHub Pages.

Pour Netlify Drop : se connecter à Netlify, ouvrir la page de dépôt manuel, puis déposer le dossier `dist/`. Un nom de site personnalisé permet d'obtenir une adresse lisible telle que `narrateur-loup-garou.netlify.app`.

## Structure du projet

```text
src/
├── components/     # Modales et composants réutilisables
├── data/           # Catalogue des rôles et libellés de camps
├── lib/            # Génération, mélange et persistance locale
├── screens/        # Les quatre écrans du parcours de jeu
├── App.tsx         # Orchestration de l'état et navigation
└── types.ts        # Types TypeScript partagés
public/
├── manifest.json   # Métadonnées PWA
└── sw.js           # Service worker
```

## Données et confidentialité

Toutes les données sont stockées uniquement dans le navigateur via `localStorage`. Effacer les données du site dans le navigateur supprimera la partie en cours, les rôles personnalisés et le thème enregistré.

## Licence

Projet personnel. Ajoute une licence ici si tu souhaites autoriser explicitement la réutilisation du code.
