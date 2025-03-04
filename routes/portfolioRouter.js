// routes.js
const express = require('express');
const { body, validationResult } = require('express-validator');

const router = express.Router();

// Page d'accueil
router.get('/', (req, res) => {
    res.render('home', { title: "Accueil" });
});

// Page des services
router.get('/services', (req, res) => {
    res.render('services', { title: "Nos Services" });
});

// Page de contact
router.get('/contact', (req, res) => {
    res.render('contact', { title: "Contactez-nous", errors: [] });
});

// Gestion du formulaire de contact avec validation
router.post('/contact', [
    body('name').notEmpty().withMessage('Le nom est requis'),
    body('email').isEmail().withMessage('Email invalide'),
    body('message').notEmpty().withMessage('Le message ne peut pas être vide')
], (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.render('contact', { title: "Contactez-nous", errors: errors.array() });
    }

    res.render('confirmation', { title: "Message envoyé" });
});

module.exports = router;
