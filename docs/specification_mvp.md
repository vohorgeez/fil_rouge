# Spécification du MVP : application d'apprentissage du solfège (nom à trouver)

v1 du 13/11/2026 - Mathieu Vergez - Référence : note de cadrage v3 du 30/10/2026

---

## 1. Rappel du périmètre

Le MVP permet à un musicien autodidacte de suivre seul le début du parcours : le chapitre 1 "Lecture : les bases" complet, et le chapitre 2 "Intervalles" dans les modalités lecture et ear training. Sa progression est enregistrée et débloque le chapitre suivant. Un administrateur crée et modifie les Lessons depuis l'application.

Hors périmètre (cadrage §3) : chapitres 3 à 11, dictées aidée et non aidée, version web, paiement, mode hors ligne, fonctions sociales, notifications, autres langues que le français.

---

## 2. Rôles

| Rôle           | Dans le code  | Ce qu'il peut faire                                                               |
|----------------|---------------|-----------------------------------------------------------------------------------|
| Visiteur       | -             | Voir l'écran d'accueil, s'inscrire, se connecter                                  |
| Apprenant      | Learner       | Suivre le parcours, jouer les Lessons, consulter sa progression, gérer son compte |
| Administrateur | Administrator | Créer, modifier, prévisualiser et supprimer des Lessons                           |

---

## 3. User stories

Format : *En tant que* [rôle], *je veux* [action] *afin de* [bénéfice], suivi des critères d'acceptation (*Etant donné* / *Quand* / *Alors*). Chaque critère se vérifie par oui ou par non.

### Brique 1 - Compte

**US-01 - S'inscrire**
*En tant que* visiteur, *je veux* créer un compte *afin de* conserver ma progression.
- *Etant donné* une adresse e-mail valide et inconnue, un pseudo et un mot de passe conforme, *quand* je valide l'inscription, *alors* mon compte est créé, je suis connecté et j'arrive sur le parcours avec le chapitre 1 débloqué.
- *Etant donné* une adresse e-mail déjà utilisée, *quand* je valide, *alors* l'inscription est refusée avec le message "Un compte existe déjà avec cette adresse".
- *Etant donné* un mot de passe de moins de 12 caractères, *quand* je valide, *alors* l'inscription est refusée et la règle est affichée.

**US-02 - Se connecter**
*En tant que* visiteur, *je veux* me connecter *afin de* reprendre là où je m'étais arrêté.
- *Etant donné* des identifiants valides, *quand* je me connecte, *alors* j'arrive sur le parcours avec ma progression à jour.
- *Etant donné* des identifiants invalides, *quand* je me connecte, *alors* le message "Identifiants incorrects" s'affiche, sans préciser lequel est faux.
- *Etant donné* 5 échecs en moins de 15 minutes, *quand* je retente, *alors* la connexion est bloquée 15 minutes (ENF-10).

**US-03 - Se déconnecter**
*En tant qu'*apprenant, *je veux* me déconnecter *afin de* protéger mon compte sur un appareil partagé.
- *Quand* je me déconnecte, *alors* je reviens à l'écran d'accueil et aucune donnée de mon compte n'est plus accessible sans reconnexion.

**US-04 - Supprimer mon compte**
*En tant qu'*apprenant, *je veux* supprimer mon compte *afin d'*exercer mon droit à l'effacement.
- *Quand* je confirme la suppression, *alors* mon compte, mes tentatives et ma progression sont supprimés, et je reviens à l'écran d'accueil.
- *Quand* j'annule à l'étape de confirmation, *alors* rien n'est supprimé.

### Brique 2 - Parcours

**US-05 - Voir le parcours**
*En tant qu'*apprenant, *je veux* voir la liste des chapitres et leur état *afin de* savoir où j'en suis.
- *Quand* j'ouvre le parcours, *alors* chaque chapitre du MVP s'affiche avec son état : "Verrouillé", "Débloqué" ou "Validé", écrit en toutes lettres et accompagné d'une icône (ENF-02).

**US-06 - Ouvrir un chapitre**
*En tant qu'*apprenant, *je veux* ouvrir un chapitre débloqué *afin de* commencer ou poursuivre ses Lessons.
- *Etant donné* un chapitre débloqué ou validé, *quand* je l'ouvre, *alors* je vois son explication puis la liste de ses Lessons, chacune avec sa modalité et son état ("A faire" ou "Validée").
- *Etant donné* un chapitre verrouillé, *quand* je le touche, *alors* il ne s'ouvre pas et le message "Validez le chapitre précédent pour débloquer celui-ci" s'affiche.

### Brique 3 - Leçon

**US-07 - Lire l'explication d'un chapitre**
*En tant qu'*apprenant, *je veux* lire l'explication théorique d'un chapitre *afin de* comprendre la notion avant de m'exercer.
- *Quand* j'ouvre l'explication, *alors* son texte et ses illustrations s'affichent, et chaque illustration a une alternative textuelle (ENF-03).
- *Etant donné* le mode sobre activé, *quand* j'ouvre l'explication, *alors* les illustrations sont affichées en version allégée (ENF-05).

**US-08 - Jouer une Lesson de lecture**
*En tant qu'*apprenant, *je veux* répondre à des questions sur une notation affichée *afin de* m'entraîner à lire.
- *Quand* je démarre la Lesson, *alors* les questions s'affichent une par une, chacune avec une notation et de 2 à 4 réponses possibles.
- *Quand* je réponds, *alors* je sais immédiatement si c'est juste et, si c'est faux, la bonne réponse s'affiche.
- *Quand* je réponds à la dernière question, *alors* mon score en pourcentage s'affiche, avec la mention "Lesson validée" ou "Lesson non validée" (RG-09).

**US-09 - Jouer une Lesson d'ear training**
*En tant qu'*apprenant, *je veux* identifier un intervalle à l'écoute *afin d'*entraîner mon oreille.
- *Quand* une question s'affiche, *alors* l'intervalle est joué automatiquement, sauf en mode sobre où il n'est joué qu'à ma demande.
- *Quand* je touche "Réécouter", *alors* l'intervalle est rejoué, sans limite de nombre.
- Mêmes critères de réponse et de score que US-08.

**US-10 - Quitter une Lesson en cours**
*En tant qu'*apprenant, *je veux* pouvoir quitter une Lesson *afin de* m'arrêter quand je veux.
- *Quand* je quitte une Lesson avant la fin, *alors* une confirmation m'avertit que la tentative en cours sera perdue.
- *Quand* je confirme, *alors* je reviens au chapitre et aucune tentative n'est enregistrée (RG-08).

## Brique 4 - Progression

**US-11 - Valider une Lesson**
*En tant qu'*apprenant, *je veux* qu'une Lesson réussie soit validée *afin de* progresser dans le parcours.
- *Etant donné* une tentative terminée avec un score d'au moins 80 %, *quand* le score s'affiche, *alors* la Lesson passe à l'état "Validée".
- *Etant donné* un score inférieur à 80 %, *quand* le score s'affiche, *alors* la Lesson reste "A faire" et je peux la rejouer immédiatement.
- *Etant donné* une Lesson déjà validée, *quand* je la rejoue avec un score inférieur à 80 %, *alors* elle reste "Validée" (RG-09).

**US-12 - Débloquer le chapitre suivant**
*En tant qu'*apprenant, *je veux* que la validation d'un chapitre débloque le suivant *afin d'*avancer dans le parcours.
- *Etant donné* la dernière Lesson non validée d'un chapitre, *quand* je la valide, *alors* le chapitre passe à "Validé", le chapitre suivant passe à "Débloqué", et un message me l'annonce.

**US-13 - Consulter ma progression**
*En tant qu'*apprenant, *je veux* voir ma progression globale *afin de* mesurer mon avancement.
- *Quand* j'ouvre ma progression, *alors* je vois mon niveau (RG-13) et le nombre de Lessons validées sur le total du MVP.

### Brique 5 - Administration

**US-14 - Créer une Lesson**
*En tant qu'*administrateur, *je veux* créer une Lesson depuis l'application *afin d'*enrichir le parcours sans toucher au code.
- *Etant donné* un chapitre, une modalité autorisée pour ce chapitre (RG-05), un titre et des questions conformes (RG-06, RG-07), *quand* j'enregistre, *alors* la Lesson est publiée et jouable immédiatement par les apprenants qui ont débloqué ce chapitre.
- *Etant donné* une question sans bonne réponse, ou avec plusieurs bonnes réponses, *quand* j'enregistre, *alors* l'enregistrement est refusé et la question fautive est signalée.
- *Etant donné* une question d'ear training sans séquence MIDI, *quand* j'enregistre, *alors* l'enregistrement est refusé.

**US-15 - Modifier une Lesson**
*En tant qu'*administrateur, *je veux* modifier une Lesson existante *afin de* corriger ou améliorer son contenu.
- *Quand* j'enregistre une modification, *alors* elle s'applique aux tentatives suivantes, et les tentatives passées gardent leur score (RG-15).
- Mêmes contrôles de conformité que US-14.

**US-16 - Prévisualiser une Lesson**
*En tant qu'*administrateur, *je veux* jouer une Lesson comme un apprenant *afin de* la vérifier avant ou après sa publication.
- *Quand* je prévisualise une Lesson, *alors* je la joue comme un apprenant, sans qu'aucune tentative ne soit enregistrée.

**US-17 - Supprimer une Lesson**
*En tant qu'*administrateur, *je veux* supprimer une Lesson *afin de* retirer un contenu erroné.
- *Quand* je confirme la suppression, *alors* la Lesson disparaît du parcours, et les chapitres déjà validés le restent.

### Brique 6 - Transverse

**US-18 - Activer le mode sobre**
*En tant qu'*apprenant, *je veux* choisir un mode économe en données et en énergie *afin de* limiter l'empreinte de mon usage.
- *Quand* j'active le mode sobre dans les réglages, *alors* les sons ne sont plus préchargés, les illustrations passent en version allégée et les animations sont désactivées (ENF-05).
- *Quand* je me reconnecte, *alors* mon choix est conservé.

**US-19 - Adapter la taille du texte**
*En tant qu'*apprenant malvoyant, *je veux* que l'application respecte la taille de texte de mon téléphone *afin de* lire sans effort.
- *Etant donné* une taille de texte agrandie dans les réglages du téléphone, *quand* j'utilise l'application, *alors* tous les textes sont agrandis, sans texte tronqué ni chevauchement.

---

## 4. Règles de gestion

| N°    | Règle                                                                                                                                                                                            |
|-------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| RG-01 | Un compte est identifié par une adresse e-mail unique.                                                                                                                                           |
| RG-02 | Le parcours est une suite ordonnée de chapitres. Le chapitre 1 est débloqué dès l'inscription.                                                                                                   |
| RG-03 | Un chapitre a exactement une explication et au moins une Lesson.                                                                                                                                 |
| RG-04 | Une Lesson appartient à un seul chapitre et relève d'une seule modalité.                                                                                                                         |
| RG-05 | Le chapitre 1 ne propose que la modalité lecture. Dans le MVP, le chapitre 2 propose les modalités lecture et ear training.                                                                      |
| RG-06 | Une Lesson comporte entre 5 et 10 questions.                                                                                                                                                     |
| RG-07 | Une question propose entre 2 et 4 réponses, dont exactement une est correcte. Une question d'ear training porte une séquence MIDI.                                                               |
| RG-08 | Une tentative est une Lesson jouée jusqu'au bout par un apprenant. Son score est le nombre de bonnes réponses divisé par le nombre de questions. Une tentative abandonnée n'est pas enregistrée. |
| RG-09 | Une Lesson est validée pour un apprenant dès qu'une de ses tentatives atteint 80 %. Une Lesson validée le reste.                                                                                 |
| RG-10 | Un apprenant peut tenter une même Lesson autant de fois qu'il le veut. Toutes ses tentatives terminées sont conservées.                                                                          |
| RG-11 | Un chapitre est validé pour un apprenant quand toutes ses Lessons le sont. La validation d'un chapitre débloque le suivant.                                                                      |
| RG-12 | L'ajout d'une Lesson à un chapitre déjà validé ne retire pas sa validation : la nouvelle Lesson apparaît "à faire".                                                                              |
| RG-13 | Le niveau d'un apprenant est le rang du dernier chapitre qu'il a validé (0 s'il n'en a validé aucun).                                                                                            |
| RG-14 | Seul un administrateur crée, modifie ou supprime des Lessons. Les comptes administrateurs sont créés hors de l'application.                                                                      |
| RG-15 | La modification d'une Lesson ne change pas le score des tentatives passées.                                                                                                                      |

---

## 5. Exigences non fonctionnelles

### Accessibilité (RGAA)

- **ENF-01** - Tout texte présente un contraste d'au moins 4,5:1 avec son fond (3:1 pour les grands textes).
- **ENF-02** - Aucune information n'est donnée par la couleur seule : l'état d'un chapitre ou d'une Lesson et le résultat d'une réponse sont toujours aussi écrits en toutes lettres.
- **ENF-03** - Tous les éléments interactifs sont utilisables au lecteur d'écran (TalkBack), avec un libellé explicite et un ordre de lecture logique. Les illustrations des explications ont une alternative textuelle.
- **ENF-04** - Les cibles tactiles mesurent au moins 48 dp (recommandation Android), et l'application respecte la taille de texte du système (US-19).
- **Limite assumée** - Les exercices de lecture sont visuels et ceux d'ear training sont sonores par nature. L'alternative textuelle d'une question ne doit jamais donner la réponse : ces exercices restent donc inaccessibles, respectivement, aux personnes aveugles et aux personnes sourdes. Le reste de l'application (explications, navigation, progression, compte) leur est accessible. Cette limite sera mentionnée dans la déclaration d'accessibilité.

### Sobriété

- **ENF-05** - Le mode sobre (US-18) désactive le préchargement des sons, les animations, et remplace les illustrations par des versions allégées.
- **ENF-06** - Les séquences musicales sont décrites en JSON (ADR-009) et le son est produit sur l'appareil à partir d'une petite banque d'échantillons intégrée à l'application (ADR-010) : aucun fichier audio n'est téléchargé, même hors mode sobre.

### Sécurité et données personnelles (RGPD)
- **ENF-07** - Les mots de passe sont stockés hachés avec un algorithme adapté (choix en F-03), jamais en clair.
- **ENF-08** - Toutes les communications entre l'application et l'API sont chiffrés (HTTPS).
- **ENF-09** - Les données personnelles se limitent à l'adresse e-mail, au pseudo, au mot de passe haché et à la progression. Aucune donnée de localisation, aucun traceur publicitaire.
- **ENF-10** - Après 5 échecs de connexion en moins de 15 minutes, la connexion à ce compte est bloquée pendant 15 minutes.
- **ENF-11** - La suppression d'un compte (US-04) efface toutes les données personnelles associées.

### Performance
- **ENF-12** - Le délai entre l'action "Ecouter" et le début du son est mesuré lors du prototype audio du premier sprint. Cible proposée : moins de 200 ms.
- **ENF-13** - Une Lesson s'ouvre en moins de 2 secondes sur une connexion 4G.

Les exigences de qualité du projet (tests, CI/CD, monitoring) sont dans les contraintes du cadrage (§4).

---

## 6. Priorisation MoSCoW

| Priorité                     | User stories                                                                                          |
|------------------------------|-------------------------------------------------------------------------------------------------------|
| **Must** (le MVP minimal)    | US-01, US-02, US-03, US-05, US-06, US-07, US-08, US-09, US-11, US-12, US-14                           |
| **Should**                   | US-04, US-10, US-13, US-15, US-16, US-18, US-19                                                       |
| **Could**                    | US-17                                                                                                 |
| **Won't** (pas dans ce MVP)  | Dictées, chapitres 3 à 11, version web, paiement, mode hors ligne, fonctions sociales, notifications. |