import * as React from "react";
import { Layout } from "../components/Layout";
import { HomeGallery } from "../components/HomeGallery";

const Homepage = ({ pageContext }) => {
  const { gallery } = pageContext;

  return (
    <Layout>
      <HomeGallery gallery={gallery.homepageGallery} />
    </Layout>
  );
};

export default Homepage;
