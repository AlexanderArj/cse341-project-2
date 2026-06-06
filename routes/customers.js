const express = require('express');
const router = express.Router();

const customersController = require('../controllers/customers');
const validation = require('../middleware/validate');
const authenticate = require('../middleware/authenticate');

router.get('/', customersController.getAll);
router.get('/:id', customersController.getSingle);

router.post(
  '/',
  authenticate,
  validation.saveCustomer,
  customersController.createCustomer
);

router.put(
  '/:id',
  authenticate,
  validation.saveCustomer,
  customersController.updateCustomer
);

router.delete(
  '/:id',
  authenticate,
  customersController.deleteCustomer
);

module.exports = router;