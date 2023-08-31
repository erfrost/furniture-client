import CatalogSEO from "@/SEO/CatalogSEO";
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

const Index = ({ items, error }) => {
  const [categoryTitle, setCategoryTitle] = useState(undefined);
  const [itemsState, setItemsState] = useState(items);
  const [categories, setCategories] = useRecoilState(categoriesState);
  const [subcategories, setSubcategories] = useRecoilState(subcategoriesState);
  const [screenWidth, setScreenWidth] = useState(null);
  const [reqError, setReqError] = useState(error);

  const router = useRouter();

  useEffect(() => {
    const fetchCategoriesAndSubcategories = async () => {
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
      <CatalogSEO title={categoryTitle + " | Дом"} />
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
            <span className={styles.searchText}>{categoryTitle}</span>
            <RouteToHome />
          </div>
          <span className={styles.itemsCount}>
            {!items.length
              ? "Ничего не найдено"
              : `Найдено: ${items?.length} товаров`}
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
