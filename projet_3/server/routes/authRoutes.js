const passport = require('passport');

module.exports = app => {
  /**
   * @swagger
   * /auth/google:
   *   get:
   *     summary: Authentification avec Google
   *     description: Redirige vers Google pour l’authentification OAuth 2.0
   *     responses:
   *       302:
   *         description: Redirection vers Google
   */
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  /**
   * @swagger
   * /auth/google/callback:
   *   get:
   *     summary: Callback Google OAuth
   *     description: Point de retour après l’authentification avec Google
   *     responses:
   *       302:
   *         description: Redirection vers l'application frontend
   */
  app.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
      res.redirect('http://localhost:5173/blogs');
    }
  );

  /**
   * @swagger
   * /auth/logout:
   *   get:
   *     summary: Déconnexion de l'utilisateur
   *     description: Déconnecte l'utilisateur de la session
   *     responses:
   *       302:
   *         description: Redirection vers la page d'accueil
   */
  app.get('/auth/logout', (req, res) => {
    req.logout();
    res.redirect('http://localhost:5173/');
  });

  /**
   * @swagger
   * /api/current_user:
   *   get:
   *     summary: Récupère l'utilisateur connecté
   *     description: Retourne les infos de l'utilisateur connecté via Google
   *     responses:
   *       200:
   *         description: Utilisateur connecté
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 _id:
   *                   type: string
   *                 displayName:
   *                   type: string
   *                 email:
   *                   type: string
   */
  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });
};
