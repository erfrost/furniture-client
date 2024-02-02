/* eslint-disable react-hooks/exhaustive-deps */
import axiosInstance from "@/axios.config";
import AlertInfo from "@/components/AlertInfo/AlertInfo";
import CategoriesSelect from "@/components/CategoriesSelect/CategoriesSelect";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import MobileNav from "@/components/MobileNav/MobileNav";
import RouteToHome from "@/components/RouteToHome/RouteToHome";
import { categoriesState, subcategoriesState } from "@/storage/atoms";
import styles from "@/styles/furnishers.module.css";
import { sortedFurnishers } from "@/utils/sortedFurnishers";
import { Divider } from "@chakra-ui/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

//

const Index = ({ furnishers }) => {
  const [furnishersState, setFurnishersState] = useState([]);
  const [categories, setCategories] = useRecoilState(categoriesState);
  const [subcategories, setSubcategories] = useRecoilState(subcategoriesState);
  const [screenWidth, setScreenWidth] = useState(null);
  const [reqError, setReqError] = useState();

  useEffect(() => {
    const result = sortedFurnishers(furnishers);

    setFurnishersState(result);
  }, []);
  console.log(furnishers);
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
        <RouteToHome />
        <div className={styles.list}>
          {furnishersState
            .filter((item) => item.count !== 0)
            .map((item, index) => (
              <Link
                href="/furnisher/[furnisherId]"
                as={`/furnisher/${item.id}`}
                className={styles.item}
                key={index}
              >
                {item.id} - {item.count}шт.
              </Link>
            ))}
        </div>
        <Divider />
        <span className={styles.text}>Архив</span>
        <div className={styles.list}>
          {furnishersState
            .filter((item) => item.count === 0)
            .map((item, index) => (
              <Link
                href="/furnisher/[furnisherId]"
                as={`/furnisher/${item.id}`}
                className={styles.item}
                key={index}
              >
                {item.id} - {item.count}шт.
              </Link>
            ))}
        </div>
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

export async function getServerSideProps() {
  try {
    const res = await axiosInstance.get("/furnishers");

    return {
      props: {
        furnishers: res.data,
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
