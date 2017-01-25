const { graphqlExpress } = require('graphql-server-express');
const schema = require('./data/schema');
const formatError = require('./formatError');

module.exports = graphqlExpress(req => {
  return {
    schema,
    context: {
      user: req.user || {}
    },
    formatError
  }
});
