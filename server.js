const express = require('express');

const bodyParser = require('body-parser');

const mongodb = require('./db/connect');

require('dotenv').config();

const app = express();

const port = process.env.PORT || 8080;

app
  .use(bodyParser.json())

  .use(express.json())

  .use((req, res, next) => {

    res.setHeader('Access-Control-Allow-Origin', '*');

    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
    );

    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, PUT, DELETE, OPTIONS'
    );

    next();

  })

  .use('/', require('./routes'));

process.on('uncaughtException', (err, origin) => {

  console.log(
    process.stderr.fd,
    `Caught exception: ${err}\n` +
    `Exception origin: ${origin}`
  );

});

mongodb.initDb((err) => {

  if (err) {

    console.log(err);

  } else {

    app.listen(port, () => {

      console.log(`Connected to DB and listening on ${port}`);

    });

  }

});