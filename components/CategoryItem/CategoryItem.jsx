/* eslint-disable react-hooks/exhaustive-deps */
import Image from "next/image";
import styles from "./CategoryItem.module.css";
import axiosInstance from "../../axios.config";
import Icon from "../../assets/subcategoryIcon.svg";
import { useEffect, useState } from "react";
import AlertInfo from "../AlertInfo/AlertInfo";
import { useRouter } from "next/router";
import Link from "next/link";
import cancelAction from "../../utils/cancelAction";
import { useRecoilState } from "recoil";
import { categoriesState, subcategoriesState } from "../../storage/atoms";

const CategoryItem = ({ category }) => {
  const [reqError, setReqError] = useState(null);
  const [categoriesRecoil, setCategoriesRecoil] =
    useRecoilState(categoriesState);
  const [subcategoriesRecoil, setSubcategoriesRecoil] =
    useRecoilState(subcategoriesState);
  const [subcategories, setSubcategories] = useState([]);
  const [screenWidth, setScreenWidth] = useState(null);

  const router = useRouter();

  useEffect(() => {
    if (!categoriesRecoil.length || !subcategoriesRecoil.length) {
      async function fetchCategoriesAndSubcategories() {
        try {
          const categoriesAndSubcategories = await axiosInstance.get(
            "categoriesAndSubcategories"
          );
          const categories = categoriesAndSubcategories.data.categories;
          const subcategories = categoriesAndSubcategories.data.subcategories;

          setCategoriesRecoil(categories);
          setSubcategoriesRecoil(subcategories);
        } catch (error) {
          setReqError(
            error?.response?.data?.message ||
              "Произошла ошибка запроса. Попробуйте позднее"
          );
        }
      }

      fetchCategoriesAndSubcategories();
    }

    const currentCategoryId = category._id;

    const currentSubcategories = subcategoriesRecoil.filter(
      (subcat) => subcat.category_id === currentCategoryId
    );
    setSubcategories(currentSubcategories);
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

  useEffect(() => {
    if (screenWidth < 475) {
      const cards = document.querySelectorAll(".CategoryItem_container__6Zath");
      cards.forEach((el) => {
        el.children[0].style.width = "100%";
      });
    }
  }, []);

  return (
    <div className={styles.container}>
      <Image
        src={category.photo_name}
        alt="category"
        width={100}
        height={100}
        className={styles.image}
        draggable={false}
        onDragStart={cancelAction}
        onContextMenu={cancelAction}
        unoptimized
        onClick={() => router.push(`category/${category._id}`)}
      />
      <Link
        href="/category/[categoryId]"
        as={`/category/${category._id}`}
        className={styles.title}
      >
        {category.title}
      </Link>
      {subcategories?.map((subcat) => (
        <div className={styles.subcatContainer} key={subcat._id}>
          <Image
            src={Icon}
            alt="icon"
            onDragStart={cancelAction}
            onContextMenu={cancelAction}
          />
          <Link
            href={
              subcat._id === "656da2464eecad4547e7066c"
                ? "/furnitures"
                : "/subcategory/[subcategoryId]"
            }
            as={
              subcat._id === "656da2464eecad4547e7066c"
                ? "/furnitures"
                : `/subcategory/${subcat._id}`
            }
            className={styles.subcatTitle}
          >
            {subcat.title}
          </Link>
        </div>
      ))}
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

export default CategoryItem;
