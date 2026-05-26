const routes = require('express').Router();

const customersRoutes = require('./customers');

const invoicesRoutes = require('./invoices');

routes.use('/', require('./swagger'));

routes.use('/customers', customersRoutes);

routes.use('/invoices', invoicesRoutes);

routes.get('/', (req, res) => {

  res.send('Customers and Invoices API - CSE 341 project');

});

module.exports = routes;