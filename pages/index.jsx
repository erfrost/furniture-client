import MainPageSEO from "@/SEO/MainPageSEO";
import axiosInstance from "@/axios.config";
import AlertInfo from "@/components/AlertInfo/AlertInfo";
import CategoriesCatalog from "@/components/CategoriesCatalog/CategoriesCatalog";
import CategoriesPreview from "@/components/CategoriesPreview/CategoriesPreview";
import CategoriesSelect from "@/components/CategoriesSelect/CategoriesSelect";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import {
  cartItemsState,
  categoriesState,
  favoriteState,
  subcategoriesState,
} from "@/storage/atoms";
import styles from "@/styles/homePage.module.css";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import ItemsCatalog from "@/components/ItemsCatalog/ItemsCatalog";
import MobileNav from "@/components/MobileNav/MobileNav";
import { getCartFromCookie } from "@/utils/cart";
import { getFavoritesFromCookie } from "@/utils/favorites";

const Index = ({ categories, subcategories, discountItems, news, error }) => {
  const [categoriesRecoil, setCategoriesRecoil] =
    useRecoilState(categoriesState);
  const [subcategoriesRecoil, setSubcategoriesRecoil] =
    useRecoilState(subcategoriesState);
  const [, setCart] = useRecoilState(cartItemsState);
  const [, setFavorite] = useRecoilState(favoriteState);
  const [screenWidth, setScreenWidth] = useState(null);

  useEffect(() => {
    if (categories) setCategoriesRecoil(categories);
    if (subcategories) setSubcategoriesRecoil(subcategories);

    const cartItems = getCartFromCookie();
    const favoriteItems = getFavoritesFromCookie();

    setCart(cartItems);
    setFavorite(favoriteItems);
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
            <MobileNav categories={categoriesRecoil} />
            <CategoriesPreview categories={categoriesRecoil} news={news} />
          </div>
        ) : (
          <div className={styles.fullScreen}>
            <Header />
            <CategoriesSelect
              categories={categoriesRecoil}
              subcategories={subcategoriesRecoil}
            />
            <CategoriesPreview categories={categoriesRecoil} news={news} />
          </div>
        )}

        <CategoriesCatalog categories={categoriesRecoil} />
        {discountItems?.length ? (
          <div className={styles.catalogContainer}>
            <span className={styles.catalogTitle}>Мебель со скидкой</span>
            <ItemsCatalog items={discountItems} isDiscountPage={true} />
          </div>
        ) : null}
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
        discountItems: discountItems.data,
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
