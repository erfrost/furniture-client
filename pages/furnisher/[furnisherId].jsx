/* eslint-disable react-hooks/exhaustive-deps */
import axiosInstance from "@/axios.config";
import AlertInfo from "@/components/AlertInfo/AlertInfo";
import CatalogTitle from "@/components/CatalogTitle/CatalogTitle";
import CategoriesSelect from "@/components/CategoriesSelect/CategoriesSelect";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import ItemsCatalog from "@/components/ItemsCatalog/ItemsCatalog";
import MobileNav from "@/components/MobileNav/MobileNav";
import { categoriesState, subcategoriesState } from "@/storage/atoms";
import styles from "@/styles/Furnishers.module.css";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

const Index = ({ items, itemsCount, error }) => {
  const [furnisherTitle, setFurnisherTitle] = useState(undefined);
  const [itemsState, setItemsState] = useState(items);
  const [countState, setCountState] = useState(itemsCount);
  const [categories, setCategories] = useRecoilState(categoriesState);
  const [subcategories, setSubcategories] = useRecoilState(subcategoriesState);
  const [screenWidth, setScreenWidth] = useState(null);
  const [reqError, setReqError] = useState(error);

  const router = useRouter();
  const { furnisherId } = router.query;

  const loadFunc = async (offset) => {
    try {
      const res = await axiosInstance.get(
        `items/by_furnisher/${furnisherId}?limit=25&offset=${offset}`
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
    setFurnisherTitle(furnisherId);
  }, [furnisherId]);

  useEffect(() => {
    async function fetchItems() {
      try {
        const response = await axiosInstance.get(
          `/items/by_furnisher/${furnisherId}?limit=25`
        );
        setItemsState(response.data.items);
        setCountState(response.data.count);
      } catch (error) {
        setReqError(
          error?.response?.data?.message ||
            "Произошла ошибка запроса. Попробуйте позднее"
        );
      }
    }

    fetchItems();
  }, [furnisherId]);

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
          title={furnisherTitle}
          items={items}
          setSortedItems={setItemsState}
        />
        <span className={styles.itemsCount}>
          Найдено: {countState ? countState : 0} товаров
        </span>
        <ItemsCatalog
          items={itemsState}
          isDiscountPage={false}
          queryFurnisherId={furnisherId}
          loadFunc={loadFunc}
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
    const res = await axiosInstance.get(
      `/items/by_furnisher/${query.furnisherId}?limit=25`
    );

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

export default Index;