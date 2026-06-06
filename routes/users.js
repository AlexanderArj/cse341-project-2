const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users');
const authenticate = require('../middleware/authenticate');

router.get('/',
    // #swagger.tags = ['Users']
    // #swagger.summary = 'All users'
    authenticate, usersController.getAll);

module.exports = router;