const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Ajoutez cette ligne

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware pour parser le JSON et gérer CORS
app.use(cors()); // Ajoutez cette ligne
app.use(express.json());

// Connexion à MongoDB
mongoose.connect('mongodb://localhost:27017/backmobile', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.log('Error connecting to MongoDB:', err);
});

// Importer les routes utilisateur
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
