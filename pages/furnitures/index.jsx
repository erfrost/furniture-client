/* eslint-disable react-hooks/exhaustive-deps */
import MainPageSEO from "../../SEO/MainPageSEO";
import axiosInstance from "../../axios.config";
import CategoriesSelect from "../../components/CategoriesSelect/CategoriesSelect";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { categoriesState, subcategoriesState } from "../../storage/atoms";
import styles from "../../styles/furnitures.module.css";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import MobileNav from "../../components/MobileNav/MobileNav";
import FurnituresList from "../../components/FurnituresList/FurnituresList";

const Index = () => {
  const [categories, setCategories] = useRecoilState(categoriesState);
  const [subcategories, setSubcategories] = useRecoilState(subcategoriesState);
  const [screenWidth, setScreenWidth] = useState(null);

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

  return (
    <>
      <MainPageSEO />
      <div className={styles.container}>
        {screenWidth < 768 ? (
          <div className={styles.fullScreen}>
            <MobileNav />
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
          <FurnituresList
            categories={categories}
            subcategories={subcategories}
          />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Index;
