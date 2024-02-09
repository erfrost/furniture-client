/* eslint-disable react-hooks/exhaustive-deps */
import CatalogSEO from "../../SEO/CatalogSEO";
import axiosInstance from "../../axios.config";
import AlertInfo from "../../components/AlertInfo/AlertInfo";
import CategoriesSelect from "../../components/CategoriesSelect/CategoriesSelect";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import MobileNav from "../../components/MobileNav/MobileNav";
import { categoriesState, subcategoriesState } from "../../storage/atoms";
import styles from "../../styles/catalog.module.css";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

const Index = ({ items, itemsCount, error }) => {
  const [categories, setCategories] = useRecoilState(categoriesState);
  const [subcategories, setSubcategories] = useRecoilState(subcategoriesState);
  const [screenWidth, setScreenWidth] = useState(null);
  const [reqError, setReqError] = useState(error);

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
      <CatalogSEO title={"Наши работы | Дом"} description="Кухни на заказ" />
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
          <span className={styles.catalogTitle}>Наши работы</span>
          <span className={styles.itemsCount}>
            Найдено: {itemsCount} фотографий
          </span>
          <div className={styles.list}>
            {items.map((item) => (
              <Image
                key={item._id}
                src={item.photo_name}
                alt="photo"
                width={300}
                height={300}
                className={styles.image}
              />
            ))}
          </div>
        </div>
        <Footer />
      </div>
      {reqError && (
        <AlertInfo
          title="Произошла ошибка:"
          description={reqError}
          type="error"
        />
      )}
    </>
  );
};

export async function getServerSideProps() {
  try {
    const res = await axiosInstance.get("/kitchenWork");

    return {
      props: {
        items: res.data,
        itemsCount: res.data.length,
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
