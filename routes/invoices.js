const express = require('express');

const router = express.Router();

const invoicesController = require('../controllers/invoices');
const validation = require('../middleware/validate');
const authenticate = require('../middleware/authenticate');

router.get('/',
   // #swagger.tags = ['Invoices']
  // #swagger.summary = 'Get all invoices'
  invoicesController.getAll);

router.get('/:id',
  // #swagger.tags = ['Invoices']
  // #swagger.summary = 'Get invoice by ID'

  invoicesController.getSingle);

router.post(
  '/',
   // #swagger.tags = ['Invoices']
  // #swagger.summary = 'Create invoice'
  authenticate,
  validation.saveInvoice,
  invoicesController.createInvoice
);

router.put(
  '/:id',
   // #swagger.tags = ['Invoices']
  // #swagger.summary = 'Update invoice'
  authenticate,
  validation.saveInvoice,
  invoicesController.updateInvoice
);

router.delete(
  '/:id',
   // #swagger.tags = ['Invoices']
  // #swagger.summary = 'Delete invoice'
  authenticate,
  invoicesController.deleteInvoice
);

module.exports = router;