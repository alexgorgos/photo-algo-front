import * as React from "react";
import {
  Box,
  Collapse,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { RecursiveComp } from "../Navigation";

export const ExpandableNavItem = ({ title, childrens }) => {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <ListItemButton onClick={handleClick}>
        <ListItemText primary={title} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List>
          {childrens.map((child, index) => {
            return (
              <RecursiveComp
                key={index}
                title={child.attributes.title}
                childrens={
                  child.attributes.children && child.attributes.children.data
                }
                url={child.attributes.url}
                target={child.attributes.target}
              />
            );
          })}
        </List>
      </Collapse>
    </>
  );
};
