import * as React from "react";
import { Layout } from "../components/Layout";
import Box from "@mui/material/Box";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

const About = ({ pageContext }) => {
  const { content, photo } = pageContext;
  const html = content.content.data.childrenMarkdownRemark[0].html;

  return (
    <Layout>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          overflowY: "scroll",
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
              About
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: "inline-block" }} mb={5}>
              <GatsbyImage
                image={getImage(photo.localFile)}
                alt={photo.alternativeText}
                imgStyle={{ objectFit: "contain" }}
                objectFit="contain"
                style={{ maxHeight: "70vh" }}
                objectPosition="left"
              />
            </Box>
            <Box
              textAlign={"left"}
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
};

export default About;
