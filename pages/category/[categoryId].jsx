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

const Index = ({ items, error }) => {
  const [categoryTitle, setCategoryTitle] = useState(undefined);
  const [itemsState, setItemsState] = useState(items);
  const [categories, setCategories] = useRecoilState(categoriesState);
  const [subcategories, setSubcategories] = useRecoilState(subcategoriesState);
  const [screenWidth, setScreenWidth] = useState(null);
  const [reqError, setReqError] = useState(error);

  const router = useRouter();
  const { categoryId } = router.query;

  useEffect(() => {
    async function fetchItems() {
      try {
        const response = await axiosInstance.get(
          `items/by_category/${categoryId}?limit=25`
        );
        setItemsState(response.data);

        const currentCategory = categories.find(
          (cat) => cat._id === router.query.categoryId
        );
        setCategoryTitle(currentCategory?.title);
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
            (cat) => cat._id === router.query.categoryId
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
          (cat) => cat._id === router.query.categoryId
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
      />
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
          <CatalogTitle
            title={categoryTitle}
            items={items}
            setSortedItems={setItemsState}
          />
          <span className={styles.itemsCount}>
            {!itemsState?.length
              ? "Ничего не найдено"
              : `Найдено: ${itemsState?.length} товаров`}
          </span>
          <ItemsCatalog
            items={itemsState}
            isDiscountPage={false}
            queryCategoryId={categoryId}
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
      `items/by_category/${query.categoryId}?limit=25`
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

export default Index;
