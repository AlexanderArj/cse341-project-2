const mongodb = require('../db/connect');

const getAll = async (req, res) => {

  try {

    const result = await mongodb
      .getDb()
      .collection('users')
      .find();

    const users = await result.toArray();

    res.status(200).json(users);

  } catch (error) {

    res.status(500).json(error);

  }

};

module.exports = {
  getAll
};