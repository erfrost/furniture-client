import { BACKEND_IMAGES_URL } from "@/config";
import styles from "./OurWorksSwiper.module.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import cancelAction from "@/utils/cancelAction";
import { useEffect, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { px } from "framer-motion";

const OurWorksSwiper = ({ images }) => {
  const [pxLength, setPxLength] = useState(300);
  const [screenWidth, setScreenWidth] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    if (typeof window !== "undefined") {
      setScreenWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", handleResize);
      }
    };
  }, []);

  useEffect(() => {
    if (screenWidth < 725) setPxLength(200);
    if (screenWidth < 550) setPxLength(150);
    else setPxLength(300);
  }, [screenWidth]);

  useEffect(() => {
    const swiper = document.querySelector(".OurWorksSwiper_swiper__TpkQo");
    if (swiper) {
      const imagesList = document.querySelectorAll(
        ".OurWorksSwiper_image__GWZR9"
      );
      const computedStyles = getComputedStyle(swiper);
      const swiperGap = parseInt(computedStyles.getPropertyValue("gap"));
      const swiperWidth = swiper.offsetWidth;

      const countImages = imagesList.length;
      const currentImageWidth = imagesList[0].offsetWidth;

      const totalImagesWidth =
        countImages * currentImageWidth + swiperGap * (countImages - 1);
      console.log(swiperWidth, totalImagesWidth);
      if (swiperWidth < totalImagesWidth) {
        const arrows = document.querySelectorAll(
          ".OurWorksSwiper_arrow__bu5Jk"
        );
        console.log(arrows);
        arrows.forEach((el) => (el.style.display = "flex"));
      }
    }
  }, []);

  const onScroll = (px) => {
    const swiper = document.querySelector(".OurWorksSwiper_swiper__TpkQo");
    if (swiper) {
      swiper.scrollBy({
        left: px,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className={styles.container}>
      <div
        className={`${styles.leftArrow} ${styles.arrow}`}
        onClick={() => onScroll(-pxLength)}
      >
        <ChevronLeftIcon boxSize="70%" />
      </div>
      <span className={styles.title}>Наши работы</span>
      <div className={styles.swiper}>
        {images?.map((img, index) => (
          <LazyLoadImage
            src={BACKEND_IMAGES_URL + img.photo_name}
            alt="work"
            className={styles.image}
            effect="blur"
            draggable={false}
            onDragStart={cancelAction}
            onContextMenu={cancelAction}
            key={index}
          />
        ))}
      </div>
      <div
        className={`${styles.rightArrow} ${styles.arrow}`}
        onClick={() => onScroll(pxLength)}
      >
        <ChevronRightIcon boxSize="70%" />
      </div>
    </div>
  );
};

export default OurWorksSwiper;
