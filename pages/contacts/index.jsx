/* eslint-disable react-hooks/exhaustive-deps */
import axiosInstance from "@/axios.config";
import AlertInfo from "@/components/AlertInfo/AlertInfo";
import CategoriesSelect from "@/components/CategoriesSelect/CategoriesSelect";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import MobileNav from "@/components/MobileNav/MobileNav";
import RouteToHome from "@/components/RouteToHome/RouteToHome";
import { categoriesState, subcategoriesState } from "@/storage/atoms";
import styles from "@/styles/contacts.module.css";
import { Map, Placemark, YMaps } from "@pbe/react-yandex-maps";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

const Contacts = () => {
  const [categories, setCategories] = useRecoilState(categoriesState);
  const [subcategories, setSubcategories] = useRecoilState(subcategoriesState);
  const [screenWidth, setScreenWidth] = useState(null);
  const [reqError, setReqError] = useState();

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
        <div className={styles.items}>
          <div className={styles.item}>
            <div className={styles.adress}>
              г.Нижневартовск МЦ Дом ул. Кузоваткина 3 стр. 9
            </div>
            <YMaps>
              <Map
                width="100%"
                height="500px"
                defaultState={{ center: [60.931377, 76.54222], zoom: 16 }}
              >
                <Placemark
                  options={{
                    iconColor: "#396C03",
                  }}
                  geometry={[60.931377, 76.54222]}
                />
              </Map>
            </YMaps>
          </div>
          <div className={styles.item}>
            <div className={styles.adress}>
              г.Лангепас Отдел Кухонька Мира 7
            </div>
            <YMaps>
              <Map
                width="100%"
                height="500px"
                defaultState={{ center: [61.247656, 75.178668], zoom: 16 }}
              >
                <Placemark
                  options={{
                    iconColor: "#396C03",
                  }}
                  geometry={[61.247656, 75.178668]}
                />
              </Map>
            </YMaps>
          </div>
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

export default Contacts;
