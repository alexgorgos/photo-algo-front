require("dotenv").config();

const strapiConfig = {
  apiURL: process.env.STRAPI_API_URL,
  accessToken: process.env.STRAPI_TOKEN,
  collectionTypes: ["photo", "category"],
  singleTypes: ["bio", "config"],
};

module.exports = {
  siteMetadata: {
    title: `new`,
    siteUrl: `https://photo.alexandrugorgos.com`,
  },
  plugins: [
    {
      resolve: "gatsby-plugin-google-analytics",
      options: {
        trackingId: "G-TJ3JVNESV2",
      },
    },
    {
      resolve: `gatsby-source-strapi`,
      options: strapiConfig,
    },
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sitemap",
    "gatsby-plugin-mdx",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: "./src/pages/",
      },
      __key: "pages",
    },
    `gatsby-plugin-material-ui`,
    `gatsby-theme-material-ui`,
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-transformer-remark`,
    `gatsby-plugin-netlify`,
    {
      resolve: "gatsby-plugin-robots-txt",
      options: {
        host: "https://photo.alexandrugorgos.com",
        sitemap: "https://photo.alexandrugorgos.com/sitemap.xml",
        env: {
          dev: {
            policy: [{ userAgent: "*", disallow: "/" }],
          },
          stage: {
            policy: [{ userAgent: "*", disallow: "/" }],
          },
          prod: {
            policy: [{ userAgent: "*", disallow: "/" }],
          },
        },
      },
    },
  ],
};
