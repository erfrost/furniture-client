/* eslint-disable react-hooks/exhaustive-deps */
import CatalogSEO from "@/SEO/CatalogSEO";
import axiosInstance from "@/axios.config";
import AlertInfo from "@/components/AlertInfo/AlertInfo";
import CatalogTitle from "@/components/CatalogTitle/CatalogTitle";
import CategoriesSelect from "@/components/CategoriesSelect/CategoriesSelect";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import ItemsCatalog from "@/components/ItemsCatalog/ItemsCatalog";
import MobileNav from "@/components/MobileNav/MobileNav";
import { categoriesState, subcategoriesState } from "@/storage/atoms";
import styles from "@/styles/catalog.module.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

const Index = ({ items, itemsCount, error }) => {
  const [categoryTitle, setCategoryTitle] = useState(undefined);
  const [itemsState, setItemsState] = useState(items);
  const [allCount, setAllCount] = useState(0);
  const [countState, setCountState] = useState(itemsCount);
  const [categories, setCategories] = useRecoilState(categoriesState);
  const [subcategories, setSubcategories] = useRecoilState(subcategoriesState);
  const [screenWidth, setScreenWidth] = useState(null);
  const [reqError, setReqError] = useState(error);

  const router = useRouter();
  const { categoryId } = router.query;

  useEffect(() => {
    const currentCategory = categories.find((cat) => cat._id === categoryId);

    setCategoryTitle(currentCategory?.title);
  }, [categoryId]);

  const loadFunc = async (offset) => {
    try {
      const res = await axiosInstance.get(
        `items/by_category/${categoryId}?limit=25&offset=${offset}`
      );

      return res;
    } catch (error) {
      setReqError(
        error?.response?.data?.message ||
          "Произошла ошибка запроса. Попробуйте позднее"
      );
    }
  };

  useEffect(() => {
    async function fetchItems() {
      try {
        const response = await axiosInstance.get(
          `items/by_category/${categoryId}?limit=25`
        );
        setItemsState(response.data.items);
        setAllCount(response.data.count);
        setCountState(response.data.count);
      } catch (error) {
        setReqError(
          error?.response?.data?.message ||
            "Произошла ошибка запроса. Попробуйте позднее"
        );
      }
    }

    fetchItems();
  }, [categoryId]);

  useEffect(() => {
    async function fetchCategoriesAndSubcategories() {
      if (!categories.length && !subcategories.length) {
        try {
          const categoriesAndSubcategories = await axiosInstance.get(
            "categoriesAndSubcategories"
          );
          const categories = categoriesAndSubcategories.data.categories;
          const subcategories = categoriesAndSubcategories.data.subcategories;

          const currentCategory = categories.find(
            (cat) => cat._id === categoryId
          );
          setCategoryTitle(currentCategory?.title);
          setCategories(categories);
          setSubcategories(subcategories);
        } catch (error) {
          setReqError(
            error?.response?.data?.message ||
              "Произошла ошибка запроса. Попробуйте позднее"
          );
        }
      } else {
        const currentCategory = categories.find(
          (cat) => cat._id === categoryId
        );
        setCategoryTitle(currentCategory?.title);
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
        title={(categoryTitle ? categoryTitle : "Каталог") + " | Дом"}
        description={categoryTitle ? categoryTitle : undefined}
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
          <CatalogTitle title={categoryTitle} />
          <span className={styles.itemsCount}>
            Найдено: {countState} товаров
          </span>
          <ItemsCatalog
            items={itemsState}
            isDiscountPage={false}
            queryCategoryId={categoryId}
            allCount={allCount}
            setCountState={setCountState}
            loadFunc={loadFunc}
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

export async function getServerSideProps({ query }) {
  try {
    const items = await axiosInstance.get(
      `/items/by_category/${query.categoryId}?limit=25`
    );

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
