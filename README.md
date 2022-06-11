# Hackathon 2021-2022

## DeliverEat !

### WorkAdventure & ESGI

#### Prérequis

- ``npm`` & ``npx``
- Commande ``make``

#### Lancer le projet

- Récupérer ce repository
- Installer les dépendances avec
    ```bash
    make install
    ```
- Lancer le dépendances du projets
    ```bash
    make project
    ```
- Une aide est disponible avec
    ```bash
    make help
    ```
  
##### Note
Ce projet utilise Localtunnel pour obtenir une URL en HTTPS et afficher l'iframe vers notre API.
Localtunnel expose un port local vers un de ces sous-domaines.
**Ce sous domaine étant fixé dans le makefile, il n'est possible que de lancer qu'une instance du projet à la fois, à des fins de tests.**

  
#### Tester le projet
- Dans la fenêtre qui vient de s'ouvrir (localhost:7888), cliquez sur "Test this map"
- Vous arrivez sur la Map de base de WorkAdventure
- Descendre et passer par la porte pour arriver à la Map des restaurants
- Se mettre devant les portes des différents restaurants pour tester les fonctionnalités possible
- Restaurant 1 : MacDonalds > Ouvre une fenêtre vers le site du restaurant
- Restaurant 2 : Burger King > Ouvre une iframe affichant le site du restaurant
- Restaurant 3 : All restaurants
  - Ouvre une iframe vers notre api
  - Permet de se localiser 
    - Avec la localisation de l'utilisateur (bouton "Magic")
    - En entrant manuellement son adresse et en cliquant sur "Localisez moi avec mon adresse"
