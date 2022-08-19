import * as React from "react";
import { Layout } from "../components/Layout";
import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

const Gallery = ({ pageContext }) => {
  const { gallery } = pageContext;

  console.log(gallery);

  return (
    <Layout>
      <Box sx={{ width: "100%", height: "100%", overflowY: "scroll" }}>
        <ImageList variant="masonry" cols={3} gap={30}>
          {gallery.map((node, i) => (
            <ImageListItem key={i}>
              <GatsbyImage
                image={getImage(node.photo.localFile)}
                alt={node.photo.alternativeText}
                imgStyle={{ objectFit: "contain" }}
                objectFit="contain"
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Box>
    </Layout>
  );
};

export default Gallery;
