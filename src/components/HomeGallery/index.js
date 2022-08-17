import * as React from "react";
import Swiper, { Keyboard, Mousewheel } from "swiper";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import SwipeIcon from "@mui/icons-material/Swipe";
import KeyboardIcon from "@mui/icons-material/Keyboard";
import PanToolIcon from "@mui/icons-material/PanTool";
import MouseIcon from "@mui/icons-material/Mouse";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

import "swiper/css";

import "./styles.css";
import { Box, Modal, Typography } from "@mui/material";

const modal = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  p: 4,
  color: "white",
  textAlign: "center",
  outline: 0,
};

export const HomeGallery = ({ gallery }) => {
  const [helper, setHelper] = React.useState();

  const isMobile = React.useRef(
    (() => {
      const toMatch = [
        /Android/i,
        /webOS/i,
        /iPhone/i,
        /iPad/i,
        /iPod/i,
        /BlackBerry/i,
        /Windows Phone/i,
      ];

      return toMatch.some((toMatchItem) => {
        return navigator.userAgent.match(toMatchItem);
      });
    })()
  );

  let timer;

  React.useEffect(() => {
    const swiper = new Swiper(".swiper", {
      modules: [Keyboard, Mousewheel],
      spaceBetween: 30,
      centeredSlides: true,
      slidesPerView: 1,
      mousewheel: true,
      keyboard: true,
      grabCursor: true,
      breakpoints: {
        900: {
          slidesPerView: 2,
        },
      },
    });

    timer = setTimeout(() => {
      setHelper(true);
    }, 10 * 1000);

    swiper.on("activeIndexChange", () => {
      setHelper(false);
    });

    swiper.on("slideChange", () => {
      setHelper(false);
    });
  }, []);

  React.useEffect(() => {
    return timer && (() => clearTimeout(timer));
  }, [helper]);

  return (
    <Box className="swiper">
      <Modal open={helper != null && helper} onClose={() => setHelper(false)}>
        <Box sx={modal}>
          {isMobile.current ? (
            <>
              <Box className="wiggle">
                <KeyboardArrowLeftIcon sx={{ fontSize: 30 }} />
                <SwipeIcon sx={{ fontSize: 60 }} />
                <KeyboardArrowRightIcon sx={{ fontSize: 60 }} />
              </Box>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Swipe
              </Typography>
            </>
          ) : (
            <>
              <Box className="wiggle">
                <KeyboardArrowLeftIcon sx={{ fontSize: 60 }} />
                <KeyboardIcon sx={{ fontSize: 60 }} />
                <MouseIcon sx={{ fontSize: 60 }} />
                <PanToolIcon sx={{ fontSize: 60 }} />
                <KeyboardArrowRightIcon sx={{ fontSize: 60 }} />
              </Box>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Use keyboard, mousewheel or hold left-click to scroll
              </Typography>
            </>
          )}
        </Box>
      </Modal>
      <Box className="swiper-wrapper">
        {gallery.featuredImages.map((image, i) => {
          return (
            <Box key={i} className="swiper-slide">
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
