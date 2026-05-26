const express = require('express');

const router = express.Router();

const invoicesController = require('../controllers/invoices');

const validation = require('../middleware/validate');

router.get('/', invoicesController.getAll);

router.get('/:id', invoicesController.getSingle);

router.post('/', validation.saveInvoice, invoicesController.createInvoice);

router.put('/:id', validation.saveInvoice, invoicesController.updateInvoice);

router.delete('/:id', invoicesController.deleteInvoice);

module.exports = router;