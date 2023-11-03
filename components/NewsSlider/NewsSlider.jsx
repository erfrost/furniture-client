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
  // autoplay: true,
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
      // const fullScreen = document.querySelector(".homePage_fullScreen___a3rE");
      const previewContainer = document.querySelector(
        ".CategoriesPreview_container__IL_QJ"
      );
      // const categoriesList = document.querySelector(
      //   ".CategoriesPreview_categoriesList__IdTxo"
      // );
      // const catalog = document.querySelector(
      //   ".CategoriesCatalog_container__4lSB5"
      // );

      // fullScreen.style.minHeight = "auto";
      // fullScreen.style.paddingBottom = "50px";
      // categoriesList.style.minWidth = "100%";
      // categoriesList.style.flexDirection = "row";
      // categoriesList.style.justifyContent = "space-between";
      previewContainer.style.display = "none";

      // if (screenWidth < 1100) {
      //   fullScreen.style.paddingBottom = "0";
      //   previewContainer.style.display = "none";
      // }
      // if (screenWidth < 768) {
      //   catalog.style.marginTop = "25px";
      // }
    }
  }, [screenWidth]);

  return (
    <div className={styles.sliderContainer}>
      <Slider {...sliderSettings} className={styles.slickSlider}>
        {news?.map((item) => (
          <div className={styles.slide} key={item._id}>
            <Image
              src={item.photo_name}
              alt="slide image"
              width={300}
              height={300}
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
