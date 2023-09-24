/* eslint-disable react-hooks/exhaustive-deps */
import styles from "./NewsSlider.module.css";
import cancelAction from "@/utils/cancelAction";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { BACKEND_IMAGES_URL } from "@/config";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

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

  const router = useRouter();

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
    const lazyContainer = document.querySelectorAll(
      ".lazy-load-image-background"
    );
    const images = document.querySelectorAll(".NewsSlider_sliderImage__LO5vh");

    if (!news?.length) {
      const fullScreen = document.querySelector(".homePage_fullScreen___a3rE");
      const previewContainer = document.querySelector(
        ".CategoriesPreview_container__IL_QJ"
      );
      const categoriesList = document.querySelector(
        ".CategoriesPreview_categoriesList__IdTxo"
      );
      const catalog = document.querySelector(
        ".CategoriesCatalog_container__4lSB5"
      );

      fullScreen.style.minHeight = "auto";
      fullScreen.style.paddingBottom = "50px";
      categoriesList.style.minWidth = "100%";
      categoriesList.style.flexDirection = "row";
      categoriesList.style.justifyContent = "space-between";
      previewContainer.style.display = "flex";

      if (screenWidth < 1100) {
        fullScreen.style.paddingBottom = "0";
        previewContainer.style.display = "none";
      }
      if (screenWidth < 768) {
        catalog.style.marginTop = "25px";
      }
    }
    images.forEach((el) => (el.parentElement.style.width = "50%"));
    if (screenWidth < 768 && lazyContainer.length) {
      lazyContainer.forEach((item) => {
        item.style.maxWidth = "225px";
      });
    }
    if (screenWidth < 470 && lazyContainer.length) {
      lazyContainer.forEach((item) => {
        item.style.height = "auto";
      });
    }
  }, [screenWidth]);

  return screenWidth > 768 ? (
    <div className={styles.sliderContainer}>
      <Slider {...sliderSettings} className={styles.slickSlider}>
        {news?.map((item) => (
          <div className={styles.slide} key={item._id}>
            <div className={styles.content}>
              <div className={styles.texts}>
                <span className={styles.titleMain}>{item.title}</span>
                <span className={styles.titleSubmain}>{item.description}</span>
              </div>
              {item.category_id ? (
                <div
                  className={styles.btn}
                  onClick={() => router.push(`/category/${item.category_id}`)}
                >
                  Перейти к разделу
                </div>
              ) : (
                <div
                  className={styles.btn}
                  onClick={() =>
                    router.push(`/subcategory/${item.subcategory_id}`)
                  }
                >
                  Перейти к разделу
                </div>
              )}
            </div>
            <LazyLoadImage
              src={BACKEND_IMAGES_URL + item.photo_name}
              alt="slide image"
              effect="blur"
              className={styles.sliderImage}
              onDragStart={cancelAction}
              onContextMenu={cancelAction}
            />
          </div>
        ))}
      </Slider>
    </div>
  ) : (
    <div className={styles.sliderContainer}>
      <Slider {...sliderSettings} className={styles.slickSlider}>
        {news?.map((item) => (
          <div className={styles.content} key={item._id}>
            <div className={styles.texts}>
              <span className={styles.titleMain}>{item.title}</span>
              <LazyLoadImage
                src={BACKEND_IMAGES_URL + item.photo_name}
                alt="slide image"
                effect="blur"
                className={styles.sliderImage}
                onDragStart={cancelAction}
                onContextMenu={cancelAction}
              />
              <span className={styles.titleSubmain}>{item.description}</span>
            </div>
            <div
              className={styles.btn}
              onClick={() => router.push(`/subcategory/${item.subcategory_id}`)}
            >
              Перейти к разделу
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default NewsSlider;
