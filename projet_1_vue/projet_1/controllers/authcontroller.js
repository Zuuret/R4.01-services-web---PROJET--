const models = require('../models'); // Assurez-vous que le modèle `user` est importé
const bcrypt = require('bcrypt'); // Assurez-vous que bcrypt est bien importé pour gérer les mots de passe

module.exports = {
  // Inscription
  signup: async (req, res) => {
    const { email, password, firstname, lastname } = req.body;

    try {
      const userExists = await models.user.findOne({ where: { emailid: email } });

      if (userExists) {
        return res.status(400).json({ message: 'Cet email est déjà utilisé.' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await models.user.create({
        emailid: email,
        firstname: firstname,
        lastname: lastname,
        password: hashedPassword
      });

      return res.status(201).json({
        message: 'Inscription réussie',
        user: {
          email: newUser.emailid,
          id: newUser.id
        }
      });
    } catch (err) {
      console.error('Erreur lors de l\'inscription:', err);
      return res.status(500).json({ message: 'Erreur serveur lors de l\'inscription' });
    }
  },

  // Connexion
  signin: (req, res) => {
    // passport.authenticate 'local-signin' se charge de tout
    res.json({ message: 'Connexion réussie', user: req.user });
  },

  // Page d'accueil pour les utilisateurs authentifiés
  homeJson: (req, res) => {
    if (req.isAuthenticated()) {
      return res.json({
        message: 'Bienvenue sur la page d\'accueil!',
        user: {
          id: req.user.id,
          firstname: req.user.firstname,
          email: req.user.emailid
        }
      });
    } else {
      return res.status(401).json({ error: 'Utilisateur non authentifié' });
    }
  },

  // Déconnexion
  logoutJson: (req, res) => {
    req.logout(err => {
      if (err) return res.status(500).json({ error: 'Erreur lors de la déconnexion.' });
      res.json({ message: 'Déconnexion réussie.' });
    });
  }
};
