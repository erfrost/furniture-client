/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import styles from "./NewsSlider.module.css";
import cancelAction from "@/utils/cancelAction";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";

const sliderSettings = {
  dots: true,
  infinite: true,
  arrows: false,
  speed: 400,
  autoplay: true,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const NewsSlider = ({ news }) => {
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
    if (!news?.length) {
      const previewContainer = document.querySelector(
        ".CategoriesPreview_container__IL_QJ"
      );
      previewContainer.style.display = "none";
    }
  }, [screenWidth]);

  return (
    <div className={styles.sliderContainer}>
      <Slider {...sliderSettings} className={styles.slickSlider}>
        {news?.map((item) => (
          <div className={styles.slide} key={item._id}>
            <Image
              src={item.photo_name}
              width={300}
              height={470}
              unoptimized
              priority
              alt="slide image"
              className={styles.sliderImage}
              onDragStart={cancelAction}
              onContextMenu={cancelAction}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default NewsSlider;
