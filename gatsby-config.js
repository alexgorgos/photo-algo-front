require("dotenv").config();

const {
  NODE_ENV,
  URL: NETLIFY_SITE_URL = "https://photo.alexandrugorgos.com",
  DEPLOY_PRIME_URL: NETLIFY_DEPLOY_URL = NETLIFY_SITE_URL,
  CONTEXT: NETLIFY_ENV = NODE_ENV,
} = process.env;

const strapiConfig = {
  apiURL: process.env.STRAPI_API_URL,
  accessToken: process.env.STRAPI_TOKEN,
  collectionTypes: ["photo", "gallery"],
  singleTypes: ["bio", "config"],
};

module.exports = {
  siteMetadata: {
    title: `new`,
    siteUrl: `https://photo.alexandrugorgos.com`,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: ["G-TJ3JVNESV2"],
      },
      pluginConfig: {
        head: true,
        anonymize_ip: true,
      },
    },
    {
      resolve: `gatsby-source-strapi`,
      options: strapiConfig,
    },
    {
      resolve: "gatsby-source-strapi-plugin-menus",
      options: {
        apiURL: strapiConfig.apiURL,
        token: strapiConfig.accessToken,
      },
    },
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sitemap",
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
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        defaults: {
          formats: [`webp`],
          placeholder: `dominantColor`,
          quality: 90,
          breakpoints: [600, 900, 1200, 1536],
          backgroundColor: `transparent`,
          tracedSVGOptions: {},
          blurredOptions: {},
          jpgOptions: {},
          pngOptions: {},
          webpOptions: {},
          avifOptions: {},
        },
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-transformer-remark`,
    `gatsby-plugin-netlify`,
    {
      resolve: "gatsby-plugin-robots-txt",
      options: {
        host: "https://photo.alexandrugorgos.com",
        sitemap: "https://photo.alexandrugorgos.com/sitemap.xml",
        resolveEnv: () => NETLIFY_ENV,
        env: {
          "deploy-preview": {
            policy: [{ userAgent: "*", disallow: ["/"] }],
            sitemap: null,
            host: null,
          },
          "branch-deploy": {
            policy: [{ userAgent: "*", disallow: ["/"] }],
            sitemap: null,
            host: null,
          },
        },
      },
    },
  ],
};
