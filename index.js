require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
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

const db = mongoose.connection;
db.on('error', (error) => {
  throw new Error(error);
});
db.once('open', () => {
  console.log('Connected to mongo.')
});

// Graphql setup
const { graphqlExpress, graphiqlExpress } = require('graphql-server-express');
const { makeExecutableSchema } = require('graphql-tools');
const executableSchema = require('./src/server/graphql/data/schema');

// -- graphql endpoint
app.use(
  '/api',
  bodyParser.json(),
  jwt({
    secret: process.env.JWT_SECRET,
    credentialsRequired: false
  }),
  graphqlExpress(req => ({
    schema: executableSchema,
    context: { user: req.user || {} }
  }))
);

// -- graphiql endpoint
app.use('/graphiql', require('./src/server/graphiql'));

const PORT = process.env.PORT || 4444
app.listen(PORT);
console.log(`API up on port ${PORT}`);
