import * as React from "react";
import { Navigation } from "../Navigation";
import { Typography, Link, Box } from "@mui/material";
import "@fontsource/playfair-display";

export const Header = ({ title, subtitle }) => {
  return (
    <Box component="header" px={2}>
      <Typography
        component="h1"
        fontFamily="Playfair Display"
        fontSize={40}
        letterSpacing={2}
      >
        <Link
          href="/"
          underline="none"
          color="inherit"
          sx={{ display: "table-caption" }}
        >
          {title}
        </Link>
      </Typography>
      <Typography
        component="em"
        variant="subtitle1"
        display={"block"}
        marginBottom={5}
        marginTop={2}
        letterSpacing={".5"}
        fontSize={14}
      >
        {subtitle}
      </Typography>

      <Navigation navName={"main"} />
    </Box>
  );
};
