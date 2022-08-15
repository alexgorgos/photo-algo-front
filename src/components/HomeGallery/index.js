import * as React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, Mousewheel, Virtual } from "swiper";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

import "swiper/css";
import "swiper/css/navigation";

import "./styles.css";

export const HomeGallery = ({ gallery }) => {
  return (
    <Swiper
      modules={[Keyboard, Mousewheel, Virtual]}
      centeredSlides={true}
      slidesPerView={"auto"}
      spaceBetween={30}
      mousewheel
      keyboard
      virtual={typeof window !== "undefined" ? false : true}
      grabCursor
    >
      {gallery.featuredImages.map((image, i) => {
        const gimage = getImage(image.localFile);
        return (
          <SwiperSlide key={i} virtualIndex={i}>
            <GatsbyImage image={gimage} alt={image.alternativeText} />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};
