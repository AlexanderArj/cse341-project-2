const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {

  try {

    const customers = await mongodb
      .getDb()
      .collection('customers')
      .find()
      .toArray();

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(customers);

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
        message: 'Invalid customer ID'
      });

    }

    const customerId = new ObjectId(req.params.id);

    const customer = await mongodb
      .getDb()
      .collection('customers')
      .findOne({ _id: customerId });

    if (!customer) {

      return res.status(404).json({
        message: 'Customer not found'
      });

    }

    res.status(200).json(customer);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

const createCustomer = async (req, res) => {

  try {

    const customer = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      birthDate: req.body.birthDate,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address,
      city: req.body.city
    };

    const response = await mongodb
      .getDb()
      .collection('customers')
      .insertOne(customer);

    if (response.acknowledged) {

      res.status(201).json({
        message: 'Customer created successfully',
        id: response.insertedId
      });

    } else {

      res.status(500).json({
        message: 'Some error occurred while creating the customer'
      });

    }

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

const updateCustomer = async (req, res) => {

  try {

    if (!ObjectId.isValid(req.params.id)) {

      return res.status(400).json({
        message: 'Invalid customer ID'
      });

    }

    const customerId = new ObjectId(req.params.id);

    const customer = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      birthDate: req.body.birthDate,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address,
      city: req.body.city
    };

    const response = await mongodb
      .getDb()
      .collection('customers')
      .replaceOne({ _id: customerId }, customer);

    if (response.matchedCount === 0) {

      return res.status(404).json({
        message: 'Customer not found'
      });

    }

    if (response.modifiedCount > 0) {

      res.status(200).json({
        message: 'Customer updated successfully'
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

const deleteCustomer = async (req, res) => {

  try {

    if (!ObjectId.isValid(req.params.id)) {

      return res.status(400).json({
        message: 'Invalid customer ID'
      });

    }

    const customerId = new ObjectId(req.params.id);

    const response = await mongodb
      .getDb()
      .collection('customers')
      .deleteOne({ _id: customerId });

    if (response.deletedCount > 0) {

      res.status(200).json({
        message: 'Customer deleted successfully'
      });

    } else {

      res.status(404).json({
        message: 'Customer not found'
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
  createCustomer,
  updateCustomer,
  deleteCustomer
};