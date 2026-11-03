# LOG3550 — Devoir 1

## Description du projet

Ce projet consiste à développer l'interface frontend d'un catalogue de bibliothèque avec HTML5, CSS3 et JavaScript, sans utiliser de framework.

L'application permet d'afficher une liste de livres, de rechercher un livre par son titre ou son auteur, de filtrer les résultats par catégorie et par disponibilité, ainsi que de trier les livres.

L'utilisateur peut également ajouter et supprimer des livres. Les données sont sauvegardées dans le `localStorage` du navigateur afin de conserver les modifications après un rechargement de la page.

## Technologies utilisées

* HTML5
* CSS3
* JavaScript
* LocalStorage
* Git / GitHub
* Visual Studio Code

## Structure du projet

```text
devoir1/
├── index.html
├── css/
│   └── styles.css
├── js/
│   ├── data.js
│   └── app.js
├── captures/
│   ├── laptop.png
│   ├── tablette.png
│   └── mobile.png
└── README.md
```

## Mode d'emploi

### Consulter le catalogue

Les livres sont affichés automatiquement dans la section « Catalogue des livres ».

Chaque carte présente :

* le titre du livre ;
* l'auteur ;
* l'année de publication ;
* la catégorie ;
* la disponibilité.

### Rechercher un livre

Utiliser le champ « Rechercher un livre ».

La recherche fonctionne sur :

* le titre ;
* le nom de l'auteur ;
* les majuscules et minuscules ;
* les accents.

### Filtrer les livres

Il est possible de filtrer les livres par catégorie :

* Roman
* Science
* Histoire
* Informatique
* Autre

Il est également possible d'afficher uniquement les livres disponibles.

### Trier les livres

Les livres peuvent être triés :

* par titre de A à Z ;
* par titre de Z à A ;
* par année croissante ;
* par année décroissante.

### Ajouter un livre

Remplir le formulaire avec :

* le titre ;
* l'auteur ;
* l'année ;
* la catégorie ;
* la disponibilité.

Le formulaire vérifie les informations avant l'ajout.

L'année doit être comprise entre 1450 et l'année actuelle.

### Supprimer un livre

Cliquer sur le bouton « Supprimer » de la carte correspondante.

Une confirmation est demandée avant la suppression.

### Réinitialiser le catalogue

Le bouton « Réinitialiser » permet de restaurer les données initiales du catalogue.

## Choix de conception

Les balises HTML5 sémantiques comme `header`, `nav`, `main`, `section` et `footer` ont été utilisées afin de rendre la structure du document plus claire et plus accessible.

Le CSS utilise des variables dans `:root` pour centraliser les couleurs et les espacements.

L'affichage des livres utilise CSS Grid afin de permettre une adaptation automatique aux différentes tailles d'écran.

L'approche mobile-first a été utilisée avec des points de rupture pour les tablettes et les ordinateurs.

En JavaScript, les livres sont générés dynamiquement avec le DOM. Les fonctions `filter()`, `forEach()` et `map()` sont utilisées pour manipuler les données.

Le `localStorage` permet de conserver les livres ajoutés ou supprimés après le rechargement de la page.

## Difficultés rencontrées

Une première difficulté a été la mise en place de la recherche avec gestion des majuscules et des accents.

La validation du formulaire a également demandé plusieurs vérifications afin d'afficher un message d'erreur approprié sous chaque champ.

Une autre difficulté a été la conservation des données après le rechargement de la page. Cette difficulté a été résolue avec `localStorage`.

La gestion de la suppression et de la réinitialisation du catalogue a également nécessité la synchronisation des données avec le `localStorage`.

Enfin, le développement responsive a nécessité l'utilisation de CSS Grid et de plusieurs points de rupture afin d'adapter l'affichage aux téléphones, tablettes et ordinateurs.

## Sources

* Documentation MDN Web Docs — HTML
* Documentation MDN Web Docs — CSS
* Documentation MDN Web Docs — JavaScript
* Documentation MDN Web Docs — Web Storage API
* Documentation W3C — Validation HTML

## Outils d'assistance utilisés

* Visual Studio Code pour l'écriture et l'organisation du code.
* Outils de développement du navigateur pour tester le responsive design et déboguer JavaScript.
* Validateur W3C pour vérifier la conformité du HTML.
* ChatGPT pour obtenir de l'aide sur la compréhension des concepts, la résolution de problèmes et la vérification du code.

## Validation et accessibilité

Le formulaire utilise des labels associés aux champs afin de faciliter son utilisation avec un clavier et les technologies d'assistance.

Les messages d'erreur sont associés aux champs concernés et utilisent `aria-live` pour informer les utilisateurs des erreurs de validation.

La page a été conçue avec des éléments HTML5 sémantiques et une navigation accessible au clavier.

Le document HTML a été vérifié avec le validateur W3C afin de détecter les erreurs de structure.

## Tests responsive

L’interface a été testée sur trois formats d’écran afin de vérifier son adaptation aux différentes tailles d’affichage :

- Ordinateur portable : `captures/laptop.png`
- Tablette : `captures/tablette.png`
- Téléphone mobile : `captures/mobile.png`

Les tests ont confirmé que la mise en page reste lisible et fonctionnelle sur les différents formats d’écran.

## Tests fonctionnels

Les fonctionnalités principales de l'application ont été testées :

* Affichage des 8 livres initiaux.
* Recherche par titre et par auteur.
* Filtrage par catégorie et disponibilité.
* Tri des livres par titre et par année.
* Ajout d'un nouveau livre.
* Suppression d'un livre.
* Réinitialisation du catalogue.
* Vérification de la sauvegarde des données avec localStorage.
* Vérification de la validation des champs du formulaire.

Les tests ont confirmé le bon fonctionnement des fonctionnalités principales.

### Validation W3C

La page HTML a été validée avec le validateur W3C et aucune erreur n’a été détectée.

Capture du résultat :

![Validation W3C](captures/captures%20w3c.png)

## Dépôt GitHub

Le code source du projet est disponible sur GitHub :

https://github.com/BIGELY/LOG3550_DEVOIR1
 