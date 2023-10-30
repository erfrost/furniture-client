import styles from "./ItemPageSlider.module.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import cancelAction from "@/utils/cancelAction";
import Image from "next/image";

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
        <Image
          key={index}
          src={img}
          width={300}
          height={300}
          alt="slide image"
          className={styles.image}
          onDragStart={cancelAction}
          onContextMenu={cancelAction}
        />
      ))}
    </Slider>
  );
};

export default ItemPageSlider;
