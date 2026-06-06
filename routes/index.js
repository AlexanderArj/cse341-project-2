const routes = require('express').Router();
const passport = require('passport');

const customersRoutes = require('./customers');
const invoicesRoutes = require('./invoices');

const usersRoutes = require('./users');

routes.use('/', require('./swagger'));

routes.use('/customers', customersRoutes);
routes.use('/invoices', invoicesRoutes);

routes.use('/users', usersRoutes);

routes.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    return res.send(`Logged in as ${req.user.displayName}`);
  }

  res.send('Customers and Invoices API - CSE 341 Project');
});

routes.get(
  '/login',
  
  // #swagger.ignore = true

  passport.authenticate('github', {
    scope: ['user:email']
  })
);

routes.get('/logout', 
  
  // #swagger.ignore = true

  (req, res, next) => {
    req.logout((err) => {
    if (err) {
      return next(err);
    }

    req.session.destroy(() => {
      res.redirect('/');
    });
  });
});

routes.get('/profile', (req, res) => {

  // #swagger.tags = ['Authentication']
  // #swagger.summary = 'Get current authenticated user'

  if (!req.isAuthenticated()) {
    return res.status(401).json({
      message: 'Not authenticated'
    });
  }

  res.status(200).json(req.user);
});

module.exports = routes;