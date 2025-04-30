const redis = require('redis');
const keys = require('../config/keys');

const client = redis.createClient({ url: keys.redisUrl });

client.on('error', err => console.error('Erreur de connexion Redis :', err));
client.on('connect', () => console.log('Redis connecté avec succès'));

(async () => {
  try {
    await client.connect();
  } catch (err) {
    console.error('Échec de la connexion Redis :', err);
  }
})();

module.exports = client;
