/* eslint-disable react-hooks/exhaustive-deps */
import Image from "next/image";
import styles from "./CategoryItem.module.css";
import { BACKEND_IMAGES_URL } from "@/config";
import axiosInstance from "@/axios.config";
import Icon from "@/assets/subcategoryIcon.svg";
import { useEffect, useState } from "react";
import AlertInfo from "../AlertInfo/AlertInfo";
import { useRouter } from "next/router";
import Link from "next/link";
import cancelAction from "@/utils/cancelAction";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const CategoryItem = ({ category }) => {
  const [reqError, setReqError] = useState(null);
  const [subcategories, setSubcategories] = useState([]);

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

  return (
    <div className={styles.container}>
      {/* <Image
        src={BACKEND_IMAGES_URL + category.photo_name}
        alt="category"
        width={250}
        height={150}
        priority
        className={styles.image}
        draggable={false}
        onDragStart={cancelAction}
        onContextMenu={cancelAction}
        onClick={() => router.push(`category/${category._id}`)}
      /> */}
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
