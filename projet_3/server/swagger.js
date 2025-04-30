const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Mini-Projet 3 – BUT S4 R403+R401',
      version: '1.0.0',
      description: 'Auth OAuth2 + Chat en temps réel',
      contact: { name: 'Étudiants: Enzo VIDY, Yahia KHERZA' }
    }
  },
  apis: ['./routes/*.js']
};
const specs = swaggerJsdoc(options);
module.exports = app => {
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));
};
