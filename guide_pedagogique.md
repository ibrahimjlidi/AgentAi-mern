# Guide Pédagogique : Intégrer un Agent IA dans un Projet MERN 🎓

Ce guide explique comment ajouter des recommandations intelligentes à une application web en utilisant un service IA spécialisé.

---

## 1. Vue d'ensemble : L'Architecture 🏗️
Expliquez aux étudiants qu'au lieu de mettre une logique IA complexe directement dans Node.js (qui est excellent pour les serveurs web mais pas optimisé pour les calculs mathématiques lourds), nous utilisons une **Architecture Microservices** :
- **Frontend (React)** : Collecte les données (ex: "Qu'avez-vous consommé aujourd'hui ?").
- **Backend (Node.js)** : Gère les utilisateurs et sauvegarde les données dans MongoDB.
- **Agent IA (Python/FastAPI)** : Le "Cerveau" qui traite les données et renvoie de "l'Intelligence" (scores/conseils).

---

## 2. Guide d'Intégration Étape par Étape

### Étape A : Construire le Cerveau IA (Python)
Exposer un modèle de Machine Learning via une API :
1.  **FastAPI** : Utilisé pour créer un point de terminaison (endpoint) POST `/analyze`.
2.  **Pydantic** : Définit un "Contrat" strict pour les données entrantes (garantit la cohérence).
3.  **Chargement du Modèle** : Utiliser `joblib` pour charger le fichier modèle `.pkl` pré-entraîné.
4.  **Logique** : L'IA prend les entrées, les passe dans le modèle (`ml_model.predict()`), et renvoie un objet JSON avec le `score` et les `recommandations`.

### Étape B : Le "Pont" (Proxy Node.js)
On ne doit pas appeler l'IA Python directement depuis le navigateur (pour des raisons de sécurité). À la place :
1.  Créez une route dans Express : `router.post('/api/analyze', ...)`.
2.  Utilisez `axios` pour transférer les données de l'utilisateur vers le service IA (ex: `http://localhost:8000/analyze`).
3.  Recevez la réponse de l'IA et renvoyez-la au frontend React.
4.  **Bonus** : Sauvegardez le résultat de l'IA dans MongoDB pour le suivi historique.

### Étape C : L'Expérience Utilisateur (React)
1.  **Formulaires** : Capturez les données utilisateur via des formulaires React classiques.
2.  **États de Chargement** : Affichez un spinner pendant que l'IA "réfléchit".
3.  **Affichage des Résultats** : Parcourez le tableau `recommendations` renvoyé par l'IA et affichez-les sous forme de cartes ou de conseils.

---

## 3. Concepts Clés à Enseigner 💡

- **Découplage** : Si l'IA doit être mise à jour (ex: passage à un modèle plus complexe), le code React et Node.js n'a pas besoin de changer.
- **Contrats d'API** : Les services doivent s'accorder sur la structure JSON qu'ils échangent.
- **Règles vs ML** : La différence entre une logique simple `if/else` et un modèle qui "apprend" à partir d'un jeu de données.

---

## 4. Atelier Pratique Suggéré 🛠️
1.  **Phase 1** : Lancer l'app MERN avec des recommandations "codées en dur".
2.  **Phase 2** : Lier le backend Node.js au service Python FastAPI.
3.  **Phase 3** : Modifier le fichier `dataset.csv`, relancer `train.py`, et voir comment le comportement de l'IA change !
