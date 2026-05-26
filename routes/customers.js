const express = require('express');
const router = express.Router();
const customersController = require('../controllers/customers');
const validation = require('../middleware/validate');

router.get('/', customersController.getAll);
router.get('/:id', customersController.getSingle);

router.post('/', validation.saveCustomer, customersController.createCustomer);

router.put('/:id', validation.saveCustomer, customersController.updateCustomer);

router.delete('/:id', customersController.deleteCustomer);


module.exports = router;