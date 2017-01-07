const { makeExecutableSchema } = require('graphql-tools');
const Post = require('./post');

const posts = [
  {id: 1,
  title: 'Hello',
  content: 'test',
  views: 1,
  createdAt: 'never',
  updatedAt: 'never'}
];

const RootQuery = `
  type Query {
    posts: [Post]!
  }

  type Mutation {
    createPost(
      title: String!
      content: String!
    ): Post
  }
`;

const SchemaDefinitions = `
  schema {
    query: Query
    mutation: Mutation
  }
`;

const resolvers = {
  Query: {
    posts(_, args, ctx, info) {
      return posts;
    }
  },

  Mutation: {
    createPost(_, { title, content }) {
      const newPost = {
        id: Math.ceil(Math.random() * 100),
        title,
        content
      };
      posts.push(newPost);
      return newPost
    }
  }
};

module.exports = makeExecutableSchema({
  typeDefs: [SchemaDefinitions, RootQuery, Post],
  resolvers: resolvers
});
