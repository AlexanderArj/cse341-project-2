const mongodb = require('../db/connect');

const getUsersCollection = () => {
  return mongodb.getDb().collection('users');
};

const findByGithubId = async (githubId) => {
  return await getUsersCollection().findOne({ githubId });
};

const createUser = async (userData) => {
  return await getUsersCollection().insertOne(userData);
};

const updateLastLogin = async (githubId) => {
  return await getUsersCollection().updateOne(
    { githubId },
    {
      $set: {
        lastLogin: new Date()
      }
    }
  );
};

module.exports = {
  findByGithubId,
  createUser,
  updateLastLogin
};