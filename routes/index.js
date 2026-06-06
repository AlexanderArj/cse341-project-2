const routes = require('express').Router();
const passport = require('passport');

const customersRoutes = require('./customers');
const invoicesRoutes = require('./invoices');

routes.use('/', require('./swagger'));

routes.use('/customers', customersRoutes);
routes.use('/invoices', invoicesRoutes);

routes.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    return res.send(`Logged in as ${req.user.displayName}`);
  }

  res.send('Customers and Invoices API - CSE 341 Project');
});

routes.get(
  '/login',
  passport.authenticate('github', {
    scope: ['user:email']
  })
);

routes.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }

    req.session.destroy(() => {
      res.redirect('/');
    });
  });
});

module.exports = routes;