# Developpeur-Ethereum-Projet3
Projet 3 de la formation développeur ethereum
* Develloppement d'une DApp de voting

## Installation de l'environnement
1. Lancement de ganache
2. Install Truffle React (crée un environnement Truffle pour écrire, compiler, tester, et deployer les smart contracts, et interagir avec via le front React)
   $ npx truffle unbox react
3. Création d'un fichier .env pour y intégrer des variables d'environnement (Api Key de Infura et Mnemonic de Ganache)
4. truffle-config.js et .env : modification des paramètres de networks pour travailler en local ou sur un testnet (avec un clé infura ou alchemy)

## Lancement de l'application
* Lancer la compilation et le déploiement du smart contract
* $ cd client
* $ truffle migrate
* Lancer ensuite le client react
* $ cd client
* $ npm start

## Utilisation de l'application
Application qui permet de voter pour le plus grand artiste du 20ème siècle.
1. L'admin enregistre les voteurs sur une whitelist
2. L'admin gère le worklow du processus de vote (ouverture des propositions, fermeture des propositions, ouverture du vote, fermeture du vote, calcul des résultats)
3. Seuls les voteurs enregistrés peuvent soumettre des propositions et voter (quand les sessions le permettant ont été ouvertes par l'admin)

## Autre information
* Vidéo de démonstration de l'application disponible ici : https://www.loom.com/share/b6e7ed94dc374917b63b2e0b72266ac6
* Application visible depuis Vercel : https://developpeur-ethereum-projet3.vercel.app/home
* L'application est déployée sur le testnet Goerli à l'adresse ci-après : https://goerli.etherscan.io/address/0x9253a9384b7e46f2350c3518217de4691414af33
