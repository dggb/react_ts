const swaggerUi = require('swagger-ui-express');
const swaggereJsdoc = require('swagger-jsdoc');

const options = {
  swaggerDefinition: {
    info: {
      title: 'PK API',
      version: '1.0.0',
      description: 'Simplebit API using Nodejs',
    },
    host: 'localhost:3000',
    basePath: '/api',
  },
  apis: ['./routes/**/router.js', './swagger/*'],
};

const specs = swaggereJsdoc(options);

module.exports = {
  swaggerUi,
  specs,
};
