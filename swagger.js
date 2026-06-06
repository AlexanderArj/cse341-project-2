require('dotenv').config();

const swaggerAutogen = require('swagger-autogen')();

const doc = {

  info: {

    title: 'Customers and Invoices API',

    description: `
    REST API for customers and invoices collections, no real data. CSE 341 project

    Authentication is handled through GitHub OAuth.

    To authenticate:
    1. Visit /login in a browser.
    2. Complete GitHub authorization.
    3. Return to the application.
    4. Authenticated users may access protected routes.
    `,
    
    version: '1.0.0'

  },

  host: process.env.API_HOST || 'localhost:8080',

  schemes: process.env.NODE_ENV === 'production'
    ? ['https']
    : ['http'],
    
    definitions: {},

    securityDefinitions: {
      githubAuth: {
        type: 'oauth2',
        authorizationUrl: '/login',
        flow: 'implicit'
      }
    }
};

const outputFile = './swagger.json';

const endpointsFiles = [
  './routes/index.js'
];

swaggerAutogen(outputFile, endpointsFiles, doc);