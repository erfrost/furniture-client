/* eslint-disable react-hooks/exhaustive-deps */
import ItemInfoSEO from "@/SEO/ItemInfoSEO";
import axiosInstance from "@/axios.config";
import AlertInfo from "@/components/AlertInfo/AlertInfo";
import CategoriesSelect from "@/components/CategoriesSelect/CategoriesSelect";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import ImagesList from "@/components/ImagesList/ImagesList";
import ItemPagePriceBlock from "@/components/ItemPagePriceBlock/ItemPagePriceBlock";
import ItemPageSlider from "@/components/ItemPageSlider/ItemPageSlider";
import MobileNav from "@/components/MobileNav/MobileNav";
import RouteToHome from "@/components/RouteToHome/RouteToHome";
import { categoriesState, subcategoriesState } from "@/storage/atoms";
import styles from "@/styles/itemPage.module.css";
import { addVertImageStyle } from "@/utils/addVertImageStyle";
import cancelAction from "@/utils/cancelAction";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

const Index = ({ item, error }) => {
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

  if (!item) {
    return null;
  }
  const currentCategory = categories.find(
    (cat) => cat._id === item.category_id
  );
  const currentSubcategory = subcategories.find(
    (subcat) => subcat._id === item.subcategory_id
  );

  return (
    <>
      <ItemInfoSEO
        title={item.title + " | Дом"}
        description={
          item.description.length > 100
            ? item.description.slice(0, 100) + "..."
            : item.description
        }
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
          <RouteToHome />
          <div className={styles.itemInfo}>
            {screenWidth < 1100 ? (
              <ItemPageSlider images={item.photo_names} />
            ) : (
              <div className={styles.imagesContainer}>
                <ImagesList
                  item={item}
                  setCurrentImageIndex={setCurrentImageIndex}
                />
                <Image
                  src={item.photo_names[currentImageIndex]}
                  alt="image"
                  width={300}
                  height={300}
                  className={`${styles.image} ${addVertImageStyle(
                    item,
                    styles
                  )}`}
                />
              </div>
            )}
            <div className={styles.infoContainer}>
              <span className={styles.title}>{item.title}</span>
              <div className={styles.navContainer}>
                {currentCategory ? (
                  <Link
                    href="/category/[categoryId]"
                    as={`/category/${currentCategory._id}`}
                    className={styles.navItem}
                  >
                    {currentCategory.title}
                  </Link>
                ) : null}
                {currentSubcategory ? (
                  <Link
                    href="/subcategory/[subcategoryId]"
                    as={`/subcategory/${currentSubcategory._id}`}
                    className={styles.navItem}
                  >
                    {", " + currentSubcategory.title}
                  </Link>
                ) : null}
                {item.furnisherId ? (
                  <Link
                    href="/furnisher/[furnisherId]"
                    as={`/furnisher/${item.furnisherId}`}
                    className={styles.navItem}
                  >
                    {", " + item.furnisherId}
                  </Link>
                ) : null}
              </div>
              {screenWidth < 1100 ? <ItemPagePriceBlock item={item} /> : null}
              <span className={styles.description}>{item.description}</span>
              {item?.specifications?.map((item, index) => (
                <div key={index} className={styles.specificationItem}>
                  <span className={styles.key}>{item.title}</span>
                  <span className={styles.value}>{item.value}</span>
                </div>
              ))}
            </div>
            {screenWidth > 1100 ? <ItemPagePriceBlock item={item} /> : null}
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
    const { itemId } = query;
    const item = await axiosInstance.get(`items/by_itemId/${itemId}`);

    return {
      props: {
        item: item.data,
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
