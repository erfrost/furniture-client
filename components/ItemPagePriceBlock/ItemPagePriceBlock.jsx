/* eslint-disable react-hooks/exhaustive-deps */
import formattedNumber from "@/utils/formattedNumber";
import styles from "./ItemPagePriceBlock.module.css";
import { useEffect, useState } from "react";
import minusIcon from "@/assets/minus.svg";
import plusIcon from "@/assets/plus.svg";
import Image from "next/image";
import { addToCart, removeFromCart } from "@/utils/cart";
import {
  addToFavorites,
  getFavoritesFromCookie,
  removeFromFavorites,
} from "@/utils/favorites";

const ItemPagePriceBlock = ({ item }) => {
  const [inCartActive, setInCartActive] = useState(false);
  const [inFavoriteActive, setInFavoriteActive] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const favoriteItems = getFavoritesFromCookie();
    const currentItem = favoriteItems.find((id) => id === item._id);
    if (currentItem) {
      setInFavoriteActive(true);
    }
  }, []);

  const handleInCart = () => {
    setInCartActive(true);
    setCount(1);
  };

  const onFollow = () => {
    if (!inFavoriteActive) {
      addToFavorites(item._id);
      setInFavoriteActive(true);
    } else {
      removeFromFavorites(item._id);
      setInFavoriteActive(false);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      if (count > 0) {
        addToCart(item._id, count);
      } else {
        setInCartActive(false);
        removeFromCart(item._id);
      }
    }, 100);
  }, [count]);

  return (
    <div className={styles.block}>
      {item.price > item.discountPrice ? (
        <div className={styles.price}>
          <span className={styles.newPrice}>
            {formattedNumber(item.discountPrice) + " ₽"}
          </span>
          <span className={styles.oldPrice}>
            {formattedNumber(item.price) + " ₽"}
          </span>
        </div>
      ) : (
        <span className={styles.newPrice}>
          {formattedNumber(item.discountPrice) + " ₽"}
        </span>
      )}
      {inCartActive ? (
        <div className={styles.rowBtns}>
          <div className={styles.linkBtn}>
            <span className={styles.title1}>В корзине</span>
            <span className={styles.title2}>Перейти</span>
          </div>
          <div className={styles.countBlock}>
            <div
              className={styles.countBtn}
              onClick={() =>
                setCount((prevState) => {
                  if (prevState > 1) return prevState - 1;
                  else return 0;
                })
              }
            >
              <Image src={minusIcon} alt="minus" />
            </div>
            <span className={styles.count}>{count}</span>
            <div
              className={styles.countBtn}
              onClick={() => setCount((prevState) => prevState + 1)}
            >
              <Image src={plusIcon} alt="plus" />
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.btn} onClick={handleInCart}>
          Добавить в корзину
        </div>
      )}
      <div className={styles.followedBtn} onClick={onFollow}>
        <svg
          className={`${styles.icon} ${
            inFavoriteActive ? styles.active : null
          }`}
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="12"
          viewBox="0 0 14 12"
          fill="none"
        >
          <path
            d="M6.4272 3.03618L7.00001 4.10408L7.57281 3.03618C8.48408 1.33722 9.8805 0.648861 10.9237 0.734314C11.4379 0.776438 11.8916 1.00235 12.2261 1.41703C12.5649 1.83704 12.8175 2.49752 12.8235 3.4585C12.8291 4.36669 12.4875 5.31244 11.9179 6.24848C11.3502 7.18138 10.5806 8.06418 9.79266 8.83327C9.00687 9.60024 8.21763 10.2398 7.62361 10.6882C7.37567 10.8753 7.16272 11.0285 6.99947 11.1429C6.83631 11.0288 6.62352 10.8762 6.3758 10.6897C5.78187 10.2424 4.99275 9.60417 4.20708 8.83815C3.41924 8.07002 2.64977 7.18776 2.0822 6.25441C1.51279 5.31804 1.17091 4.37046 1.17654 3.45849C1.18251 2.49361 1.43536 1.83143 1.77414 1.41098C2.10845 0.996054 2.56167 0.770699 3.0755 0.729252C4.11854 0.645117 5.51552 1.33651 6.4272 3.03618Z"
            stroke="#262626"
            strokeWidth="1.3"
          />
        </svg>
        <span className={styles.followedText}>
          {inFavoriteActive ? "Удалить из избранного" : "Добавить в избранное"}
        </span>
      </div>
    </div>
  );
};

export default ItemPagePriceBlock;
