const Post = `
  type Post {
    id: ID!
    title: String!
    content: String!
    views: Int
    createdAt: String
    updatedAt: String
    published: Boolean
  }
`;

module.exports = () => [Post];
