require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jwt = require('express-jwt');

app.use(express.static('public'));

// Serve the front end app
app.get('/', (req, res) => {
  res.sendFile('index.html');
});

// MongoDB connection
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const { DB_URL, DB_PORT, DB_NAME } = process.env;
mongoose.connect(
  `mongodb://${DB_URL}${DB_PORT ? ':' + DB_PORT : ''}/${DB_NAME}`
);
mongoose.connection.on('error', (error) => {
  throw new Error(error);
});
mongoose.connection.once('open', () => {
  // eslint-disable-next-line no-console
  console.log('Connected to mongo.')
});

// Graphql setup
app.use(
  '/api',
  bodyParser.json(),
  jwt({
    secret: process.env.JWT_SECRET,
    credentialsRequired: false
  }),
  require('./src/server/graphql')
);

// Graphiql endpoint
app.use('/graphiql', require('./src/server/graphiql'));

const PORT = process.env.PORT || 4444
app.listen(PORT);
// eslint-disable-next-line no-console
console.log(`API up on port ${PORT}`);
