import styles from "./ItemPageSlider.module.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import cancelAction from "@/utils/cancelAction";
import { BACKEND_IMAGES_URL } from "@/config";
import { useEffect } from "react";

const sliderSettings = {
  dots: true,
  infinite: true,
  arrows: false,
  speed: 400,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const ItemPageSlider = ({ images }) => {
  return (
    <Slider {...sliderSettings} className={styles.slider}>
      {images?.map((img, index) => (
        <LazyLoadImage
          key={index}
          src={BACKEND_IMAGES_URL + img}
          alt="slide image"
          effect="blur"
          className={styles.image}
          onDragStart={cancelAction}
          onContextMenu={cancelAction}
        />
      ))}
    </Slider>
  );
};

export default ItemPageSlider;
