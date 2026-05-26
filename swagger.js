require('dotenv').config();

const swaggerAutogen = require('swagger-autogen')();

const doc = {

  info: {

    title: 'Customers and Invoices API',

    description: 'REST API for customers and invoices collections. No real data, this is a CSE 341 project',

    version: '1.0.0'

  },

  host: process.env.API_HOST || 'localhost:8080',

  schemes: process.env.NODE_ENV === 'production'
    ? ['https']
    : ['http']

};

const outputFile = './swagger.json';

const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);