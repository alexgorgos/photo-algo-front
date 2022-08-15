const path = require("path");

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  //queries

  const homepageGallery = await graphql(`
    query homepageGallery {
      allStrapiConfig {
        nodes {
          homepageGallery {
            featuredImages {
              name
              alternativeText
              localFile {
                childImageSharp {
                  gatsbyImageData
                }
              }
            }
          }
        }
      }
    }
  `)
    .then((res) => res.data.allStrapiConfig.nodes[0])
    .catch((err) => console.error(err));

  //templates

  const homepageTemplate = path.resolve(`src/templates/homepage.js`);

  //pages

  createPage({
    path: `/`,
    component: homepageTemplate,
    context: {
      gallery: homepageGallery,
    },
  });
};
