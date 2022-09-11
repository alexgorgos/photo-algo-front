import * as React from "react";
import { graphql, useStaticQuery } from "gatsby";
import { List } from "@mui/material";
import { NonExpandableNavItem } from "../NonExpandableNavItem";
import { ExpandableNavItem } from "../ExpandableNavItem";

export const Navigation = ({ navName }) => {
  const { allStrapiMenus } = useStaticQuery(graphql`
    query menus {
      allStrapiMenus {
        nodes {
          id
          attributes {
            title
            slug
            items {
              data {
                attributes {
                  title
                  order
                  target
                  url
                  children {
                    data {
                      attributes {
                        order
                        target
                        title
                        url
                      }
                      id
                    }
                  }
                }
                id
              }
            }
          }
        }
      }
    }
  `);

  const menus = {};

  allStrapiMenus.nodes.forEach((node) => {
    const key = node.attributes.title;
    menus[key] = node.attributes.items.data;
  });

  return (
    <List component="nav" sx={{ marginTop: "30px" }}>
      {menus[navName].map((item, index) => {
        return (
          <RecursiveComp
            key={index}
            title={item.attributes.title}
            childrens={
              item.attributes.children && item.attributes.children.data
            }
            url={item.attributes.url}
            target={item.attributes.target}
          />
        );
      })}
    </List>
  );
};

export const RecursiveComp = (props) => {
  const hasChildren = props.childrens && props.childrens.length;
  return hasChildren ? (
    <ExpandableNavItem title={props.title} childrens={props.childrens} />
  ) : (
    <NonExpandableNavItem
      title={props.title}
      url={props.url}
      target={props.target}
      name={props.title}
    />
  );
};
