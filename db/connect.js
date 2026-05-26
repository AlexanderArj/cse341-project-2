const dotenv = require('dotenv');

dotenv.config();

const MongoClient = require('mongodb').MongoClient;

let database;

const initDb = async (callback) => {

  try {

    if (database) {

      console.log('Database is already initialized');

      return callback(null, database);

    }

    const client = await MongoClient.connect(process.env.MONGODB_URL);

    database = client.db(process.env.DATABASE_NAME);

    console.log('Database connected');

    callback(null, database);

  } catch (error) {

    callback(error);

  }

};

const getDb = () => {

  if (!database) {

    throw new Error('Database not found');

  }

  return database;

};

module.exports = {
  initDb,
  getDb
};