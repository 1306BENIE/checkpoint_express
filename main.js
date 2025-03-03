const express = require('express');
const app = express();

// Middleware pour vérifier les heures de travail
const workingHoursMiddleware = (req, res, next) => {
    const now = new Date();
    const day = now.getDay(); 
    const hour = now.getHours();

    if (day >= 1 && day <= 5 && hour >= 9 && hour <= 22) {
        next();
    } else {
        res.send('<h1>Le site est fermé ! Revenez entre 9h et 17h, du lundi au vendredi.</h1>');
    }
};

// Configurer le moteur de template
app.set('view engine', 'ejs');

// Middleware pour servir les fichiers statiques (CSS, images, etc.)
app.use(express.static('public'));

// Appliquer le middleware des horaires à toutes les routes
app.use(workingHoursMiddleware);

// Routes
app.get('/', (req, res) => {
    res.render('home', { 
        title: "Accueil", 
        body: `<h1>Bienvenue sur notre site !</h1>
               <p>Nous sommes heureux de vous accueillir.</p>` 
    });
});


app.get('/services', (req, res) =>{
    res.render('services', { 
        title: "Nos Services",
        body:   `<h1>Nos services</h1>
                <p>Nous offrons des services de qualité.</p>`
    })
});
app.get('/contact', (req, res) => {
    res.render('contact', {
        title: "Contactez-nous",
        body:   `<h1>Contactez-nous</h1>
                <p>Pour toute question ou demande, n'hésitez pas à nous contacter.</p>`
    })
});

// Démarrer le serveur
app.listen(3000, () => console.log('Serveur en ligne sur http://localhost:3000'));
