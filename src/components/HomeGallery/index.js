import * as React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

import "./styles.css";

import { GatsbyImage, getImage } from "gatsby-plugin-image";

import SwiperCore, { Keyboard, Mousewheel, Virtual } from "swiper";

export const HomeGallery = ({ gallery }) => {
  return (
    <Swiper
      centeredSlides={true}
      slidesPerView={"auto"}
      spaceBetween={30}
      modules={[Keyboard, Mousewheel, Virtual]}
      initialSlide={0}
      mousewheel
      keyboard
      grabCursor
      virtual
    >
      {gallery.featuredImages.map((image, i) => {
        const gimage = getImage(image.localFile);
        return (
          <SwiperSlide key={i} virtualIndex={i}>
            <GatsbyImage
              image={gimage}
              alt={image.alternativeText}
              className={"image"}
            />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};
