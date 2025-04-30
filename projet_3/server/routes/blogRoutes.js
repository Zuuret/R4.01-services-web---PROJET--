const requireLogin = require('../middlewares/requireLogin');
const mongoose = require('mongoose');
const Blog = mongoose.model('Blog');
const redisClient = require('../services/redis');

module.exports = app => {
  // Récupérer un blog par ID (pas de cache ici)
  app.get('/api/blogs/:id', requireLogin, async (req, res) => {
    try {
      const blog = await Blog.findOne({
        _user: req.user.id,
        _id: req.params.id
      });
      res.send(blog);
    } catch (err) {
      res.status(500).send({ error: 'Erreur lors de la récupération du blog' });
    }
  });

  // Lister tous les blogs, avec mise en cache Redis
  app.get('/api/blogs', requireLogin, async (req, res) => {
    try {
      // Tenter de récupérer depuis le cache
      const cached = await redisClient.get(req.user.id);
      if (cached) {
        console.log('CACHED BLOGS - REDIS');
        return res.send(JSON.parse(cached));
      }

      // Sinon, requêter MongoDB
      console.log('BDD BLOGS - MONGODB');
      const blogs = await Blog.find({ _user: req.user.id });

      // Stocker en cache avec expiration (ex. 1h)
      await redisClient.set(req.user.id, JSON.stringify(blogs), { EX: 60 * 60 });

      res.send(blogs);
    } catch (err) {
      console.error(err);
      res.status(500).send({ error: 'Erreur lors de la récupération des blogs' });
    }
  });

  // Créer un nouveau blog et invalider le cache
  app.post('/api/blogs', requireLogin, async (req, res) => {
    const { title, content } = req.body;
    const blog = new Blog({ title, content, _user: req.user.id });

    try {
      const saved = await blog.save();

      // Invalider le cache pour l'utilisateur
      await redisClient.del(req.user.id);

      res.send(saved);
    } catch (err) {
      console.error(err);
      res.status(400).send({ error: 'Échec de la création du blog' });
    }
  });

  // Supprimer un blog et invalider le cache
  app.delete('/api/blogs/:id', requireLogin, async (req, res) => {
    try {
      await Blog.findOneAndDelete({
        _user: req.user.id,
        _id: req.params.id
      });

      // Invalider le cache et renvoyer la liste mise à jour
      await redisClient.del(req.user.id);
      const blogs = await Blog.find({ _user: req.user.id });
      res.send(blogs);
    } catch (err) {
      console.error(err);
      res.status(500).send({ error: 'Échec de la suppression du blog' });
    }
  });
};
