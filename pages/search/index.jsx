/* eslint-disable react-hooks/exhaustive-deps */
import styles from "../../styles/catalog.module.css";
import formatItemsCount from "../../utils/caseFormatted";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import axiosInstance from "../../axios.config";
import AlertInfo from "../../components/AlertInfo/AlertInfo";
import { categoriesState, subcategoriesState } from "../../storage/atoms";
import MobileNav from "../../components/MobileNav/MobileNav";
import Header from "../../components/Header/Header";
import CategoriesSelect from "../../components/CategoriesSelect/CategoriesSelect";
import CatalogTitle from "../../components/CatalogTitle/CatalogTitle";
import ItemsCatalog from "../../components/ItemsCatalog/ItemsCatalog";
import Footer from "../../components/Footer/Footer";

const SearchPage = ({ items, itemsCount, error }) => {
  const [itemsState, setItemsState] = useState(items);
  const [allCount, setAllCount] = useState(itemsCount);
  const [countState, setCountState] = useState(itemsCount);
  const [categories, setCategories] = useRecoilState(categoriesState);
  const [subcategories, setSubcategories] = useRecoilState(subcategoriesState);
  const [screenWidth, setScreenWidth] = useState(null);
  const [reqError, setReqError] = useState(error);

  const router = useRouter();
  const { query } = router;
  const searchText = query.search;

  useEffect(() => {
    setItemsState(items);
  }, [items]);

  useEffect(() => {
    setAllCount(itemsCount);
  }, [itemsCount]);

  useEffect(() => {
    async function fetchCategoriesAndSubcategories() {
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
        <CatalogTitle
          title={`Поиск «${searchText}»`}
          items={items}
          setSortedItems={setItemsState}
        />
        <span className={styles.itemsCount}>
          Найдено: {countState} {formatItemsCount(countState)}
        </span>
        <ItemsCatalog
          items={itemsState}
          isDiscountPage={false}
          allCount={allCount}
          setCountState={setCountState}
        />
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
  );
};

export async function getServerSideProps({ query }) {
  try {
    const res = await axiosInstance.get(`items/search?search=${query.search}`);

    return {
      props: {
        items: res.data.items,
        itemsCount: res.data.count,
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
