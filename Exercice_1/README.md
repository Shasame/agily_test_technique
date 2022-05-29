# agily_test_technique

## Build Setup

```bash
# install dependencies
$ npm install

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out the [documentation](https://nuxtjs.org).

## Structure
Vous trouverez dans ce dossier tout le code correpondant à l'exercice 1.

## Approche de résolution

Cette exercice consiste à la réalisation d'un front-end pour une application de météo. Cette réalisation est segmentée en 2 grandes parties :  la collectes d'infomation via requète sur des APIs, et le design attendu des 2 pages de l'application.

Mon approche a été de commencer par avoir une application respectant les consignes et fonctionnel avant de m'occuper du design.

### Réalisation du projet

- Création de l'application Nuxtjs
- Réalisation de la page d'acceuil
- Test de l'API OWA 
  - D'abord sur Postman pour avoir une idée précise des réponses
  - Ensuite dans le projet
- Réalisation de la deuxième page sans design
- Réfactoriasation du code
- Ajouts du design demandé sur les 2 pages
- Ajouts de l'API ~~GoogleMaps+PlacePhotos~~ Flickr pour les photos en fond 

## Axes d'amélioration

La réalisation du projet m'a pris autour de 14 heures mis bout à bout, ce qui représente bien plus que ce à quoi je m'attendais. J'ai passé beaucoup de temps sur le design sans être pleinement satisfait du résultat. Un axe d'amélioration est donc de travailler sur le design et donc en CSS afin de mieu en comprendre les spécificités et ne plus perdre autant de temps dessus.

J'aurais préféré utiliser les APIs proposées par Google pour les images de fond afin d'avoir de meilleur image et qui correspondent mieux a ce qui est attendu. Malheureusement j'ai trouvé la documantation de ces APIs très peu claire et comme les images sont la dérnière chose que j'ai ajouté je n'ai pas eu le temps de comprendre comment les utilisers.

Une amélioration est possible dans le choix de la ville comme un menu déroulant. Ou rajouter l'option d'un pays.

# Nuxt Documentation

## Special Directories

You can create the following extra directories, some of which have special behaviors. Only `pages` is required; you can delete them if you don't want to use their functionality.

### `assets`

The assets directory contains your uncompiled assets such as Stylus or Sass files, images, or fonts.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/assets).

### `components`

The components directory contains your Vue.js components. Components make up the different parts of your page and can be reused and imported into your pages, layouts and even other components.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/components).

### `layouts`

Layouts are a great help when you want to change the look and feel of your Nuxt app, whether you want to include a sidebar or have distinct layouts for mobile and desktop.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/layouts).


### `pages`

This directory contains your application views and routes. Nuxt will read all the `*.vue` files inside this directory and setup Vue Router automatically.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/get-started/routing).

### `plugins`

The plugins directory contains JavaScript plugins that you want to run before instantiating the root Vue.js Application. This is the place to add Vue plugins and to inject functions or constants. Every time you need to use `Vue.use()`, you should create a file in `plugins/` and add its path to plugins in `nuxt.config.js`.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/plugins).

### `static`

This directory contains your static files. Each file inside this directory is mapped to `/`.

Example: `/static/robots.txt` is mapped as `/robots.txt`.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/static).

### `store`

This directory contains your Vuex store files. Creating a file in this directory automatically activates Vuex.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/store).
