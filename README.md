Projet : 

Description du Projet : Authentification et Gestion des Sessions avec Vue.js et Node.js
Contexte :

Ce projet vise à explorer différentes stratégies d’authentification et de gestion des sessions à travers trois mini-projets distincts utilisant Vue.js pour le frontend et Node.js pour le backend.

Ce projet peut être réalisé individuellement ou en groupe de deux. Il doit être transféré vers le dépôt Github des étudiants qui y travaillent.

Mini-projet 1 : Authentification avec Passport-Local et Session

Dans ce premier mini-projet, nous mettons en place une authentification basée sur Passport-Local avec une gestion des sessions via cookies.
Technologies utilisées :

    Backend : Node.js avec Express.js et Passport.js
    Frontend : Vue.js
    Base de données : PostgreSQL ou MySQL avec Sequelize ORM
    Session : Gestion des cookies et sessions

Fonctionnalités :

    Inscription des utilisateurs
    Connexion avec vérification des identifiants
    Page d’accueil sécurisée après connexion
    Stockage des sessions dans des cookies

Démarrage :
    

Mini-projet 2 : Authentification avec JWT (JSON Web Token)

Ce second mini-projet repose sur une authentification basée sur JWT, où le client (Vue.js) doit gérer le stockage et la gestion des tokens JWT.
Technologies utilisées :

    Backend : Node.js avec Express.js et JWT
    Frontend : Vue.js
    Base de données : PostgreSQL ou MySQL avec Sequelize ORM
    Stockage du token : LocalStorage ou SessionStorage

Fonctionnalités :

    Inscription des utilisateurs
    Connexion avec génération et validation de JWT
    Page d’accueil sécurisée avec JWT
    Gestion du token côté client

Démarrage :

    Utilisez une version NodeJS 16+
    Lancez `npm install` dans les dossiers backend et frontend
    Lancez `npm start` dans le dossier backend
    Lancez `npm run serve` dans le dossier frontend

Mini-projet 3 : Authentification OAuth2 avec Google et Chat en temps réel

Ce troisième mini-projet implémente une authentification OAuth2 via Google et ajoute un système de messagerie instantanée en temps réel entre utilisateurs connectés.
Technologies utilisées :

    Backend : Node.js avec Express.js et Passport.js (Google Strategy)
    Frontend : Vue.js
    Base de données : MongoDB avec Mongoose
    Mise en cache : Redis
    Websockets : Socket.io

Fonctionnalités :

    Authentification OAuth2 via Google
    Stockage des utilisateurs et tokens dans MongoDB
    Mise en cache des sessions avec Redis
    Interface de chat entre utilisateurs connectés
    Stockage de l’historique des messages dans MongoDB

Objectifs pédagogiques :

    Comprendre les différentes méthodes d’authentification
    Maîtriser la gestion des sessions via cookies et JWT
    Implémenter une authentification OAuth2 avec un fournisseur tiers
    Mettre en place un système de chat en temps réel
    Optimiser la gestion des sessions avec Redis

Démarrage :

    Utilisez une version NodeJS 20+
    Lancez `npm install` dans les dossiers server et vue-chat
    Lancez `npm run dev` dans le dossier server