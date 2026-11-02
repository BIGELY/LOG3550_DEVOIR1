const listeLivres = document.getElementById("liste-livres");
const recherche = document.getElementById("recherche");
const filtreCategorie = document.getElementById("filtre-categorie");
const disponiblesSeulement = document.getElementById("disponibles-seulement");
const tri = document.getElementById("tri");
const nombreResultats = document.getElementById("nombre-resultats");

// Normaliser le texte pour ignorer les accents et les majuscules
function normaliser(texte) {
    return texte
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
}

// Afficher les livres
function afficherLivres() {

    let resultats = livres.filter(function(livre) {

        const terme = normaliser(recherche.value);

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

    // Trier les résultats
    if (tri.value === "titre-asc") {
        resultats.sort((a, b) =>
            a.titre.localeCompare(b.titre, "fr")
        );
    }

    if (tri.value === "titre-desc") {
        resultats.sort((a, b) =>
            b.titre.localeCompare(a.titre, "fr")
        );
    }

    if (tri.value === "annee-asc") {
        resultats.sort((a, b) => a.annee - b.annee);
    }

    if (tri.value === "annee-desc") {
        resultats.sort((a, b) => b.annee - a.annee);
    }

    // Afficher le nombre de résultats
    nombreResultats.textContent =
        resultats.length + " résultat(s)";

    listeLivres.innerHTML = "";

    // Message si aucun livre trouvé
    if (resultats.length === 0) {
        listeLivres.textContent = "Aucun livre trouvé.";
        return;
    }

    // Générer les cartes avec le DOM
    resultats.forEach(function(livre) {
const livreId = livre.id;
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

        carte.appendChild(titre);
        carte.appendChild(auteur);
        carte.appendChild(annee);
        carte.appendChild(categorie);
        carte.appendChild(disponibilite);
const boutonSupprimer = document.createElement("button");

boutonSupprimer.type = "button";
boutonSupprimer.textContent = "Supprimer";

boutonSupprimer.addEventListener("click", function() {

    const confirmation = confirm(
        "Voulez-vous vraiment supprimer ce livre ?"
    );

    if (confirmation) {
        const index = livres.findIndex(function(livre) {
            return livre.id === livreId;
        });

        livres.splice(index, 1);

localStorage.setItem("livres", JSON.stringify(livres));

afficherLivres();
    }
});

carte.appendChild(boutonSupprimer);
        listeLivres.appendChild(carte);
    });
}

// Événements des filtres
recherche.addEventListener("input", afficherLivres);
filtreCategorie.addEventListener("change", afficherLivres);
disponiblesSeulement.addEventListener("change", afficherLivres);
tri.addEventListener("change", afficherLivres);

// Premier affichage
afficherLivres();
const formulaireLivre = document.getElementById("formulaire-livre");


// =========================
// VALIDATION DU FORMULAIRE
// =========================

const champTitre = document.getElementById("titre");
const champAuteur = document.getElementById("auteur");
const champAnnee = document.getElementById("annee");
const champCategorie = document.getElementById("categorie");

const erreurTitre = document.getElementById("erreur-titre");
const erreurAuteur = document.getElementById("erreur-auteur");
const erreurAnnee = document.getElementById("erreur-annee");
const erreurCategorie = document.getElementById("erreur-categorie");

formulaireLivre.addEventListener("submit", function(event) {

    event.preventDefault();

    // Effacer les anciennes erreurs
    erreurTitre.textContent = "";
    erreurAuteur.textContent = "";
    erreurAnnee.textContent = "";
    erreurCategorie.textContent = "";

    let formulaireValide = true;

    // Validation du titre
    if (champTitre.value.trim().length < 2) {
        erreurTitre.textContent =
            "Le titre doit contenir au moins 2 caractères.";
        formulaireValide = false;
    }

    // Validation de l'auteur
    if (champAuteur.value.trim().length < 2) {
        erreurAuteur.textContent =
            "L'auteur doit contenir au moins 2 caractères.";
        formulaireValide = false;
    }

    // Validation de l'année
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
        formulaireValide = false;
    }

    // Validation de la catégorie
    if (champCategorie.value === "") {
        erreurCategorie.textContent =
            "Veuillez choisir une catégorie.";
        formulaireValide = false;
    }

    // Arrêter si le formulaire contient une erreur
    if (!formulaireValide) {
        return;
    }

    // Si tout est valide, le livre peut être ajouté
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
});
const boutonReinitialiser = document.getElementById("bouton-reinitialiser");

boutonReinitialiser.addEventListener("click", function() {

    const confirmation = confirm(
        "Voulez-vous vraiment réinitialiser le catalogue ?"
    );

    if (confirmation) {
        livres.length = 0;
        livres.push(...livresDepart);

        localStorage.setItem(
            "livres",
            JSON.stringify(livres)
        );

        afficherLivres();
    }
});