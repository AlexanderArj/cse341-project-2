const validator = require('../helpers/validate');

const saveCustomer = (req, res, next) => {

  const validationRule = {

    firstName: 'required|string',
    lastName: 'required|string',
    birthDate: 'required|string',
    email: 'required|email',
    phone: 'required|string',
    address: 'required|string',
    city: 'required|string'

  };

  validator(req.body, validationRule, {}, (err, status) => {

    if (!status) {

      res.status(400).send({
        success: false,
        message: 'Validation failed',
        data: err
      });

    } else {

      next();

    }

  });

};

const saveInvoice = (req, res, next) => {

  const validationRule = {

    firstName: 'required|string',
    lastName: 'required|string',
    birthDate: 'required|string',
    email: 'required|email',
    amount: 'required|numeric',
    status: 'required|string',
    paymentDate: 'required|string'

  };

  validator(req.body, validationRule, {}, (err, status) => {

    if (!status) {

      res.status(400).send({
        success: false,
        message: 'Validation failed',
        data: err
      });

    } else {

      next();

    }

  });

};

module.exports = {
  saveCustomer,
  saveInvoice
};