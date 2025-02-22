## 🌍 ECO2TRIP – Aide décisionelle de Voyages Éco-Responsables  

**ECO2TRIP** est une application web permettant aux utilisateurs de trouver des destinations voyages en prenant en compte l’empreinte carbone de leurs déplacements, leurs hébergements et leurs activités. Plus de 130 destinations proposées partout en France.

_Ce projet a été créer dans le cadre du Projet de Fin d'Etude (PFE) par des étudiants de l'ECE_

### Architecture  
- **Back-end** : Node.js + Express avec Redis pour le caching  
- **Front-end** : React (avec React Router et Leaflet pour la cartographie)  
- **Base de données** : Redis (fichier `dump.rdb` préchargé)  
- **API utilisées** :
  - OpenRouteService (calcul des distances et itinéraires)
  - ImpactCO2 (calcul des émissions carbone)
  - DataTourisme (récupération des activités touristiques)  

---

## Installation et Configuration  

### 1️. Prérequis  
Avant de commencer, assure-toi d’avoir installé :  
- **Node.js** (≥ 18.x)  
- **Redis**  
- **npm** (fourni avec Node.js)  

### 2️. Clonage du projet  
```sh
git clone https://github.com/FelixHumeau/ECO2TRIP.git
cd ECO2TRIP
```

### 3️. Installation des dépendances  
```sh
cd background
npm install $(cat requirements_background.txt)
cd ../front
npm install $(cat requirements_front.txt)
```

### 4. **Ajout et restauration de la base de données Redis**
Restaurer la base de donnée avec le fichier `dump.rdb`:

**Copier le fichier `dump.rdb` dans le dossier de Redis** :
```bash
sudo cp dump.rdb /var/lib/redis/dump.rdb
```

**Assurer les permissions correctes** :
```bash
sudo chown redis:redis /var/lib/redis/dump.rdb
sudo chmod 660 /var/lib/redis/dump.rdb
```

**Redémarrer Redis pour charger la base de données** :
```bash
sudo systemctl restart redis
```

### 5. Configuration des variables d’environnement  
Dans le dossier `background`, crée un fichier `.env` :  
```
REDIS_PASSWORD=ton_mot_de_passe
ORS_API_KEY=ta_clé_openrouteservice
IMPACT_CO2_API_KEY=ta_clé_impactco2
```

### 6. Démarrage de l’application  
Puis démarrer le **back-end** :  
```sh
cd background
node src/index.js
```
Enfin, lancer le **front-end** :  
```sh
cd ../front
npm start
```

L’application est accessible sur `http://localhost:3000`.  

---

## Structure du projet  
```
ECO2TRIP/
│── background/               # Back-end (Node.js, Express, Redis)
│   ├── src/
│   │   ├── config/           # Configuration (Redis, environnement)
│   │   ├── routes/           # Routes API
│   │   ├── services/         # Services métiers (calculs, API externes)
│   │   ├── index.js          # Point d'entrée du serveur
│   │   └── ...
│   ├── package.json
│   ├── requirements_back.txt # Liste des dépendances backend
│   └── .env.example          # Exemple de fichier .env
│
│── front/                    # Front-end (React, Leaflet, Axios)
│   ├── src/
│   │   ├── components/       # Composants réutilisables
│   │   ├── pages/            # Pages principales
│   │   ├── App.js
│   │   └── ...
│   ├── package.json
│   ├── requirements_front.txt # Liste des dépendances frontend
│   └── public/
│
│── dump.rdb                   # Dump Redis (base de données préchargée)
│── README.md                   # Documentation
│── .gitignore                   # Fichiers à exclure de Git
└── ...
```

---

## Contributeurs  
- **Tom Bernard** 
- **Nicolas de Ternay**
- **Barnabé Badré**
- **Félix Humeau**
- **Etienne Jan**
- **Maxime Fougère**
- **Stina Houngavou**

---

## Licence
Ce projet est sous licence **GPL v3**. Cela signifie que vous êtes libre d'utiliser, modifier et distribuer ce code tant que vous respectez les conditions de la licence.

➡️ Voir le fichier [LICENSE](./LICENSE) pour plus d’informations.
