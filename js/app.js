// =========================
// ELEMENTS HTML
// =========================

const listeLivres = document.getElementById("liste-livres");
const recherche = document.getElementById("recherche");
const filtreCategorie = document.getElementById("filtre-categorie");
const disponiblesSeulement = document.getElementById("disponibles-seulement");
const tri = document.getElementById("tri");
const nombreResultats = document.getElementById("nombre-resultats");

const formulaireLivre = document.getElementById("formulaire-livre");
const boutonReinitialiser = document.getElementById("bouton-reinitialiser");

const champTitre = document.getElementById("titre");
const champAuteur = document.getElementById("auteur");
const champAnnee = document.getElementById("annee");
const champCategorie = document.getElementById("categorie");

const erreurTitre = document.getElementById("erreur-titre");
const erreurAuteur = document.getElementById("erreur-auteur");
const erreurAnnee = document.getElementById("erreur-annee");
const erreurCategorie = document.getElementById("erreur-categorie");


// =========================
// NORMALISATION DU TEXTE
// =========================

function normaliser(texte) {
    return texte
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
}


// =========================
// RECHERCHE ET FILTRAGE
// =========================

function obtenirLivresFiltres() {

    const terme = normaliser(recherche.value);

    return livres.filter(function(livre) {

        const correspondRecherche =
            normaliser(livre.titre).includes(terme) ||
            normaliser(livre.auteur).includes(terme);

        const correspondCategorie =
            filtreCategorie.value === "" ||
            livre.categorie === filtreCategorie.value;

        const correspondDisponibilite =
            !disponiblesSeulement.checked || livre.disponible;

        return correspondRecherche &&
               correspondCategorie &&
               correspondDisponibilite;
    });
}


// =========================
// TRI DES LIVRES
// =========================

function trierLivres(resultats) {

    switch (tri.value) {

        case "titre-asc":
            resultats.sort((a, b) =>
                a.titre.localeCompare(b.titre, "fr")
            );
            break;

        case "titre-desc":
            resultats.sort((a, b) =>
                b.titre.localeCompare(a.titre, "fr")
            );
            break;

        case "annee-asc":
            resultats.sort((a, b) => a.annee - b.annee);
            break;

        case "annee-desc":
            resultats.sort((a, b) => b.annee - a.annee);
            break;
    }

    return resultats;
}


// =========================
// CREATION D'UNE CARTE
// =========================

function creerCarteLivre(livre) {

    const carte = document.createElement("article");
    carte.classList.add("carte-livre");

    const titre = document.createElement("h3");
    titre.textContent = livre.titre;

    const auteur = document.createElement("p");
    auteur.textContent = "Auteur : " + livre.auteur;

    const annee = document.createElement("p");
    annee.textContent = "Année : " + livre.annee;

    const categorie = document.createElement("p");
    categorie.textContent = "Catégorie : " + livre.categorie;

    const disponibilite = document.createElement("p");

    if (livre.disponible) {
        disponibilite.textContent = "Disponible";
        disponibilite.classList.add("disponible");
    } else {
        disponibilite.textContent = "Emprunté";
        disponibilite.classList.add("emprunte");
    }

    const boutonSupprimer = document.createElement("button");
    boutonSupprimer.type = "button";
    boutonSupprimer.textContent = "Supprimer";

    boutonSupprimer.addEventListener("click", function() {
        supprimerLivre(livre.id);
    });

    carte.append(
        titre,
        auteur,
        annee,
        categorie,
        disponibilite,
        boutonSupprimer
    );

    return carte;
}


// =========================
// SUPPRESSION D'UN LIVRE
// =========================

function supprimerLivre(id) {

    const confirmation = confirm(
        "Voulez-vous vraiment supprimer ce livre ?"
    );

    if (!confirmation) {
        return;
    }

    const index = livres.findIndex(function(livre) {
        return livre.id === id;
    });

    if (index !== -1) {
        livres.splice(index, 1);

        localStorage.setItem("livres", JSON.stringify(livres));

        afficherLivres();
    }
}


// =========================
// AFFICHAGE DU CATALOGUE
// =========================

function afficherLivres() {

    let resultats = obtenirLivresFiltres();

    resultats = trierLivres(resultats);

    nombreResultats.textContent =
        resultats.length + " résultat(s)";

    listeLivres.innerHTML = "";

    if (resultats.length === 0) {
        listeLivres.textContent = "Aucun livre trouvé.";
        return;
    }

    resultats.forEach(function(livre) {
        const carte = creerCarteLivre(livre);
        listeLivres.appendChild(carte);
    });
}


// =========================
// VALIDATION DU FORMULAIRE
// =========================

function validerFormulaire() {

    erreurTitre.textContent = "";
    erreurAuteur.textContent = "";
    erreurAnnee.textContent = "";
    erreurCategorie.textContent = "";

    let valide = true;

    if (champTitre.value.trim().length < 2) {
        erreurTitre.textContent =
            "Le titre doit contenir au moins 2 caractères.";
        valide = false;
    }

    if (champAuteur.value.trim().length < 2) {
        erreurAuteur.textContent =
            "L'auteur doit contenir au moins 2 caractères.";
        valide = false;
    }

    const annee = Number(champAnnee.value);
    const anneeActuelle = new Date().getFullYear();

    if (
        champAnnee.value === "" ||
        annee < 1450 ||
        annee > anneeActuelle
    ) {
        erreurAnnee.textContent =
            "L'année doit être comprise entre 1450 et " +
            anneeActuelle + ".";
        valide = false;
    }

    if (champCategorie.value === "") {
        erreurCategorie.textContent =
            "Veuillez choisir une catégorie.";
        valide = false;
    }

    return valide;
}


// =========================
// AJOUT D'UN LIVRE
// =========================

function ajouterLivre() {

    const annee = Number(champAnnee.value);

    const nouveauLivre = {
        id: livres.length > 0
            ? Math.max(...livres.map(livre => livre.id)) + 1
            : 1,

        titre: champTitre.value.trim(),
        auteur: champAuteur.value.trim(),
        annee: annee,
        categorie: champCategorie.value,
        disponible: document.getElementById("disponible").checked
    };

    livres.push(nouveauLivre);

    localStorage.setItem("livres", JSON.stringify(livres));

    formulaireLivre.reset();

    afficherLivres();
}


// =========================
// REINITIALISATION
// =========================

function reinitialiserCatalogue() {

    const confirmation = confirm(
        "Voulez-vous vraiment réinitialiser le catalogue ?"
    );

    if (!confirmation) {
        return;
    }

    livres.length = 0;
    livres.push(...livresDepart);

    localStorage.setItem("livres", JSON.stringify(livres));

    afficherLivres();
}


// =========================
// EVENEMENTS
// =========================

recherche.addEventListener("input", afficherLivres);
filtreCategorie.addEventListener("change", afficherLivres);
disponiblesSeulement.addEventListener("change", afficherLivres);
tri.addEventListener("change", afficherLivres);

formulaireLivre.addEventListener("submit", function(event) {

    event.preventDefault();

    if (!validerFormulaire()) {
        return;
    }

    ajouterLivre();
});

boutonReinitialiser.addEventListener(
    "click",
    reinitialiserCatalogue
);


// Premier affichage du catalogue
afficherLivres();