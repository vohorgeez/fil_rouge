# Note de cadrage : application d'apprentissage du solfège (nom à trouver)

Fil rouge App Full-Stack, B3 Développement Ynov. Mathieu Vergez. v3 du 30/10/2026

## 1. Problème et utilisateurs
**Cible principale** : le musicien autodidacte qui joue d'oreille et bute sur la théorie.

**Problème** : ces musiciens sont souvent rebutés par le caractère abstrait et austère de l'apprentissage théorique.

**Aujourd'hui** : ils tâtonnent par la pratique instrumentale, se rabattent sur des applications payantes, ou abandonnent.

**Ce que l'application apporte** : un parcours guidé qui associe à chaque notion une explication théorique et des exercices interactifs, de la lecture de notes jusqu'à l'oreille et l'harmonie.

## 2. Objectifs
Objectifs produit :
- **O1.** Un musicien autodidacte suit seul le parcours du MVP : il lit les explications, réussit les Lessons et voit sa progression enregistrée. Mesure : trois musiciens autodidactes de mon entourage terminent le MVP sans aide.
- **O2.** Un administrateur ajoute une Lesson depuis l'application, sans toucher au code. Mesure : la Lesson créée est jouable immédiatement.

Objectifs d'apprentissage :
- **A1.** Concevoir et livrer une application mobile React Native connectée à une API.
- **A2.** Appliquer l'architecture hexagonale et le DDD en TypeScript sur un vrai domaine.
- **A3.** Mettre en place une chaîne complète : Docker, CI/CD et monitoring.

## 3. Périmètre
**Vision** : un parcours de onze chapitres
1. Lecture : les bases
2. Intervalles
3. Accords à 3 sons
4. Tonalités
5. Gammes
6. Accords à 4 sons
7. Fonctions d'accords
8. Accords avec superstructures
9. Modes
10. Renversements
11. Enchaînements d'accords

Chaque chapitre, sauf le premier, se parcourt dans quatre modalités :
a. Lecture
b. Ear training
c. Dictée aidée
d. Dictée non aidée

**MVP (dans le périmètre)** :
- inscription et connexion ;
- chapitre 1 "Lecture : les bases", complet ;
- chapitre 2 "Intervalles", limité aux modalités lecture et ear training ;
- enregistrement de la progression et déblocage du chapitre suivant ;
- rôle administrateur : création et modification d'une Lesson

**Hors périmètre** :
- Chapitres 3 à 11 ;
- dictées aidées et non aidées ;
- version web ;
- paiement et abonnement ;
- mode hors ligne ;
- fonctions sociales (classements, partage) et notifications ;
- contenu dans une autre langue que le français.

## 4. Contraintes
Imposées par le syllabus :
- backend en microservices, exposé en API REST ;
- base de données multi-paradigmes (relationnelle et NoSQL) ;
- diagrammes C4, choix techniques argumentés, modèle de données ;
- Docker, CI/CD, monitoring (Prometheus, Grafana) ;
- sprints avec code reviews ;
- couverture de tests supérieure à 70 % ;
- 35 h encadrées, rendu le : à confirmer.

Choisies :
- TypeScript ;
- architecture hexagonale ;
- code en anglais ;
- application mobile en React Native, Android au minimum ;
- écrans accessibles (RGAA) et mode sobre, économe en données.

Organisation : projet individuel (à confirmer).

## 5. Résultats attendus
Fonctionnels :
- Un utilisateur s'inscrit, lit les explications, répond aux Lessons et voit son niveau enregistré.
- Le MVP contient au moins 5 Lessons pour le chapitre 1, et 4 pour le chapitre 2 (2 en lecture, 2 en ear training).
- Une Lesson est réussie à partir de 75 % de bonnes réponses. Un chapitre est validé quand toutes ses Lessons le sont, ce qui débloque le suivant.
- Un administrateur crée une Lesson depuis l'application, et elle est jouable immédiatement.

Techniques :
- La CI/CD passe, la couverture de tests dépasse 70 %, un tableau de bord de monitoring est en place.
- Les diagrammes C4 et les ADR sont à jour.

## 6. Risques et hypothèses
**Hypothèse** : le MIDI sert de format source pour l'audio, parce qu'il est léger, flexible et portable.

| Risque | Parade |
|--------|--------|
| Synthétiseur MIDI tiers mal maîtrisé (latence, écarts entre iOS et Android) | Prototype audio dès le premier sprint. Plan B : générer de courts fichiers audio à partir du MIDI. |
| Développement mobie sans savoir-faire préalable | Mise à niveau TypeScript + React en janvier ; écrans limités à ceux du MVP. |
| Temps d'écriture des leçons (j'écris tout le contenu) | Contenu du MVP limité à 9 Lessons, rédigé avant le début du développement. |
| Périmètre technique large pour 35 h (microservices, CI/CD, monitoring, mobile) | Deux microservices au maximum ; liste "hors périmètre" tenue. |

## 7. Glossaire
| Terme | Dans le code | Définition |
|-------|--------------|------------|
| Apprenant | Learner | Utilisateur qui suit le parcours. |
| Administrateur | Administrator | Utilisateur qui crée et modifie les Lessons. |
| Chapitre | Chapter | Thème du parcours (par exemple : Intervalles), débloqué par la validation du précédent. |
| Explication | Concept | Texte théorique d'un chapitre, lu avant les Lessons qui l'exercent. |
| Modalité | Modality | Façon de travailler une notion : lecture, ear training, dictée aidée, dictée non-aidée. |
| Leçon | Lesson | Série de questions sur une notion, dans une modalité. |
| Question | Question | Un exercice d'une Lesson ; QCM dans le MVP. |
| Niveau | Level | Dernier chapitre validé par l'apprenant. |

## 8. Validation
- Sujet et cadrage à faire valider par : à confirmer
- A demander en même temps : projet individuel ou en équipe ? date de rendu ?
- Validé par ... le ...