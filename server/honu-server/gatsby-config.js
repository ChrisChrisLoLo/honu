// gatsby-config.js
module.exports = {
  plugins: [
    `gatsby-plugin-ts-config`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/../../src/honu/static/levels/`,
      },
    },
    {
      resolve: `gatsby-transformer-json`,
      options: {
        typeName: `level`, // a fixed string
      },
    },
  ]
}