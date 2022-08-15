import * as React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

import "./styles.css";

import { GatsbyImage, getImage } from "gatsby-plugin-image";

import { Keyboard, Mousewheel } from "swiper";

export const HomeGallery = ({ gallery }) => {
  console.log(gallery);
  return (
    <Swiper
      centeredSlides={true}
      slidesPerView={"auto"}
      spaceBetween={30}
      modules={[Keyboard, Mousewheel]}
      initialSlide={0}
      mousewheel
      keyboard
      grabCursor
    >
      {gallery.featuredImages.map((image, i) => {
        const gimage = getImage(image.localFile);
        return (
          <SwiperSlide key={i}>
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
