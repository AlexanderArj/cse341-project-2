const express = require('express');
const router = express.Router();

const customersController = require('../controllers/customers');
const validation = require('../middleware/validate');
const authenticate = require('../middleware/authenticate');

router.get('/',
  // #swagger.tags = ['Customers']
  // #swagger.summary = 'Get all customers'
  customersController.getAll);

router.get('/:id', 

  // #swagger.tags = ['Customers']
  // #swagger.summary = 'Get customer by id'

  customersController.getSingle);

router.post(
  '/',
  // #swagger.tags = ['Customers']
  // #swagger.summary = 'Create customer'

  authenticate,
  validation.saveCustomer,
  customersController.createCustomer
);

router.put(
  '/:id',
  // #swagger.tags = ['Customers']
  // #swagger.summary = 'Update customer'
  authenticate,
  validation.saveCustomer,
  customersController.updateCustomer
);

router.delete(
  '/:id',
  // #swagger.tags = ['Customers']
  // #swagger.summary = 'Delete customer'
  authenticate,
  customersController.deleteCustomer
);

module.exports = router;