import * as React from "react";
import { graphql, useStaticQuery } from "gatsby";
import { List } from "@mui/material";
import { NonExpandableNavItem } from "../NonExpandableNavItem";
import { ExpandableNavItem } from "../ExpandableNavItem";

export const Navigation = ({ navName }) => {
  const { allStrapiMenus } = useStaticQuery(graphql`
    query menus {
      allStrapiMenus {
        edges {
          node {
            id
            attributes {
              title
              items {
                data {
                  id
                  attributes {
                    title
                    url
                    order
                    target
                    children {
                      data {
                        id
                        attributes {
                          title
                          url
                          order
                          target
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `);

  const menus = {};

  allStrapiMenus.edges.forEach((edge) => {
    const key = edge.node.attributes.title;
    menus[key] = edge.node.attributes.items.data;
  });

  return (
    <List component="nav">
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
    />
  );
};
