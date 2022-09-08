import * as React from "react";
import { Layout } from "../components/Layout";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
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
        <Grid container columnSpacing={5}>
          <Grid item xs={12} md={3}>
            <Typography
              variant="h2"
              component="h2"
              textAlign={"left"}
              marginTop={3}
              marginBottom={5}
            >
              {photo.title}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <GatsbyImage
              image={getImage(photo.photo.localFile)}
              alt={photo.alternativeText}
              imgStyle={{ objectFit: "contain" }}
              objectFit="contain"
            />
          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
};

export default Photo;
