/* eslint-disable react-hooks/exhaustive-deps */
import Image from "next/image";
import styles from "./CategoryItem.module.css";
import axiosInstance from "@/axios.config";
import Icon from "@/assets/subcategoryIcon.svg";
import { useEffect, useState } from "react";
import AlertInfo from "../AlertInfo/AlertInfo";
import { useRouter } from "next/router";
import Link from "next/link";
import cancelAction from "@/utils/cancelAction";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { BACKEND_IMAGES_URL } from "@/config";

const CategoryItem = ({ category }) => {
  const [reqError, setReqError] = useState(null);
  const [subcategories, setSubcategories] = useState([]);
  const [screenWidth, setScreenWidth] = useState(null);

  const router = useRouter();

  useEffect(() => {
    async function fetchSubcategories() {
      try {
        const subcategories = await axiosInstance.get(
          `subcategories/${category._id}`
        );

        setSubcategories(subcategories.data);
      } catch (error) {
        setReqError(
          error?.response?.data?.message ||
            "Произошла ошибка запроса. Попробуйте позднее"
        );
      }
    }

    fetchSubcategories();
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
      <LazyLoadImage
        src={BACKEND_IMAGES_URL + category.photo_name}
        alt="category"
        effect="blur"
        className={styles.image}
        draggable={false}
        onDragStart={cancelAction}
        onContextMenu={cancelAction}
        onClick={() => router.push(`category/${category._id}`)}
      />
      <Link href={`/category/${category._id}`} className={styles.title}>
        {category.title}
      </Link>
      {subcategories?.map((subcat) => (
        <div className={styles.subcatContainer} key={subcat._id}>
          <Image
            src={Icon}
            alt="icon"
            width={15}
            height={15}
            priority
            onDragStart={cancelAction}
            onContextMenu={cancelAction}
          />
          <Link
            href={`/subcategory/${subcat._id}`}
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
