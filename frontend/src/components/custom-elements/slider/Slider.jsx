import { margin } from "@mui/system";
import React, { useState } from "react";
import Carousel from "react-multi-carousel";

import "react-multi-carousel/lib/styles.css";
import "./slider.css";

const Slider = ({ items, type }) => {
  const setResponsive = () => {
    switch (type) {
      case "small":
        return { desktopItems: 6, mobileItems: 2, tabletItems: 3 };
      case "medium":
        return { desktopItems: 4, mobileItems: 1, tabletItems: 2 };
      case "large":
        return { desktopItems: 2, mobileItems: 1, tabletItems: 1 };
      default:
        break;
    }
  };
  const responsive = {
    desktop: {
      breakpoint: {
        max: 3000,
        min: 1024,
      },
      items: setResponsive().desktopItems,
      partialVisibilityGutter: 40,
    },
    mobile: {
      breakpoint: {
        max: 464,
        min: 0,
      },
      items: setResponsive().mobileItems,
      partialVisibilityGutter: 30,
    },
    tablet: {
      breakpoint: {
        max: 1024,
        min: 464,
      },
      items: setResponsive().tabletItems,
      partialVisibilityGutter: 30,
    },
  };

  return (
    <Carousel
      deviceType="desktop"
      itemClass={`item ${type}`}
      infinite
      responsive={responsive}
    >
      {items.map((item) => {
        return (
          <>
            <img
              src={item.image}
              alt="slide"
              draggable={false}
              style={{ width: "100%", height: "100%" }}
            />
            <h3 className="item__title">{item.title}</h3>
            <span className="item__description">{item.descripton}</span>
          </>
        );
      })}
    </Carousel>
  );
};

export default Slider;
