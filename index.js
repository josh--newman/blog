require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const jwt = require('express-jwt');

app.use(morgan('tiny'));
app.use(express.static(`${__dirname}/public`));

// ==================
// Webpack middleware
// ==================
(function() {
  const webpack = require('webpack');
  const webpackConfig = require('./webpack.config');
  const compiler = webpack(webpackConfig);

  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true, publicPath: webpackConfig.output.publicPath
  }));

  app.use(require('webpack-hot-middleware')(compiler, {
    // eslint-disable-next-line no-console
    log: console.log, path: '/__webpack_hmr', heartbeat: 10 * 1000
  }));

})();

// ==================
// MongoDB connection
// ==================
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


// ==================
// GraphQL setup
// ==================
app.use(
  '/graphql',
  bodyParser.json(),
  jwt({
    secret: process.env.JWT_SECRET,
    credentialsRequired: false
  }),
  require('./src/server/graphql')
);

// ==================
// GraphiQL setup
// ==================
app.use('/graphiql', require('./src/server/graphiql'));

// ==================
// Frontend route
// ==================
app.get('*', (req, res) => {
  res.sendFile('index.html', { root: `${__dirname}/public` });
});

const PORT = process.env.PORT || 4444
app.listen(PORT);
// eslint-disable-next-line no-console
console.log(`API up on port ${PORT}`);
