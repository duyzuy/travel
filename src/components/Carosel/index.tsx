"use client";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import React from "react";
export type CaroselItemType = {};
export type CaroselItemsType = CaroselItemType[];

type PropsType = {
  children?: any;
  items?: CaroselItemsType;
};
type PropItemType = {
  children?: React.ReactNode;
};

type CaroselPropType = PropsType & PropItemType;

let Carosel: React.FC<CaroselPropType> = ({ items, children }) => {
  return React.Children.map(children, (el) => {
    const child = el;

    return <child.type {...child.props} />;
  });
  //   return (
  //     <Swiper spaceBetween={50} slidesPerView={3}>
  //       <SwiperSlide>Slide 1</SwiperSlide>
  //       <SwiperSlide>Slide 2</SwiperSlide>
  //       <SwiperSlide>Slide 3</SwiperSlide>
  //       <SwiperSlide>Slide 4</SwiperSlide>
  //     </Swiper>
  //   );
};

const Item: React.FC<PropItemType> = ({ children }) => {
  return <div className="carosel-item">{children}</div>;
};
Carosel.Item = Item;
console.log(Carosel);

export default Carosel;
