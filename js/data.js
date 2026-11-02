const livresDepart = [
    {
        id: 1,
        titre: "Les Misérables",
        auteur: "Victor Hugo",
        annee: 1862,
        categorie: "roman",
        disponible: true
    },
    {
        id: 2,
        titre: "Une brève histoire du temps",
        auteur: "Stephen Hawking",
        annee: 1988,
        categorie: "science",
        disponible: false
    },
    {
        id: 3,
        titre: "Sapiens",
        auteur: "Yuval Noah Harari",
        annee: 2011,
        categorie: "histoire",
        disponible: true
    },
    {
        id: 4,
        titre: "Clean Code",
        auteur: "Robert C. Martin",
        annee: 2008,
        categorie: "informatique",
        disponible: true
    },
    {
        id: 5,
        titre: "Le Petit Prince",
        auteur: "Antoine de Saint-Exupéry",
        annee: 1943,
        categorie: "roman",
        disponible: false
    },
    {
        id: 6,
        titre: "L'origine des espèces",
        auteur: "Charles Darwin",
        annee: 1859,
        categorie: "science",
        disponible: true
    },
    {
        id: 7,
        titre: "Histoire de France",
        auteur: "Ernest Lavisse",
        annee: 1910,
        categorie: "histoire",
        disponible: false
    },
    {
        id: 8,
        titre: "JavaScript : The Good Parts",
        auteur: "Douglas Crockford",
        annee: 2008,
        categorie: "informatique",
        disponible: true
    }
];
const livresSauvegardes = localStorage.getItem("livres");

const livres = livresSauvegardes
    ? JSON.parse(livresSauvegardes)
    : [...livresDepart];