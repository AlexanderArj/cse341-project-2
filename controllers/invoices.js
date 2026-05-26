const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {

  try {

    const invoices = await mongodb
      .getDb()
      .collection('invoices')
      .find()
      .toArray();

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(invoices);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

const getSingle = async (req, res) => {

  try {

    if (!ObjectId.isValid(req.params.id)) {

      return res.status(400).json({
        message: 'Invalid invoice ID'
      });

    }

    const invoiceId = new ObjectId(req.params.id);

    const invoice = await mongodb
      .getDb()
      .collection('invoices')
      .findOne({ _id: invoiceId });

    if (!invoice) {

      return res.status(404).json({
        message: 'Invoice not found'
      });

    }

    res.status(200).json(invoice);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

const createInvoice = async (req, res) => {

  try {

    const invoice = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      birthDate: req.body.birthDate,
      email: req.body.email,
      amount: req.body.amount,
      status: req.body.status,
      paymentDate: req.body.paymentDate
    };

    const response = await mongodb
      .getDb()
      .collection('invoices')
      .insertOne(invoice);

    if (response.acknowledged) {

      res.status(201).json({
        message: 'Invoice created successfully',
        id: response.insertedId
      });

    } else {

      res.status(500).json({
        message: 'Some error occurred while creating the invoice'
      });

    }

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

const updateInvoice = async (req, res) => {

  try {

    if (!ObjectId.isValid(req.params.id)) {

      return res.status(400).json({
        message: 'Invalid invoice ID'
      });

    }

    const invoiceId = new ObjectId(req.params.id);

    const invoice = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      birthDate: req.body.birthDate,
      email: req.body.email,
      amount: req.body.amount,
      status: req.body.status,
      paymentDate: req.body.paymentDate
    };

    const response = await mongodb
      .getDb()
      .collection('invoices')
      .replaceOne({ _id: invoiceId }, invoice);

    if (response.matchedCount === 0) {

      return res.status(404).json({
        message: 'Invoice not found'
      });

    }

    if (response.modifiedCount > 0) {

      res.status(200).json({
        message: 'Invoice updated successfully'
      });

    } else {

      res.status(200).json({
        message: 'No changes were made'
      });

    }

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

const deleteInvoice = async (req, res) => {

  try {

    if (!ObjectId.isValid(req.params.id)) {

      return res.status(400).json({
        message: 'Invalid invoice ID'
      });

    }

    const invoiceId = new ObjectId(req.params.id);

    const response = await mongodb
      .getDb()
      .collection('invoices')
      .deleteOne({ _id: invoiceId });

    if (response.deletedCount > 0) {

      res.status(200).json({
        message: 'Invoice deleted successfully'
      });

    } else {

      res.status(404).json({
        message: 'Invoice not found'
      });

    }

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

module.exports = {
  getAll,
  getSingle,
  createInvoice,
  updateInvoice,
  deleteInvoice
};