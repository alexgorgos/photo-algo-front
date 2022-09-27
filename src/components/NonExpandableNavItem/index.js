import * as React from "react";
import { ListItemButton, ListItemText, Link } from "@mui/material";

export const NonExpandableNavItem = ({ title, url, target }) => {
  return (
    <ListItemButton component={Link} href={url} target={target} name={title}>
      <ListItemText primary={title} />
    </ListItemButton>
  );
};
