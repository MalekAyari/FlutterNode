const express = require('express');
const User = require('../models/user.js');
const bcrypt = require('bcryptjs');

const router = express.Router();

// Créer un utilisateur
router.post('/register', async (req, res) => {
  try {
    const { email, password, nationality, phone } = req.body;

    // Afficher les données reçues
    console.log('Received data:', req.body);

    // Créer un nouvel utilisateur
    const newUser = new User({ email, password, nationality, phone });

    // Enregistrer l'utilisateur dans la base de données
    const savedUser = await newUser.save();

    // Afficher l'utilisateur enregistré
    console.log('User registered:', savedUser);

    // Retourner une réponse
    res.status(201).json({ message: 'User registered successfully', user: savedUser });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Authentifier un utilisateur
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Vérifier si l'utilisateur existe
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Email ou mot de passe incorrect' });
    }

    // Vérifier le mot de passe
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Email ou mot de passe incorrect' });
    }

    res.status(200).json({ message: 'Connexion réussie' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur du serveur', error });
  }
});



module.exports = router;
