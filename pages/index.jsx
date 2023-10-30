/* eslint-disable react-hooks/exhaustive-deps */
import MainPageSEO from "@/SEO/MainPageSEO";
import axiosInstance from "@/axios.config";
import AlertInfo from "@/components/AlertInfo/AlertInfo";
import CategoriesCatalog from "@/components/CategoriesCatalog/CategoriesCatalog";
import CategoriesPreview from "@/components/CategoriesPreview/CategoriesPreview";
import CategoriesSelect from "@/components/CategoriesSelect/CategoriesSelect";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import { categoriesState, subcategoriesState } from "@/storage/atoms";
import styles from "@/styles/homePage.module.css";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import ItemsCatalog from "@/components/ItemsCatalog/ItemsCatalog";
import MobileNav from "@/components/MobileNav/MobileNav";
import { useRouter } from "next/router";

const Index = ({ categories, subcategories, discountItems, news, error }) => {
  const [categoriesRecoil, setCategoriesRecoil] =
    useRecoilState(categoriesState);
  const [subcategoriesRecoil, setSubcategoriesRecoil] =
    useRecoilState(subcategoriesState);
  const [screenWidth, setScreenWidth] = useState(null);

  const router = useRouter();

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.getRegistration().then((registration) => {
        if (!registration) {
          navigator.serviceWorker
            .register("/service-worker.js")
            .then((registration) => {})
            .catch((error) => {
              console.error("Service Worker registration failed:", error);
            });
        }
      });
    }
  }, []);

  useEffect(() => {
    if (categories) setCategoriesRecoil(categories);
    if (subcategories) setSubcategoriesRecoil(subcategories);
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
    if (!discountItems?.length) {
      const categoriesList = document.querySelector(
        ".CategoriesCatalog_container__4lSB5"
      );
      categoriesList.style.paddingBottom = "50px";
    }
  }, []);

  return (
    <>
      <MainPageSEO />
      <div className={styles.container}>
        {screenWidth < 768 ? (
          <div className={styles.fullScreen}>
            <MobileNav />
            <CategoriesPreview news={news} />
          </div>
        ) : (
          <div className={styles.fullScreen}>
            <Header />
            <CategoriesSelect
              categories={categoriesRecoil}
              subcategories={subcategoriesRecoil}
            />
            <CategoriesPreview news={news} />
          </div>
        )}

        <CategoriesCatalog categories={categoriesRecoil} />
        <div className={styles.linkBtn}>
          <div
            className={styles.link}
            onClick={() => router.push("/kitchensToOrder")}
          >
            Кухни на заказ
            <svg
              width="32"
              height="9"
              viewBox="0 0 32 9"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M31 5.1C31.3314 5.1 31.6 4.83137 31.6 4.5C31.6 4.16863 31.3314 3.9 31 3.9V5.1ZM0.575733 4.07574C0.341419 4.31005 0.341419 4.68995 0.575733 4.92426L4.39411 8.74264C4.62843 8.97696 5.00832 8.97696 5.24264 8.74264C5.47695 8.50833 5.47695 8.12843 5.24264 7.89411L1.84853 4.5L5.24264 1.10589C5.47695 0.871573 5.47695 0.491674 5.24264 0.257359C5.00832 0.0230446 4.62843 0.0230446 4.39411 0.257359L0.575733 4.07574ZM31 3.9L0.999998 3.9V5.1L31 5.1V3.9Z"
                fill="#656565"
              />
            </svg>
          </div>
        </div>
        <div className={styles.catalogContainer}>
          <span className={styles.catalogTitle}>Мебель со скидкой</span>
          {discountItems?.length ? (
            <ItemsCatalog items={discountItems} isDiscountPage={true} />
          ) : (
            <span className={styles.notDiscountItems}>
              В данный момент нет товаров со скидкой
            </span>
          )}
        </div>
        <Footer />
        {error && (
          <AlertInfo
            title="Произошла ошибка:"
            description={error}
            type="error"
          />
        )}
      </div>
    </>
  );
};

export async function getServerSideProps() {
  try {
    const categoriesAndSubcategories = await axiosInstance.get(
      "categoriesAndSubcategories"
    );
    const discountItems = await axiosInstance.get("items/discount?limit=25");
    const news = await axiosInstance.get("news");

    return {
      props: {
        categories: categoriesAndSubcategories.data.categories,
        subcategories: categoriesAndSubcategories.data.subcategories,
        discountItems: discountItems.data.items,
        news: news.data,
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
