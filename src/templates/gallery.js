import * as React from "react";
import { Layout } from "../components/Layout";
import Box from "@mui/material/Box";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import Link from "@mui/material/Link";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

const Gallery = ({ pageContext }) => {
  const { gallery } = pageContext;

  const isBrowser = typeof window !== "undefined";

  const getColumns = (width) => {
    return width < 600 ? 1 : 3;
  };

  const [cols, setCols] = React.useState(
    isBrowser ? getColumns(window.innerHeight) : 1
  );
  const updateWidth = () => setCols(getColumns(window.innerWidth));

  React.useEffect(() => {
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  return (
    <Layout>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          overflowY: "scroll",
        }}
      >
        <ImageList variant="masonry" cols={cols} gap={30}>
          {gallery.map((node, i) => (
            <ImageListItem
              key={i}
              component={Link}
              href={node.slug}
              sx={{
                position: "relative",
                "&:hover": {
                  "& > .hover": { opacity: "1" },
                  "& > .imageHover": { opacity: ".85" },
                },
              }}
            >
              <Box
                className="hover"
                sx={{
                  transition: ".5s ease",
                  position: "absolute",
                  opacity: 0,
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  msTransform: "translate(-50%, -50%)",
                  textAlign: "center",
                }}
              >
                <ZoomInIcon sx={{ fontSize: 50, color: "primary" }} />
              </Box>
              <GatsbyImage
                className="imageHover"
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
