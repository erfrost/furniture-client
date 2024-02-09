/* eslint-disable react-hooks/exhaustive-deps */
import CatalogSEO from "../../SEO/CatalogSEO";
import axiosInstance from "../../axios.config";
import AlertInfo from "../../components/AlertInfo/AlertInfo";
import CatalogTitle from "../../components/CatalogTitle/CatalogTitle";
import CategoriesSelect from "../../components/CategoriesSelect/CategoriesSelect";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import ItemsCatalog from "../../components/ItemsCatalog/ItemsCatalog";
import MobileNav from "../../components/MobileNav/MobileNav";
import { categoriesState, subcategoriesState } from "../../storage/atoms";
import styles from "../../styles/catalog.module.css";
import formatItemsCount from "../../utils/caseFormatted";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

const Index = ({ items, itemsCount, error }) => {
  const [countState, setCountState] = useState(itemsCount);
  const [categories, setCategories] = useRecoilState(categoriesState);
  const [subcategories, setSubcategories] = useRecoilState(subcategoriesState);
  const [screenWidth, setScreenWidth] = useState(null);
  const [reqError, setReqError] = useState(error);

  useEffect(() => {
    async function fetchCategoriesAndSubcategories() {
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
      <CatalogSEO
        title="В наличии | Дом"
        description="Товары в наличии в Г. Нижневартовск МЦ Дом, Ул. Кузоваткина 3, стр. 9"
      />
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
          <CatalogTitle title="Товары в наличии Лангепас" />
          <span className={styles.itemsCount}>
            Найдено: {countState} {formatItemsCount(countState)}
          </span>
          <ItemsCatalog
            items={items}
            allCount={itemsCount}
            setCountState={setCountState}
          />
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
    const items = await axiosInstance.get("items/availability/mira");

    return {
      props: {
        items: items.data.items,
        itemsCount: items.data.count,
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
