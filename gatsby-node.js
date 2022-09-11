const path = require("path");

const slugify = (str) => {
  str = str.replace(/^\s+|\s+$/g, "");

  // Make the string lowercase
  str = str.toLowerCase();

  // Remove accents, swap ñ for n, etc
  var from =
    "ÁÄÂÀÃÅČÇĆĎÉĚËÈÊẼĔȆÍÌÎÏŇÑÓÖÒÔÕØŘŔŠŤÚŮÜÙÛÝŸŽáäâàãåčçćďéěëèêẽĕȇíìîïňñóöòôõøðřŕšťúůüùûýÿžþÞĐđßÆa·/_,:;";
  var to =
    "AAAAAACCCDEEEEEEEEIIIINNOOOOOORRSTUUUUUYYZaaaaaacccdeeeeeeeeiiiinnooooooorrstuuuuuyyzbBDdBAa------";
  for (var i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
  }

  // Remove invalid chars
  str = str
    .replace(/[^a-z0-9 -]/g, "")
    // Collapse whitespace and replace by -
    .replace(/\s+/g, "-")
    // Collapse dashes
    .replace(/-+/g, "-");

  return str;
};

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

  const allGalleries = await graphql(`
    query galleryPages {
      allStrapiGallery {
        nodes {
          name
          photos {
            title
            photo {
              alternativeText
              name
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
    .then((res) => res.data.allStrapiGallery)
    .catch((err) => console.error(err));

  const allPhotos = await graphql(`
    query photos {
      allStrapiPhoto {
        nodes {
          title
          description {
            data {
              childrenMarkdownRemark {
                html
              }
            }
          }
          photo {
            alternativeText
            name
            localFile {
              childImageSharp {
                gatsbyImageData
              }
            }
          }
        }
      }
    }
  `)
    .then((res) => res.data.allStrapiPhoto)
    .catch((err) => console.error(err));

  const allBio = await graphql(`
    query about {
      allStrapiBio {
        nodes {
          content {
            data {
              childrenMarkdownRemark {
                html
              }
            }
          }
          images {
            localFile {
              childImageSharp {
                gatsbyImageData
              }
            }
          }
        }
      }
    }
  `)
    .then((res) => res.data.allStrapiBio)
    .catch((err) => console.error(err));

  //templates

  const homepageTemplate = path.resolve(`src/templates/homepage.js`);
  const galleryTemplate = path.resolve(`src/templates/gallery.js`);
  const photoTemplate = path.resolve(`src/templates/photo.js`);
  const contactTemplate = path.resolve(`src/templates/contact.js`);
  const aboutTemplate = path.resolve(`src/templates/about.js`);

  //pages

  await createPage({
    path: `/`,
    component: homepageTemplate,
    context: {
      gallery: homepageGallery,
    },
  });

  await createPage({
    path: `/contact`,
    component: contactTemplate,
  });

  await createPage({
    path: `/about`,
    component: aboutTemplate,
    context: {
      content: allBio.nodes[0],
      photo: allBio.nodes[0].images[0],
    },
  });

  await Promise.all(
    allGalleries.nodes.map(async (node) => {
      createPage({
        path: `/gallery/${slugify(node.name)}`,
        component: galleryTemplate,
        context: {
          name: node.name,
          gallery: node.photos,
        },
      });
    })
  );

  await Promise.all(
    allPhotos.nodes.map(async (node) => {
      createPage({
        path: `/photo/${slugify(node.title)}`,
        component: photoTemplate,
        context: {
          photo: node,
        },
      });
    })
  );
};
