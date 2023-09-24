/* eslint-disable react-hooks/exhaustive-deps */
import axiosInstance from "@/axios.config";
import AlertInfo from "@/components/AlertInfo/AlertInfo";
import CategoriesSelect from "@/components/CategoriesSelect/CategoriesSelect";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import MobileNav from "@/components/MobileNav/MobileNav";
import OurWorksSwiper from "@/components/OurWorksSwiper/OurWorksSwiper";
import RouteToHome from "@/components/RouteToHome/RouteToHome";
import { categoriesState, subcategoriesState } from "@/storage/atoms";
import styles from "@/styles/KitchensToOrder.module.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { BACKEND_IMAGES_URL } from "@/config";
import cancelAction from "@/utils/cancelAction";
import Link from "next/link";

const Index = ({ images, kitchens, error }) => {
  const [categories, setCategories] = useRecoilState(categoriesState);
  const [subcategories, setSubcategories] = useRecoilState(subcategoriesState);
  const [screenWidth, setScreenWidth] = useState(null);
  const [reqError, setReqError] = useState(error);
  console.log(kitchens);
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

  const transformDescriptionLength = (value) => {
    const maxLength = 300;
    return value.length > maxLength
      ? value.substring(0, maxLength) + "..."
      : value;
  };

  return (
    <>
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
          <RouteToHome />
          <OurWorksSwiper images={images} />
          <div className={styles.list}>
            {kitchens.map((item) => (
              <div className={styles.item} key={item._id}>
                <Link className={styles.link} href={`/kitchen/${item._id}`}>
                  <LazyLoadImage
                    src={BACKEND_IMAGES_URL + item.photo_names[0]}
                    alt="preview"
                    className={styles.image}
                    draggable={false}
                    onDragStart={cancelAction}
                    onContextMenu={cancelAction}
                  />
                </Link>
                <Link href={`/kitchen/${item._id}`} className={styles.title}>
                  {item.title}
                </Link>
                <span className={styles.text}>
                  {transformDescriptionLength(item.description)}
                </span>
                <Link className={styles.link} href={`/kitchen/${item._id}`}>
                  <div className={styles.btn}>Подробнее</div>
                </Link>
              </div>
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
    </>
  );
};

export async function getServerSideProps() {
  try {
    const kitchens = await axiosInstance.get("/kitchen");
    const kitchenWork = await axiosInstance.get("/kitchenWork");

    return {
      props: {
        images: kitchenWork.data,
        kitchens: kitchens.data,
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
