# 🚗 EcoRide - Application de Covoiturage

Bienvenue sur le dépôt du projet **EcoRide**, une application de covoiturage écologique.
Ce projet est réalisé dans le cadre d'une évaluation full-stack (ECF). Il est structuré en **Monorépo**, regroupant au même endroit l'application cliente (Front-End) et l'API de gestion (Back-End) afin de centraliser l'infrastructure et de simplifier le déploiement.

## 🛠️ Technologies utilisées

### Front-end
* React
* Vite
* Tailwind CSS
* Framer Motion

### Back-end
* Node.js
* Express
* JSON Web Token (JWT)

### Bases de données
* Supabase (PostgreSQL)
* MongoDB (Logs d'activité)

### Tests
* Vitest

### Outils et Infrastructure
* Docker / Docker Compose
* GitHub
* NPM / Concurrently

## 🔐 Fonctionnalités principales

* Authentification sécurisée avec JWT
* Inscription / Connexion utilisateur
* Gestion des rôles (Visiteur, Utilisateur, Admin)
* Création et réservation de trajets
* Système de crédits (20 crédits à l'inscription)
* Recherche avec filtres (écologique, prix, note)
* Dashboard administrateur (statistiques, gestion utilisateurs)
* Sécurisation des routes API

## 🧱 Architecture du Projet

Le projet applique le principe de **séparation des préoccupations** à travers trois environnements distincts, possédant chacun leur propre fichier `package.json`, basé sur une architecture MVP (Model - View - Presenter) :

* **Racine (`/`) :** Gère l'infrastructure globale (Docker Compose) et permet de lancer simultanément les deux applications en développement.
* **Back-End (`/BackEnd`) :** API Express autonome (routes, authentification, logique métier et accès aux données).
* **Front-End (`/FrontEnd`) :** Application React (interface utilisateur, navigation et logique client).

## 🚀 Déploiement
Le projet utilise une architecture découplée pour une meilleure scalabilité :

* Front-end : Déployé sur Vercel via l'intégration GitHub.
* Back-end : Déployé sur Render (Web Service via Docker).
* Variables d'environnement : Gérées via les interfaces de configuration des plateformes Cloud (aucune donnée sensible dans le dépôt).

## 🗄️ Gestion des données

### Supabase (PostgreSQL)
Contient les données principales de l'application : utilisateurs, trajets, réservations et avis.

### MongoDB
Dédié au stockage et à la consultation des logs d'activité de l'administration.

### Données de test
Utilisation de la bibliothèque **Faker.js** pour générer des données réalistes (utilisateurs, trajets) et tester l'application à plus grande échelle.

## 🧪 Tests

Les tests unitaires et d'intégration sont réalisés avec **Vitest**.

### Lancer les tests
```txt
npm run test
```

### Mode watch (relance automatique à chaque modification)
```txt
npm run test:watch
```

## 🗃️ Scripts Base de données

Depuis le dossier `/BackEnd` :

| Commande | Description |
|---|---|
| `npm run seed:all` | Remplit toutes les tables dans le bon ordre |
| `npm run db:clear` | Vide toutes les tables |
| `npm run db:count` | Affiche le nombre de lignes par table |

## 💻 Prérequis

Avant de commencer, assurez-vous d'avoir installé sur votre machine :

* Node.js (Version v24.16.0 recommandée)
* Docker Desktop (Avec le moteur WSL 2 activé sous Windows)

## ⚙️ Configuration des variables d'environnement

À la racine globale du projet, vous devez créer un fichier nommé `.env` (ignoré par Git). Il doit contenir la structure suivante avec vos propres identifiants de test :

```txt
PORT=3001
JWT_SECRET=votre_clef_secrete_jwt
SUPABASE_URL=votre_url_projet_supabase
SUPABASE_KEY=votre_clef_supabase
MONGO_URI=votre_uri_connexion_mongodb
```

## 🚀 Procédures de Lancement

### Avec Docker
1. S'assurer que Docker Desktop est lancé.
2. Exécuter la commande suivante à la racine :
```txt
docker compose up --build
```

### Sans Docker
1. Installer l'ensemble des dépendances depuis la racine :
```txt
npm install
```
2. Lancer les deux applications en simultané :
```txt
npm run dev
```

## 🚧 Retour d'expérience et Objectifs

### Difficultés rencontrées
* Mise en place d'une architecture claire et isolée entre le front et le back.
* Gestion sécurisée de l'authentification (JWT et protection des routes).
* Synchronisation et requêtage entre deux technologies de bases de données différentes (SQL et NoSQL).

Ces problématiques m'ont permis de renforcer mes compétences en architecture full-stack, conception d'API REST et sécurité.

### 📌 Prochaines étapes prévues
* Notifications en temps réel.
* Intégration d'un système de paiement.
* Déclinaison en application mobile.
