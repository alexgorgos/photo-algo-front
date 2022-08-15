import * as React from "react";
import Swiper, { Keyboard, Mousewheel, Virtual } from "swiper";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

import "swiper/css";

import "./styles.css";
import { Box } from "@mui/material";
import { useEffect } from "react";

export const HomeGallery = ({ gallery }) => {
  useEffect(() => {
    const swiper = new Swiper(".swiper", {
      modules: [Keyboard, Mousewheel],
      spaceBetween: 30,
      centeredSlides: true,
      slidesPerView: 1.5,
      mousewheel: true,
      keyboard: true,
      grabCursor: true,
      on: {
        init: () => {
          console.log("swiper initialized");
        },
      },
    });
  }, []);

  return (
    <Box className="swiper">
      <Box className="swiper-wrapper">
        {gallery.featuredImages.map((image) => {
          return (
            <Box className="swiper-slide">
              <GatsbyImage
                image={getImage(image.localFile)}
                alt={image.alternativeText}
              />
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};
