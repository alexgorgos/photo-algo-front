import * as React from "react";
import { Navigation } from "../Navigation";
import { Typography, Link, Box } from "@mui/material";

export const Header = ({ title, subtitle }) => {
  return (
    <Box component="header" px={2}>
      <Typography component="h1" variant="h3">
        <Link
          href="/"
          underline="none"
          color="inherit"
          sx={{ display: "table-caption" }}
        >
          {title}
        </Link>
      </Typography>
      <Typography component="em" variant="subtitle1">
        {subtitle}
      </Typography>

      <Navigation navName={"main"} />
    </Box>
  );
};
