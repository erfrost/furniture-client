/* eslint-disable react-hooks/exhaustive-deps */
import cancelAction from "@/utils/cancelAction";
import styles from "./CartItem.module.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { BACKEND_IMAGES_URL } from "@/config";
import { useEffect, useState } from "react";
import { categoriesState, subcategoriesState } from "@/storage/atoms";
import axiosInstance from "@/axios.config";
import AlertInfo from "../AlertInfo/AlertInfo";
import { useRecoilState } from "recoil";
import CartPrice from "../CartPrice/CartPrice";
import formattedNumber from "@/utils/formattedNumber";
import minus from "@/assets/minus.svg";
import plus from "@/assets/plus.svg";
import Image from "next/image";
import Link from "next/link";

const CartItem = ({ item, count, handleChangeCount, deleteFromCart }) => {
  const [categories, setCategories] = useRecoilState(categoriesState);
  const [subcategories, setSubcategories] = useRecoilState(subcategoriesState);
  const [reqError, setReqError] = useState(null);
  const categoryTitle = categories.find(
    (cat) => cat._id === item.category_id
  )?.title;
  const subcategoryTitle = subcategories.find(
    (subcat) => subcat._id === item.subcategory_id
  )?.title;

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

  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <Link href={`item/${item._id}`} className={styles.imageLink}>
          <LazyLoadImage
            src={BACKEND_IMAGES_URL + item.photo_names[0]}
            alt="photo"
            className={styles.image}
            draggable={false}
            onDragStart={cancelAction}
            onContextMenu={cancelAction}
          />
        </Link>
        <div className={styles.info}>
          <div className={styles.texts}>
            <Link href={`item/${item._id}`}>
              <span className={styles.title}>{item.title}</span>
            </Link>
            <span className={styles.categoryAndSubcategory}>
              {categoryTitle && subcategoryTitle
                ? categoryTitle + ", " + subcategoryTitle
                : "Загрузка..."}
            </span>
          </div>
          <span
            className={styles.deleteBtn}
            onClick={() => deleteFromCart(item._id)}
          >
            Удалить
          </span>
        </div>
      </div>
      <CartPrice item={item} />
      <div className={styles.countContainer}>
        <div className={styles.countBtns}>
          <div
            className={`${styles.countBtn} ${
              item.count <= 1 ? styles.disabledBtn : null
            }`}
            onClick={() => handleChangeCount("minus", item._id)}
          >
            <Image
              src={minus}
              alt="minus"
              draggable={false}
              onDragStart={cancelAction}
              onContextMenu={cancelAction}
            />
          </div>
          <span className={styles.count}>{count}</span>
          <div
            className={styles.countBtn}
            onClick={() => handleChangeCount("plus", item._id)}
          >
            <Image
              src={plus}
              alt="plus"
              draggable={false}
              onDragStart={cancelAction}
              onContextMenu={cancelAction}
            />
          </div>
        </div>
        {item.count > 1 ? (
          <span className={styles.onePrice}>{`${formattedNumber(
            item.discountPrice
          )} ₽ / шт.`}</span>
        ) : null}
      </div>
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

export default CartItem;
