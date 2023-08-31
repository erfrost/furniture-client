import SearchPageSEO from "@/SEO/SearchPageSEO";
import axiosInstance from "@/axios.config";
import AlertInfo from "@/components/AlertInfo/AlertInfo";
import CategoriesSelect from "@/components/CategoriesSelect/CategoriesSelect";
import Header from "@/components/Header/Header";
import ItemsCatalog from "@/components/ItemsCatalog/ItemsCatalog";
import MobileNav from "@/components/MobileNav/MobileNav";
import RouteToHome from "@/components/RouteToHome/RouteToHome";
import { categoriesState, subcategoriesState } from "@/storage/atoms";
import styles from "@/styles/catalog.module.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

const SearchPage = ({ items, error }) => {
  const [itemsState, setItemsState] = useState(items);
  const [categories, setCategories] = useRecoilState(categoriesState);
  const [subcategories, setSubcategories] = useRecoilState(subcategoriesState);
  const [screenWidth, setScreenWidth] = useState(null);
  const [reqError, setReqError] = useState(error);

  const router = useRouter();
  const { query } = router;
  const searchText = query.search;

  useEffect(() => {
    const fetchCategoriesAndSubcategories = async () => {
      if (!categories.length && !subcategories.length) {
        try {
          const categoriesAndSubcategories = await axiosInstance.get(
            "categoriesAndSubcategories"
          );
          setCategories(categoriesAndSubcategories.data.categories);
          setSubcategories(categoriesAndSubcategories.data.subcategories);
        } catch (error) {
          setReqError(
            error?.response?.data?.message ||
              "Произошла ошибка запроса. Попробуйте позднее"
          );
        }
      }
    };

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
      <SearchPageSEO />
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
          <div className={styles.titleContainer}>
            <span className={styles.searchText}>Поиск «{searchText}»</span>
            <RouteToHome />
          </div>
          <span className={styles.itemsCount}>
            Найдено: {items.length} товаров
          </span>
          <ItemsCatalog items={items} isDiscountPage={false} />
        </div>
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

export async function getServerSideProps({ query }) {
  try {
    const items = await axiosInstance.get(
      `items/search?search=${query.search}?limit=25`
    );

    return {
      props: {
        items: items.data,
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

export default SearchPage;
