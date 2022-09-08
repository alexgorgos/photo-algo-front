import * as React from "react";
import { Layout } from "../components/Layout";
import Box from "@mui/material/Box";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import Typography from "@mui/material/Typography";

const About = ({ pageContext }) => {
  const { content } = pageContext;

  return (
    <Layout>
      <Grid container columnSpacing={5}>
        <Grid item xs={12} md={3}>
          <Typography
            variant="h2"
            component="h2"
            textAlign={"left"}
            marginTop={3}
            marginBottom={5}
          >
            About
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}></Grid>
      </Grid>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          overflowY: "scroll",
          textAlign: "center",
        }}
      >
        <Box sx={{ display: "inline-block" }}>
          {/*
          <GatsbyImage
            image={getImage(photo.photo.localFile)}
            alt={photo.alternativeText}
            imgStyle={{ objectFit: "contain" }}
            objectFit="contain"
          />
    */}
        </Box>
      </Box>
    </Layout>
  );
};

export default Photo;
