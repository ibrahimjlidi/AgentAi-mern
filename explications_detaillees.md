# GreenLife : Explications Détaillées du Projet 🧭

Ce document détaille chaque fichier du projet GreenLife, en expliquant le "Pourquoi" et le "Comment" pour chaque partie du projet.

---

## 📁 1. Le Service IA (Python + FastAPI)
C'est le cerveau de l'application. Il gère le traitement des données et le Machine Learning.

### 📄 `requirements.txt`
Liste les bibliothèques Python nécessaires :
- `fastapi` & `uvicorn` : Pour créer et lancer le serveur web.
- `pydantic` : Pour la validation des données (garantit que l'entrée est correcte).
- `scikit-learn` & `pandas` : Pour le Machine Learning et la manipulation de données.
- `joblib` : Pour sauvegarder et charger le modèle entraîné.

### 📄 `main.py`
Le point d'entrée de l'API IA.
- **Rôle** : Définit les routes URL.
- **Code Clé** : `@app.post("/analyze")` reçoit les données et appelle la fonction `analyze_consumption`.

### 📄 `model.py`
La logique centrale de l'IA.
- **Chargement** : Il tente de charger `model.pkl` au démarrage.
- **Logique** : 
    - Si le modèle existe, il utilise `ml_model.predict()` pour calculer le score Eco.
    - Il applique aussi des "Règles d'Expert" (clauses `if`) pour générer des recommandations textuelles (ex: "Installez des ampoules LED").

### 📄 `generate_data.py` & `train.py`
Le pipeline de Machine Learning.
- **Générer** : Crée 1000 faux utilisateurs avec des consommations aléatoires pour simuler un vrai jeu de données.
- **Entraîner** : Utilise l'algorithme **Random Forest** pour apprendre comment l'électricité/eau/recyclage impactent le score. Il génère le fichier `model.pkl`.

---

## 📁 2. Le Backend (Node.js + Express)
L'orchestrateur qui connecte l'utilisateur à la base de données et à l'IA.

### 📄 `server.js`
Le fichier principal du serveur.
- **Rôle** : Configure l'application Express, gère le CORS et se connecte à MongoDB.

### 📄 `routes/analyze.js`
Le "Pont" ou "Proxy".
- **Pourquoi ?** : Le frontend ne doit pas parler directement au service IA pour des raisons de sécurité.
- **Comment** : Il reçoit la requête de React, utilise `axios.post` pour l'envoyer au service Python (port 8000), attend la réponse, et la renvoie à l'utilisateur.

---

## 📁 3. Le Frontend (React + Vite)
L'interface utilisateur où tout prend vie.

### 📄 `src/components/Dashboard.jsx`
Le fichier frontend le plus important.
- **État (State)** : Utilise `useState` pour suivre ce que l'utilisateur tape.
- **Appel API** : Quand on clique sur "Analyze", il envoie une requête POST à `/api/analyze` (le backend Node.js).
- **Affichage** : Une fois le résultat reçu, il affiche le score Eco dans une belle carte et liste les conseils.

### 📄 `src/index.css`
Contient le design "Eco-friendly", utilisant des verts, des blancs et des transitions fluides pour un rendu moderne et premium.

---

## 🚀 Flux d'Exécution Étape par Étape
1.  **L'Utilisateur** saisit des données dans le **Formulaire React**.
2.  **React** envoie les données à **Node.js** (`/api/analyze`).
3.  **Node.js** transfère les données à **Python FastAPI** (`/analyze`).
4.  **Python** passe les données dans le **Modèle ML** et génère des conseils.
5.  **Python** renvoie du JSON à **Node.js**.
6.  **Node.js** renvoie le JSON à **React**.
7.  **React** affiche les résultats à **l'Utilisateur**.
