/* eslint-disable react-hooks/exhaustive-deps */
import ItemInfoSEO from "@/SEO/ItemInfoSEO";
import axiosInstance from "@/axios.config";
import AlertInfo from "@/components/AlertInfo/AlertInfo";
import CategoriesSelect from "@/components/CategoriesSelect/CategoriesSelect";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import ImagesList from "@/components/ImagesList/ImagesList";
import ItemPagePriceBlock from "@/components/ItemPagePriceBlock/ItemPagePriceBlock";
import ItemPageSlider from "@/components/ItemPageSlider/ItemPageSlider";
import MobileNav from "@/components/MobileNav/MobileNav";
import RouteToHome from "@/components/RouteToHome/RouteToHome";
import { BACKEND_IMAGES_URL } from "@/config";
import { categoriesState, subcategoriesState } from "@/storage/atoms";
import styles from "@/styles/itemPage.module.css";
import cancelAction from "@/utils/cancelAction";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useRecoilState } from "recoil";

const Index = ({ item, error }) => {
  const [categories, setCategories] = useRecoilState(categoriesState);
  const [subcategories, setSubcategories] = useRecoilState(subcategoriesState);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [screenWidth, setScreenWidth] = useState(null);
  const [reqError, setReqError] = useState(error);

  const router = useRouter();

  const currentCategoryTitle = categories.find(
    (cat) => cat._id === item.category_id
  )?.title;
  const currentSubcategoryTitle = subcategories.find(
    (subcat) => subcat._id === item.subcategory_id
  )?.title;

  useEffect(() => {
    if (!item) {
      router.push("/");
    }
  }, [item]);

  useEffect(() => {
    async function fetchCategoriesAndSubcategories() {
      if (!categories.length && !subcategories.length) {
        try {
          const categoriesAndSubcategories = await axiosInstance.get(
            "categoriesAndSubcategories"
          );
          const categories = categoriesAndSubcategories.data.categories;
          const subcategories = categoriesAndSubcategories.data.subcategories;

          setCategories(categories);
          setSubcategories(subcategories);
        } catch (error) {
          setReqError(
            error?.response?.data?.message ||
              "Произошла ошибка запроса. Попробуйте позднее"
          );
        }
      }
    }

    fetchCategoriesAndSubcategories();
  }, []);

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
    if (screenWidth > 1100) {
      const lazyload = document.querySelectorAll(".lazy-load-image-background");

      const currentElement = lazyload[lazyload.length - 1];
      lazyload.forEach((el, index) => {
        if (index !== lazyload.length - 1) {
          el.style.width = "80px";
          el.style.height = "80px";
        }
      });
      currentElement.style.minWidth = "533px";
      currentElement.style.height = "385px";
      if (screenWidth < 1400) {
        currentElement.style.minWidth = "450px";
      }
      if (screenWidth < 1300) {
        currentElement.style.minWidth = "375px";
        currentElement.style.height = "325px";
      }
    }
  }, [screenWidth]);

  return (
    <>
      <ItemInfoSEO title={item.title + " | Дом"} />
      <div className={styles.container}>
        {screenWidth < 768 ? (
          <div className={styles.fullScreen}>
            <MobileNav categories={categories} />
          </div>
        ) : (
          <div className={styles.fullScreen}>
            <Header />
            <CategoriesSelect
              categories={categories}
              subcategories={subcategories}
            />
          </div>
        )}
        <div className={styles.content}>
          <RouteToHome />
          <div className={styles.itemInfo}>
            {screenWidth < 1100 ? (
              <ItemPageSlider images={item.photo_names} />
            ) : (
              <>
                <ImagesList
                  item={item}
                  setCurrentImageIndex={setCurrentImageIndex}
                />
                <LazyLoadImage
                  src={BACKEND_IMAGES_URL + item.photo_names[currentImageIndex]}
                  effect="blur"
                  className={styles.image}
                  onDragStart={cancelAction}
                  onContextMenu={cancelAction}
                />
              </>
            )}
            <div className={styles.infoContainer}>
              <span className={styles.title}>{item.title}</span>
              <span className={styles.categoryTitle}>
                {currentCategoryTitle && currentSubcategoryTitle
                  ? currentCategoryTitle + ", " + currentSubcategoryTitle
                  : "Загрузка..."}
              </span>
              {screenWidth < 1100 ? <ItemPagePriceBlock item={item} /> : null}
              <span className={styles.description}>{item.description}</span>
              {item?.specifications?.map((item, index) => (
                <div key={index} className={styles.specificationItem}>
                  <span className={styles.key}>{item.title}</span>
                  <span className={styles.dots}>
                    ................................................
                  </span>
                  <span className={styles.value}>{item.value}</span>
                </div>
              ))}
            </div>
            {screenWidth > 1100 ? <ItemPagePriceBlock item={item} /> : null}
          </div>
        </div>
        <Footer />
        {reqError && (
          <AlertInfo
            title="Произошла ошибка:"
            description={reqError}
            type="error"
          />
        )}
      </div>
    </>
  );
};

export async function getServerSideProps({ query }) {
  try {
    const { itemId } = query;
    const item = await axiosInstance.get(`items/by_itemId/${itemId}`);

    return {
      props: {
        item: item.data,
      },
    };
  } catch (error) {
    return {
      props: {
        error: "На сервере произошла ошибка. Попробуйте позднее",
      },
    };
  }
}

export default Index;
