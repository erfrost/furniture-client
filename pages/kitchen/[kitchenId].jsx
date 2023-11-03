/* eslint-disable react-hooks/exhaustive-deps */
import axiosInstance from "@/axios.config";
import AlertInfo from "@/components/AlertInfo/AlertInfo";
import CategoriesSelect from "@/components/CategoriesSelect/CategoriesSelect";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import MobileNav from "@/components/MobileNav/MobileNav";
import RouteToHome from "@/components/RouteToHome/RouteToHome";
import { categoriesState, subcategoriesState } from "@/storage/atoms";
import styles from "@/styles/kitchenItem.module.css";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import cancelAction from "@/utils/cancelAction";
import Image from "next/image";

const Index = ({ kitchen, error }) => {
  const [categories, setCategories] = useRecoilState(categoriesState);
  const [subcategories, setSubcategories] = useRecoilState(subcategoriesState);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [screenWidth, setScreenWidth] = useState(null);
  const [reqError, setReqError] = useState(error);

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
    <>
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
          <div className={styles.item}>
            <div className={styles.photosContainer}>
              <Image
                src={kitchen.photo_names[currentImageIndex]}
                alt="photo"
                width={300}
                height={300}
                className={styles.bigImage}
                draggable={false}
                onDragStart={cancelAction}
                onContextMenu={cancelAction}
              />
              <div className={styles.list}>
                {kitchen.photo_names.map((img, index) => (
                  <Image
                    src={img}
                    alt="photo"
                    width={300}
                    height={300}
                    className={styles.image}
                    draggable={false}
                    onDragStart={cancelAction}
                    onContextMenu={cancelAction}
                    onClick={() => setCurrentImageIndex(index)}
                    key={index}
                  />
                ))}
              </div>
            </div>
            <div className={styles.info}>
              <span className={styles.title}>{kitchen.title}</span>
              <div className={styles.block}>
                <span className={styles.miniTitle}>Описание</span>
                <span className={styles.text}>{kitchen.description}</span>
              </div>
              <div className={styles.block}>
                <span className={styles.miniTitle}>Преимущества</span>
                <span className={styles.text}>{kitchen.advantages}</span>
              </div>
              <div className={styles.block}>
                {kitchen.specifications.length > 0 ? (
                  <>
                    <span className={styles.miniTitle}>Характеристики</span>
                    {kitchen.specifications.map((item, index) => (
                      <div key={index} className={styles.specificationItem}>
                        <span className={styles.key}>{item.title}</span>
                        <span className={styles.dots}>
                          ................................................
                        </span>
                        <span className={styles.value}>{item.value}</span>
                      </div>
                    ))}
                  </>
                ) : null}
              </div>
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
    </>
  );
};

export async function getServerSideProps({ query }) {
  try {
    const kitchenId = query.kitchenId;

    const kitchen = await axiosInstance.get(`/kitchen/by_id/${kitchenId}`);

    return {
      props: {
        kitchen: kitchen.data,
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
