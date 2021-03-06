/* eslint-disable */

// https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby-transformer-sharp/src/fragments.js

const GatsbyFluid_withWebp = `
  base64
  aspectRatio
  src
  srcSet
  srcWebp
  srcSetWebp
  sizes
`;

module.exports.local = {
  articles: `{
    articles: allArticle(
      sort: { fields: [date, title], order: DESC }
      limit: 1000
    ) {
      edges {
        node {
          id
          slug
          secret
          title
          author
          categories
          date(formatString: "MMMM Do, YYYY")
          dateForSEO: date
          timeToRead
          excerpt
          subscription
          featured
          body
          audio
          hero {
            full: childImageSharp {
              fluid(maxWidth: 944, quality: 95, base64Width: 1) {
                ${GatsbyFluid_withWebp}
              }
            }
            regular: childImageSharp {
              fluid(maxWidth: 653, quality: 95, base64Width: 1) {
                ${GatsbyFluid_withWebp}
              }
            }
            narrow: childImageSharp {
              fluid(maxWidth: 457, quality: 95, base64Width: 1) {
                ${GatsbyFluid_withWebp}
              }
            }
            seo: childImageSharp {
              fixed(width: 1200, quality: 80) {
                src
              }
            }
          }
        }
      }
    }
  }`,

  portfolios: `{
    portfolios: allPortfolio(
      sort: { fields: [date, title], order: DESC }
      limit: 1000
    ) {
      edges {
        node {
          id
          slug
          secret
          dark
          title
          eyebrowHeadline
          backgroundColor
          author
          date(formatString: "MMMM Do, YYYY")
          dateForSEO: date
          timeToRead
          excerpt
          subscription
          body
          hero {
            full: childImageSharp {
              fluid(maxWidth: 1920, quality: 95, base64Width: 1) {
                ${GatsbyFluid_withWebp}
              }
            }
            regular: childImageSharp {
              fluid(maxWidth: 1140, quality: 95, base64Width: 1) {
                ${GatsbyFluid_withWebp}
              }
            }
            narrow: childImageSharp {
              fluid(maxWidth: 457, quality: 90, base64Width: 1) {
                ${GatsbyFluid_withWebp}
              }
            }
            seo: childImageSharp {
              fixed(width: 1200, quality: 80) {
                src
              }
            }
          }
        }
      }
    }
  }`,

  readings: `{
    readings: allReading(
      sort: { fields: [date, title], order: DESC }
      limit: 1000
    ) {
      edges {
        node {
          id
          slug
          secret
          title
          author
          date(formatString: "MMMM Do, YYYY")
          dateForSEO: date
          timeToRead
          excerpt
          subscription
          body
          hero {
            full: childImageSharp {
              fluid(maxWidth: 620, quality: 98, base64Width: 1) {
                ${GatsbyFluid_withWebp}
              }
            }
            narrow: childImageSharp {
              fluid(maxWidth: 320, quality: 95, base64Width: 1) {
                ${GatsbyFluid_withWebp}
              }
            }
            seo: childImageSharp {
              fixed(width: 1200, quality: 80, base64Width: 1) {
                src
              }
            }
          }
        }
      }
    }
  }`,

  authors: `{
    authors: allAuthor {
      edges {
        node {
          authorsPage
          bio
          id
          name
          featured
          social {
            url
          }
          slug
          avatar {
            small: childImageSharp {
              fluid(maxWidth: 50, quality: 100, base64Width: 1) {
                ${GatsbyFluid_withWebp}
              }
            }
            medium: childImageSharp {
              fluid(maxWidth: 100, quality: 100, base64Width: 1) {
                ${GatsbyFluid_withWebp}
              }
            }
            large: childImageSharp {
              fluid(maxWidth: 328, quality: 100, base64Width: 1) {
                ${GatsbyFluid_withWebp}
              }
            }
          }
        }
      }
    }
  }`,
};

module.exports.contentful = {
  articles: `{
    articles: allContentfulPost(sort: {fields: [date, title], order: DESC}, limit: 1000) {
      edges {
        node {
          body {
            childMdx {
              body
              timeToRead
            }
          }
          excerpt
          title
          slug
          secret
          date(formatString: "MMMM Do, YYYY")
          dateForSEO: date
          hero {
            full: fluid(maxWidth: 944, quality: 100) {
              ${GatsbyFluid_withWebp}
            }
            regular: fluid(maxWidth: 653, quality: 100) {
              ${GatsbyFluid_withWebp}
            }
            narrow: fluid(maxWidth: 457, quality: 100) {
              ${GatsbyFluid_withWebp}
            }
            seo: fixed(width: 1200, quality: 100) {
              src
            }
          }
          id
          author {
            name
          }
        }
      }
    }
  }
  `,
  portfolios: `{
    portfolios: allContentfulPost(sort: {fields: [date, title], order: DESC}, limit: 1000) {
      edges {
        node {
          body {
            childMdx {
              body
              timeToRead
            }
          }
          excerpt
          title
          slug
          secret
          date(formatString: "MMMM Do, YYYY")
          dateForSEO: date
          hero {
            full: fluid(maxWidth: 944, quality: 100) {
              ${GatsbyFluid_withWebp}
            }
            regular: fluid(maxWidth: 653, quality: 100) {
              ${GatsbyFluid_withWebp}
            }
            narrow: fluid(maxWidth: 457, quality: 100) {
              ${GatsbyFluid_withWebp}
            }
            seo: fixed(width: 1200, quality: 100) {
              src
            }
          }
          id
          author {
            name
          }
        }
      }
    }
  }
  `,

  readings: `{
    readings: allContentfulPost(sort: {fields: [date, title], order: DESC}, limit: 1000) {
      edges {
        node {
          body {
            childMdx {
              body
              timeToRead
            }
          }
          excerpt
          title
          slug
          secret
          date(formatString: "MMMM Do, YYYY")
          dateForSEO: date
          hero {
            full: fluid(maxWidth: 944, quality: 100) {
              ${GatsbyFluid_withWebp}
            }
            regular: fluid(maxWidth: 653, quality: 100) {
              ${GatsbyFluid_withWebp}
            }
            narrow: fluid(maxWidth: 457, quality: 100) {
              ${GatsbyFluid_withWebp}
            }
            seo: fixed(width: 1200, quality: 100) {
              src
            }
          }
          id
          author {
            name
          }
        }
      }
    }
  }
  `,

  authors: `{
    authors: allContentfulAuthor {
      edges {
        node {
          avatar {
            small: fluid(maxWidth: 50, quality: 100) {
              ${GatsbyFluid_withWebp}
            }
            medium: fluid(maxWidth: 100, quality: 100) {
              ${GatsbyFluid_withWebp}
            }
            large: fluid(maxWidth: 328, quality: 100) {
              ${GatsbyFluid_withWebp}
            }
          }
          fields {
            authorsPage
            slug
          }
          bio
          id
          name
          social
          featured
        }
      }
    }
  }`,
};
