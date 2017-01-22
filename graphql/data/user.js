const User = `
  type User {
    name: String!
    email: String!
    isAdmin: Boolean
    createdAt: String
    updatedAt: String
  }
`;

module.exports = () => [User];
