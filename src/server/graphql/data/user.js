const User = `
  type User {
    firstName: String!
    lastName: String!
    email: String!
    isAdmin: Boolean
    createdAt: String
    updatedAt: String
  }
`;

module.exports = () => [User];
