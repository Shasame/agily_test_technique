# agily_test_technique

## Specifications

- If you have a PORT environement variable the API will listen to this one, else it will listen to port 3000
- This API requires a OpenWeatherAPI key in the server environnement

```bash
PORT=<YOUR_PORT>

OWA_API_KEY=<YOUR_API_KEY>
```

## Build Setup

```bash
# install dependencies
$ npm install

#Deploy API
$ node index.js

```

## Structure
Vous trouverez dans ce dossier tout le code correpondant à l'exercice 2.

## Approche de résolution

Cette exercice consiste à la réalisation d'une API pour une application de météo avec le framework ExpressJs. Cette réalisation consiste à créer les endpoints voulu, collecter les infomations via requète sur des APIs, et renvoyer uniquement les informations utils.

### Réalisation du projet

- Découverte du framework ExpressJs
- Création du projet
- Ajout des endpoints
- Test des endpoints avec Postman

La réalisation de cette exercice m'a pris 3 heures dont une pour découvrir ExpressJs.

## Axes d'amélioration

Ceci est la première fois que je réalise une API je n'ai pas vraiment de points de repère. Il doit probablement avoir plusieurs points possible a améliorer comme une test-suites, l'intégration de cette API dans le premier exercice et donc de appels à l'API Flickr dans cette API.
