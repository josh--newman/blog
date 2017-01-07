const express = require('express');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('graphql-server-express');
const { makeExecutableSchema } = require('graphql-tools');
const path = require('path');
const app = express();

app.use(express.static('public'));

// Serve the front end app
app.get('/', (req, res) => {
  res.sendFile('index.html');
});

// Graphql setup
const executableSchema = require('./graphql/data/schema');
const resolvers = require('./graphql/data/schema.js');

// -- graphql endpoint
app.use('/api', bodyParser.json(), graphqlExpress({
  schema: executableSchema,
  context: {id: 'a context'}
}));

// -- graphiql endpoint
app.use('/graphiql', graphiqlExpress({
  endpointURL: '/api'
}));

const PORT = process.env.PORT || 4444
app.listen(PORT);
console.log(`API up on port ${PORT}`);
