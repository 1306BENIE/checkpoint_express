// server.js
const express = require('express');
const path = require('path');
const { workingHoursMiddleware } = require('./middlewares/workingHours');
const routes = require('./routes/portfolioRouter');

const app = express();

// Configuration du moteur de template
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware pour servir les fichiers statiques (CSS, images, etc.)
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));

// Appliquer le middleware des horaires sur toutes les routes
app.use(workingHoursMiddleware);

// Utilisation des routes
app.use('/', routes);

// Démarrer le serveur
const PORT = 3000;
app.listen(PORT, () => console.log(`Serveur en ligne sur http://localhost:${PORT}`));
