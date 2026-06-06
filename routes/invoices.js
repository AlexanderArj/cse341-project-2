const express = require('express');

const router = express.Router();

const invoicesController = require('../controllers/invoices');
const validation = require('../middleware/validate');
const authenticate = require('../middleware/authenticate');

router.get('/', invoicesController.getAll);

router.get('/:id', invoicesController.getSingle);

router.post(
  '/',
  authenticate,
  validation.saveInvoice,
  invoicesController.createInvoice
);

router.put(
  '/:id',
  authenticate,
  validation.saveInvoice,
  invoicesController.updateInvoice
);

router.delete(
  '/:id',
  authenticate,
  invoicesController.deleteInvoice
);

module.exports = router;