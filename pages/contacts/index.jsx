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
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import niznevartovsk1 from "@/assets/Нижневартовск1.jpeg";
import niznevartovsk2 from "@/assets/Нижневартовск2.jpeg";
import niznevartovsk3 from "@/assets/Нижневартовск3.jpeg";
import langepas1 from "@/assets/Лангепас.jpeg";

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
        <YMaps>
          <div className={styles.items}>
            <div className={styles.item}>
              <span className={styles.adress}>
                Г. Нижневартовск МЦ Дом ул. Кузоваткина 3 стр. 9
              </span>
              <span>+7 (922) 773-22-55</span>
              <Map
                id="map1"
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
              <div className={styles.imagesContainer}>
                <Image
                  src={niznevartovsk1}
                  alt="photo"
                  width={400}
                  height={200}
                  className={styles.image}
                />
                <Image
                  src={niznevartovsk2}
                  alt="photo"
                  width={400}
                  height={200}
                  className={styles.image}
                />
                <Image
                  src={niznevartovsk3}
                  alt="photo"
                  width={400}
                  height={200}
                  className={styles.image}
                />
              </div>
            </div>
            <div className={styles.item}>
              <span className={styles.adress}>
                Г. Лангепас Отдел Кухонька Мира 7
              </span>
              <span>+7 (932) 409-99-18</span>
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
              <div className={styles.imagesContainer}>
                <Image
                  src={langepas1}
                  alt="photo"
                  width={400}
                  height={200}
                  className={styles.image}
                />
              </div>
            </div>
          </div>
        </YMaps>
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
