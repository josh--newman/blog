const { makeExecutableSchema } = require('graphql-tools');
const { isAdmin } = require('./../auth');
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
    posts(obj, args) {
      return PostModel.find({});
    },
    postById(obj, args) {
      return PostModel.findOne({ _id: args.id });
    }
  },

  Mutation: {
    createPost(obj, { title, content }, context) {
      isAdmin(context);
      const newPost = new PostModel({
        title,
        content
      });
      return newPost.save();
    },

    updateViews(obj, { id }) {
      return PostModel.findById(id)
        .then(post => {
          post.views++;
          return post.save();
        });
    },

    updatePost(obj, { id, title, content }, context) {
      isAdmin(context);
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

    deletePost(obj, { id }, context) {
      isAdmin(context);
      return PostModel.findOneAndRemove(id);
    },

    publishPost(obj, { id, publish }, context) {
      isAdmin(context);
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
