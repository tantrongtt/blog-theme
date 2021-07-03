module.exports = ({ actions }) => {
  actions.createTypes(`
    type Article implements Node {
      id: ID!
      slug: String!
      title: String!
      date: Date! @dateformat
      author: String!
      excerpt(pruneLength: Int = 140): String!
      body: String!
      hero: File @fileByRelativePath
      thumbnail: File @fileByRelativePath
      timeToRead: Int
      audio: String
    }

    type Portfolio implements Node {
      id: ID!
      slug: String!
      title: String!
      eyebrowHeadline: String
      backgroundColor: String
      date: Date! @dateformat
      author: String!
      excerpt(pruneLength: Int = 140): String!
      body: String!
      hero: File @fileByRelativePath
      thumbnail: File @fileByRelativePath
      timeToRead: Int
    }

    type Reading implements Node {
      id: ID!
      slug: String!
      title: String!
      date: Date! @dateformat
      author: String!
      excerpt(pruneLength: Int = 140): String!
      body: String!
      hero: File @fileByRelativePath
      thumbnail: File @fileByRelativePath
      timeToRead: Int
    }
  `);
};
