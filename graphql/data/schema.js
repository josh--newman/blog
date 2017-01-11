const co = require('co');
const { makeExecutableSchema } = require('graphql-tools');
const Post = require('./post');
const PostModel = require('../../models/post');

const RootQuery = `
  type Query {
    posts: [Post]!
    postById(id: ID!): Post!
  }

  type Mutation {
    createPost(
      title: String!
      content: String!
    ): Post

    updatePost(
      id: ID!
      title: String
      content: String
    ): Post

    deletePost(id: ID!): Post
    updateViews(id: ID!): Post
    publishPost(id: ID!, publish: Boolean): Post
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
    posts(_, args) {
      return PostModel.find({});
    },
    postById(_, args) {
      return PostModel.findOne({ _id: args.id });
    }
  },

  Mutation: {
    createPost(_, { title, content }) {
      const newPost = new PostModel({
        title,
        content
      });
      return newPost.save();
    },

    updateViews(_, { id }) {
      return PostModel.findById(id)
        .then(post => {
          post.views++;
          return post.save();
        });
    },

    updatePost(_, { id, title, content }) {
      const fields = { title, content };

      return PostModel.findById(id)
        .then(post => {
          Object.keys(fields).forEach(key => {
            if (fields[key]) {
              post[key] = fields[key];
            }
          });
          return post.save();
        });
    },

    deletePost(_, { id }) {
      return PostModel.findOneAndRemove(id);
    },

    publishPost(_, { id, publish }) {
      return PostModel.findById(id)
        .then(post => {
          post.published = publish;
          return post.save();
        });
    }
  }
};

module.exports = makeExecutableSchema({
  typeDefs: [SchemaDefinitions, RootQuery, Post],
  resolvers: resolvers
});
