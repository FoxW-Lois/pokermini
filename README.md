Tests unitaires :

hands.test.ts : Test la fonction déterminant le type de main d'un joueur (avec test pour une Carte haute et pour une Paire)
addcards.test.ts : Test la fonction d'ajout des cartes dans la pioche (pioche => cardList & newCardList)
giverandomcard.test.ts : Test la fonction d'aléatoire pour les cartes 
resetvalue.test.ts : Test la fonction réinitialisant toutes les variables (exceptées celles du pot et des jetons (chips) des joueurs) pour les parties suivantes


Auto-évalutation :

Grille de notation frontend :
- les cartes des joueurs s'affichent (au bon moment) => Validé
- la table s'affiche : joueurs (nom+jetons), pot, mises => Validé
- les boutons de jeu (appropriés) s'affichent au bon moment => Validé
- la 3eme carte s'affiche (correctement) au bon moment => Validé
- Le gagnant (de la main/de la partie) s'affiche (au bon moment) => Seulement dans la console
- L'application s'affiche correctement: responsive et beau => Responsive : Validé ; Beau : simple et compréhensible + sujet à interprétation

Grille de notation backend :
- Il y a une route pour démarrer la partie => Validé
- Il y a une route pour jouer: passer/attendre/miser/relancer/montrer => Validé
- un paquet de cartes est créé/mélangé à chaque main => Validé
- les actions des joueurs sont vérifiées avant d'être prises en compte => Validé
- Les mises sont correctement gérées => Validé
- La logique du jeu est correcte (mises aveugles, tour 1, tour 2, abattage) => Validé
- Pour chaque tour, le passage d'un joueur à l'autre est correct => Validé
- Une main est analysée/catégorisée correctement avec 3 cartes => Validé
- Deux mains sont correctement comparées => Validé
- La distribution du pot est géré correctement => Validé

