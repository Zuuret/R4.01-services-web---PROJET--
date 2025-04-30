const express = require('express');
const app = express();
const passport = require('passport');

const session = require('express-session');
const bodyParser = require('body-parser');
const dotenv = require("dotenv");
const exphbs = require('express-handlebars');
const models = require('./models');
const bcrypt = require('bcrypt'); // Utilisé pour hasher les mots de passe

dotenv.config();

// Middleware pour BodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Middleware pour Passport
app.use(session({
  secret: 'butinfo',
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000,  // 1 jour (en millisecondes)
    httpOnly: true,                // Empêche l'accès au cookie depuis JavaScript côté client
    secure: false                  // Si tu utilises HTTPS, mets `secure: true`
  }
}));
app.use(passport.initialize());
app.use(passport.session());

// Pour Handlebars
app.set('views', './views');
app.set('view engine', '.hbs');
app.engine(
  'hbs',
  exphbs.engine({
    extname: ".hbs",
    defaultLayout: "",
    layoutsDir: "",
  })
);

// Routes
app.get('/', function(req, res) {
  res.send('Welcome to Passport with Sequelize');
});

// Route pour l'inscription
app.post('/api/signup', async (req, res) => {
    const { email, password, firstname, lastname } = req.body;

    const userExists = await models.user.findOne({ where: { emailid: email } });
    if (userExists) {
      return res.status(400).json({ message: 'Cet email est déjà utilisé.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const newUser = await models.user.create({
        emailid: email,
        firstname,
        lastname,
        password: hashedPassword,
      });

      // Log the user in
      req.login(newUser, (err) => {
        if (err) {
          return res.status(500).json({ message: 'Erreur de session' });
        }
        return res.status(200).json({
          message: 'Inscription réussie',
          user: {
            email: newUser.email,
            id: newUser.id
          }
        });
      });
    } catch (error) {
      console.error('Erreur lors de l\'inscription:', error);
      return res.status(500).json({ message: 'Erreur serveur lors de l\'inscription' });
    }
});
app.get('/api/checkAuth', (req, res) => {
    console.log(">>> Route checkAuth appelée !");
    if (req.isAuthenticated()) {
      return res.json({ ok: true, user: req.user });
    } else {
      return res.status(401).json({ ok: false, message: 'Non authentifié' });
    }
  });
  
  
  app.post('/api/signin', async (req, res) => {
    const { email, password } = req.body;

    // Vérifier si l'utilisateur existe
    const user = await models.user.findOne({ where: { emailid: email } });
    if (!user) {
        return res.status(400).json({ message: 'L\'e-mail n\'existe pas.' });
    }

    // Vérifier si le mot de passe est correct
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
        return res.status(400).json({ message: 'Mot de passe incorrect.' });
    }

    // Si tout est ok, retourner les informations de l'utilisateur
    return res.status(200).json({
        message: 'Connexion réussie',
        user: {
            email: user.email,
            id: user.id
        }
    });
});

// Synchronisation avec la base de données
models.sequelize.sync().then(function() {
  console.log('La base de données fonctionne bien');
}).catch(function(err) {
  console.log(err, "Quelque chose s'est mal passé avec la mise à jour de la base de données!");
});

// Lancer le serveur
app.listen(3000, function(err) {
  if (!err) {
    console.log("Le serveur écoute sur le port 3000");
  } else {
    console.log(err);
  }
});
