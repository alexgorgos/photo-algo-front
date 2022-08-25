import * as React from "react";
import { Layout } from "../components/Layout";
import Box from "@mui/material/Box";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import Typography from "@mui/material/Typography";

const Photo = ({ pageContext }) => {
  const { photo } = pageContext;

  return (
    <Layout>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          overflowY: "scroll",
          textAlign: "center",
        }}
      >
        <Box sx={{ display: "inline-block" }}>
          <GatsbyImage
            image={getImage(photo.photo.localFile)}
            alt={photo.alternativeText}
            imgStyle={{ objectFit: "contain" }}
            objectFit="contain"
          />
          <Typography
            variant="h2"
            component="h2"
            textAlign={"left"}
            marginTop={3}
            marginBottom={5}
          >
            {photo.title}
          </Typography>
        </Box>
      </Box>
    </Layout>
  );
};

export default Photo;
