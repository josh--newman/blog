const co = require('co');
const { makeExecutableSchema } = require('graphql-tools');
const jwt = require('jsonwebtoken');
const { checkIsAdmin, errorObj } = require('./../auth');
const { saltHashPassword, confirmPassword } = require('./../../utils/password');
const Post = require('./post');
const PostModel = require('../../models/post');
const User = require('./user');
const UserModel = require('../../models/user');

const RootQuery = `
  type Query {
    posts: [Post]!
    postById(id: ID!): Post!
    userByEmail(email: String!): User
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

    createUser(
      email: String!
      password: String!
      firstName: String!,
      lastName: String!,
      isAdmin: Boolean
    ): User

    deleteUser(
      email: String!
    ): User

    generateToken(email: String!, password: String!): String!
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
    },
    userByEmail(obj, { email }) {
      return UserModel.findOne({email})
    }
  },

  Mutation: {
    createPost(obj, { title, content }, context) {
      checkIsAdmin(context);
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
      checkIsAdmin(context);
      const fields = { title, content };

      return PostModel.findById(id)
        .then(post => {
          Object.keys(fields).forEach(key => {
            if (fields[key]) {
              post[key] = fields[key];
            }
          });
          // Updated updatedAt
          post.updatedAt = Date.now();
          return post.save();
        });
    },

    deletePost(obj, { id }, context) {
      checkIsAdmin(context);
      return PostModel.findOneAndRemove({_id: id});
    },

    publishPost(obj, { id, publish }, context) {
      checkIsAdmin(context);
      return PostModel.findById(id)
        .then(post => {
          post.published = publish;
          return post.save();
        });
    },

    createUser(obj, { email, password, firstName, lastName, isAdmin }, context) {
      return co(function*() {
        // Don't allow a non-admin to create users
        if (isAdmin) { checkIsAdmin(context) }

        // Check if user with email already exists
        const user = yield UserModel.findOne({email});
        if (user) { throw errorObj({error: 'User already exists'}) }

        const hash = yield saltHashPassword(password);
        const newUser = new UserModel({
          email,
          password: hash,
          firstName,
          lastName,
          isAdmin
        }).save();

        return newUser;
      });
    },

    deleteUser(obj, { email }, context) {
      return co(function*() {
        // Only admins can delete users
        checkIsAdmin(context);

        // Check if user exists first
        const user = yield UserModel.findOne({email});
        if (!user) { throw errorObj({error: 'User doesn\'t exist'}) }

        return UserModel.findOneAndRemove({email})
      });
    },

    generateToken(obj, { email, password }, context) {
      const credsError = () => { return errorObj({error: 'Incorrect credentials'}) }

      return co(function*() {
        const user = yield UserModel.findOne({email});
        if (!user) { return credsError() }

        // Check if the found user's hash matches the password given
        const validPassword = yield confirmPassword(password, user.password);
        if (!validPassword) { return credsError() }

        const payload = {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          isAdmin: user.isAdmin
        };

        return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' });
      });
    }
  }
};

module.exports = makeExecutableSchema({
  typeDefs: [SchemaDefinitions, RootQuery, Post, User],
  resolvers: resolvers
});
