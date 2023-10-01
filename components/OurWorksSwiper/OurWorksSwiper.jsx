import { BACKEND_IMAGES_URL } from "@/config";
import styles from "./OurWorksSwiper.module.css";
import "react-lazy-load-image-component/src/effects/blur.css";
import cancelAction from "@/utils/cancelAction";
import { useEffect, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import Image from "next/image";

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
    const list = document.querySelector(".OurWorksSwiper_swiper__TpkQo");

    if (list) {
      const lazyLoadList = Array.from(list.children);

      lazyLoadList.forEach((el) => {
        el.style.height = "100%";
      });
    }
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

      if (swiperWidth < totalImagesWidth) {
        const arrows = document.querySelectorAll(
          ".OurWorksSwiper_arrow__bu5Jk"
        );
        arrows.forEach((el) => (el.style.display = "flex"));
      }
    }
  }, []);

  const onScroll = (px) => {
    const swiper = document.querySelector(".OurWorksSwiper_swiper__TpkQo");
    if (swiper) {
      console.log(px);
      swiper.scrollBy({
        left: px,
        behavior: "smooth",
      });
      console.log(swiper.scrollLeft);
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
          <Image
            src={BACKEND_IMAGES_URL + img.photo_name}
            alt="work"
            className={styles.image}
            width={100}
            height={100}
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
