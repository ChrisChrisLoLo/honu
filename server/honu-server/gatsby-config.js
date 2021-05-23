// gatsby-config.js
module.exports = {
  plugins: [
    `gatsby-plugin-ts-config`,
    {
      resolve: "@chakra-ui/gatsby-plugin",
      options: {
        /**
         * @property {boolean} [resetCSS=true]
         * if false, this plugin will not use `<CSSReset />
         */
        resetCSS: true,
        /**
         * @property {boolean} [isUsingColorMode=true]
         * if false, this plugin will not use <ColorModeProvider />
         */
        isUsingColorMode: true,
      },
    },
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